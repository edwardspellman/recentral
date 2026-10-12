/* ==========================================================================
   REcentral - Royal Enfield Call Center Companion Main JavaScript Logic
   ========================================================================== */

// --- 1. SCRIPT DATASET (Bengali, Hindi, English) ---
const CALL_SCRIPTS = {
  bn: {
    name: "Bengali (বাংলা)",
    steps: [
      { id: "opening", title: "Opening", text: "Good Morning/Afternoon/Evening Sir/Ma'am.\nAmar naam <Agent Name>, ami Royal Enfield Central Team theke kotha bolchi." },
      { id: "rpc", title: "RPC Confirmation", text: "Ami ki <Customer Name>-er sathe kotha bolchi?" },
      { id: "model_conf", title: "Model Confirmation (P1)", text: "<Bike Model>-e interest dekhanor jonno dhonnobad. Eta ekta khub bhalo choice.\n\n<Model Pitch Bengali>" },
      { id: "buying_time", title: "Buying Time (P1)", text: "<Customer Name>, may I know apni kobe nagad bike-ta purchase korar planning korchen?\n\nToh sir, Apni ki 45 days-er modhye ki bike-ta purchase korte comfortable??\n\nApni ei bike-e Dual Channel ABS ebong 350cc Air Cooled / 440/450/650 Air-Oil Cooled Engine paben. Bike-er features somporke ar kichu jante chan?" },
      { id: "prebook_sug", title: "Pre-Book Suggestion", text: "Sir, ami ki jante pari apni bike ta ato late e purchase korar plan keno korchen?\n\nSir/Ma'am, <Bike Model>-er high demand-er jonno ami suggest korbo apni bike-ta pre-book kore rakhte paren, jate apni fast delivery pete paren.\n\nToh sir, apni ki 45 days-er modhye Bike ta Pre-Book comfortable?" },
      { id: "dealer_conf", title: "Dealer Confirmation (P1)", text: "Ami dekhte pachhi apnar nearest dealership. Sekhane visit korte ki apnar comfortable hobe?" },
      { id: "test_ride_sug", title: "Test Ride Suggestion (P2)", text: "Ami suggest korbo apni ekbar test ride nin, jate bike-er power ebong performance real-time experience korte paren. May I know kon din ebong kon time apnar jonno test ride comfortable hobe?" },
      { id: "test_ride_conf", title: "Test Ride Confirmation", text: "(Confirm date & time: <Test Ride Slot>)\nAmi eta note kore nichhi, ebong dealer 4 working hours-er moddhe apnake call kore test ride confirm korben." },
      { id: "probing", title: "Probings (Cash / Finance)", text: "Apni bike-ta Cash-e purchase korben, na Finance-er madhyome?\n<Bike Model>-er jonno ki apni kono specific colour ba variant decide korechen?" },
      { id: "alt_num", title: "Alternate Number (P2)", text: "Apni ki kono alternate contact number use koren?" },
      { id: "value_add", title: "Value Add Point", text: "Sob details share korar jonno dhonnobad. Dealer visit korar somoy test ride-er jonno please apnar Driving License songe niye jaben." },
      { id: "exchange_probing", title: "Offers & Exchange Probings", text: "<Customer Name>, apni ki kono vehicle Exchange korte chan??\n\nSir, ekhon Royal Enfield exchange benefits diche jekhane apni upto 5000 porjonto pate paren jodi Apni 350cc, 440cc, 450cc motorcycle purchase koren, ebong 650cc-er jonno apni upto 6500 porjonto benefit pate paren. Ei bisoye details-e janate dealership team apnar sathe connect korbe." },
      { id: "assistance", title: "Further Assistance", text: "Royal Enfield bike somporke apni ki ar kono information jante chan?\nFuture-e Royal Enfield somporke kono information proyojon hole, apni amader official website royalenfield.com visit korte paren." },
      { id: "closing", title: "Closing", text: "Royal Enfield-ke apnar valuable time dewar jonno onek dhonnobad.\nApnar din-ta shubho hok!" }
    ]
  },
  hi: {
    name: "Hindi (हिंदी)",
    steps: [
      { id: "opening", title: "Opening", text: "Good Morning/Afternoon/Evening Sir/Ma'am.\nMera naam <Agent Name> hai, aur main Royal Enfield ki Central Team se baat kar rha/rhi hu." },
      { id: "rpc", title: "RPC Confirmation", text: "Kya meri baat <Customer Name> se ho rahi hai?" },
      { id: "model_conf", title: "Model Confirmation (P1)", text: "Dhanyawaad <Bike Model> mein interest show karne ke liye. Kafi achchi choice h aapki.\n\n<Model Pitch Hindi>" },
      { id: "buying_time", title: "Buying Time (P1)", text: "<Customer Name>, aap kab tak bike purchase krne ka plan kar rhe hain?\n\nToh sir, kya aap 45 days ke andar bike purchase karne mein comfortable hain??\n\nBike ke features ke baare me aap or kuchh janna chah rahe hain?" },
      { id: "prebook_sug", title: "Pre-Book Suggestion", text: "Sir, kya main jaan sakta/sakthi hu aap bike itna late purchase karne ka plan kyun kar rahe hain?\n\nSir/Ma'am, <Bike Model> ki high demand ko dekhte hue main aapko suggest karunga/karungi ki aap bike ko pre-book kar lijiye, jisse aapko fast delivery mil sake.\n\nToh sir, kya aap 45 days ke andar Bike ta Pre-Book comfortable hain?" },
      { id: "dealer_conf", title: "Dealer Confirmation (P1)", text: "Jaisa ki mai check kar paa rha/rhi hu aapke nearby jo dealership hai, aap comfortable rahenge yaha par visit karne ke liye?" },
      { id: "test_ride_sug", title: "Test Ride Suggestion (P2)", text: "Saath hi mai aapko suggest karna chahunga/chahungi ki aap vehicle ki test ride bhi lijiye jisse ki aap uski power and performance real time par experience kar payenge. To aap kb tak comfortable rhenge test ride ke liye?" },
      { id: "test_ride_conf", title: "Test Ride Confirmation", text: "(Confirm Date & time for test ride: <Test Ride Slot>)\nMai yaha aapki preference mention kar deta/deti hu and dealer aapko within 4 working hours me call kar lenge test ride confirmation ke liye." },
      { id: "probing", title: "Probings (Cash / Finance)", text: "Aap vehicle cash me lene ka plan kar rhe h ya finance par?\nAapne koi color ya variant decide kiya h <Bike Model> me?" },
      { id: "alt_num", title: "Alternate Number (P2)", text: "Aap koi alternate number use karte hain?" },
      { id: "value_add", title: "Value Add Point", text: "Dhanyawaad saari details provide karne ke liye saath hi aap jab bhi dealership par test ride ke liye visit kare apna driving license apne zarur carry kijiyega." },
      { id: "exchange_probing", title: "Offers & Exchange Probings", text: "<Customer Name>, kya aap koi vehicle Exchange karna chahte hain??\n\nSir, abhi Royal Enfield exchange benefits de rhi h jahan aap upto 5000 tak ka benefit pa sakte hain agar aap 350cc, 440cc, 450cc motorcycle purchase karte hain, aur 650cc ke liye aap upto 6500 tak ka benefit pa sakte hain. Is vishay me details me batane ke liye dealership team aapke sath connect karegi." },
      { id: "assistance", title: "Further Assistance", text: "Aur koi information janna chahenge aap Royal Enfield bike ke regarding?\nIn future agar aapko Royal Enfield ke regarding kisi bhi information ki need hoti hai to aap humari official website royalenfield.com par visit kar sakte hain." },
      { id: "closing", title: "Closing", text: "Royal Enfield me apna keemati samay dene ka dhanyawaad.\nAapka din shubh rahe!" }
    ]
  },
  en: {
    name: "English",
    steps: [
      { id: "opening", title: "Opening", text: "Good Morning/Afternoon/Evening Sir/Ma'am.\nMy name is <Agent Name>, and I am calling from the Royal Enfield Central Team." },
      { id: "rpc", title: "RPC Confirmation", text: "Am I speaking with <Customer Name>?" },
      { id: "model_conf", title: "Model Confirmation (P1)", text: "Thank you for showing interest in the <Bike Model>. It’s a very great choice.\n\n<Model Pitch English>" },
      { id: "buying_time", title: "Buying Time (P1)", text: "<Customer Name>, may I know by when are you planning to purchase the bike?\nSo sir/ma'am, may I know if you are comfortable purchasing the bike within 45 days??\n\nWould you like to know anything more about the features of the bike?" },
      { id: "prebook_sug", title: "Pre-Book Suggestion", text: "Sir/Ma'am, may I know why you are planning to purchase the bike so late?\n\nConsidering the high demand for the <Bike Model>, I would suggest to pre-book your motorcycle to ensure faster delivery.\n\nSo sir/ma'am, are you comfortable to Pre-Book the bike within 45 days?" },
      { id: "dealer_conf", title: "Dealer Confirmation (P1)", text: "As I can see, your nearest dealership is available nearby. Would you be comfortable visiting there?" },
      { id: "test_ride_sug", title: "Test Ride Suggestion (P2)", text: "I would also suggest that you take a test ride of the vehicle so that you can experience its power and performance in real time. So may I know when would you be comfortable taking the test ride?" },
      { id: "test_ride_conf", title: "Test Ride Confirmation", text: "(Confirm date & time for test ride: <Test Ride Slot>)\nI will mention it here, and the dealer will call you within 4 working hours to confirm the test ride." },
      { id: "probing", title: "Probing & Exchange Offer", text: "Mr./Ms. <Customer Name>, are you looking for any exchange of your existing motorcycle?\nCurrently, Royal Enfield is offering exchange benefits up to ₹5,000 for 350cc & 450cc and up to ₹6,500 on 650cc motorcycles.\nAre you planning to purchase the vehicle in cash or through finance?" },
      { id: "alt_num", title: "Alternate Number (P2)", text: "Do you use any alternate contact number?" },
      { id: "value_add", title: "Value Add Point", text: "Thank you for providing all the details. Also, whenever you visit the dealership for the test ride, please carry your driving license along with you." },
      { id: "exchange_probing", title: "Offers & Exchange Probings", text: "<Customer Name>, would you like to Exchange any vehicle??\n\nSir/Ma'am, Royal Enfield is currently offering exchange benefits where you can get up to Rs. 5000 benefit on purchasing 350cc, 440cc, 450cc motorcycles, and up to Rs. 6500 benefit for 650cc models. Our dealership team will connect with you to provide complete details regarding this." },
      { id: "assistance", title: "Further Assistance", text: "Would you like to know any other information regarding Royal Enfield bikes?\nIn the future, if you need any information about Royal Enfield, you can visit our official website royalenfield.com." },
      { id: "closing", title: "Closing", text: "Thank you for giving your valuable time to Royal Enfield.\nHave a wonderful day!" }
    ]
  }
};

