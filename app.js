const app = document.getElementById("app");

function commonsImage(file, width = 1800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

function commonsSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

function unsplashImage(id, width = 2200) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=88`;
}

function unsplashSource(query) {
  return `https://unsplash.com/s/photos/${encodeURIComponent(query).replace(/%20/g, "-")}`;
}

const baseItems = [
  { image: unsplashImage("1558030006-450675393462"), url: unsplashSource("steak dinner"), caption: "Steak sliced under moody restaurant light, crust first.", shape: "cinema", focus: "center 48%" },
  { image: unsplashImage("1600891964092-4316c288032e"), url: unsplashSource("ribeye steak fries"), caption: "Ribeye and fries, glossy sauce, clean plate drama.", shape: "wide", focus: "center 55%" },
  { image: unsplashImage("1571091718767-18b5b1457add"), url: unsplashSource("cheeseburger close up"), caption: "Clean cheeseburger close-up, glossy bun and sharp layers.", shape: "portrait", focus: "center 46%" },
  { image: unsplashImage("1565299507177-b0ac66763828"), url: unsplashSource("restaurant burger"), caption: "Tall restaurant burger, melted cheese, soft bun, big bite.", shape: "tall", focus: "center 48%" },
  { image: unsplashImage("1569718212165-3a8278d5f624"), url: unsplashSource("ramen egg"), caption: "Ramen with soft egg, noodles, and a rich orange glow.", shape: "portrait", focus: "center 48%" },
  { image: unsplashImage("1553621042-f6e147245754"), url: unsplashSource("sushi platter"), caption: "Sushi tray, precise rows and polished restaurant light.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1617196034796-73dfa7b1fd56"), url: unsplashSource("salmon sushi"), caption: "Salmon sushi on a black plate, clean color and quiet luxury.", shape: "cinema", focus: "center 45%" },
  { image: unsplashImage("1551183053-bf91a1d81141"), url: unsplashSource("pasta carbonara"), caption: "Glossy pasta in a dark pan, noodles folded like fabric.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1621996346565-e3dbc646d9a9"), url: unsplashSource("italian pasta"), caption: "Italian pasta, red sauce, parmesan, and clean plate contrast.", shape: "portrait", focus: "center 50%" },
  { image: unsplashImage("1473093295043-cdd812d0e601"), url: unsplashSource("pasta close up"), caption: "Pasta close-up, creamy shine and a bright table finish.", shape: "square", focus: "center 46%" },
  { image: unsplashImage("1604908176997-125f25cc6f3d"), url: unsplashSource("fried chicken"), caption: "Golden fried chicken, crisp crust and deep comfort.", shape: "wide", focus: "center 52%" },
  { file: "Korean BBQ-LA Galbi-01.jpg", caption: "LA galbi with glossy char and thick short-rib energy.", shape: "hero", focus: "center 55%" },
  { file: "LA yangnyeom-galbi.jpg", caption: "Marinated galbi, lacquered edges, hot grill glow.", shape: "portrait" },
  { file: "Korean.cuisine-Galbi-01.jpg", caption: "Korean galbi plate, rich beef and clean comfort.", shape: "wide" },
  { file: "Korean BBQ-Galbi-01.jpg", caption: "Korean BBQ beef ribs, browned and generous.", shape: "portrait" },
  { file: "Korean barbecue-Galbi-01.jpg", caption: "Galbi at the table, the best kind of dinner gravity.", shape: "tall" },
  { file: "Korean barbeque-Galbi-13.jpg", caption: "Grilled galbi close-up, smoke and sweet beef.", shape: "square" },
  { file: "Korean barbeque-Galbi-12.jpg", caption: "Korean barbecue ribs, cut thick and glossy.", shape: "portrait" },
  { file: "L.A. galbi.jpg", caption: "LA galbi, sliced across the bone and deeply browned.", shape: "wide" },
  { file: "Ttukbaegi bulgogi - Bulgogi(beef) hot pot - Kogi Korean cuisine 2024-09-03.jpg", caption: "Bulgogi hot pot, soft beef and warm broth.", shape: "hero" },
  { file: "Bulgogi (Marinated beef. Served with rice) - Kogi 2023-09-11.jpg", caption: "Bulgogi with rice, simple and deeply satisfying.", shape: "wide" },
  { file: "Haemul-sundubu-jjigae.jpg", caption: "Soft tofu soup, silky tofu and deep red broth.", shape: "portrait" },
  { file: "Sundubu-jjigae in Hawaii.jpg", caption: "Sundubu jjigae in a stone bowl, hot and cozy.", shape: "square" },
  { file: "Sundubu jjigae stew.jpg", caption: "Soft tofu stew, rich broth and clean spoon energy.", shape: "wide" },
  { file: "Ramen Bowl 2.jpg", caption: "Ramen bowl with egg, noodles, and quiet richness.", shape: "hero", focus: "center 48%" },
  { file: "Free-photo-of-a-bowl-of-ramen-with-eggs-and-meat.jpg", caption: "Ramen with soft egg and a cinematic broth surface.", shape: "wide" },
  { file: "Ramen at Momo Toko.jpg", caption: "Ramen with glossy noodles and a warm bowl glow.", shape: "portrait" },
  { file: "Ramen with eggs.jpg", caption: "Ramen eggs, soft broth, and late-night comfort.", shape: "square" },
  { file: "Bowl of miso ramen.jpg", caption: "Miso ramen, simple and savory.", shape: "portrait" },
  { file: "Tonkotsu ramen.jpg", caption: "Tonkotsu ramen, creamy broth and clean depth.", shape: "wide" },
  { file: "Tonkotsu ramen in Tokyo.jpg", caption: "Tokyo tonkotsu ramen, dense broth and soft noodles.", shape: "portrait" },
  { file: "Salmon Sushi (3332911172).jpg", caption: "Salmon sushi, buttery orange fish over clean rice.", shape: "wide" },
  { file: "Salmon Sushi and Sashimi Platter - W Sushi.jpg", caption: "Salmon sushi and sashimi, bright and precise.", shape: "hero" },
  { file: "Salmon Sushi in Singapore.jpg", caption: "Salmon sushi, glossy slices and calm plate geometry.", shape: "portrait" },
  { file: "Salmon sushi (20250322).jpg", caption: "Tall salmon sushi frame, soft rice and clean color.", shape: "tall" },
  { file: "Salmon Sushi.jpg", caption: "Classic salmon sushi, simple and perfect.", shape: "wide" },
  { file: "Salmon sushi.jpg", caption: "Salmon roll, cool rice and a soft orange finish.", shape: "square" },
  { file: "Soft Shelled Crab on Sushi Rice - Arintji (69449046).jpg", caption: "Soft shell crab over sushi rice, crisp and delicate.", shape: "wide" },
  { file: "Soft shell crab (3196520484).jpg", caption: "Soft shell crab, golden and light.", shape: "square" },
  { file: "Spider hand roll.jpg", caption: "Spider hand roll, crisp crab and tight seaweed wrap.", shape: "wide" },
  { file: "Roasted Salmon Skin sushi roll, Soft Shell Crab sushi roll, Salmon and Avocado sushi roll, Miso Soup - Kenzan GPO (2673449759).jpg", caption: "Soft shell crab roll with salmon and miso on the table.", shape: "portrait" },
  { file: "Bottle soju.jpg", caption: "Cold soju bottle, clean glass, late-night table.", shape: "portrait" },
  { file: "Soju in korean restaurant.JPG", caption: "Soju at a Korean restaurant, simple and sharp.", shape: "square" },
  { file: "Oppa Lychee Soju.jpg", caption: "Lychee soju bottle, chilled and bright.", shape: "portrait" },
  { file: "Jiaozi GS CN.jpg", caption: "Jiaozi dumplings, soft pleats and a full plate.", shape: "wide" },
  { file: "Chinese Dumplings.jpg", caption: "Chinese dumplings, folded by hand and packed close.", shape: "portrait" },
  { file: "Dalian Liaoning China Homemade-Jiaotze-01.jpg", caption: "Homemade jiaozi, warm and unfussy.", shape: "square" },
  { file: "Mushroom pork dumplings for lunch.jpg", caption: "Pork dumplings, browned and lunch-perfect.", shape: "wide" },
  { file: "Asian Dumplings (Jiaozi) by ArmAg.jpg", caption: "Jiaozi close-up, soft skins and browned edges.", shape: "portrait" },
  { file: "Chengdu Zhong Dumpling(Zhong Jiaozi).jpg", caption: "Zhong dumplings, glossy sauce and compact comfort.", shape: "square" },
  { file: "Pho, popular Vietnamese noodle soup.jpg", caption: "Pho with clear broth, tender beef, and soft noodles.", shape: "hero" },
  { file: "Pho Vietnamese noodle soup in Ho Chi Minh City, Vietnam.jpg", caption: "Vietnamese pho, bright broth and clean heat.", shape: "wide" },
  { file: "Beef pho (14698023972).jpg", caption: "Beef pho, broth, noodles, and a soft bowl shine.", shape: "portrait" },
  { file: "Banh mi sandwich.jpg", caption: "Banh mi, crisp bread and savory filling.", shape: "wide" },
  { file: "Carbonara 2025.jpg", caption: "Carbonara, glossy pasta and black pepper.", shape: "wide" },
  { file: "Pasta carbonara.jpg", caption: "Carbonara plate, creamy depth and clean Italian comfort.", shape: "portrait" },
  { file: "Fettuccine Alfredo.jpg", caption: "Fettuccine Alfredo, silky sauce and soft folds.", shape: "square" },
  { file: "Cheeseburger.jpg", caption: "Cheeseburger, melted cheese and toasted bun.", shape: "square" },
  { file: "Cheese Burger - Las Vegas.jpg", caption: "Burger close-up, diner comfort and glossy bun.", shape: "portrait" },
  { file: "Hamburger and fries.jpg", caption: "Burger and fries, crisp edges and classic American comfort.", shape: "wide" },
  { file: "Close-up burger and fries.jpg", caption: "Close-up burger and fries, golden and huge.", shape: "hero" },
  { file: "Steak dinner with vegetables.jpg", caption: "Steak dinner, browned crust and a generous plate.", shape: "wide" },
  { file: "Steak (1).jpg", caption: "T-bone steak, clean crust and simple plating.", shape: "portrait" },
  { file: "Steak dinner (3292786869).jpg", caption: "Steak dinner, old-school plate and rich brown edges.", shape: "square" },
  { file: "Gfp-steak-and-shrimp-dinner.jpg", caption: "Steak and shrimp dinner, big plate energy.", shape: "wide" },
  { file: "Grilling.jpg", caption: "American grill heat, beef and corn over charcoal.", shape: "cinema" },
  { file: "Barbecue beef ribs.jpg", caption: "Barbecue beef ribs, smoke, bark, and heavy cut.", shape: "wide" },
  { file: "Beef ribs on a smoker grill.jpg", caption: "Beef ribs on the smoker, slow-cooked and serious.", shape: "portrait" },
  { file: "Beef short ribs.jpg", caption: "Beef short ribs, rich cut and deep texture.", shape: "square" },
  { file: "Quesadilla.jpg", caption: "Quesadilla, melted cheese and crisp tortilla.", shape: "wide" },
  { file: "The Quesadilla.jpg", caption: "Quesadilla wedges, simple and golden.", shape: "portrait" },
  { file: "Taco de carnitas.jpg", caption: "Carnitas taco, soft tortilla and juicy pork.", shape: "square" },
  { file: "Carnitas taco - China Poblano.jpg", caption: "Carnitas taco, crisp pork and bright finish.", shape: "wide" },
  { file: "Carnitas tacos.jpg", caption: "Carnitas tacos, stacked and juicy.", shape: "portrait" },
  { file: "Crawfish gumbo.jpg", caption: "Cajun gumbo, dark roux and seafood comfort.", shape: "wide" },
  { file: "Cajun seafood gumbo.jpg", caption: "Cajun seafood gumbo, deep bowl and slow flavor.", shape: "square" },
];

