/**
 * REcentral - Supabase Cloud Database Client & Synchronization Engine
 * Handles PostgreSQL integration, real-time replication, user control, and graceful offline fallback.
 */

// Default Configuration
const DEFAULT_SUPABASE_CONFIG = {
  url: "https://bkyvukxyscjkurcmjqnc.supabase.co",
  anonKey: "sb_publishable_1zpy9-rBbzY3DbLCSBsPmQ_tacb8YAn"
};

let sbClient = null;
let sbRealtimeChannel = null;
let sbConnectionState = "unconfigured"; // "connected" | "disconnected" | "unconfigured"

/**
 * Retrieves Supabase credentials from localStorage or fallback
 */
function getSupabaseConfig() {
  const url = localStorage.getItem("re_supabase_url") || DEFAULT_SUPABASE_CONFIG.url || "";
  const anonKey = localStorage.getItem("re_supabase_key") || DEFAULT_SUPABASE_CONFIG.anonKey || "";
  return { url: url.trim(), anonKey: anonKey.trim() };
}

/**
 * Saves new Supabase configuration to localStorage and re-initializes client
 */
function saveSupabaseConfig(url, anonKey) {
  const cleanUrl = (url || "").trim().replace(/\/+$/, "");
  const cleanKey = (anonKey || "").trim();

  if (cleanUrl) {
    localStorage.setItem("re_supabase_url", cleanUrl);
  } else {
    localStorage.removeItem("re_supabase_url");
  }

  if (cleanKey) {
    localStorage.setItem("re_supabase_key", cleanKey);
  } else {
    localStorage.removeItem("re_supabase_key");
  }

  return initSupabaseClient();
}

/**
 * Initializes the Supabase client and sets up realtime subscriptions
 */
function initSupabaseClient() {
  const config = getSupabaseConfig();

  if (!config.url || !config.anonKey) {
    sbClient = null;
    sbConnectionState = "unconfigured";
    updateSupabaseStatusUI();
    return null;
  }

  if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
    console.warn("[Supabase] JS SDK not loaded yet. Retrying on load.");
    sbConnectionState = "disconnected";
    updateSupabaseStatusUI();
    return null;
  }

  try {
    sbClient = window.supabase.createClient(config.url, config.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    sbConnectionState = "connected";
    updateSupabaseStatusUI();
    setupSupabaseRealtime();
    return sbClient;
  } catch (err) {
    console.error("[Supabase] Init error:", err);
    sbClient = null;
    sbConnectionState = "disconnected";
    updateSupabaseStatusUI();
    return null;
  }
}

/**
 * Checks if Supabase has credentials configured
 */
function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

/**
 * Tests live connection to the Supabase database
 */
async function testSupabaseConnection() {
  if (!sbClient) {
    initSupabaseClient();
  }

  if (!sbClient) {
    return { success: false, message: "Please enter both Project URL and Anon API Key." };
  }

  try {
    const { data, error } = await sbClient
      .from("users")
      .select("id")
      .limit(1);

    if (error) {
      sbConnectionState = "disconnected";
      updateSupabaseStatusUI();
      return { 
        success: false, 
        message: `Database error: ${error.message}. Make sure you executed the SQL Schema in Supabase SQL editor!` 
      };
    }

    sbConnectionState = "connected";
    updateSupabaseStatusUI();
    return { success: true, message: "Connected to Supabase PostgreSQL Database successfully! 🚀" };
  } catch (err) {
    sbConnectionState = "disconnected";
    updateSupabaseStatusUI();
    return { success: false, message: `Network/Connection error: ${err.message}` };
  }
}

/**
 * Sets up Supabase Realtime subscriptions to sync changes automatically across all devices
 */