// Model Pitches in 3 languages
const MODEL_PITCHES = {
  "Bullet 350": {
    bn: "Eta ekta heritage-style bike, ja daily ride ebong city commuting-er jonno best. Jara strong road presence pochondo koren, tader jonno-o eta perfect option.",
    hi: "Heritage look ki bike h jo ki daily ride and city commuting ke liye best hai, sath hi jo riders strong road presence ko pasand karte hain unke liye ye perfect option hai.",
    en: "It is a heritage-style bike which is best for daily rides and city commuting. It is also a perfect option for riders who like a strong road presence."
  },
  "Classic 350": {
    bn: "Jodi apni vintage look-er sathe comfort ebong reliability chan, tahole Classic 350 ekdom ideal choice. Eta city ride ebong weekend ride—duitar jonnoi khub comfortable.",
    hi: "Agar aapko vintage look ke saath comfort aur reliability bhi chahiye, toh Classic 350 ek ideal choice hai jo ki city aur casual dono rides ke liye kafi comfortable vehicle hai.",
    en: "If you want a vintage look along with comfort and reliability, the Classic 350 is an ideal choice. It is very comfortable for both city rides and weekend rides."
  },
  "Hunter 350": {
    bn: "Eta ekta roadster segment-er bike. Young riders ba city commuting-er jonno Hunter ekta great option, karon eta style ebong performance duitoi provide kore.",
    hi: "Ek roadster segment ki bike hai jo ki young riders aur city commute ke liye Hunter ek great option hai jo aapko style aur performance dono ek saath provide krti hai.",
    en: "It is a roadster segment bike, and for young riders or city commuting, Hunter is a great option as it offers both style and performance together."
  },
  "Meteor 350": {
    bn: "Eta ekta cruiser segment-er bike, ja long-distance highway cruising-er jonno best option.",
    hi: "Cruiser segment ki bike hai jo ki long-distance highway cruising ke liye best option hai.",
    en: "It is a cruiser segment bike, which is the best option for long-distance highway cruising."
  },
  "Goan Classic 350": {
    bn: "Eta ekta bobber segment-er bike, ja city ride ebong casual commuting-er jonno perfect.",
    hi: "Bobber segment ki bike hai jo ki city ride and casual commuting ke liye perfect option hai.",
    en: "It is a bobber segment bike, which is perfect for city rides and casual commuting."
  },
  "Scram 440": {
    bn: "Eta ekta adventure segment-er bike, ja casual ebong urban commuting-er jonno best suited.",
    hi: "Adventure segment ki bike hai jo ki casual and urban commuting ke liye best hai.",
    en: "It is an adventure segment bike, which is best suited for casual and urban commuting."
  },
  "Himalayan 450": {
    bn: "Adventure touring-er jonno eta ekta excellent option. Eta rugged build ebong high ground clearance-er sathe ashe.",
    hi: "Adventure touring ke liye best option hai jo ki rugged build aur high ground clearance ke saath available hoti hai.",
    en: "It is a great option for adventure touring, available with a rugged build and high ground clearance."
  },
  "Guerrilla 450": {
    bn: "Eta ekta premium roadster segment-er bike, ja agile city riding ebong spirited performance-er jonno porichito.",
    hi: "Premium roadster segment ki bike hai jo ki agile city riding and spirit performance ke liye jani jati hai.",
    en: "It is a premium roadster segment bike, known for agile city riding and spirited performance."
  },
  "Interceptor 650": {
    bn: "Eta ekta premium roadster bike, ja cool retro-style look dey ebong daily o city ride-er jonno khub comfortable.",
    hi: "Premium roadster segment ki bike hai jo ki retro style ke saath cool look bhi provide krti hai saath hi daily & city rides ke liye kaafi comfortable hai.",
    en: "It is a premium roadster bike that offers a cool retro style look and is also very comfortable for daily and city rides."
  },
  "Continental GT 650": {
    bn: "Eta ekta cafe racer segment-er bike, ja short-distance riding, casual ride ebong city commuting-er jonno best.",
    hi: "Cafe racer segment ki bike hai jo ki short distance racing, casual & city commuting ke liye best option hai.",
    en: "It is a cafe racer segment bike, which is best for short-distance racing, casual riding, and city commuting."
  },
  "Super Meteor 650": {
    bn: "Eta ekta cruiser segment-er bike, ja long-distance highway cruising-er jonno best option.",
    hi: "Cruiser segment ki bike hai jo ki long-distance highway cruising ke liye best option hai.",
    en: "It is a cruiser segment bike, which is the best option for long-distance highway cruising."
  },
  "Shotgun 650": {
    bn: "Eta ekta premium roadster bike, ja city ride ebong daily commuting-er jonno ideal.",
    hi: "Premium roadster segment ki bike hai jo ki city rides and daily commuting ke liye best option hai.",
    en: "It is a premium roadster bike that is ideal for city rides and daily commuting."
  },
  "Bear 650": {
    bn: "Eta ekta premium roadster bike, jar retro ebong aesthetic look ache, ebong daily ride o city commuting-er jonno perfect.",
    hi: "Premium roadster segment ki bike hai jo ki retro and asthetic look ke saath hi daily ride or city commuting ke liye perfection option hai.",
    en: "It is a premium roadster bike with a retro and aesthetic look and is perfect for daily rides and city commuting."
  },
  "Classic 650": {
    bn: "Eta ekta premium tourer bike, ja vintage look provide kore ebong daily ride o city commuting-er jonno khub bhalo option.",
    hi: "Premium tourer bike hai jo ki vintage look provide krti hai saath hi daily ride or city commuting ke liye kafi best option hai.",
    en: "It is a premium tourer bike that offers a vintage look and is also a great option for daily rides and city commuting."
  },
  "Bullet 650": {
    bn: "Eta ekta premium heritage segment-er bike, ja daily ride ebong city commuting-er jonno khub comfortable.",
    hi: "Premium Heritage segment ki bike hai jo ki daily ride and city commuting ke liye perfect option hai.",
    en: "It is a premium heritage segment bike which is comfortable for daily ride and city commuting."
  }
};