const skippedFiles = new Set([
  "Chengdu Zhong Dumpling(Zhong Jiaozi).jpg",
  "Cheeseburger.jpg",
  "Cheese Burger - Las Vegas.jpg",
  "Hamburger and fries.jpg",
  "Steak dinner with vegetables.jpg",
  "Steak (1).jpg",
  "Steak dinner (3292786869).jpg",
  "Gfp-steak-and-shrimp-dinner.jpg",
  "The Quesadilla.jpg",
  "Crawfish gumbo.jpg",
  "Cajun seafood gumbo.jpg",
  "Bulgogi (Marinated beef. Served with rice) - Kogi 2023-09-11.jpg",
  "Ttukbaegi bulgogi - Bulgogi(beef) hot pot - Kogi Korean cuisine 2024-09-03.jpg",
  "Banh mi sandwich.jpg",
  "Taco de carnitas.jpg",
  "Carnitas taco - China Poblano.jpg",
  "Carnitas tacos.jpg",
  "Korean barbecue-Galbi-01.jpg",
  "Ramen at Momo Toko.jpg",
  "Ramen with eggs.jpg",
  "Bowl of miso ramen.jpg",
  "Tonkotsu ramen.jpg",
  "Tonkotsu ramen in Tokyo.jpg",
  "Roasted Salmon Skin sushi roll, Soft Shell Crab sushi roll, Salmon and Avocado sushi roll, Miso Soup - Kenzan GPO (2673449759).jpg",
  "Carbonara 2025.jpg",
  "Pasta carbonara.jpg",
  "Fettuccine Alfredo.jpg",
]);