function setupSupabaseRealtime() {
  if (!sbClient) return;

  try {
    if (sbRealtimeChannel) {
      sbClient.removeChannel(sbRealtimeChannel);
    }

    sbRealtimeChannel = sbClient
      .channel("recentral-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        async (payload) => {
          console.log("[Supabase Realtime] Users changed:", payload.eventType);
          await refreshUsersFromSupabase();
          if (typeof renderUserManagementTable === "function") {
            const searchInput = document.getElementById("user-mgmt-search");
            renderUserManagementTable(searchInput ? searchInput.value : "");
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "system_settings" },
        async (payload) => {
          console.log("[Supabase Realtime] Settings changed:", payload.eventType, payload.new?.key);
          if (payload.new && payload.new.key === "live_online_users") {
            sbLiveDbUsersMap = payload.new.value || {};
          }
          if (payload.new && payload.new.key === "cms_scripts" && payload.new.value) {
            CALL_SCRIPTS = payload.new.value;
            localStorage.setItem("re_cms_scripts", JSON.stringify(CALL_SCRIPTS));
            if (typeof refreshAllCmsRenderers === "function") refreshAllCmsRenderers();
          }
          if (payload.new && payload.new.key === "cms_pitches" && payload.new.value) {
            MODEL_PITCHES = payload.new.value;
            localStorage.setItem("re_cms_pitches", JSON.stringify(MODEL_PITCHES));
            if (typeof refreshAllCmsRenderers === "function") refreshAllCmsRenderers();
          }
          if (payload.new && payload.new.key === "cms_bikes" && payload.new.value) {
            BIKE_SPECS = payload.new.value;
            localStorage.setItem("re_cms_bikes", JSON.stringify(BIKE_SPECS));
            if (typeof refreshAllCmsRenderers === "function") refreshAllCmsRenderers();
          }
          if (payload.new && payload.new.key === "cms_objections" && payload.new.value) {
            OBJECTION_REBUTTALS = payload.new.value;
            localStorage.setItem("re_cms_objections", JSON.stringify(OBJECTION_REBUTTALS));
            if (typeof refreshAllCmsRenderers === "function") refreshAllCmsRenderers();
          }
          await refreshSettingsFromSupabase();
          if (typeof renderUserManagementTable === "function") {
            renderUserManagementTable();
          }
        }
      )
      .subscribe((status) => {
        console.log("[Supabase Realtime] Subscription status:", status);
      });

    // Initialize presence listener & fetch live database online state
    initPresenceChannelListener();
    sbFetchLiveOnlineUsersFromDB();
  } catch (e) {
    console.warn("[Supabase Realtime] Setup error:", e);
  }
}

// ==============================================================================
// REALTIME LIVE USER PRESENCE & DATABASE-BACKED ACTIVITY TRACKING
// ==============================================================================

let sbPresenceChannel = null;
let sbOnlineUsersMap = {};
let sbLiveDbUsersMap = {};
let sbPresenceHeartbeatTimer = null;

/**
 * Fetches the current live online users map directly from Supabase Database
 */
async function sbFetchLiveOnlineUsersFromDB() {
  if (!sbClient) return {};

  try {
    const { data, error } = await sbClient
      .from("system_settings")
      .select("value")
      .eq("key", "live_online_users")
      .single();

    if (error && error.code !== "PGRST116") throw error;
    if (data && data.value) {
      sbLiveDbUsersMap = data.value;
      if (typeof renderUserManagementTable === "function") {
        renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
      }
      return sbLiveDbUsersMap;
    }
  } catch (err) {
    console.warn("[Supabase] Failed to fetch live online users from DB:", err.message);
  }
  return {};
}

/**
 * Updates the user's live online status directly in Supabase Database
 */
async function sbUpdateUserPresenceInDB(user, isOnline = true, role = "user") {
  if (!user || !user.username) return;

  const usernameKey = user.username.toLowerCase();
  const nowIso = new Date().toISOString();

  // 1. Update in-memory & local state immediately
  sbLiveDbUsersMap[usernameKey] = {
    online: isOnline,
    last_seen: nowIso,
    name: user.name || user.username,
    role: role
  };

  try {
    const raw = localStorage.getItem("re_presence_heartbeats") || "{}";
    const heartbeats = JSON.parse(raw);
    heartbeats[usernameKey] = {
      username: user.username,
      name: user.name || user.username,
      role: role,
      online: isOnline,
      timestamp: Date.now()
    };
    localStorage.setItem("re_presence_heartbeats", JSON.stringify(heartbeats));
  } catch (e) {}

  if (!sbClient) return;

  // 2. Persist to Supabase Database (system_settings -> live_online_users)
  try {
    // Fetch latest map to prevent overwrites
    const { data } = await sbClient
      .from("system_settings")
      .select("value")
      .eq("key", "live_online_users")
      .single();

    const currentMap = (data && data.value) ? data.value : {};
    currentMap[usernameKey] = {
      online: isOnline,
      last_seen: nowIso,
      name: user.name || user.username,
      role: role
    };

    await sbClient
      .from("system_settings")
      .upsert({
        key: "live_online_users",
        value: currentMap,
        updated_at: nowIso
      });

    // 3. Also attempt direct column update on users table (if columns exist)
    try {
      await sbClient
        .from("users")
        .update({ is_online: isOnline, last_seen: nowIso })
        .eq("username", user.username);
    } catch (colErr) {
      // Ignored if column not added
    }

    // 4. Log to activity_logs
    if (isOnline) {
      sbLogActivity(user.username, "USER_ONLINE", `User "${user.username}" is now ACTIVE & ONLINE`);
    } else {
      sbLogActivity(user.username, "USER_OFFLINE", `User "${user.username}" went OFFLINE`);
    }
  } catch (err) {
    console.warn("[Supabase] Failed to update presence in DB:", err.message);
  }
}

