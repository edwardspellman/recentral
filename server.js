const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJsonFile(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      return fallback;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading JSON file " + filePath + ":", e);
    return fallback;
  }
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("Error writing JSON file " + filePath + ":", e);
    return false;
  }
}

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ico": "image/x-icon",
  ".sql": "text/plain"
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // --- API ENDPOINTS ---
  if (pathname === "/api/users" && req.method === "GET") {
    const users = readJsonFile(USERS_FILE, []);
    const settings = readJsonFile(SETTINGS_FILE, { globalUserLogin: true });
    return sendJson(res, 200, { success: true, users, settings });
  }

  if (pathname === "/api/users" && req.method === "POST") {
    const body = await parseBody(req);
    if (Array.isArray(body.users)) {
      writeJsonFile(USERS_FILE, body.users);
      if (typeof body.globalUserLogin === "boolean") {
        writeJsonFile(SETTINGS_FILE, { globalUserLogin: body.globalUserLogin });
      }
      return sendJson(res, 200, { success: true, message: "Users saved to server successfully!" });
    }
    return sendJson(res, 400, { success: false, error: "Invalid user list payload" });
  }

  if (pathname === "/api/admin-creds" && req.method === "GET") {
    const admin = readJsonFile(ADMIN_FILE, { user: "Spellman", pass: "Anonymous099m" });
    return sendJson(res, 200, { success: true, admin: { user: admin.user } });
  }

  if (pathname === "/api/admin-creds" && req.method === "POST") {
    const body = await parseBody(req);
    if (body.user && body.pass) {
      writeJsonFile(ADMIN_FILE, { user: body.user, pass: body.pass });
      return sendJson(res, 200, { success: true, message: "Admin credentials saved to server!" });
    }
    return sendJson(res, 400, { success: false, error: "Invalid admin payload" });
  }

  if (pathname === "/api/global-access" && req.method === "POST") {
    const body = await parseBody(req);
    if (typeof body.globalUserLogin === "boolean") {
      writeJsonFile(SETTINGS_FILE, { globalUserLogin: body.globalUserLogin });
      return sendJson(res, 200, { success: true, globalUserLogin: body.globalUserLogin });
    }
    return sendJson(res, 400, { success: false, error: "Invalid globalUserLogin boolean" });
  }

  // --- STATIC FILE SERVER ---
  let filePath = path.join(__dirname, pathname === "/" ? "index.html" : pathname);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    if (pathname === "/") {
      filePath = path.join(__dirname, "index.html");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Server Error: " + err.message);
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*"
      });
      res.end(content);
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 REcentral Server running live on port ${PORT}`);
  console.log(`📂 Server Data directory: ${DATA_DIR}`);
});
