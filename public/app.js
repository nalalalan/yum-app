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
  "Ramen Bowl 2.jpg",
  "Ramen with eggs.jpg",
  "Bowl of miso ramen.jpg",
  "Tonkotsu ramen.jpg",
  "Tonkotsu ramen in Tokyo.jpg",
  "Free-photo-of-a-bowl-of-ramen-with-eggs-and-meat.jpg",
  "Bottle soju.jpg",
  "Soju in korean restaurant.JPG",
  "Oppa Lychee Soju.jpg",
  "Soft Shelled Crab on Sushi Rice - Arintji (69449046).jpg",
  "Soft shell crab (3196520484).jpg",
  "Spider hand roll.jpg",
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

const eunchaeItems = [
  {
    person: "Eunchae",
    file: "Hong Eunchae of Le Sserafim, January 10, 2025.png",
    caption: "Eunchae cameo, adult-era Coach photocall softness.",
    shape: "portrait",
    focus: "center 34%",
    width: 1500,
  },
  {
    person: "Eunchae",
    file: "Le Sserafim at 2026 Golden Disc awards.png",
    caption: "Eunchae with LE SSERAFIM, pink ruffle awards styling.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Eunchae",
    file: "Le Sserafim at the 2026 Golden Disc Awards.png",
    caption: "Eunchae with LE SSERAFIM, polished pink-and-white awards frame.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Eunchae",
    file: "Easy Crazy Hot Tour in Seattle - le sserafim (54795963372).jpg",
    caption: "Eunchae with LE SSERAFIM, white tour styling under red light.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Eunchae",
    file: "Easy Crazy Hot Tour in Seattle - le sserafim (54795963367).jpg",
    caption: "Eunchae with LE SSERAFIM, crisp white tour styling.",
    shape: "wide",
    focus: "center 42%",
    width: 1500,
  },
  {
    person: "Eunchae",
    file: "Le Sserafim in Manila (2025).jpg",
    caption: "Eunchae with LE SSERAFIM, pink tour styling under soft lights.",
    shape: "wide",
    focus: "center 42%",
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

const cameoItems = interleaveGroups([haerinItems, ningningItems, wonyoungItems]);

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

const livePerformanceCameoFiles = new Set([
  "NINGNING (54295363093).jpg",
  "250111 aespa Ningning.jpg",
  "241005 Ningning K-Link Festival 02.jpg",
  "241005 Ningning K-Link Festival.jpg",
  "250315 Ningning at SYNK PARALLEL LINE Encore 2.jpg",
  "250315 Ningning at SYNK PARALLEL LINE Encore 3.jpg",
  "250315 Ningning at SYNK PARALLEL LINE Encore.jpg",
  "250315-16 aespa Ningning 02.jpg",
  "250316 Ningning at SYNK PARALLEL LINE Encore.jpg",
  "250316 Ningning at SYNK PARALLEL LINE Encore 2.jpg",
  "250316 Ningning at SYNK PARALLEL LINE Encore 3.jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (1).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (2).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (3).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (4).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (5).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (6).jpg",
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
    const key = sourceKey(item);
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

const adultHaerinFiles = new Set([
  "Kang Haerin for OLENS.jpg",
  "Kang Haerin for OLENS 2.jpg",
  "Kang Haerin for OLENS 3.jpg",
  "NewJeans OLensglobal Haerin.jpg",
  "NewJeans HAERIN Dior 1.jpg",
  "NewJeans HAERIN Dior 2.jpg",
  "NewJeans HAERIN Dior 3.jpg",
]);

const featuredWonyoungFiles = new Set([
  "20241010 Wonyoung for Tommy Hilfiger 01.jpg",
  "Jang Won-young IVE Marie Claire Korea.jpg",
  "Wonyoung at Bvlgari event.png",
  "20231202 IVE's Jang Wonyoung at the MAMA2023 02.png",
  "JANG WON YOUNG (장원영) – MIUMIU PHOTOCALL – 2025.06.20 – P1.jpg",
  "JANG WON YOUNG (장원영) – MIUMIU PHOTOCALL – 2025.06.20 – P2.jpg",
  "Jang Won Young 2025.jpg",
  "Jang Won-young at the 2024 Melon Music Awards-2.png",
  "Jang Won-young January 29, 2026 (1).png",
  "Jang Won-young January 29, 2026 (2).png",
  "Jang Won-young of Ive, April 16, 2025.png",
  "Jang Wonyoung 장원영 Kérastase’s NEW Ambassador 01.jpg",
  "Jang Wonyoung 장원영 Kérastase’s NEW Ambassador 04.jpg",
  "Jang Wonyoung 장원영 Kérastase’s NEW Ambassador 09.jpg",
  "Jang Wonyoung 장원영 Kérastase’s NEW Ambassador 10.jpg",
  "장원영 (JANG WONYOUNG) - RIMOWA - 2023.05.13 P1.jpg",
  "장원영 (JANG WONYOUNG) - RIMOWA - 2023.05.13 P2.jpg",
  "Wonyoung in 2025.png",
  "Wonyoung in January 2026.png",
  "Jang Won-young of Ive, March 27, 2025.png",
  "Jang Won-young for Dyson April 2026.png",
  "Jang Won-young at the Dyson Launch Event, April 23, 2026 (1).png",
  "Jang Won-young at the Dyson Launch Event, April 23, 2026 (4).png",
  "Jang Won-young at the Miu Miu Beauty event, April 6, 2026 (1).png",
  "Jang Won-young at the Miu Miu Beauty event, April 6, 2026 (3).png",
  "Jang Won-young at the 40th Golden Disc Awards, January 10, 2026 (1).png",
]);

const adultEunchaeFiles = new Set([
  "Hong Eunchae of Le Sserafim, January 10, 2025.png",
  "Le Sserafim at 2026 Golden Disc awards.png",
  "Le Sserafim at the 2026 Golden Disc Awards.png",
  "Easy Crazy Hot Tour in Seattle - le sserafim (54795963372).jpg",
  "Easy Crazy Hot Tour in Seattle - le sserafim (54795963367).jpg",
  "Le Sserafim in Manila (2025).jpg",
]);

const allowedCameoPeople = new Set(["Haerin", "Ningning", "Wonyoung"]);

function isAllowedCameo(item) {
  if (!allowedCameoPeople.has(item.person)) return false;
  if (blockedCameoFiles.has(item.file)) return false;
  if (casualCameoFiles.has(item.file)) return false;
  if (livePerformanceCameoFiles.has(item.file)) return false;
  if (item.person === "Haerin" && !adultHaerinFiles.has(item.file)) return false;
  if (item.person === "Wonyoung" && !featuredWonyoungFiles.has(item.file)) return false;
  if (item.person === "Eunchae" && !adultEunchaeFiles.has(item.file)) return false;
  return true;
}

function glamCaption(item) {
  if (!item.person) return item;
  if (item.person === "Eunchae") return item;
  const source = `${item.file || ""} ${item.caption || ""}`.toLowerCase();
  let mood = "polished editorial glow";
  if (/mma|mama|melon|golden|disc/.test(source)) {
    mood = "polished awards-event frame";
  } else if (/miu|miu|dior|bvlgari|tommy|dyson|rimowa|photocall|launch|event/.test(source)) {
    mood = "sleek fashion-event frame";
  } else if (/olens|kérastase|kerastase|mise-en-scene|beauty|marie claire/.test(source)) {
    mood = "beauty-editorial close-up";
  }

  return { ...item, caption: `${item.person} cameo, ${mood}.` };
}

function glamScore(item) {
  const source = `${item.file || ""} ${item.caption || ""}`.toLowerCase();
  if (/miu|dior|bvlgari|tommy|dyson|rimowa|photocall|launch|event|mma|mama|melon|golden|disc/.test(source)) return 3;
  if (/olens|kérastase|kerastase|mise-en-scene|beauty|marie claire/.test(source)) return 2;
  return 0;
}

function diversifyCameoGroup(person, items) {
  if (person !== "Haerin") return items;
  const dior = items.filter((item) => /dior/i.test(item.file || ""));
  const olens = items.filter((item) => /olens/i.test(item.file || ""));
  const other = items.filter((item) => !/dior|olens/i.test(item.file || ""));
  return interleaveGroups([dior, olens, other]);
}

function buildCameoPool(list) {
  const maxCameosPerPerson = 42;
  const clean = uniqueBySource(list.filter(isAllowedCameo).map(glamCaption));
  const grouped = new Map(["Haerin", "Ningning", "Wonyoung"]
    .map((person) => [person, diversifyCameoGroup(person, clean
      .filter((item) => item.person === person)
      .map((item, index) => ({ item, index, score: glamScore(item) }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, maxCameosPerPerson)
      .map(({ item }) => item))])
    .filter(([, group]) => group.length));

  const result = [];
  const personPattern = ["Haerin", "Ningning", "Wonyoung", "Wonyoung", "Ningning", "Wonyoung"];
  while ([...grouped.values()].some((group) => group.length)) {
    for (const person of personPattern) {
      const group = grouped.get(person);
      if (group && group.length) result.push(group.shift());
    }
  }

  return result;
}

const batchSize = 64;
const onlineBatchSize = 24;
const categories = ["food", "kpop", "car"];
const mixPattern = ["food", "kpop", "car"];
const longScrollItemsPerCategory = 144;
const foodItems = uniqueBySource(baseItems.filter((item) => !item.file || !skippedFiles.has(item.file)));
const kpopItems = buildCameoPool(cameoItems);
const dreamCarItems = uniqueBySource(carItems);

const onlineSources = [
  // Food and car Commons searches were too noisy for Yum: they pulled in package shots,
  // interiors, flowers, random street cars, and other review rejects.
  // Kpop lookups are disabled too so the late feed never turns into an idol-only wall.
];

onlineSources.forEach((source) => {
  source.category = source.category || (source.kind === "car" ? "car" : "food");
});

const blockedOnlineTitleTerms = [
  "ai generated",
  "artificial intelligence",
  "drawing",
  "diagram",
  "illustration",
  "logo",
  "map",
  "menu",
  "raw meat",
  "uncooked",
  "onion",
  "chili",
  "chilli",
  "jalapeno",
  "pepper",
  "spicy",
  "curry",
  "indian",
  "mediterranean",
  "airport",
  "concert",
  "festival",
  "live",
  "microphone",
  "music bank",
  "radio",
];

const onlineSourceIndex = { food: 0, kpop: 0, car: 0 };

function imageFor(item) {
  return item.image || commonsImage(item.file, item.width || 1800);
}

function sourceFor(item) {
  return item.url || commonsSource(item.file);
}

function normalizeSourceText(value) {
  try {
    return decodeURIComponent(String(value || ""));
  } catch {
    return String(value || "");
  }
}

function canonicalFileKey(value) {
  const raw = String(value || "");
  if (!raw) return "";
  const withoutQuery = raw.split("?")[0];
  let fileName = withoutQuery;
  try {
    fileName = new URL(raw, "https://yum.aolabs.io/").pathname.split("/").pop() || withoutQuery;
  } catch {
    fileName = withoutQuery.split("/").pop() || withoutQuery;
  }

  const normalized = normalizeSourceText(fileName)
    .replace(/^file:/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  return /\.(jpe?g|png|webp)$/i.test(normalized) ? `file:${normalized}` : "";
}

function sourceKey(item) {
  if (item.repeatKey) return item.repeatKey;

  const primary = item.sourceId || item.file || item.original || item.image || item.url || item.caption || "";
  const fileKey = canonicalFileKey(primary);
  if (fileKey) return fileKey;

  return normalizeSourceText(primary)
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function taggedItems(items, category) {
  return items.map((item) => ({ ...item, category }));
}

function longScrollItems(items, category, targetCount = longScrollItemsPerCategory) {
  if (!items.length) return [];

  return Array.from({ length: targetCount }, (_, index) => {
    const cycle = Math.floor(index / items.length);
    const sourceIndex = (index + cycle * 7) % items.length;
    const item = items[sourceIndex];
    return {
      ...item,
      category,
      repeatKey: `${category}:${cycle}:${sourceKey(item)}`,
    };
  });
}

function createFeedState() {
  const queues = {
    food: longScrollItems(foodItems, "food"),
    kpop: longScrollItems(kpopItems, "kpop"),
    car: longScrollItems(dreamCarItems, "car"),
  };
  const queuedKeys = new Set(categories.flatMap((category) => queues[category].map(sourceKey)));
  return {
    queues,
    queuedKeys,
    seenKeys: new Set(),
    patternIndex: 0,
    exhausted: false,
  };
}

function enqueueUnique(state, category, item) {
  if (!item) return false;
  const nextItem = { ...item, category: item.category || category };
  const key = sourceKey(nextItem);
  if (!key || state.seenKeys.has(key) || state.queuedKeys.has(key)) return false;
  state.queuedKeys.add(key);
  state.queues[category].push(nextItem);
  return true;
}

function dequeueUnique(state, category) {
  const queue = state.queues[category] || [];
  while (queue.length) {
    const item = queue.shift();
    const key = sourceKey(item);
    if (state.seenKeys.has(key)) continue;
    state.seenKeys.add(key);
    return item;
  }
  return null;
}

function fallbackCategories(preferred) {
  const fallback = categories.filter((category) => category !== preferred);
  if (preferred !== "kpop") {
    return [preferred, ...fallback.filter((category) => category !== "kpop")];
  }
  return [preferred, ...fallback];
}

function hasQueuedNonKpop(state) {
  return categories
    .filter((category) => category !== "kpop")
    .some((category) => (state.queues[category] || []).length > 0);
}

function hasRenderedNonKpop(items) {
  return items.some((item) => categoryFor(item) !== "kpop");
}

function buildUniqueFeed() {
  const state = createFeedState();
  const feed = [];
  let misses = 0;

  while (misses < mixPattern.length * categories.length) {
    const preferred = mixPattern[state.patternIndex % mixPattern.length];
    state.patternIndex += 1;
    let item = null;
    for (const category of fallbackCategories(preferred)) {
      item = dequeueUnique(state, category);
      if (item) break;
    }
    if (!item) {
      misses += 1;
      continue;
    }
    feed.push(item);
    misses = 0;
  }

  return feed;
}

function cleanOnlineTitle(title) {
  return normalizeSourceText(title || "")
    .replace(/^file:/i, "")
    .replace(/\.(jpe?g|png|webp)$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasRequiredOnlineTerms(title, source) {
  if (!source.requireAny || !source.requireAny.length) return true;
  const lower = title.toLowerCase();
  return source.requireAny.some((term) => lower.includes(term));
}

function isBlockedOnlineTitle(title) {
  const lower = title.toLowerCase();
  return blockedOnlineTitleTerms.some((term) => lower.includes(term));
}

function shapeFromDimensions(width, height, fallback = "portrait") {
  const ratio = width / Math.max(height, 1);
  if (ratio >= 1.75) return "cinema";
  if (ratio >= 1.18) return "wide";
  if (ratio <= 0.6) return "tall";
  if (ratio <= 0.86) return "portrait";
  return fallback;
}

function onlineCaption(source, pageTitle) {
  const title = cleanOnlineTitle(pageTitle);
  return `${source.label} online find${title ? `: ${title}.` : "."}`;
}

function commonsSearchUrl(source) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrsearch: source.query,
    gsrlimit: "36",
    prop: "imageinfo",
    iiprop: "url|mime|size",
    iiurlwidth: "2200",
    format: "json",
    origin: "*",
  });

  if (source.offset) {
    params.set("gsroffset", String(source.offset));
  }

  return `https://commons.wikimedia.org/w/api.php?${params.toString()}`;
}

function itemFromCommonsPage(source, page) {
  const info = page.imageinfo && page.imageinfo[0];
  if (!info) return null;

  const title = cleanOnlineTitle(page.title);
  const lowerTitle = title.toLowerCase();
  const width = Number(info.width) || 0;
  const height = Number(info.height) || 0;
  const mime = String(info.mime || "").toLowerCase();
  const ratio = width / Math.max(height, 1);

  if (!/^image\/(jpeg|png|webp)$/.test(mime)) return null;
  if (width < 900 || height < 650 || width * height < 900000) return null;
  if (ratio < 0.42 || ratio > 2.7) return null;
  if (!hasRequiredOnlineTerms(lowerTitle, source)) return null;
  if (isBlockedOnlineTitle(lowerTitle)) return null;

  if (source.kind === "car" && /dealer|dealership|auction|sale|crash|wreck|damaged|police|taxi/i.test(lowerTitle)) {
    return null;
  }

  if (source.category === "kpop" && /2020|2021|2022|2023|220|230|fan|fancam|stage|performance/i.test(lowerTitle)) {
    return null;
  }

  const fileName = String(page.title || "").replace(/^File:/i, "");
  return {
    image: info.thumburl || info.url,
    original: info.url,
    sourceId: fileName,
    url: commonsSource(fileName),
    caption: onlineCaption(source, page.title),
    category: source.category,
    person: source.person || "",
    shape: shapeFromDimensions(width, height, source.kind === "car" ? "wide" : "portrait"),
    focus: "center 50%",
  };
}

function nextOnlineSource(category) {
  const sources = onlineSources.filter((source) => source.category === category && !source.exhausted);
  if (!sources.length) return null;
  const source = sources[onlineSourceIndex[category] % sources.length];
  onlineSourceIndex[category] += 1;
  return source;
}

async function fetchOnlineSource(source) {
  if (source.maxItems && source.added >= source.maxItems) {
    source.exhausted = true;
    return [];
  }

  const response = await fetch(commonsSearchUrl(source), { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`Commons search failed: ${response.status}`);
  }

  const data = await response.json();
  const pages = Object.values((data.query && data.query.pages) || {})
    .sort((a, b) => (a.index || 0) - (b.index || 0));

  if (data.continue && data.continue.gsroffset) {
    source.offset = data.continue.gsroffset;
  } else {
    source.exhausted = true;
  }

  return pages
    .map((page) => itemFromCommonsPage(source, page))
    .filter(Boolean);
}

async function loadMoreOnlineItemsForCategory(state, category, targetCount = onlineBatchSize) {
  let added = 0;
  let attempts = 0;

  while (added < targetCount && attempts < onlineSources.length * 2) {
    const source = nextOnlineSource(category);
    if (!source) break;

    attempts += 1;
    try {
      const onlineItems = await fetchOnlineSource(source);
      onlineItems.forEach((item) => {
        if (source.maxItems && source.added >= source.maxItems) {
          source.exhausted = true;
          return;
        }
        if (enqueueUnique(state, category, item)) {
          source.added = (source.added || 0) + 1;
          added += 1;
          if (source.maxItems && source.added >= source.maxItems) source.exhausted = true;
        }
      });
    } catch {
      source.failures = (source.failures || 0) + 1;
      if (source.failures >= 2) source.exhausted = true;
    }
  }

  return added;
}

async function nextMixedItems(state, targetCount = batchSize) {
  const nextItems = [];
  let misses = 0;

  while (nextItems.length < targetCount && misses < mixPattern.length * categories.length) {
    const preferred = mixPattern[state.patternIndex % mixPattern.length];
    state.patternIndex += 1;

    if (preferred === "kpop" && !hasQueuedNonKpop(state) && !hasRenderedNonKpop(nextItems)) {
      misses += 1;
      continue;
    }

    let item = dequeueUnique(state, preferred);
    if (!item) {
      await loadMoreOnlineItemsForCategory(state, preferred, onlineBatchSize);
      item = dequeueUnique(state, preferred);
    }

    if (!item) {
      for (const category of fallbackCategories(preferred).slice(1)) {
        item = dequeueUnique(state, category);
        if (!item) {
          await loadMoreOnlineItemsForCategory(state, category, Math.ceil(onlineBatchSize / 2));
          item = dequeueUnique(state, category);
        }
        if (item) break;
      }
    }

    if (!item) {
      misses += 1;
      continue;
    }

    nextItems.push(item);
    misses = 0;
  }

  if (!nextItems.length) {
    state.exhausted = true;
  }

  return nextItems;
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

function columnCount() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1200;
  const hasCoarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  const hasTouchPoints = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
  if ((hasCoarsePointer || hasTouchPoints) && width <= 1180) return 2;
  if (width <= 900) return 2;
  if (width <= 1280) return 3;
  return Math.max(4, Math.min(6, Math.floor(width / 360)));
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

function categoryFor(item) {
  if (item.category) return item.category;
  if (item.person) return "kpop";
  if (item.kind === "car" || /bmw|mercedes|audi|mini|mediapool|uploads\.audi|mercedes-benz/i.test(item.image || "")) return "car";
  return "food";
}

function layoutWall(wall, renderedItems) {
  const count = columnCount();
  const columns = Array.from({ length: count }, () => {
    const column = document.createElement("div");
    column.className = "masonry-column";
    return column;
  });
  const heights = Array.from({ length: count }, () => 0);
  const lastCategoryByColumn = Array.from({ length: count }, () => "");

  renderedItems.forEach((item, index) => {
    const category = categoryFor(item);
    let target = 0;
    for (let i = 1; i < heights.length; i += 1) {
      const score = heights[i] + (lastCategoryByColumn[i] === category ? 0.55 : 0);
      const targetScore = heights[target] + (lastCategoryByColumn[target] === category ? 0.55 : 0);
      if (score < targetScore) target = i;
    }
    columns[target].append(createTile(item, index));
    lastCategoryByColumn[target] = category;
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

  const feedState = createFeedState();
  let exhausted = false;
  let loading = false;
  const renderedItems = [];
  const appendBatch = async () => {
    if (exhausted || loading) return;
    loading = true;
    try {
      const nextItems = await nextMixedItems(feedState, batchSize);
      if (!nextItems.length && feedState.exhausted) {
        exhausted = true;
      }

      renderedItems.push(...nextItems);
      layoutWall(wall, renderedItems);
      sentinel.dataset.remaining = String(categories.reduce((total, category) => total + feedState.queues[category].length, 0));
    } finally {
      loading = false;
    }
  };

  appendBatch();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        appendBatch().then(() => {
          if (exhausted) observer.disconnect();
        });
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