// --- 2. BIKE SPECIFICATIONS DATABASE ---
const BIKE_SPECS = [
  {
    id: "bullet-350",
    name: "Bullet 350",
    category: "Heritage",
    terrain: "In-city / Highway",
    usage: "Casual / Commute",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "805 mm",
    weight: "195 kg",
    fuelCapacity: "13 L",
    groundClearance: "170 mm",
    mileage: "37 km/L",
    suspension: "Front: 41mm Telescopic Forks | Rear: Twin Tube Emulsion Shock Absorbers (6-step adjustable)",
    frontTyre: "100/90-19 Tube Type",
    rearTyre: "120/80-18 Tube Type",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/bullet-350/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/bullet350"
  },
  {
    id: "classic-350",
    name: "Classic 350",
    category: "Vintage",
    terrain: "In-city / Highway",
    usage: "Casual / Commute",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "805 mm",
    weight: "195 kg",
    fuelCapacity: "13 L",
    groundClearance: "170 mm",
    mileage: "41.5 km/L",
    suspension: "Front: 41mm Telescopic Forks | Rear: Twin Tube Emulsion Shock (6-step preload)",
    frontTyre: "100/90-19 Tubeless / Spoke",
    rearTyre: "120/80-18 Tubeless / Spoke",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/classic-350/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/classic-350"
  },
  {
    id: "hunter-350",
    name: "Hunter 350",
    category: "Roadster",
    terrain: "In-city",
    usage: "Casual / Commute",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "790 mm",
    weight: "181 kg",
    fuelCapacity: "13 L",
    groundClearance: "150.5 mm",
    mileage: "36.2 km/L",
    suspension: "Front: Telescopic 41mm | Rear: Twin tube Emulsion shock absorbers",
    frontTyre: "100/80-17 Tubeless",
    rearTyre: "140/70-17 Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/hunter-350/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/hunter-350"
  },
  {
    id: "meteor-350",
    name: "Meteor 350",
    category: "Cruiser",
    terrain: "In-city / Highway",
    usage: "Touring",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "765 mm",
    weight: "191 kg",
    fuelCapacity: "15 L",
    groundClearance: "170 mm",
    mileage: "41.9 km/L",
    suspension: "Front: Telescopic 41mm | Rear: Twin tube Emulsion 6-step preload",
    frontTyre: "100/90-19 Tubeless",
    rearTyre: "140/70-17 Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/meteor/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/meteor-350"
  },
  {
    id: "goan-classic-350",
    name: "Goan Classic 350",
    category: "Bobber",
    terrain: "In-city",
    usage: "Casual / Commute",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "750 mm",
    weight: "188 kg",
    fuelCapacity: "13 L",
    groundClearance: "170 mm",
    mileage: "36.2 km/L",
    suspension: "Front: Telescopic 41mm | Rear: Twin Tube Emulsion 6-step preload",
    frontTyre: "100/90-19 Tubeless",
    rearTyre: "130/90-16 Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/goan-classic-350/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/goan-350"
  },
  {
    id: "scram-440",
    name: "Scram 440",
    category: "Adventure",
    terrain: "In-city / Trail",
    usage: "Casual / Commute",
    engine: "443cc Single Cylinder / Air-Oil Cooled",
    power: "25.4 BHP @ 6250 rpm",
    torque: "34 Nm @ 4000 rpm",
    gearbox: "6-Speed",
    seatHeight: "795 mm",
    weight: "187 kg",
    fuelCapacity: "15 L",
    groundClearance: "200 mm",
    mileage: "29.5 km/L",
    suspension: "Front: Telescopic 41mm | Rear: Monoshock with linkage",
    frontTyre: "100/90-19 Dual Purpose",
    rearTyre: "120/90-17 Dual Purpose",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/scram-440/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/scram-440"
  },
  {
    id: "himalayan-450",
    name: "Himalayan 450",
    category: "Adventure",
    terrain: "Adventure / Trail / All Roads",
    usage: "Touring / Offroad",
    engine: "452cc Single Cylinder / Liquid-cooled (Sherpa 450)",
    power: "40.2 PS @ 8000 rpm",
    torque: "40 Nm @ 5500 rpm",
    gearbox: "6-Speed",
    seatHeight: "825 mm",
    weight: "181 kg",
    fuelCapacity: "17 L",
    groundClearance: "230 mm",
    mileage: "30 km/L",
    suspension: "Front: Upside down fork 43mm (Showa) | Rear: Linkage Type Mono Shock",
    frontTyre: "90/90-21 Tube Type",
    rearTyre: "140/80 R17 Tube Type",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/new-himalayan/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/Himalayan"
  },
  {
    id: "guerrilla-450",
    name: "Guerrilla 450",
    category: "Premium Roadster",
    terrain: "In-city / Highway",
    usage: "Casual / Commute / Spirited",
    engine: "452cc Single Cylinder / Liquid-cooled",
    power: "40.2 PS @ 8000 rpm",
    torque: "40 Nm @ 5500 rpm",
    gearbox: "6-Speed",
    seatHeight: "780 mm",
    weight: "184 kg",
    fuelCapacity: "11 L",
    groundClearance: "169 mm",
    mileage: "29.5 km/L",
    suspension: "Front: 140mm Telescopic | Rear: Linkage Type Monoshock",
    frontTyre: "120/70 R17 Tubeless",
    rearTyre: "160/60 R17 Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/guerrilla-450/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/guerrilla-450"
  },
  {
    id: "interceptor-650",
    name: "Interceptor 650",
    category: "Premium Roadster",
    terrain: "In-city / Highway / Twisties",
    usage: "Casual / Commute / Sporty",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.9 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "804 mm",
    weight: "218 kg",
    fuelCapacity: "13.7 L",
    groundClearance: "174 mm",
    mileage: "25 km/L",
    suspension: "Front: Telescopic Forks | Rear: Twin Gas Charged Shock Absorbers",
    frontTyre: "100/90-18 Tubeless",
    rearTyre: "130/70-R18 Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/interceptor/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/interceptor-650"
  },
  {
    id: "continental-gt-650",
    name: "Continental GT 650",
    category: "Cafe Racer",
    terrain: "In-city / Twisties",
    usage: "Casual / Short Race",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.9 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "804 mm",
    weight: "214 kg",
    fuelCapacity: "12.5 L",
    groundClearance: "174 mm",
    mileage: "27 km/L",
    suspension: "Front: Telescopic Forks | Rear: Twin Gas Charged Shock-absorbers",
    frontTyre: "100/90-18 Tubeless",
    rearTyre: "130/70-R18 Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/continental-gt/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/continental-gt-650"
  },
  {
    id: "super-meteor-650",
    name: "Super Meteor 650",
    category: "Cruiser",
    terrain: "Highway Cruising",
    usage: "Long Distance Touring",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.6 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "740 mm",
    weight: "241 kg",
    fuelCapacity: "15.7 L",
    groundClearance: "135 mm",
    mileage: "25 km/L",
    suspension: "Front: 43mm USD Forks (120mm travel) | Rear: Twin Shocks 101mm travel",
    frontTyre: "100/90-19 Tubeless",
    rearTyre: "150/80-B16 Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/super-meteor-650/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/supermeteor-650"
  },
  {
    id: "shotgun-650",
    name: "Shotgun 650",
    category: "Premium Roadster",
    terrain: "In-city / Highway",
    usage: "Casual / Commute",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.6 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "795 mm",
    weight: "240 kg",
    fuelCapacity: "13.8 L",
    groundClearance: "140 mm",
    mileage: "22 km/L",
    suspension: "Front: Showa SFF-BP USD Forks (120mm travel) | Rear: Showa Twin Shock 90mm travel",
    frontTyre: "100/90-18 Tubeless",
    rearTyre: "150/70-R17 Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/shotgun-650/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/shotgun-650"
  },
  {
    id: "bear-650",
    name: "Bear 650",
    category: "Premium Scrambler Roadster",
    terrain: "In-city / Off-road",
    usage: "Casual / Bad-Road Heritage",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.9 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "830 mm",
    weight: "216 kg",
    fuelCapacity: "13.7 L",
    groundClearance: "184 mm",
    mileage: "22 km/L",
    suspension: "Front: USD Telescopic Fork 43mm | Rear: Twin shock absorbers",
    frontTyre: "100/90-19 MRF Nylorex",
    rearTyre: "140/80-R17 MRF Nylorex",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/bear-650/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/bear-650/"
  },
  {
    id: "classic-650",
    name: "Classic 650",
    category: "Premium Tourer / Vintage",
    terrain: "In-city / Highway",
    usage: "Casual / Commute / Touring",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.6 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5650 rpm",
    gearbox: "6-Speed",
    seatHeight: "800 mm",
    weight: "243 kg",
    fuelCapacity: "14.8 L",
    groundClearance: "154 mm",
    mileage: "21.45 km/L",
    suspension: "Front: Telescopic Fork 43mm | Rear: Twin Shock absorbers",
    frontTyre: "100/90-R19",
    rearTyre: "140/70-R18",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/classic-650/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/classic-650"
  },
  {
    id: "bullet-650",
    name: "Bullet 650",
    category: "Premium Heritage",
    terrain: "In-city / Highway",
    usage: "Casual / Commute / Legacy",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.6 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5650 rpm",
    gearbox: "6-Speed",
    seatHeight: "800 mm",
    weight: "243 kg",
    fuelCapacity: "14.8 L",
    groundClearance: "154 mm",
    mileage: "21.45 km/L",
    suspension: "Front: Telescopic Fork 43mm | Rear: Twin Shock absorbers",
    frontTyre: "100/90-R19",
    rearTyre: "140/70-R18",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/bullet-650/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/Bullet-650/"
  }
];