const hanniItems = [
  {
    person: "Hanni",
    file: "Newjeans Hanni 2023 01.jpg",
    caption: "Hanni cameo, soft smile between sushi and galbi.",
    shape: "square",
    focus: "center 40%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "Newjeans Hanni 2023 02.jpg",
    caption: "Hanni cameo, bright little NewJeans sparkle.",
    shape: "portrait",
    focus: "center 38%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "Newjeans Hanni 2023 03.jpg",
    caption: "Hanni cameo, cute calm face before more noodles.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "Newjeans Hanni 2023 04.jpg",
    caption: "Hanni cameo, sweet soft-focus idol-card energy.",
    shape: "square",
    focus: "center 40%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "Newjeans Hanni 2023 06.png",
    caption: "Hanni cameo, tiny cheerful pause in the food stream.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "Newjeans Hanni 2023 07.png",
    caption: "Hanni cameo, cute clean pop-color moment.",
    shape: "square",
    focus: "center 40%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "Newjeans Hanni 2023 08.png",
    caption: "Hanni cameo, playful little wink between plates.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "Newjeans Hanni 2023 09.png",
    caption: "Hanni cameo, soft bright smile before dessert.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "20230905 Hanni (NewJeans).jpg",
    caption: "Hanni cameo, tidy airport-day cuteness.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "20230921 Newjeans Hanni \ud2f0\ube44\ud150 01 (cropped).jpg",
    caption: "Hanni cameo, polished press-day smile.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "20230921 Newjeans Hanni \ud2f0\ube44\ud150 02.jpg",
    caption: "Hanni cameo, cute close-up glow.",
    shape: "square",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Hanni",
    file: "NewJeans Hanni OLENS 1.jpg",
    caption: "Hanni cameo, soft OLENS-style sparkle.",
    shape: "portrait",
    focus: "center 38%",
    width: 1500,
  },
];

const haerinItems = [
  {
    person: "Haerin",
    file: "Haerin (NewJeans) 220813.jpg",
    caption: "Haerin cameo, gentle NewJeans glow before the next plate.",
    shape: "portrait",
    focus: "center 34%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "20230905 Haerin (NewJeans).jpg",
    caption: "Haerin cameo, calm bright NewJeans look.",
    shape: "portrait",
    focus: "center 34%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "Haerin Seoul Fashion Week 1.jpg",
    caption: "Haerin cameo, soft fashion-week face.",
    shape: "portrait",
    focus: "center 35%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "Haerin Seoul Fashion Week 2.jpg",
    caption: "Haerin cameo, quiet cute stare between galbi tiles.",
    shape: "portrait",
    focus: "center 34%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "Haerin Seoul Fashion Week 3.jpg",
    caption: "Haerin cameo, clean soft glam.",
    shape: "portrait",
    focus: "center 35%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "Kang Haerin for OLENS 2.jpg",
    caption: "Haerin cameo, gentle OLENS close-up.",
    shape: "square",
    focus: "center 38%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "Kang Haerin for OLENS 3.jpg",
    caption: "Haerin cameo, bright soft-card moment.",
    shape: "square",
    focus: "center 38%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "NewJeans HAERIN Dior 1.jpg",
    caption: "Haerin cameo, polished but still cute Dior glow.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "NewJeans HAERIN Dior 2.jpg",
    caption: "Haerin cameo, neat little fashion-card pause.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "NewJeans HAERIN Dior 3.jpg",
    caption: "Haerin cameo, soft bright portrait energy.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "NewJeans Haerin Seoul Fashion Week 1.jpg",
    caption: "Haerin cameo, compact fashion-week cuteness.",
    shape: "portrait",
    focus: "center 35%",
    width: 1500,
  },
  {
    person: "Haerin",
    file: "NewJeans Haerin Seoul Fashion Week 2.jpg",
    caption: "Haerin cameo, gentle runway-side glow.",
    shape: "portrait",
    focus: "center 35%",
    width: 1500,
  },
];

