/* ==========================================================================
   REcentral - Royal Enfield Call Center Companion Main JavaScript Logic
   ========================================================================== */

// --- 1. SCRIPT DATASET (Bengali, Hindi, English) ---
const DEFAULT_CALL_SCRIPTS = {
  bn: {
    name: "Bengali (বাংলা)",
    steps: [
      { id: "opening", title: "Opening", text: "Good Morning/Afternoon/Evening Sir/Ma'am.\nAmar naam <Agent Name>, ami Royal Enfield Central Team theke kotha bolchi." },
      { id: "rpc", title: "RPC Confirmation", text: "Ami ki <Customer Name>-er sathe kotha bolchi?" },
      { id: "model_conf", title: "Model Confirmation (P1)", text: "<Bike Model>-e interest dekhanor jonno dhonnobad. Eta ekta khub bhalo choice.\n\n<Model Pitch Bengali>" },
      { id: "buying_time", title: "Buying Time (P1)", text: "<Customer Name>, may I know apni kobe nagad bike-ta purchase korar planning korchen?\n\nToh sir, Apni ki 45 days-er modhye ki bike-ta purchase korte comfortable??\n\nApni ei bike-e Dual Channel ABS ebong 350cc Air Cooled / 440/450/650 Air-Oil Cooled Engine paben. Bike-er features somporke ar kichu jante chan?" },
      { id: "prebook_sug", title: "Pre-Book Suggestion", text: "Sir, ami ki jante pari apni bike ta ato late e purchase korar plan keno korchen?\n\nSir/Ma'am, <Bike Model>-er high demand-er jonno ami suggest korbo apni bike-ta pre-book kore rakhte paren, jate apni fast delivery pete paren.\n\nToh sir, apni ki 45 days-er modhye Bike ta Pre-Book comfortable?" },
      { id: "dealer_conf", title: "Dealer Confirmation (P1)", text: "Ami dekhte pachhi apnar nearest dealership.\n\nEkhane visit korte ki apnar comfortable hoben?" },
      { id: "test_ride_sug", title: "Test Ride Suggestion (P2)", text: "Ami suggest korbo apni ekbar test ride nin, jate bike-er power ebong performance real-time experience korte paren.\n\nMay I know kon din ebong kon time apnar jonno test ride comfortable hoben?" },
      { id: "test_ride_conf", title: "Test Ride Confirmation", text: "(Confirm date & time: <Test Ride Slot>)\n\nAmi eta note kore nichhi, ebong dealer 4 working hours-er moddhe apnake call kore test ride confirm korben." },
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
      { id: "dealer_conf", title: "Dealer Confirmation (P1)", text: "Jaisa ki mai check kar paa rha/rhi hu aapke nearby jo dealership hai.\n\nAap comfortable rahenge yaha par visit karne ke liye?" },
      { id: "test_ride_sug", title: "Test Ride Suggestion (P2)", text: "Saath hi mai aapko suggest karna chahunga/chahungi ki aap vehicle ki test ride bhi lijiye jisse ki aap uski power and performance real time par experience kar payenge.\n\nTo aap kb tak comfortable rhenge test ride ke liye?" },
      { id: "test_ride_conf", title: "Test Ride Confirmation", text: "(Confirm Date & time for test ride: <Test Ride Slot>)\n\nMai yaha aapki preference mention kar deta/deti hu and dealer aapko within 4 working hours me call kar lenge test ride confirmation ke liye." },
      { id: "probing", title: "Probings (Cash / Finance)", text: "Aap bike Cash mein purchase karenge, ya Finance ke madhyam se?\n<Bike Model> ke liye kya aapne koi specific colour ya variant decide kiya hai?" },
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
      { id: "dealer_conf", title: "Dealer Confirmation (P1)", text: "As I can see, your nearest dealership is available nearby.\n\nWould you be comfortable visiting there?" },
      { id: "test_ride_sug", title: "Test Ride Suggestion (P2)", text: "I would also suggest that you take a test ride of the vehicle so that you can experience its power and performance in real time.\n\nSo may I know when would you be comfortable taking the test ride?" },
      { id: "test_ride_conf", title: "Test Ride Confirmation", text: "(Confirm date & time for test ride: <Test Ride Slot>)\n\nI will mention it here, and the dealer will call you within 4 working hours to confirm the test ride." },
      { id: "probing", title: "Probings (Cash / Finance)", text: "Are you planning to purchase the bike in Cash, or through Finance?\nHave you decided on any specific colour or variant for the <Bike Model>?" },
      { id: "alt_num", title: "Alternate Number (P2)", text: "Do you use any alternate contact number?" },
      { id: "value_add", title: "Value Add Point", text: "Thank you for providing all the details. Also, whenever you visit the dealership for the test ride, please carry your driving license along with you." },
      { id: "exchange_probing", title: "Offers & Exchange Probings", text: "<Customer Name>, would you like to Exchange any vehicle??\n\nSir/Ma'am, Royal Enfield is currently offering exchange benefits where you can get up to Rs. 5000 benefit on purchasing 350cc, 440cc, 450cc motorcycles, and up to Rs. 6500 benefit for 650cc models. Our dealership team will connect with you to provide complete details regarding this." },
      { id: "assistance", title: "Further Assistance", text: "Would you like to know any other information regarding Royal Enfield bikes?\nIn the future, if you need any information about Royal Enfield, you can visit our official website royalenfield.com." },
      { id: "closing", title: "Closing", text: "Thank you for giving your valuable time to Royal Enfield.\nHave a wonderful day!" }
    ]
  }
};

// Model Pitches in 3 languages
const DEFAULT_MODEL_PITCHES = {
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
  "Himalayan 440": {
    bn: "Adventure touring-er jonno eta ekta excellent option. Eta rugged build ebong high ground clearance-er sathe ashe.",
    hi: "Adventure touring ke liye best option hai jo ki rugged build aur high ground clearance ke saath available hoti hai.",
    en: "It is a great option for adventure touring, available with a rugged build and high ground clearance."
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
const DEFAULT_BIKE_SPECS = [
  {
    id: "bullet-350",
    name: "Bullet 350",
    category: "Heritage",
    price: "₹ 1,66,981 – ₹ 2,11,250",
    priceRange: "₹ 1,66,981 – ₹ 2,11,250",
    terrain: "In-city / Highway",
    usage: "Casual / Commute",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "805 mm",
    weight: "195 kg",
    kerbWeight: "195 kg",
    fuelCapacity: "13 L",
    fuelTank: "13 L",
    groundClearance: "170 mm",
    mileage: "37 km/L",
    suspension: "Front: 41mm Telescopic Forks, 130mm travel | Rear: Twin Tube Emulsion Shock Absorbers (6-step adjustable)",
    frontTyre: "100/90 - 19 Spoke (Tube Type)",
    rearTyre: "120/80 - 18 Spoke (Tube Type)",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/bullet-350/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/bullet350"
  },
  {
    id: "classic-350",
    name: "Classic 350",
    category: "Vintage",
    price: "₹ 1,88,934 – ₹ 2,26,069",
    priceRange: "₹ 1,88,934 – ₹ 2,26,069",
    terrain: "In-city / Highway",
    usage: "Casual / Commute",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "805 mm",
    weight: "195 kg",
    kerbWeight: "195 kg",
    fuelCapacity: "13 L",
    fuelTank: "13 L",
    groundClearance: "170 mm",
    mileage: "41.5 km/L",
    suspension: "Front: 41mm Telescopic Forks (130mm travel) | Rear: Twin Tube Emulsion Shock (6-step preload)",
    frontTyre: "100/90 - 19 Tubeless / Spoke",
    rearTyre: "120/80 - 18 Tubeless / Spoke",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/classic-350/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/classic-350"
  },
  {
    id: "hunter-350",
    name: "Hunter 350",
    category: "Roadster",
    price: "₹ 1,37,640 – ₹ 1,72,445",
    priceRange: "₹ 1,37,640 – ₹ 1,72,445",
    terrain: "In-city",
    usage: "Casual / Commute",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "790 mm",
    weight: "181 kg",
    kerbWeight: "181 kg",
    fuelCapacity: "13 L",
    fuelTank: "13 L",
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
    price: "₹ 2,01,590 – ₹ 2,23,077",
    priceRange: "₹ 2,01,590 – ₹ 2,23,077",
    terrain: "In-city / Highway",
    usage: "Touring",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "765 mm",
    weight: "191 kg",
    kerbWeight: "191 kg",
    fuelCapacity: "15 L",
    fuelTank: "15 L",
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
    price: "₹ 2,27,114 – ₹ 2,30,012",
    priceRange: "₹ 2,27,114 – ₹ 2,30,012",
    terrain: "In-city",
    usage: "Casual / Commute",
    engine: "349cc Single Cylinder / Air-cooled",
    power: "20.2 BHP @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    gearbox: "5-Speed",
    seatHeight: "750 mm",
    weight: "188 kg",
    kerbWeight: "188 kg",
    fuelCapacity: "13 L",
    fuelTank: "13 L",
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
    category: "Scrambler",
    price: "₹ 2,24,805 – ₹ 2,32,371",
    priceRange: "₹ 2,24,805 – ₹ 2,32,371",
    terrain: "In-city / Trail",
    usage: "Casual / Commute",
    engine: "443cc Single Cylinder / Air-cooled",
    power: "25.4 BHP @ 6250 rpm",
    torque: "34 Nm @ 4000 rpm",
    gearbox: "6-Speed",
    seatHeight: "795 mm",
    weight: "187 kg",
    kerbWeight: "187 kg",
    fuelCapacity: "15 L",
    fuelTank: "15 L",
    groundClearance: "200 mm",
    mileage: "29.5 km/L",
    suspension: "Front: Telescopic 41mm | Rear: Monoshock with linkage",
    frontTyre: "100/90-19 Dual Purpose",
    rearTyre: "120/90-17 Dual Purpose",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/scram-440/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/scram-440"
  },
  {
    id: "himalayan-440",
    name: "Himalayan 440",
    category: "Adventure",
    price: "₹ 2,29,000",
    priceRange: "₹ 2,29,000",
    terrain: "Adventure / Trail",
    usage: "Touring / Offroad",
    engine: "443cc Single Cylinder / Air-cooled",
    power: "25.4 BHP @ 6250 rpm",
    torque: "34 Nm @ 4000 rpm",
    gearbox: "6-Speed",
    seatHeight: "800 mm",
    weight: "199 kg",
    kerbWeight: "199 kg",
    fuelCapacity: "15 L",
    fuelTank: "15 L",
    groundClearance: "220 mm",
    mileage: "30 km/L",
    suspension: "Front: Telescopic 41mm | Rear: Monoshock with linkage",
    frontTyre: "90/90-21 Spoked (Tube type)",
    rearTyre: "120/90-17 Spoked (Tube type)",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/himalayan-440/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/himalayan-440"
  },
  {
    id: "himalayan-450",
    name: "Himalayan 450",
    category: "Adventure",
    price: "₹ 3,08,029 – ₹ 3,39,564",
    priceRange: "₹ 3,08,029 – ₹ 3,39,564",
    terrain: "Adventure / Trail / All Roads",
    usage: "Touring / Offroad",
    engine: "452cc Single Cylinder / Liquid-cooled (Sherpa 450)",
    power: "40.2 PS @ 8000 rpm",
    torque: "40 Nm @ 5500 rpm",
    gearbox: "6-Speed",
    seatHeight: "825 mm",
    weight: "181 kg",
    kerbWeight: "181 kg",
    fuelCapacity: "17 L",
    fuelTank: "17 L",
    groundClearance: "230 mm",
    mileage: "29.5 km/L",
    suspension: "Front: Upside down fork 43mm (Showa) | Rear: Linkage Type Mono Shock",
    frontTyre: "90/90-21 Spoked",
    rearTyre: "140/80 R17 Spoked / Tubeless",
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/new-himalayan/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/Himalayan"
  },
  {
    id: "guerrilla-450",
    name: "Guerrilla 450",
    category: "Premium Roadster",
    price: "₹ 2,51,063 – ₹ 2,74,523",
    priceRange: "₹ 2,51,063 – ₹ 2,74,523",
    terrain: "In-city / Highway",
    usage: "Casual / Commute / Spirited",
    engine: "452cc Single Cylinder / Liquid-cooled",
    power: "40.2 PS @ 8000 rpm",
    torque: "40 Nm @ 5500 rpm",
    gearbox: "6-Speed",
    seatHeight: "780 mm",
    weight: "184 kg",
    kerbWeight: "184 kg",
    fuelCapacity: "11 L",
    fuelTank: "11 L",
    groundClearance: "169 mm",
    mileage: "27 km/L",
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
    price: "₹ 3,37,909 – ₹ 3,69,137",
    priceRange: "₹ 3,37,909 – ₹ 3,69,137",
    terrain: "In-city / Highway / Twisties",
    usage: "Casual / Commute / Sporty",
    engine: "648cc Inline Twin / Air-Oil Cooled",
    power: "47 PS (34.9 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "804 mm",
    weight: "218 kg",
    kerbWeight: "218 kg",
    fuelCapacity: "13.7 L",
    fuelTank: "13.7 L",
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
    price: "₹ 3,58,427 – ₹ 3,87,667",
    priceRange: "₹ 3,58,427 – ₹ 3,87,667",
    terrain: "In-city / Twisties",
    usage: "Casual / Short Race",
    engine: "648cc Inline Twin / Air-Oil Cooled",
    power: "47 PS (34.9 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "804 mm",
    weight: "214 kg",
    kerbWeight: "214 kg",
    fuelCapacity: "12.5 L",
    fuelTank: "12.5 L",
    groundClearance: "174 mm",
    mileage: "25 km/L",
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
    price: "₹ 4,05,988 – ₹ 4,39,960",
    priceRange: "₹ 4,05,988 – ₹ 4,39,960",
    terrain: "Highway Cruising",
    usage: "Long Distance Touring",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.6 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "740 mm",
    weight: "241 kg",
    kerbWeight: "241 kg",
    fuelCapacity: "15.7 L",
    fuelTank: "15.7 L",
    groundClearance: "135 mm",
    mileage: "22 km/L",
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
    price: "₹ 4,01,002 – ₹ 4,16,139",
    priceRange: "₹ 4,01,002 – ₹ 4,16,139",
    terrain: "In-city / Highway",
    usage: "Casual / Commute",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.6 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "795 mm",
    weight: "240 kg",
    kerbWeight: "240 kg",
    fuelCapacity: "13.8 L",
    fuelTank: "13.8 L",
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
    category: "Scrambler",
    price: "₹ 3,78,208 – ₹ 3,99,990",
    priceRange: "₹ 3,78,208 – ₹ 3,99,990",
    terrain: "In-city / Off-road",
    usage: "Casual / Bad-Road Heritage",
    engine: "648cc Inline Twin / Air-Oil Cooled",
    power: "47 PS (34.9 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5150 rpm",
    gearbox: "6-Speed",
    seatHeight: "830 mm",
    weight: "216 kg",
    kerbWeight: "216 kg",
    fuelCapacity: "13.7 L",
    fuelTank: "13.7 L",
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
    category: "Premium Tourer with Vintage Look",
    price: "₹ 3,67,592 – ₹ 3,82,097",
    priceRange: "₹ 3,67,592 – ₹ 3,82,097",
    terrain: "In-city / Highway",
    usage: "Casual / Commute / Touring",
    engine: "648cc Inline Twin / Air-Oil Cooled",
    power: "47 PS (34.6 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5650 rpm",
    gearbox: "6-Speed",
    seatHeight: "800 mm",
    weight: "243 kg",
    kerbWeight: "243 kg",
    fuelCapacity: "14.8 L",
    fuelTank: "14.8 L",
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
    price: "₹ 3,64,856",
    priceRange: "₹ 3,64,856",
    terrain: "In-city / Highway",
    usage: "Casual / Commute / Legacy",
    engine: "648cc Parallel Twin / Air-Oil Cooled",
    power: "47 PS (34.6 kW) @ 7250 rpm",
    torque: "52.3 Nm @ 5650 rpm",
    gearbox: "6-Speed",
    seatHeight: "800 mm",
    weight: "243 kg",
    kerbWeight: "243 kg",
    fuelCapacity: "14.8 L",
    fuelTank: "14.8 L",
    groundClearance: "154 mm",
    mileage: "21.45 km/L",
    suspension: "Front: Telescopic Fork 43mm | Rear: Twin Shock absorbers",
    frontTyre: "100/90-R19",
    rearTyre: "140/70-R18",
    features: ["Peashooter Exhaust (distinctive exhaust note)", "Tripper Pod Navigation", "Wingman Connected Feature"],
    websiteUrl: "https://www.royalenfield.com/in/en/motorcycles/bullet-650/",
    configuratorUrl: "https://makeityours.royalenfield.com/configurator/Bullet-650/"
  }
];

// --- 3. OBJECTION REBUTTALS DATABASE ---
const DEFAULT_OBJECTION_REBUTTALS = [
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

// --- ACTIVE CMS RUNTIME DATA OBJECTS ---
let CALL_SCRIPTS = JSON.parse(JSON.stringify(DEFAULT_CALL_SCRIPTS));
let MODEL_PITCHES = JSON.parse(JSON.stringify(DEFAULT_MODEL_PITCHES));
let BIKE_SPECS = JSON.parse(JSON.stringify(DEFAULT_BIKE_SPECS));
let OBJECTION_REBUTTALS = JSON.parse(JSON.stringify(DEFAULT_OBJECTION_REBUTTALS));

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
  testRideSlot: "",
  selectedDispo: "BKR",
  isWithin45Days: null, // null, true (YES - disable Step 5), false (NO - enable Step 5)
  isPreBookAgreed: null, // null, true (YES - continue), false (NO - disable Steps 6-11)
  isTestRideAgreed: null, // null, true (YES - enable Step 8), false (NO - disable Step 8)
  summaryFields: {
    keyEnquiry: "P1",
    buyingTime: "Within 15 Days",
    testRideSlot: "",
    color: "Default",
    altNum: "N/A",
    paymentMode: "Finance"
  },
  lopFields: {
    model: "",
    purchaseDate: "",
    dealership: "",
    bookingName: "",
    bookingMobile: "",
    regNo: "N/A",
    chassisNo: "N/A",
    engineNo: "N/A",
    altNum: "N/A"
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
  const checkboxEl = document.getElementById("theme-toggle-checkbox");
  if (checkboxEl) {
    checkboxEl.checked = (theme === "light");
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
const VAULT_CATEGORIES = [
  { id: "ALL", name: "Admin Fav" },
  { id: "FAVORITES", name: "Favorites" },
  { id: "ADFV", name: "Adfv" },
  { id: "TALHA_ANJUM", name: "Talha Anjum" },
  { id: "KK", name: "KK" },
  { id: "ATIF_ASLAM", name: "Atif Aslam" },
  { id: "ARIJIT_SINGH", name: "Arijit Singh" }
];

const DEFAULT_SYSTEM_USERS = [
  { id: "usr_1", username: "user1", password: "User@1234", name: "Rahul Sharma", status: "active", createdAt: "2026-01-01" },
  { id: "usr_2", username: "user2", password: "User@2345", name: "Priya Patel", status: "active", createdAt: "2026-01-01" },
  { id: "usr_3", username: "user3", password: "User@3456", name: "Amit Kumar", status: "active", createdAt: "2026-01-01" },
  { id: "usr_4", username: "user4", password: "User@4567", name: "Sneha Roy", status: "active", createdAt: "2026-01-01" },
  { id: "usr_5", username: "user5", password: "User@5678", name: "Vikram Singh", status: "active", createdAt: "2026-01-01" },
  { id: "usr_6", username: "user6", password: "User@6789", name: "Ananya Das", status: "active", createdAt: "2026-01-01" },
  { id: "usr_7", username: "user7", password: "User@7890", name: "Rohan Gupta", status: "active", createdAt: "2026-01-01" },
  { id: "usr_8", username: "user8", password: "User@8901", name: "Pooja Verma", status: "active", createdAt: "2026-01-01" },
  { id: "usr_9", username: "user9", password: "User@9012", name: "Karan Malhotra", status: "active", createdAt: "2026-01-01" },
  { id: "usr_10", username: "user10", password: "User@0123", name: "Neha Sen", status: "active", createdAt: "2026-01-01" }
];

async function syncUsersToServer(users) {
  try {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        users,
        globalUserLogin: isGlobalUserLoginEnabled()
      })
    });
  } catch (e) {
    // Graceful offline fallback
  }
}

async function syncAdminCredsToServer(user, pass) {
  try {
    await fetch("/api/admin-creds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });
  } catch (e) {
    // Graceful offline fallback
  }
}

async function syncGlobalAccessToServer(enabled) {
  try {
    await fetch("/api/global-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ globalUserLogin: enabled })
    });
  } catch (e) {
    // Graceful offline fallback
  }
}

async function fetchUsersFromServer() {
  try {
    const res = await fetch("/api/users");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.users) && data.users.length > 0) {
        localStorage.setItem("re_music_users", JSON.stringify(data.users));
      }
      if (data.settings && typeof data.settings.globalUserLogin === "boolean") {
        localStorage.setItem("re_global_user_login", data.settings.globalUserLogin ? "true" : "false");
      }
    }
  } catch (e) {
    // Graceful offline fallback
  }
}

async function initUserDatabase() {
  const existing = localStorage.getItem("re_music_users");
  if (!existing || existing === "[]") {
    localStorage.setItem("re_music_users", JSON.stringify(DEFAULT_SYSTEM_USERS));
  }
  if (localStorage.getItem("re_global_user_login") === null) {
    localStorage.setItem("re_global_user_login", "true");
  }
  // Migrate / seed default admin credentials to Spellman / Anonymous099m
  if (!localStorage.getItem("re_vault_user") || localStorage.getItem("re_vault_user") === "admin") {
    localStorage.setItem("re_vault_user", "Spellman");
  }
  if (!localStorage.getItem("re_vault_pass") || localStorage.getItem("re_vault_pass") === "9082894861") {
    localStorage.setItem("re_vault_pass", "Anonymous099m");
  }

  // 1. Initialize Supabase Client if available
  if (typeof initSupabaseClient === "function") {
    initSupabaseClient();
    
    // 2. Fetch fresh data from Supabase in background
    if (typeof sbFetchUsers === "function") {
      try {
        const cloudUsers = await sbFetchUsers();
        if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
          localStorage.setItem("re_music_users", JSON.stringify(cloudUsers));
          if (vaultState.isVaultModalOpen && vaultState.activeAdminTab === "users") {
            renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
          }
        }
      } catch (e) {}

      try {
        const cloudGlobal = await sbFetchGlobalUserLogin();
        if (cloudGlobal !== null) {
          localStorage.setItem("re_global_user_login", cloudGlobal ? "true" : "false");
        }
      } catch (e) {}

      try {
        const cloudAdmin = await sbFetchAdminCredentials();
        if (cloudAdmin && cloudAdmin.username && cloudAdmin.password) {
          localStorage.setItem("re_vault_user", cloudAdmin.username);
          localStorage.setItem("re_vault_pass", cloudAdmin.password);
        }
      } catch (e) {}
    }
  }

  // 3. Sync with local server in background as fallback
  fetchUsersFromServer();
}