/**
 * Initializes the presence listener
 */
function initPresenceChannelListener() {
  if (!sbClient) return;

  try {
    if (sbPresenceChannel) {
      sbClient.removeChannel(sbPresenceChannel);
    }

    sbPresenceChannel = sbClient.channel("recentral-presence");

    sbPresenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = sbPresenceChannel.presenceState();
        sbOnlineUsersMap = {};
        Object.keys(state).forEach((key) => {
          const presences = state[key];
          if (Array.isArray(presences) && presences.length > 0) {
            sbOnlineUsersMap[key.toLowerCase()] = {
              online: true,
              user: presences[0].user || key,
              name: presences[0].name || key,
              role: presences[0].role || "user",
              timestamp: Date.now()
            };
          }
        });
        if (typeof renderUserManagementTable === "function") {
          const searchInput = document.getElementById("user-mgmt-search");
          renderUserManagementTable(searchInput ? searchInput.value : "");
        }
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        if (newPresences && newPresences[0]) {
          sbOnlineUsersMap[key.toLowerCase()] = {
            online: true,
            user: newPresences[0].user || key,
            name: newPresences[0].name || key,
            role: newPresences[0].role || "user",
            timestamp: Date.now()
          };
        }
        if (typeof renderUserManagementTable === "function") {
          const searchInput = document.getElementById("user-mgmt-search");
          renderUserManagementTable(searchInput ? searchInput.value : "");
        }
      })
      .on("presence", { event: "leave" }, ({ key }) => {
        delete sbOnlineUsersMap[key.toLowerCase()];
        if (typeof renderUserManagementTable === "function") {
          const searchInput = document.getElementById("user-mgmt-search");
          renderUserManagementTable(searchInput ? searchInput.value : "");
        }
      })
      .subscribe();
  } catch (e) {
    console.warn("[Supabase Presence] Init error:", e);
  }
}

/**
 * Tracks active online status of logged in user or admin in DB & Realtime
 */
function sbTrackUserPresence(user, role = "user") {
  if (!user || !user.username) return;

  const usernameKey = user.username.toLowerCase();
  
  // 1. Update local & Database presence immediately
  sbUpdateUserPresenceInDB(user, true, role);

  // 2. Supabase Realtime Presence Channel Broadcast
  if (sbClient) {
    try {
      if (!sbPresenceChannel) {
        initPresenceChannelListener();
      }
      if (sbPresenceChannel) {
        sbPresenceChannel.track({
          user: user.username,
          name: user.name || user.username,
          role: role,
          onlineAt: new Date().toISOString()
        }).catch(() => {});
      }
    } catch (err) {
      console.warn("[Supabase Presence] Track error:", err);
    }
  }

  // 3. Start periodic 20s heartbeat to keep database status active
  if (sbPresenceHeartbeatTimer) clearInterval(sbPresenceHeartbeatTimer);
  sbPresenceHeartbeatTimer = setInterval(() => {
    sbUpdateUserPresenceInDB(user, true, role);
  }, 20000);
}

/**
 * Untracks user presence when logged out
 */
function sbUntrackUserPresence(username) {
  if (username) {
    const userObj = { username: username };
    sbUpdateUserPresenceInDB(userObj, false);
    delete sbOnlineUsersMap[username.toLowerCase()];
  }

  if (sbPresenceHeartbeatTimer) {
    clearInterval(sbPresenceHeartbeatTimer);
    sbPresenceHeartbeatTimer = null;
  }

  if (sbPresenceChannel) {
    try {
      sbPresenceChannel.untrack();
    } catch (e) {}
  }
}

/**
 * Checks if a specific username is currently live / online
 */