const wonyoungItems = [
  {
    person: "Wonyoung",
    file: "Jang Wonyoung 240513.jpg",
    caption: "Wonyoung cameo, bright polished smile tucked into the feast.",
    shape: "portrait",
    focus: "center 38%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "Jang Wonyoung \uc7a5\uc6d0\uc601 240513 01.png",
    caption: "Wonyoung cameo, cute polished 240513 moment.",
    shape: "portrait",
    focus: "center 38%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "Jang Wonyoung \uc7a5\uc6d0\uc601 240513 02.png",
    caption: "Wonyoung cameo, soft smile tucked into the feast.",
    shape: "square",
    focus: "center 38%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "Jang Wonyoung \uc7a5\uc6d0\uc601 240513 03.png",
    caption: "Wonyoung cameo, bright idol-card shine.",
    shape: "square",
    focus: "center 38%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "20241010 Wonyoung for Tommy Hilfiger 01.jpg",
    caption: "Wonyoung cameo, crisp Tommy smile.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "20241010 Wonyoung for Tommy Hilfiger 02.jpg",
    caption: "Wonyoung cameo, bright preppy cuteness.",
    shape: "square",
    focus: "center 38%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "20241010 Wonyoung for Tommy Hilfiger 03.jpg",
    caption: "Wonyoung cameo, clean glossy fashion-card energy.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "20241010 Wonyoung for Tommy Hilfiger 04.jpg",
    caption: "Wonyoung cameo, polished smile in soft light.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "20241010 Wonyoung for Tommy Hilfiger 05.jpg",
    caption: "Wonyoung cameo, cute wide-frame sparkle.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "Jang Won-young IVE Marie Claire Korea.jpg",
    caption: "Wonyoung cameo, soft magazine glow.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "Jang Wonyoung portrait 2025.jpg",
    caption: "Wonyoung cameo, neat little portrait-card pause.",
    shape: "square",
    focus: "center 40%",
    width: 1500,
  },
  {
    person: "Wonyoung",
    file: "Wonyoung at Bvlgari event.png",
    caption: "Wonyoung cameo, glossy event smile.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
];

const ningningItems = [
  {
    person: "Ningning",
    file: "NINGNING (54295363093).jpg",
    caption: "Ningning cameo, sweet stage sparkle before ramen returns.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "250111 aespa Ningning.jpg",
    caption: "Ningning cameo, sweet aespa stage-card glow.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "241005 Ningning K-Link Festival 02.jpg",
    caption: "Ningning cameo, bright festival smile.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "241005 Ningning K-Link Festival.jpg",
    caption: "Ningning cameo, soft K-Link stage sparkle.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "250315 Ningning at SYNK PARALLEL LINE Encore 2.jpg",
    caption: "Ningning cameo, cute encore glow.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "250315 Ningning at SYNK PARALLEL LINE Encore 3.jpg",
    caption: "Ningning cameo, clean concert-card energy.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "250315 Ningning at SYNK PARALLEL LINE Encore.jpg",
    caption: "Ningning cameo, bright stage moment before more ramen.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "250315-16 aespa Ningning 01.jpg",
    caption: "Ningning cameo, soft red-carpet sparkle.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "250315-16 aespa Ningning 02.jpg",
    caption: "Ningning cameo, little concert-glow pause.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "Aespa Ningning.jpg",
    caption: "Ningning cameo, simple cute portrait energy.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "NINGNING - AESPA - 2025.01.28.jpg",
    caption: "Ningning cameo, bright soft event smile.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
  {
    person: "Ningning",
    file: "NINGNING.jpg",
    caption: "Ningning cameo, clean little idol-card glow.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
];

function addCameos(target, person, entries) {
  target.push(...entries.map(([file, caption, shape = "portrait", focus = "center 36%"]) => ({
    person,
    file,
    caption,
    shape,
    focus,
    width: 1500,
  })));
}

addCameos(hanniItems, "Hanni", [
  ["2023 MMA NewJeans Hanni.jpg", "Hanni cameo, soft awards-night sparkle."],
  ["20230921 Newjeans Hanni \ud2f0\ube44\ud150 01.jpg", "Hanni cameo, tall polished press-day frame.", "tall"],
  ["20230921 Newjeans Hanni \ud2f0\ube44\ud150 03.jpg", "Hanni cameo, bright little stage-door smile.", "tall"],
  ["Hanni 241022 2.jpg", "Hanni cameo, clean 2024 soft-card moment."],
  ["Hanni 241022 2.png", "Hanni cameo, tiny polished smile before ramen."],
  ["Hanni 241022.png", "Hanni cameo, cute compact pop-card pause."],
  ["Hanni OLENS 1.jpg", "Hanni cameo, sweet OLENS close-up."],
  ["Hanni OLENS 2.jpg", "Hanni cameo, gentle lens-campaign glow."],
  ["Hanni OLensglobal.jpg", "Hanni cameo, soft bright beauty-card energy."],
  ["Hanni at Music Bank on August 4, 2022.jpg", "Hanni cameo, early Music Bank sweetness.", "portrait", "center 34%"],
  ["Hanni during Marie Claire interview.png", "Hanni cameo, cozy magazine-interview smile.", "square"],
  ["NewJeans Hanni OLENS 3 (cropped).jpg", "Hanni cameo, tiny cute OLENS crop.", "square"],
  ["NewJeans Hanni OLENS 3.jpg", "Hanni cameo, soft vertical OLENS sparkle."],
]);

addCameos(haerinItems, "Haerin", [
  ["2023 MMA NewJeans Haerin 1.jpg", "Haerin cameo, sweet awards-night portrait."],
  ["2023 MMA NewJeans Haerin 2.jpg", "Haerin cameo, quiet little MMA smile."],
  ["Kang Haerin for OLENS.jpg", "Haerin cameo, tiny OLENS soft-focus card."],
  ["NewJeans Haerin Incheon Airport 1.jpg", "Haerin cameo, small airport-day cuteness."],
  ["NewJeans Haerin Incheon Airport 2.jpg", "Haerin cameo, gentle travel-day pause."],
  ["NewJeans OLensglobal Haerin.jpg", "Haerin cameo, clean lens-campaign glow."],
]);

addCameos(wonyoungItems, "Wonyoung", [
  ["20231202 IVE's Jang Wonyoung at the MAMA2023 02.png", "Wonyoung cameo, bright MAMA red-carpet smile."],
  ["20231202 IVE's Jang Wonyoung at the MAMA2023 03.png", "Wonyoung cameo, tiny polished awards look."],
  ["20231202 IVE's Jang Wonyoung at the MAMA2023 04.png", "Wonyoung cameo, cute awards-night sparkle.", "square"],
  ["20250310 Jang Wonyoung 01.jpg", "Wonyoung cameo, soft 2025 portrait glow."],
  ["20250310 Jang Wonyoung 02.jpg", "Wonyoung cameo, neat close-up smile."],
  ["20250310 Jang Wonyoung 03.jpg", "Wonyoung cameo, tall polished idol-card energy.", "tall"],
  ["20250310 Jang Wonyoung 04.jpg", "Wonyoung cameo, gentle bright event face."],
  ["20250310 Jang Wonyoung 05.jpg", "Wonyoung cameo, compact cute event frame."],
  ["20250310 Jang Wonyoung 06.jpg", "Wonyoung cameo, soft little fashion-card pause."],
  ["IVE Wonyoung on the way to Music Bank - October 13, 2023 01.jpg", "Wonyoung cameo, Music Bank street-style sparkle."],
  ["JANG WON YOUNG (\uc7a5\uc6d0\uc601) \u2013 MIUMIU PHOTOCALL \u2013 2025.06.20 \u2013 P1.jpg", "Wonyoung cameo, soft Miu Miu photocall smile."],
  ["JANG WON YOUNG (\uc7a5\uc6d0\uc601) \u2013 MIUMIU PHOTOCALL \u2013 2025.06.20 \u2013 P2.jpg", "Wonyoung cameo, wide Miu Miu sparkle.", "wide", "center 42%"],
  ["JANG WON YOUNG (\uc7a5\uc6d0\uc601) \u2013 MIUMIU PHOTOCALL \u2013 2025.06.20 \u2013 P3.jpg", "Wonyoung cameo, glossy event-card energy."],
  ["JANG WON YOUNG (\uc7a5\uc6d0\uc601) \u2013 MIUMIU PHOTOCALL \u2013 2025.06.20 \u2013 P4.jpg", "Wonyoung cameo, tiny polished Miu Miu pause."],
  ["JANG WON YOUNG (\uc7a5\uc6d0\uc601) \u2013 MIUMIU PHOTOCALL \u2013 2025.06.20 \u2013 P5.jpg", "Wonyoung cameo, bright fashion-week softness."],
  ["Jang Won Young 2025.jpg", "Wonyoung cameo, clean 2025 portrait shine.", "square"],
  ["Jang Won-young at the 2024 Melon Music Awards-2.png", "Wonyoung cameo, sweet Melon Music Awards glow."],
  ["Jang Won-young January 29, 2026 (1).png", "Wonyoung cameo, soft January event smile."],
  ["Jang Won-young January 29, 2026 (2).png", "Wonyoung cameo, cute winter event sparkle."],
  ["Jang Won-young of Ive, April 16, 2025.png", "Wonyoung cameo, polished IVE event look."],
  ["Jang Won-young of Ive, October 15, 2025.png", "Wonyoung cameo, glossy October smile."],
  ["Jang Won-young of Ive, October 15, 2025 (2).png", "Wonyoung cameo, clean autumn fashion-card frame."],
  ["Jang Won-young of Ive, October 15, 2025 (3).png", "Wonyoung cameo, bright soft event pause."],
  ["Jang Won-young of Ive, October 15, 2025 (4).png", "Wonyoung cameo, neat idol-card shine."],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 01.jpg", "Wonyoung cameo, glossy K\u00e9rastase smile.", "square"],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 02.jpg", "Wonyoung cameo, soft beauty-campaign glow.", "square"],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 03.jpg", "Wonyoung cameo, clean close-up polish."],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 04.jpg", "Wonyoung cameo, bright hair-campaign sparkle.", "wide", "center 42%"],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 05.jpg", "Wonyoung cameo, cute little beauty-card moment.", "square"],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 06.jpg", "Wonyoung cameo, polished wide-frame smile.", "wide", "center 42%"],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 07.jpg", "Wonyoung cameo, glossy soft-brand energy.", "wide", "center 42%"],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 08.jpg", "Wonyoung cameo, tiny vertical beauty-card glow."],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 09.jpg", "Wonyoung cameo, tall soft portrait shine.", "tall"],
  ["Jang Wonyoung \uc7a5\uc6d0\uc601 K\u00e9rastase\u2019s NEW Ambassador 10.jpg", "Wonyoung cameo, wide bright campaign smile.", "wide", "center 42%"],
  ["\uc7a5\uc6d0\uc601 (JANG WONYOUNG) - RIMOWA - 2023.05.13 P1.jpg", "Wonyoung cameo, crisp RIMOWA event polish."],
  ["\uc7a5\uc6d0\uc601 (JANG WONYOUNG) - RIMOWA - 2023.05.13 P2.jpg", "Wonyoung cameo, soft RIMOWA fashion-card pause."],
  ["Wonyoung in 2025.png", "Wonyoung cameo, polished adult-era fashion portrait."],
  ["Wonyoung in January 2026.png", "Wonyoung cameo, sleek January 2026 event frame."],
  ["Jang Won-young of Ive, March 27, 2025.png", "Wonyoung cameo, high-fashion 2025 event glow."],
  ["Jang Won-young for Dyson April 2026.png", "Wonyoung cameo, glossy Dyson beauty-event portrait."],
  ["Jang Won-young at the Dyson Launch Event, April 23, 2026 (1).png", "Wonyoung cameo, sleek Dyson launch styling."],
  ["Jang Won-young at the Dyson Launch Event, April 23, 2026 (2).png", "Wonyoung cameo, polished Dyson event frame."],
  ["Jang Won-young at the Dyson Launch Event, April 23, 2026 (3).png", "Wonyoung cameo, sharp Dyson launch glow."],
  ["Jang Won-young at the Dyson Launch Event, April 23, 2026 (4).png", "Wonyoung cameo, clean Dyson beauty-event portrait."],
  ["Jang Won-young at the Dyson Launch Event, April 23, 2026 (5).png", "Wonyoung cameo, sleek Dyson event polish."],
  ["Jang Won-young at the Miu Miu Beauty event, April 6, 2026 (1).png", "Wonyoung cameo, Miu Miu beauty-event glow."],
  ["Jang Won-young at the Miu Miu Beauty event, April 6, 2026 (2).png", "Wonyoung cameo, glossy Miu Miu fashion frame."],
  ["Jang Won-young at the Miu Miu Beauty event, April 6, 2026 (3).png", "Wonyoung cameo, sleek Miu Miu styling."],
  ["Jang Won-young at the Miu Miu Beauty event, April 6, 2026 (4).png", "Wonyoung cameo, polished Miu Miu event portrait."],
  ["Jang Won-young at the 40th Golden Disc Awards, January 10, 2026 (1).png", "Wonyoung cameo, Golden Disc awards-night glow."],
  ["Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (1).jpg", "Wonyoung cameo, stage-glam fan-concert frame.", "tall"],
  ["Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (2).jpg", "Wonyoung cameo, polished stage styling.", "tall"],
  ["Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (3).jpg", "Wonyoung cameo, bright concert-stage portrait.", "tall"],
  ["Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (4).jpg", "Wonyoung cameo, sleek stage-glam frame.", "tall"],
  ["Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (5).jpg", "Wonyoung cameo, crisp concert styling.", "tall"],
  ["Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (6).jpg", "Wonyoung cameo, polished stage portrait.", "tall"],
]);