// --- 3. OBJECTION REBUTTALS DATABASE ---
const OBJECTION_REBUTTALS = [
  {
    id: "offers",
    topic: "Offers & Exchange Benefit",
    rebuttal: "Sir/Ma'am right now Royal Enfield is providing exchange benefits of up to ₹5,000 for 350cc/450cc motorcycles and up to ₹6,500 for 650cc motorcycles if you exchange your existing vehicle. For detailed terms, our dealership team will connect with you."
  },
  {
    id: "finance",
    topic: "Finance & EMI Plans",
    rebuttal: "Finance depends on your banking profile and CIBIL score. Minimum downpayment starts from ₹20,000. Approximate EMI: For ₹1 Lakh loan at 36 months tenure, EMI is ~₹3,319/month; for 72 months tenure, EMI is ~₹1,888/month. The dealership finance desk will give exact quotes."
  },
  {
    id: "reown",
    topic: "Vehicle Exchange (REown Portal)",
    rebuttal: "You can exchange your bike directly at the dealership or visit royalenfield.com under the 'REown' section (Buy, Exchange & Sell). Fill in your vehicle details and our concern team will contact you shortly."
  },
  {
    id: "cibil",
    topic: "Low CIBIL Score",
    rebuttal: "Sir/Ma'am, you can take finance under a family member's name who has a strong CIBIL score. Please consult the finance executive at your nearest dealership for assistance."
  },
  {
    id: "mileage",
    topic: "Vehicle Mileage Inquiry",
    rebuttal: "Sir/Ma'am, our bikes provide optimal mileage (approx 25–41 km/L depending on engine capacity) provided regular servicing is done. Mileage depends on riding style, traffic, and road conditions."
  },
  {
    id: "csd",
    topic: "CSD / Defense Canteen Purchase",
    rebuttal: "Please note that CSD facility availability depends on the specific dealership. If your nearby dealership has CSD authorization, they will guide you through the defense purchasing paperwork."
  },
  {
    id: "whatsapp",
    topic: "Request Details on WhatsApp / Text",
    rebuttal: "Sir/Ma'am, as this is a system-generated call, I will note down your interest here so the dealer sends you the brochure on WhatsApp. You can also download official brochures directly from royalenfield.com."
  },
  {
    id: "waiting",
    topic: "Waiting Period & Delivery Date",
    rebuttal: "Exact delivery dates depend on dealer stock availability. We recommend early booking to reserve your spot. I will schedule a call back from the dealership manager to confirm current stock."
  },
  {
    id: "home_tr",
    topic: "Home Test Ride Request",
    rebuttal: "Home test rides are available depending on dealership location and distance. I will mark your preference here so the dealer can coordinate a doorstep test ride if available."
  },
  {
    id: "accessories",
    topic: "Customization & Accessories Charges",
    rebuttal: "Royal Enfield offers official Make-It-Yours (MIY) genuine accessories. When you visit the dealership for a test ride, the team will demonstrate all available accessories and pricing."
  },
  {
    id: "on_road_price",
    topic: "On-Road Price Details",
    rebuttal: "On-road pricing varies by state and city due to RTO registration and Insurance charges. I can share the ex-showroom price right now, and the dealer will provide the final on-road breakdown."
  },
  {
    id: "warranty",
    topic: "Warranty & Extended Warranty",
    rebuttal: "Royal Enfield bikes come with a standard manufacturer warranty (3 Years / 30,000 km for 350cc, 3 Years / Unlimited km for 650cc). Extended warranty plans are also available at the dealership."
  },
  {
    id: "rsa",
    topic: "Roadside Assistance (RSA)",
    rebuttal: "Royal Enfield offers 24/7 Roadside Assistance for breakdown support across India. Subscription details can be confirmed at the dealership or on royalenfield.com."
  }
];