function sbIsUserOnline(username) {
  if (!username) return false;
  const usernameKey = username.toLowerCase();

  // 1. Check Database Live Map (within 60 seconds threshold)
  const dbUser = sbLiveDbUsersMap[usernameKey];
  if (dbUser && dbUser.online) {
    if (dbUser.last_seen) {
      const diffMs = Date.now() - new Date(dbUser.last_seen).getTime();
      if (diffMs < 65000) return true;
    } else {
      return true;
    }
  }

  // 2. Check Supabase presence channel map
  if (sbOnlineUsersMap[usernameKey] && sbOnlineUsersMap[usernameKey].online) {
    return true;
  }

  // 3. Check local heartbeats (active within last 35 seconds)
  try {
    const raw = localStorage.getItem("re_presence_heartbeats") || "{}";
    const heartbeats = JSON.parse(raw);
    const hb = heartbeats[usernameKey];
    if (hb && hb.online && (Date.now() - hb.timestamp < 35000)) {
      return true;
    }
  } catch (e) {}

  return false;
}

/**
 * Formats last active time for display
 */
function sbGetUserLastActiveText(username) {
  if (!username) return "";
  const usernameKey = username.toLowerCase();
  const dbUser = sbLiveDbUsersMap[usernameKey];
  if (!dbUser || !dbUser.last_seen) return "";

  try {
    const seenDate = new Date(dbUser.last_seen);
    const diffMins = Math.floor((Date.now() - seenDate.getTime()) / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return seenDate.toLocaleDateString();
  } catch(e) {
    return "";
  }
}

// ==============================================================================
// SUPABASE CRUD OPERATIONS
// ==============================================================================

/**
 * Fetches all user accounts from Supabase
 */
async function sbFetchUsers() {
  if (!sbClient) return null;

  try {
    const { data, error } = await sbClient
      .from("users")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("[Supabase] Failed to fetch users:", err.message);
    return null;
  }
}

/**
 * Inserts or updates a user in Supabase
 */
async function sbUpsertUser(user) {
  if (!sbClient) return false;

  try {
    const record = {
      id: user.id || `usr_${Date.now()}`,
      username: user.username,
      password: user.password,
      name: user.name || user.username,
      status: user.status || "active",
      updated_at: new Date().toISOString()
    };

    const { error } = await sbClient
      .from("users")
      .upsert(record, { onConflict: "id" });

    if (error) throw error;

    await sbLogActivity("Admin", "UPSERT_USER", `User ID: ${user.username} (${user.status})`);
    return true;
  } catch (err) {
    console.error("[Supabase] Failed to upsert user:", err);
    return false;
  }
}

/**
 * Deletes a user account from Supabase
 */
async function sbDeleteUser(userId) {
  if (!sbClient) return false;

  try {
    const { error } = await sbClient
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) throw error;

    await sbLogActivity("Admin", "DELETE_USER", `User ID: ${userId}`);
    return true;
  } catch (err) {
    console.error("[Supabase] Failed to delete user:", err);
    return false;
  }
}

/**
 * Toggles a user's status (active/disabled) in Supabase
 */