addCameos(ningningItems, "Ningning", [
  ["Aespa Ningning 2024 MMA.jpg", "Ningning cameo, sharp MMA awards-night styling."],
  ["2023 MMA aespa Ningning 1 (cropped).jpg", "Ningning cameo, tiny MMA sparkle.", "square"],
  ["2023 MMA aespa Ningning 1.jpg", "Ningning cameo, sweet awards-night frame."],
  ["250316 Ningning at SYNK PARALLEL LINE Encore.jpg", "Ningning cameo, bright encore smile.", "tall"],
  ["250316 Ningning at SYNK PARALLEL LINE Encore 2.jpg", "Ningning cameo, soft concert-card glow.", "tall"],
  ["250316 Ningning at SYNK PARALLEL LINE Encore 3.jpg", "Ningning cameo, clean stage sparkle.", "tall"],
  ["Aespa Ningning 2024 MMA 2.jpg", "Ningning cameo, polished MMA portrait."],
  ["Aespa's Ningning 3.png", "Ningning cameo, cute little aespa card."],
  ["Aespa's Ningning 4 (cropped).jpg", "Ningning cameo, soft cropped portrait.", "tall"],
  ["Aespa's Ningning 4.jpg", "Ningning cameo, tall clean idol frame.", "tall"],
  ["Ningning at Incheon Airport on 25022026 (1).png", "Ningning cameo, bright airport-day smile."],
  ["Ningning at Incheon Airport on 25022026 (2).png", "Ningning cameo, soft travel-day portrait."],
  ["Ningning at Incheon Airport on 25022026 (3).png", "Ningning cameo, neat tiny airport sparkle.", "square"],
  ["Ningning at Incheon Airport on 25022026 (4).png", "Ningning cameo, cute travel-card pause."],
  ["Ningning at Mise-en-Scene event on 19022026 (1).png", "Ningning cameo, soft beauty-event glow."],
  ["Ningning at Mise-en-Scene event on 19022026 (2).png", "Ningning cameo, polished event smile."],
  ["Ningning at Mise-en-Scene event on 19022026 (3).png", "Ningning cameo, tall bright portrait shine.", "tall"],
  ["Ningning for Eternal Return \u00d7 aespa collaboration BTS photoshoot (cropped).jpg", "Ningning cameo, cute BTS photoshoot crop."],
  ["Ningning for Eternal Return \u00d7 aespa collaboration BTS photoshoot.jpg", "Ningning cameo, soft gaming-collab portrait.", "tall"],
  ["Ningning for Eternal Return \u00d7 aespa collaboration BTS photoshoot 02.jpg", "Ningning cameo, bright collab-card moment.", "tall"],
  ["Ningning for Eternal Return \u00d7 aespa collaboration BTS photoshoot 03.jpg", "Ningning cameo, tiny sweet collab frame."],
  ["Ningning in SBS Radio on 061021.jpg", "Ningning cameo, cozy radio-day softness."],
]);