// --- 4. DISPOSITIONS ---
const DISPOSITIONS = [
  { code: "BKR", name: "BKR (Booked <= 15 Days)", desc: "Customer planning to purchase/book within 15 days" },
  { code: "TRR", name: "TRR (Test Ride Requested)", desc: "Test ride requested within a month" },
  { code: "L1 Verified", name: "L1 Verified (16-45 Days)", desc: "Customer planning to purchase within 16 to 45 days" },
  { code: "CALBAK", name: "CALBAK (Callback)", desc: "Customer is busy, requested callback later" },
  { code: "CDRP", name: "CDRP (Call Drop)", desc: "Call dropped / Redial required" },
  { code: "LOP", name: "LOP (Lost - Purchased)", desc: "Customer has already purchased RE or another brand" },
  { code: "LNP", name: "LNP (Lost - Not Purchasing)", desc: "Customer does not want to purchase RE" }
];

// --- 5. APPLICATION STATE ---
let currentState = {
  lang: "bn",
  currentStepIndex: 0,
  selectedBike: BIKE_SPECS[0],
  agentName: "",
  customerTitle: "Mr.",
  customerName: "",
  testRideSlot: "Tomorrow 4:00 PM",
  selectedDispo: "BKR",
  isWithin45Days: null, // null, true (YES - disable Step 5), false (NO - enable Step 5)
  isPreBookAgreed: null, // null, true (YES - continue), false (NO - disable Steps 6-11)
  summaryFields: {
    keyEnquiry: "P1",
    buyingTime: "Within 15 Days",
    testRideSlot: "Tomorrow 4:00 PM",
    color: "Default",
    altNum: "N/A",
    paymentMode: "Finance"
  }
};

// --- 6. INITIALIZATION & EVENT LISTENERS ---
// --- 12. THEME TOGGLE LOGIC ---
function initTheme() {
  const savedTheme = localStorage.getItem("re_central_theme") || "dark";
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const iconEl = document.getElementById("theme-toggle-icon");
  if (iconEl) {
    iconEl.textContent = theme === "light" ? "☀️" : "🌙";
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("re_central_theme", next);
  applyTheme(next);
  
  // Stop music if playing when theme mode is changed!
  stopVaultAudio();

  showToast(`Switched to ${next === "light" ? "Light Mode ☀️" : "Dark Mode 🌙"}`);
}

// --- 13. ADMIN MUSIC VAULT LOGIC ---
let vaultState = {
  isUnlocked: false,
  playlist: [
    { title: "Aarzu", url: "music/Aarzu.mp3" },
    { title: "Afsos", url: "music/Afsos.mp3" },
    { title: "Pal Pal - Afusic", url: "music/Afusic - Pal Pal (Official Music Video) Prod. @AliSoomroMusic.mp3" },
    { title: "Jo Tum Mere Ho - Anuv Jain", url: "music/Anuv Jain - JO TUM MERE HO (Official Video).mp3" },
    { title: "Arz Kiya Hai - Anuv Jain X Lost Stories", url: "music/Anuv Jain X Lost Stories - Arz Kiya Hai (Official Video)  Coke Studio Bharat.mp3" },
    { title: "Baarishein", url: "music/Baarishein.mp3" },
    { title: "Dooron Dooron - Paresh Pahuja & Harleen Sethi", url: "music/Dooron Dooron (Official Video) - Paresh Pahuja Feat. Harleen Sethi  Shiv  Meghdeep  Vaibhav.mp3" },
    { title: "Finding Her", url: "music/Finding Her.mp3" },
    { title: "Haseen", url: "music/Haseen.mp3" },
    { title: "Heer", url: "music/Heer.mp3" },
    { title: "Husn - Anuv Jain", url: "music/Husn.mp3" },
    { title: "Ishq - Lost & Found", url: "music/Ishq (From Lost Found).mp3" },
    { title: "Jhol", url: "music/Jhol.mp3" },
    { title: "Kashish - Ashish Bhatia & Kashish Ratnani", url: "music/KASHISH (Official Music Video) Ashish Bhatia  Kashish Ratnani  Omkar Singh  Song 2024.mp3" },
    { title: "Khat", url: "music/Khat.mp3" },
    { title: "Maand", url: "music/Maand.mp3" },
    { title: "Paaro", url: "music/Paaro.mp3" },
    { title: "Sahiba - Jasleen Royal & Stebin Ben", url: "music/Sahiba (Music Video) Jasleen Royal Vijay Deverakonda Radhika Madan Stebin PriyaAditya Sudhanshu.mp3" },
    { title: "Sajde - Lost & Found", url: "music/Sajde (From LostFound).mp3" },
    { title: "Samjho Na", url: "music/Samjho Na.mp3" },
    { title: "Choo Lo - The Local Train", url: "music/The Local Train - Aalas Ka Pedh - Choo Lo (Official Audio).mp3" },
    { title: "You and Me", url: "music/You and Me.mp3" },
    { title: "Zulfein - Mehul Mahesh", url: "music/Zulfein - Mehul Mahesh Prod By Dj AYnik (Official Visualizer Video) Latest Hindi Romantic Song 2025.mp3" }
  ],
  currentTrackIndex: 0
};

function getVaultCredentials() {
  const user = localStorage.getItem("re_vault_user") || "admin";
  const pass = localStorage.getItem("re_vault_pass") || "1234";
  return { user, pass };
}

function openAdminVaultModal() {
  const modal = document.getElementById("admin-vault-modal");
  if (!modal) return;
  modal.style.display = "flex";

  if (vaultState.isUnlocked) {
    document.getElementById("vault-login-view").style.display = "none";
    document.getElementById("vault-player-view").style.display = "block";
    renderVaultPlaylist();
  } else {
    document.getElementById("vault-login-view").style.display = "block";
    document.getElementById("vault-player-view").style.display = "none";
  }
}

function closeAdminVaultModal() {
  const modal = document.getElementById("admin-vault-modal");
  if (modal) modal.style.display = "none";
}

function loginAdminVault() {
  const inputUser = document.getElementById("vault-userid-input").value.trim();
  const inputPass = document.getElementById("vault-password-input").value.trim();
  const creds = getVaultCredentials();

  if (inputUser === creds.user && inputPass === creds.pass) {
    vaultState.isUnlocked = true;
    showToast("🔓 Access Granted: System Verified!");
    document.getElementById("vault-login-view").style.display = "none";
    document.getElementById("vault-player-view").style.display = "block";
    renderVaultPlaylist();
  } else {
    showToast("⚠️ ACCESS DENIED: Unauthorized System Attempt!");
  }
}

function logoutAdminVault() {
  vaultState.isUnlocked = false;
  const audio = document.getElementById("vault-audio-player");
  if (audio) audio.pause();
  document.getElementById("vault-login-view").style.display = "block";
  document.getElementById("vault-player-view").style.display = "none";
  showToast("🔒 Admin Vault Locked.");
}

function changeAdminCredentials() {
  const newUser = document.getElementById("new-vault-userid").value.trim();
  const newPass = document.getElementById("new-vault-password").value.trim();

  if (!newUser || !newPass) {
    showToast("⚠️ Please enter both new User ID and Password!");
    return;
  }

  localStorage.setItem("re_vault_user", newUser);
  localStorage.setItem("re_vault_pass", newPass);
  showToast("✅ Admin Credentials Updated Successfully!");
  document.getElementById("new-vault-userid").value = "";
  document.getElementById("new-vault-password").value = "";
}

function renderVaultPlaylist() {
  const container = document.getElementById("vault-playlist-container");
  const countEl = document.getElementById("vault-track-count");
  if (!container) return;

  if (countEl) countEl.textContent = vaultState.playlist.length;

  if (vaultState.playlist.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 12px;">No music uploaded yet. Place your .mp3 audio files in the <code>music/</code> folder!</div>`;
    return;
  }

  container.innerHTML = vaultState.playlist.map((track, idx) => `
    <div class="playlist-track-item ${idx === vaultState.currentTrackIndex ? 'active-track' : ''}" onclick="playVaultTrack(${idx})">
      <span>▶️ ${track.title}</span>
      <span style="font-size: 11px; opacity: 0.7;">MP3</span>
    </div>
  `).join("");
}

function playVaultTrack(idx) {
  vaultState.currentTrackIndex = idx;
  const track = vaultState.playlist[idx];
  if (!track) return;

  const audio = document.getElementById("vault-audio-player");
  const titleEl = document.getElementById("vault-track-title");

  if (titleEl) titleEl.textContent = `🎶 Playing: ${track.title}`;

  if (audio) {
    audio.src = track.url;
    audio.play().catch(e => console.log("Audio playback error:", e));

    updateMusicIndicatorUI(true, track.title);

    // Sync play / pause events
    audio.onpause = () => updateMusicIndicatorUI(false);
    audio.onplay = () => updateMusicIndicatorUI(true, track.title);

    // Auto-play next track when song finishes!
    audio.onended = () => {
      const nextIdx = (vaultState.currentTrackIndex + 1) % vaultState.playlist.length;
      playVaultTrack(nextIdx);
    };
  }

  renderVaultPlaylist();
}

function stopVaultAudio() {
  const audio = document.getElementById("vault-audio-player");
  if (audio) {
    audio.pause();
  }
  updateMusicIndicatorUI(false);
}

function updateMusicIndicatorUI(isPlaying, trackTitle = "") {
  const indicator = document.getElementById("script-music-indicator");
  const titleDisplay = document.getElementById("script-playing-title");

  if (!indicator) return;

  if (isPlaying) {
    indicator.style.display = "inline-flex";
    if (titleDisplay && trackTitle) {
      titleDisplay.textContent = trackTitle;
    }
  } else {
    indicator.style.display = "none";
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHeaderInputs();
  initLanguageSelector();
  initNavTabs();
  renderScriptStepList();
  renderCurrentScriptStep();
  renderBikeSelectorPills();
  renderBikeDetails(currentState.selectedBike);
  renderRebuttalsGrid();
  renderDealersGrid();
  renderDispositions();
  initNotepad();
  updateSummaryPreview();
});

// Header inputs binding
function initHeaderInputs() {
  const agentInput = document.getElementById("input-agent-name");
  const titleSelect = document.getElementById("input-customer-title");
  const custInput = document.getElementById("input-customer-name");
  const bikeSelect = document.getElementById("header-bike-select");

  if (agentInput) agentInput.addEventListener("input", (e) => { currentState.agentName = e.target.value || "<Agent Name>"; renderCurrentScriptStep(); updateSummaryPreview(); });
  if (titleSelect) titleSelect.addEventListener("change", (e) => { currentState.customerTitle = e.target.value; renderCurrentScriptStep(); updateSummaryPreview(); });
  if (custInput) custInput.addEventListener("input", (e) => { currentState.customerName = e.target.value; renderCurrentScriptStep(); updateSummaryPreview(); });

  // Populate bike dropdown in header
  if (bikeSelect) {
    bikeSelect.innerHTML = BIKE_SPECS.map(b => `<option value="${b.name}">${b.name}</option>`).join("");
    bikeSelect.addEventListener("change", (e) => {
      const bike = BIKE_SPECS.find(b => b.name === e.target.value);
      if (bike) {
        currentState.selectedBike = bike;
        renderCurrentScriptStep();
        renderBikeDetails(bike);
        updateBikePillsActiveState(bike.id);
        updateSummaryPreview();
      }
    });
  }
}

// Language Selector
function initLanguageSelector() {
  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      langBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentState.lang = btn.getAttribute("data-lang");
      renderScriptStepList();
      renderCurrentScriptStep();
      showToast(`Script language changed to ${CALL_SCRIPTS[currentState.lang].name}`);
    });
  });
}