function getUsersList() {
  try {
    const raw = localStorage.getItem("re_music_users");
    if (!raw) {
      localStorage.setItem("re_music_users", JSON.stringify(DEFAULT_SYSTEM_USERS));
      return JSON.parse(JSON.stringify(DEFAULT_SYSTEM_USERS));
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : JSON.parse(JSON.stringify(DEFAULT_SYSTEM_USERS));
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_SYSTEM_USERS));
  }
}

function saveUsersList(users) {
  try {
    // 1. Save to localStorage immediately
    localStorage.setItem("re_music_users", JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save users to localStorage:", e);
  }

  // 2. Save directly to Server database immediately
  syncUsersToServer(users);

  // 3. Sync to Supabase Cloud Database if configured
  if (typeof sbPushLocalDataToCloud === "function" && typeof isSupabaseConfigured === "function" && isSupabaseConfigured()) {
    sbPushLocalDataToCloud(users, isGlobalUserLoginEnabled(), getVaultCredentials()).catch(() => {});
  }
}

function isGlobalUserLoginEnabled() {
  return localStorage.getItem("re_global_user_login") !== "false";
}

function setGlobalUserLogin(enabled) {
  localStorage.setItem("re_global_user_login", enabled ? "true" : "false");
  syncGlobalAccessToServer(enabled);
  if (typeof sbSaveGlobalUserLogin === "function") {
    sbSaveGlobalUserLogin(enabled).catch(() => {});
  }
}

let vaultState = {
  isUnlocked: false,
  authRole: null, // 'admin' | 'user'
  activeUser: null, // User details object
  activeAdminTab: "player", // 'player' | 'users' | 'security'
  loginMode: "admin", // 'admin' | 'user'
  isVaultModalOpen: false,
  volume: 0.85,
  isMuted: false,
  previousVolume: 0.85,
  activeCategory: "ALL",
  searchQuery: "",
  isShuffle: false,
  isRepeat: false,
  favorites: JSON.parse(localStorage.getItem("re_vault_favorites") || "[]"),
  allTracks: [
    {
        "id": 1,
        "title": "AUR - SHIKAYAT - Raffey - Usama - Ahad",
        "category": "CHILL",
        "url": "music/AUR - SHIKAYAT - Raffey - Usama - Ahad (Official Music Video).mp3"
    },
    {
        "id": 2,
        "title": "Aarzu",
        "category": "CHILL",
        "url": "music/Aarzu.mp3"
    },
    {
        "id": 3,
        "title": "Adaayein",
        "category": "CHILL",
        "url": "music/Adaayein.mp3"
    },
    {
        "id": 4,
        "title": "Adhoora",
        "category": "CHILL",
        "url": "music/Adhoora.mp3"
    },
    {
        "id": 5,
        "title": "Aditya Rikhari TERI YAAD",
        "category": "ROMANTIC",
        "url": "music/Aditya Rikhari  TERI YAAD (Video).mp3"
    },
    {
        "id": 6,
        "title": "Aditya Rikhari - Humdum Romantic Song",
        "category": "CHILL",
        "url": "music/Aditya Rikhari - Humdum (Music Video) Romantic Song.mp3"
    },
    {
        "id": 7,
        "title": "Afsos",
        "category": "CHILL",
        "url": "music/Afsos.mp3"
    },
    {
        "id": 8,
        "title": "Afusic - Pal Pal Prod. @AliSoomroMusic",
        "category": "ROMANTIC",
        "url": "music/Afusic - Pal Pal (Official Music Video) Prod. @AliSoomroMusic.mp3"
    },
    {
        "id": 9,
        "title": "Anuv Jain - JO TUM MERE HO",
        "category": "CHILL",
        "url": "music/Anuv Jain - JO TUM MERE HO (Official Video).mp3"
    },
    {
        "id": 10,
        "title": "Anuv Jain X Lost Stories - Arz Kiya Hai Coke Studio Bharat",
        "category": "CHILL",
        "url": "music/Anuv Jain X Lost Stories - Arz Kiya Hai (Official Video)  Coke Studio Bharat.mp3"
    },
    {
        "id": 11,
        "title": "Arse Baad",
        "category": "CHILL",
        "url": "music/Arse Baad.mp3"
    },
    {
        "id": 12,
        "title": "Asfar Hussain Nahin Milta Walnut Sessions",
        "category": "CHILL",
        "url": "music/Asfar Hussain Nahin Milta (Original) Walnut Sessions.mp3"
    },
    {
        "id": 13,
        "title": "Baarishein",
        "category": "CHILL",
        "url": "music/Baarishein.mp3"
    },
    {
        "id": 14,
        "title": "Barqat",
        "category": "CHILL",
        "url": "music/Barqat.mp3"
    },
    {
        "id": 15,
        "title": "Barsaat - Banjaare",
        "category": "CHILL",
        "url": "music/Barsaat - Banjaare (Official Video).mp3"
    },
    {
        "id": 16,
        "title": "Berang",
        "category": "CHILL",
        "url": "music/Berang.mp3"
    },
    {
        "id": 17,
        "title": "Dooron Dooron - Paresh Pahuja Feat. Harleen Sethi Shiv Meghdeep Vaibhav",
        "category": "CHILL",
        "url": "music/Dooron Dooron (Official Video) - Paresh Pahuja Feat. Harleen Sethi  Shiv  Meghdeep  Vaibhav.mp3"
    },
    {
        "id": 18,
        "title": "Farak - Taare Official Music Video",
        "category": "CHILL",
        "url": "music/Farak - Taare  Official Music Video.mp3"
    },
    {
        "id": 19,
        "title": "Finding Her",
        "category": "CHILL",
        "url": "music/Finding Her.mp3"
    },
    {
        "id": 20,
        "title": "Haseen",
        "category": "ROMANTIC",
        "url": "music/Haseen.mp3"
    },
    {
        "id": 21,
        "title": "Heer",
        "category": "ROMANTIC",
        "url": "music/Heer.mp3"
    },
    {
        "id": 22,
        "title": "Husn",
        "category": "CHILL",
        "url": "music/Husn.mp3"
    },
    {
        "id": 23,
        "title": "Ishq",
        "category": "CHILL",
        "url": "music/Ishq (From Lost Found).mp3"
    },
    {
        "id": 24,
        "title": "Jhol",
        "category": "CHILL",
        "url": "music/Jhol.mp3"
    },
    {
        "id": 25,
        "title": "KASHISH Ashish Bhatia Kashish Ratnani Omkar Singh Song 2024",
        "category": "CHILL",
        "url": "music/KASHISH (Official Music Video) Ashish Bhatia  Kashish Ratnani  Omkar Singh  Song 2024.mp3"
    },
    {
        "id": 26,
        "title": "Kaagaz - SINASH, Aahaana Official Music Video",
        "category": "CHILL",
        "url": "music/Kaagaz - SINASH, Aahaana Official Music Video.mp3"
    },
    {
        "id": 27,
        "title": "Khat",
        "category": "CHILL",
        "url": "music/Khat.mp3"
    },
    {
        "id": 28,
        "title": "Maand",
        "category": "CHILL",
        "url": "music/Maand.mp3"
    },
    {
        "id": 29,
        "title": "Makeen - Salem Sandhu ft Taimour Baig Prod. Nimit",
        "category": "CHILL",
        "url": "music/Makeen - Salem Sandhu ft Taimour Baig  Prod. Nimit (Official Visualizer).mp3"
    },
    {
        "id": 30,
        "title": "Paaro",
        "category": "INDIE",
        "url": "music/Paaro.mp3"
    },
    {
        "id": 31,
        "title": "Payal - @faizalbhaijaaan , @Gravero Lyric Visualiser",
        "category": "INDIE",
        "url": "music/Payal - @faizalbhaijaaan , @Gravero Lyric Visualiser.mp3"
    },
    {
        "id": 32,
        "title": "Phool by AUR \u067e\u06be\u0648\u0644 - Official Music Video",
        "category": "INDIE",
        "url": "music/Phool by AUR \u067e\u06be\u0648\u0644 - Official Music Video.mp3"
    },
    {
        "id": 33,
        "title": "Promise",
        "category": "INDIE",
        "url": "music/Promise.mp3"
    },
    {
        "id": 34,
        "title": "Qaatil - Hasan S. Iqbal -",
        "category": "INDIE",
        "url": "music/Qaatil - Hasan S. Iqbal - (lyrical video).mp3"
    },
    {
        "id": 35,
        "title": "Rakhlo Tum Chupaake",
        "category": "INDIE",
        "url": "music/Rakhlo Tum Chupaake.mp3"
    },
    {
        "id": 36,
        "title": "Rehbara",
        "category": "INDIE",
        "url": "music/Rehbara.mp3"
    },
    {
        "id": 37,
        "title": "Ruhav, Shxl - Ankhon Se",
        "category": "INDIE",
        "url": "music/Ruhav, Shxl - Ankhon Se (SPOTISAVER).mp3"
    },
    {
        "id": 38,
        "title": "Sahiba Jasleen Royal Vijay Deverakonda Radhika Madan Stebin PriyaAditya Sudhanshu",
        "category": "INDIE",
        "url": "music/Sahiba (Music Video) Jasleen Royal Vijay Deverakonda Radhika Madan Stebin PriyaAditya Sudhanshu.mp3"
    },
    {
        "id": 39,
        "title": "Sajde",
        "category": "INDIE",
        "url": "music/Sajde (From LostFound).mp3"
    },
    {
        "id": 40,
        "title": "Samjho Na",
        "category": "INDIE",
        "url": "music/Samjho Na.mp3"
    },
    {
        "id": 41,
        "title": "Sawaal",
        "category": "INDIE",
        "url": "music/Sawaal.mp3"
    },
    {
        "id": 42,
        "title": "Sunday",
        "category": "INDIE",
        "url": "music/Sunday.mp3"
    },
    {
        "id": 43,
        "title": "Tanay Patre - Adaayein",
        "category": "INDIE",
        "url": "music/Tanay Patre - Adaayein (SPOTISAVER).mp3"
    },
    {
        "id": 44,
        "title": "The Local Train - Aalas Ka Pedh - Choo Lo",
        "category": "INDIE",
        "url": "music/The Local Train - Aalas Ka Pedh - Choo Lo (Official Audio).mp3"
    },
    {
        "id": 45,
        "title": "Tu Hai Kahan by AUR",
        "category": "INDIE",
        "url": "music/Tu Hai Kahan by AUR.mp3"
    },
    {
        "id": 46,
        "title": "You and Me",
        "category": "INDIE",
        "url": "music/You and Me.mp3"
    },
    {
        "id": 47,
        "title": "Zakhmi Samad - Bharath Official Music Video",
        "category": "INDIE",
        "url": "music/Zakhmi Samad - Bharath Official Music Video.mp3"
    },
    {
        "id": 48,
        "title": "Zulfein - Mehul Mahesh Prod By Dj AYnik Latest Hindi Romantic Song 2025",
        "category": "INDIE",
        "url": "music/Zulfein - Mehul Mahesh Prod By Dj AYnik (Official Visualizer Video) Latest Hindi Romantic Song 2025.mp3"
    },
    {
        "id": 49,
        "title": "sufr ft Arpit Bala, toorjo dey - bargad",
        "category": "INDIE",
        "url": "music/sufr ft Arpit Bala, toorjo dey - bargad (official lyric video).mp3"
    },
    {
        "id": 50,
        "title": "A Man Without Love LYRICS Video Engelbert Humperdinck 1968 \ud83c\udf19 Moon Knight Episode 1",
        "category": "ADFV",
        "url": "music/Adfv/A Man Without Love LYRICS Video Engelbert Humperdinck 1968 \ud83c\udf19 Moon Knight Episode 1.mp3"
    },
    {
        "id": 51,
        "title": "Alex Warren - Ordinary",
        "category": "ADFV",
        "url": "music/Adfv/Alex Warren - Ordinary (Lyrics).mp3"
    },
    {
        "id": 52,
        "title": "Alexander Rybak - Fairytale Norway \ud83c\uddf3\ud83c\uddf4 Eurovision Winner 2009",
        "category": "ADFV",
        "url": "music/Adfv/Alexander Rybak - Fairytale (Lyrics) Norway \ud83c\uddf3\ud83c\uddf4 Eurovision Winner 2009.mp3"
    },
    {
        "id": 53,
        "title": "Central Cee - Let Go",
        "category": "ADFV",
        "url": "music/Adfv/Central Cee - Let Go [Music Video].mp3"
    },
    {
        "id": 54,
        "title": "Dark is the Night - Soviet WW2 Song",
        "category": "ADFV",
        "url": "music/Adfv/Dark is the Night - Soviet WW2 Song.mp3"
    },
    {
        "id": 55,
        "title": "David Kushner - Daylight",
        "category": "ADFV",
        "url": "music/Adfv/David Kushner - Daylight (Lyrics).mp3"
    },
    {
        "id": 56,
        "title": "Ed Sheeran - Perfect",
        "category": "ADFV",
        "url": "music/Adfv/Ed Sheeran - Perfect (Lyrics).mp3"
    },
    {
        "id": 57,
        "title": "Elliot James Reay - I Think They Call This Love",
        "category": "ADFV",
        "url": "music/Adfv/Elliot James Reay - I Think They Call This Love (Official Music Video) (1).mp3"
    },
    {
        "id": 58,
        "title": "Elliot James Reay - I Think They Call This Love",
        "category": "ADFV",
        "url": "music/Adfv/Elliot James Reay - I Think They Call This Love (Official Music Video).mp3"
    },
    {
        "id": 59,
        "title": "Handsome Family \u2022 Far From Any Road Official Lyric Video",
        "category": "ADFV",
        "url": "music/Adfv/Handsome Family \u2022 Far From Any Road (Main Title Theme from True Detective) Official Lyric Video.mp3"
    },
    {
        "id": 60,
        "title": "I Wanna Be Yours",
        "category": "ADFV",
        "url": "music/Adfv/I Wanna Be Yours.mp3"
    },
    {
        "id": 61,
        "title": "Imagine Dragons - Demons",
        "category": "ADFV",
        "url": "music/Adfv/Imagine Dragons - Demons (Lyrics).mp3"
    },
    {
        "id": 62,
        "title": "Keane - Somewhere Only We Know",
        "category": "ADFV",
        "url": "music/Adfv/Keane - Somewhere Only We Know (Official Music Video).mp3"
    },
    {
        "id": 63,
        "title": "Lady Gaga, Bruno Mars - Die With A Smile",
        "category": "ADFV",
        "url": "music/Adfv/Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video).mp3"
    },
    {
        "id": 64,
        "title": "Last Leaves of Autumn - Zleepyfred",
        "category": "ADFV",
        "url": "music/Adfv/Last Leaves of Autumn - Zleepyfred (Official Lyric Video).mp3"
    },
    {
        "id": 65,
        "title": "Lewis Capaldi - Someone You Loved",
        "category": "ADFV",
        "url": "music/Adfv/Lewis Capaldi - Someone You Loved.mp3"
    },
    {
        "id": 66,
        "title": "Lord Huron - The Night We Met",
        "category": "ADFV",
        "url": "music/Adfv/Lord Huron - The Night We Met (Official Audio).mp3"
    },
    {
        "id": 67,
        "title": "Lukas Graham - 7 Years",
        "category": "ADFV",
        "url": "music/Adfv/Lukas Graham - 7 Years [Official Music Video].mp3"
    },
    {
        "id": 68,
        "title": "One Direction - Night Changes",
        "category": "ADFV",
        "url": "music/Adfv/One Direction - Night Changes (Lyrics).mp3"
    },
    {
        "id": 69,
        "title": "Passenger Let Her Go",
        "category": "ADFV",
        "url": "music/Adfv/Passenger Let Her Go (Official Video).mp3"
    },
    {
        "id": 70,
        "title": "Pixies - Que Sera Sera",
        "category": "ADFV",
        "url": "music/Adfv/Pixies - Que Sera Sera (Official Lyric Video).mp3"
    },
    {
        "id": 71,
        "title": "Prateek Kuhad - Co2",
        "category": "ADFV",
        "url": "music/Adfv/Prateek Kuhad - Co2 (Official Audio).mp3"
    },
    {
        "id": 72,
        "title": "Shawn Mendes - Stitches",
        "category": "ADFV",
        "url": "music/Adfv/Shawn Mendes - Stitches (Official Music Video).mp3"
    },
    {
        "id": 73,
        "title": "Shawn Mendes - There's Nothing Holdin' Me Back",
        "category": "ADFV",
        "url": "music/Adfv/Shawn Mendes - There's Nothing Holdin' Me Back (Official Music Video).mp3"
    },
    {
        "id": 74,
        "title": "Shawn Mendes - Treat You Better",
        "category": "ADFV",
        "url": "music/Adfv/Shawn Mendes - Treat You Better.mp3"
    },
    {
        "id": 75,
        "title": "Sia - Snowman",
        "category": "ADFV",
        "url": "music/Adfv/Sia - Snowman [Official Video].mp3"
    },
    {
        "id": 76,
        "title": "Somewhere In September",
        "category": "ADFV",
        "url": "music/Adfv/Somewhere In September.mp3"
    },
    {
        "id": 77,
        "title": "The Neighbourhood - Sweater Weather",
        "category": "ADFV",
        "url": "music/Adfv/The Neighbourhood - Sweater Weather (Official Video).mp3"
    },
    {
        "id": 78,
        "title": "Ajab Si - KK",
        "category": "KK",
        "url": "music/KK/Ajab Si.mp3"
    },
    {
        "id": 79,
        "title": "Beete Lamhe Lyrical Video Song The Train K.K. Mithoon Emraan Hashmi, Geeta Basra - KK",
        "category": "KK",
        "url": "music/KK/Beete Lamhe Lyrical Video Song   The Train  K.K.  Mithoon  Emraan Hashmi, Geeta Basra.mp3"
    },
    {
        "id": 80,
        "title": "Haan Tu Hain Full Video - JannatEmraan Hashmi, Sonal ChauhanKKPritamSayeed Quadri",
        "category": "KK",
        "url": "music/KK/Haan Tu Hain Full Video - JannatEmraan Hashmi, Sonal ChauhanKKPritamSayeed Quadri.mp3"
    },
    {
        "id": 81,
        "title": "KK Dil Ibaadat Kar Raha Hai Emraan Hashmi Soha Ali Khan Pritam Tum Mile",
        "category": "KK",
        "url": "music/KK/KK  Dil Ibaadat Kar Raha Hai (Lyrical Video)  Emraan Hashmi  Soha Ali Khan  Pritam  Tum Mile.mp3"
    },
    {
        "id": 82,
        "title": "Lyrical _ Abhi Abhi Toh Mile Ho Jism 2 Sunny Leone, Randeep Hooda, Arunnoday Singh - KK",
        "category": "KK",
        "url": "music/KK/Lyrical _ Abhi Abhi Toh Mile Ho  Jism 2  Sunny Leone, Randeep Hooda, Arunnoday Singh.mp3"
    },
    {
        "id": 83,
        "title": "Lyrical_ Labon Ko Bhool Bhulaiyaa Pritam K.K. Akshay Kumar, Shiney Ahuja, Vidya Balan - KK",
        "category": "KK",
        "url": "music/KK/Lyrical_ Labon Ko  Bhool Bhulaiyaa  Pritam  K.K. Akshay Kumar, Shiney Ahuja, Vidya Balan.mp3"
    },
    {
        "id": 84,
        "title": "Mat Aazma Re - KK",
        "category": "KK",
        "url": "music/KK/Mat Aazma Re (From Murder 3).mp3"
    },
    {
        "id": 85,
        "title": "Piya Aaye Na - KK",
        "category": "KK",
        "url": "music/KK/Piya Aaye Na.mp3"
    },
    {
        "id": 86,
        "title": "SAJDE - KK",
        "category": "KK",
        "url": "music/KK/SAJDE.mp3"
    },
    {
        "id": 87,
        "title": "Such Keh Raha Hai - KK",
        "category": "KK",
        "url": "music/KK/Such Keh Raha Hai.mp3"
    },
    {
        "id": 88,
        "title": "TERI YAADON MEIN - KK",
        "category": "KK",
        "url": "music/KK/TERI YAADON MEIN.mp3"
    },
    {
        "id": 89,
        "title": "TU JO MILAW-IN - KK",
        "category": "KK",
        "url": "music/KK/TU JO MILAW-IN.mp3"
    },
    {
        "id": 90,
        "title": "Tu Hi Meri Shab Hai - KK",
        "category": "KK",
        "url": "music/KK/Tu Hi Meri Shab Hai.mp3"
    },
    {
        "id": 91,
        "title": "Tujhe Sochta Hoon - Full Video Jannat 2 Emraan Hashmi Esha Gupta KK Pritam Sayeed Quadri",
        "category": "KK",
        "url": "music/KK/Tujhe Sochta Hoon - Full Video  Jannat 2  Emraan Hashmi  Esha Gupta  KK  Pritam  Sayeed Quadri.mp3"
    },
    {
        "id": 92,
        "title": "Zara Sa Lyric Video - JannatEmraan Hashmi, Sonal ChauhanKKPritamSayeed Quadri",
        "category": "KK",
        "url": "music/KK/Zara Sa Lyric Video - JannatEmraan Hashmi, Sonal ChauhanKKPritamSayeed Quadri.mp3"
    },
    {
        "id": 93,
        "title": "Aadat - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Aadat.mp3"
    },
    {
        "id": 94,
        "title": "Be Intehaan - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Be Intehaan.mp3"
    },
    {
        "id": 95,
        "title": "Darasal - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Darasal (From Raabta).mp3"
    },
    {
        "id": 96,
        "title": "Dil Diyan Gallan - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Dil Diyan Gallan.mp3"
    },
    {
        "id": 97,
        "title": "Dil Meri Na Sune - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Dil Meri Na Sune.mp3"
    },
    {
        "id": 98,
        "title": "Jeena Jeena - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Jeena Jeena.mp3"
    },
    {
        "id": 99,
        "title": "Kuch Is Tarah - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Kuch Is Tarah.mp3"
    },
    {
        "id": 100,
        "title": "Musafir - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Musafir (From Sweetiee Weds Nri) (feat. Atif Aslam, Palak Muchhal).mp3"
    },
    {
        "id": 101,
        "title": "Pehli Dafa - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Pehli Dafa.mp3"
    },
    {
        "id": 102,
        "title": "Pehli Nazar Mein - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Pehli Nazar Mein.mp3"
    },
    {
        "id": 103,
        "title": "Tera Hone Laga Hoon - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Tera Hone Laga Hoon.mp3"
    },
    {
        "id": 104,
        "title": "Tere Bin - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Tere Bin.mp3"
    },
    {
        "id": 105,
        "title": "Tu Jaane Na - Atif Aslam",
        "category": "ATIF_ASLAM",
        "url": "music/Atif Aslam/Tu Jaane Na.mp3"
    },
    {
        "id": 106,
        "title": "Ae Dil Hai Mushkil Title Track Full Video - Ranbir, Anushka, Aishwarya Arijit Singh Pritam",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Ae Dil Hai Mushkil Title Track Full Video - Ranbir, Anushka, Aishwarya  Arijit Singh Pritam.mp3"
    },
    {
        "id": 107,
        "title": "Baatein Ye Kabhi Na - Full Video Arijit Singh Jeet Gannguli Ali Fazal, Sapna Khamoshiyan",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Baatein Ye Kabhi Na - Full Video  Arijit Singh  Jeet Gannguli  Ali Fazal, Sapna  Khamoshiyan.mp3"
    },
    {
        "id": 108,
        "title": "Bolna - Kapoor & Sons Sidharth Malhotra Alia Bhatt Fawad Khan Arijit Singh Asees Tanishk",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Bolna - Kapoor & Sons  Sidharth Malhotra  Alia Bhatt  Fawad Khan  Arijit Singh  Asees  Tanishk.mp3"
    },
    {
        "id": 109,
        "title": "Channa Mereya Full Video - ADHM Ranbir Kapoor, Anushka Arijit Singh Pritam Karan Johar",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Channa Mereya Full Video - ADHM  Ranbir Kapoor, Anushka  Arijit Singh  Pritam  Karan Johar.mp3"
    },
    {
        "id": 110,
        "title": "Dekha Hazaro Dafaa - Arijit Singh",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Dekha Hazaro Dafaa.mp3"
    },
    {
        "id": 111,
        "title": "Haareya Song Meri Pyaari Bindu Ayushmann, Parineeti Arijit Singh Sachin-Jigar, Priya Saraiya",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Haareya Song  Meri Pyaari Bindu  Ayushmann, Parineeti  Arijit Singh  Sachin-Jigar, Priya Saraiya.mp3"
    },
    {
        "id": 112,
        "title": "Itni Si Baat Hain - Arijit Singh",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Itni Si Baat Hain.mp3"
    },
    {
        "id": 113,
        "title": "Kabhi Jo Baadal Barse - 8K Video Song Arijit Singh Sunny Leone Sharib & Toshi Jackpot",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Kabhi Jo Baadal Barse - 8K Video Song  Arijit Singh  Sunny Leone  Sharib & Toshi  Jackpot.mp3"
    },
    {
        "id": 114,
        "title": "Khamoshiyan Full Video - Title TrackArijit SinghAli Fazal, Sapna Pabbi, Gurmeet C",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Khamoshiyan Full Video - Title TrackArijit SinghAli Fazal, Sapna Pabbi, Gurmeet C.mp3"
    },
    {
        "id": 115,
        "title": "Muskurane Video - Citylights Arijit Singh Rajkummar Rao, Patralekha Jeet Gannguli",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Muskurane Video - Citylights  Arijit Singh  Rajkummar Rao, Patralekha  Jeet Gannguli.mp3"
    },
    {
        "id": 116,
        "title": "Raabta - Arijit Singh",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Raabta.mp3"
    },
    {
        "id": 117,
        "title": "Samjhawan Full Video - Humpty Sharma Ki DulhaniaVarun, AliaArijit Singh, Shreya Ghoshal",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Samjhawan Full Video - Humpty Sharma Ki DulhaniaVarun, AliaArijit Singh, Shreya Ghoshal.mp3"
    },
    {
        "id": 118,
        "title": "Zaalima Raees Shah Rukh Khan Arijit Singh & Harshdeep Kaur JAM8 Pritam",
        "category": "ARIJIT_SINGH",
        "url": "music/Arijit Singh/Zaalima  Raees  Shah Rukh Khan  Arijit Singh & Harshdeep Kaur  JAM8  Pritam.mp3"
    },
    {
        "id": 119,
        "title": "4 AM in Karachi talha anjum prod.umair... Like and subscribe",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/4 AM in Karachi  talha anjum prod.umair... Like and subscribe.mp3"
    },
    {
        "id": 120,
        "title": "AFSANAY - Young Stunners _ Talhah Yunus _ Talha Anjum _ Prod. By Jokhay",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/AFSANAY - Young Stunners _ Talhah Yunus _ Talha Anjum _ Prod. By Jokhay (Official Music Video).mp3"
    },
    {
        "id": 121,
        "title": "Abdullah Siddiqui & Talha Anjum - surface",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Abdullah Siddiqui & Talha Anjum - surface (Official Audio).mp3"
    },
    {
        "id": 122,
        "title": "Agency - Talha Anjum _ Rap Demon _ Prod. by UMAIR",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Agency - Talha Anjum _ Rap Demon _ Prod. by UMAIR (Official Lyric Video).mp3"
    },
    {
        "id": 123,
        "title": "CLONE - Talha anjum , Talha yunus _ Umair _ velostudios - clones Talha anjum new song",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/CLONE - Talha anjum , Talha yunus _ Umair _ velostudios - clones Talha anjum new song.mp3"
    },
    {
        "id": 124,
        "title": "Departure Lane - Talha Anjum & Umair _ Lyrics",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Departure Lane - Talha Anjum & Umair _ Lyrics.mp3"
    },
    {
        "id": 125,
        "title": "GUMAAN - Young Stunners Talha Anjum Talhah Yunus Prod. By Jokhay",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/GUMAAN - Young Stunners  Talha Anjum  Talhah Yunus  Prod. By Jokhay (Official Music Video).mp3"
    },
    {
        "id": 126,
        "title": "JANI - Since Tum ft. @TalhaAnjum - Prod by @superdupersultan",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/JANI - Since Tum ft. @TalhaAnjum  - Prod by  @superdupersultan.mp3"
    },
    {
        "id": 127,
        "title": "Jevin Gill, Talha Anjum - Regrets _ Prod. by Umair",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Jevin Gill, Talha Anjum - Regrets (Official Audio) _ Prod. by Umair.mp3"
    },
    {
        "id": 128,
        "title": "KR$NA - Been a While feat. Talha Anjum _ Prod. Umair _ Time Will Tell EP",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/KR$NA - Been a While feat. Talha Anjum _ Prod. Umair _ Time Will Tell EP.mp3"
    },
    {
        "id": 129,
        "title": "Me & You - Talha Anjum",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Me & You.mp3"
    },
    {
        "id": 130,
        "title": "Moonlight - JJ47 x Talha Anjum",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Moonlight - JJ47 x Talha Anjum (Prod. @Jokhay ).mp3"
    },
    {
        "id": 131,
        "title": "ON ME - JJ47 x TALHAH YUNUS x TALHA ANJUM",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/ON ME - JJ47 x TALHAH YUNUS x TALHA ANJUM (Prod. @Jokhay ).mp3"
    },
    {
        "id": 132,
        "title": "Shor _ Mooroo _ @TalhaAnjum _ Prod. @umairmusicxx",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Shor _ Mooroo _ @TalhaAnjum _ Prod. @umairmusicxx.mp3"
    },
    {
        "id": 133,
        "title": "Talha Anjum - Heartbreak Kid _ Prod. by Umair",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Talha Anjum - Heartbreak Kid _ Prod. by Umair (Official Music Video).mp3"
    },
    {
        "id": 134,
        "title": "Umair, Talha Anjum - love lost",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Umair, Talha Anjum - love lost (Official Audio).mp3"
    },
    {
        "id": 135,
        "title": "Umair, Talha Anjum, Abdullah Maharvi - COME THROUGH",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/Umair, Talha Anjum, Abdullah Maharvi - COME THROUGH (Official Audio).mp3"
    },
    {
        "id": 136,
        "title": "aleemrk - Wake Me Up - Talha Anjum",
        "category": "TALHA_ANJUM",
        "url": "music/Talha Anjum/aleemrk - Wake Me Up (Lyrics).mp3"
    }
],
  currentPlayingTrackId: null
};

function getVaultCredentials() {
  let user = localStorage.getItem("re_vault_user");
  let pass = localStorage.getItem("re_vault_pass");

  // Auto-migrate legacy 'admin' or '9082894861'
  if (!user || user === "admin") {
    user = "Spellman";
    localStorage.setItem("re_vault_user", "Spellman");
  }
  if (!pass || pass === "9082894861") {
    pass = "Anonymous099m";
    localStorage.setItem("re_vault_pass", "Anonymous099m");
  }

  return { user, pass };
}

function switchLoginMode(mode) {
  vaultState.loginMode = mode;
  const btnAdmin = document.getElementById("tab-btn-admin-login");
  const btnUser = document.getElementById("tab-btn-user-login");
  const secAdmin = document.getElementById("login-section-admin");
  const secUser = document.getElementById("login-section-user");

  if (mode === "admin") {
    if (btnAdmin) btnAdmin.classList.add("active");
    if (btnUser) btnUser.classList.remove("active");
    if (secAdmin) secAdmin.style.display = "block";
    if (secUser) secUser.style.display = "none";
  } else {
    if (btnAdmin) btnAdmin.classList.remove("active");
    if (btnUser) btnUser.classList.add("active");
    if (secAdmin) secAdmin.style.display = "none";
    if (secUser) secUser.style.display = "block";
  }
}

function fillUserCredentials(username, password) {
  const userField = document.getElementById("user-login-id-input");
  const passField = document.getElementById("user-login-pass-input");
  if (userField) userField.value = username;
  if (passField) passField.value = password;
  showToast(`⚡ Autofilled: ${username}`);
}

function openAdminVaultModal() {
  const modal = document.getElementById("admin-vault-modal");
  if (!modal) return;
  modal.style.display = "flex";
  vaultState.isVaultModalOpen = true;

  initUserDatabase();

  if (vaultState.isUnlocked) {
    document.getElementById("vault-login-view").style.display = "none";
    document.getElementById("vault-player-view").style.display = "block";
    
    // Update role display
    const rolePill = document.getElementById("hub-role-badge");
    const nameEl = document.getElementById("hub-user-display-name");
    const subnav = document.getElementById("admin-hub-subnav");
    const modalTitle = document.getElementById("music-modal-title");

    if (vaultState.authRole === "admin") {
      if (rolePill) { rolePill.textContent = "ADMIN"; rolePill.className = "hub-role-pill admin"; }
      if (nameEl) nameEl.textContent = vaultState.activeUser?.username || "Spellman";
      if (subnav) subnav.style.display = "flex";
      if (modalTitle) modalTitle.textContent = "Central Admin Music & User Control";
      switchAdminSubTab(vaultState.activeAdminTab || "player");
    } else {
      const activeUser = vaultState.activeUser;
      const fullName = activeUser ? (activeUser.name || activeUser.username) : "User";
      if (rolePill) { rolePill.textContent = "USER"; rolePill.className = "hub-role-pill user"; }
      if (nameEl) nameEl.textContent = activeUser ? `${fullName} (${activeUser.username})` : "User";
      if (subnav) subnav.style.display = "none";
      if (modalTitle) modalTitle.textContent = `Listener Portal: ${fullName}`;
      document.getElementById("hub-section-player").style.display = "block";
      document.getElementById("hub-section-users").style.display = "none";
      document.getElementById("hub-section-security").style.display = "none";
      const modalCard = document.getElementById("music-hub-modal-card");
      if (modalCard) modalCard.classList.remove("wide-layout");
    }

    renderVaultPlaylist();
  } else {
    document.getElementById("vault-login-view").style.display = "block";
    document.getElementById("vault-player-view").style.display = "none";
    if (document.getElementById("vault-emergency-view")) document.getElementById("vault-emergency-view").style.display = "none";
    switchLoginMode(vaultState.loginMode || "admin");
  }
}

function closeAdminVaultModal() {
  const modal = document.getElementById("admin-vault-modal");
  if (modal) modal.style.display = "none";
  vaultState.isVaultModalOpen = false;
}

const MASTER_RECOVERY_CODES = ["9082894861"];

function loginAdminVault() {
  const userEl = document.getElementById("vault-userid-input");
  const passEl = document.getElementById("vault-password-input");

  const inputUser = userEl ? userEl.value.trim() : "";
  const inputPass = passEl ? passEl.value.trim() : "";

  if (!inputUser || !inputPass) {
    showToast("⚠️ Please enter both Admin Username and Password!");
    return;
  }

  const creds = getVaultCredentials();

  // Accept current configured credentials OR default Spellman / Anonymous099m
  const isUserMatch = inputUser.toLowerCase() === creds.user.toLowerCase() || inputUser.toLowerCase() === "spellman";
  const isPassMatch = inputPass === creds.pass || inputPass === "Anonymous099m";

  if (!isUserMatch) {
    // Check if this was a User ID entered on the Admin tab
    const users = getUsersList();
    const isUserAccount = users.find(u => u.username.toLowerCase() === inputUser.toLowerCase());
    if (isUserAccount) {
      showToast(`ℹ️ "${inputUser}" is a User ID. Switching to "2. User Login" tab...`);
      switchLoginMode('user');
      const uField = document.getElementById("user-login-id-input");
      const pField = document.getElementById("user-login-pass-input");
      if (uField) uField.value = inputUser;
      if (pField) pField.value = inputPass;
      return;
    }

    showToast(`❌ Admin Username "${inputUser}" is incorrect!`);
    return;
  }

  if (!isPassMatch) {
    showToast("❌ Incorrect Admin Password! (Passwords are case-sensitive)");
    return;
  }

  // Ensure active credentials are saved in localStorage
  localStorage.setItem("re_vault_user", creds.user || "Spellman");
  if (inputPass === "Anonymous099m" && creds.pass !== "Anonymous099m") {
    localStorage.setItem("re_vault_pass", "Anonymous099m");
  }

  // Credentials Validated!
  vaultState.isUnlocked = true;
  vaultState.authRole = "admin";
  vaultState.activeUser = { name: "System Administrator", username: creds.user || "Spellman" };
  showToast("🛡️ Admin Verified: Welcome Administrator!");

  if (typeof sbLogActivity === "function") {
    sbLogActivity("Admin", "ADMIN_LOGIN", `Administrator "${creds.user || 'Spellman'}" logged in`);
  }

  if (typeof sbTrackUserPresence === "function") {
    sbTrackUserPresence(vaultState.activeUser, "admin");
  }

  document.getElementById("vault-login-view").style.display = "none";
  if (document.getElementById("vault-emergency-view")) document.getElementById("vault-emergency-view").style.display = "none";
  document.getElementById("vault-player-view").style.display = "block";

  // Setup Admin UI
  const rolePill = document.getElementById("hub-role-badge");
  const nameEl = document.getElementById("hub-user-display-name");
  const subnav = document.getElementById("admin-hub-subnav");
  const modalTitle = document.getElementById("music-modal-title");

  if (rolePill) { rolePill.textContent = "ADMIN"; rolePill.className = "hub-role-pill admin"; }
  if (nameEl) { nameEl.textContent = creds.user || "Spellman"; }
  if (subnav) subnav.style.display = "flex";
  if (modalTitle) modalTitle.textContent = "Central Admin Music & User Control";

  switchAdminSubTab(vaultState.activeAdminTab || "player");
  renderVaultPlaylist();
}

function loginUserPanel() {
  initUserDatabase();

  const userField = document.getElementById("user-login-id-input");
  const passField = document.getElementById("user-login-pass-input");

  const inputUser = userField ? userField.value.trim() : "";
  const inputPass = passField ? passField.value.trim() : "";

  if (!inputUser || !inputPass) {
    showToast("⚠️ Please enter both Username and Password!");
    return;
  }

  const users = getUsersList();
  
  // 1. Check if user account exists (case-insensitive username search)
  const user = users.find(u => u.username && u.username.toLowerCase() === inputUser.toLowerCase());

  if (!user) {
    // Check if this was an Admin account entered on the User tab
    const creds = getVaultCredentials();
    if (inputUser.toLowerCase() === creds.user.toLowerCase() || inputUser.toLowerCase() === "spellman") {
      showToast(`ℹ️ "${inputUser}" is an Admin ID. Switching to "1. Admin Login" tab...`);
      switchLoginMode('admin');
      const aUserField = document.getElementById("vault-userid-input");
      const aPassField = document.getElementById("vault-password-input");
      if (aUserField) aUserField.value = inputUser;
      if (aPassField) aPassField.value = inputPass;
      return;
    }

    showToast(`❌ User ID "${inputUser}" not found! Please check your username.`);
    return;
  }

  // 2. Check password match
  if (user.password !== inputPass) {
    if (user.password.toLowerCase() === inputPass.toLowerCase()) {
      showToast("❌ Incorrect Password! (Passwords are case-sensitive)");
    } else {
      showToast("❌ Incorrect Password! Please check your password.");
    }
    return;
  }

  const globalEnabled = isGlobalUserLoginEnabled();

  // 3. Check permission status (Blocked vs Permitted)
  if (user.status === "disabled") {
    if (typeof sbLogActivity === "function") {
      sbLogActivity(user.username, "USER_LOGIN_BLOCKED", `Blocked login attempt by "${user.username}"`);
    }
    if (!globalEnabled) {
      showToast(`⛔ Access Denied: Global access is restricted and user "${user.username}" is Blocked.`);
    } else {
      showToast(`⛔ Account Blocked: Login access for "${user.username}" is disabled by Administrator!`);
    }
    return;
  }

  // 4. Authenticate & Grant Access
  vaultState.isUnlocked = true;
  vaultState.authRole = "user";
  vaultState.activeUser = user;
  
  const fullName = user.name || user.username;
  if (typeof updateAgentName === "function") {
    updateAgentName(fullName);
    const agentInput = document.getElementById("input-agent-name");
    if (agentInput) agentInput.value = fullName;
  }

  if (!globalEnabled) {
    showToast(`🎧 Welcome, ${fullName}! (Selective Permission Granted)`);
  } else {
    showToast(`🎧 Welcome, ${fullName}!`);
  }

  if (typeof sbLogActivity === "function") {
    sbLogActivity(user.username, "USER_LOGIN", `User "${user.username}" (${fullName}) logged in successfully`);
  }

  if (typeof sbTrackUserPresence === "function") {
    sbTrackUserPresence(user, "user");
  }

  document.getElementById("vault-login-view").style.display = "none";
  if (document.getElementById("vault-emergency-view")) document.getElementById("vault-emergency-view").style.display = "none";
  document.getElementById("vault-player-view").style.display = "block";

  // Setup User UI
  const rolePill = document.getElementById("hub-role-badge");
  const nameEl = document.getElementById("hub-user-display-name");
  const subnav = document.getElementById("admin-hub-subnav");
  const modalTitle = document.getElementById("music-modal-title");

  if (rolePill) { rolePill.textContent = "USER"; rolePill.className = "hub-role-pill user"; }
  if (nameEl) {
    nameEl.textContent = `${fullName} (${user.username})`;
    nameEl.title = `Full Name: ${fullName} | ID: ${user.username}`;
  }
  if (subnav) subnav.style.display = "none";
  if (modalTitle) modalTitle.textContent = `Listener Portal: ${fullName}`;

  document.getElementById("hub-section-player").style.display = "block";
  document.getElementById("hub-section-users").style.display = "none";
  document.getElementById("hub-section-security").style.display = "none";

  const modalCard = document.getElementById("music-hub-modal-card");
  if (modalCard) modalCard.classList.remove("wide-layout");

  renderVaultPlaylist();
}

function logoutMusicPanel() {
  if (typeof sbUntrackUserPresence === "function" && vaultState.activeUser) {
    sbUntrackUserPresence(vaultState.activeUser.username);
  }

  vaultState.isUnlocked = false;
  vaultState.authRole = null;
  vaultState.activeUser = null;
  stopVaultAudio();

  const modalCard = document.getElementById("music-hub-modal-card");
  if (modalCard) modalCard.classList.remove("wide-layout");

  document.getElementById("vault-player-view").style.display = "none";
  document.getElementById("vault-login-view").style.display = "block";
  if (document.getElementById("vault-emergency-view")) document.getElementById("vault-emergency-view").style.display = "none";

  const modalTitle = document.getElementById("music-modal-title");
  if (modalTitle) modalTitle.textContent = "System Security Verification";

  showToast("🔒 Signed out successfully.");
}

function logoutAdminVault() {
  logoutMusicPanel();
}

function switchAdminSubTab(subtab) {
  vaultState.activeAdminTab = subtab;
  const btnPlayer = document.getElementById("btn-subnav-player");
  const btnUsers = document.getElementById("btn-subnav-users");
  const btnCms = document.getElementById("btn-subnav-cms");
  const btnSecurity = document.getElementById("btn-subnav-security");

  const secPlayer = document.getElementById("hub-section-player");
  const secUsers = document.getElementById("hub-section-users");
  const secCms = document.getElementById("hub-section-cms");
  const secSecurity = document.getElementById("hub-section-security");

  const modalCard = document.getElementById("music-hub-modal-card");

  [btnPlayer, btnUsers, btnCms, btnSecurity].forEach(b => b && b.classList.remove("active"));
  [secPlayer, secUsers, secCms, secSecurity].forEach(s => s && (s.style.display = "none"));

  if (subtab === "player") {
    if (btnPlayer) btnPlayer.classList.add("active");
    if (secPlayer) secPlayer.style.display = "block";
    if (modalCard) modalCard.classList.remove("wide-layout");
    renderVaultPlaylist();
  } else if (subtab === "users") {
    if (btnUsers) btnUsers.classList.add("active");
    if (secUsers) secUsers.style.display = "block";
    if (modalCard) modalCard.classList.add("wide-layout");
    if (typeof sbFetchLiveOnlineUsersFromDB === "function") {
      sbFetchLiveOnlineUsersFromDB();
    }
    renderUserManagementTable();
  } else if (subtab === "cms") {
    if (btnCms) btnCms.classList.add("active");
    if (secCms) secCms.style.display = "block";
    if (modalCard) modalCard.classList.add("wide-layout");
    initCmsTabUI();
  } else if (subtab === "security") {
    if (btnSecurity) btnSecurity.classList.add("active");
    if (secSecurity) secSecurity.style.display = "block";
    if (modalCard) modalCard.classList.remove("wide-layout");
  }
}

// ==============================================================================
// RECENTRAL CMS (CONTENT MANAGEMENT SYSTEM) ENGINE
// ==============================================================================

let currentCmsScriptLang = "bn";
let currentCmsTab = "scripts";

function initCmsData() {
  try {
    const CMS_DATA_VERSION = "2026-10-13-v2";
    if (localStorage.getItem("re_cms_version") !== CMS_DATA_VERSION) {
      localStorage.setItem("re_cms_version", CMS_DATA_VERSION);
      localStorage.removeItem("re_cms_bikes");
      BIKE_SPECS = JSON.parse(JSON.stringify(DEFAULT_BIKE_SPECS));
    }

    const savedScripts = localStorage.getItem("re_cms_scripts");
    if (savedScripts) CALL_SCRIPTS = JSON.parse(savedScripts);

    const savedPitches = localStorage.getItem("re_cms_pitches");
    if (savedPitches) MODEL_PITCHES = JSON.parse(savedPitches);

    const savedBikes = localStorage.getItem("re_cms_bikes");
    if (savedBikes) BIKE_SPECS = JSON.parse(savedBikes);

    const savedObjections = localStorage.getItem("re_cms_objections");
    if (savedObjections) OBJECTION_REBUTTALS = JSON.parse(savedObjections);
  } catch (e) {
    console.warn("[CMS] Failed loading local CMS cache:", e);
  }

  // Asynchronously sync from Supabase
  if (typeof sbFetchCmsData === "function") {
    sbFetchCmsData().then((cms) => {
      if (cms) {
        if (cms.cms_scripts) {
          CALL_SCRIPTS = cms.cms_scripts;
          localStorage.setItem("re_cms_scripts", JSON.stringify(CALL_SCRIPTS));
        }
        if (cms.cms_pitches) {
          MODEL_PITCHES = cms.cms_pitches;
          localStorage.setItem("re_cms_pitches", JSON.stringify(MODEL_PITCHES));
        }
        if (cms.cms_bikes) {
          BIKE_SPECS = cms.cms_bikes;
          localStorage.setItem("re_cms_bikes", JSON.stringify(BIKE_SPECS));
        }
        if (cms.cms_objections) {
          OBJECTION_REBUTTALS = cms.cms_objections;
          localStorage.setItem("re_cms_objections", JSON.stringify(OBJECTION_REBUTTALS));
        }
        refreshAllCmsRenderers();
      }
    }).catch(() => {});
  }
}

function refreshAllCmsRenderers() {
  if (typeof renderScriptStepList === "function") renderScriptStepList();
  if (typeof renderCurrentScriptStep === "function") renderCurrentScriptStep();
  if (typeof renderBikeSelectorPills === "function") renderBikeSelectorPills();
  if (typeof initBikeSelectors === "function") initBikeSelectors();
  if (typeof renderRebuttalsGrid === "function") renderRebuttalsGrid();
  if (typeof renderBikeDetails === "function" && currentState && currentState.selectedBike) {
    renderBikeDetails(currentState.selectedBike);
  }
  if (vaultState && vaultState.activeAdminTab === "cms") {
    initCmsTabUI();
  }
}

function initCmsTabUI() {
  switchCmsSubTab(currentCmsTab || "scripts");
}

function switchCmsSubTab(tab) {
  currentCmsTab = tab;
  const btnScripts = document.getElementById("btn-cms-tab-scripts");
  const btnBikes = document.getElementById("btn-cms-tab-bikes");
  const btnRebuttals = document.getElementById("btn-cms-tab-rebuttals");

  const paneScripts = document.getElementById("cms-subpane-scripts");
  const paneBikes = document.getElementById("cms-subpane-bikes");
  const paneRebuttals = document.getElementById("cms-subpane-rebuttals");

  [btnScripts, btnBikes, btnRebuttals].forEach(b => b && b.classList.remove("active"));
  [paneScripts, paneBikes, paneRebuttals].forEach(p => p && (p.style.display = "none"));

  if (tab === "scripts") {
    if (btnScripts) btnScripts.classList.add("active");
    if (paneScripts) paneScripts.style.display = "block";
    renderCmsScriptsList();
    renderCmsPitchBikeOptions();
    loadCmsModelPitchFields();
  } else if (tab === "bikes") {
    if (btnBikes) btnBikes.classList.add("active");
    if (paneBikes) paneBikes.style.display = "block";
    renderCmsBikesList();
  } else if (tab === "rebuttals") {
    if (btnRebuttals) btnRebuttals.classList.add("active");
    if (paneRebuttals) paneRebuttals.style.display = "block";
    renderCmsRebuttalsList();
  }
}

function switchCmsScriptLang(lang) {
  currentCmsScriptLang = lang;
  const btnBn = document.getElementById("btn-cms-lang-bn");
  const btnHi = document.getElementById("btn-cms-lang-hi");
  const btnEn = document.getElementById("btn-cms-lang-en");

  [btnBn, btnHi, btnEn].forEach(b => b && b.classList.remove("active"));
  if (lang === "bn" && btnBn) btnBn.classList.add("active");
  if (lang === "hi" && btnHi) btnHi.classList.add("active");
  if (lang === "en" && btnEn) btnEn.classList.add("active");

  renderCmsScriptsList(document.getElementById("cms-script-search")?.value || "");
}

let selectedCmsStepIndex = 0;

function renderCmsScriptsList(query = "") {
  const container = document.getElementById("cms-scripts-list-container");
  if (!container) return;

  const langData = CALL_SCRIPTS[currentCmsScriptLang] || CALL_SCRIPTS.bn;
  const steps = langData.steps || [];

  const countBadge = document.getElementById("cms-script-count-display");
  if (countBadge) countBadge.textContent = `${steps.length} Steps`;

  const q = (query || "").toLowerCase().trim();
  const filtered = steps.map((s, idx) => ({ ...s, originalIndex: idx })).filter(s => {
    if (!q) return true;
    return s.title.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.text.toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">No script steps found matching "${escapeHtml(query)}".</div>`;
    return;
  }

  container.innerHTML = filtered.map(s => {
    const previewText = s.text.length > 110 ? s.text.substring(0, 110) + "..." : s.text;
    const isSelected = s.originalIndex === selectedCmsStepIndex;
    const borderStyle = isSelected ? "border-color: var(--accent-gold); box-shadow: 0 0 10px rgba(229, 184, 105, 0.15);" : "";
    return `
      <div class="cms-item-card" style="cursor: pointer; ${borderStyle}" onclick="inspectCmsScriptStep('${currentCmsScriptLang}', ${s.originalIndex})">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 6px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="cms-step-num-badge">${s.originalIndex + 1}</span>
              <span style="font-weight: 700; color: var(--accent-gold); font-size: 13px;">${escapeHtml(s.title)}</span>
              <span class="cms-badge-tag">${escapeHtml(s.id)}</span>
            </div>
          </div>
          <div style="display: flex; gap: 6px;" onclick="event.stopPropagation();">
            <button class="mini-action-btn edit-btn" onclick="openCmsScriptEditModal('${currentCmsScriptLang}', ${s.originalIndex})" title="Edit Script Step">
              ${EDIT_SVG}
            </button>
            <button class="mini-action-btn delete-btn" onclick="deleteCmsScriptStep('${currentCmsScriptLang}', ${s.originalIndex})" title="Delete Script Step">
              ${TRASH_SVG}
            </button>
          </div>
        </div>
        <div style="font-size: 11px; color: var(--text-main); line-height: 1.4; white-space: pre-line; background: rgba(0,0,0,0.15); padding: 7px 9px; border-radius: var(--radius-sm);">
          ${escapeHtml(previewText)}
        </div>
      </div>
    `;
  }).join("");

  inspectCmsScriptStep(currentCmsScriptLang, selectedCmsStepIndex);
}

function inspectCmsScriptStep(lang, stepIndex) {
  const langData = CALL_SCRIPTS[lang] || CALL_SCRIPTS.bn;
  const steps = langData.steps || [];
  if (steps.length === 0) return;

  if (stepIndex < 0 || stepIndex >= steps.length) stepIndex = 0;
  selectedCmsStepIndex = stepIndex;

  const step = steps[stepIndex];
  if (!step) return;

  const badge = document.getElementById("cms-inspect-badge");
  const title = document.getElementById("cms-inspect-title");
  const idElem = document.getElementById("cms-inspect-id");
  const body = document.getElementById("cms-inspect-body");

  if (badge) badge.textContent = String(stepIndex + 1);
  if (title) title.textContent = `Step ${stepIndex + 1}: ${step.title}`;
  if (idElem) idElem.textContent = step.id || "step";

  if (body) {
    let formattedText = escapeHtml(step.text);
    const tags = ["&lt;Agent Name&gt;", "&lt;Customer Name&gt;", "&lt;Bike Model&gt;", "&lt;Model Pitch Bengali&gt;", "&lt;Model Pitch Hindi&gt;", "&lt;Model Pitch English&gt;", "&lt;Model Pitch&gt;", "&lt;Test Ride Slot&gt;"];
    tags.forEach(t => {
      formattedText = formattedText.split(t).join(`<span class="cms-highlight-tag">${t}</span>`);
    });
    body.innerHTML = formattedText;
  }
}

function openSelectedCmsScriptEdit() {
  openCmsScriptEditModal(currentCmsScriptLang, selectedCmsStepIndex);
}

function openCmsAddScriptModal() {
  document.getElementById("cms-script-modal-title").textContent = `+ Add New Script Step (${currentCmsScriptLang.toUpperCase()})`;
  document.getElementById("cms-edit-script-lang").value = currentCmsScriptLang;
  document.getElementById("cms-edit-script-index").value = "-1";
  document.getElementById("cms-edit-script-id").value = `step_${Date.now()}`;
  document.getElementById("cms-edit-script-title").value = "";
  document.getElementById("cms-edit-script-text").value = "";
  document.getElementById("cms-script-modal").style.display = "flex";
}

function openCmsScriptEditModal(lang, stepIndex) {
  const langData = CALL_SCRIPTS[lang] || CALL_SCRIPTS.bn;
  const step = langData.steps[stepIndex];
  if (!step) return;

  document.getElementById("cms-script-modal-title").textContent = `Edit Step ${stepIndex + 1}: ${step.title}`;
  document.getElementById("cms-edit-script-lang").value = lang;
  document.getElementById("cms-edit-script-index").value = String(stepIndex);
  document.getElementById("cms-edit-script-id").value = step.id || "";
  document.getElementById("cms-edit-script-title").value = step.title || "";
  document.getElementById("cms-edit-script-text").value = step.text || "";
  document.getElementById("cms-script-modal").style.display = "flex";
}

function closeCmsScriptModal() {
  const modal = document.getElementById("cms-script-modal");
  if (modal) modal.style.display = "none";
}

function saveCmsScriptEdit() {
  const langEl = document.getElementById("cms-edit-script-lang");
  const indexEl = document.getElementById("cms-edit-script-index");
  const idEl = document.getElementById("cms-edit-script-id");
  const titleEl = document.getElementById("cms-edit-script-title");
  const textEl = document.getElementById("cms-edit-script-text");

  const lang = (langEl ? langEl.value : "") || currentCmsScriptLang || "bn";
  const index = parseInt(indexEl ? indexEl.value : "-1", 10);
  const id = idEl ? idEl.value.trim() : "";
  const title = titleEl ? titleEl.value.trim() : "";
  const text = textEl ? textEl.value.trim() : "";

  if (!title || !text) {
    showToast("⚠️ Title and Script text cannot be empty!");
    return;
  }

  if (!CALL_SCRIPTS[lang]) CALL_SCRIPTS[lang] = { name: lang, steps: [] };

  const newStep = {
    id: id || `step_${Date.now()}`,
    title: title,
    text: text
  };

  if (index >= 0 && index < CALL_SCRIPTS[lang].steps.length) {
    CALL_SCRIPTS[lang].steps[index] = newStep;
  } else {
    CALL_SCRIPTS[lang].steps.push(newStep);
  }

  // 1. Immediately persist to localStorage
  localStorage.setItem("re_cms_scripts", JSON.stringify(CALL_SCRIPTS));

  // 2. Persist to Supabase Cloud DB
  if (typeof sbSaveCmsKey === "function") {
    sbSaveCmsKey("cms_scripts", CALL_SCRIPTS).catch(e => console.error("Cloud save error:", e));
  }

  closeCmsScriptModal();
  renderCmsScriptsList(document.getElementById("cms-script-search")?.value || "");
  inspectCmsScriptStep(lang, index >= 0 ? index : CALL_SCRIPTS[lang].steps.length - 1);
  refreshAllCmsRenderers();
  showToast(`✅ Script Step "${title}" saved & synced!`);
}

function deleteCmsScriptStep(lang, stepIndex) {
  const langData = CALL_SCRIPTS[lang];
  if (!langData || !langData.steps[stepIndex]) return;
  const title = langData.steps[stepIndex].title;

  if (!confirm(`Are you sure you want to delete Step ${stepIndex + 1}: "${title}"?`)) return;

  langData.steps.splice(stepIndex, 1);
  localStorage.setItem("re_cms_scripts", JSON.stringify(CALL_SCRIPTS));
  if (typeof sbSaveCmsKey === "function") {
    sbSaveCmsKey("cms_scripts", CALL_SCRIPTS).catch(e => console.error("Cloud delete error:", e));
  }

  renderCmsScriptsList(document.getElementById("cms-script-search")?.value || "");
  refreshAllCmsRenderers();
  showToast(`Script step "${title}" deleted.`);
}

// --- CMS MODEL PITCHES ---
function renderCmsPitchBikeOptions() {
  const select = document.getElementById("cms-pitch-bike-select");
  if (!select) return;

  const currentVal = select.value;
  select.innerHTML = BIKE_SPECS.map(b => `<option value="${escapeHtml(b.name)}">${escapeHtml(b.name)}</option>`).join("");
  if (currentVal && BIKE_SPECS.some(b => b.name === currentVal)) {
    select.value = currentVal;
  }
}

function loadCmsModelPitchFields() {
  const select = document.getElementById("cms-pitch-bike-select");
  if (!select || !select.value) return;

  const bikeName = select.value;
  const pitch = MODEL_PITCHES[bikeName] || { bn: "", hi: "", en: "" };

  const taBn = document.getElementById("cms-pitch-bn-text");
  const taHi = document.getElementById("cms-pitch-hi-text");
  const taEn = document.getElementById("cms-pitch-en-text");

  if (taBn) taBn.value = pitch.bn || "";
  if (taHi) taHi.value = pitch.hi || "";
  if (taEn) taEn.value = pitch.en || "";
}

function saveCmsModelPitch() {
  const select = document.getElementById("cms-pitch-bike-select");
  if (!select || !select.value) return;

  const bikeName = select.value;
  const bn = document.getElementById("cms-pitch-bn-text")?.value || "";
  const hi = document.getElementById("cms-pitch-hi-text")?.value || "";
  const en = document.getElementById("cms-pitch-en-text")?.value || "";

  MODEL_PITCHES[bikeName] = { bn, hi, en };
  localStorage.setItem("re_cms_pitches", JSON.stringify(MODEL_PITCHES));
  if (typeof sbSaveCmsKey === "function") {
    sbSaveCmsKey("cms_pitches", MODEL_PITCHES);
  }

  refreshAllCmsRenderers();
  showToast(`Model pitch for "${bikeName}" saved & synced!`);
}

// --- CMS BIKES CMS ---
function renderCmsBikesList(query = "") {
  const tbody = document.getElementById("cms-bikes-table-body");
  if (!tbody) return;

  const countBadge = document.getElementById("cms-stat-total-bikes");
  if (countBadge) countBadge.textContent = String(BIKE_SPECS.length);

  const q = (query || "").toLowerCase().trim();
  const filtered = BIKE_SPECS.filter(b => {
    if (!q) return true;
    return b.name.toLowerCase().includes(q) || (b.category && b.category.toLowerCase().includes(q)) || (b.engine && b.engine.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 18px;">No motorcycle models found matching "${escapeHtml(query)}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((b, idx) => `
    <tr>
      <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
      <td>
        <span style="font-weight: 700; color: var(--accent-gold);">${escapeHtml(b.name)}</span>
        <div style="font-size: 10px; color: var(--text-muted); font-family: monospace;">${escapeHtml(b.id)}</div>
      </td>
      <td><span class="cms-badge-tag">${escapeHtml(b.category || 'Roadster')}</span></td>
      <td><span style="font-weight: 700; color: #22c55e;">${escapeHtml(b.price || 'N/A')}</span></td>
      <td style="font-size: 11px; color: var(--text-muted);">${escapeHtml(b.engine || '-')}</td>
      <td style="font-size: 11px; color: var(--text-main); font-weight: 600;">${escapeHtml(b.mileage || '-')}</td>
      <td style="text-align: right;">
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px;">
          <button class="mini-action-btn edit-btn" onclick="openCmsBikeEditModal('${escapeHtml(b.id)}')" title="Edit Bike Specs & Price">
            ${EDIT_SVG}
          </button>
          <button class="mini-action-btn delete-btn" onclick="deleteCmsBike('${escapeHtml(b.id)}')" title="Delete Bike Model">
            ${TRASH_SVG}
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function openCmsAddBikeModal() {
  document.getElementById("cms-bike-modal-title").textContent = "+ Add New Motorcycle Model";
  document.getElementById("cms-edit-bike-original-id").value = "";
  document.getElementById("cms-bike-id").value = "";
  document.getElementById("cms-bike-name").value = "";
  document.getElementById("cms-bike-category").value = "Roadster";
  document.getElementById("cms-bike-price").value = "₹1,50,000";
  document.getElementById("cms-bike-engine").value = "349cc Single Cylinder, Air-Oil Cooled";
  document.getElementById("cms-bike-power").value = "20.2 BHP @ 6100 rpm";
  document.getElementById("cms-bike-torque").value = "27 Nm @ 4000 rpm";
  document.getElementById("cms-bike-mileage").value = "~36 km/L";
  document.getElementById("cms-bike-fuel").value = "13 Litres";
  document.getElementById("cms-bike-weight").value = "181 kg";
  document.getElementById("cms-bike-url").value = "https://www.royalenfield.com/";
  document.getElementById("cms-bike-config-url").value = "https://makeityours.royalenfield.com/";
  document.getElementById("cms-bike-modal").style.display = "flex";
}

function openCmsBikeEditModal(bikeId) {
  const bike = BIKE_SPECS.find(b => b.id === bikeId);
  if (!bike) return;

  document.getElementById("cms-bike-modal-title").textContent = `Edit Model: ${bike.name}`;
  document.getElementById("cms-edit-bike-original-id").value = bike.id;
  document.getElementById("cms-bike-id").value = bike.id || "";
  document.getElementById("cms-bike-name").value = bike.name || "";
  document.getElementById("cms-bike-category").value = bike.category || "";
  document.getElementById("cms-bike-price").value = bike.price || "";
  document.getElementById("cms-bike-engine").value = bike.engine || "";
  document.getElementById("cms-bike-power").value = bike.power || "";
  document.getElementById("cms-bike-torque").value = bike.torque || "";
  document.getElementById("cms-bike-mileage").value = bike.mileage || "";
  document.getElementById("cms-bike-fuel").value = bike.fuelTank || "";
  document.getElementById("cms-bike-weight").value = bike.kerbWeight || "";
  document.getElementById("cms-bike-url").value = bike.websiteUrl || "";
  document.getElementById("cms-bike-config-url").value = bike.configuratorUrl || "";
  document.getElementById("cms-bike-modal").style.display = "flex";
}

function closeCmsBikeModal() {
  const modal = document.getElementById("cms-bike-modal");
  if (modal) modal.style.display = "none";
}

function saveCmsBikeEdit() {
  const origId = document.getElementById("cms-edit-bike-original-id").value;
  const id = document.getElementById("cms-bike-id").value.trim().toLowerCase().replace(/\s+/g, "-");
  const name = document.getElementById("cms-bike-name").value.trim();

  if (!id || !name) {
    showToast("⚠️ Model ID and Name are required!");
    return;
  }

  const bikeData = {
    id: id,
    name: name,
    category: document.getElementById("cms-bike-category").value.trim() || "Roadster",
    price: document.getElementById("cms-bike-price").value.trim() || "₹1,50,000",
    engine: document.getElementById("cms-bike-engine").value.trim(),
    power: document.getElementById("cms-bike-power").value.trim(),
    torque: document.getElementById("cms-bike-torque").value.trim(),
    mileage: document.getElementById("cms-bike-mileage").value.trim(),
    fuelTank: document.getElementById("cms-bike-fuel").value.trim(),
    kerbWeight: document.getElementById("cms-bike-weight").value.trim(),
    websiteUrl: document.getElementById("cms-bike-url").value.trim(),
    configuratorUrl: document.getElementById("cms-bike-config-url").value.trim()
  };

  if (origId) {
    const idx = BIKE_SPECS.findIndex(b => b.id === origId);
    if (idx !== -1) {
      BIKE_SPECS[idx] = { ...BIKE_SPECS[idx], ...bikeData };
    } else {
      BIKE_SPECS.push(bikeData);
    }
  } else {
    const existing = BIKE_SPECS.findIndex(b => b.id === id);
    if (existing !== -1) {
      BIKE_SPECS[existing] = { ...BIKE_SPECS[existing], ...bikeData };
    } else {
      BIKE_SPECS.push(bikeData);
    }
  }

  localStorage.setItem("re_cms_bikes", JSON.stringify(BIKE_SPECS));
  if (typeof sbSaveCmsKey === "function") {
    sbSaveCmsKey("cms_bikes", BIKE_SPECS).catch(e => console.error("Cloud save error:", e));
  }

  closeCmsBikeModal();
  renderCmsBikesList(document.getElementById("cms-bike-search")?.value || "");
  refreshAllCmsRenderers();
  showToast(`Motorcycle "${name}" saved & synced!`);
}

function deleteCmsBike(bikeId) {
  const bike = BIKE_SPECS.find(b => b.id === bikeId);
  if (!bike) return;

  if (!confirm(`Are you sure you want to delete motorcycle model "${bike.name}"?`)) return;

  BIKE_SPECS = BIKE_SPECS.filter(b => b.id !== bikeId);
  localStorage.setItem("re_cms_bikes", JSON.stringify(BIKE_SPECS));
  if (typeof sbSaveCmsKey === "function") {
    sbSaveCmsKey("cms_bikes", BIKE_SPECS).catch(e => console.error("Cloud delete error:", e));
  }

  renderCmsBikesList(document.getElementById("cms-bike-search")?.value || "");
  refreshAllCmsRenderers();
  showToast(`Model "${bike.name}" deleted.`);
}

// --- CMS OBJECTION REBUTTALS ---
function renderCmsRebuttalsList(query = "") {
  const tbody = document.getElementById("cms-rebuttals-table-body");
  if (!tbody) return;

  const countBadge = document.getElementById("cms-stat-total-rebuttals");
  if (countBadge) countBadge.textContent = String(OBJECTION_REBUTTALS.length);

  const q = (query || "").toLowerCase().trim();
  const filtered = OBJECTION_REBUTTALS.filter(r => {
    if (!q) return true;
    return r.topic.toLowerCase().includes(q) || r.rebuttal.toLowerCase().includes(q) || (r.id && r.id.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 18px;">No objection rebuttals found matching "${escapeHtml(query)}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((r, idx) => `
    <tr>
      <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
      <td>
        <span style="font-weight: 700; color: var(--accent-gold); font-size: 13px;">${escapeHtml(r.topic)}</span>
        <div style="font-size: 10px; color: var(--text-muted); font-family: monospace;">${escapeHtml(r.id || '')}</div>
      </td>
      <td style="font-size: 12px; color: var(--text-main); line-height: 1.4;">${escapeHtml(r.rebuttal)}</td>
      <td style="text-align: right;">
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px;">
          <button class="mini-action-btn edit-btn" onclick="openCmsRebuttalEditModal('${escapeHtml(r.id)}')" title="Edit Rebuttal">
            ${EDIT_SVG}
          </button>
          <button class="mini-action-btn delete-btn" onclick="deleteCmsRebuttal('${escapeHtml(r.id)}')" title="Delete Rebuttal">
            ${TRASH_SVG}
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function openCmsAddRebuttalModal() {
  document.getElementById("cms-rebuttal-modal-title").textContent = "+ Add New Objection Rebuttal";
  document.getElementById("cms-edit-rebuttal-original-id").value = "";
  document.getElementById("cms-rebuttal-id").value = `rebuttal_${Date.now()}`;
  document.getElementById("cms-rebuttal-topic").value = "";
  document.getElementById("cms-rebuttal-text").value = "";
  document.getElementById("cms-rebuttal-modal").style.display = "flex";
}

function openCmsRebuttalEditModal(rebuttalId) {
  const r = OBJECTION_REBUTTALS.find(item => item.id === rebuttalId);
  if (!r) return;

  document.getElementById("cms-rebuttal-modal-title").textContent = `Edit Rebuttal: ${r.topic}`;
  document.getElementById("cms-edit-rebuttal-original-id").value = r.id;
  document.getElementById("cms-rebuttal-id").value = r.id || "";
  document.getElementById("cms-rebuttal-topic").value = r.topic || "";
  document.getElementById("cms-rebuttal-text").value = r.rebuttal || "";
  document.getElementById("cms-rebuttal-modal").style.display = "flex";
}

function closeCmsRebuttalModal() {
  const modal = document.getElementById("cms-rebuttal-modal");
  if (modal) modal.style.display = "none";
}

function saveCmsRebuttalEdit() {
  const origId = document.getElementById("cms-edit-rebuttal-original-id").value;
  const id = document.getElementById("cms-rebuttal-id").value.trim().toLowerCase().replace(/\s+/g, "_");
  const topic = document.getElementById("cms-rebuttal-topic").value.trim();
  const rebuttal = document.getElementById("cms-rebuttal-text").value.trim();

  if (!topic || !rebuttal) {
    showToast("⚠️ Topic and Rebuttal text are required!");
    return;
  }

  const record = {
    id: id || `rebuttal_${Date.now()}`,
    topic: topic,
    rebuttal: rebuttal
  };

  if (origId) {
    const idx = OBJECTION_REBUTTALS.findIndex(r => r.id === origId);
    if (idx !== -1) {
      OBJECTION_REBUTTALS[idx] = record;
    } else {
      OBJECTION_REBUTTALS.push(record);
    }
  } else {
    const existing = OBJECTION_REBUTTALS.findIndex(r => r.id === id);
    if (existing !== -1) {
      OBJECTION_REBUTTALS[existing] = record;
    } else {
      OBJECTION_REBUTTALS.push(record);
    }
  }

  localStorage.setItem("re_cms_objections", JSON.stringify(OBJECTION_REBUTTALS));
  if (typeof sbSaveCmsKey === "function") {
    sbSaveCmsKey("cms_objections", OBJECTION_REBUTTALS).catch(e => console.error("Cloud save error:", e));
  }

  closeCmsRebuttalModal();
  renderCmsRebuttalsList(document.getElementById("cms-rebuttal-search")?.value || "");
  refreshAllCmsRenderers();
  showToast(`Objection rebuttal "${topic}" saved & synced!`);
}

function deleteCmsRebuttal(rebuttalId) {
  const r = OBJECTION_REBUTTALS.find(item => item.id === rebuttalId);
  if (!r) return;

  if (!confirm(`Are you sure you want to delete rebuttal "${r.topic}"?`)) return;

  OBJECTION_REBUTTALS = OBJECTION_REBUTTALS.filter(item => item.id !== rebuttalId);
  localStorage.setItem("re_cms_objections", JSON.stringify(OBJECTION_REBUTTALS));
  if (typeof sbSaveCmsKey === "function") {
    sbSaveCmsKey("cms_objections", OBJECTION_REBUTTALS).catch(e => console.error("Cloud delete error:", e));
  }

  renderCmsRebuttalsList(document.getElementById("cms-rebuttal-search")?.value || "");
  refreshAllCmsRenderers();
  showToast(`Objection rebuttal "${r.topic}" deleted.`);
}

async function syncAllCmsToSupabase() {
  if (typeof sbPushAllCmsData !== "function") {
    showToast("Supabase client is not available.");
    return;
  }

  showToast("Merging & uploading all CMS data to Supabase...");
  const res = await sbPushAllCmsData(CALL_SCRIPTS, MODEL_PITCHES, BIKE_SPECS, OBJECTION_REBUTTALS);
  if (res && res.success) {
    showToast(res.message || "All CMS data merged & saved to Supabase!");
  } else {
    showToast(res ? res.message : "Failed to push CMS data to Supabase.");
  }
}

function resetCmsToDefaults() {
  if (!confirm("Are you sure you want to reset all CMS content (Scripts, Bike Models & Prices, Objection Rebuttals) back to factory default?")) return;

  CALL_SCRIPTS = JSON.parse(JSON.stringify(DEFAULT_CALL_SCRIPTS));
  MODEL_PITCHES = JSON.parse(JSON.stringify(DEFAULT_MODEL_PITCHES));
  BIKE_SPECS = JSON.parse(JSON.stringify(DEFAULT_BIKE_SPECS));
  OBJECTION_REBUTTALS = JSON.parse(JSON.stringify(DEFAULT_OBJECTION_REBUTTALS));

  localStorage.removeItem("re_cms_scripts");
  localStorage.removeItem("re_cms_pitches");
  localStorage.removeItem("re_cms_bikes");
  localStorage.removeItem("re_cms_objections");

  if (typeof sbSaveCmsKey === "function") {
    sbSaveCmsKey("cms_scripts", CALL_SCRIPTS);
    sbSaveCmsKey("cms_pitches", MODEL_PITCHES);
    sbSaveCmsKey("cms_bikes", BIKE_SPECS);
    sbSaveCmsKey("cms_objections", OBJECTION_REBUTTALS);
  }

  refreshAllCmsRenderers();
  showToast("CMS content reset to default successfully!");
}

function handleGlobalUserLoginToggle(checked) {
  setGlobalUserLogin(checked);
  const pill = document.getElementById("global-user-status-pill");
  const statGlobal = document.getElementById("stat-global-state");

  if (pill) {
    pill.textContent = checked ? "ENABLED" : "RESTRICTED";
    pill.className = `badge-status-pill ${checked ? 'active' : 'disabled'}`;
  }
  if (statGlobal) {
    statGlobal.textContent = checked ? "OPEN" : "RESTRICTED";
    statGlobal.className = `stat-num ${checked ? 'stat-green' : 'stat-red'}`;
  }

  showToast(checked ? "🟢 Global User Access: OPEN (All active accounts permitted)" : "🔒 Global User Access: RESTRICTED (Selective user permission active)");
  renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
}

let visiblePasswordMap = {};

const EDIT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-svg-icon edit-icon"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`;

const TRASH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-svg-icon trash-icon"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`;

function toggleRowPasswordVisibility(userId) {
  visiblePasswordMap[userId] = !visiblePasswordMap[userId];
  renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderUserManagementTable(searchQuery = "") {
  const users = getUsersList();
  const globalEnabled = isGlobalUserLoginEnabled();

  // Sync global toggle input
  const globalToggle = document.getElementById("toggle-global-user-access");
  const pill = document.getElementById("global-user-status-pill");
  const statGlobal = document.getElementById("stat-global-state");
  if (globalToggle) globalToggle.checked = globalEnabled;
  if (pill) {
    pill.textContent = globalEnabled ? "ENABLED" : "RESTRICTED";
    pill.className = `badge-status-pill ${globalEnabled ? 'active' : 'disabled'}`;
  }
  if (statGlobal) {
    statGlobal.textContent = globalEnabled ? "OPEN" : "RESTRICTED";
    statGlobal.className = `stat-num ${globalEnabled ? 'stat-green' : 'stat-red'}`;
  }

  // Update stats
  const total = users.length;
  const activeCount = users.filter(u => u.status === "active").length;
  const disabledCount = users.filter(u => u.status === "disabled").length;

  const statTotal = document.getElementById("stat-total-users");
  const statActive = document.getElementById("stat-active-users");
  const statDisabled = document.getElementById("stat-disabled-users");
  const badgeTotal = document.getElementById("badge-total-users");

  if (statTotal) statTotal.textContent = total;
  if (statActive) statActive.textContent = activeCount;
  if (statDisabled) statDisabled.textContent = disabledCount;
  if (badgeTotal) badgeTotal.textContent = total;

  // Filter users
  let filtered = users;
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = users.filter(u => u.username.toLowerCase().includes(q) || (u.name && u.name.toLowerCase().includes(q)));
  }

  const tbody = document.getElementById("user-mgmt-table-body");
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 18px;">No user accounts found matching "${escapeHtml(searchQuery)}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((u, idx) => {
    const isActive = u.status === "active";
    const isPassVisible = !!visiblePasswordMap[u.id];
    const displayPass = isPassVisible ? escapeHtml(u.password) : "••••••••";

    return `
      <tr>
        <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
        <td>
          <span style="font-weight: 700; color: #38bdf8; font-family: monospace;">${escapeHtml(u.username)}</span>
        </td>
        <td>
          <span style="font-weight: 500;">${escapeHtml(u.name || '-')}</span>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="user-pass-display">${displayPass}</span>
            <button class="mini-action-btn" onclick="toggleRowPasswordVisibility('${escapeHtml(u.id)}')" title="Toggle password view" style="display: inline-flex; align-items: center; justify-content: center; padding: 3px 5px;">
              ${isPassVisible ? EYE_CLOSED_SVG : EYE_OPEN_SVG}
            </button>
          </div>
        </td>
        <td>
          <button class="user-status-toggle-btn ${isActive ? 'status-active' : 'status-disabled'}" onclick="toggleUserStatus('${escapeHtml(u.id)}')" title="Click to grant/revoke login permission">
            <span>${isActive ? '🟢 Permitted' : '🔴 Blocked'}</span>
          </button>
        </td>
        <td style="text-align: right;">
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px;">
            <button class="mini-action-btn edit-btn" onclick="openEditUserModal('${escapeHtml(u.id)}')" title="Edit account details">
              ${EDIT_SVG}
            </button>
            <button class="mini-action-btn delete-btn" onclick="deleteUserAccount('${escapeHtml(u.id)}')" title="Delete account">
              ${TRASH_SVG}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function toggleUserStatus(userId) {
  const users = getUsersList();
  const user = users.find(u => u.id === userId);
  if (!user) return;

  user.status = user.status === "active" ? "disabled" : "active";
  saveUsersList(users);

  if (typeof sbToggleUserStatus === "function") {
    sbToggleUserStatus(userId, user.status).catch(() => {});
  }

  showToast(`${user.status === 'active' ? '🟢 Permitted' : '🔴 Blocked'}: Login status updated for "${user.username}"`);
  renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
}

function grantAllUsersAccess() {
  const users = getUsersList();
  users.forEach(u => u.status = "active");
  saveUsersList(users);

  if (typeof sbBatchUpdateUsersStatus === "function") {
    sbBatchUpdateUsersStatus("active").catch(() => {});
  }

  showToast("🟢 Login permission GRANTED to all user accounts!");
  renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
}

function revokeAllUsersAccess() {
  const users = getUsersList();
  users.forEach(u => u.status = "disabled");
  saveUsersList(users);

  if (typeof sbBatchUpdateUsersStatus === "function") {
    sbBatchUpdateUsersStatus("disabled").catch(() => {});
  }

  showToast("🔴 Login permission REVOKED for all user accounts!");
  renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
}

function openAddUserModal() {
  const modal = document.getElementById("user-edit-modal");
  if (!modal) return;

  document.getElementById("user-edit-modal-title").textContent = "Add New User Account";
  document.getElementById("edit-user-id").value = "";
  document.getElementById("edit-user-username").value = "";
  document.getElementById("edit-user-name").value = "";
  document.getElementById("edit-user-password").value = "";
  if (document.getElementById("edit-user-status")) {
    document.getElementById("edit-user-status").value = "active";
  }

  modal.style.display = "flex";
}

function openEditUserModal(userId) {
  const users = getUsersList();
  const user = users.find(u => u.id === userId);
  if (!user) {
    showToast("⚠️ User not found!");
    return;
  }

  const modal = document.getElementById("user-edit-modal");
  if (!modal) return;

  document.getElementById("user-edit-modal-title").textContent = `Edit User: ${user.username}`;
  document.getElementById("edit-user-id").value = user.id;
  document.getElementById("edit-user-username").value = user.username;
  document.getElementById("edit-user-name").value = user.name || "";
  document.getElementById("edit-user-password").value = user.password;
  if (document.getElementById("edit-user-status")) {
    document.getElementById("edit-user-status").value = user.status || "active";
  }

  modal.style.display = "flex";
}

function closeUserEditModal() {
  const modal = document.getElementById("user-edit-modal");
  if (modal) modal.style.display = "none";
}

function saveUserEditForm() {
  const idEl = document.getElementById("edit-user-id");
  const userEl = document.getElementById("edit-user-username");
  const nameEl = document.getElementById("edit-user-name");
  const passEl = document.getElementById("edit-user-password");
  const statusEl = document.getElementById("edit-user-status");

  const userId = idEl ? idEl.value.trim() : "";
  const username = userEl ? userEl.value.trim() : "";
  const name = nameEl ? nameEl.value.trim() : "";
  const password = passEl ? passEl.value.trim() : "";
  const status = statusEl ? statusEl.value : "active";

  if (!username || !password) {
    showToast("⚠️ Username and Password are required!");
    return;
  }

  const users = getUsersList();

  if (userId) {
    // Edit existing user
    let userIndex = users.findIndex(u => String(u.id) === String(userId));
    if (userIndex === -1) {
      userIndex = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
    }

    if (userIndex === -1) {
      showToast("⚠️ User record not found!");
      return;
    }

    // Check username collision with another user (different ID)
    const existing = users.find(u => u.username.toLowerCase() === username.toLowerCase() && String(u.id) !== String(userId) && users.indexOf(u) !== userIndex);
    if (existing) {
      showToast(`⚠️ Username "${username}" is already taken by another account!`);
      return;
    }

    users[userIndex].username = username;
    users[userIndex].name = name || username;
    users[userIndex].password = password;
    users[userIndex].status = status;
    saveUsersList(users);

    if (typeof sbUpsertUser === "function") {
      sbUpsertUser(users[userIndex]).catch(() => {});
    }

    showToast(`✅ Saved changes for account: ${username}`);
  } else {
    // Add new user
    const existing = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existing) {
      showToast(`⚠️ Username "${username}" already exists!`);
      return;
    }

    const newUser = {
      id: "usr_" + Date.now(),
      username: username,
      name: name || username,
      password: password,
      status: status,
      createdAt: new Date().toISOString().split("T")[0]
    };
    users.push(newUser);
    saveUsersList(users);

    if (typeof sbUpsertUser === "function") {
      sbUpsertUser(newUser).catch(() => {});
    }

    showToast(`✅ Created new user account: ${username}`);
  }

  closeUserEditModal();
  renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
}

function deleteUserAccount(userId) {
  const users = getUsersList();
  const user = users.find(u => u.id === userId);
  if (!user) return;

  if (!confirm(`Are you sure you want to permanently delete user account "${user.username}"?`)) {
    return;
  }

  const updated = users.filter(u => u.id !== userId);
  saveUsersList(updated);

  if (typeof sbDeleteUser === "function") {
    sbDeleteUser(userId).catch(() => {});
  }

  showToast(`User account "${user.username}" removed.`);
  renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
}

function confirmResetUsersToDefault() {
  if (!confirm("⚠️ Reset all 10 user IDs and passwords back to factory default credentials? Any custom users or edits will be restored.")) {
    return;
  }

  saveUsersList(DEFAULT_SYSTEM_USERS);
  setGlobalUserLogin(true);
  showToast("🔄 All 10 user accounts restored to defaults!");
  renderUserManagementTable();
}

function copyAllUserCredentials() {
  const users = getUsersList();
  const text = [
    "==================================================",
    "  RECENTRAL MUSIC PANEL - USER CREDENTIALS (10 IDs) ",
    "==================================================",
    ...users.map((u, i) => `${i + 1}. Username: ${u.username.padEnd(8)} | Password: ${u.password.padEnd(10)} | Name: ${u.name} | Status: ${u.status.toUpperCase()}`),
    "==================================================",
    "Admin Login: Spellman / Anonymous099m"
  ].join("\n");

  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 All 10 user credentials copied to clipboard!");
  }).catch(() => {
    showToast("⚠️ Could not access clipboard. Please copy manually.");
  });
}

function toggleEmergencyView(showEmergency) {
  const loginView = document.getElementById("vault-login-view");
  const emergencyView = document.getElementById("vault-emergency-view");
  if (loginView && emergencyView) {
    loginView.style.display = showEmergency ? "none" : "block";
    emergencyView.style.display = showEmergency ? "block" : "none";
  }
}

const EYE_OPEN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;

const EYE_CLOSED_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;

function togglePasswordVisibility(inputId, btnEl) {
  const inputEl = document.getElementById(inputId);
  if (!inputEl) return;
  if (inputEl.type === "password") {
    inputEl.type = "text";
    if (btnEl) btnEl.innerHTML = EYE_CLOSED_SVG;
  } else {
    inputEl.type = "password";
    if (btnEl) btnEl.innerHTML = EYE_OPEN_SVG;
  }
}

function executeEmergencyRecovery() {
  const keyInput = document.getElementById("vault-emergency-key").value.trim();
  const newPassInput = document.getElementById("vault-emergency-newpass").value.trim();

  if (!keyInput) {
    showToast("⚠️ Please enter the Master Recovery Code!");
    return;
  }

  if (!MASTER_RECOVERY_CODES.includes(keyInput)) {
    showToast("❌ INVALID MASTER CODE: Emergency Recovery Denied!");
    return;
  }

  const resetPass = newPassInput || "Anonymous099m";
  localStorage.setItem("re_vault_user", "Spellman");
  localStorage.setItem("re_vault_pass", resetPass);

  vaultState.isUnlocked = true;
  vaultState.authRole = "admin";
  vaultState.activeUser = { name: "System Administrator", username: "Spellman" };
  showToast(`🚨 EMERGENCY ACCESS GRANTED! Password Reset to: ${resetPass}`);

  document.getElementById("vault-login-view").style.display = "none";
  document.getElementById("vault-emergency-view").style.display = "none";
  document.getElementById("vault-player-view").style.display = "block";
  
  // Setup Admin UI
  const rolePill = document.getElementById("hub-role-badge");
  const nameEl = document.getElementById("hub-user-display-name");
  const subnav = document.getElementById("admin-hub-subnav");
  const modalTitle = document.getElementById("music-modal-title");

  if (rolePill) { rolePill.textContent = "ADMIN"; rolePill.className = "hub-role-pill admin"; }
  if (nameEl) nameEl.textContent = "Spellman";
  if (subnav) subnav.style.display = "flex";
  if (modalTitle) modalTitle.textContent = "Central Admin Music & User Control";

  switchAdminSubTab("player");
  renderVaultPlaylist();
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
  syncAdminCredsToServer(newUser, newPass);

  if (typeof sbSaveAdminCredentials === "function") {
    sbSaveAdminCredentials(newUser, newPass).catch(() => {});
  }

  showToast("✅ Admin Credentials Updated Successfully!");
  document.getElementById("new-vault-userid").value = "";
  document.getElementById("new-vault-password").value = "";
}

// ==============================================================================
// SUPABASE CLOUD DATABASE TAB HANDLERS & SCHEMA EXPORTER
// ==============================================================================

const SUPABASE_SCHEMA_SQL_RAW = `-- ==============================================================================
-- RECENTRAL - SUPABASE DATABASE SCHEMA
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.admin_config (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    username TEXT NOT NULL DEFAULT 'Spellman',
    password TEXT NOT NULL DEFAULT 'Anonymous099m',
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.activity_logs (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public read-write for users" ON public.users;
    CREATE POLICY "Allow public read-write for users" ON public.users FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow public read-write for system_settings" ON public.system_settings;
    CREATE POLICY "Allow public read-write for system_settings" ON public.system_settings FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow public read-write for admin_config" ON public.admin_config;
    CREATE POLICY "Allow public read-write for admin_config" ON public.admin_config FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow public read-write for activity_logs" ON public.activity_logs;
    CREATE POLICY "Allow public read-write for activity_logs" ON public.activity_logs FOR ALL USING (true) WITH CHECK (true);
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_config;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

-- Seed Default 10 Users
INSERT INTO public.users (id, username, password, name, status, created_at)
VALUES
    ('usr_1', 'user1', 'User@1234', 'Rahul Sharma', 'active', NOW()),
    ('usr_2', 'user2', 'User@2345', 'Priya Patel', 'active', NOW()),
    ('usr_3', 'user3', 'User@3456', 'Amit Kumar', 'active', NOW()),
    ('usr_4', 'user4', 'User@4567', 'Sneha Roy', 'active', NOW()),
    ('usr_5', 'user5', 'User@5678', 'Vikram Singh', 'active', NOW()),
    ('usr_6', 'user6', 'User@6789', 'Ananya Das', 'active', NOW()),
    ('usr_7', 'user7', 'User@7890', 'Rohan Gupta', 'active', NOW()),
    ('usr_8', 'user8', 'User@8901', 'Pooja Verma', 'active', NOW()),
    ('usr_9', 'user9', 'User@9012', 'Karan Malhotra', 'active', NOW()),
    ('usr_10', 'user10', 'User@0123', 'Neha Sen', 'active', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.system_settings (key, value, updated_at)
VALUES ('global_user_login', 'true'::jsonb, NOW())
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.admin_config (id, username, password, updated_at)
VALUES ('primary', 'Spellman', 'Anonymous099m', NOW())
ON CONFLICT (id) DO NOTHING;`;

function initSupabaseTabUI() {
  const config = typeof getSupabaseConfig === "function" ? getSupabaseConfig() : { url: "", anonKey: "" };
  const urlInput = document.getElementById("input-supabase-url");
  const keyInput = document.getElementById("input-supabase-key");

  if (urlInput) urlInput.value = config.url || "";
  if (keyInput) keyInput.value = config.anonKey || "";

  if (typeof updateSupabaseStatusUI === "function") {
    updateSupabaseStatusUI();
  }

  renderSupabaseAuditLogs();
}

async function handleSaveSupabaseConfig() {
  const urlInput = document.getElementById("input-supabase-url");
  const keyInput = document.getElementById("input-supabase-key");

  const url = urlInput ? urlInput.value.trim() : "";
  const key = keyInput ? keyInput.value.trim() : "";

  if (!url || !key) {
    showToast("⚠️ Please enter both Supabase Project URL and Anon API Key!");
    return;
  }

  if (typeof saveSupabaseConfig === "function") {
    saveSupabaseConfig(url, key);
  }

  showToast("⏳ Testing connection to Supabase...");
  if (typeof testSupabaseConnection === "function") {
    const res = await testSupabaseConnection();
    if (res.success) {
      showToast("🟢 " + res.message);
      renderSupabaseAuditLogs();
    } else {
      showToast("❌ " + res.message);
    }
  }
}

function handleClearSupabaseConfig() {
  if (typeof saveSupabaseConfig === "function") {
    saveSupabaseConfig("", "");
  }
  const urlInput = document.getElementById("input-supabase-url");
  const keyInput = document.getElementById("input-supabase-key");
  if (urlInput) urlInput.value = "";
  if (keyInput) keyInput.value = "";

  showToast("🟡 Supabase credentials cleared. Reverted to Local Storage mode.");
  renderSupabaseAuditLogs();
}

async function handleTestSupabaseConnection() {
  if (typeof testSupabaseConnection !== "function") return;
  showToast("⏳ Testing Supabase database connection...");
  const res = await testSupabaseConnection();
  if (res.success) {
    showToast("🟢 " + res.message);
  } else {
    showToast("❌ " + res.message);
  }
}

async function handleExportToSupabase() {
  if (typeof sbPushLocalDataToCloud !== "function") return;
  showToast("⏳ Exporting local users & settings to Supabase...");
  const users = getUsersList();
  const globalLogin = isGlobalUserLoginEnabled();
  const adminCreds = getVaultCredentials();
  const res = await sbPushLocalDataToCloud(users, globalLogin, adminCreds);
  if (res.success) {
    showToast(res.message);
    renderSupabaseAuditLogs();
  } else {
    showToast("❌ " + res.message);
  }
}

async function handleImportFromSupabase() {
  if (typeof sbPullCloudDataToLocal !== "function") return;
  showToast("⏳ Pulling users & settings from Supabase...");
  const res = await sbPullCloudDataToLocal();
  if (res.success) {
    showToast(res.message);
    renderUserManagementTable(document.getElementById("user-mgmt-search")?.value || "");
    renderSupabaseAuditLogs();
  } else {
    showToast("❌ " + res.message);
  }
}

function copySupabaseSqlSchema() {
  navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL_RAW).then(() => {
    showToast("📋 Supabase SQL Schema copied to clipboard!");
  }).catch(() => {
    showToast("⚠️ Could not access clipboard. Please copy from the Guide.");
  });
}

function openSupabaseGuideModal() {
  const modal = document.getElementById("supabase-guide-modal");
  const codeBox = document.getElementById("supabase-sql-code-box");
  if (codeBox) codeBox.textContent = SUPABASE_SCHEMA_SQL_RAW;
  if (modal) modal.style.display = "flex";
}

function closeSupabaseGuideModal() {
  const modal = document.getElementById("supabase-guide-modal");
  if (modal) modal.style.display = "none";
}

async function renderSupabaseAuditLogs() {
  const tbody = document.getElementById("supabase-audit-table-body");
  if (!tbody) return;

  if (typeof sbFetchActivityLogs !== "function") return;

  const logs = await sbFetchActivityLogs(15);
  if (!logs || logs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 12px;">No activity logs recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = logs.map(l => {
    const timeStr = l.created_at ? new Date(l.created_at).toLocaleTimeString() : "-";
    return `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
        <td style="padding: 4px; color: var(--text-muted); font-family: monospace;">${escapeHtml(timeStr)}</td>
        <td style="padding: 4px; font-weight: 700; color: #38bdf8;">${escapeHtml(l.username || 'System')}</td>
        <td style="padding: 4px; color: var(--accent-gold); font-size: 10px; font-family: monospace;">${escapeHtml(l.action || '-')}</td>
        <td style="padding: 4px; color: var(--text-main); font-size: 11px;">${escapeHtml(l.details || '-')}</td>
      </tr>
    `;
  }).join("");
}

function getFilteredVaultTracks() {
  let tracks = vaultState.allTracks;

  // Filter by category
  if (vaultState.activeCategory === "ALL") {
    // In Admin Fav tab, show curated tracks (excluding artist & Adfv tabs)
    tracks = tracks.filter(t => 
      t.category !== "ADFV" && !t.url.startsWith("music/Adfv/") &&
      t.category !== "TALHA_ANJUM" && !t.url.startsWith("music/Talha Anjum/") &&
      t.category !== "KK" && !t.url.startsWith("music/KK/") && 
      t.category !== "ATIF_ASLAM" && !t.url.startsWith("music/Atif Aslam/") && 
      t.category !== "ARIJIT_SINGH" && !t.url.startsWith("music/Arijit Singh/")
    );
  } else if (vaultState.activeCategory === "FAVORITES") {
    tracks = tracks.filter(t => vaultState.favorites.includes(t.id));
  } else if (vaultState.activeCategory === "ADFV") {
    tracks = tracks.filter(t => t.category === "ADFV" || t.url.startsWith("music/Adfv/"));
  } else if (vaultState.activeCategory === "TALHA_ANJUM") {
    tracks = tracks.filter(t => t.category === "TALHA_ANJUM" || t.url.startsWith("music/Talha Anjum/") || (t.artist && t.artist.toLowerCase().includes("talha")) || t.title.toLowerCase().includes("talha") || t.title.toLowerCase().includes("young stunners"));
  } else if (vaultState.activeCategory === "KK") {
    tracks = tracks.filter(t => t.category === "KK" || t.url.startsWith("music/KK/") || (t.artist && t.artist.toLowerCase().includes("kk")) || t.title.toLowerCase().includes("kk"));
  } else if (vaultState.activeCategory === "ATIF_ASLAM") {
    tracks = tracks.filter(t => t.category === "ATIF_ASLAM" || t.url.startsWith("music/Atif Aslam/") || (t.artist && t.artist.toLowerCase().includes("atif")) || t.title.toLowerCase().includes("atif"));
  } else if (vaultState.activeCategory === "ARIJIT_SINGH") {
    tracks = tracks.filter(t => t.category === "ARIJIT_SINGH" || t.url.startsWith("music/Arijit Singh/") || (t.artist && t.artist.toLowerCase().includes("arijit")) || t.title.toLowerCase().includes("arijit"));
  } else {
    tracks = tracks.filter(t => t.category === vaultState.activeCategory);
  }

  // Filter by search query
  if (vaultState.searchQuery && vaultState.searchQuery.trim()) {
    const q = vaultState.searchQuery.toLowerCase().trim();
    tracks = tracks.filter(t => t.title.toLowerCase().includes(q) || (t.artist && t.artist.toLowerCase().includes(q)) || (t.category && t.category.toLowerCase().includes(q)));
  }

  return tracks;
}

function renderVaultPlaylistTabs() {
  const container = document.getElementById("vault-playlist-tabs-container");
  if (!container) return;

  container.innerHTML = VAULT_CATEGORIES.map(cat => {
    let count = 0;
    if (cat.id === "ALL") count = vaultState.allTracks.filter(t => t.category !== "ADFV" && !t.url.startsWith("music/Adfv/") && t.category !== "TALHA_ANJUM" && !t.url.startsWith("music/Talha Anjum/") && t.category !== "KK" && !t.url.startsWith("music/KK/") && t.category !== "ATIF_ASLAM" && !t.url.startsWith("music/Atif Aslam/") && t.category !== "ARIJIT_SINGH" && !t.url.startsWith("music/Arijit Singh/")).length;
    else if (cat.id === "FAVORITES") count = vaultState.favorites.length;
    else if (cat.id === "ADFV") count = vaultState.allTracks.filter(t => t.category === "ADFV" || t.url.startsWith("music/Adfv/")).length;
    else if (cat.id === "TALHA_ANJUM") count = vaultState.allTracks.filter(t => t.category === "TALHA_ANJUM" || t.url.startsWith("music/Talha Anjum/") || (t.artist && t.artist.toLowerCase().includes("talha")) || t.title.toLowerCase().includes("talha") || t.title.toLowerCase().includes("young stunners")).length;
    else if (cat.id === "KK") count = vaultState.allTracks.filter(t => t.category === "KK" || t.url.startsWith("music/KK/") || (t.artist && t.artist.toLowerCase().includes("kk")) || t.title.toLowerCase().includes("kk")).length;
    else if (cat.id === "ATIF_ASLAM") count = vaultState.allTracks.filter(t => t.category === "ATIF_ASLAM" || t.url.startsWith("music/Atif Aslam/") || (t.artist && t.artist.toLowerCase().includes("atif")) || t.title.toLowerCase().includes("atif")).length;
    else if (cat.id === "ARIJIT_SINGH") count = vaultState.allTracks.filter(t => t.category === "ARIJIT_SINGH" || t.url.startsWith("music/Arijit Singh/") || (t.artist && t.artist.toLowerCase().includes("arijit")) || t.title.toLowerCase().includes("arijit")).length;
    else count = vaultState.allTracks.filter(t => t.category === cat.id).length;

    const isActive = cat.id === vaultState.activeCategory;
    return `
      <button class="playlist-tab-btn ${isActive ? 'active' : ''}" onclick="selectVaultCategory('${cat.id}')">
        <span>${cat.name}</span>
        <span class="tab-count">${count}</span>
      </button>
    `;
  }).join("");
}

function selectVaultCategory(catId) {
  vaultState.activeCategory = catId;
  renderVaultPlaylist();
}

function filterVaultTracks(query) {
  vaultState.searchQuery = query;
  renderVaultPlaylist();
}

function toggleTrackFavorite(trackId, event) {
  if (event) event.stopPropagation();
  const idx = vaultState.favorites.indexOf(trackId);
  if (idx > -1) {
    vaultState.favorites.splice(idx, 1);
  } else {
    vaultState.favorites.push(trackId);
  }
  localStorage.setItem("re_vault_favorites", JSON.stringify(vaultState.favorites));
  renderVaultPlaylist();
}

function renderVaultPlaylist() {
  renderVaultPlaylistTabs();
  const container = document.getElementById("vault-playlist-container");
  const countEl = document.getElementById("vault-track-count");
  const headingEl = document.getElementById("vault-playlist-heading");

  const tracks = getFilteredVaultTracks();
  if (countEl) countEl.textContent = tracks.length;

  const currentCatObj = VAULT_CATEGORIES.find(c => c.id === vaultState.activeCategory);
  if (headingEl && currentCatObj) {
    headingEl.textContent = `${currentCatObj.name}`;
  }

  if (!container) return;

  if (tracks.length === 0) {
    let emptyMsg = "No tracks found matching search.";
    if (vaultState.activeCategory === 'FAVORITES') {
      emptyMsg = "No favorites added yet. Click ⭐ next to any track to add it here!";
    } else if (vaultState.activeCategory === 'ADFV') {
      emptyMsg = "No songs in Adfv playlist yet. Drop .mp3 files into the music/Adfv/ folder to add tracks!";
    } else if (vaultState.activeCategory === 'TALHA_ANJUM') {
      emptyMsg = "No Talha Anjum songs in playlist yet. Drop .mp3 files into the music/Talha Anjum/ folder to add tracks!";
    } else if (vaultState.activeCategory === 'KK') {
      emptyMsg = "No KK songs in playlist yet. Drop .mp3 files into the music/KK/ folder to add tracks!";
    } else if (vaultState.activeCategory === 'ATIF_ASLAM') {
      emptyMsg = "No Atif Aslam songs in playlist yet. Drop .mp3 files into the music/Atif Aslam/ folder to add tracks!";
    } else if (vaultState.activeCategory === 'ARIJIT_SINGH') {
      emptyMsg = "No Arijit Singh songs in playlist yet. Drop .mp3 files into the music/Arijit Singh/ folder to add tracks!";
    }
    container.innerHTML = `<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 16px;">
      ${emptyMsg}
    </div>`;
    return;
  }

  container.innerHTML = tracks.map((track, idx) => {
    const isPlaying = vaultState.currentPlayingTrackId === track.id;
    const isFav = vaultState.favorites.includes(track.id);

    return `
      <div class="playlist-track-item ${isPlaying ? 'active-track' : ''}" onclick="playVaultTrackById(${track.id})">
        <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
          <span style="font-size: 12px; color: ${isPlaying ? '#00ff88' : 'var(--accent-gold)'}; font-weight: 700;">
            ${isPlaying ? '▶️' : (idx + 1) + '.'}
          </span>
          <span style="font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-main);">
            ${track.title}
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
          <label class="ui-bookmark" onclick="event.stopPropagation();" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
            <input type="checkbox" ${isFav ? 'checked' : ''} onchange="toggleTrackFavorite(${track.id}, event)">
            <div class="bookmark">
              <svg viewBox="0 0 32 32">
                <g>
                  <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                </g>
              </svg>
            </div>
          </label>
          <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); color: var(--text-muted);">
            MP3
          </span>
        </div>
      </div>
    `;
  }).join("");
}

function syncPlayPauseToggle(isPlaying) {
  const toggle = document.getElementById("vault-play-pause-toggle");
  if (toggle) toggle.checked = isPlaying;
}

let isInternalPlayerAction = false;
let isInternalVaultSliderActive = false;
let isInternalSeeking = false;
let seekTimeoutTimer = null;

function toggleVaultPlayPauseCheckbox(checkbox) {
  const audio = document.getElementById("vault-audio-player");
  if (!audio) return;

  if (!vaultState.currentPlayingTrackId) {
    const tracks = getFilteredVaultTracks();
    if (tracks.length > 0) {
      playVaultTrackById(tracks[0].id);
      return;
    }
  }

  isInternalPlayerAction = true;
  if (checkbox.checked) {
    audio.play().catch(e => console.log("Play error:", e));
  } else {
    audio.pause();
  }
  setTimeout(() => { isInternalPlayerAction = false; }, 300);
}

function setupMediaSessionInterception() {
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.metadata = null;
    } catch(e) {}

    const actions = [
      'play', 'pause', 'stop', 'previoustrack', 'nexttrack',
      'seekbackward', 'seekforward', 'seekto', 'skipad',
      'togglemicrophone', 'togglecamera', 'hangup'
    ];
    actions.forEach(action => {
      try {
        navigator.mediaSession.setActionHandler(action, () => {
          // Headset button / Earbud gesture / Bluetooth remote / laptop key detected!
          stopVaultAudio();
          showToast("🛑 Music stopped: Headset / earbuds / external device control detected!");
        });
      } catch(e) {}
    });
  }
}

function formatVaultTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function playVaultTrackById(trackId) {
  const track = vaultState.allTracks.find(t => t.id === trackId);
  if (!track) return;

  vaultState.currentPlayingTrackId = trackId;
  const audio = document.getElementById("vault-audio-player");
  const titleEl = document.getElementById("vault-track-title");

  if (titleEl) titleEl.textContent = `🎶 Playing: ${track.title}`;

  if (audio) {
    isInternalPlayerAction = true;
    isInternalVaultSliderActive = true;
    audio.src = track.url;
    audio.volume = vaultState.volume;
    setTimeout(() => {
      isInternalPlayerAction = false;
      isInternalVaultSliderActive = false;
    }, 300);

    audio.play().then(() => {
      syncPlayPauseToggle(true);
      setupMediaSessionInterception();
    }).catch(e => console.log("Audio playback error:", e));

    updateMusicIndicatorUI(true, track.title);

    audio.onseeking = () => {
      isInternalPlayerAction = true;
      isInternalSeeking = true;
    };

    audio.onseeked = () => {
      if (seekTimeoutTimer) clearTimeout(seekTimeoutTimer);
      seekTimeoutTimer = setTimeout(() => {
        isInternalPlayerAction = false;
        isInternalSeeking = false;
      }, 600);
    };

    audio.ontimeupdate = () => {
      // Invariant check: if volume was altered by headset/OS hardware knob, stop audio immediately
      if (!isInternalVaultSliderActive && Math.abs(audio.volume - vaultState.volume) > 0.005) {
        stopVaultAudio();
        showToast("🛑 Music stopped: Headset / hardware volume change detected!");
        return;
      }

      const curTimeEl = document.getElementById("vault-current-time");
      const durTimeEl = document.getElementById("vault-duration-time");
      const seekBar = document.getElementById("vault-seek-bar");

      if (!isUserSeeking) {
        if (curTimeEl) curTimeEl.textContent = formatVaultTime(audio.currentTime);
        if (durTimeEl && !isNaN(audio.duration) && audio.duration > 0) {
          durTimeEl.textContent = formatVaultTime(audio.duration);
        }
        if (seekBar && !isNaN(audio.duration) && audio.duration > 0) {
          seekBar.value = (audio.currentTime / audio.duration) * 100;
        }
      } else {
        // User is actively scrubbing: update current time display based on seek bar position
        if (seekBar && !isNaN(audio.duration) && audio.duration > 0) {
          const seekTime = (parseFloat(seekBar.value) / 100) * audio.duration;
          if (curTimeEl) curTimeEl.textContent = formatVaultTime(seekTime);
        }
      }
    };

    audio.onvolumechange = () => {
      if (!isInternalVaultSliderActive || !vaultState.isVaultModalOpen) {
        // Outside volume adjustment or device-level volume change intercepted!
        stopVaultAudio();
        showToast("🛑 Music stopped: External volume change detected from headset/earbuds/device!");
      }
    };

    audio.onpause = () => {
      if (isInternalPlayerAction || isInternalSeeking) {
        syncPlayPauseToggle(false);
        updateMusicIndicatorUI(false);
        return;
      }
      // Earbud single tap / bluetooth headset pause intercepted!
      stopVaultAudio();
      showToast("🛑 Music stopped: Earbud gesture / external pause detected!");
    };

    audio.onplay = () => {
      if (!isInternalPlayerAction && !isInternalSeeking && !vaultState.isVaultModalOpen) {
        // Earbud tap attempted to resume playback!
        stopVaultAudio();
        showToast("🛑 Action blocked: Earbud / external resume is restricted!");
        return;
      }
      syncPlayPauseToggle(true);
      updateMusicIndicatorUI(true, track.title);
    };

    audio.onended = () => {
      if (vaultState.isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNextVaultTrack();
      }
    };
  }

  renderVaultPlaylist();
}

let isUserSeeking = false;

function startVaultSeeking() {
  isUserSeeking = true;
}

function stopVaultSeeking(val) {
  isUserSeeking = false;
  if (val !== undefined && val !== null && val !== "") {
    applyVaultSeek(val);
  } else {
    const seekBar = document.getElementById("vault-seek-bar");
    if (seekBar) applyVaultSeek(seekBar.value);
  }
}

function onVaultSeekInput(val) {
  isUserSeeking = true;
  const audio = document.getElementById("vault-audio-player");
  const curTimeEl = document.getElementById("vault-current-time");
  if (audio && !isNaN(audio.duration) && audio.duration > 0) {
    const previewTime = (parseFloat(val) / 100) * audio.duration;
    if (curTimeEl) curTimeEl.textContent = formatVaultTime(previewTime);
  }
}

function onVaultSeekChange(val) {
  isUserSeeking = false;
  applyVaultSeek(val);
}

function seekVaultAudio(percent) {
  applyVaultSeek(percent);
}

function applyVaultSeek(percent) {
  const audio = document.getElementById("vault-audio-player");
  if (!audio || isNaN(audio.duration) || audio.duration <= 0) return;

  const numVal = parseFloat(percent);
  if (isNaN(numVal)) return;

  isInternalPlayerAction = true;
  isInternalSeeking = true;

  const targetTime = (numVal / 100) * audio.duration;
  audio.currentTime = targetTime;

  const curTimeEl = document.getElementById("vault-current-time");
  if (curTimeEl) curTimeEl.textContent = formatVaultTime(targetTime);

  if (seekTimeoutTimer) clearTimeout(seekTimeoutTimer);
  seekTimeoutTimer = setTimeout(() => {
    isInternalPlayerAction = false;
    isInternalSeeking = false;
  }, 1000);
}

function setVaultVolume(val) {
  if (!vaultState.isVaultModalOpen) {
    stopVaultAudio();
    showToast("⚠️ Volume can only be modified inside the Admin Vault!");
    return;
  }
  isInternalPlayerAction = true;
  isInternalVaultSliderActive = true;
  const audio = document.getElementById("vault-audio-player");
  const numVal = parseFloat(val);
  vaultState.volume = numVal;
  vaultState.isMuted = numVal === 0;
  if (audio) audio.volume = numVal;
  setTimeout(() => {
    isInternalPlayerAction = false;
    isInternalVaultSliderActive = false;
  }, 200);

  const percentEl = document.getElementById("vault-vol-percent");
  const iconEl = document.getElementById("vault-vol-icon");
  if (percentEl) percentEl.textContent = `${Math.round(numVal * 100)}%`;
  if (iconEl) {
    if (numVal === 0) iconEl.textContent = "🔇";
    else if (numVal < 0.4) iconEl.textContent = "🔈";
    else if (numVal < 0.75) iconEl.textContent = "🔉";
    else iconEl.textContent = "🔊";
  }
}

function toggleVaultMute() {
  if (!vaultState.isVaultModalOpen) {
    stopVaultAudio();
    return;
  }
  isInternalPlayerAction = true;
  const slider = document.getElementById("vault-volume-slider");
  if (vaultState.isMuted || vaultState.volume === 0) {
    const restoreVol = vaultState.previousVolume > 0 ? vaultState.previousVolume : 0.85;
    if (slider) slider.value = restoreVol;
    setVaultVolume(restoreVol);
  } else {
    vaultState.previousVolume = vaultState.volume;
    if (slider) slider.value = 0;
    setVaultVolume(0);
  }
  setTimeout(() => { isInternalPlayerAction = false; }, 300);
}

function toggleVaultPlayPause() {
  const audio = document.getElementById("vault-audio-player");
  if (!audio) return;

  if (!vaultState.currentPlayingTrackId) {
    const tracks = getFilteredVaultTracks();
    if (tracks.length > 0) {
      playVaultTrackById(tracks[0].id);
      return;
    }
  }

  isInternalPlayerAction = true;
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  setTimeout(() => { isInternalPlayerAction = false; }, 300);
}

function playNextVaultTrack() {
  const tracks = getFilteredVaultTracks();
  if (tracks.length === 0) return;

  isInternalPlayerAction = true;
  if (vaultState.isShuffle) {
    const randomIdx = Math.floor(Math.random() * tracks.length);
    playVaultTrackById(tracks[randomIdx].id);
    return;
  }

  const currentIdx = tracks.findIndex(t => t.id === vaultState.currentPlayingTrackId);
  const nextIdx = (currentIdx + 1) % tracks.length;
  playVaultTrackById(tracks[nextIdx].id);
}

function playPreviousVaultTrack() {
  const tracks = getFilteredVaultTracks();
  if (tracks.length === 0) return;

  isInternalPlayerAction = true;
  const currentIdx = tracks.findIndex(t => t.id === vaultState.currentPlayingTrackId);
  const prevIdx = (currentIdx - 1 + tracks.length) % tracks.length;
  playVaultTrackById(tracks[prevIdx].id);
}

function toggleVaultShuffle() {
  vaultState.isShuffle = !vaultState.isShuffle;
  const btn = document.getElementById("vault-shuffle-btn");
  if (btn) {
    if (vaultState.isShuffle) btn.classList.add("active-ctrl");
    else btn.classList.remove("active-ctrl");
  }
}

function toggleVaultRepeat() {
  vaultState.isRepeat = !vaultState.isRepeat;
  const btn = document.getElementById("vault-repeat-btn");
  if (btn) {
    if (vaultState.isRepeat) btn.classList.add("active-ctrl");
    else btn.classList.remove("active-ctrl");
  }
}

function stopVaultAudio() {
  isInternalPlayerAction = true;
  const audio = document.getElementById("vault-audio-player");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = 'none';
  }
  syncPlayPauseToggle(false);
  updateMusicIndicatorUI(false);
  setTimeout(() => { isInternalPlayerAction = false; }, 300);
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

// Global outside control interception: if user attempts volume/media keys from headsets, earbuds, or laptop
const EXTERNAL_MEDIA_KEYS = [
  "VolumeUp", "VolumeDown", "VolumeMute",
  "AudioVolumeUp", "AudioVolumeDown", "AudioVolumeMute",
  "MediaTrackNext", "MediaTrackPrevious", "MediaPlayPause", "MediaStop", "MediaSelect",
  "MediaRecord", "MediaRewind", "MediaFastForward", "HeadsetHook",
  "MicrophoneVolumeUp", "MicrophoneVolumeDown", "MicrophoneVolumeMute"
];

function handleExternalMediaKeyEvent(e) {
  if (EXTERNAL_MEDIA_KEYS.includes(e.key)) {
    const audio = document.getElementById("vault-audio-player");
    if (audio && !audio.paused) {
      stopVaultAudio();
      showToast("🛑 Music stopped: Headset / earbuds / device volume control intercepted!");
    }
  }
}

window.addEventListener("keydown", handleExternalMediaKeyEvent, { capture: true });
window.addEventListener("keyup", handleExternalMediaKeyEvent, { capture: true });

// --- EMERGENCY / PANIC KEYBOARD SHORTCUTS ---
// 1. Pressing 'Ctrl' key -> Stops music immediately
// 2. Pressing 'Esc' key -> Stops music immediately AND signs out / closes Admin/Music Panel immediately
function handlePanicKeyShortcuts(e) {
  // 1. Ctrl key: Stop music immediately
  if (e.key === "Control" || e.code === "ControlLeft" || e.code === "ControlRight") {
    const audio = document.getElementById("vault-audio-player");
    if (audio && (!audio.paused || audio.currentTime > 0)) {
      stopVaultAudio();
    }
  }

  // 2. Esc key: Stop music immediately AND sign out from Admin / Music Panel
  if (e.key === "Escape" || e.key === "Esc" || e.code === "Escape") {
    stopVaultAudio();

    if (typeof logoutMusicPanel === "function") {
      logoutMusicPanel();
    }

    if (typeof closeAdminVaultModal === "function") {
      closeAdminVaultModal();
    }

    const subModals = ["user-edit-modal", "cms-script-modal", "cms-bike-modal", "cms-rebuttal-modal"];
    subModals.forEach(id => {
      const m = document.getElementById(id);
      if (m) m.style.display = "none";
    });
  }
}

window.addEventListener("keydown", handlePanicKeyShortcuts, { capture: true });

// Listen for headset / earbuds / audio interface connect or disconnect
if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
  navigator.mediaDevices.addEventListener('devicechange', () => {
    const audio = document.getElementById("vault-audio-player");
    if (audio && !audio.paused) {
      stopVaultAudio();
      showToast("🛑 Music stopped: Audio headset / device connection change detected!");
    }
  });
}

// Page Preloader dismissal
function hidePagePreloader() {
  const preloader = document.getElementById("page-preloader");
  if (preloader && !preloader.classList.contains("fade-out")) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 650);
  }
}

window.addEventListener("load", () => {
  setTimeout(hidePagePreloader, 800);
});

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCmsData();
  initUserDatabase();
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
  renderShortcutsBar();
  initNotepad();
  updateSummaryColorOptions();
  updateSummaryPreview();

  // Safety fallback for preloader
  setTimeout(hidePagePreloader, 1800);
});

function updateAgentName(val) {
  currentState.agentName = (val || "").trim();
  try { localStorage.setItem("re_agent_name", currentState.agentName); } catch (e) {}
  renderCurrentScriptStep();
  updateSummaryPreview();
}

function updateCustomerName(val) {
  currentState.customerName = (val || "").trim();
  try { localStorage.setItem("re_customer_name", currentState.customerName); } catch (e) {}
  if (currentState.lopFields && (!currentState.lopFields.bookingName || currentState.lopFields.bookingName === "N/A")) {
    const fullCust = currentState.customerName ? `${currentState.customerTitle} ${currentState.customerName}`.trim() : "";
    if (fullCust) {
      currentState.lopFields.bookingName = fullCust;
      const lopInput = document.getElementById("lop-booking-name");
      if (lopInput) lopInput.value = fullCust;
    }
  }
  renderCurrentScriptStep();
  updateSummaryPreview();
}

function updateCustomerTitle(val) {
  currentState.customerTitle = val || "Mr.";
  try { localStorage.setItem("re_customer_title", currentState.customerTitle); } catch (e) {}
  renderCurrentScriptStep();
  updateSummaryPreview();
}

// Header inputs binding
function initHeaderInputs() {
  const agentInput = document.getElementById("input-agent-name");
  const titleSelect = document.getElementById("input-customer-title");
  const custInput = document.getElementById("input-customer-name");
  const bikeSelect = document.getElementById("header-bike-select");

  // Restore saved values from localStorage
  const savedAgent = localStorage.getItem("re_agent_name");
  const savedCustTitle = localStorage.getItem("re_customer_title");
  const savedCustName = localStorage.getItem("re_customer_name");

  if (savedAgent) {
    currentState.agentName = savedAgent;
    if (agentInput) agentInput.value = savedAgent;
  }
  if (savedCustTitle) {
    currentState.customerTitle = savedCustTitle;
    if (titleSelect) titleSelect.value = savedCustTitle;
  }
  if (savedCustName) {
    currentState.customerName = savedCustName;
    if (custInput) custInput.value = savedCustName;
  }

  if (agentInput) agentInput.addEventListener("input", (e) => { updateAgentName(e.target.value); });
  if (titleSelect) titleSelect.addEventListener("change", (e) => { updateCustomerTitle(e.target.value); });
  if (custInput) custInput.addEventListener("input", (e) => { updateCustomerName(e.target.value); });

  // Populate bike dropdown in header
  initBikeSelectors();
  if (bikeSelect) {
    bikeSelect.addEventListener("change", (e) => {
      const bike = BIKE_SPECS.find(b => b.name === e.target.value);
      if (bike) {
        currentState.selectedBike = bike;
        renderCurrentScriptStep();
        renderBikeDetails(bike);
        updateBikePillsActiveState(bike.id);
        updateSummaryColorOptions();
        updateSummaryPreview();
      }
    });
  }
}

function initBikeSelectors() {
  const bikeSelect = document.getElementById("header-bike-select");
  if (bikeSelect) {
    const currVal = currentState.selectedBike ? currentState.selectedBike.name : (BIKE_SPECS[0] ? BIKE_SPECS[0].name : "");
    bikeSelect.innerHTML = BIKE_SPECS.map(b => `<option value="${escapeHtml(b.name)}">${escapeHtml(b.name)}</option>`).join("");
    if (currVal && BIKE_SPECS.some(b => b.name === currVal)) {
      bikeSelect.value = currVal;
    }
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

  const steps = CALL_SCRIPTS[currentState.lang]?.steps || [];
  stepListEl.innerHTML = steps.map((step, idx) => {
    // If Step 5 (index 4) and isWithin45Days === true, disable Step 5!
    let isDisabled = (idx === 4 && currentState.isWithin45Days === true);

    // If on Steps 6..11 (indexes 5..10) and isPreBookAgreed === false, disable Steps 6,7,8,9,10,11!
    if (idx >= 5 && idx <= 10 && currentState.isPreBookAgreed === false) {
      isDisabled = true;
    }

    // If Step 8 (index 7) and isTestRideAgreed === false, disable Step 8 (Test Ride Confirmation)!
    if (idx === 7 && currentState.isTestRideAgreed === false) {
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

  const currentStep = CALL_SCRIPTS[currentState.lang]?.steps[currentState.currentStepIndex];
  if (!currentStep) return;

  if (tagEl) {
    tagEl.textContent = `STEP ${currentState.currentStepIndex + 1}: ${currentStep.title.toUpperCase()}`;
  }

  const custName = (currentState.customerName || "").trim();
  const custNameDisplay = custName !== "" 
    ? `${currentState.customerTitle} ${custName}` 
    : "<Customer Name>";

  const agentName = (currentState.agentName || "").trim();
  const agentNameDisplay = agentName !== "" 
    ? agentName 
    : "<Agent Name>";

  let rawText = currentStep.text || "";

  // Check if we need to embed model pitch snippet
  const bikePitch = (MODEL_PITCHES[currentState.selectedBike?.name] && MODEL_PITCHES[currentState.selectedBike.name][currentState.lang]) 
    ? MODEL_PITCHES[currentState.selectedBike.name][currentState.lang] 
    : (MODEL_PITCHES[currentState.selectedBike?.name]?.en || "");
  rawText = rawText
    .replace(/<\s*model\s*pitch\s*bengali\s*>|&lt;\s*model\s*pitch\s*bengali\s*&gt;/gi, MODEL_PITCHES[currentState.selectedBike?.name]?.bn || bikePitch)
    .replace(/<\s*model\s*pitch\s*hindi\s*>|&lt;\s*model\s*pitch\s*hindi\s*&gt;/gi, MODEL_PITCHES[currentState.selectedBike?.name]?.hi || bikePitch)
    .replace(/<\s*model\s*pitch\s*english\s*>|&lt;\s*model\s*pitch\s*english\s*&gt;/gi, MODEL_PITCHES[currentState.selectedBike?.name]?.en || bikePitch)
    .replace(/<\s*model\s*pitch\s*>|&lt;\s*model\s*pitch\s*&gt;/gi, bikePitch);

  // Replace placeholders with real values (bulletproof regex case-insensitive)
  let formattedText = rawText
    .replace(/<\s*agent\s*name\s*>|&lt;\s*agent\s*name\s*&gt;|{\s*agent\s*name\s*}|{\s*agent_name\s*}|<\s*agent\s*>/gi, `<mark>${escapeHtml(agentNameDisplay)}</mark>`)
    .replace(/<\s*customer\s*name\s*>|&lt;\s*customer\s*name\s*&gt;|{\s*customer\s*name\s*}|{\s*customer_name\s*}|<\s*customer\s*>/gi, `<mark>${escapeHtml(custNameDisplay)}</mark>`)
    .replace(/<\s*bike\s*model\s*>|&lt;\s*bike\s*model\s*&gt;|{\s*bike\s*model\s*}|{\s*bike_model\s*}|<\s*bike\s*>/gi, `<mark>${escapeHtml(currentState.selectedBike?.name || 'Motorcycle')}</mark>`)
    .replace(/<\s*test\s*ride\s*slot\s*>|&lt;\s*test\s*ride\s*slot\s*&gt;|{\s*test_ride_slot\s*}/gi, `<mark>${escapeHtml(currentState.testRideSlot || 'Today')}</mark>`);

  // If on Step 4 (Buying Time P1), append interactive Yes / No Decision Box!
  if (currentState.currentStepIndex === 3) {
    const isYes = currentState.isWithin45Days === true;
    const isNo = currentState.isWithin45Days === false;

    formattedText += `
      <div class="step-choice-box">
        <div class="step-choice-prompt">
          Customer comfortable buying within 45 days?
        </div>
        <div class="choice-btn-group">
          <button class="choice-btn choice-btn-yes ${isYes ? 'active-yes' : ''}" onclick="setBuyingTimeChoice(true)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>YES</span>
          </button>
          <button class="choice-btn choice-btn-no ${isNo ? 'active-no' : ''}" onclick="setBuyingTimeChoice(false)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>NO</span>
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
        <div class="step-choice-prompt">
          Customer agreed to Pre-Book motorcycle?
        </div>
        <div class="choice-btn-group">
          <button class="choice-btn choice-btn-yes ${isYes ? 'active-yes' : ''}" onclick="setPreBookChoice(true)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>YES</span>
          </button>
          <button class="choice-btn choice-btn-no ${isNo ? 'active-no' : ''}" onclick="setPreBookChoice(false)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>NO</span>
          </button>
        </div>
      </div>
    `;
  }

  // If on Step 7 (Test Ride Suggestion P2), append interactive Yes / No Decision Box!
  if (currentState.currentStepIndex === 6) {
    const isYes = currentState.isTestRideAgreed === true;
    const isNo = currentState.isTestRideAgreed === false;

    formattedText += `
      <div class="step-choice-box">
        <div class="step-choice-prompt">
          Cx interested in taking a Test Ride Within 30 Days
        </div>
        <div class="choice-btn-group">
          <button class="choice-btn choice-btn-yes ${isYes ? 'active-yes' : ''}" onclick="setTestRideChoice(true)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>YES</span>
          </button>
          <button class="choice-btn choice-btn-no ${isNo ? 'active-no' : ''}" onclick="setTestRideChoice(false)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>NO</span>
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
    selectDispo("LNP");
    showToast("Customer not pre-booking: Steps 6-11 (Dealer, Test Ride, Probing, Alt Num, Value Add) DISABLED!");
  }

  renderScriptStepList();
  renderCurrentScriptStep();
}

function setTestRideChoice(isYes) {
  currentState.isTestRideAgreed = isYes;

  if (isYes) {
    showToast("Customer interested in Test Ride: Step 8 (Test Ride Confirmation) ENABLED!");
  } else {
    currentState.testRideSlot = "Not Requested";
    showToast("Customer not interested in Test Ride: Step 8 (Test Ride Confirmation) DISABLED!");
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
  // If on Step 7 (index 6) and isTestRideAgreed is FALSE, skip Step 8 (index 7) -> jump to Step 9 (index 8)
  else if (currentState.currentStepIndex === 6 && currentState.isTestRideAgreed === false) {
    currentState.currentStepIndex = 8;
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
    // Skip disabled Step 8
    if (currentState.currentStepIndex === 7 && currentState.isTestRideAgreed === false) {
      currentState.currentStepIndex = 8;
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
    // If moving back to Step 8 (index 7) and it's disabled, jump back to Step 7 (index 6)
    else if (currentState.currentStepIndex === 7 && currentState.isTestRideAgreed === false) {
      currentState.currentStepIndex = 6;
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
  currentState.isTestRideAgreed = null;
  currentState.customerName = "";
  try { localStorage.removeItem("re_customer_name"); } catch (e) {}

  const custInput = document.getElementById("input-customer-name");
  if (custInput) custInput.value = "";

  const lopNameInput = document.getElementById("lop-booking-name");
  if (lopNameInput) lopNameInput.value = "";
  if (currentState.lopFields) currentState.lopFields.bookingName = "";

  renderScriptStepList();
  renderCurrentScriptStep();
  updateSummaryPreview();
  showToast("Script runner and customer name reset to Step 1 for next call!");
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
    updateSummaryColorOptions();
    updateSummaryPreview();
  }
}

function updateBikePillsActiveState(activeId) {
  document.querySelectorAll(".bike-pill").forEach(pill => {
    if (pill.getAttribute("data-id") === activeId) pill.classList.add("active");
    else pill.classList.remove("active");
  });
}

const VARIANTS_DATA = {
  "bullet-350": [
    { color: "Black Gold", price: "₹ 2,11,250", note: "Top Variant (Dual ABS & Blacked-out Engine)" },
    { color: "Standard Black", price: "₹ 1,93,273", note: "Dual Channel ABS" },
    { color: "Standard Maroon", price: "₹ 1,93,273", note: "Dual Channel ABS" },
    { color: "Battalion Black", price: "₹ 1,69,243", note: "Single Channel ABS (State-wise: ₹1,65,438 - ₹1,69,243)" },
    { color: "Military Black", price: "₹ 1,66,981", note: "Single Channel ABS" }
  ],
  "classic-350": [
    { color: "Signature White", price: "₹ 2,26,069", note: "Chrome & Premium Dual ABS" },
    { color: "Emerald", price: "₹ 2,26,069", note: "Chrome & Premium Finish" },
    { color: "Stealth Black", price: "₹ 2,21,179", note: "Matte Alloy Dual ABS" },
    { color: "Gun Grey", price: "₹ 2,21,179", note: "Alloy Dual ABS" },
    { color: "Gorkha Green", price: "₹ 2,12,370", note: "Dual Channel ABS" },
    { color: "Commando Sand", price: "₹ 2,12,370", note: "Dual Channel ABS" },
    { color: "Medallion Bronze", price: "₹ 2,00,633", note: "Dual Channel ABS" },
    { color: "Madras Red", price: "₹ 1,96,227", note: "Single Channel ABS" },
    { color: "Redditch Red", price: "₹ 1,88,934", note: "Single Channel ABS" }
  ],
  "hunter-350": [
    { color: "Tokyo Black", price: "₹ 1,72,445", note: "Rebel Series Dual ABS" },
    { color: "London Red", price: "₹ 1,72,445", note: "Rebel Series Dual ABS" },
    { color: "Rebel Blue", price: "₹ 1,72,445", note: "Rebel Series Dual ABS" },
    { color: "Moonshot White", price: "₹ 1,72,445", note: "Rebel Series Dual ABS" },
    { color: "Mumbai Yellow", price: "₹ 1,72,445", note: "Rebel Series Dual ABS" },
    { color: "Dapper Grey", price: "₹ 1,67,703", note: "Dapper Series" },
    { color: "Rio White", price: "₹ 1,67,703", note: "Dapper Series" },
    { color: "Graphite Grey", price: "₹ 1,67,703", note: "Dapper Series" },
    { color: "Tarmac Black", price: "₹ 1,52,235", note: "Base Series" },
    { color: "Factory Black", price: "₹ 1,37,640", note: "Factory Series Spokes" }
  ],
  "meteor-350": [
    { color: "Supernova Black", price: "₹ 2,23,077", note: "Top Cruiser Variant with Windscreen & Backrest" },
    { color: "Aurora Retro Green", price: "₹ 2,13,167", note: "Spoke Wheel Retro Edition" },
    { color: "Aurora Red", price: "₹ 2,13,167", note: "Spoke Wheel Retro Edition" },
    { color: "Stellar Marine Blue", price: "₹ 2,10,201", note: "Stellar Edition with Backrest" },
    { color: "Stellar Matt Grey", price: "₹ 2,10,201", note: "Stellar Edition with Backrest" },
    { color: "Fireball Orange", price: "₹ 2,01,590", note: "Base Cruiser Variant" },
    { color: "Fireball Grey", price: "₹ 2,01,590", note: "Base Cruiser Variant" }
  ],
  "goan-classic-350": [
    { color: "Rave Red", price: "₹ 2,30,012", note: "Tubeless Spoke Wheels Dual Tone" },
    { color: "Trip Teal", price: "₹ 2,30,012", note: "Tubeless Spoke Wheels Dual Tone" },
    { color: "Shack Black", price: "₹ 2,27,114", note: "Single Tone Bobber" },
    { color: "Purple Haze", price: "₹ 2,27,114", note: "Single Tone Bobber" }
  ],
  "scram-440": [
    { color: "Force Grey", price: "₹ 2,32,371", note: "Premium Dual ABS Scrambler" },
    { color: "Force Teal", price: "₹ 2,32,371", note: "Premium Dual ABS Scrambler" },
    { color: "Force Blue", price: "₹ 2,32,371", note: "Premium Dual ABS Scrambler" },
    { color: "Trail Green", price: "₹ 2,24,805", note: "Standard Trail Edition" },
    { color: "Trail Blue", price: "₹ 2,24,805", note: "Standard Trail Edition" }
  ],
  "himalayan-440": [
    { color: "Mustang Brown", price: "₹ 2,29,000", note: "Adventure Trail Edition" },
    { color: "Sela Black", price: "₹ 2,29,000", note: "Adventure Trail Edition" },
    { color: "Nelong White", price: "₹ 2,29,000", note: "Adventure Trail Edition" }
  ],
  "himalayan-450": [
    { color: "Mana Black", price: "₹ 3,39,564", note: "Kamet / Tubeless Cross-Spoke Wheel Edition" },
    { color: "Hanle Black", price: "₹ 3,22,081", note: "Premium Gold Wheel Finish" },
    { color: "Kamet White", price: "₹ 3,16,678", note: "Tubeless Rim Graphic Edition" },
    { color: "Slate Himalayan Salt", price: "₹ 3,12,353", note: "Pass Series Dual Tone" },
    { color: "Slate Poppy Blue", price: "₹ 3,12,353", note: "Pass Series Dual Tone" },
    { color: "Kaza Brown", price: "₹ 3,08,029", note: "Base Adventure Variant" }
  ],
  "guerrilla-450": [
    { color: "Brava Blue", price: "₹ 2,74,523", note: "Flash Top Variant (Tripper Dash)" },
    { color: "Shadow Ash", price: "₹ 2,69,119", note: "Dash Mid Variant" },
    { color: "Peix Bronze", price: "₹ 2,69,119", note: "Dash Mid Variant" },
    { color: "Smoke Silver", price: "₹ 2,69,119", note: "Dash Mid Variant" },
    { color: "Apex Black", price: "₹ 2,58,309", note: "Analogue Base Variant" },
    { color: "Apex Green", price: "₹ 2,58,309", note: "Analogue Base Variant" },
    { color: "Apex Red", price: "₹ 2,51,063", note: "Analogue Base Variant" },
    { color: "Twilight Blue", price: "₹ 2,51,063", note: "Analogue Base Variant" }
  ],
  "classic-650": [
    { color: "Black Chrome", price: "₹ 3,82,097", note: "Chrome Twin Top Variant" },
    { color: "Teal", price: "₹ 3,72,427", note: "Dual Tone Chrome Accent" },
    { color: "Bruntingthorpe Blue", price: "₹ 3,67,592", note: "Heritage Twin Variant" },
    { color: "Vallam Red", price: "₹ 3,67,592", note: "Heritage Twin Variant" }
  ],
  "interceptor-650": [
    { color: "Mark 2", price: "₹ 3,69,137", note: "Full Chrome Edition" },
    { color: "Black Ray", price: "₹ 3,57,987", note: "Custom Alloy Wheel Edition" },
    { color: "Sunset Strip", price: "₹ 3,46,836", note: "Dual Tone Spoke Wheels" },
    { color: "Canyon Red", price: "₹ 3,37,909", note: "Single Tone Standard" },
    { color: "Cali Green", price: "₹ 3,37,909", note: "Single Tone Standard" }
  ],
  "continental-gt-650": [
    { color: "Mr Clean", price: "₹ 3,87,667", note: "Full Chrome Cafe Racer Edition" },
    { color: "Apex Grey", price: "₹ 3,80,921", note: "Alloy Wheel Blacked-Out Engine" },
    { color: "British Racing Green", price: "₹ 3,58,427", note: "Standard Spoke Wheel" },
    { color: "Rocker Red", price: "₹ 3,58,427", note: "Standard Spoke Wheel" }
  ],
  "super-meteor-650": [
    { color: "Celestial Red", price: "₹ 4,39,960", note: "Celestial Tourer with Windshield & Deluxe Seat" },
    { color: "Celestial Blue", price: "₹ 4,39,960", note: "Celestial Tourer with Windshield & Deluxe Seat" },
    { color: "Interstellar Green", price: "₹ 4,22,972", note: "Interstellar Dual Tone Edition" },
    { color: "Interstellar Grey", price: "₹ 4,22,972", note: "Interstellar Dual Tone Edition" },
    { color: "Astral Black", price: "₹ 4,05,988", note: "Astral Single Tone Edition" }
  ],
  "shotgun-650": [
    { color: "Stencil White", price: "₹ 4,16,139", note: "Top Graphic Custom Bobber" },
    { color: "Drill Green", price: "₹ 4,12,947", note: "Mid Dual Tone Edition" },
    { color: "Plasma Blue", price: "₹ 4,12,947", note: "Mid Dual Tone Edition" },
    { color: "Sheet Metal Grey", price: "₹ 4,01,002", note: "Base Single Tone Edition" }
  ],
  "bear-650": [
    { color: "White Two Four Nine", price: "₹ 3,99,990", note: "Special Edition 249 Racing Graphics" },
    { color: "Golden Shadow", price: "₹ 3,91,598", note: "Premium Dual Tone Scrambler" },
    { color: "Petrol Green", price: "₹ 3,83,790", note: "Standard Dual Tone" },
    { color: "Wild Honey", price: "₹ 3,83,790", note: "Standard Dual Tone" },
    { color: "Boardwalk White", price: "₹ 3,78,208", note: "Base Scrambler 650" }
  ],
  "bullet-650": [
    { color: "Cannon Black", price: "₹ 3,64,856", note: "Peashooter Exhaust, Tripper Navigation & Wingman" },
    { color: "Battleship Blue", price: "₹ 3,64,856", note: "Peashooter Exhaust, Tripper Navigation & Wingman" }
  ]
};

function renderBikeDetails(bike) {
  const sheet = document.getElementById("bike-spec-detail-sheet");
  if (!sheet) return;

  const variants = VARIANTS_DATA[bike.id] || [];
  const variantsRowsHtml = variants.length > 0
    ? variants.map(v => `
        <tr>
          <td style="font-weight: 700; color: var(--text-main);">${v.color}</td>
          <td style="font-weight: 800; color: var(--text-main); font-size: 13.5px;">${v.price}</td>
          <td style="font-size: 12px; color: var(--text-muted);">${v.note}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding: 12px;">Variant pricing details coming soon</td></tr>`;

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

    <!-- Color Variants & Ex-Showroom Pricing Card -->
    <div class="card" style="margin-top: 16px;">
      <div class="card-title" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <span>Color Variants & Ex-Showroom Pricing</span>
        <span class="badge-gold">Ex-Showroom (Base / MRP)</span>
      </div>
      <div style="overflow-x: auto;">
        <table class="spec-table" style="width: 100%;">
          <thead>
            <tr style="background: rgba(0, 83, 219, 0.1);">
              <th style="padding: 10px 14px; text-align: left; width: 30%;">Color / Variant</th>
              <th style="padding: 10px 14px; text-align: left; width: 30%;">Ex-Showroom Price</th>
              <th style="padding: 10px 14px; text-align: left;">Features / Status</th>
            </tr>
          </thead>
          <tbody>
            ${variantsRowsHtml}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card" style="margin-top: 16px;">
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
        <div class="rebuttal-topic">${d.name}</div>
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
        Copy Dealer Address
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
  
  const stdContainer = document.getElementById("standard-summary-fields");
  const lopContainer = document.getElementById("lop-summary-fields");
  const sectionTitle = document.getElementById("summary-section-title");
  const stdBar = document.getElementById("std-shortcuts-bar");

  renderShortcutsBar();

  if (code === "LOP") {
    if (stdBar) stdBar.style.display = "none";
    if (stdContainer) stdContainer.style.display = "none";
    if (lopContainer) lopContainer.style.display = "grid";
    if (sectionTitle) sectionTitle.textContent = "Booked / Retail Checklist (LOP) Details";

    const modelName = currentState.selectedBike ? currentState.selectedBike.name : "";
    const custName = currentState.customerName ? `${currentState.customerTitle} ${currentState.customerName}`.trim() : "";

    if (!currentState.lopFields.model && modelName) {
      currentState.lopFields.model = modelName;
      const lopModelInput = document.getElementById("lop-model");
      if (lopModelInput) lopModelInput.value = modelName;
    }
    if (!currentState.lopFields.bookingName && custName) {
      currentState.lopFields.bookingName = custName;
      const lopNameInput = document.getElementById("lop-booking-name");
      if (lopNameInput) lopNameInput.value = custName;
    }
    if (!currentState.lopFields.purchaseDate) {
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
      currentState.lopFields.purchaseDate = formattedDate;
      const lopDateInput = document.getElementById("lop-purchase-date");
      if (lopDateInput) lopDateInput.value = formattedDate;
    }
  } else if (code === "CALBAK") {
    if (stdBar) stdBar.style.display = "flex";
    if (stdContainer) stdContainer.style.display = "none";
    if (lopContainer) lopContainer.style.display = "none";
    if (sectionTitle) sectionTitle.textContent = "Callback Checklist Details";
    currentState.summaryFields.keyEnquiry = "";
  } else if (code === "LNP") {
    if (stdBar) stdBar.style.display = "flex";
    if (stdContainer) stdContainer.style.display = "none";
    if (lopContainer) lopContainer.style.display = "none";
    if (sectionTitle) sectionTitle.textContent = "Lost - Not Purchasing (LNP) Checklist Details";
    currentState.summaryFields.keyEnquiry = "";
  } else {
    if (stdBar) stdBar.style.display = "flex";
    if (stdContainer) stdContainer.style.display = "grid";
    if (lopContainer) lopContainer.style.display = "none";
    if (sectionTitle) sectionTitle.textContent = "CRM Summary Details";
  }

  updateSummaryPreview();
}

function updateSummaryColorOptions() {
  const colorSelect = document.getElementById("summary-color");
  if (!colorSelect) return;

  const currentBike = currentState.selectedBike;
  const variants = (currentBike && VARIANTS_DATA[currentBike.id]) ? VARIANTS_DATA[currentBike.id] : [];

  let optionsHtml = `<option value="Default">Default</option>`;
  if (variants.length > 0) {
    optionsHtml += variants.map(v => `<option value="${v.color}">${v.color}</option>`).join("");
  }

  const prevVal = (currentState.summaryFields && currentState.summaryFields.color) ? currentState.summaryFields.color : "Default";
  colorSelect.innerHTML = optionsHtml;

  const hasPrevVal = Array.from(colorSelect.options).some(opt => opt.value === prevVal);
  if (hasPrevVal) {
    colorSelect.value = prevVal;
  } else {
    colorSelect.value = "Default";
    if (currentState.summaryFields) currentState.summaryFields.color = "Default";
  }
}

function updateSummaryField(key, value) {
  if (currentState.summaryFields) {
    currentState.summaryFields[key] = value;
  }
  updateSummaryPreview();
}

function updateLopField(key, value) {
  if (currentState.lopFields) {
    currentState.lopFields[key] = value;
  }
  updateSummaryPreview();
}

let lastFocusedSummaryField = null;
let lastFocusedLopField = "regNo";

function setLastFocusedSummaryField(fieldKey) {
  lastFocusedSummaryField = fieldKey;
}

function setLastFocusedLopField(fieldKey) {
  lastFocusedLopField = fieldKey;
}

function autoResetCheckbox(labelEl) {
  if (!labelEl) return;
  const input = labelEl.querySelector("input[type='checkbox']");
  if (input) {
    setTimeout(() => {
      input.checked = false;
    }, 600);
  }
}

function renderShortcutsBar() {
  const stdBar = document.getElementById("std-shortcuts-bar");
  if (!stdBar) return;

  if (currentState.selectedDispo === "CALBAK") {
    stdBar.innerHTML = `
      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('CX_WANT_CALLBACK', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Cx want callback</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('CX_VOICEMAIL', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Cx forwarded his call in voicemail</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('CX_NOT_RESPONDING', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Cx is not responding</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('CX_DISCONNECTED', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Cx Disconnected the call</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('CX_BUSY', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Cx is busy right now</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('CX_AI_ASSISTANT', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Cx call picked by Ai assistant</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('CX_NOT_DISCUSS', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Not discuss</span>
      </label>
    `;
  } else if (currentState.selectedDispo === "LNP") {
    stdBar.innerHTML = `
      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('LNP_NOT_WITHIN_45_DAYS', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">1. cx dont want to purchase the vehicle within 45 days</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('LNP_NOT_PURCHASING', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">2. cx dont want to purchase the vehicle</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('LNP_AFTER_2_3_MONTHS', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">3. cx want to purchase the vehicle after 2 to 3 month</span>
      </label>
    `;
  } else {
    stdBar.innerHTML = `
      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('NOT_INFORMED', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Not Informed</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('NOT_DISCUSS', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Not Discuss</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('BUYING_2_MONTHS', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Buying Within 2 Months</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('EXCHANGE', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Exchange</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('ON_ROAD_PRICE', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">On Road Price</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('FINANCE_DETAILS', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Finance Details</span>
      </label>

      <label class="checkbox-wrapper" onclick="applyQuickFieldShortcut('BUYING_3_MONTHS', this, event)">
        <input type="checkbox">
        <div class="checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="label">Buying Within 3 Months</span>
      </label>
    `;
  }
}

function applyLopFieldShortcut(val, labelEl, event) {
  if (event && event.target && event.target.tagName === 'INPUT') return;
  autoResetCheckbox(labelEl);
  const targetField = lastFocusedLopField || "regNo";
  const lopElemMap = {
    model: "lop-model",
    purchaseDate: "lop-purchase-date",
    dealership: "lop-dealership",
    bookingName: "lop-booking-name",
    bookingMobile: "lop-booking-mobile",
    regNo: "lop-reg-no",
    chassisNo: "lop-chassis-no",
    engineNo: "lop-engine-no",
    altNum: "lop-alt-num"
  };

  const elemId = lopElemMap[targetField];
  const elem = document.getElementById(elemId);

  if (targetField && val) {
    currentState.lopFields[targetField] = val;
    if (elem) elem.value = val;
  }

  updateSummaryPreview();
}

function applyQuickFieldShortcut(type, labelEl, event) {
  if (event && event.target && event.target.tagName === 'INPUT') return;
  autoResetCheckbox(labelEl);
  let val = "";
  let defaultTarget = "";

  switch(type) {
    case 'NOT_INFORMED':
    case 'NOT_APPLICABLE':
      val = "Not Informed";
      defaultTarget = "buyingTime";
      break;
    case 'NOT_DISCUSS':
    case 'NOT_ANSWER':
      val = "Not Discuss";
      defaultTarget = "buyingTime";
      break;
    case 'CX_NOT_DISCUSS':
    case 'CX_NOT_ANSWER':
      val = "Not discuss";
      defaultTarget = "keyEnquiry";
      break;
    case 'BUYING_2_MONTHS':
      val = "Buying within 2 Months";
      defaultTarget = "buyingTime";
      break;
    case 'BUYING_3_MONTHS':
      val = "Buying within 3 Months";
      defaultTarget = "buyingTime";
      break;
    case 'EXCHANGE':
      val = "Exchange";
      defaultTarget = "keyEnquiry";
      break;
    case 'ON_ROAD_PRICE':
      val = "On Road Price";
      defaultTarget = "keyEnquiry";
      break;
    case 'FINANCE_DETAILS':
      val = "Finance Details";
      defaultTarget = "keyEnquiry";
      break;
    case 'CX_WANT_CALLBACK':
      val = "Cx want callback";
      defaultTarget = "keyEnquiry";
      break;
    case 'CX_VOICEMAIL':
      val = "Cx forwarded his call in voicemail";
      defaultTarget = "keyEnquiry";
      break;
    case 'CX_NOT_RESPONDING':
      val = "Cx is not responding";
      defaultTarget = "keyEnquiry";
      break;
    case 'CX_DISCONNECTED':
      val = "Cx Disconnected the call";
      defaultTarget = "keyEnquiry";
      break;
    case 'CX_BUSY':
      val = "Cx is busy right now";
      defaultTarget = "keyEnquiry";
      break;
    case 'CX_AI_ASSISTANT':
      val = "Cx call picked by Ai assistant";
      defaultTarget = "keyEnquiry";
      break;
    case 'LNP_NOT_WITHIN_45_DAYS':
      val = "cx dont want to purchase the vehicle within 45 days";
      defaultTarget = "keyEnquiry";
      break;
    case 'LNP_NOT_PURCHASING':
      val = "cx dont want to purchase the vehicle";
      defaultTarget = "keyEnquiry";
      break;
    case 'LNP_AFTER_2_3_MONTHS':
      val = "cx want to purchase the vehicle after 2 to 3 month";
      defaultTarget = "keyEnquiry";
      break;
  }

  if (currentState.selectedDispo === "LOP") {
    applyLopFieldShortcut(val, labelEl, event);
    return;
  }

  const targetField = lastFocusedSummaryField || defaultTarget || "keyEnquiry";

  const fieldElemMap = {
    keyEnquiry: "summary-key-enquiry",
    buyingTime: "summary-buying-time",
    testRideSlot: "summary-test-ride",
    color: "summary-color",
    altNum: "summary-alt-num",
    paymentMode: "summary-payment"
  };

  const elemId = fieldElemMap[targetField];
  const elem = document.getElementById(elemId);

  if (currentState.selectedDispo === "CALBAK" || currentState.selectedDispo === "LNP") {
    const currentVal = (currentState.summaryFields.keyEnquiry || "").trim();
    if (currentVal === val) {
      currentState.summaryFields.keyEnquiry = "";
    } else {
      currentState.summaryFields.keyEnquiry = val;
    }
    if (elem) elem.value = currentState.summaryFields.keyEnquiry;
    updateSummaryPreview();
    return;
  }

  if (targetField && val) {
    if (targetField === 'keyEnquiry') {
      let currentVal = (currentState.summaryFields.keyEnquiry || "").trim();
      if (currentVal === "P1" || currentVal === "xyz") currentVal = "";

      let items = currentVal ? currentVal.split(",").map(i => i.trim()).filter(Boolean) : [];
      if (items.includes(val)) {
        items = items.filter(i => i !== val);
      } else {
        items.push(val);
      }
      const finalVal = items.length > 0 ? items.join(", ") : "P1";
      currentState.summaryFields.keyEnquiry = finalVal;
      if (elem) elem.value = finalVal;
    } else {
      currentState.summaryFields[targetField] = val;
      if (elem) elem.value = val;
    }
  }

  if (type === 'FINANCE_DETAILS' && targetField === 'keyEnquiry') {
    currentState.summaryFields.paymentMode = "Finance";
    const paymentEl = document.getElementById("summary-payment");
    if (paymentEl) paymentEl.value = "Finance";
  }

  updateSummaryPreview();
}

function updateSummaryPreview() {
  const box = document.getElementById("summary-text-box");
  if (!box) return;

  const modelName = currentState.selectedBike ? currentState.selectedBike.name : "xyz";

  if (currentState.selectedDispo === "LOP") {
    const lf = currentState.lopFields || {};
    const model = lf.model || modelName;
    const pDate = lf.purchaseDate || "N/A";
    const dealer = lf.dealership || "N/A";
    const bName = lf.bookingName || (currentState.customerName ? `${currentState.customerTitle} ${currentState.customerName}` : "N/A");
    const bMobile = lf.bookingMobile || "N/A";
    const regNo = lf.regNo || "N/A";
    const chassisNo = lf.chassisNo || "N/A";
    const engineNo = lf.engineNo || "N/A";
    const altNum = lf.altNum || "N/A";

    box.value = `Model / ${model}, Purchase Date/Booking Date / ${pDate}, Dealership / ${dealer}, Booking Name / ${bName}, Booking Mobile Number / ${bMobile}, Registration Number / ${regNo}, Chassis Number / ${chassisNo}, Engine Number / ${engineNo}, Alternate Number / ${altNum}`;
  } else if (currentState.selectedDispo === "CALBAK" || currentState.selectedDispo === "LNP") {
    const sf = currentState.summaryFields || {};
    const reason = (sf.keyEnquiry && sf.keyEnquiry !== "P1" && sf.keyEnquiry !== "xyz") ? sf.keyEnquiry.trim() : "";
    box.value = reason || "";
  } else {
    const sf = currentState.summaryFields || {};
    const keyEnq = sf.keyEnquiry || 'xyz';
    const bTime = sf.buyingTime || 'xyz';
    const trSlot = sf.testRideSlot || 'xyz';
    const color = sf.color || 'xyz';
    const altNum = sf.altNum || 'xyz';
    const pMode = sf.paymentMode || 'xyz';

    box.value = `Key enquiry / ${keyEnq}, Buying time / ${bTime}, Test ride date and time / ${trSlot}, Model / ${modelName}, Color / ${color}, Alternate number / ${altNum}, Payment mode / ${pMode}`;
  }
}

function copySummaryToClipboard() {
  const box = document.getElementById("summary-text-box");
  if (box) {
    copyToClipboard(box.value);
  }
}

function resetCallDispositions() {
  currentState.selectedDispo = "BKR";
  currentState.summaryFields = {
    keyEnquiry: "P1",
    buyingTime: "Within 15 Days",
    testRideSlot: "",
    color: "Default",
    altNum: "N/A",
    paymentMode: "Finance"
  };
  currentState.lopFields = {
    model: "",
    purchaseDate: "",
    dealership: "",
    bookingName: "",
    bookingMobile: "",
    regNo: "N/A",
    chassisNo: "N/A",
    engineNo: "N/A",
    altNum: "N/A"
  };

  // Reset standard summary input fields
  const keyEnquiryEl = document.getElementById("summary-key-enquiry");
  if (keyEnquiryEl) keyEnquiryEl.value = "P1";

  const buyingTimeEl = document.getElementById("summary-buying-time");
  if (buyingTimeEl) buyingTimeEl.value = "Within 15 Days";

  const testRideEl = document.getElementById("summary-test-ride");
  if (testRideEl) testRideEl.value = "";

  const colorEl = document.getElementById("summary-color");
  if (colorEl) colorEl.value = "Default";

  const altNumEl = document.getElementById("summary-alt-num");
  if (altNumEl) altNumEl.value = "N/A";

  const paymentEl = document.getElementById("summary-payment");
  if (paymentEl) paymentEl.value = "Finance";

  // Reset LOP input fields
  const lopModelEl = document.getElementById("lop-model");
  if (lopModelEl) lopModelEl.value = "";

  const lopDateEl = document.getElementById("lop-purchase-date");
  if (lopDateEl) lopDateEl.value = "";

  const lopDealerEl = document.getElementById("lop-dealership");
  if (lopDealerEl) lopDealerEl.value = "";

  const lopNameEl = document.getElementById("lop-booking-name");
  if (lopNameEl) lopNameEl.value = "";

  const lopMobileEl = document.getElementById("lop-booking-mobile");
  if (lopMobileEl) lopMobileEl.value = "";

  const lopRegEl = document.getElementById("lop-reg-no");
  if (lopRegEl) lopRegEl.value = "N/A";

  const lopChassisEl = document.getElementById("lop-chassis-no");
  if (lopChassisEl) lopChassisEl.value = "N/A";

  const lopEngineEl = document.getElementById("lop-engine-no");
  if (lopEngineEl) lopEngineEl.value = "N/A";

  const lopAltEl = document.getElementById("lop-alt-num");
  if (lopAltEl) lopAltEl.value = "N/A";

  // Uncheck any shortcut checkboxes
  document.querySelectorAll("#std-shortcuts-bar input[type='checkbox'], #lop-summary-fields input[type='checkbox']").forEach(cb => cb.checked = false);

  renderDispositions();
  selectDispo("BKR");
  renderShortcutsBar();
  updateSummaryColorOptions();
  updateSummaryPreview();

  showToast("🔄 Call Dispositions and CRM Summary reset to default!");
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

// Clean up user presence when browser/tab is closed
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    if (vaultState.activeUser && typeof sbUntrackUserPresence === "function") {
      sbUntrackUserPresence(vaultState.activeUser.username);
    }
  });
}