const cameoItems = interleaveGroups([hanniItems, haerinItems, wonyoungItems, ningningItems]);

const blockedCameoFiles = new Set([
  "Newjeans Hanni 2023 01.jpg",
  "Newjeans Hanni 2023 02.jpg",
  "Newjeans Hanni 2023 03.jpg",
  "Newjeans Hanni 2023 04.jpg",
  "Newjeans Hanni 2023 05.jpg",
  "Newjeans Hanni 2023 06.png",
  "Newjeans Hanni 2023 07.png",
  "Newjeans Hanni 2023 08.png",
  "Newjeans Hanni 2023 09.png",
  "Newjeans Hanni 2023 10.jpg",
  "Hanni at Music Bank on August 4, 2022.jpg",
]);

const casualCameoFiles = new Set([
  "20230905 Hanni (NewJeans).jpg",
  "IVE Wonyoung on the way to Music Bank - October 13, 2023 01.jpg",
  "Ningning in SBS Radio on 061021.jpg",
  "Ningning at Incheon Airport on 25022026 (1).png",
  "Ningning at Incheon Airport on 25022026 (2).png",
  "Ningning at Incheon Airport on 25022026 (3).png",
  "Ningning at Incheon Airport on 25022026 (4).png",
]);

const carItems = [
  {
    image: "https://mediapool.bmwgroup.com/cache/P9/202410/P90572660/P90572660-the-new-bmw-m235-xdrive-gran-coup-10-2024-2100px.jpg",
    url: "https://www.press.bmwgroup.com/usa/article/detail/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "2025 BMW M235 xDrive Gran Coupe, official press light and compact-sedan ambition.",
    shape: "cinema",
    focus: "center 54%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90572400&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW 2 Series Gran Coupe, crisp studio stance instead of parking-lot energy.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/cache/P9/202309/P90525202/P90525202-the-first-ever-bmw-ix2-xdrive30-driving-10-2023-2250px.jpg",
    url: "https://www.press.bmwgroup.com/usa/article/detail/T0437576EN_US/the-all-new-2024-bmw-x2?language=en_US",
    caption: "2024 BMW X2 and iX2, compact SUV coupe in clean official motion.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://group.mercedes-benz.com/bilder/produkte/pkw/mercedes-benz/cla-2025/mercedes-benz-cla-2025-01-w1680xh945-cutout.jpg?im=AspectCrop%3D%289%2C4%29%2CxPosition%3D0%2CyPosition%3D0.5&impolicy=acrop",
    url: "https://group.mercedes-benz.com/company/news/cla-car-of-the-year-2026.html",
    caption: "Mercedes-Benz CLA, sunset white paint and compact luxury future.",
    shape: "cinema",
    focus: "center 53%",
  },
  {
    image: "https://group.mercedes-benz.com/bilder/produkte/pkw/mercedes-benz/cla-2025/mercedes-benz-cla-2025-weltpremiere-02-w614xh345-cutout.jpg?im=AspectCrop%3D%284%2C3%29%2CxPosition%3D0.5%2CyPosition%3D0&impolicy=acrop",
    url: "https://group.mercedes-benz.com/company/news/cla-car-of-the-year-2026.html",
    caption: "Mercedes-Benz CLA in red, compact sedan dream-car energy on a mountain road.",
    shape: "wide",
    focus: "center 50%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/128049/images/b7b9b3a54ec0babd478998a6d901a5fd61f1e39b/A250945_web_2880.jpg?1749650205",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-q3-suv-128049",
    caption: "Audi Q3, compact SUV with glossy official-photo confidence.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/128050/images/07272f424b9a5bcff8f74a7f6c2f5a20e883460e/A250946_web_2880.jpg?1749803344",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-q3-suv-128050",
    caption: "Audi Q3, sharp compact-SUV proportions in clean press-gallery light.",
    shape: "wide",
    focus: "center 51%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/127853/images/290cc5628d8019a9a35b4d1ed10a5104596dff6c/A250749_web_2880.jpg?1747923257",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-a3-sportback-tfsi-e-127853",
    caption: "Audi A3 Sportback TFSI e, compact hatchback in a proper wallpaper-grade action shot.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/127850/images/c814e0d2986df5d36ffcc7bb2e900c81dfd81ad8/A250746_web_2880.jpg?1747923255",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-a3-sportback-tfsi-e-127850",
    caption: "Audi A3 Sportback, clean white compact with future-garage taste.",
    shape: "cinema",
    focus: "center 53%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/124860/images/afbf9920906f0243c1d902240e03ccf56efb4589/A242749_web_2880.jpg?1718874290",
    url: "https://www.audi-mediacenter.com/en/photos/detail/lap-record-for-audi-sport-in-the-compact-segment-124860",
    caption: "Audi RS 3, small sharp sedan energy, official track-day polish.",
    shape: "wide",
    focus: "center 51%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90543018&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90543018/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI John Cooper Works Countryman, compact crossover with punchy official-photo drama.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/cache/P9/202403/P90542996/P90542996-mini-john-cooper-works-countryman-03-2024-2250px.jpg",
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90542996/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI Countryman, compact premium SUV mood without giant-car bulk.",
    shape: "wide",
    focus: "center 52%",
  },
];