// Navigation Tabs
function initNavTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-target");
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}

// --- 7. SCRIPT RUNNER LOGIC ---
function renderScriptStepList() {
  const stepListEl = document.getElementById("script-step-list");
  if (!stepListEl) return;

  const steps = CALL_SCRIPTS[currentState.lang].steps;
  stepListEl.innerHTML = steps.map((step, idx) => {
    // If Step 5 (index 4) and isWithin45Days === true, disable Step 5!
    let isDisabled = (idx === 4 && currentState.isWithin45Days === true);

    // If on Steps 6..11 (indexes 5..10) and isPreBookAgreed === false, disable Steps 6,7,8,9,10,11!
    if (idx >= 5 && idx <= 10 && currentState.isPreBookAgreed === false) {
      isDisabled = true;
    }

    const titleText = isDisabled ? `${step.title} <span style="font-size:10px; opacity:0.7;">(Disabled)</span>` : step.title;

    return `
      <div class="step-item ${idx === currentState.currentStepIndex ? 'active' : ''} ${isDisabled ? 'disabled' : ''}" 
           onclick="${isDisabled ? '' : `selectScriptStep(${idx})`}">
        <div class="step-number">${idx + 1}</div>
        <div class="step-title">${titleText}</div>
      </div>
    `;
  }).join("");
}

function selectScriptStep(idx) {
  currentState.currentStepIndex = idx;
  renderScriptStepList();
  renderCurrentScriptStep();
}

function renderCurrentScriptStep() {
  const container = document.getElementById("script-content-display");
  const tagEl = document.getElementById("script-step-tag");

  if (!container) return;

  const currentStep = CALL_SCRIPTS[currentState.lang].steps[currentState.currentStepIndex];
  if (!currentStep) return;

  if (tagEl) {
    tagEl.textContent = `STEP ${currentState.currentStepIndex + 1}: ${currentStep.title.toUpperCase()}`;
  }

  let custNameDisplay = currentState.customerName.trim() !== "" 
    ? `${currentState.customerTitle} ${currentState.customerName.trim()}` 
    : "<Customer Name>";

  let rawText = currentStep.text || "";

  // Check if we need to embed model pitch snippet
  if (rawText.includes("<Model Pitch Bengali>") || rawText.includes("<Model Pitch Hindi>") || rawText.includes("<Model Pitch English>")) {
    const bikePitch = MODEL_PITCHES[currentState.selectedBike.name] ? MODEL_PITCHES[currentState.selectedBike.name][currentState.lang] : "";
    rawText = rawText.replace("<Model Pitch Bengali>", bikePitch)
                     .replace("<Model Pitch Hindi>", bikePitch)
                     .replace("<Model Pitch English>", bikePitch);
  }

  // Replace placeholders with real values
  let formattedText = rawText
    .replaceAll("<Agent Name>", `<mark>${currentState.agentName || '<Agent Name>'}</mark>`)
    .replaceAll("<Customer Name>", `<mark>${custNameDisplay}</mark>`)
    .replaceAll("<Bike Model>", `<mark>${currentState.selectedBike.name}</mark>`)
    .replaceAll("<Test Ride Slot>", `<mark>${currentState.testRideSlot}</mark>`);

  // If on Step 4 (Buying Time P1), append interactive Yes / No Decision Box!
  if (currentState.currentStepIndex === 3) {
    const isYes = currentState.isWithin45Days === true;
    const isNo = currentState.isWithin45Days === false;

    formattedText += `
      <div class="step-choice-box">
        <div style="font-size:13px; font-weight:600; color:var(--text-main);">
          Customer comfortable buying within 45 days?
        </div>
        <div class="choice-btn-group">
          <button class="choice-btn ${isYes ? 'active-yes' : ''}" onclick="setBuyingTimeChoice(true)">
            YES
          </button>
          <button class="choice-btn ${isNo ? 'active-no' : ''}" onclick="setBuyingTimeChoice(false)">
            NO
          </button>
        </div>
      </div>
    `;
  }

  // If on Step 5 (Pre-Book Suggestion), append interactive Yes / No Decision Box!
  if (currentState.currentStepIndex === 4) {
    const isYes = currentState.isPreBookAgreed === true;
    const isNo = currentState.isPreBookAgreed === false;

    formattedText += `
      <div class="step-choice-box">
        <div style="font-size:13px; font-weight:600; color:var(--text-main);">
          Customer agreed to Pre-Book motorcycle?
        </div>
        <div class="choice-btn-group">
          <button class="choice-btn ${isYes ? 'active-yes' : ''}" onclick="setPreBookChoice(true)">
            YES
          </button>
          <button class="choice-btn ${isNo ? 'active-no' : ''}" onclick="setPreBookChoice(false)">
            NO
          </button>
        </div>
      </div>
    `;
  }

  container.innerHTML = formattedText;
}