async function sbToggleUserStatus(userId, status) {
  if (!sbClient) return false;

  try {
    const { error } = await sbClient
      .from("users")
      .update({ status: status, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) throw error;

    await sbLogActivity("Admin", "TOGGLE_USER_STATUS", `User ${userId} status set to ${status}`);
    return true;
  } catch (err) {
    console.error("[Supabase] Failed to update user status:", err);
    return false;
  }
}

/**
 * Batch updates all users status (Grant All / Revoke All) in Supabase
 */
async function sbBatchUpdateUsersStatus(status) {
  if (!sbClient) return false;

  try {
    const { error } = await sbClient
      .from("users")
      .update({ status: status, updated_at: new Date().toISOString() })
      .neq("id", "none");

    if (error) throw error;

    await sbLogActivity("Admin", "BATCH_USER_STATUS", `All users set to ${status}`);
    return true;
  } catch (err) {
    console.error("[Supabase] Failed to batch update users:", err);
    return false;
  }
}

/**
 * Fetches the Global User Login Access setting from Supabase
 */
async function sbFetchGlobalUserLogin() {
  if (!sbClient) return null;

  try {
    const { data, error } = await sbClient
      .from("system_settings")
      .select("value")
      .eq("key", "global_user_login")
      .maybeSingle();

    if (error) throw error;
    if (data && typeof data.value !== "undefined") {
      return Boolean(data.value);
    }
    return null;
  } catch (err) {
    console.warn("[Supabase] Failed to fetch settings:", err.message);
    return null;
  }
}

/**
 * Saves Global User Login Access toggle in Supabase
 */
async function sbSaveGlobalUserLogin(enabled) {
  if (!sbClient) return false;

  try {
    const { error } = await sbClient
      .from("system_settings")
      .upsert({
        key: "global_user_login",
        value: Boolean(enabled),
        updated_at: new Date().toISOString()
      });

    if (error) throw error;

    await sbLogActivity("Admin", "GLOBAL_ACCESS_TOGGLE", `Global User Access set to ${enabled ? "OPEN" : "RESTRICTED"}`);
    return true;
  } catch (err) {
    console.error("[Supabase] Failed to save global setting:", err);
    return false;
  }
}

/**
 * Fetches Admin credentials from Supabase
 */
async function sbFetchAdminCredentials() {
  if (!sbClient) return null;

  try {
    const { data, error } = await sbClient
      .from("admin_config")
      .select("username, password")
      .eq("id", "primary")
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("[Supabase] Failed to fetch admin config:", err.message);
    return null;
  }
}

/**
 * Updates Admin credentials in Supabase
 */
async function sbSaveAdminCredentials(username, password) {
  if (!sbClient) return false;

  try {
    const { error } = await sbClient
      .from("admin_config")
      .upsert({
        id: "primary",
        username: username,
        password: password,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;

    await sbLogActivity("Admin", "CHANGE_ADMIN_CREDS", `Admin username updated to ${username}`);
    return true;
  } catch (err) {
    console.error("[Supabase] Failed to save admin credentials:", err);
    return false;
  }
}

/**
 * Logs user and admin activity in Supabase
 */
async function sbLogActivity(username, action, details) {
  if (!sbClient) return;

  try {
    await sbClient
      .from("activity_logs")
      .insert({
        username: username || "System",
        action: action,
        details: details || "",
        created_at: new Date().toISOString()
      });
  } catch (e) {
    // Non-blocking log write
  }
}

/**
 * Fetches recent activity audit logs
 */
async function sbFetchActivityLogs(limit = 20) {
  if (!sbClient) return [];

  try {
    const { data, error } = await sbClient
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn("[Supabase] Failed to fetch activity logs:", err.message);
    return [];
  }
}

/**
 * 1-Click Sync: Push all current local data (users, global toggle, admin credentials) to Supabase
 */
async function sbPushLocalDataToCloud(users, globalLogin, adminCreds) {
  if (!sbClient) {
    return { success: false, message: "Supabase is not connected. Check your URL & Key." };
  }

  try {
    // 1. Push Users
    if (Array.isArray(users) && users.length > 0) {
      const records = users.map(u => ({
        id: u.id,
        username: u.username,
        password: u.password,
        name: u.name || u.username,
        status: u.status || "active",
        created_at: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { error: userErr } = await sbClient
        .from("users")
        .upsert(records, { onConflict: "id" });

      if (userErr) throw userErr;
    }

    // 2. Push Global Login Setting
    if (typeof globalLogin === "boolean") {
      await sbSaveGlobalUserLogin(globalLogin);
    }

    // 3. Push Admin Config
    if (adminCreds && adminCreds.user && adminCreds.pass) {
      await sbSaveAdminCredentials(adminCreds.user, adminCreds.pass);
    }

    await sbLogActivity("Admin", "PUSH_LOCAL_TO_CLOUD", `Exported ${users.length} users and system settings to Supabase`);

    return { 
      success: true, 
      message: `Successfully pushed ${users.length} users and system configurations to Supabase Cloud Database! ☁️` 
    };
  } catch (err) {
    return { success: false, message: `Sync failed: ${err.message}` };
  }
}

/**
 * 1-Click Pull: Pull all data from Supabase into local storage
 */
async function sbPullCloudDataToLocal() {
  if (!sbClient) {
    return { success: false, message: "Supabase is not connected." };
  }

  try {
    const [cloudUsers, cloudGlobal, cloudAdmin] = await Promise.all([
      sbFetchUsers(),
      sbFetchGlobalUserLogin(),
      sbFetchAdminCredentials()
    ]);

    let count = 0;
    if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
      localStorage.setItem("re_music_users", JSON.stringify(cloudUsers));
      count = cloudUsers.length;
    }

    if (cloudGlobal !== null) {
      localStorage.setItem("re_global_user_login", cloudGlobal ? "true" : "false");
    }

    if (cloudAdmin && cloudAdmin.username && cloudAdmin.password) {
      localStorage.setItem("re_vault_user", cloudAdmin.username);
      localStorage.setItem("re_vault_pass", cloudAdmin.password);
    }

    return { 
      success: true, 
      count,
      message: `Successfully imported ${count} users and settings from Supabase to Local Storage!` 
    };
  } catch (err) {
    return { success: false, message: `Import failed: ${err.message}` };
  }
}

/**
 * Updates the Supabase Status Pill in the UI
 */
function updateSupabaseStatusUI() {
  const statusPill = document.getElementById("supabase-status-pill");
  const statusText = document.getElementById("supabase-status-text");
  const config = getSupabaseConfig();

  if (!statusPill) return;

  if (!config.url || !config.anonKey) {
    statusPill.textContent = "🟡 LOCAL MODE";
    statusPill.className = "db-status-badge local";
    if (statusText) statusText.textContent = "Running on Local Storage (Supabase not configured). Configure below to enable cloud DB.";
  } else if (sbConnectionState === "connected") {
    statusPill.textContent = "🟢 SUPABASE CONNECTED";
    statusPill.className = "db-status-badge live";
    if (statusText) statusText.textContent = `Connected to Supabase PostgreSQL: ${config.url}`;
  } else {
    statusPill.textContent = "🔴 OFFLINE / DISCONNECTED";
    statusPill.className = "db-status-badge offline";
    if (statusText) statusText.textContent = "Failed to connect to Supabase. Operating with local offline fallback.";
  }
}

// Background sync helpers called by app.js
async function refreshUsersFromSupabase() {
  const users = await sbFetchUsers();
  if (Array.isArray(users) && users.length > 0) {
    localStorage.setItem("re_music_users", JSON.stringify(users));
  }
}

async function refreshSettingsFromSupabase() {
  const globalLogin = await sbFetchGlobalUserLogin();
  if (globalLogin !== null) {
    localStorage.setItem("re_global_user_login", globalLogin ? "true" : "false");
  }
}

// ==============================================================================
// CMS (CONTENT MANAGEMENT SYSTEM) SUPABASE STORAGE
// ==============================================================================

/**
 * Fetches all CMS data from Supabase system_settings
 */
async function sbFetchCmsData() {
  if (!sbClient) return null;

  try {
    const { data, error } = await sbClient
      .from("system_settings")
      .select("key, value")
      .in("key", ["cms_scripts", "cms_pitches", "cms_bikes", "cms_objections"]);

    if (error) throw error;
    if (!data || data.length === 0) return null;

    const cms = {};
    data.forEach(item => {
      cms[item.key] = item.value;
    });
    return cms;
  } catch (err) {
    console.warn("[Supabase CMS] Failed to fetch CMS data:", err.message);
    return null;
  }
}

/**
 * Saves a specific CMS section to Supabase system_settings
 */
async function sbSaveCmsKey(key, value) {
  if (!sbClient) return false;

  try {
    const { error } = await sbClient
      .from("system_settings")
      .upsert({
        key: key,
        value: value,
        updated_at: new Date().toISOString()
      }, { onConflict: "key" });

    if (error) throw error;
    await sbLogActivity("Admin", "CMS_UPDATE", `Updated CMS section: "${key}"`);
    return true;
  } catch (err) {
    console.error(`[Supabase CMS] Failed to save ${key}:`, err);
    return false;
  }
}

/**
 * Pushes all CMS datasets to Supabase in a batch merge
 */
async function sbPushAllCmsData(scripts, pitches, bikes, objections) {
  if (!sbClient) {
    return { success: false, message: "Supabase client is not connected." };
  }

  try {
    const records = [
      { key: "cms_scripts", value: scripts, updated_at: new Date().toISOString() },
      { key: "cms_pitches", value: pitches, updated_at: new Date().toISOString() },
      { key: "cms_bikes", value: bikes, updated_at: new Date().toISOString() },
      { key: "cms_objections", value: objections, updated_at: new Date().toISOString() }
    ];

    const { error } = await sbClient
      .from("system_settings")
      .upsert(records, { onConflict: "key" });

    if (error) throw error;
    await sbLogActivity("Admin", "CMS_MERGE_ALL", "Merged and pushed all CMS content (Scripts, Bikes, Objections, Pitches) to Supabase");
    return { success: true, message: "All CMS content merged & synchronized to Supabase Cloud Database!" };
  } catch (err) {
    return { success: false, message: `Failed to push CMS data: ${err.message}` };
  }
}

// Auto-initialize when script loads
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    initSupabaseClient();
  });
}