carItems.push(
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90572398&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW 2 Series Gran Coupe, another official angle with compact luxury polish.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90572399&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, sharp official side profile.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90572401&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW 2 Series Gran Coupe, compact sedan in clean studio light.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90572403&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, glossy official-gallery stance.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90572410&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW compact sedan, polished wheel-and-body drama.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90525103&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/article/detail/T0437576EN_US/the-all-new-2024-bmw-x2?language=en_US",
    caption: "BMW X2 M35i, compact SUV motion shot in official light.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90526444&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/article/detail/T0437576EN_US/the-all-new-2024-bmw-x2?language=en_US",
    caption: "BMW X2 M35i, small crossover coupe with studio polish.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90526454&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/article/detail/T0437576EN_US/the-all-new-2024-bmw-x2?language=en_US",
    caption: "BMW X2, compact SUV details in clean official framing.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/127895/images/957c20c3791cbf52ae3475f678271487efdd3f95/A250791_web_2880.jpg?1748436325",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-q3-suv-127895",
    caption: "Audi Q3, compact SUV in a wide official hero frame.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/128051/images/28b864175b6f35876edb5af8a3fc54dfa7e61d51/A250947_web_2880.jpg?1749650114",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-q3-suv-128051",
    caption: "Audi Q3, glossy official compact-SUV angle.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/126504/images/9f28633676145742c2d7b4c8dfe655055ccd9c72/A244352_web_2880.jpg?1728460591",
    url: "https://www.audi-mediacenter.com/en/press-releases/more-powerful-and-efficient-than-ever-the-new-a3-sportback-tfsi-e-16301",
    caption: "Audi A3 Sportback TFSI e, compact hatchback with clean electric polish.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/127844/images/6053422634b8200365c67ff7b046cbdf1452d50c/A250740_web_2880.jpg?1747923248",
    url: "https://www.audi-mediacenter.com/en/press-releases/more-powerful-and-efficient-than-ever-the-new-a3-sportback-tfsi-e-16301",
    caption: "Audi A3, compact future-garage inspiration in official light.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/127845/images/eb7b0616ae1f2e800a60199af6ae9557d92bceef/A250741_web_2880.jpg?1747923247",
    url: "https://www.audi-mediacenter.com/en/press-releases/more-powerful-and-efficient-than-ever-the-new-a3-sportback-tfsi-e-16301",
    caption: "Audi A3 Sportback, clean compact hatchback dream.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/124849/images/bad6453d11e7d3705523e3fc1ea72345c2774f4b/A242738_web_2880.jpg?1718705696",
    url: "https://www.audi-mediacenter.com/en/photos/detail/lap-record-for-audi-sport-in-the-compact-segment-124849",
    caption: "Audi RS 3, compact sedan track shot with official polish.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/124852/images/c701ea62ded3a4ed701b87beb6c43b97674dfdea/A242741_web_2880.jpg?1718705681",
    url: "https://www.audi-mediacenter.com/en/press-releases/back-on-track-lap-record-for-audi-sport-in-the-compact-segment-16057",
    caption: "Audi RS 3, small fast sedan in official action light.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/124858/images/b012bb06448b68ff62cb19968db8438b11c938b7/A242747_web_2880.jpg?1718704979",
    url: "https://www.audi-mediacenter.com/en/press-releases/back-on-track-lap-record-for-audi-sport-in-the-compact-segment-16057",
    caption: "Audi RS 3, compact track-day wallpaper energy.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90542997&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90542997/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI Countryman JCW, compact crossover in official motion.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90543008&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90543008/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI Countryman, punchy little SUV with clean press energy.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90543009&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90543009/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI Countryman, compact premium crossover in official framing.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90543011&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90543011/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI JCW Countryman, small SUV dopamine in a gallery shot.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90543025&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90543025/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI Countryman JCW, playful compact crossover polish.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90543026&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90543026/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI Countryman, official compact-SUV inspiration frame.",
    shape: "wide",
    focus: "center 52%",
  }
);