function setBuyingTimeChoice(isYes) {
  currentState.isWithin45Days = isYes;
  
  if (isYes) {
    updateSummaryField("buyingTime", "Within 45 Days");
    showToast("Customer buying within 45 days: Step 5 (Pre-Book Suggestion) DISABLED!");
  } else {
    updateSummaryField("buyingTime", "> 45 Days (Late)");
    showToast("Customer buying after 45 days: Step 5 (Pre-Book Suggestion) ENABLED!");
  }

  renderScriptStepList();
  renderCurrentScriptStep();
}

function setPreBookChoice(isYes) {
  currentState.isPreBookAgreed = isYes;

  if (isYes) {
    showToast("Customer agreed to pre-book!");
  } else {
    currentState.selectedDispo = "LNP";
    renderDispositions();
    updateSummaryPreview();
    showToast("Customer not pre-booking: Steps 6-11 (Dealer, Test Ride, Probing, Alt Num, Value Add) DISABLED!");
  }

  renderScriptStepList();
  renderCurrentScriptStep();
}

function nextScriptStep() {
  const steps = CALL_SCRIPTS[currentState.lang].steps;
  
  // If on Step 4 (index 3) and isWithin45Days is TRUE, skip Step 5 (index 4) -> jump to Step 6 (index 5)
  if (currentState.currentStepIndex === 3 && currentState.isWithin45Days === true) {
    currentState.currentStepIndex = 5;
  } 
  // If on Step 5 (index 4) and isPreBookAgreed is FALSE, skip Steps 6-11 (indexes 5-10) -> jump to Step 12 (index 11)
  else if (currentState.currentStepIndex === 4 && currentState.isPreBookAgreed === false) {
    currentState.currentStepIndex = 11;
  }
  else if (currentState.currentStepIndex < steps.length - 1) {
    currentState.currentStepIndex++;

    // Skip disabled Step 5
    if (currentState.currentStepIndex === 4 && currentState.isWithin45Days === true) {
      currentState.currentStepIndex = 5;
    }
    // Skip disabled Steps 6-11
    if (currentState.currentStepIndex >= 5 && currentState.currentStepIndex <= 10 && currentState.isPreBookAgreed === false) {
      currentState.currentStepIndex = 11;
    }
  }
  
  renderScriptStepList();
  renderCurrentScriptStep();
}

function prevScriptStep() {
  if (currentState.currentStepIndex > 0) {
    currentState.currentStepIndex--;

    // If moving back to disabled Steps 6-11 when isPreBookAgreed === false, jump back to Step 5 (index 4)
    if (currentState.currentStepIndex >= 5 && currentState.currentStepIndex <= 10 && currentState.isPreBookAgreed === false) {
      currentState.currentStepIndex = 4;
    }
    // If moving back to Step 5 (index 4) and it's disabled, jump back to Step 4 (index 3)
    else if (currentState.currentStepIndex === 4 && currentState.isWithin45Days === true) {
      currentState.currentStepIndex = 3;
    }

    renderScriptStepList();
    renderCurrentScriptStep();
  }
}

function resetScriptRunner() {
  currentState.currentStepIndex = 0;
  currentState.isWithin45Days = null;
  currentState.isPreBookAgreed = null;

  renderScriptStepList();
  renderCurrentScriptStep();
  showToast("Script runner reset to Step 1 for next call!");
}

// --- 8. BIKE INFO & SPECS LOGIC ---
function renderBikeSelectorPills() {
  const container = document.getElementById("bike-pills-container");
  if (!container) return;

  container.innerHTML = BIKE_SPECS.map(b => `
    <button class="bike-pill ${b.id === currentState.selectedBike.id ? 'active' : ''}" data-id="${b.id}" onclick="selectBikeModel('${b.id}')">
      ${b.name}
    </button>
  `).join("");
}

function selectBikeModel(id) {
  const bike = BIKE_SPECS.find(b => b.id === id);
  if (bike) {
    currentState.selectedBike = bike;
    const headerSelect = document.getElementById("header-bike-select");
    if (headerSelect) headerSelect.value = bike.name;
    
    renderBikeDetails(bike);
    updateBikePillsActiveState(bike.id);
    renderCurrentScriptStep();
    updateSummaryPreview();
  }
}

function updateBikePillsActiveState(activeId) {
  document.querySelectorAll(".bike-pill").forEach(pill => {
    if (pill.getAttribute("data-id") === activeId) pill.classList.add("active");
    else pill.classList.remove("active");
  });
}

function renderBikeDetails(bike) {
  const sheet = document.getElementById("bike-spec-detail-sheet");
  if (!sheet) return;

  sheet.innerHTML = `
    <div class="bike-summary-card">
      <div class="bike-model-name">${bike.name}</div>
      <div class="bike-category-tag">${bike.category} SEGMENT</div>
      
      <div class="spec-highlight-grid">
        <div class="spec-stat-box">
          <div class="spec-stat-label">MILEAGE</div>
          <div class="spec-stat-value">${bike.mileage}</div>
        </div>
        <div class="spec-stat-box">
          <div class="spec-stat-label">MAX POWER</div>
          <div class="spec-stat-value">${bike.power.split('@')[0]}</div>
        </div>
        <div class="spec-stat-box">
          <div class="spec-stat-label">SEAT HEIGHT</div>
          <div class="spec-stat-value">${bike.seatHeight}</div>
        </div>
        <div class="spec-stat-box">
          <div class="spec-stat-label">WEIGHT</div>
          <div class="spec-stat-value">${bike.weight}</div>
        </div>
      </div>

      <div class="link-buttons-group">
        <a href="${bike.websiteUrl}" target="_blank" class="btn btn-secondary" style="flex:1;"><span class="icon">🔗</span> Official Page</a>
        <a href="${bike.configuratorUrl}" target="_blank" class="btn btn-primary" style="flex:1;"><span class="icon">💰</span> Price & Configurator</a>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Technical Specifications Sheet</div>
      <table class="spec-table">
        <tr><th>Engine</th><td>${bike.engine}</td></tr>
        <tr><th>Max Torque</th><td>${bike.torque}</td></tr>
        <tr><th>Gear Box</th><td>${bike.gearbox}</td></tr>
        <tr><th>Fuel Tank Capacity</th><td>${bike.fuelCapacity}</td></tr>
        <tr><th>Ground Clearance</th><td>${bike.groundClearance}</td></tr>
        <tr><th>Best Suited Terrain</th><td>${bike.terrain}</td></tr>
        <tr><th>Primary Usage</th><td>${bike.usage}</td></tr>
        <tr><th>Suspension</th><td>${bike.suspension}</td></tr>
        <tr><th>Front Tyre</th><td>${bike.frontTyre}</td></tr>
        <tr><th>Rear Tyre</th><td>${bike.rearTyre}</td></tr>
      </table>
    </div>
  `;
}