function uniqueBySource(list) {
  const seen = new Set();
  return list.filter((item) => {
    const key = item.image || item.file || item.url || item.caption;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function interleaveGroups(groups) {
  const longest = Math.max(...groups.map((group) => group.length));
  const interleaved = [];
  for (let index = 0; index < longest; index += 1) {
    groups.forEach((group) => {
      if (group[index]) interleaved.push(group[index]);
    });
  }
  return interleaved;
}

// Current Haerin Commons files are from under-18 shoots; add confirmed adult-era files here.
const adultHaerinFiles = new Set([]);

function isAllowedCameo(item) {
  if (blockedCameoFiles.has(item.file)) return false;
  if (casualCameoFiles.has(item.file)) return false;
  if (item.person === "Haerin" && !adultHaerinFiles.has(item.file)) return false;
  return true;
}

function glamCaption(item) {
  if (!item.person) return item;
  const source = `${item.file || ""} ${item.caption || ""}`.toLowerCase();
  let mood = "polished editorial glow";
  if (/concert|stage|mma|mama|melon|golden|disc|synk|dive|k-link/.test(source)) {
    mood = "stage-glam frame";
  } else if (/miu|miu|bvlgari|tommy|dyson|rimowa|photocall|launch|event/.test(source)) {
    mood = "sleek fashion-event frame";
  } else if (/olens|kérastase|kerastase|mise-en-scene|beauty|marie claire/.test(source)) {
    mood = "beauty-editorial close-up";
  }

  return { ...item, caption: `${item.person} cameo, ${mood}.` };
}

function glamScore(item) {
  const source = `${item.file || ""} ${item.caption || ""}`.toLowerCase();
  if (/concert|stage|mma|mama|melon|golden|disc|synk|dive|k-link/.test(source)) return 3;
  if (/miu|bvlgari|tommy|dyson|rimowa|photocall|launch|event/.test(source)) return 2;
  if (/olens|kérastase|kerastase|mise-en-scene|beauty|marie claire/.test(source)) return 1;
  return 0;
}

function buildCameoPool(list) {
  const clean = uniqueBySource(list.filter(isAllowedCameo).map(glamCaption));
  const grouped = ["Hanni", "Wonyoung", "Ningning"]
    .map((person) => clean
      .filter((item) => item.person === person)
      .map((item, index) => ({ item, index, score: glamScore(item) }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map(({ item }) => item))
    .filter((group) => group.length);

  return interleaveGroups(grouped);
}

const carInterval = 5;
const cameoInterval = 9;
const foodItems = uniqueBySource(baseItems.filter((item) => !item.file || !skippedFiles.has(item.file)));
const kpopItems = buildCameoPool(cameoItems);
const dreamCarItems = uniqueBySource(carItems);

function cycleItem(pool, index) {
  return pool[index % pool.length];
}

function imageFor(item) {
  return item.image || commonsImage(item.file, item.width || 1800);
}

function sourceFor(item) {
  return item.url || commonsSource(item.file);
}

function createTile(item, index) {
  const link = document.createElement("a");
  link.className = `tile tile--${item.shape || "standard"}`;
  link.href = sourceFor(item);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", item.caption);
  if (item.focus) {
    link.style.setProperty("--focus", item.focus);
  }

  const img = document.createElement("img");
  img.src = imageFor(item);
  img.alt = "";
  img.loading = index < 18 ? "eager" : "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => link.remove(), { once: true });

  const caption = document.createElement("span");
  caption.className = "caption";
  const captionText = document.createElement("span");
  captionText.textContent = item.caption;
  caption.append(captionText);

  link.append(img, caption);
  return link;
}

const batchSize = 64;

function columnCount() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1200;
  if (width <= 560) return 2;
  if (width <= 820) return 3;
  if (width <= 1180) return 4;
  return Math.max(4, Math.min(6, Math.floor(width / 340)));
}

function shapeScore(item) {
  return {
    cinema: 0.72,
    hero: 1.6,
    portrait: 1.45,
    square: 1,
    tall: 1.75,
    wide: 0.63,
  }[item.shape || "standard"] || 1.25;
}

function layoutWall(wall, renderedItems) {
  const count = columnCount();
  const columns = Array.from({ length: count }, () => {
    const column = document.createElement("div");
    column.className = "masonry-column";
    return column;
  });
  const heights = Array.from({ length: count }, () => 0);

  renderedItems.forEach((item, index) => {
    let target = 0;
    for (let i = 1; i < heights.length; i += 1) {
      if (heights[i] < heights[target]) target = i;
    }
    columns[target].append(createTile(item, index));
    heights[target] += shapeScore(item) + 0.03;
  });

  wall.style.setProperty("--columns", count);
  wall.replaceChildren(...columns);
}

function render() {
  const main = document.createElement("main");
  main.className = "image-app";
  main.setAttribute("aria-label", "Food source wall");

  const wall = document.createElement("div");
  wall.className = "wall";

  const marker = document.createElement("span");
  marker.className = "corner-mark";
  marker.setAttribute("aria-hidden", "true");

  const sentinel = document.createElement("div");
  sentinel.className = "sentinel";
  sentinel.setAttribute("aria-hidden", "true");

  let batch = 0;
  let foodIndex = 0;
  let carIndex = 0;
  let cameoIndex = 0;
  const renderedItems = [];
  const appendBatch = () => {
    const nextItems = [];

    while (nextItems.length < batchSize) {
      const position = foodIndex + 1;
      nextItems.push(cycleItem(foodItems, foodIndex));

      if (position % carInterval === 0) {
        nextItems.push(cycleItem(dreamCarItems, carIndex));
        carIndex += 1;
      }

      if (position % cameoInterval === 0) {
        nextItems.push(cycleItem(kpopItems, cameoIndex));
        cameoIndex += 1;
      }

      foodIndex += 1;
    }

    renderedItems.push(...nextItems);
    layoutWall(wall, renderedItems);
    batch += 1;
    sentinel.dataset.batch = String(batch);
  };

  appendBatch();
  appendBatch();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        appendBatch();
      }
    }, { rootMargin: "1800px 0px" });
    observer.observe(sentinel);
  } else {
    window.addEventListener("scroll", () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 1800;
      if (nearBottom) appendBatch();
    }, { passive: true });
  }

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => layoutWall(wall, renderedItems), 140);
  }, { passive: true });

  main.append(wall, marker, sentinel);
  app.replaceChildren(main);
}

render();