function filterBikeSpecs(query) {
  const q = query.toLowerCase();
  const filtered = BIKE_SPECS.filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.engine.toLowerCase().includes(q));
  if (filtered.length > 0) {
    selectBikeModel(filtered[0].id);
  }
}

// --- 9. OBJECTION REBUTTALS LOGIC ---
function renderRebuttalsGrid(query = "") {
  const body = document.getElementById("rebuttals-table-body");
  if (!body) return;

  const q = query.toLowerCase().trim();
  const filtered = OBJECTION_REBUTTALS.filter(r => 
    r.topic.toLowerCase().includes(q) || r.rebuttal.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    body.innerHTML = `<tr><td colspan="3" style="color: var(--text-muted); text-align: center; padding: 20px;">No rebuttals found matching "${query}".</td></tr>`;
    return;
  }

  body.innerHTML = filtered.map((r, idx) => `
    <tr>
      <td style="font-weight: 700; color: var(--accent-gold); text-align: center;">${idx + 1}</td>
      <td style="font-weight: 700; color: var(--accent-gold);">${r.topic}</td>
      <td style="line-height: 1.6; color: var(--text-main); font-size: 14px;">${r.rebuttal}</td>
    </tr>
  `).join("");
}

function filterRebuttals(query) {
  renderRebuttalsGrid(query);
}

// --- 9.5 DEALERS LOCATOR LOGIC ---
function renderDealersGrid(query = "") {
  const container = document.getElementById("dealers-grid-container");
  if (!container) return;

  if (typeof DEALERS === "undefined" || !DEALERS || DEALERS.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; color: var(--text-muted); padding: 20px;">No dealer data loaded.</div>`;
    return;
  }

  const q = query.toLowerCase().trim();
  let filtered = DEALERS;

  if (q !== "") {
    filtered = DEALERS.filter(d => 
      (d.name && d.name.toLowerCase().includes(q)) || 
      (d.city && d.city.toLowerCase().includes(q)) || 
      (d.state && d.state.toLowerCase().includes(q)) || 
      (d.location && d.location.toLowerCase().includes(q)) || 
      (d.address && d.address.toLowerCase().includes(q)) ||
      (d.pincode && d.pincode.toString().includes(q)) ||
      (d.code && d.code.toString().includes(q))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; color: var(--text-muted); padding: 20px;">No dealerships found matching "${query}". Try searching by City, State, or PIN Code.</div>`;
    return;
  }

  // Render top 60 matches for high performance
  const displayList = filtered.slice(0, 60);

  const headerInfo = `<div style="grid-column: 1/-1; margin-bottom: 10px; font-size: 13px; color: var(--accent-gold); font-weight: 600;">
    Found ${filtered.length} Dealerships across India ${filtered.length > 60 ? '(Showing top 60 matches - type to refine)' : ''}
  </div>`;

  const cardsHtml = displayList.map(d => `
    <div class="rebuttal-card">
      <div>
        <div class="rebuttal-topic"><span class="icon">🏢</span> ${d.name}</div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin: 8px 0;">
          <span class="badge-gold">${d.city || 'City'}, ${d.state || ''}</span>
          ${d.pincode ? `<span class="badge-gold" style="background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan);">PIN: ${d.pincode}</span>` : ''}
          ${d.code ? `<span class="badge-gold" style="background: rgba(255, 255, 255, 0.1); color: var(--text-muted);">Code: ${d.code}</span>` : ''}
        </div>
        <div class="rebuttal-body" style="font-size: 13px; line-height: 1.5;">
          ${d.location ? `<strong>Location:</strong> ${d.location}<br>` : ''}
          <strong>Address:</strong> ${d.address}
        </div>
      </div>
      <button class="btn btn-secondary" style="width:100%; margin-top: 10px;" onclick="copyToClipboard('${escapeJsString(d.name + ' - ' + d.address)}')">
        <span class="icon">📋</span> Copy Dealer Address
      </button>
    </div>
  `).join("");

  container.innerHTML = headerInfo + cardsHtml;
}

function filterDealers(query) {
  renderDealersGrid(query);
}

// --- 10. CALL SUMMARY & DISPOSITION LOGIC ---
function renderDispositions() {
  const container = document.getElementById("dispo-buttons-container");
  if (!container) return;

  container.innerHTML = DISPOSITIONS.map(d => `
    <button class="dispo-btn ${d.code === currentState.selectedDispo ? 'active' : ''}" onclick="selectDispo('${d.code}')">
      ${d.code}
    </button>
  `).join("");
}

function selectDispo(code) {
  currentState.selectedDispo = code;
  renderDispositions();
  updateSummaryPreview();
}

function updateSummaryField(key, value) {
  if (currentState.summaryFields) {
    currentState.summaryFields[key] = value;
  }
  updateSummaryPreview();
}

function updateSummaryPreview() {
  const box = document.getElementById("summary-text-box");
  if (!box) return;

  const sf = currentState.summaryFields || {};
  const modelName = currentState.selectedBike ? currentState.selectedBike.name : "xyz";

  // Exact format requested:
  // Key enquiry / xyz, Buying time / xyz, Test ride date and time / xyz, Model / xyz, Color / xyz, Alternate number / xyz, Payment mode / xyz
  const str = `Key enquiry / ${sf.keyEnquiry || 'xyz'}, Buying time / ${sf.buyingTime || 'xyz'}, Test ride date and time / ${sf.testRideSlot || 'xyz'}, Model / ${modelName}, Color / ${sf.color || 'xyz'}, Alternate number / ${sf.altNum || 'xyz'}, Payment mode / ${sf.paymentMode || 'xyz'}`;

  box.value = str;
}

function copySummaryToClipboard() {
  const box = document.getElementById("summary-text-box");
  if (box) {
    copyToClipboard(box.value);
  }
}

// --- 11. NOTEPAD PERSISTENCE ---
function initNotepad() {
  const area = document.getElementById("notepad-area");
  if (!area) return;

  const saved = localStorage.getItem("recentral_notepad_content");
  if (saved) area.value = saved;

  area.addEventListener("input", (e) => {
    localStorage.setItem("recentral_notepad_content", e.target.value);
  });
}

function clearNotepad() {
  const area = document.getElementById("notepad-area");
  if (area) {
    area.value = "";
    localStorage.removeItem("recentral_notepad_content");
    showToast("Notepad cleared");
  }
}

function copyNotepad() {
  const area = document.getElementById("notepad-area");
  if (area && area.value.trim()) {
    copyToClipboard(area.value);
  } else {
    showToast("Notepad is empty!");
  }
}

// --- 12. UTILS & TOASTS ---
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied to clipboard!");
  }).catch(err => {
    showToast("Failed to copy!");
  });
}

function showToast(message) {
  // Silent Mode: Do not display on-screen notifications
  return;
}

function escapeJsString(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
