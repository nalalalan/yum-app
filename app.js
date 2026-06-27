const app = document.getElementById("app");

function commonsImage(file, width = 1400) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

function commonsSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

function unsplashImage(id, width = 1500) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=82`;
}

function unsplashSource(query) {
  return `https://unsplash.com/s/photos/${encodeURIComponent(query).replace(/%20/g, "-")}`;
}

function bmwPressImage(id) {
  return `https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=${id}&attachment=1&actEvent=image`;
}

const baseItems = [
  { image: unsplashImage("1558030006-450675393462"), url: unsplashSource("steak dinner"), caption: "Steak sliced under moody restaurant light, crust first.", shape: "cinema", focus: "center 48%" },
  { image: unsplashImage("1571091718767-18b5b1457add"), url: unsplashSource("cheeseburger close up"), caption: "Clean cheeseburger close-up, glossy bun and sharp layers.", shape: "portrait", focus: "center 46%" },
  { image: unsplashImage("1565299507177-b0ac66763828"), url: unsplashSource("restaurant burger"), caption: "Tall restaurant burger, melted cheese, soft bun, big bite.", shape: "tall", focus: "center 48%" },
  { image: unsplashImage("1569718212165-3a8278d5f624"), url: unsplashSource("ramen egg"), caption: "Ramen with soft egg, noodles, and a rich orange glow.", shape: "portrait", focus: "center 48%" },
  { image: unsplashImage("1553621042-f6e147245754"), url: unsplashSource("sushi platter"), caption: "Sushi tray, precise rows and polished restaurant light.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1617196034796-73dfa7b1fd56"), url: unsplashSource("salmon sushi"), caption: "Salmon sushi on a black plate, clean color and quiet luxury.", shape: "cinema", focus: "center 45%" },
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
  { file: "Fettuccine Alfredo.jpg", caption: "Fettuccine Alfredo, silky sauce and soft folds.", shape: "square" },
  { file: "Cheeseburger.jpg", caption: "Cheeseburger, melted cheese and toasted bun.", shape: "square" },
  { file: "Cheese Burger - Las Vegas.jpg", caption: "Burger close-up, diner comfort and glossy bun.", shape: "portrait" },
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
  "Close-up burger and fries.jpg",
  "Fuddruckers cheeseburger and steak fries.jpg",
  "Cheeseburger and steak fries at Rentier-Burger.jpg",
  "Hamburger and fries - Grand Union, Lambeth North, London.jpg",
  "Cheeseburger and fries, Elephant Bar, Cupertino, CA.jpg",
  "Whataburger hamburger and fries.jpg",
  "Hamburger and fries - Brownswood, Finsbury Park, London.jpg",
  "2019-02-15 20 51 38 A bacon cheeseburger and french fries at the Applebee's in Fair Lakes, Fairfax County, Virginia.jpg",
  "Chicken wings at Hesburger.jpg",
  "Boneless chicken wings and fries.jpg",
  "Original Mac n Cheese .jpg",
  "Boston Market Mac and Cheese (35116783173).jpg",
  "Mac and cheese (3123345645).jpg",
  "Mac and Cheese (4999893437).jpg",
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
  "Dalian Liaoning China Homemade-Jiaotze-01.jpg",
  "Mushroom pork dumplings for lunch.jpg",
  "Mandoo - Han Guuk Guan Korean.jpg",
  "Beef Bulgogi Bento.JPG",
  "Budae jjigae 2014-12-14 (1).jpg",
  "Pulled pork with mac and cheese at the office.jpg",
  "Trenne Carbonara (3113690414).jpg",
  "Pasta Carbonara in Yl\u00e4maa.jpg",
  "Pasta Carbonara at restaurant Vltava.jpg",
  "Pasta carbonara at Gete Deli.jpg",
  "Pasta Carbonara in Vyborg (cropped).jpg",
  "Food-restaurant-dinner-lunch (24300637966).jpg",
  "Eating Pancakes (Unsplash).jpg",
  "My old mother fried chicken wings at home.jpg",
  "Mac and cheese (home cooking) August 2024.JPG",
  "Lasagne side.png",
  "Budae jjigae before boiling.jpg",
  "Tonkatsu lunch box of Japanese National Diet Library.jpg",
  "Tonkatsu lunch box of Japanese National Diet Library 2022.jpg",
  "Carbonara 2025.jpg",
  "Pasta carbonara.jpg",
  "Fettuccine Alfredo.jpg",
  "Salmon Sushi (3332911172).jpg",
  "Salmon sushi (20250322).jpg",
  "Salmon Sushi.jpg",
  "Salmon sushi.jpg",
]);

baseItems.push(
  { image: unsplashImage("1568901346375-23c9450c58cd"), url: unsplashSource("burger close up"), caption: "Stacked burger, glossy bun, clean melted-cheese pull.", shape: "portrait", focus: "center 50%" },
  { image: unsplashImage("1546069901-ba9599a7e63c"), url: unsplashSource("fried chicken"), caption: "Fried chicken, golden crunch and hot-table energy.", shape: "portrait", focus: "center 52%" },
  { image: unsplashImage("1484723091739-30a097e8f929"), url: unsplashSource("steak plate"), caption: "Steak plate, browned crust and moody restaurant finish.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1565958011703-44f9829ba187"), url: unsplashSource("pizza close up"), caption: "Pizza close-up, melted cheese and crisp edge detail.", shape: "cinema", focus: "center 52%" },
  { image: unsplashImage("1555939594-58d7cb561ad1"), url: unsplashSource("noodle bowl"), caption: "Noodle bowl, deep broth and glossy toppings.", shape: "portrait", focus: "center 48%" },
  { image: unsplashImage("1559847844-5315695dadae"), url: unsplashSource("sushi close up"), caption: "Sushi close-up, clean fish color and tight plating.", shape: "square", focus: "center 50%" },
  { image: unsplashImage("1476224203421-9ac39bcb3327"), url: unsplashSource("burger restaurant"), caption: "Restaurant burger, toasted bun and serious stack.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1481931098730-318b6f776db0"), url: unsplashSource("sushi platter"), caption: "Sushi platter, polished rows and bright fish color.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1544025162-d76694265947"), url: unsplashSource("pizza slice"), caption: "Pizza slice, melted cheese and crisp crust.", shape: "square", focus: "center 50%" },
  { image: unsplashImage("1574071318508-1cdbab80d002"), url: unsplashSource("margherita pizza"), caption: "Margherita pizza, red sauce, basil, and clean heat.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1513104890138-7c749659a591"), url: unsplashSource("pepperoni pizza"), caption: "Pepperoni pizza, loud color and classic comfort.", shape: "cinema", focus: "center 50%" },
  { image: unsplashImage("1598515214211-89d3c73ae83b"), url: unsplashSource("ramen noodles"), caption: "Ramen-style noodles, warm broth and tight bowl crop.", shape: "portrait", focus: "center 50%" },
  { image: unsplashImage("1567620905732-2d1ec7ab7445"), url: unsplashSource("breakfast pancakes"), caption: "Pancakes, soft stack and glossy breakfast light.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1550547660-d9450f859349"), url: unsplashSource("noodles close up"), caption: "Noodles close-up, glossy sauce and sharp texture.", shape: "wide", focus: "center 50%" },
);

baseItems.push(
  { file: "Bowl of Ramen (Unsplash 1RyWImEc7K4).jpg", caption: "Ramen bowl, rich broth and a clean restaurant crop.", shape: "square", focus: "center 50%" },
  { file: "Hakata ramen bowl closeup.jpg", caption: "Hakata ramen, glossy noodles and deep broth.", shape: "portrait", focus: "center 52%" },
  { file: "Hakata ramen bowl closeup second shot.jpg", caption: "Hakata ramen close frame, soft egg and savory depth.", shape: "portrait", focus: "center 52%" },
  { file: "Ramen in Peru.jpg", caption: "Ramen bowl, bright broth and a full-table feel.", shape: "wide", focus: "center 50%" },
  { file: "Ramen 2.jpg", caption: "Ramen, warm broth and tight noodle detail.", shape: "wide", focus: "center 50%" },
  { file: "Ramen 3.jpg", caption: "Ramen, clean bowl shape and glossy surface.", shape: "wide", focus: "center 50%" },
  { file: "20210212 LA\uac08\ube44.jpg", caption: "LA galbi, glossy grilled beef and a serious plate.", shape: "portrait", focus: "center 54%" },
  { file: "Beef Bulgogi Bento.JPG", caption: "Beef bulgogi bento, warm rice and saucy beef.", shape: "wide", focus: "center 50%" },
  { file: "Tukbaegi Bulgogi.jpg", caption: "Ttukbaegi bulgogi, hot broth and soft beef.", shape: "wide", focus: "center 50%" },
  { file: "Korean marinated beef -Bulgogi- (8634652350).jpg", caption: "Marinated bulgogi beef, glossy and generous.", shape: "wide", focus: "center 52%" },
  { file: "Mandoo Panfried Dumplings - Hello Cook AUD6.60.jpg", caption: "Pan-fried mandoo, browned edges and tight pleats.", shape: "wide", focus: "center 50%" },
  { file: "Mandoo - Han Guuk Guan Korean.jpg", caption: "Korean mandoo, full plate and soft wrappers.", shape: "wide", focus: "center 50%" },
  { file: "Iraqi cuisine-Mixed Shawarma platter.jpg", caption: "Mixed shawarma platter, rich meat and warm plate color.", shape: "wide", focus: "center 50%" },
  { file: "Chicken Shawarma Platter - Lavash 2025-02-10.jpg", caption: "Chicken shawarma platter, crisp edges and bright sauce.", shape: "wide", focus: "center 50%" },
  { file: "Tonkatsu by ayustety in Tokyo.jpg", caption: "Tokyo tonkatsu, golden crust and clean plating.", shape: "wide", focus: "center 50%" },
  { file: "Japanese tonkatsu.jpg", caption: "Tonkatsu, crisp cutlet and a warm dinner plate.", shape: "wide", focus: "center 50%" },
  { file: "Tonkatsu (1795368622).jpg", caption: "Tonkatsu close frame, golden crust and soft rice.", shape: "wide", focus: "center 50%" },
  { file: "Tonkatsu (3103951877).jpg", caption: "Tonkatsu plate, crunchy cutlet and rich sauce.", shape: "wide", focus: "center 50%" },
  { file: "Tonkatsu (3224306289).jpg", caption: "Tonkatsu dinner, clean cutlet slices and warm light.", shape: "wide", focus: "center 50%" },
  { file: "Korean cuisine-Kimchi bokkeumbap-01.jpg", caption: "Kimchi fried rice, deep red gloss and hot-pan comfort.", shape: "wide", focus: "center 50%" },
  { file: "A bowl of Kimchi Fried Rice.jpg", caption: "Kimchi fried rice bowl, rich color and compact comfort.", shape: "wide", focus: "center 50%" },
  { file: "Korean stew-Budae jjigae-01.jpg", caption: "Budae jjigae, bubbling broth and cozy heat.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae after boiling.jpg", caption: "Budae jjigae after boiling, glossy broth and soft steam.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae 2014-12-14 (1).jpg", caption: "Budae jjigae table frame, full pot and warm broth.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae (28048555734).jpg", caption: "Budae jjigae, dense broth and a generous pot.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae (28049377433).jpg", caption: "Budae jjigae, rich red soup and comfort-table energy.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae (28587380901).jpg", caption: "Budae jjigae, glossy broth and full dinner warmth.", shape: "wide", focus: "center 50%" },
  { file: "Fried Chicken (Unsplash).jpg", caption: "Fried chicken, golden crust and sharp table light.", shape: "wide", focus: "center 50%" },
  { file: "Steak Dinner (37335080850).jpg", caption: "Steak dinner, browned crust and warm plate light.", shape: "wide", focus: "center 52%" },
  { file: "Steak dinner at 1640 Restaurant, Quebec City, Canada.jpg", caption: "Steak dinner, rich sauce and restaurant polish.", shape: "portrait", focus: "center 50%" },
  { file: "Food-restaurant-dinner-lunch (24300637966).jpg", caption: "Restaurant dinner plate, warm meat and glossy sauce.", shape: "wide", focus: "center 50%" },
);

baseItems.push(
  { file: "HK MK \u91d1\u7532\u97d3\u570b\u6599\u7406 Gold Beetle Korean Restaurant food fried chicken wings April 2017 IX1.jpg", caption: "Korean fried chicken wings, golden and crisp.", shape: "wide", focus: "center 50%" },
  { file: "Korean fried chicken wings - 48112567596.jpg", caption: "Korean fried chicken wings, glossy sauce and crunch.", shape: "wide", focus: "center 50%" },
  { file: "Korean fried chicken wings.jpg", caption: "Korean fried chicken wings, hot-table comfort.", shape: "wide", focus: "center 50%" },
  { file: "Suwon Chicken.jpg", caption: "Suwon fried chicken, golden pieces and clean heat.", shape: "wide", focus: "center 50%" },
  { file: "Korean fried chicken with cheese flavor (Chikin).jpg", caption: "Korean fried chicken, cheese flavor and crisp crust.", shape: "wide", focus: "center 50%" },
  { file: "Korean fried chicken with honey mustard sauce.jpg", caption: "Korean fried chicken, honey mustard shine and crunch.", shape: "wide", focus: "center 50%" },
  { file: "DFC 4204 Cheesy slice pull gooey golden pizza perfection.jpg", caption: "Cheesy pizza slice pull, glossy and golden.", shape: "wide", focus: "center 50%" },
  { file: "Shoarma Carrefour Laval.jpg", caption: "Shawarma plate, warm meat and rich table color.", shape: "wide", focus: "center 50%" },
  { file: "Pancake Breakfast (Unsplash).jpg", caption: "Pancake breakfast, warm stack and clean morning light.", shape: "wide", focus: "center 50%" },
  { file: "Pancakes with Walnuts.png", caption: "Pancakes with walnuts, soft stack and warm syrup.", shape: "square", focus: "center 50%" },
  { file: "LOW CARB KETO FRIED CHICKEN by Keto Diet Delish Medium.jpg", caption: "Fried chicken close frame, crunchy crust and warm color.", shape: "wide", focus: "center 50%" },
  { file: "Tonkatsu lunch box of Japanese National Diet Library.jpg", caption: "Tonkatsu lunch box, crisp cutlet and rice.", shape: "wide", focus: "center 50%" },
  { file: "Tonkatsu lunch box of Japanese National Diet Library 2022.jpg", caption: "Tonkatsu lunch box, neat cutlet slices and warm rice.", shape: "wide", focus: "center 50%" },
);

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
    caption: "Wonyoung cameo, bare-shoulder Bvlgari event frame.",
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

function addExternalCameos(target, person, sourceUrl, entries) {
  target.push(...entries.map(([image, caption, shape = "portrait", focus = "center 38%"]) => ({
    person,
    image,
    url: sourceUrl,
    caption,
    shape,
    focus,
    width: 1800,
    sourceId: image,
    external: true,
  })));
}

function addExternalCameoItems(target, person, entries) {
  target.push(...entries.map(([image, url, caption, shape = "portrait", focus = "center 38%"]) => ({
    person,
    image,
    url,
    caption,
    shape,
    focus,
    width: 1800,
    sourceId: image,
    external: true,
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

addExternalCameoItems(wonyoungItems, "Wonyoung", [
  ["https://kpopping.com/documents/14/3/240304-WONYOUNG-INSTAGRAM-UPDATE-documents-2.jpeg", "https://kpopping.com/kpics/240304-WONYOUNG-INSTAGRAM-UPDATE", "Wonyoung cameo, black crop top and exposed belly stance.", "tall", "center 54%"],
  ["https://kpopping.com/documents/24/5/240304-WONYOUNG-INSTAGRAM-UPDATE-documents-1.jpeg", "https://kpopping.com/kpics/240304-WONYOUNG-INSTAGRAM-UPDATE", "Wonyoung cameo, crop-top midriff pose with waist visible.", "tall", "center 54%"],
  ["https://kpopping.com/documents/49/1/240304-WONYOUNG-INSTAGRAM-UPDATE-documents-7.jpeg", "https://kpopping.com/kpics/240304-WONYOUNG-INSTAGRAM-UPDATE", "Wonyoung cameo, crouched crop-top pose and visible waist.", "tall", "center 54%"],
  ["https://kpopping.com/documents/87/1/240304-WONYOUNG-INSTAGRAM-UPDATE-documents-8.jpeg", "https://kpopping.com/kpics/240304-WONYOUNG-INSTAGRAM-UPDATE", "Wonyoung cameo, black crop top with exposed belly.", "tall", "center 54%"],
  ["https://kpopping.com/documents/9b/0/240304-WONYOUNG-INSTAGRAM-UPDATE-documents-3.jpeg", "https://kpopping.com/kpics/240304-WONYOUNG-INSTAGRAM-UPDATE", "Wonyoung cameo, full-body crop-top midriff frame.", "tall", "center 55%"],
  ["https://kpopping.com/documents/c0/3/240304-WONYOUNG-INSTAGRAM-UPDATE-documents-4.jpeg", "https://kpopping.com/kpics/240304-WONYOUNG-INSTAGRAM-UPDATE", "Wonyoung cameo, full-body side pose with exposed waist.", "tall", "center 55%"],
  ["https://kpopping.com/documents/e1/2/240304-WONYOUNG-INSTAGRAM-UPDATE-documents-5.jpeg", "https://kpopping.com/kpics/240304-WONYOUNG-INSTAGRAM-UPDATE", "Wonyoung cameo, crouched crop-top pose with bare waist.", "tall", "center 55%"],
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/06/1782481985247-wnnpex-2.jpg", "https://kpopping.com/kpics/260626-wonyoung-instagram-update", "Wonyoung cameo, black crop top with visible midriff.", "tall", "center 52%"],
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/06/1782481985247-i2k9er-3.jpg", "https://kpopping.com/kpics/260626-wonyoung-instagram-update", "Wonyoung cameo, black crop top and belly-visible pose.", "tall", "center 52%"],
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/06/1782481985247-xhcrec-8.jpg", "https://kpopping.com/kpics/260626-wonyoung-instagram-update", "Wonyoung cameo, full-body crop-top midriff frame.", "tall", "center 52%"],
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/06/1782481985247-4wjo0u-10.jpg", "https://kpopping.com/kpics/260626-wonyoung-instagram-update", "Wonyoung cameo, paired crop-top waist pose.", "tall", "center 52%"],
]);

const karinaItems = [];
addExternalCameoItems(karinaItems, "Karina", [
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/06/1782433249944-96b4x5-0.jpg", "https://kpopping.com/kpics/260403-karina-instagram-update", "Karina cameo, crop-top airport stance with visible waist.", "tall", "center 44%"],
]);

const yujinItems = [];
addExternalCameoItems(yujinItems, "Yujin", [
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/02/1770895340941-on94ry-6.jpg", "https://kpopping.com/kpics/260212-an-yujin-instagram-update", "Yujin cameo, full-body crop-top pose with exposed waist.", "tall", "center 43%"],
]);

const kazuhaItems = [];
addExternalCameoItems(kazuhaItems, "Kazuha", [
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/06/1781969287435-y2h81m-7.jpg", "https://kpopping.com/kpics/260620-kazuha-instagram-update", "Kazuha cameo, mirror crop-top stance with visible midriff.", "tall", "center 46%"],
]);

const cameoItems = interleaveGroups([wonyoungItems, karinaItems, yujinItems, kazuhaItems]);

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
  "20250310 Jang Wonyoung 01.jpg",
  "20250310 Jang Wonyoung 02.jpg",
  "20250310 Jang Wonyoung 03.jpg",
  "20250310 Jang Wonyoung 04.jpg",
  "20250310 Jang Wonyoung 05.jpg",
  "20250310 Jang Wonyoung 06.jpg",
  "Jang Wonyoung 240513.jpg",
  "Jang Wonyoung 장원영 240513 01.png",
  "Jang Wonyoung 장원영 240513 02.png",
  "Jang Wonyoung 장원영 240513 03.png",
  "Jang Won Young 2025.jpg",
  "Jang Wonyoung portrait 2025.jpg",
  "Wonyoung in 2025.png",
  "Wonyoung in January 2026.png",
  "Hanni OLENS 1.jpg",
  "Hanni OLENS 2.jpg",
  "Hanni OLENSglobal.jpg",
  "NewJeans Hanni OLENS 3 (cropped).jpg",
  "NewJeans Hanni OLENS 3.jpg",
  "NewJeans Haerin Incheon Airport 1.jpg",
  "NewJeans OLensglobal Haerin.jpg",
  "Kang Haerin for OLENS 2.jpg",
  "Kang Haerin for OLENS 3.jpg",
]);

const casualCameoFiles = new Set([
  "20230905 Hanni (NewJeans).jpg",
  "IVE Wonyoung on the way to Music Bank - October 13, 2023 01.jpg",
]);

const carItems = [
  {
    image: "https://group.mercedes-benz.com/bilder/produkte/pkw/mercedes-benz/cla-2025/mercedes-benz-cla-2025-01-w1680xh945-cutout.jpg",
    url: "https://group.mercedes-benz.com/company/news/cla-car-of-the-year-2026.html",
    caption: "White Mercedes-Benz CLA, sunset paint and compact luxury future.",
    carGroup: "car:mercedes-cla-white",
    shape: "cinema",
    focus: "center 53%",
  },
];

[
  ["P90630318", "wide", "MINI John Cooper Works 2 Door hardtop, clean full-car road frame."],
  ["P90630322", "cinema", "MINI John Cooper Works 2 Door hardtop, lake-side front three-quarter stance."],
  ["P90630323", "cinema", "MINI John Cooper Works 2 Door hardtop, compact full-car exterior."],
  ["P90630324", "wide", "MINI John Cooper Works 2 Door hardtop, small-car front three-quarter hit."],
].forEach(([id, shape, caption], index) => {
  carItems.push({
    image: bmwPressImage(id),
    url: "https://www.miniusa.com/model/hardtop/2-door/john-cooper-works.html",
    caption,
    carGroup: "car:mini-cooper-2-door",
    visualGroup: `car:mini-cooper-2-door:${id}`,
    shape,
    focus: index === 0 ? "center 55%" : "center 52%",
  });
});

[
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/123466/images/8ca5985ca52960bbfc34e66fd827954bad211bce/A241355_web_2880.jpg?1709725757",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-a3-sedan-123466",
    caption: "Audi A3 Sedan, curated official full-car road exterior.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/123476/images/5afcdd90bae420f700a74ad94163f7f01e6d6b9e/A241365_web_2880.jpg?1709726540",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-a3-sedan-123476",
    caption: "Audi A3 Sedan, curated official rear exterior under clean architecture.",
    shape: "wide",
    focus: "center 52%",
  },
].forEach((item) => {
  carItems.push({
    ...item,
    carGroup: "car:audi-a3",
  });
});

[
  {
    image: "https://uploads.audi-mediacenter.com/system/production/cars/7/photos/80fd4a13ed47b3acb0d2d24aefcc366c7fec5e82/web_1440_A3_Limousine.png?1761750900",
    url: "https://www.audi-mediacenter.com/en/audi-a3-11",
    caption: "White Audi A3 Limousine sedan, clean compact official profile.",
    carGroup: "car:audi-a3-white",
    shape: "wide",
    focus: "center 52%",
  },
].forEach((item) => {
  carItems.push(item);
});

[
  ["123471", "https://uploads.audi-mediacenter.com/system/production/media/123471/images/9a1aff7a33a73083b80db7ddb1092e678ac7d3c3/A241360_web_2880.jpg?1709219631"],
  ["123268", "https://uploads.audi-mediacenter.com/system/production/media/123268/images/be87e213baf08f08e83ec01e000dc9a62d3b76ec/A241157_web_2880.jpg?1774862807"],
  ["123469", "https://uploads.audi-mediacenter.com/system/production/media/123469/images/7f3a5bb29932c0bf581defd34d0083c7a353b65b/A241358_web_2880.jpg?1709219592"],
  ["123470", "https://uploads.audi-mediacenter.com/system/production/media/123470/images/31330bd47baa1bd24d6f32f5f9567b238ebde6df/A241359_web_2880.jpg?1709219626"],
  ["123472", "https://uploads.audi-mediacenter.com/system/production/media/123472/images/ad29a031491c0637037abd3d78bbdc0aa8a10054/A241361_web_2880.jpg?1709219630"],
  ["123473", "https://uploads.audi-mediacenter.com/system/production/media/123473/images/b47b520fa41e75b56fd99d3b37697bd78cebb33a/A241362_web_2880.jpg?1709219614"],
  ["123474", "https://uploads.audi-mediacenter.com/system/production/media/123474/images/ad6ee5c93b488d5ff0fe12fee1e0f0d228989143/A241363_web_2880.jpg?1709219630"],
  ["123475", "https://uploads.audi-mediacenter.com/system/production/media/123475/images/e419aaabfdb1516e2b9b222b7783ae523b58157c/A241364_web_2880.jpg?1709219592"],
].forEach(([id, image], index) => {
  carItems.push({
    image,
    url: `https://www.audi-mediacenter.com/en/photos/detail/audi-a3-sedan-${id}`,
    caption: `Audi A3 Sedan, clean official sedan exterior ${index + 1}.`,
    carGroup: "car:audi-a3",
    shape: index % 3 === 1 ? "cinema" : "wide",
    focus: "center 52%",
  });
});

const audiA3BuildSourceUrl = "https://www.audiusa.com/A0J42547";
const audiA3BuildBaseItems = [
  ["01-front-three-quarter.jpg", "front", "cinema", "center 54%", "front three-quarter stance"],
  ["02-front-studio-stance.jpg", "front", "wide", "center 54%", "front studio stance"],
  ["03-front-low-wide.jpg", "front", "cinema", "center 55%", "low front stance"],
  ["04-front-grille-headlight.jpg", "grille", "wide", "center 52%", "black optic grille and headlight"],
  ["05-front-wheel-door-line.jpg", "front", "standard", "center 52%", "front wheel and door line"],
  ["06-front-black-optic-nose.jpg", "grille", "standard", "center 52%", "black optic front end"],
  ["07-front-cabin-roofline.jpg", "front", "wide", "center 48%", "cabin roofline"],
  ["08-front-side-sculpture.jpg", "front", "wide", "center 52%", "side sculpture"],
  ["09-front-wheel-arch.jpg", "front", "portrait", "center 54%", "front wheel arch"],
  ["10-front-sedan-profile-crop.jpg", "front", "cinema", "center 53%", "front sedan profile"],
  ["11-rear-three-quarter.jpg", "rear", "cinema", "center 54%", "rear three-quarter stance"],
  ["12-rear-side-profile.jpg", "rear", "cinema", "center 52%", "rear side profile"],
  ["13-rear-tail-light-line.jpg", "rear", "cinema", "center 52%", "tail light line"],
  ["14-rear-black-optic-bumper.jpg", "rear", "cinema", "center 52%", "black optic rear bumper"],
  ["15-rear-wheel-quarter.jpg", "rear", "standard", "center 52%", "rear wheel quarter"],
  ["16-rear-door-shoulder.jpg", "rear", "wide", "center 52%", "rear door shoulder"],
  ["17-rear-badge-deck.jpg", "rear", "wide", "center 52%", "rear badge deck"],
  ["18-rear-full-sedan-sweep.jpg", "rear", "cinema", "center 52%", "rear sedan sweep"],
  ["19-grille-hero-detail.jpg", "grille", "cinema", "center 50%", "grille hero detail"],
  ["20-grille-black-optic.jpg", "grille", "wide", "center 50%", "black optic grille texture"],
  ["21-led-headlight.jpg", "grille", "cinema", "center 50%", "LED headlight"],
  ["22-front-wheel-and-lamp.jpg", "grille", "standard", "center 55%", "wheel and lamp detail"],
  ["23-hood-reflection.jpg", "grille", "cinema", "center 50%", "hood reflection"],
  ["24-grille-texture.jpg", "grille", "wide", "center 50%", "grille texture"],
  ["25-headlight-black-paint.jpg", "grille", "cinema", "center 50%", "headlight and black paint"],
  ["26-front-detail-angle.jpg", "grille", "wide", "center 50%", "front detail angle"],
  ["27-beige-cabin-full.jpg", "cabin", "cinema", "center 50%", "Parchment Beige cabin"],
  ["28-front-seat-portrait.jpg", "cabin", "portrait", "center 42%", "front seat portrait"],
  ["29-passenger-seat-tone.jpg", "cabin", "portrait", "center 44%", "passenger seat tone"],
  ["30-rear-seat-glimpse.jpg", "cabin", "portrait", "center 48%", "rear seat glimpse"],
  ["31-console-seat-contrast.jpg", "cabin", "wide", "center 52%", "console and seat contrast"],
  ["32-beige-black-interior.jpg", "cabin", "wide", "center 50%", "beige and black interior"],
  ["33-seat-stitching-detail.jpg", "cabin", "portrait", "center 42%", "seat stitching detail"],
  ["34-open-cabin-angle.jpg", "cabin", "wide", "center 50%", "open cabin angle"],
  ["35-dashboard-full.jpg", "dashboard", "cinema", "center 50%", "dashboard full view"],
  ["36-steering-wheel-cockpit.jpg", "dashboard", "standard", "center 52%", "steering wheel cockpit"],
  ["37-center-console.jpg", "dashboard", "portrait", "center 52%", "center console"],
  ["38-dashboard-trim-wide.jpg", "dashboard", "cinema", "center 50%", "dashboard trim"],
  ["39-driver-door-controls.jpg", "dashboard", "wide", "center 52%", "driver door controls"],
  ["40-virtual-cockpit.jpg", "dashboard", "wide", "center 52%", "virtual cockpit"],
  ["41-shifter-controls.jpg", "dashboard", "standard", "center 52%", "shifter controls"],
  ["42-dashboard-center-screen.jpg", "dashboard", "cinema", "center 50%", "center screen"],
  ["43-cockpit-wide.jpg", "dashboard", "cinema", "center 50%", "cockpit wide view"],
  ["44-interior-black-beige-flow.jpg", "dashboard", "wide", "center 52%", "black and beige dashboard flow"],
  ["45-mirror-windshield-cabin.jpg", "dashboard", "cinema", "center 50%", "mirror and windshield line"],
].map(([file, visualGroup, shape, focus, detail]) => ({
  image: `/assets/audi-a3-a0j42547/${file}`,
  url: audiA3BuildSourceUrl,
  sourceId: `audi-a3-a0j42547:${file}`,
  caption: `Audi A3 A0J42547, Manhattan Gray metallic ${detail}.`,
  carGroup: "car:audi-a3-a0j42547",
  visualGroup: `car:audi-a3-a0j42547:${file.replace(/\.jpg$/i, "")}`,
  buildAngle: visualGroup,
  kind: "car",
  category: "car",
  shape,
  focus,
}));

const audiA3BuildVariantGroups = [
  ["front", 46, 25, "front build crop"],
  ["rear", 71, 25, "rear build crop"],
  ["grille", 96, 20, "black optic build crop"],
  ["cabin", 116, 20, "Parchment Beige cabin crop"],
  ["dashboard", 136, 15, "dashboard build crop"],
];

const audiA3BuildVariantItems = audiA3BuildVariantGroups.flatMap(([angle, start, count, label]) => {
  return Array.from({ length: count }, (_, index) => {
    const number = start + index;
    const file = `${String(number).padStart(3, "0")}-${angle}-build-crop-${String(index + 1).padStart(2, "0")}.jpg`;
    return {
      image: `/assets/audi-a3-a0j42547/${file}`,
      url: audiA3BuildSourceUrl,
      sourceId: `audi-a3-a0j42547:${file}`,
      caption: `Audi A3 A0J42547, Manhattan Gray metallic ${label} ${index + 1}.`,
      carGroup: "car:audi-a3-a0j42547",
      visualGroup: `car:audi-a3-a0j42547:${file.replace(/\.jpg$/i, "")}`,
      buildAngle: angle,
      kind: "car",
      category: "car",
      shape: "wide",
      focus: "center 52%",
    };
  });
});

const audiA3BuildItems = audiA3BuildBaseItems.concat(audiA3BuildVariantItems);

carItems.push(...audiA3BuildItems);

function uniqueBySource(list) {
  const seen = new Set();
  return list.filter((item) => {
    if (isBlockedContentItem(item)) return false;
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

const blockedContentTerms = [
  "loremflickr",
  "ningning",
  "kérastase",
  "kerastase",
  "suv",
  "crossover",
  "countryman",
  "hatchback",
  "sportback",
  "bmw x2",
  "bmw ix2",
  "bmw m235",
  "bmw 2 series",
  "bmw 3 series",
  "bmw m3",
  "bmw m5",
  "audi q3",
  "firefighter",
  "fire truck",
  "firetruck",
  "fire engine",
  "fire department",
  "feuerwehr",
  "werkfeuerwehr",
  "p905430",
  "vegetable",
  "vegetables",
  "veggies",
  "salad",
  "broccoli",
  "kale",
  "spinach",
  "lettuce",
  "greens",
  "leafy",
  "arugula",
  "cucumber",
  "zucchini",
  "squash",
  "pumpkin",
  "pumpkin soup",
  "tomato soup",
  "vegetable soup",
  "veggie soup",
  "plain soup",
  "carrot",
  "corn",
  "cabbage",
  "beans",
  "chickpea",
  "olives",
  "nigiri",
  "single sushi",
  "sushi close-up",
  "sushi close up",
  "isolated",
  "white background",
  "raw",
  "uncooked",
  "ingredient",
  "ingredient garnish",
  "plain garnish",
  "dry pasta",
  "uncooked pasta",
  "pasta sheets",
  "lasagna sheets",
  "lasagne sheets",
  "burger fries",
  "burger and fries",
  "hamburger and fries",
  "cheeseburger and fries",
  "cheeseburger and steak fries",
  "steak fries",
  "french fries",
  "asian noodles",
  "paella",
  "1512058564366",
  "pasta plate",
  "restaurant plate",
  "1547592166",
  "1554998171",
  "grain bowl",
  "breakfast plate",
  "new york breakfast",
  "ny breakfast",
  "empty plate",
  "restaurant exterior",
  "restaurant sign",
  "restaurant facade",
  "1498837167922",
  "1512621776951",
  "plain",
  "macaroni",
  "mac and cheese",
  "national public service platform",
  "standards information",
  "information platform",
  "sac",
  "国家标准",
  "强制性国家标准",
  "bento",
  "dosirak",
  "doshirak",
  "lunch box",
  "lunchbox",
  "boxed lunch",
  "packed lunch",
  "meal box",
  "ready meal",
  "packaged meal",
  "prepackaged",
  "pre-packed",
  "convenience store",
  "plastic container",
  "plastic box",
  "plastic tray",
  "plastic lid",
  "disposable tray",
  "takeout container",
  "takeaway container",
  "takeaway box",
  "take away container",
  "shared table",
  "restaurant table",
  "food table",
  "table spread",
  "table frame",
  "full-table",
  "dining room",
  "family meal",
  "family table",
  "family eating",
  "family drinking",
  "families eating",
  "family style meal",
  "family style meal service",
  "people eating",
  "people eating lunch",
  "people eating dinner",
  "people at table",
  "people at tables",
  "people with food",
  "food and drink people",
  "food and drink with people",
  "dinner table",
  "dining table",
  "dining tables",
  "eating at table",
  "eating lunch",
  "eating dinner",
  "meal with people",
  "at the table",
  "supper",
  "child care",
  "childcare",
  "preschool",
  "cacfp",
  "teamnutrition",
  "usdagov",
  "adult people",
  "homemade",
  "home cooking",
  "at home",
  "old mother",
  "office",
  "library",
  "national diet library",
  "1546069901",
  "old car",
  "classic car",
  "vintage",
  "purple m5",
  "green m5",
  "green m3",
  "blue m235",
  "borusan blue",
  "m3 cs",
  "e36",
  "e46",
  "e class",
  "lwb",
  "iaa",
  "frankfurt",
  "show floor",
  "motor show",
  "auto show",
  "exhibition",
  "parade",
  "sauerland",
  "youngtimer",
  "tuning show",
  "classic bmw",
  "classic mercedes",
  "classic audi",
  "traffic",
  "china",
  "stage",
  "stage lights",
  "performing",
  "performance",
  "microphone",
  "fancam",
  "festival",
  "live",
  "music bank",
  "w korea",
  "w-korea",
  "fashion week",
  "seoul fashion week",
  "editorial",
  "glam",
  "awards-night",
  "awards-event",
  "fashion-event",
  "fan concert",
  "concert-stage",
  "inkigayo",
  "mma",
  "mama",
  "golden disc",
  "marie claire",
  "bvlgari",
  "dior",
  "dyson",
  "tommy",
  "rimowa",
  "miu miu",
  "photocall",
  "launch event",
  "beauty event",
  "face-only",
  "headshot",
  "forehead",
  "close frame",
  "241029-new-jeans-instagram-update-haerin",
  "haerin-documents-6",
];

const disallowedCarPattern = /firefighter|fire truck|firetruck|fire engine|fire department|feuerwehr|werkfeuerwehr|p905430|suv|crossover|countryman|hatchback|sportback|bmw x[1-7]|bmw ix[1-7]|audi q[2-8]|cayenne|macan|classic|vintage|oldtimer|youngtimer|old car|museum|exhibition|motor show|auto show|show floor|auto zuerich|sauerland|tuning show|moscow|iaa|frankfurt|parade|traffic|china|lwb|e class|w212|v212|e30|e34|e36|e39|e46|e60|e90|e92|e93|f30|w124|w201|w202|w203|w204|\b(?:199[0-9]|200[0-9]|201[0-9])\b/i;
const carIdentityPattern = /bmw|mercedes|benz|audi|mini|sedan|gran coupe|\bm235\b|\bm3\b|3 series|\bcla\b|\bc-class\b|\b(?:a3|a4|a5|s3|rs3)\b|mediapool|uploads\.audi|mercedes-benz/i;
const miniTwoDoorPattern = /\bmini\b.{0,60}(?:john cooper works|jcw|cooper(?:\s+s|\s+d)?).{0,60}(?:2[-\s]?door|two[-\s]?door|3[-\s]?door|three[-\s]?door|hardtop)|(?:2[-\s]?door|two[-\s]?door|3[-\s]?door|three[-\s]?door|hardtop).{0,60}\bmini\b.{0,60}(?:john cooper works|jcw|cooper)/i;
const bmwBrandVehiclePattern = /\b(?:bmw|m235|m240i|330i|m340i|m3|m5|2 series|3 series|5 series)\b|car:bmw-|the-new-bmw/i;
const audiBrandPattern = /\baudi\b|uploads\.audi|audi-mediacenter|car:audi-/i;
const audiA3OnlyPattern = /a0j42547|car:audi-a3(?:\b|-)|\baudi[-\s]?a3\b|\ba3[-\s]?sedan\b|\ba3[-\s]?limousine\b|\ba3\b.{0,48}\baudi\b|\baudi\b.{0,48}\ba3\b/i;
const dislikedCarGroups = new Set([
  "car:bmw-m235-white",
  "car:bmw-m5-green",
  "car:bmw-m5-purple",
  "car:bmw-m3",
  "car:bmw-m235-gran-coupe",
  "car:bmw-330i",
  "car:bmw-m340i",
  "car:bmw-3-series",
  "car:bmw-sedan",
  "car:audi-a4",
  "car:audi-a5",
  "car:audi-a5-white",
  "car:audi-s3-white",
  "car:audi-rs3",
  "car:audi-rs3-white",
  "car:audi-sedan",
]);
const likedCarGroups = new Set([
  "car:audi-a3-a0j42547",
  "car:mini-cooper-2-door",
  "car:mercedes-cla-white",
  "car:audi-a3",
  "car:audi-a3-white",
]);
const dislikedCarTastePattern = /(?:purple|green).{0,40}\bm5\b|\bm5\b.{0,40}(?:purple|green)|green.{0,40}\bm3\b|\bm3\b.{0,40}green|blue.{0,40}\bm235\b|\bm235\b.{0,40}(?:blue|borusan)|borusan blue|\bm3 cs\b|\bbmw\b|m235|m240i|330i|m340i|\bm3\b|\bm5\b/i;
const likedCarTastePattern = /a0j42547|manhattan gray|black optic|premium plus|parchment beige|mini.{0,24}(?:cooper|john cooper works|jcw).{0,24}(?:2[-\s]?door|hardtop)|white|alpine white|gran coupe|\bcla\b|a3 limousine|\baudi\b.{0,32}\ba3\b/i;
const blockedCarCompositionSourcePattern = /A241157|A241355|A241358|A241359|A241360|A241362|A241363|A241364|A241365|A244441|A244450|A244458|P90549619|P90549623|audi-a3-a0j42547:(?:11-rear-three-quarter|18-rear-full-sedan-sweep)/i;
const carCompositionImageRejectPattern = /aspectcrop|system\/production\/cars\/|web_1440_[^?\s]+limousine/i;
const carCompositionRejectPattern = /side\s*(?:view|profile)|\bprofile\b|crop|cropped|close-up|close up|detail|grille|headlight|tail\s*light|taillight|wheel|arch|badge|bumper|shoulder|interior|cabin|dashboard|cockpit|console|seat|shifter|door controls|trim|roofline|sculpture|texture|vent|mirror|windshield|hood reflection/i;
const carCompositionPreferPattern = /front[-\s]?three[-\s]?quarter|rear[-\s]?three[-\s]?quarter|full[-\s]?car|whole car|road|motion|driving|exterior|stance|architecture|low clean frame|hero frame/i;

function isMiniTwoDoorText(text) {
  return miniTwoDoorPattern.test(text) && !/countryman|aceman|clubman|crossover|suv/i.test(text);
}

function isBmwBrandVehicleText(text) {
  return bmwBrandVehiclePattern.test(text) && !isMiniTwoDoorText(text);
}

function isAllowedAudiA3Text(text) {
  return audiA3OnlyPattern.test(text);
}

function isDisallowedAudiText(text) {
  return audiBrandPattern.test(text) && !isAllowedAudiA3Text(text);
}

function isDisallowedCarText(text) {
  if (isBmwBrandVehicleText(text)) return true;
  if (isDisallowedAudiText(text)) return true;
  if (isMiniTwoDoorText(text)) return false;
  return disallowedCarPattern.test(text);
}

function carCompositionDescriptor(item, fallbackText = "") {
  const descriptor = [
    item && item.file,
    item && item.sourceId,
    item && item.caption,
    item && item.visualGroup,
    item && item.buildAngle,
  ].map((value) => normalizeSourceText(value || "").toLowerCase()).join(" ");
  return descriptor.trim() || fallbackText;
}

function carCompositionImageText(item) {
  return [
    item && item.image,
    item && item.original,
  ].map((value) => normalizeSourceText(value || "").toLowerCase()).join(" ");
}

function carCompositionRejected(item, text = "") {
  const shape = String(item && item.shape || "");
  if (shape && !/^(wide|cinema)$/i.test(shape)) return true;
  const imageText = carCompositionImageText(item);
  if (blockedCarCompositionSourcePattern.test(imageText)) return true;
  if (carCompositionImageRejectPattern.test(imageText)) return true;
  if (blockedCarCompositionSourcePattern.test(carCompositionDescriptor(item, text))) return true;
  return carCompositionRejectPattern.test(carCompositionDescriptor(item, text));
}

function carTasteRejected(item, text = "") {
  const group = (item && item.carGroup) || carGroupFor(item, text);
  if (group && dislikedCarGroups.has(group)) return true;
  if (isDisallowedAudiText(`${text} ${group || ""}`)) return true;
  return dislikedCarTastePattern.test(text) || carCompositionRejected(item, text);
}

function carTasteScore(item, text = "") {
  const group = (item && item.carGroup) || carGroupFor(item, text);
  const compositionText = carCompositionDescriptor(item, text);
  let score = 0;
  if (group && likedCarGroups.has(group)) score += 8;
  if (/a0j42547|manhattan gray|black optic|premium plus|parchment beige/i.test(text)) score += 12;
  if (/mini-cooper-2-door|mercedes-cla-white|audi-a3-white/i.test(group || "")) score += 4;
  if (likedCarTastePattern.test(text)) score += 4;
  if (carCompositionPreferPattern.test(compositionText)) score += 6;
  if (/white|alpine white/i.test(text)) score += 3;
  if (/mini|cooper|john cooper works|jcw|2[-\s]?door|hardtop/i.test(text)) score += 14;
  if (isAllowedAudiA3Text(text)) score += 3;
  if (/side\s*(?:view|profile)|\bprofile\b|crop|cropped|interior|cupholder|gear|dashboard|seat|vent|console|badge|emblem|detail|grille|wheel|headlight/i.test(compositionText)) score -= 12;
  if (carTasteRejected(item, text)) score -= 40;
  return score;
}

function prioritizeCarItems(list) {
  const grouped = new Map();
  list
    .filter((item) => !carTasteRejected(item, curationText(item, { category: "car" })))
    .map((item, index) => ({ item, index, score: carTasteScore(item, curationText(item, { category: "car" })) }))
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .forEach((entry) => {
      const text = curationText(entry.item, { category: "car" });
      const group = entry.item.carGroup || carGroupFor(entry.item, text) || sourceKey(entry.item) || `car:${entry.index}`;
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group).push(entry);
    });

  const groups = Array.from(grouped.values())
    .sort((left, right) => right[0].score - left[0].score || left[0].index - right[0].index)
    .map((group) => group.map(({ item }) => item));

  return interleaveGroups(groups);
}

function isBlockedContentItem(item) {
  const category = categoryFor(item);
  const text = [
    item && item.person,
    item && item.file,
    item && item.caption,
    item && item.carGroup,
    item && item.sourceId,
    item && item.metadataText,
    item && item.image,
    item && item.url,
  ].map((value) => normalizeSourceText(value || "").toLowerCase()).join(" ");

  if (carIdentityPattern.test(text) && isDisallowedCarText(text)) return true;
  if (carIdentityPattern.test(text) && carTasteRejected(item, text)) return true;
  if (category === "kpop") {
    return kpopHardRejectPattern.test(text);
  }
  if (category === "food" && weakFoodScenePattern.test(text)) return true;
  if (category === "car" && isMiniTwoDoorText(text)) {
    return blockedContentTerms.some((term) => term !== "hatchback" && text.includes(term));
  }
  return blockedContentTerms.some((term) => text.includes(term));
}

const weakFoodScenePattern = /shared table|restaurant table|food table|table spread|table frame|full-table|dining room|family(?: meal| table| eating| drinking| style meal(?: service)?)?|families eating|people (?:eating|at tables?|with food)|food and drink (?:with )?people|dinn?er table|dining tables?|eating (?:at table|lunch|dinner)|meal with people|at the table|supper|\b(?:children|child|kids?|baby|toddler)\b|adult people|child ?care|preschool|cacfp|teamnutrition|usdagov|home(?:made| cooking)?|at home|old mother|office|library|national diet library|cafeteria|school lunch|community meal/i;
const kpopHardRejectPattern = /ningning|microphone|fancam|concert|performance|music bank|inkigayo|mma|mama|golden disc|stage|festival|fan concert|red carpet|photocall|launch event|beauty event|fashion week|seoul fashion week|olens|face[-\s]?only|headshot|forehead|close[-\s]?(?:up|frame)|coat|jacket|blazer|cardigan|hoodie|sweater|long[-\s]?sleeve|long[-\s]?sleeved|turtleneck|overcoat|trench|puffer|parka|scarf|fully covered|covered shoulder/i;
const kpopAdultEraPattern = /2024|2025|2026|24\d{4}|25\d{4}|26\d{4}|adult-era/i;
const kpopPosePositivePattern = /confident|pose|lounge|beach|midriff|belly|navel|waist|crop[-\s]?top|body[-\s]?visible|full[-\s]?body|leg pose|hands[-\s]?on[-\s]?waist/i;
const kpopBodyPosePattern = /midriff|belly|navel|waist|crop[-\s]?top|body[-\s]?visible|full[-\s]?body|leg pose|hands[-\s]?on[-\s]?waist/i;
const kpopMinorEraPeoplePattern = /hanni|haerin/i;
const kpopMinorEraArchivePattern = /2022|22\d{4}|220802|220813/i;

const curatorProfiles = {
  food: {
    prefer: [
      /barbecue|galbi|bulgogi|ramen|noodle|sushi platter|sashimi platter|dumpling|jiaozi|pho|carbonara|pasta|burger|steak|ribs|taco|quesadilla|gumbo|fried chicken|pizza|restaurant plate|grill/i,
      /glossy|char|broth|crispy|golden|platter|plate|bowl|stacked|sliced|sauce|steam|melted/i,
    ],
    reject: [
      /vegetable|vegetables|veggies|salad|broccoli|kale|spinach|lettuce|greens|leafy|arugula|cucumber|zucchini|squash|pumpkin|pumpkin soup|tomato soup|vegetable soup|veggie soup|plain soup|carrot|corn|cabbage|bean|chickpea|olive|nigiri|single|isolated|white background|plain|macaroni|mac and cheese|raw|uncooked|ingredient|ingredient garnish|plain garnish|dry pasta|uncooked pasta|pasta sheets|lasagna sheets|lasagne sheets|bento|dosirak|doshirak|lunch\s*box|boxed lunch|packed lunch|meal box|ready meal|packaged meal|prepackaged|pre-packed|convenience store|plastic (?:container|box|tray|lid)|disposable tray|takeout container|takeaway container|takeaway box|take away container/i,
      weakFoodScenePattern,
    ],
    minScore: 2,
  },
  kpop: {
    prefer: [
      /crop top|crop[-\s]?top|midriff|belly|navel|bare waist|exposed waist|visible waist|body-visible|full-body|pose|confident|wonyoung|ive/i,
      /2024|2025|2026|241|250|260/i,
    ],
    reject: [
      kpopHardRejectPattern,
      /awards?|glam|heavy makeup|face[-\s]?only|headshot|close[-\s]?up/i,
    ],
    minScore: 3,
  },
  car: {
    prefer: [
      /mini|cooper|john cooper works|jcw|2[-\s]?door|hardtop|sedan|gran coupe|cla|c-class|a3|modern|official|press|studio|road|motion|exterior|white/i,
      /2024|2025|2026|g20|g87|compact|limousine/i,
    ],
    reject: [
      disallowedCarPattern,
      dislikedCarTastePattern,
    ],
    minScore: 3,
  },
};

const kpopExposurePattern = /crop[-\s]?top|cropped[-\s]?top|midriff|belly(?:\s*button)?|navel|bare[-\s]?waist|exposed[-\s]?waist|visible[-\s]?waist|waistline|body[-\s]?visible|full[-\s]?body|leg pose|hands[-\s]?on[-\s]?waist/i;

function curationText(item, source = {}) {
  return [
    item && item.person,
    item && item.file,
    item && item.caption,
    item && item.carGroup,
    item && item.sourceId,
    item && item.metadataText,
    item && item.image,
    item && item.url,
    source.label,
    source.query,
  ].map((value) => normalizeSourceText(value || "").toLowerCase()).join(" ");
}

function isMinorEraKpopItem(item, source = {}) {
  const text = curationText(item, source);
  const person = `${item && item.person || ""} ${source.person || ""}`;
  return kpopMinorEraPeoplePattern.test(person) && kpopMinorEraArchivePattern.test(text);
}

function hasKpopPoseSignal(item, source = {}) {
  const itemText = curationText(item);
  const combinedText = curationText(item, source);
  if (kpopHardRejectPattern.test(combinedText) || isMinorEraKpopItem(item, source)) return false;
  return kpopAdultEraPattern.test(combinedText) && kpopPosePositivePattern.test(itemText) && kpopBodyPosePattern.test(itemText);
}

function hasKpopExposureSignal(item, source = {}) {
  const itemText = curationText(item);
  const text = curationText(item, source);
  if (kpopHardRejectPattern.test(text) || isMinorEraKpopItem(item, source)) return false;
  if (source && source.aiExposureApproved) return true;
  return kpopExposurePattern.test(itemText) || hasKpopPoseSignal(item, source);
}

function curationCategory(item, source = {}) {
  return source.category || (item && item.category) || categoryFor(item || {});
}

function curatorScore(item, source = {}) {
  const category = curationCategory(item, source);
  const profile = curatorProfiles[category];
  if (!profile) return 0;

  const text = curationText(item, source);
  if (category === "kpop" && !hasKpopExposureSignal(item, source)) return -100;
  if (profile.reject.some((pattern) => pattern.test(text))) return -100;
  if (category === "car" && carTasteRejected(item, text)) return -100;

  let score = 0;
  profile.prefer.forEach((pattern) => {
    if (pattern.test(text)) score += 2;
  });

  if (/thumb|official|press|studio|restaurant|platter|road|exterior|airport/i.test(text)) score += 1;
  if (category === "kpop" && hasKpopExposureSignal(item, source)) score += 6;
  if (category === "car") score += carTasteScore(item, text);
  if (/cropped|lowres|logo|diagram|map|menu|drawing|illustration/i.test(text)) score -= 3;
  if (item && ["wide", "cinema", "hero", "portrait", "tall"].includes(item.shape || "")) score += 1;
  return score;
}

function passesCurator(item, source = {}) {
  if (isBlockedContentItem(item)) return false;
  const category = curationCategory(item, source);
  const profile = curatorProfiles[category];
  if (!profile) return true;
  if (category === "kpop" && !hasKpopExposureSignal(item, source)) return false;
  return curatorScore(item, source) >= profile.minScore;
}

const featuredHaerinFiles = new Set([
  "Kang Haerin for OLENS 2.jpg",
  "Kang Haerin for OLENS 3.jpg",
  "2023 MMA NewJeans Haerin 1.jpg",
  "2023 MMA NewJeans Haerin 2.jpg",
  "NewJeans OLensglobal Haerin.jpg",
  "NewJeans HAERIN Dior 1.jpg",
  "NewJeans HAERIN Dior 2.jpg",
  "NewJeans HAERIN Dior 3.jpg",
]);

const featuredWonyoungFiles = new Set([
  "Jang Won-young IVE Marie Claire Korea.jpg",
  "Wonyoung at Bvlgari event.png",
  "20231202 IVE's Jang Wonyoung at the MAMA2023 02.png",
  "20231202 IVE's Jang Wonyoung at the MAMA2023 03.png",
  "20231202 IVE's Jang Wonyoung at the MAMA2023 04.png",
  "JANG WON YOUNG (장원영) – MIUMIU PHOTOCALL – 2025.06.20 – P1.jpg",
  "JANG WON YOUNG (장원영) – MIUMIU PHOTOCALL – 2025.06.20 – P2.jpg",
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
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (1).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (2).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (3).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (4).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (5).jpg",
  "Jang Won-young at IVE 4th Fan Concert DIVE into IVE March 22, 2026 (6).jpg",
]);

const featuredHanniFiles = new Set([
  "Hanni 241022 2.jpg",
  "Hanni 241022 2.png",
  "Hanni 241022.png",
]);

const cameoPersonTargets = {
  Wonyoung: 44,
  Karina: 24,
  Yujin: 20,
  Kazuha: 16,
};
const cameoPeople = Object.keys(cameoPersonTargets);
const allowedCameoPeople = new Set(cameoPeople);

function isAllowedCameo(item) {
  if (!allowedCameoPeople.has(item.person)) return false;
  if (kpopHardRejectPattern.test(curationText(item, { category: "kpop" }))) return false;
  if (isMinorEraKpopItem(item, { category: "kpop" })) return false;
  if (!hasKpopExposureSignal(item)) return false;
  if (!item.external) return false;
  return true;
}

function glamCaption(item) {
  if (!item.person) return item;
  const source = `${item.file || ""} ${item.caption || ""}`.toLowerCase();
  if (kpopExposurePattern.test(source)) return item;
  let mood = "soft clean portrait";
  if (/hanni|241022/.test(source)) {
    mood = "natural clean smile";
  } else if (/synk|concert|encore|fan concert|dive into ive|k-link|stage/.test(source)) {
    mood = "stage-performance frame";
  } else if (/mma|mama|melon|golden|disc/.test(source)) {
    mood = "awards-event frame";
  } else if (/miu|miu|dior|bvlgari|tommy|dyson|rimowa|photocall|launch|event/.test(source)) {
    mood = "fashion-event frame";
  } else if (/olens|kérastase|kerastase|mise-en-scene|beauty|marie claire/.test(source)) {
    mood = "soft clean close-up";
  }

  return { ...item, caption: `${item.person} cameo, ${mood}.` };
}

function glamScore(item) {
  const source = `${item.file || ""} ${item.caption || ""}`.toLowerCase();
  if (/stage|concert|fan concert|dive into ive|k-link|mma|mama|melon|golden|disc|dior|bvlgari|tommy|dyson|rimowa|photocall|launch|event|marie claire/.test(source)) return -4;
  if (/belly|navel|midriff|crop[-\s]?top|cropped[-\s]?top|bare[-\s]?waist|waistline|tube[-\s]?top/.test(source)) return 9;
  if (/strapless|sleeveless|bare[-\s]?shoulder|shoulder[-\s]?visible|off[-\s]?shoulder/.test(source)) return 7;
  if (/airport|olens|hanni|haerin|wonyoung|241022|soft|clean|natural|smile/.test(source)) return 4;
  if (/kerastase|mise-en-scene/.test(source)) return 1;
  return 2;
}

function diversifyCameoGroup(person, items) {
  if (person !== "Wonyoung") return items;
  const byVisualGroup = new Map();
  items.forEach((item) => {
    const group = visualGroupFor(item) || sourceKey(item);
    if (!byVisualGroup.has(group)) byVisualGroup.set(group, []);
    byVisualGroup.get(group).push(item);
  });
  return interleaveGroups(Array.from(byVisualGroup.values()).map((group) => group.slice(0, 1)));
}

function buildCameoPool(list) {
  const maxCameosPerPerson = 42;
  const clean = uniqueBySource(list.filter(isAllowedCameo).map(glamCaption).filter((item) => glamScore(item) >= 0));
  const grouped = new Map(cameoPeople
    .map((person) => [person, diversifyCameoGroup(person, clean
      .filter((item) => item.person === person)
      .map((item, index) => ({ item, index, score: glamScore(item) }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, maxCameosPerPerson)
      .map(({ item }) => item))])
    .filter(([, group]) => group.length));

  const result = [];
  const personPattern = cameoPeople;
  while ([...grouped.values()].some((group) => group.length)) {
    for (const person of personPattern) {
      const group = grouped.get(person);
      if (group && group.length) result.push(group.shift());
    }
  }

  return result;
}

const batchSize = 24;
const onlineBatchSize = 36;
const tileImageLoadTimeoutMs = 8500;
const tilePreloadConcurrency = 6;
const immediateFetchPriorityCount = 12;
const categories = ["food", "kpop", "car"];
const mixPattern = ["food", "kpop", "car"];
const longScrollItemsPerCategory = 7200;
const foodItems = uniqueBySource(baseItems.filter((item) => (!item.file || !skippedFiles.has(item.file)) && passesCurator(item, { category: "food" })));
const kpopItems = buildCameoPool(cameoItems);
const dreamCarItems = uniqueBySource(prioritizeCarItems(
  carItems.filter((item) => !isBlockedContentItem({ ...item, category: "car" }))
));

const onlineSources = [
  { category: "kpop", label: "Wonyoung crop-top midriff archive", provider: "kpopping", person: "Wonyoung", query: "Wonyoung crop top exposed waist midriff belly", maxItems: 240 },
  { category: "kpop", label: "Karina crop-top midriff archive", provider: "kpopping", person: "Karina", query: "Karina crop top exposed waist midriff belly", maxItems: 180 },
  { category: "kpop", label: "Yujin crop-top midriff archive", provider: "kpopping", person: "Yujin", query: "An Yujin crop top exposed waist midriff belly", maxItems: 160 },
  { category: "kpop", label: "Kazuha crop-top midriff archive", provider: "kpopping", person: "Kazuha", query: "Kazuha crop top exposed waist midriff belly", maxItems: 140 },
];

function sourceMaxItemsForCategory(category) {
  if (category === "kpop") return 2400;
  if (category === "car") return 1440;
  if (category === "food") return 1440;
  return 720;
}

function generatedSourceRefillCount(category) {
  if (category === "kpop") return 3;
  if (category === "car") return 12;
  if (category === "food") return 0;
  return 12;
}

onlineSources.forEach((source) => {
  source.category = source.category || (source.kind === "car" ? "car" : "food");
  source.maxItems = Math.max(Number(source.maxItems) || 0, sourceMaxItemsForCategory(source.category));
});

const generatedOnlineSourceSeeds = {
  food: [],
  kpop: [
    { label: "Wonyoung crop-top midriff refill", provider: "kpopping", person: "Wonyoung", query: "Wonyoung crop top exposed waist midriff belly", maxItems: 2400 },
    { label: "Karina crop-top midriff refill", provider: "kpopping", person: "Karina", query: "Karina crop top exposed waist midriff belly", maxItems: 1800 },
    { label: "Yujin crop-top midriff refill", provider: "kpopping", person: "Yujin", query: "An Yujin crop top exposed waist midriff belly", maxItems: 1600 },
    { label: "Kazuha crop-top midriff refill", provider: "kpopping", person: "Kazuha", query: "Kazuha crop top exposed waist midriff belly", maxItems: 1400 },
  ],
  car: [
    { group: "car:mini-cooper-2-door", label: "MINI Cooper 2 Door hardtop", query: "2025 2026 MINI Cooper 2 Door hardtop exterior", requireAny: ["2025", "2026", "mini", "cooper"], kind: "car", maxItems: 120 },
    { group: "car:mercedes-cla-white", label: "White Mercedes CLA sedan", query: "white 2025 Mercedes CLA sedan exterior", requireAny: ["2025", "2026", "cla"], kind: "car", maxItems: 96 },
    { group: "car:mercedes-c-class", label: "Mercedes C-Class sedan", query: "2024 2025 Mercedes C-Class W206 sedan", requireAny: ["2024", "2025", "2026", "w206"], kind: "car", maxItems: 72 },
    { group: "car:audi-a3", label: "Audi A3 sedan", query: "2024 2025 Audi A3 sedan exterior", requireAny: ["2024", "2025", "2026", "a3"], kind: "car", maxItems: 72 },
  ],
};

const generatedOnlineSourceIndex = { food: 0, kpop: 0, car: 0 };
const carFallbackGroups = [
  {
    group: "car:mini-cooper-2-door",
    label: "MINI Cooper 2 Door hardtop",
    terms: "2025,2026,mini,cooper,2-door,hardtop,car",
    query: "2025 2026 MINI Cooper 2 Door hardtop exterior",
    lockBase: 129000,
  },
  {
    group: "car:mercedes-cla-white",
    label: "White Mercedes CLA sedan",
    terms: "2025,mercedes,cla,white,sedan,car",
    query: "white 2025 Mercedes CLA sedan exterior",
    lockBase: 129500,
  },
  {
    group: "car:mercedes-cla",
    label: "Modern Mercedes CLA sedan",
    terms: "2025,mercedes,cla,sedan,car",
    query: "2025 Mercedes CLA sedan exterior",
    lockBase: 131000,
  },
  {
    group: "car:mercedes-c-class",
    label: "Modern Mercedes C-Class sedan",
    terms: "2025,mercedes,c-class,w206,sedan,car",
    query: "2025 Mercedes C-Class W206 sedan exterior",
    lockBase: 131500,
  },
  {
    group: "car:audi-a3",
    label: "Modern Audi A3 sedan",
    terms: "2025,audi,a3,sedan,car",
    query: "2025 Audi A3 sedan exterior",
    lockBase: 132000,
  },
  {
    group: "car:audi-a3-a0j42547:front",
    label: "Audi A3 A0J42547 front",
    terms: "audi,a3,a0j42547,manhattan-gray,front,sedan,car",
    query: "Audi A3 A0J42547 Manhattan Gray front",
    lockBase: 130000,
  },
  {
    group: "car:audi-a3-a0j42547:rear",
    label: "Audi A3 A0J42547 rear",
    terms: "audi,a3,a0j42547,manhattan-gray,rear,sedan,car",
    query: "Audi A3 A0J42547 Manhattan Gray rear",
    lockBase: 130500,
  },
];

function uniqueVisualGroupItems(items, category) {
  const seenGroups = new Set();
  return uniqueBySource(items).filter((item) => {
    const group = visualGroupFor({ ...item, category });
    if (!group) return true;
    if (seenGroups.has(group)) return false;
    seenGroups.add(group);
    return true;
  });
}

function ensureCycledFallbackItems(state, category, items, targetQueued, cycleField, salt, options = {}) {
  if (!state || !state.queues || !state.queues[category] || !Array.isArray(items) || !items.length) return 0;

  const allowCycles = options.allowCycles !== false;
  let added = 0;
  let guard = 0;

  while (availableUniqueCount(state, category) < targetQueued && guard < (allowCycles ? 12 : 1)) {
    const cycle = state[cycleField] || 1;
    const offset = feedStartOffset(items.length, `${salt}:cycle:${cycle}`);
    const cycledItems = Array.from({ length: items.length }, (_, index) => {
      const base = items[(index + offset) % items.length];
      const baseKey = sourceKey(base) || base.sourceId || base.file || base.image || base.caption || `${salt}:${index}`;
      return {
        ...base,
        category: base.category || category,
        sourceId: allowCycles ? `${baseKey}:cycle-${cycle}` : baseKey,
      };
    });

    cycledItems.forEach((item) => {
      if (enqueueUnique(state, category, item)) added += 1;
    });

    state[cycleField] = cycle + 1;
    guard += 1;
  }

  return added;
}

function ensureFoodFallbackVariety(state, targetQueued = batchSize) {
  return ensureCycledFallbackItems(state, "food", foodItems, Math.max(batchSize, targetQueued), "foodFallbackCycle", "food-fallback");
}

function ensureKpopFallbackVariety(state, targetPerPerson = 12) {
  const fallbackItems = uniqueVisualGroupItems(longScrollCameoItems(kpopItems), "kpop");
  const targetQueued = Math.min(
    Math.max(1, fallbackItems.length),
    Math.max(batchSize, targetPerPerson * Math.max(1, cameoPeople.length))
  );
  return ensureCycledFallbackItems(state, "kpop", fallbackItems, targetQueued, "kpopFallbackCycle", "kpop-fallback", { allowCycles: false });
}

function ensureCarFallbackVariety(state, targetPerGroup = 8, forceCycle = false) {
  const fallbackPool = dreamCarItems.length ? dreamCarItems : audiA3BuildItems;
  const targetQueued = forceCycle
    ? availableUniqueCount(state, "car") + fallbackPool.length
    : Math.max(batchSize, targetPerGroup);
  return ensureCycledFallbackItems(state, "car", fallbackPool, targetQueued, "carFallbackCycle", "car-fallback");
}

function addGeneratedOnlineSources(category, count = 6) {
  const seeds = generatedOnlineSourceSeeds[category] || [];
  if (!seeds.length) return 0;

  for (let index = 0; index < count; index += 1) {
    const generation = generatedOnlineSourceIndex[category] || 0;
    const seed = seeds[generation % seeds.length];
    const page = Math.floor(generation / seeds.length);
    generatedOnlineSourceIndex[category] = generation + 1;
    onlineSources.push({
      ...seed,
      category,
      maxItems: Math.max(Number(seed.maxItems) || 0, sourceMaxItemsForCategory(category)),
      offset: page > 0 ? page * 36 : undefined,
      added: 0,
      failures: 0,
      exhausted: false,
      generated: true,
    });
  }

  return count;
}

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
  "dry pasta",
  "uncooked pasta",
  "pasta sheets",
  "lasagna sheets",
  "lasagne sheets",
  "burger fries",
  "burger and fries",
  "hamburger and fries",
  "cheeseburger and fries",
  "cheeseburger and steak fries",
  "steak fries",
  "french fries",
  "asian noodles",
  "paella",
  "pasta plate",
  "restaurant plate",
  "single",
  "isolated",
  "white background",
  "plain",
  "macaroni",
  "mac and cheese",
  "national public service platform",
  "standards information",
  "information platform",
  "sac",
  "国家标准",
  "强制性国家标准",
  "nigiri",
  "take away",
  "bento",
  "dosirak",
  "doshirak",
  "lunch box",
  "lunchbox",
  "boxed lunch",
  "packed lunch",
  "meal box",
  "ready meal",
  "packaged meal",
  "prepackaged",
  "pre-packed",
  "convenience store",
  "plastic container",
  "plastic box",
  "plastic tray",
  "plastic lid",
  "disposable tray",
  "takeout container",
  "takeaway container",
  "takeaway box",
  "take away container",
  "shared table",
  "restaurant table",
  "food table",
  "table spread",
  "table frame",
  "full-table",
  "dining room",
  "family meal",
  "family table",
  "family eating",
  "family drinking",
  "families eating",
  "family style meal",
  "family style meal service",
  "people eating",
  "people eating lunch",
  "people eating dinner",
  "people at table",
  "people at tables",
  "people with food",
  "food and drink people",
  "food and drink with people",
  "dinner table",
  "dining table",
  "dining tables",
  "eating at table",
  "eating lunch",
  "eating dinner",
  "meal with people",
  "at the table",
  "supper",
  "child care",
  "childcare",
  "preschool",
  "cacfp",
  "teamnutrition",
  "usdagov",
  "adult people",
  "homemade",
  "home cooking",
  "at home",
  "old mother",
  "office",
  "library",
  "national diet library",
  "onion",
  "chili",
  "chilli",
  "jalapeno",
  "pepper",
  "firefighter",
  "fire truck",
  "firetruck",
  "fire engine",
  "fire department",
  "feuerwehr",
  "werkfeuerwehr",
  "purple m5",
  "green m5",
  "green m3",
  "blue m235",
  "borusan blue",
  "m3 cs",
  "vegetable",
  "vegetables",
  "veggies",
  "salad",
  "broccoli",
  "kale",
  "spinach",
  "lettuce",
  "greens",
  "leafy",
  "arugula",
  "cucumber",
  "zucchini",
  "squash",
  "pumpkin",
  "pumpkin soup",
  "tomato soup",
  "vegetable soup",
  "veggie soup",
  "plain soup",
  "carrot",
  "corn",
  "cabbage",
  "bean",
  "chickpea",
  "olive",
  "spicy",
  "curry",
  "indian",
  "mediterranean",
  "ingredient garnish",
  "plain garnish",
  "empty plate",
  "restaurant exterior",
  "restaurant sign",
  "restaurant facade",
  "concert",
  "festival",
  "live",
  "microphone",
  "music bank",
  "radio",
  "w korea",
  "w-korea",
  "fashion week",
  "seoul fashion week",
  "ningning",
  "face-only",
  "headshot",
  "forehead",
  "olens",
  "bmw m235",
  "bmw 2 series",
  "bmw 3 series",
  "bmw m3",
  "bmw m5",
];

const onlineSourceCooldownUntil = { food: 0, kpop: 0, car: 0 };
const lowQualityRejectedKeySet = new Set();
const railwayApiBase = "https://yum-app-production.up.railway.app";
const preferenceStorageKey = "yum.preference.v1";
const editTokenStorageKey = "yum.editToken.v1";
const feedStartStorageKey = "yum.feedStart.v1";
const maxStoredPreferenceSamples = 140;
const maxPreferenceSamplesPerRequest = 12;
const sessionFeedStart = nextFeedStartState();
const previousStartKeySet = new Set(sessionFeedStart.previousStartKeys || []);
const previousStartVisualGroupSet = new Set(sessionFeedStart.previousStartGroups || []);
const onlineSourceIndex = Object.fromEntries(categories.map((category) => [
  category,
  feedStartOffset(onlineSources.filter((source) => source.category === category).length, `online:${category}`),
]));

function browserRandomSeed() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0] >>> 0;
  }
  return Math.floor(Math.random() * 0x100000000) >>> 0;
}

function readStoredFeedStartState() {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(feedStartStorageKey) || "{}") || {};
  } catch {
    return {};
  }
}

function nextFeedStartState() {
  const previous = readStoredFeedStartState();
  const seed = Number.isFinite(Number(previous.seed)) ? Number(previous.seed) >>> 0 : browserRandomSeed();
  const visits = (Number(previous.visits) || 0) + 1;
  const next = {
    seed,
    visits,
    previousStartKeys: Array.isArray(previous.startKeys) ? previous.startKeys.slice(0, 90) : [],
    previousStartGroups: Array.isArray(previous.startGroups) ? previous.startGroups.slice(0, 90) : [],
    startKeys: [],
    startGroups: [],
    updatedAt: new Date().toISOString(),
  };

  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(feedStartStorageKey, JSON.stringify(next));
    } catch {
      // A fresh random start is still better than a fixed top-of-feed.
    }
  }

  return next;
}

function stableHash(value) {
  const text = String(value || "");
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function coprimeStride(length, salt) {
  if (length <= 1) return 1;
  let stride = (stableHash(`${salt}:stride`) % (length - 1)) + 1;
  while (greatestCommonDivisor(stride, length) !== 1) {
    stride = (stride % length) + 1;
  }
  return stride;
}

function feedStartOffset(length, salt) {
  if (length <= 1) return 0;
  const base = stableHash(`${sessionFeedStart.seed}:${salt}`) % length;
  const visitOffset = ((sessionFeedStart.visits % length) * coprimeStride(length, salt)) % length;
  return (base + visitOffset) % length;
}

function saveFeedStartKeys(items) {
  if (typeof localStorage === "undefined" || !Array.isArray(items)) return;
  const startKeys = items
    .slice(0, batchSize)
    .map(sourceKey)
    .filter(Boolean);
  const startGroups = items
    .slice(0, batchSize)
    .map(visualGroupFor)
    .filter(Boolean);
  if (!startKeys.length) return;

  sessionFeedStart.startKeys = startKeys;
  sessionFeedStart.startGroups = startGroups;
  try {
    localStorage.setItem(feedStartStorageKey, JSON.stringify({
      seed: sessionFeedStart.seed,
      visits: sessionFeedStart.visits,
      previousStartKeys: sessionFeedStart.previousStartKeys || [],
      previousStartGroups: sessionFeedStart.previousStartGroups || [],
      startKeys,
      startGroups,
      updatedAt: new Date().toISOString(),
    }));
  } catch {
    // Feed rotation should never block rendering.
  }
}

function normalizedApiBase(value) {
  return String(value || "").replace(/\/+$/, "");
}

function defaultApiBase() {
  if (typeof window === "undefined") return "";
  if (typeof window.YUM_API_BASE === "string") return normalizedApiBase(window.YUM_API_BASE);
  const host = window.location && window.location.hostname;
  return host === "yum.aolabs.io" || host === "www.yum.aolabs.io" ? railwayApiBase : "";
}

const apiBase = defaultApiBase();

function apiEndpoint(path) {
  return `${apiBase}${path}`;
}

function defaultAiCurateEndpoint() {
  if (typeof window === "undefined") return "/api/curate";
  if (typeof window.YUM_AI_ENDPOINT === "string") return window.YUM_AI_ENDPOINT;
  return apiEndpoint("/api/curate");
}

const aiCurateEndpoint = defaultAiCurateEndpoint();
const preferenceEndpoint = apiEndpoint("/api/preferences");
const kpopCandidateEndpoint = apiEndpoint("/api/kpop-candidates");
let aiCuratorUnavailable = false;

function requestedImageWidth(item) {
  if (item && (item.category === "kpop" || item.person)) return 1200;
  if (item && item.width) return item.width;
  return 1400;
}

function imageFor(item) {
  return item.image || commonsImage(item.file, requestedImageWidth(item));
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
  if (!item) return "";
  const primary = item.sourceId || item.file || item.original || item.image || item.url || item.caption || "";
  const fileKey = canonicalFileKey(primary);
  if (fileKey) return fileKey;

  return normalizeSourceText(primary)
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizePreferenceKey(value) {
  return normalizeSourceText(value)
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function readStoredPreferenceState() {
  if (typeof localStorage === "undefined") {
    return { version: 0, hiddenKeys: [], hiddenSamples: [], keptSamples: [] };
  }

  try {
    const parsed = JSON.parse(localStorage.getItem(preferenceStorageKey) || "{}");
    return {
      version: Number(parsed.version) || 0,
      hiddenKeys: Array.isArray(parsed.hiddenKeys) ? parsed.hiddenKeys.map(normalizePreferenceKey).filter(Boolean) : [],
      hiddenSamples: Array.isArray(parsed.hiddenSamples) ? parsed.hiddenSamples : [],
      keptSamples: Array.isArray(parsed.keptSamples) ? parsed.keptSamples : [],
    };
  } catch {
    return { version: 0, hiddenKeys: [], hiddenSamples: [], keptSamples: [] };
  }
}

const preferenceState = readStoredPreferenceState();
const hiddenKeySet = new Set(preferenceState.hiddenKeys);
const pendingHideKeySet = new Set();
let remotePreferencesLoaded = false;

function savePreferenceState() {
  preferenceState.hiddenKeys = [...hiddenKeySet].slice(-700);
  preferenceState.hiddenSamples = preferenceState.hiddenSamples.slice(-maxStoredPreferenceSamples);
  preferenceState.keptSamples = preferenceState.keptSamples.slice(-maxStoredPreferenceSamples);

  if (typeof localStorage === "undefined") return;

  try {
    localStorage.setItem(preferenceStorageKey, JSON.stringify(preferenceState));
  } catch {
    // Preference memory is a convenience layer; the feed still works without storage.
  }
}

function cleanPreferenceSample(sample) {
  const key = normalizePreferenceKey(sample && sample.key);
  return {
    key,
    category: String(sample && sample.category || ""),
    person: String(sample && sample.person || ""),
    caption: String(sample && sample.caption || ""),
    sourceId: String(sample && sample.sourceId || ""),
    url: String(sample && sample.url || ""),
    image: String(sample && sample.image || ""),
    shape: String(sample && sample.shape || ""),
    updatedAt: String(sample && sample.updatedAt || ""),
  };
}

function mergePreferenceSamples(existing, incoming, limit = maxStoredPreferenceSamples) {
  const merged = [];
  [...(existing || []), ...(incoming || [])].forEach((sample) => {
    const cleaned = cleanPreferenceSample(sample);
    if (!cleaned.key) return;
    const index = merged.findIndex((item) => item.key === cleaned.key);
    if (index >= 0) merged.splice(index, 1);
    merged.push(cleaned);
  });
  return merged.slice(-limit);
}

function applyPreferenceState(next, { save = true, merge = false } = {}) {
  if (!next || typeof next !== "object") return;

  const hiddenKeys = Array.isArray(next.hiddenKeys) ? next.hiddenKeys.map(normalizePreferenceKey).filter(Boolean) : [];
  const nextHiddenSet = merge ? new Set([...hiddenKeySet, ...hiddenKeys]) : new Set(hiddenKeys);
  if (Array.isArray(next.hiddenSamples)) {
    next.hiddenSamples
      .map((sample) => normalizePreferenceKey(sample && sample.key))
      .filter(Boolean)
      .forEach((key) => nextHiddenSet.add(key));
  }
  hiddenKeySet.clear();
  nextHiddenSet.forEach((key) => hiddenKeySet.add(key));

  preferenceState.version = Math.max(merge ? preferenceState.version : 0, Number(next.version) || 0);
  preferenceState.hiddenKeys = [...hiddenKeySet];
  preferenceState.hiddenSamples = merge
    ? mergePreferenceSamples(preferenceState.hiddenSamples, next.hiddenSamples)
    : mergePreferenceSamples([], next.hiddenSamples);
  preferenceState.keptSamples = merge
    ? mergePreferenceSamples(preferenceState.keptSamples, next.keptSamples)
    : mergePreferenceSamples([], next.keptSamples);

  if (save) savePreferenceState();
}

async function loadRemotePreferences() {
  if (remotePreferencesLoaded || !preferenceEndpoint || typeof fetch !== "function") return;
  remotePreferencesLoaded = true;

  try {
    const response = await fetchWithTimeout(preferenceEndpoint, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    }, 1200);
    if (!response.ok) return;
    const data = await response.json();
    if (data && data.preferences) applyPreferenceState(data.preferences, { merge: true });
  } catch {
    remotePreferencesLoaded = true;
  }
}

function preferenceStatePayload() {
  return {
    version: preferenceState.version,
    hiddenKeys: [...hiddenKeySet].slice(-700),
    hiddenSamples: (preferenceState.hiddenSamples || []).slice(-maxStoredPreferenceSamples),
    keptSamples: (preferenceState.keptSamples || []).slice(-maxStoredPreferenceSamples),
  };
}

function storedEditToken() {
  if (typeof localStorage === "undefined") return "";
  try {
    return localStorage.getItem(editTokenStorageKey) || "";
  } catch {
    return "";
  }
}

function saveEditToken(token) {
  if (!token || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(editTokenStorageKey, token);
  } catch {
    // The next edit can ask for the PIN again if browser storage is blocked.
  }
}

function requestEditPin() {
  if (typeof window === "undefined" || typeof window.prompt !== "function") return "";
  return window.prompt("PIN to edit Yum") || "";
}

function reportPreferenceSaveError(message) {
  if (typeof window !== "undefined" && typeof window.alert === "function") {
    window.alert(message);
  }
}

function compactPreferenceSample(item) {
  const key = sourceKey(item);
  if (!key) return null;

  return {
    key,
    category: categoryFor(item),
    person: item.person || "",
    caption: item.caption || "",
    sourceId: item.sourceId || item.file || "",
    url: sourceFor(item),
    image: imageFor(item),
    shape: item.shape || "",
  };
}

function addPreferenceSample(list, sample) {
  if (!sample || !sample.key) return;
  const existingIndex = list.findIndex((item) => item.key === sample.key);
  if (existingIndex >= 0) list.splice(existingIndex, 1);
  list.push({ ...sample, updatedAt: new Date().toISOString() });
  if (list.length > maxStoredPreferenceSamples) {
    list.splice(0, list.length - maxStoredPreferenceSamples);
  }
}

function isHiddenItem(item) {
  const key = sourceKey(item);
  return Boolean(key && hiddenKeySet.has(key));
}

function isLowQualityRejectedItem(item) {
  const key = sourceKey(item);
  return Boolean(key && lowQualityRejectedKeySet.has(key));
}

async function submitPreferenceAction(payload, pin = "") {
  if (!preferenceEndpoint || typeof fetch !== "function") {
    throw new Error("The Yum preference server is unavailable.");
  }

  const token = storedEditToken();
  const body = { ...payload, clientPreferences: preferenceStatePayload() };
  if (token) body.token = token;
  if (pin) body.pin = pin;

  const response = await fetch(preferenceEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));

  if (response.status === 401 && data && data.pinRequired) {
    return { ok: false, pinRequired: true };
  }

  if (!response.ok) {
    throw new Error((data && data.error) || "Yum could not save that edit.");
  }

  if (data.editToken) saveEditToken(data.editToken);
  if (data.preferences) applyPreferenceState(data.preferences, { merge: true });
  return { ok: true };
}

async function persistHiddenPreference(item, visibleItems = []) {
  const sample = compactPreferenceSample(item);
  if (!sample) return false;
  const key = sample.key;
  const visibleSamples = visibleItems
    .map(compactPreferenceSample)
    .filter((visibleSample) => {
      return visibleSample
        && visibleSample.key !== key
        && !hiddenKeySet.has(visibleSample.key)
        && visibleSample.category === sample.category;
    })
    .slice(-18);

  const payload = { action: "hide", item: sample, visibleItems: visibleSamples };
  let result;

  try {
    result = await submitPreferenceAction(payload);
  } catch {
    reportPreferenceSaveError("Yum could not save that edit to the website. Try again in a moment.");
    return false;
  }

  if (result.pinRequired) {
    const pin = requestEditPin();
    if (!pin) return false;

    try {
      result = await submitPreferenceAction(payload, pin);
    } catch {
      reportPreferenceSaveError("Yum could not save that edit to the website. Try again in a moment.");
      return false;
    }

    if (result.pinRequired) {
      reportPreferenceSaveError("That PIN did not work.");
      return false;
    }
  }

  return result.ok;
}

function rememberHiddenItem(item, visibleItems = []) {
  const key = sourceKey(item);
  if (!key) return;

  hiddenKeySet.add(key);
  addPreferenceSample(preferenceState.hiddenSamples, compactPreferenceSample(item));

  const category = categoryFor(item);
  visibleItems
    .filter((visibleItem) => {
      const visibleKey = sourceKey(visibleItem);
      return visibleKey && visibleKey !== key && !hiddenKeySet.has(visibleKey) && categoryFor(visibleItem) === category;
    })
    .slice(-10)
    .forEach((visibleItem) => addPreferenceSample(preferenceState.keptSamples, compactPreferenceSample(visibleItem)));

  preferenceState.version += 1;
  savePreferenceState();
}

function nearbyVisibleItems(renderedItems, itemIndex, category, hiddenKey, limit = 18) {
  if (!Array.isArray(renderedItems) || itemIndex < 0) return [];
  const selected = [];
  const maxDistance = Math.min(120, Math.max(renderedItems.length, 0));

  for (let distance = 1; distance <= maxDistance && selected.length < limit; distance += 1) {
    [itemIndex - distance, itemIndex + distance].forEach((index) => {
      if (selected.length >= limit || index < 0 || index >= renderedItems.length) return;
      const item = renderedItems[index];
      const key = sourceKey(item);
      if (key && key !== hiddenKey && !hiddenKeySet.has(key) && categoryFor(item) === category) {
        selected.push(item);
      }
    });
  }

  return selected;
}

const preferenceTokenStopWords = new Set([
  "2023", "2024", "2025", "2026", "audi", "benz", "cameo", "car", "clean",
  "archive", "documents", "find", "food", "frame", "glow", "gran", "haerin", "hanni",
  "https", "image", "instagram", "ive", "jang", "jpeg", "jpg", "kpics", "kpopping",
  "legacy", "mercedes", "natural", "newjeans", "official", "online", "photo",
  "portrait", "press", "pub", "sedan", "smile", "soft", "the", "update", "webp",
  "wonyoung", "young",
]);

function preferenceTokensFromText(text) {
  return normalizeSourceText(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => {
      return token.length >= 4
        && !preferenceTokenStopWords.has(token)
        && !/^\d/.test(token)
        && !token.includes("-");
    });
}

function preferenceSampleText(sample) {
  return [
    sample.person,
    sample.caption,
    sample.sourceId,
    sample.url,
    sample.image,
  ].join(" ");
}

const preferenceFeaturePatterns = {
  food: [
    ["vegetable_spread", /vegetable|vegetables|veggies|salad|broccoli|kale|spinach|lettuce|greens|leafy|arugula|cucumber|zucchini|squash|pumpkin|pumpkin soup|tomato soup|vegetable soup|veggie soup|plain soup|carrot|corn|cabbage|bean|chickpea|olive|tomato|pepper|ingredient|ingredient garnish|plain garnish|empty plate|restaurant exterior|restaurant sign|restaurant facade/i],
    ["isolated_sushi", /nigiri|single|isolated|plain|white background|salmon sushi(?!.*platter)|sushi close-up|sushi close up/i],
    ["raw_plain", /raw|uncooked|ingredient|sterile|product shot|white background|macaroni|mac and cheese|dry pasta|uncooked pasta|pasta sheets|lasagna sheets|lasagne sheets/i],
    ["burger_fries_table", /burger fries|burger and fries|hamburger and fries|cheeseburger and fries|cheeseburger and steak fries|steak fries|french fries/i],
    ["lemon_pan", /asian noodles|paella|1512058564366/i],
    ["weak_plate_crop", /pasta plate|restaurant plate|1547592166|1554998171/i],
    ["packaged_lunch", /bento|dosirak|doshirak|lunch\s*box|boxed lunch|packed lunch|meal box|ready meal|packaged meal|prepackaged|pre-packed|convenience store|plastic (?:container|box|tray|lid)|disposable tray|takeout container|takeaway container|takeaway box|take away container/i],
    ["weak_table_scene", weakFoodScenePattern],
    ["dim_bad_frame", /dim|flash|snapshot|bad[-\s]?framed|boring|sterile|documentation|old[-\s]?school/i],
  ],
  kpop: [
    ["stage", /stage|performance|concert|festival|inkigayo|music bank|microphone|fancam|fan concert|k-link/i],
    ["awards", /awards?|awards-night|awards-event|mma|mama|melon|golden disc|red carpet/i],
    ["fashion_event", /fashion-event|fashion week|dior|bvlgari|tommy|rimowa|miu miu|photocall|launch event/i],
    ["beauty_editorial", /beauty|editorial|glam|heavy makeup|marie claire|kerastase|mise-en-scene|olens|magazine/i],
    ["face_close_crop", /face[-\s]?only|headshot|forehead|close[-\s]?(?:up|frame)/i],
    ["covered_outerwear", /coat|jacket|blazer|cardigan|hoodie|sweater|long[-\s]?sleeve|long[-\s]?sleeved|turtleneck|overcoat|trench|puffer|parka|scarf|fully covered|covered shoulder/i],
    ["too_polished", /press-day|event frame|glossy|sparkle|polished awards|polished press/i],
  ],
  car: [
    ["old_car", /classic|vintage|oldtimer|old car|e36|e46|199[0-9]|200[0-9]|2010|2011|2012/i],
    ["show_floor", /museum|exhibition|motor show|auto show|show floor|auto zuerich|iaa|frankfurt|parade/i],
    ["traffic_doc", /traffic|china|lwb|e class|w212|v212|taxi|police|surveillance|license plate/i],
    ["suv_hatch", /suv|crossover|countryman|hatchback|sportback|bmw x[1-7]|audi q[2-8]|cayenne|macan/i],
    ["bmw_brand_vehicle", /\bbmw\b|m235|m240i|330i|m340i|\bm3\b|\bm5\b|car:bmw-/i],
    ["service_vehicle", /firefighter|fire truck|firetruck|fire engine|fire department|feuerwehr|werkfeuerwehr|p905430/i],
    ["dealer_bad", /dealer|dealership|auction|sale|used car|damaged|wreck|crash/i],
  ],
};

const strongNegativeFeatures = new Set([
  "vegetable_spread",
  "isolated_sushi",
  "raw_plain",
  "weak_table_scene",
  "dim_bad_frame",
  "stage",
  "awards",
  "fashion_event",
  "beauty_editorial",
  "face_close_crop",
  "covered_outerwear",
  "too_polished",
  "old_car",
  "show_floor",
  "traffic_doc",
  "suv_hatch",
  "bmw_brand_vehicle",
  "service_vehicle",
  "dealer_bad",
]);

function preferenceFeaturesFromText(text, category) {
  const features = new Set();
  (preferenceFeaturePatterns[category] || []).forEach(([feature, pattern]) => {
    if (pattern.test(text)) features.add(feature);
  });
  return features;
}

function itemPreferenceText(item, category) {
  return curationText(item, { category });
}

function preferenceRejectsItem(item, category = categoryFor(item)) {
  if (!item || !category) return false;
  if (isHiddenItem(item)) return true;

  const itemText = itemPreferenceText(item, category);
  const itemFeatures = preferenceFeaturesFromText(itemText, category);
  if (!itemFeatures.size) return false;

  return categoryPreferenceSamples(category, "hiddenSamples").some((sample) => {
    const hiddenFeatures = preferenceFeaturesFromText(preferenceSampleText(sample), category);
    if (!hiddenFeatures.size) return false;

    let overlap = 0;
    hiddenFeatures.forEach((feature) => {
      if (itemFeatures.has(feature)) overlap += 1;
    });

    if (overlap >= 2) return true;
    return overlap >= 1 && [...hiddenFeatures].some((feature) => strongNegativeFeatures.has(feature));
  });
}

function categoryPreferenceSamples(category, field) {
  return (preferenceState[field] || [])
    .filter((sample) => sample.category === category)
    .slice(-maxPreferenceSamplesPerRequest);
}

function preferenceScoreAdjustment(item, category) {
  const tokens = new Set(preferenceTokensFromText(curationText(item, { category })));
  const featurePenalty = preferenceRejectsItem(item, category) ? -6 : 0;
  if (!tokens.size) return featurePenalty;

  let score = featurePenalty;
  categoryPreferenceSamples(category, "hiddenSamples").forEach((sample) => {
    preferenceTokensFromText(preferenceSampleText(sample)).forEach((token) => {
      if (tokens.has(token)) score -= 1.4;
    });
  });
  categoryPreferenceSamples(category, "keptSamples").forEach((sample) => {
    preferenceTokensFromText(preferenceSampleText(sample)).forEach((token) => {
      if (tokens.has(token)) score += 0.25;
    });
  });

  return Math.max(-5, Math.min(2, score));
}

function preferenceProfileFor(category) {
  return {
    version: preferenceState.version,
    hidden: categoryPreferenceSamples(category, "hiddenSamples"),
    kept: categoryPreferenceSamples(category, "keptSamples").slice(-8),
  };
}

function taggedItems(items, category) {
  return items.map((item) => ({ ...item, category }));
}

function greatestCommonDivisor(left, right) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a || 1;
}

function spreadStride(length, category) {
  if (length <= 1) return 1;
  const preferred = { food: 17, kpop: 19, car: 23 }[category] || 7;
  let stride = preferred % length || 1;
  while (greatestCommonDivisor(stride, length) !== 1) {
    stride = (stride + 1) % length || 1;
  }
  return stride;
}

function longScrollItems(items, category, targetCount = longScrollItemsPerCategory) {
  const uniqueItems = uniqueBySource(items).filter((item) => !preferenceRejectsItem(item, category));
  if (!uniqueItems.length) return [];
  const count = Math.min(uniqueItems.length, targetCount);
  const stride = spreadStride(uniqueItems.length, category);
  const fixedOffset = { food: 0, kpop: 3, car: 5 }[category] || 0;
  const queueSalt = [
    category,
    sourceKey(uniqueItems[0]),
    sourceKey(uniqueItems[Math.floor(uniqueItems.length / 2)]),
    uniqueItems.length,
  ].join(":");
  const offset = (fixedOffset + feedStartOffset(uniqueItems.length, queueSalt)) % uniqueItems.length;

  const orderedItems = Array.from({ length: count }, (_, index) => {
    const sourceIndex = (index * stride + offset) % uniqueItems.length;
    const item = uniqueItems[sourceIndex];
    return {
      ...item,
      category,
    };
  });
  if (!previousStartKeySet.size) return orderedItems;

  const freshItems = [];
  const repeatedStartItems = [];
  orderedItems.forEach((item) => {
    const key = sourceKey(item);
    const visualGroup = visualGroupFor(item);
    if ((key && previousStartKeySet.has(key)) || (visualGroup && previousStartVisualGroupSet.has(visualGroup))) {
      repeatedStartItems.push(item);
    } else {
      freshItems.push(item);
    }
  });
  return freshItems.concat(repeatedStartItems);
}

function scaledCameoTargets(targetCount) {
  const baseTotal = Object.values(cameoPersonTargets).reduce((total, count) => total + count, 0);
  const targets = {};
  let assigned = 0;

  cameoPeople.forEach((person, index) => {
    if (index === cameoPeople.length - 1) {
      targets[person] = Math.max(0, targetCount - assigned);
      return;
    }

    const count = Math.round((cameoPersonTargets[person] / baseTotal) * targetCount);
    targets[person] = count;
    assigned += count;
  });

  return targets;
}

function cameoPersonSequence(targets, targetCount) {
  const used = Object.fromEntries(cameoPeople.map((person) => [person, 0]));
  const sequence = [];

  while (sequence.length < targetCount) {
    let selected = "";
    let bestScore = -Infinity;

    cameoPeople.forEach((person) => {
      if (used[person] >= targets[person]) return;
      const idealCount = (targets[person] * (sequence.length + 1)) / targetCount;
      const score = idealCount - used[person];
      if (score > bestScore) {
        bestScore = score;
        selected = person;
      }
    });

    if (!selected) break;
    used[selected] += 1;
    sequence.push(selected);
  }

  return sequence;
}

function longScrollCameoItems(items) {
  const groups = cameoPeople.map((person) => longScrollItems(
    items.filter((item) => item.person === person),
    "kpop"
  ));

  return interleaveGroups(groups);
}

function createFeedState() {
  const queues = {
    food: longScrollItems(foodItems, "food"),
    kpop: longScrollCameoItems(kpopItems),
    car: longScrollItems(dreamCarItems, "car"),
  };
  const queuedKeys = new Set(categories.flatMap((category) => queues[category].map(sourceKey)));
  return {
    queues,
    queuedKeys,
    seenKeys: new Set(),
    seenKpopVisualGroups: new Set(),
    personCounts: Object.fromEntries(cameoPeople.map((person) => [person, 0])),
    recentPeople: [],
    recentVisualGroups: [],
    carGroupCounts: {},
    recentCarGroups: [],
    foodFallbackCycle: 1,
    kpopFallbackCycle: 1,
    carFallbackCycle: 1,
    audiA3BuildCycle: 1,
    nextKpopPersonIndex: feedStartOffset(cameoPeople.length, "kpop:first-person"),
    patternIndex: 0,
    exhausted: false,
    prefetchingCategories: new Set(),
  };
}

function enqueueUnique(state, category, item) {
  if (!item) return false;
  const nextItem = { ...item, category: item.category || category };
  if (isBlockedContentItem(nextItem)) return false;
  if (!passesCurator(nextItem, { category })) return false;
  if (preferenceRejectsItem(nextItem, category)) return false;
  const key = sourceKey(nextItem);
  if (!key || hiddenKeySet.has(key) || isLowQualityRejectedItem(nextItem) || state.seenKeys.has(key) || state.queuedKeys.has(key)) return false;
  state.queuedKeys.add(key);
  state.queues[category].push(nextItem);
  return true;
}

function validQueuedItem(state, category, item) {
  const key = sourceKey(item);
  const visualGroup = visualGroupFor(item);
  if (category === "kpop" && visualGroup && state.seenKpopVisualGroups && state.seenKpopVisualGroups.has(visualGroup)) return false;
  return key
    && !hiddenKeySet.has(key)
    && !isBlockedContentItem(item)
    && !isLowQualityRejectedItem(item)
    && passesCurator(item, { category })
    && !preferenceRejectsItem(item, category)
    && !state.seenKeys.has(key);
}

function recordDequeuedItem(state, category, item) {
  const key = sourceKey(item);
  if (key) state.seenKeys.add(key);
  const visualGroup = visualGroupFor(item);

  if (category === "kpop") {
    const person = personFor(item);
    if (person) {
      state.personCounts[person] = (state.personCounts[person] || 0) + 1;
      state.recentPeople.push(person);
      if (state.recentPeople.length > 7) state.recentPeople.shift();
    }
    if (visualGroup) {
      if (state.seenKpopVisualGroups) state.seenKpopVisualGroups.add(visualGroup);
      state.recentVisualGroups.push(visualGroup);
      if (state.recentVisualGroups.length > 10) state.recentVisualGroups.shift();
    }
  }

  if (category === "car" && visualGroup) {
    state.carGroupCounts[visualGroup] = (state.carGroupCounts[visualGroup] || 0) + 1;
    state.recentCarGroups.push(visualGroup);
    if (state.recentCarGroups.length > 12) state.recentCarGroups.shift();
  }
}

function startupSelectionPenalty(state, item, index, category) {
  if (!state || state.seenKeys.size >= batchSize) return 0;
  const key = sourceKey(item) || `${category}:${index}`;
  const visualGroup = visualGroupFor(item);
  const spread = category === "car" ? 4200 : (category === "kpop" ? 2200 : 1400);
  const repeatPenalty = previousStartKeySet.has(key) || (visualGroup && previousStartVisualGroupSet.has(visualGroup)) ? 24000 : 0;
  return repeatPenalty + (stableHash(`${sessionFeedStart.seed}:${sessionFeedStart.visits}:${category}:${key}`) % spread);
}

function kpopQueuePenalty(state, item, index) {
  const person = personFor(item);
  const visualGroup = visualGroupFor(item);
  let penalty = startupSelectionPenalty(state, item, index, "kpop") + (index * 0.01);
  if (person) {
    const lastPerson = state.recentPeople[state.recentPeople.length - 1];
    const recentWindowCount = state.recentPeople.slice(-5).filter((recentPerson) => recentPerson === person).length;
    if (lastPerson === person) penalty += 500;
    penalty += (state.personCounts[person] || 0) * 240;
    penalty += state.recentPeople.filter((recentPerson) => recentPerson === person).length * 130;
    if (recentWindowCount >= 2) penalty += person === "Wonyoung" ? 2200 : 900;
  }
  if (visualGroup) {
    const recentGroups = state.recentVisualGroups.slice(-10);
    const recentGroupCount = recentGroups.filter((recentGroup) => recentGroup === visualGroup).length;
    const lastGroup = state.recentVisualGroups[state.recentVisualGroups.length - 1];
    if (lastGroup === visualGroup) penalty += 12000;
    if (recentGroupCount) penalty += 9000 + recentGroupCount * 5200;
  }
  return penalty;
}

function carQueuePenalty(state, item, index) {
  const visualGroup = visualGroupFor(item);
  const text = curationText(item, { category: "car" });
  if (carTasteRejected(item, text)) return Number.POSITIVE_INFINITY;

  let penalty = startupSelectionPenalty(state, item, index, "car") + (index * 0.01);
  if (visualGroup) {
    const recentWindow = state.recentCarGroups.slice(-10);
    const lastGroup = state.recentCarGroups[state.recentCarGroups.length - 1];
    if (lastGroup === visualGroup) penalty += 5200;
    penalty += recentWindow.filter((recentGroup) => recentGroup === visualGroup).length * 1850;
    penalty += (state.carGroupCounts[visualGroup] || 0) * 115;
    if (/mini-cooper-2-door/i.test(visualGroup) && !(state.carGroupCounts["car:mini-cooper-2-door"] || 0)) {
      penalty -= 14000;
    }
  }

  if (/interior|cupholder|gear|dashboard|seat|vent|console|badge|emblem|detail|firefighter|fire truck|firetruck|fire engine|feuerwehr|werkfeuerwehr|p905430/i.test(text)) {
    penalty += 1600;
  }
  penalty -= carTasteScore(item, text) * 120;

  return penalty;
}

function dequeueVariedCar(state, category) {
  const queue = state.queues[category] || [];
  const hasBalancedChoice = () => {
    return queue.some((item) => {
      if (!validQueuedItem(state, category, item)) return false;
      const group = visualGroupFor(item);
      return group && !state.recentCarGroups.slice(-6).includes(group);
    });
  };

  if (!hasBalancedChoice()) ensureCarFallbackVariety(state, 6, true);

  let bestIndex = -1;
  let bestPenalty = Number.POSITIVE_INFINITY;
  let bestFreshIndex = -1;
  let bestFreshPenalty = Number.POSITIVE_INFINITY;
  const recentWindow = state.recentCarGroups.slice(-8);

  for (let index = 0; index < queue.length; index += 1) {
    const item = queue[index];
    if (!validQueuedItem(state, category, item)) continue;
    const penalty = carQueuePenalty(state, item, index);
    const group = visualGroupFor(item);
    const isFresh = group && !recentWindow.includes(group);
    if (isFresh && penalty < bestFreshPenalty) {
      bestFreshPenalty = penalty;
      bestFreshIndex = index;
    }
    if (penalty < bestPenalty) {
      bestPenalty = penalty;
      bestIndex = index;
    }
  }

  if (bestFreshIndex >= 0) bestIndex = bestFreshIndex;
  if (bestFreshIndex < 0 && bestIndex >= 0) {
    const group = visualGroupFor(queue[bestIndex]);
    const lastGroup = state.recentCarGroups[state.recentCarGroups.length - 1];
    if (group && lastGroup === group) {
      return null;
    }
  }

  if (bestIndex >= 0) {
    const [item] = queue.splice(bestIndex, 1);
    recordDequeuedItem(state, category, item);
    return item;
  }

  return null;
}

function dequeueUnique(state, category) {
  const queue = state.queues[category] || [];
  if (category === "kpop") {
    const nextPerson = cameoPeople[state.nextKpopPersonIndex % cameoPeople.length];
    const hasNextPerson = queue.some((item) => personFor(item) === nextPerson && validQueuedItem(state, category, item));
    if (!hasNextPerson) ensureKpopFallbackVariety(state, 8);
    const orderedAvailablePeople = () => {
      return cameoPeople
        .map((person, index) => {
          const rotationDistance = (index - state.nextKpopPersonIndex + cameoPeople.length) % cameoPeople.length;
          const available = queue.some((item) => personFor(item) === person && validQueuedItem(state, category, item));
          return { person, index, rotationDistance, count: state.personCounts[person] || 0, available };
        })
        .filter((entry) => entry.available)
        .sort((left, right) => left.count - right.count || left.rotationDistance - right.rotationDistance);
    };

    for (let fillAttempt = 0; fillAttempt < 2; fillAttempt += 1) {
      const people = orderedAvailablePeople();
      for (const { person, index: personIndex } of people) {
        const matchingIndexes = [];
        for (let index = 0; index < queue.length; index += 1) {
          const item = queue[index];
          if (personFor(item) === person && validQueuedItem(state, category, item)) matchingIndexes.push(index);
        }
        if (!matchingIndexes.length) continue;

        const variedIndexes = matchingIndexes.filter((index) => {
          const visualGroup = visualGroupFor(queue[index]);
          return !visualGroup || !state.recentVisualGroups.includes(visualGroup);
        });
        if (!variedIndexes.length) continue;
        const candidateIndexes = variedIndexes;
        const selectedIndex = candidateIndexes.reduce((bestIndex, index) => {
          return startupSelectionPenalty(state, queue[index], index, "kpop")
            < startupSelectionPenalty(state, queue[bestIndex], bestIndex, "kpop")
            ? index
            : bestIndex;
        }, candidateIndexes[0]);
        const [item] = queue.splice(selectedIndex, 1);
        state.nextKpopPersonIndex = (personIndex + 1) % cameoPeople.length;
        recordDequeuedItem(state, category, item);
        return item;
      }

      ensureKpopFallbackVariety(state, 8);
    }

    let bestIndex = -1;
    let bestPenalty = Number.POSITIVE_INFINITY;
    let bestStrictIndex = -1;
    let bestStrictPenalty = Number.POSITIVE_INFINITY;
    let bestDifferentPersonIndex = -1;
    let bestDifferentPersonPenalty = Number.POSITIVE_INFINITY;
    let bestWindowBalancedIndex = -1;
    let bestWindowBalancedPenalty = Number.POSITIVE_INFINITY;
    let bestNonWonyoungIndex = -1;
    let bestNonWonyoungPenalty = Number.POSITIVE_INFINITY;
    const lastPerson = state.recentPeople[state.recentPeople.length - 1] || "";
    const recentWindow = state.recentPeople.slice(-5);
    const recentWonyoungCount = recentWindow.filter((recentPerson) => recentPerson === "Wonyoung").length;
    for (let index = 0; index < queue.length; index += 1) {
      const item = queue[index];
      if (!validQueuedItem(state, category, item)) continue;
      const penalty = kpopQueuePenalty(state, item, index);
      const person = personFor(item);
      const visualGroup = visualGroupFor(item);
      const isDifferentPerson = !person || person !== lastPerson;
      const windowPersonCount = person ? recentWindow.filter((recentPerson) => recentPerson === person).length : 0;
      const isWindowBalanced = isDifferentPerson && windowPersonCount < 2;
      const isStrictlyVaried = isWindowBalanced && (!visualGroup || !state.recentVisualGroups.includes(visualGroup));
      if (isStrictlyVaried && penalty < bestStrictPenalty) {
        bestStrictPenalty = penalty;
        bestStrictIndex = index;
      }
      if (isWindowBalanced && penalty < bestWindowBalancedPenalty) {
        bestWindowBalancedPenalty = penalty;
        bestWindowBalancedIndex = index;
      }
      if (recentWonyoungCount >= 2 && person !== "Wonyoung" && penalty < bestNonWonyoungPenalty) {
        bestNonWonyoungPenalty = penalty;
        bestNonWonyoungIndex = index;
      }
      if (isDifferentPerson && penalty < bestDifferentPersonPenalty) {
        bestDifferentPersonPenalty = penalty;
        bestDifferentPersonIndex = index;
      }
      if (penalty < bestPenalty) {
        bestPenalty = penalty;
        bestIndex = index;
        if (penalty <= 0) break;
      }
    }

    if (bestWindowBalancedIndex >= 0) {
      bestIndex = bestWindowBalancedIndex;
    } else if (bestNonWonyoungIndex >= 0) {
      bestIndex = bestNonWonyoungIndex;
    } else if (bestStrictIndex >= 0) {
      bestIndex = bestStrictIndex;
    } else if (bestDifferentPersonIndex >= 0) {
      bestIndex = bestDifferentPersonIndex;
    }

    if (bestIndex >= 0) {
      const [item] = queue.splice(bestIndex, 1);
      recordDequeuedItem(state, category, item);
      return item;
    }
  }

  if (category === "car") {
    const carItem = dequeueVariedCar(state, category);
    return carItem;
  }

  while (queue.length) {
    const item = queue.shift();
    if (!validQueuedItem(state, category, item)) continue;
    recordDequeuedItem(state, category, item);
    return item;
  }
  return null;
}

function dequeueAnyUnique(state, category) {
  const queue = state.queues[category] || [];
  for (let index = 0; index < queue.length; index += 1) {
    const item = queue[index];
    if (!validQueuedItem(state, category, item)) continue;
    queue.splice(index, 1);
    recordDequeuedItem(state, category, item);
    return item;
  }
  return null;
}

function hasAvailableUnique(state, category) {
  return (state.queues[category] || []).some((item) => {
    return validQueuedItem(state, category, item);
  });
}

function availableUniqueCount(state, category) {
  return (state.queues[category] || []).reduce((count, item) => {
    return validQueuedItem(state, category, item) ? count + 1 : count;
  }, 0);
}

function isInitialFeedStillFilling(state) {
  return state.seenKeys.size < Math.min(9, batchSize);
}

function prefetchOnlineItemsForCategory(state, category) {
  if (!state || !state.prefetchingCategories || state.prefetchingCategories.has(category)) return;
  const targetQueued = category === "kpop" ? onlineBatchSize * 8 : (category === "car" ? 12 : onlineBatchSize * 6);
  if (availableUniqueCount(state, category) >= targetQueued) return;

  state.prefetchingCategories.add(category);
  loadMoreOnlineItemsForCategory(state, category, onlineBatchSize)
    .catch(() => 0)
    .finally(() => {
      state.prefetchingCategories.delete(category);
    });
}

function prefetchOnlineItems(state) {
  categories.forEach((category) => prefetchOnlineItemsForCategory(state, category));
}

function availableKpopPeople(state) {
  const people = new Set();
  (state.queues.kpop || []).forEach((item) => {
    if (validQueuedItem(state, "kpop", item)) {
      const person = personFor(item);
      if (person) people.add(person);
    }
  });
  return people;
}

function availableVisualGroups(state, category) {
  const groups = new Set();
  ((state.queues && state.queues[category]) || []).forEach((item) => {
    if (validQueuedItem(state, category, item)) {
      const group = visualGroupFor(item);
      if (group) groups.add(group);
    }
  });
  return groups;
}

function hasKpopWindowBalancedChoice(state) {
  const lastPerson = state.recentPeople[state.recentPeople.length - 1] || "";
  const recentWindow = state.recentPeople.slice(-5);
  const recentGroups = state.recentVisualGroups.slice(-10);
  return (state.queues.kpop || []).some((item) => {
    if (!validQueuedItem(state, "kpop", item)) return false;
    const person = personFor(item);
    const visualGroup = visualGroupFor(item);
    if (visualGroup && recentGroups.includes(visualGroup)) return false;
    if (person && person === lastPerson) return false;
    return !person || recentWindow.filter((recentPerson) => recentPerson === person).length < 2;
  });
}

function hasCarWindowBalancedChoice(state) {
  const recentWindow = state.recentCarGroups.slice(-8);
  return (state.queues.car || []).some((item) => {
    if (!validQueuedItem(state, "car", item)) return false;
    const group = visualGroupFor(item);
    return group && !recentWindow.includes(group);
  });
}

function buildUniqueFeed() {
  const state = createFeedState();
  const feed = [];

  while (mixPattern.every((category) => hasAvailableUnique(state, category))) {
    mixPattern.forEach((category) => {
      const item = dequeueUnique(state, category);
      if (item) feed.push(item);
    });
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
  return source.requireAny.some((term) => lower.includes(String(term).toLowerCase()));
}

function isBlockedOnlineTitle(title) {
  const lower = title.toLowerCase();
  return blockedOnlineTitleTerms.some((term) => lower.includes(term));
}

function commonsMetadataValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(commonsMetadataValue).join(" ");
  if (typeof value === "object") {
    if (typeof value.value === "string") return value.value;
    return Object.values(value).map(commonsMetadataValue).join(" ");
  }
  return "";
}

function commonsPageSearchText(page, info = {}) {
  const categories = Array.isArray(page && page.categories)
    ? page.categories.map((category) => category.title || "").join(" ")
    : "";
  const metadata = commonsMetadataValue(info && info.extmetadata);
  return normalizeSourceText([
    page && page.title,
    categories,
    metadata,
  ].join(" ")).toLowerCase();
}

function isBlockedFoodOnlineText(text) {
  return weakFoodScenePattern.test(text) || blockedOnlineTitleTerms.some((term) => text.includes(term));
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
    prop: "imageinfo|categories",
    iiprop: "url|mime|size|extmetadata",
    iiurlwidth: "1400",
    cllimit: "50",
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
  const pageSearchText = commonsPageSearchText(page, info);
  const width = Number(info.width) || 0;
  const height = Number(info.height) || 0;
  const mime = String(info.mime || "").toLowerCase();
  const ratio = width / Math.max(height, 1);

  if (!/^image\/(jpeg|png|webp)$/.test(mime)) return null;
  if (width < 900 || height < 650 || width * height < 900000) return null;
  if (ratio < 0.42 || ratio > 2.7) return null;
  if (!hasRequiredOnlineTerms(lowerTitle, source)) return null;
  if (isBlockedOnlineTitle(lowerTitle)) return null;
  if (source.category === "food" && isBlockedFoodOnlineText(pageSearchText)) return null;

  if (source.kind === "car" && (/dealer|dealership|auction|sale|crash|wreck|damaged|police|taxi/i.test(lowerTitle) || isDisallowedCarText(lowerTitle) || carTasteRejected({ carGroup: source.group }, `${lowerTitle} ${source.label || ""} ${source.query || ""}`))) {
    return null;
  }

  if (source.category === "kpop" && /2020|2021|fan|fancam|stage|performance|concert|festival|music bank|inkigayo|microphone|ningning/i.test(lowerTitle)) {
    return null;
  }
  if (source.category === "kpop" && (kpopHardRejectPattern.test(`${lowerTitle} ${source.label || ""} ${source.query || ""}`) || isMinorEraKpopItem({ person: source.person || "", sourceId: lowerTitle }, source))) {
    return null;
  }
  if (source.category === "kpop" && !hasKpopExposureSignal({ person: source.person || "", sourceId: lowerTitle, caption: source.label || "" }, source)) {
    return null;
  }

  const fileName = String(page.title || "").replace(/^File:/i, "");
  return {
    image: info.thumburl || info.url,
    original: info.url,
    sourceId: fileName,
    metadataText: pageSearchText,
    url: commonsSource(fileName),
    caption: onlineCaption(source, page.title),
    carGroup: source.group || "",
    category: source.category,
    person: source.person || "",
    shape: shapeFromDimensions(width, height, source.kind === "car" ? "wide" : "portrait"),
    focus: "center 50%",
  };
}

function localRankCandidates(source, candidates) {
  const category = source.category;
  return candidates
    .filter((item) => !preferenceRejectsItem(item, category))
    .map((item) => ({ item, score: curatorScore(item, source) + preferenceScoreAdjustment(item, category) }))
    .filter(({ item, score }) => score >= (curatorProfiles[source.category] ? curatorProfiles[source.category].minScore : 0) && passesCurator(item, source))
    .sort((left, right) => right.score - left.score)
    .map(({ item }) => item);
}

function aiCandidatePayload(item) {
  return {
    image: imageFor(item),
    original: item.original || imageFor(item),
    url: sourceFor(item),
    sourceId: item.sourceId || item.file || item.caption || "",
    caption: item.caption || "",
    category: item.category || "",
    person: item.person || "",
    shape: item.shape || "",
    focus: item.focus || "",
  };
}

function itemFromAiResponse(source, candidates, item) {
  const key = sourceKey(item);
  const matched = candidates.find((candidate) => sourceKey(candidate) === key);
  const nextItem = matched
    ? {
        ...matched,
        ...item,
        image: matched.image || item.image,
        original: matched.original || item.original,
        url: matched.url || item.url,
        sourceId: matched.sourceId || item.sourceId,
      }
    : item;
  const category = nextItem.category || source.category;
  if (!nextItem || preferenceRejectsItem(nextItem, category) || isBlockedContentItem(nextItem)) return null;
  if (category === "kpop") {
    if (!passesCurator(nextItem, { ...source, aiExposureApproved: true })) return null;
    return { ...nextItem, category, aiExposureApproved: true };
  }
  if (!passesCurator(nextItem, source)) return null;
  return { ...nextItem, category };
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 6500) {
  if (typeof AbortController === "undefined") {
    return fetch(url, options);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function curateCandidatesWithAi(source, candidates, limit = onlineBatchSize) {
  if (!aiCurateEndpoint || aiCuratorUnavailable || typeof fetch !== "function" || !candidates.length) {
    return [];
  }

  const requestCandidates = candidates.slice(0, 12);
  const requestTimeout = source.category === "kpop" ? 18000 : 6500;

  try {
    const response = await fetchWithTimeout(aiCurateEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: source.category,
        source: {
          label: source.label,
          query: source.query,
        },
        preferences: preferenceProfileFor(source.category),
        limit: Math.min(limit, requestCandidates.length),
        candidates: requestCandidates.map(aiCandidatePayload),
      }),
    }, requestTimeout);

    if ([402, 404, 405, 429, 500, 501, 502, 503].includes(response.status)) {
      aiCuratorUnavailable = true;
      return [];
    }

    if (!response.ok) {
      aiCuratorUnavailable = true;
      return [];
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.items)) return [];

    return uniqueBySource(
      data.items
        .map((item) => itemFromAiResponse(source, requestCandidates, item))
        .filter(Boolean)
    );
  } catch {
    aiCuratorUnavailable = true;
    return [];
  }
}

async function rankOnlineCandidates(source, candidates) {
  if (source.provider === "kpopping") {
    const uniqueCandidates = uniqueBySource(candidates).filter((item) => !preferenceRejectsItem(item, source.category));
    const aiRanked = await curateCandidatesWithAi(source, uniqueCandidates, onlineBatchSize);
    if (aiRanked.length) return aiRanked;
    return [];
  }

  const locallyRanked = uniqueBySource(localRankCandidates(source, candidates));
  if (!locallyRanked.length) return [];

  const aiRanked = await curateCandidatesWithAi(source, locallyRanked, onlineBatchSize);
  if (source.category === "food") return aiRanked;
  return aiRanked.length ? aiRanked : locallyRanked;
}

function nextOnlineSource(category, state = null) {
  if ((onlineSourceCooldownUntil[category] || 0) > Date.now()) return null;

  let sources = onlineSources.filter((source) => source.category === category && !source.exhausted);
  if (!sources.length) {
    addGeneratedOnlineSources(category, generatedSourceRefillCount(category));
    sources = onlineSources.filter((source) => source.category === category && !source.exhausted);
  }
  if (!sources.length) return null;

  if (category === "kpop" && state && state.recentPeople.length) {
    const recentPeople = new Set(state.recentPeople.slice(-2));
    const rotatedSources = Array.from({ length: sources.length }, (_, offset) => {
      return sources[(onlineSourceIndex[category] + offset) % sources.length];
    });
    const variedSource = rotatedSources.find((source) => !source.person || !recentPeople.has(source.person));
    if (variedSource) {
      onlineSourceIndex[category] = sources.indexOf(variedSource) + 1;
      return variedSource;
    }
  }

  if (category === "car" && state && state.recentCarGroups.length) {
    const recentCarGroups = new Set(state.recentCarGroups.slice(-5));
    const rotatedSources = Array.from({ length: sources.length }, (_, offset) => {
      return sources[(onlineSourceIndex[category] + offset) % sources.length];
    });
    const variedSource = rotatedSources.find((source) => !source.group || !recentCarGroups.has(source.group));
    if (variedSource) {
      onlineSourceIndex[category] = sources.indexOf(variedSource) + 1;
      return variedSource;
    }
  }

  const source = sources[onlineSourceIndex[category] % sources.length];
  onlineSourceIndex[category] += 1;
  return source;
}

async function fetchKpoppingSource(source) {
  if (!kpopCandidateEndpoint || typeof fetch !== "function") return [];
  if (source.maxItems && source.added >= source.maxItems) {
    source.exhausted = true;
    return [];
  }

  const params = new URLSearchParams({
    person: source.person || "",
    offset: String(source.offset || 0),
    limit: "42",
  });
  const response = await fetchWithTimeout(`${kpopCandidateEndpoint}?${params.toString()}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  }, 7000);
  if (!response.ok) {
    throw new Error(`K-pop source failed: ${response.status}`);
  }

  const data = await response.json();
  const candidates = Array.isArray(data.items) ? data.items : [];
  if (data.nextOffset === null || data.nextOffset === undefined) {
    source.exhausted = true;
  } else {
    source.offset = data.nextOffset;
  }

  return rankOnlineCandidates(source, candidates);
}

async function fetchGeneratedPhotoSource(source) {
  source.exhausted = true;
  return [];
}

async function fetchOnlineSource(source) {
  if (source.provider === "kpopping") {
    return fetchKpoppingSource(source);
  }
  if (source.provider === "generated-photo") {
    return fetchGeneratedPhotoSource(source);
  }

  if (source.maxItems && source.added >= source.maxItems) {
    source.exhausted = true;
    return [];
  }

  const response = await fetchWithTimeout(commonsSearchUrl(source), {
    headers: {
      Accept: "application/json",
      "Api-User-Agent": "YumWall/1.0 (https://yum.aolabs.io)",
    },
  }, 7000);
  if (response.status === 429) {
    onlineSourceCooldownUntil[source.category] = Date.now() + 6000;
    const error = new Error("Commons search rate limited");
    error.rateLimited = true;
    throw error;
  }
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

  const candidates = pages
    .map((page) => itemFromCommonsPage(source, page))
    .filter(Boolean);

  return rankOnlineCandidates(source, candidates);
}

async function loadMoreOnlineItemsForCategory(state, category, targetCount = onlineBatchSize) {
  if (category === "car") {
    return ensureCarFallbackVariety(state, Math.max(targetCount, onlineBatchSize));
  }

  let added = 0;
  let attempts = 0;
  let generatedFallbackAdded = false;
  const maxAttempts = () => Math.min(24, Math.max(12, onlineSources.filter((source) => source.category === category && !source.exhausted).length));
  const hasEnoughQueuedVariety = () => {
    if (category === "kpop") return availableKpopPeople(state).size >= Math.min(3, cameoPeople.length);
    if (category === "car") return availableVisualGroups(state, "car").size >= Math.min(5, carFallbackGroups.length);
    return true;
  };
  const needsMore = () => added < targetCount || !hasEnoughQueuedVariety();

  if (availableUniqueCount(state, category) < mixPattern.length) {
    if (category === "food") added += ensureFoodFallbackVariety(state, targetCount);
    if (category === "kpop") added += ensureKpopFallbackVariety(state);
  }

  if (availableUniqueCount(state, category) < targetCount) {
    addGeneratedOnlineSources(category, generatedSourceRefillCount(category));
  }

  const trySource = async () => {
    let source = nextOnlineSource(category, state);
    if (!source && addGeneratedOnlineSources(category, generatedSourceRefillCount(category)) > 0) {
      source = nextOnlineSource(category, state);
    }
    if (!source) return false;

    attempts += 1;
    try {
      const onlineItems = await fetchOnlineSource(source);
      if (!onlineItems.length) {
        source.emptyHits = (source.emptyHits || 0) + 1;
        if (source.emptyHits >= 2) source.exhausted = true;
      } else {
        source.emptyHits = 0;
      }
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
    } catch (error) {
      source.failures = (source.failures || 0) + 1;
      if (!error || !error.rateLimited) {
        if (source.failures >= 2) source.exhausted = true;
      }
    }
    return true;
  };

  while (needsMore() && attempts < maxAttempts()) {
    const tried = await trySource();
    if (!tried) break;
  }

  if (needsMore()) {
    generatedFallbackAdded = addGeneratedOnlineSources(category, generatedSourceRefillCount(category)) > 0;
  }

  if (generatedFallbackAdded) {
    attempts = 0;
    const fallbackMaxAttempts = Math.min(30, Math.max(12, (generatedOnlineSourceSeeds[category] || []).length * 2));
    while (needsMore() && attempts < fallbackMaxAttempts) {
      const tried = await trySource();
      if (!tried) break;
    }
  }

  if (category === "kpop" && (!hasEnoughQueuedVariety() || !hasKpopWindowBalancedChoice(state))) {
    added += ensureKpopFallbackVariety(state);
  }
  if (category === "food" && availableUniqueCount(state, "food") < targetCount) {
    added += ensureFoodFallbackVariety(state, targetCount);
  }
  if (category === "car" && (!hasEnoughQueuedVariety() || !hasCarWindowBalancedChoice(state))) {
    added += ensureCarFallbackVariety(state);
  }

  return added;
}

async function nextItemForCategory(state, category) {
  const firstPaintStillFilling = isInitialFeedStillFilling(state);
  if (!hasAvailableUnique(state, category)) {
    if (firstPaintStillFilling) {
      await loadMoreOnlineItemsForCategory(state, category, onlineBatchSize);
    } else {
      if (category === "food") ensureFoodFallbackVariety(state, onlineBatchSize);
      if (category === "kpop") ensureKpopFallbackVariety(state);
      if (category === "car") ensureCarFallbackVariety(state);
      if (hasAvailableUnique(state, category)) return dequeueUnique(state, category);
      prefetchOnlineItemsForCategory(state, category);
      return null;
    }
  } else if (!firstPaintStillFilling && category === "kpop" && !hasKpopWindowBalancedChoice(state)) {
    prefetchOnlineItemsForCategory(state, category);
  }

  if (!firstPaintStillFilling && category === "kpop" && !hasKpopWindowBalancedChoice(state)) {
    ensureKpopFallbackVariety(state);
  }
  if (!firstPaintStillFilling && category === "car" && !hasCarWindowBalancedChoice(state)) {
    ensureCarFallbackVariety(state);
  }

  return dequeueUnique(state, category);
}

function restoreDequeuedItems(state, items) {
  items.slice().reverse().forEach((item) => {
    const category = categoryFor(item);
    const key = sourceKey(item);
    const visualGroup = visualGroupFor(item);
    if (key) state.seenKeys.delete(key);
    if (category === "kpop" && visualGroup && state.seenKpopVisualGroups) state.seenKpopVisualGroups.delete(visualGroup);
    if (!state.queues[category]) state.queues[category] = [];
    state.queues[category].unshift(item);
  });
}

function nextAvailableMixedItems(state, targetCount = batchSize) {
  const items = [];

  while (items.length + mixPattern.length <= targetCount && mixPattern.every((category) => hasAvailableUnique(state, category))) {
    const setItems = [];
    for (const category of mixPattern) {
      const item = dequeueUnique(state, category);
      if (item) setItems.push(item);
    }
    if (setItems.length !== mixPattern.length) {
      restoreDequeuedItems(state, setItems);
      break;
    }
    items.push(...setItems);
  }

  categories.forEach((category) => prefetchOnlineItemsForCategory(state, category));
  return items;
}

async function nextMixedItems(state, targetCount = batchSize) {
  const nextItems = [];
  const targetSetCount = Math.floor(targetCount / mixPattern.length);

  for (let setIndex = 0; setIndex < targetSetCount; setIndex += 1) {
    for (const category of mixPattern) {
      const firstPaintStillFilling = isInitialFeedStillFilling(state);
      const needsRefill = !hasAvailableUnique(state, category)
        || (!firstPaintStillFilling && category === "kpop" && !hasKpopWindowBalancedChoice(state))
        || (!firstPaintStillFilling && category === "car" && !hasCarWindowBalancedChoice(state));
      if (!hasAvailableUnique(state, category)) {
        if (nextItems.length || !firstPaintStillFilling) {
          prefetchOnlineItemsForCategory(state, category);
        } else {
          await loadMoreOnlineItemsForCategory(state, category, onlineBatchSize);
        }
      } else if (needsRefill) {
        prefetchOnlineItemsForCategory(state, category);
      }
    }

    if (!mixPattern.every((category) => hasAvailableUnique(state, category))) {
      categories.forEach((category) => prefetchOnlineItemsForCategory(state, category));
      state.emptyBatches = nextItems.length ? 0 : ((state.emptyBatches || 0) + 1);
      return nextItems;
    }

    const setItems = [];
    for (const category of mixPattern) {
      let item = await nextItemForCategory(state, category);
      if (!item) {
        if (nextItems.length || state.seenKeys.size >= batchSize) {
          prefetchOnlineItemsForCategory(state, category);
        } else {
          await loadMoreOnlineItemsForCategory(state, category, onlineBatchSize);
          item = await nextItemForCategory(state, category);
        }
      }
      if (!item) {
        restoreDequeuedItems(state, setItems);
        categories.forEach((category) => prefetchOnlineItemsForCategory(state, category));
        state.emptyBatches = nextItems.length ? 0 : ((state.emptyBatches || 0) + 1);
        return nextItems;
      }
      setItems.push(item);
    }

    nextItems.push(...setItems);
  }

  state.emptyBatches = nextItems.length ? 0 : ((state.emptyBatches || 0) + 1);
  return nextItems;
}

function toneFor(item) {
  const category = categoryFor(item);
  if (category === "food") {
    return { warmth: "0.12", saturation: "1.2", contrast: "1.05", brightness: "1.03", wash: "0.96" };
  }
  if (category === "car") {
    return { warmth: "0.075", saturation: "1.12", contrast: "1.04", brightness: "1.018", wash: "0.72" };
  }
  return { warmth: "0.08", saturation: "1.13", contrast: "1.035", brightness: "1.02", wash: "0.78" };
}

function isHighQualityKpopImage(img) {
  const width = Number(img.naturalWidth) || 0;
  const height = Number(img.naturalHeight) || 0;
  const shortEdge = Math.min(width, height);
  const longEdge = Math.max(width, height);
  return width * height >= 320000 && shortEdge >= 420 && longEdge >= 700;
}

function isUsableCarFrame(img) {
  const width = Number(img.naturalWidth) || 0;
  const height = Number(img.naturalHeight) || 0;
  if (!width || !height) return false;
  const ratio = width / height;
  return width * height >= 700000 && ratio >= 1.18 && ratio <= 2.55;
}

function fitCarTileToImage(tile, img) {
  const width = Number(img.naturalWidth) || 0;
  const height = Number(img.naturalHeight) || 0;
  if (!width || !height) return;
  tile.style.aspectRatio = `${width} / ${height}`;
}

function loadedImageDimensions(img) {
  return {
    naturalWidth: Number(img && (img.naturalWidth || img.width)) || 0,
    naturalHeight: Number(img && (img.naturalHeight || img.height)) || 0,
    src: String((img && (img.currentSrc || img.src)) || ""),
  };
}

function isLoadedImageUsable(item, img) {
  const category = categoryFor(item);
  if (!img || !img.naturalWidth || !img.naturalHeight) return false;
  if (category === "kpop") return isHighQualityKpopImage(img);
  if (category === "car") return isUsableCarFrame(img);
  return true;
}

function loadTileImage(item, index, timeoutMs = tileImageLoadTimeoutMs) {
  return new Promise((resolve, reject) => {
    if (typeof Image === "undefined") {
      reject(new Error("Image loading is unavailable."));
      return;
    }

    const img = new Image();
    let settled = false;
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error("Image load timed out."));
    }, timeoutMs);

    const finish = async () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);

      if (!isLoadedImageUsable(item, img)) {
        reject(new Error("Image failed quality gate."));
        return;
      }

      if (typeof img.decode === "function") {
        try {
          await img.decode();
        } catch {
          // A loaded image is still usable if decode() has no extra work to do.
        }
      }

      resolve(loadedImageDimensions(img));
    };

    img.addEventListener("load", finish, { once: true });
    img.addEventListener("error", () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      reject(new Error("Image failed to load."));
    }, { once: true });
    img.decoding = "async";
    img.fetchPriority = index < immediateFetchPriorityCount ? "high" : "low";
    img.src = imageFor(item);
    if (img.complete && (img.naturalWidth || img.naturalHeight)) {
      finish();
    }
  });
}

function createTile(item, index, onHide, onQualityReject, loadedImage = null) {
  const tile = document.createElement("article");
  const category = categoryFor(item);
  const key = sourceKey(item);
  const visualGroup = visualGroupFor(item);
  const loaded = loadedImage || item.loadedImage || null;
  tile.className = `tile tile--${item.shape || "standard"}`;
  tile.dataset.category = category;
  if (key) tile.dataset.sourceKey = key;
  if (visualGroup) tile.dataset.visualGroup = visualGroup;
  if (item.person) tile.dataset.person = item.person;
  if (item.focus) {
    tile.style.setProperty("--focus", item.focus);
  }
  Object.entries(toneFor(item)).forEach(([key, value]) => {
    tile.style.setProperty(`--${key}`, value);
  });

  const link = document.createElement("a");
  link.className = "tile-link";
  link.href = sourceFor(item);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", item.caption);

  const img = document.createElement("img");
  img.alt = "";
  img.loading = "eager";
  img.decoding = "async";
  img.fetchPriority = index < batchSize ? "high" : "low";
  img.addEventListener("error", () => {
    if (typeof onQualityReject === "function") {
      onQualityReject(item, tile);
      return;
    }
    tile.remove();
  }, { once: true });
  let finalizeCarFrame = null;
  if (category === "car") {
    let carFrameFinalized = false;
    finalizeCarFrame = () => {
      if (carFrameFinalized || !img.naturalWidth || !img.naturalHeight) return;
      carFrameFinalized = true;
      fitCarTileToImage(tile, img);
    };
    if (!loaded) img.addEventListener("load", finalizeCarFrame, { once: true });
  }
  const markLoaded = () => {
    if (!tile.isConnected || !img.naturalWidth || !img.naturalHeight) return;
    tile.classList.add("is-loaded");
  };
  if (!loaded) img.addEventListener("load", markLoaded, { once: true });
  img.src = imageFor(item);
  if (loaded && loaded.naturalWidth && loaded.naturalHeight) {
    tile.classList.add("is-loaded");
    if (category === "car") fitCarTileToImage(tile, loaded);
  } else {
    if (typeof finalizeCarFrame === "function") {
      finalizeCarFrame();
      setTimeout(finalizeCarFrame, 2500);
      setTimeout(finalizeCarFrame, 7000);
    }
    markLoaded();
    setTimeout(markLoaded, 2500);
  }

  const caption = document.createElement("span");
  caption.className = "caption";
  const captionText = document.createElement("span");
  captionText.textContent = item.caption;
  caption.append(captionText);

  link.append(img, caption);
  tile.append(link);
  return tile;
}

function removeTileElement(wall, key, tileElement = null) {
  if (tileElement && tileElement.dataset && tileElement.dataset.sourceKey === key) {
    if (tileElement.isConnected) tileElement.remove();
    return true;
  }

  const tiles = wall.querySelectorAll(".tile");
  for (const tile of tiles) {
    if (tile.dataset.sourceKey === key) {
      tile.remove();
      return true;
    }
  }
  return false;
}

function yieldToBrowser(delay = 0) {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && typeof window.setTimeout === "function") {
      window.setTimeout(resolve, delay);
    } else {
      setTimeout(resolve, delay);
    }
  });
}

function createMasonryColumn() {
  const column = document.createElement("div");
  column.className = "masonry-column";
  column.dataset.heightScore = "0";
  column.__yumRecentTiles = [];
  return column;
}

function ensureWallColumns(wall) {
  const count = columnCount();
  const columns = Array.from(wall.querySelectorAll(".masonry-column"));
  if (columns.length === count) return true;
  if (columns.length > 0) return false;

  const nextColumns = Array.from({ length: count }, createMasonryColumn);
  wall.style.setProperty("--columns", count);
  wall.__yumRecentTiles = [];
  wall.__yumPlacedBands = [];
  wall.replaceChildren(...nextColumns);
  return true;
}

function estimatedTileHeightScore(item, column, loadedImage = null) {
  const columnWidth = Math.max(
    220,
    Number(column && (column.clientWidth || column.getBoundingClientRect().width)) || 320
  );
  if (categoryFor(item) === "car") {
    const width = Number(loadedImage && loadedImage.naturalWidth) || 0;
    const height = Number(loadedImage && loadedImage.naturalHeight) || 0;
    if (width && height) return columnWidth * (height / width);
  }
  return columnWidth * shapeScore(item);
}

function appendTileElement(wall, item, index, onHide, onQualityReject, loadedImage = null) {
  if (!ensureWallColumns(wall)) return false;
  const columns = Array.from(wall.querySelectorAll(".masonry-column"));
  if (!columns.length) return false;

  const category = categoryFor(item);
  const person = personFor(item);
  const visualGroup = visualGroupFor(item);
  const shouldSpacePerson = cameoPeople.length > 1;
  const globalRecentTiles = wall.__yumRecentTiles || [];
  const columnScores = columns.map((column) => column.scrollHeight || Number(column.dataset.heightScore) || 0);
  const shortestScore = Math.min(...columnScores);
  const target = columns.reduce((best, column) => {
    const lastTile = column.lastElementChild;
    const recentTiles = column.__yumRecentTiles || [];
    const columnScore = column.scrollHeight || Number(column.dataset.heightScore) || 0;
    const balanceGap = columnScore - shortestScore;
    let score = columnScore;
    const varietyWeight = balanceGap > 720 ? 0.18 : (balanceGap > 360 ? 0.42 : 1);
    if (lastTile?.dataset.category === category) score += 120 * varietyWeight;
    if (shouldSpacePerson && person && lastTile?.dataset.person === person) score += 180 * varietyWeight;
    score += recentTiles.filter((tile) => tile.dataset.category === category).length * 45 * varietyWeight;
    score += globalRecentTiles.filter((tile) => tile.dataset.category === category).length * 8 * varietyWeight;
    if (shouldSpacePerson && person) {
      score += recentTiles.filter((tile) => tile.dataset.person === person).length * 160 * varietyWeight;
      score += globalRecentTiles.filter((tile) => tile.dataset.person === person).length * 35 * varietyWeight;
    }
    if (visualGroup) {
      if (lastTile?.dataset.visualGroup === visualGroup) score += 1600 * varietyWeight;
      score += recentTiles.filter((tile) => tile.dataset.visualGroup === visualGroup).length * 820 * varietyWeight;
      score += globalRecentTiles.filter((tile) => tile.dataset.visualGroup === visualGroup).length * 180 * varietyWeight;
    }
    return score < best.score ? { column, score } : best;
  }, { column: columns[0], score: Number.POSITIVE_INFINITY }).column;

  const targetHeightScore = target.scrollHeight || Number(target.dataset.heightScore) || 0;
  const itemShapeScore = estimatedTileHeightScore(item, target, loadedImage) + 9;
  const tile = createTile(item, index, onHide, onQualityReject, loadedImage);
  tile.dataset.stackMidScore = String(targetHeightScore + (itemShapeScore / 2));
  target.append(tile);
  target.dataset.heightScore = String(targetHeightScore + itemShapeScore);
  target.__yumRecentTiles = (target.__yumRecentTiles || []).concat(tile).slice(-8);
  wall.__yumRecentTiles = (wall.__yumRecentTiles || []).concat(tile).slice(-32);
  wall.__yumPlacedBands = (wall.__yumPlacedBands || []).concat({
    person,
    visualGroup,
    midScore: Number(tile.dataset.stackMidScore) || 0,
  }).slice(-180);
  return true;
}

async function appendTileElementsInChunks(wall, items, startIndex, onHide, onQualityReject, options = {}) {
  if (!items.length) return { ok: true, appended: 0, rejected: 0 };
  if (!ensureWallColumns(wall)) return { ok: false, appended: 0, rejected: 0 };

  const concurrency = Math.max(1, Math.min(options.concurrency || tilePreloadConcurrency, items.length));
  let nextOffset = 0;
  let appended = 0;
  let rejected = 0;

  const worker = async () => {
    while (nextOffset < items.length) {
      const offset = nextOffset;
      nextOffset += 1;
      const item = items[offset];
      const index = startIndex + offset;
      if (typeof options.onPendingChange === "function") options.onPendingChange(1);

      try {
        const loadedImage = await loadTileImage(item, index);
        const loadedItem = { ...item, loadedImage };
        const appendIndex = typeof options.nextIndex === "function" ? options.nextIndex() : index;
        if (!appendTileElement(wall, loadedItem, appendIndex, onHide, onQualityReject, loadedImage)) {
          rejected += 1;
          if (typeof onQualityReject === "function") await onQualityReject(item, null);
          continue;
        }
        appended += 1;
        if (typeof options.onAppended === "function") options.onAppended(loadedItem);
      } catch {
        rejected += 1;
        if (typeof onQualityReject === "function") await onQualityReject(item, null);
      } finally {
        if (typeof options.onPendingChange === "function") options.onPendingChange(-1);
        await yieldToBrowser();
      }
    }
  };

  const workers = [];
  for (let index = 0; index < concurrency; index += 1) {
    // Start workers without appending hidden tiles to the visible wall.
    workers.push(worker());
  }
  await Promise.all(workers);
  return { ok: true, appended, rejected };
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

function personFor(item) {
  return item.person || "";
}

function carGroupFor(item, text) {
  if (item && item.carGroup) return item.carGroup;
  if (/a0j42547|manhattan gray|parchment beige|black optic/i.test(text)) return "car:audi-a3-a0j42547";
  if (isMiniTwoDoorText(text)) return "car:mini-cooper-2-door";
  if (/m235|2 series gran coupe|gran-coup|gran coupe|t0445698|p90572[234]/i.test(text)) return "car:bmw-m235-gran-coupe";
  if (/m340i/i.test(text)) return "car:bmw-m340i";
  if (/330i/i.test(text)) return "car:bmw-330i";
  if (/m340i|330i|3 series|g20/i.test(text)) return "car:bmw-3-series";
  if (/\bm3\b|g80/i.test(text)) return "car:bmw-m3";
  if (/\bcla\b/i.test(text)) return "car:mercedes-cla";
  if (/c-class|c class|w206/i.test(text)) return "car:mercedes-c-class";
  if (/\brs3\b/i.test(text)) return "car:audi-rs3";
  if (/\bs3\b/i.test(text)) return "car:audi-s3-white";
  if (/\ba3\b/i.test(text)) return "car:audi-a3";
  if (/\ba4\b/i.test(text)) return "car:audi-a4";
  if (/\ba5\b/i.test(text)) return "car:audi-a5";
  if (/mercedes|benz/i.test(text)) return "car:mercedes-sedan";
  if (/audi/i.test(text)) return "car:audi-sedan";
  if (/bmw/i.test(text)) return "car:bmw-sedan";
  return "";
}

function visualGroupFor(item) {
  if (!item) return "";
  const category = categoryFor(item);
  const person = personFor(item);
  const text = [
    item.file,
    item.sourceId,
    item.url,
    item.image,
    item.caption,
    item.albumLabel,
  ].map((value) => normalizeSourceText(value || "").toLowerCase()).join(" ");

  if (category === "kpop" && person) {
    const dateMatch = text.match(/\b(?:20)?\d{6}\b/);
    if (dateMatch) return `${person}:${dateMatch[0]}`;

    const sourceMatch = text.match(/kpopping\.com\/kpics\/([^?\s]+)/);
    if (sourceMatch) return `${person}:${sourceMatch[1].replace(/[-_]+/g, " ")}`;

    const shootTerms = [
      "airport",
      "bvlgari",
      "dior",
      "dyson",
      "kerastase",
      "marie claire",
      "miumiu",
      "olens",
      "rimowa",
      "seoul fashion week",
      "tommy",
    ];
    const shoot = shootTerms.find((term) => text.includes(term));
    if (shoot) return `${person}:${shoot}`;
  }

  if (category === "car") {
    const group = carGroupFor(item, text);
    if (group) return group;
    if (item.visualGroup) return item.visualGroup;
  }

  return `${person || category}:${canonicalFileKey(item.file || item.sourceId || item.url || item.image || item.caption)}`;
}

function layoutWall(wall, renderedItems, onHide, onQualityReject) {
  const count = columnCount();
  const columns = Array.from({ length: count }, createMasonryColumn);
  const heights = Array.from({ length: count }, () => 0);
  const lastCategoryByColumn = Array.from({ length: count }, () => "");
  const lastPersonByColumn = Array.from({ length: count }, () => "");
  const lastVisualGroupByColumn = Array.from({ length: count }, () => "");
  const recentPeopleByColumn = Array.from({ length: count }, () => []);
  const recentPeople = [];
  const recentVisualGroupsByColumn = Array.from({ length: count }, () => []);
  const recentVisualGroups = [];
  const placedBands = [];

  function placementScore(item, columnIndex) {
    const category = categoryFor(item);
    const person = personFor(item);
    const visualGroup = visualGroupFor(item);
    const shouldSpacePerson = cameoPeople.length > 1;
    const columnPeople = recentPeopleByColumn[columnIndex];
    const columnVisualGroups = recentVisualGroupsByColumn[columnIndex];
    const shortestHeight = Math.min(...heights);
    const balanceGap = heights[columnIndex] - shortestHeight;
    const candidateMidScore = heights[columnIndex] + ((shapeScore(item) + 0.03) / 2);
    const varietyWeight = balanceGap > 1.65 ? 0.22 : (balanceGap > 0.85 ? 0.48 : 1);
    let score = heights[columnIndex] + (lastCategoryByColumn[columnIndex] === category ? 0.55 : 0);

    if (shouldSpacePerson && person) {
      if (lastPersonByColumn[columnIndex] === person) score += 4.5 * varietyWeight;
      score += columnPeople.filter((recentPerson) => recentPerson === person).length * 2.2 * varietyWeight;
      score += recentPeople.filter((recentPerson) => recentPerson === person).length * 1.1 * varietyWeight;
    }
    if (visualGroup) {
      if (lastVisualGroupByColumn[columnIndex] === visualGroup) score += 34 * varietyWeight;
      score += columnVisualGroups.filter((recentGroup) => recentGroup === visualGroup).length * 17 * varietyWeight;
      score += recentVisualGroups.filter((recentGroup) => recentGroup === visualGroup).length * 8.5 * varietyWeight;
    }
    placedBands.forEach((band) => {
      const bandDistance = Math.abs(band.midScore - candidateMidScore);
      if (visualGroup && band.visualGroup === visualGroup && bandDistance < 6.4) {
        score += (6.4 - bandDistance) * 4.8 * varietyWeight;
      }
    });

    return score;
  }

  renderedItems.forEach((item, index) => {
    const category = categoryFor(item);
    const person = personFor(item);
    const visualGroup = visualGroupFor(item);
    let target = 0;
    for (let i = 1; i < heights.length; i += 1) {
      const score = placementScore(item, i);
      const targetScore = placementScore(item, target);
      if (score < targetScore) target = i;
    }
    const tileShapeScore = shapeScore(item) + 0.03;
    const tileMidScore = heights[target] + (tileShapeScore / 2);
    const tile = createTile(item, index, onHide, onQualityReject, item.loadedImage || null);
    tile.dataset.stackMidScore = String(tileMidScore);
    columns[target].append(tile);
    columns[target].__yumRecentTiles = (columns[target].__yumRecentTiles || []).concat(tile).slice(-8);
    lastCategoryByColumn[target] = category;
    if (visualGroup) {
      lastVisualGroupByColumn[target] = visualGroup;
      recentVisualGroupsByColumn[target].push(visualGroup);
      if (recentVisualGroupsByColumn[target].length > 5) recentVisualGroupsByColumn[target].shift();
      recentVisualGroups.push(visualGroup);
      if (recentVisualGroups.length > 18) recentVisualGroups.shift();
    }
    if (person) {
      lastPersonByColumn[target] = person;
      recentPeopleByColumn[target].push(person);
      if (recentPeopleByColumn[target].length > 4) recentPeopleByColumn[target].shift();
      recentPeople.push(person);
      if (recentPeople.length > 12) recentPeople.shift();
    }
    placedBands.push({ person, visualGroup, midScore: tileMidScore });
    if (placedBands.length > 180) placedBands.shift();
    heights[target] += tileShapeScore;
    columns[target].dataset.heightScore = String(heights[target]);
  });

  wall.style.setProperty("--columns", count);
  wall.__yumRecentTiles = columns.flatMap((column) => Array.from(column.children)).slice(-32);
  wall.__yumPlacedBands = placedBands.slice(-180);
  wall.replaceChildren(...columns);
}

async function render() {
  await Promise.race([loadRemotePreferences(), yieldToBrowser(700)]);

  const main = document.createElement("main");
  main.className = "image-app";
  main.setAttribute("aria-label", "Yum media wall");

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
  let emptyRetryTimer = 0;
  let scheduledAppendTimer = 0;
  let appendRequestedWhileLoading = false;
  let feedStartSaved = false;
  let pendingTileLoads = 0;
  const renderedItems = [];

  const handleHide = (item, tileElement = null) => {
    const key = sourceKey(item);
    if (!key || hiddenKeySet.has(key) || pendingHideKeySet.has(key)) return;

    const category = categoryFor(item);
    const itemIndex = renderedItems.findIndex((renderedItem) => sourceKey(renderedItem) === key);
    const visibleSnapshot = nearbyVisibleItems(renderedItems, itemIndex, category, key);
    pendingHideKeySet.add(key);

    rememberHiddenItem(item, visibleSnapshot);

    if (itemIndex >= 0) {
      renderedItems.splice(itemIndex, 1);
      if (!removeTileElement(wall, key, tileElement)) {
        layoutWall(wall, renderedItems, handleHide, handleQualityReject);
      }
      if (shouldLoadAhead()) scheduleAppend();
    }

    window.setTimeout(() => {
      persistHiddenPreference(item, visibleSnapshot)
        .catch(() => false)
        .finally(() => {
          pendingHideKeySet.delete(key);
        });

      window.setTimeout(async () => {
        let replacement = null;
        try {
          replacement = await nextItemForCategory(feedState, category);
        } catch {
          replacement = null;
        }

        if (replacement) {
          const result = await appendTileElementsInChunks(wall, [replacement], renderedItems.length, handleHide, handleQualityReject, {
            concurrency: 1,
            onPendingChange: (delta) => {
              pendingTileLoads = Math.max(0, pendingTileLoads + delta);
            },
            nextIndex: () => renderedItems.length,
            onAppended: (loadedItem) => {
              renderedItems.push(loadedItem);
            },
          });
          if (!result.ok) layoutWall(wall, renderedItems, handleHide, handleQualityReject);
          if (shouldLoadAhead()) scheduleAppend();
        }
      }, 20);
    }, 0);
  };

  const handleQualityReject = async (item, tileElement = null) => {
    const key = sourceKey(item);
    const category = categoryFor(item);
    if (!key || !category) return;

    lowQualityRejectedKeySet.add(key);
    prefetchOnlineItemsForCategory(feedState, category);
    const itemIndex = renderedItems.findIndex((renderedItem) => sourceKey(renderedItem) === key);
    if (itemIndex < 0) {
      if (tileElement && tileElement.isConnected) tileElement.remove();
      scheduleAppend(80);
      return;
    }

    renderedItems.splice(itemIndex, 1);
    if (!removeTileElement(wall, key, tileElement)) {
      layoutWall(wall, renderedItems, handleHide, handleQualityReject);
    }

    let replacement = null;
    try {
      replacement = await nextItemForCategory(feedState, category);
    } catch {
      replacement = null;
    }

    if (replacement) {
      const result = await appendTileElementsInChunks(wall, [replacement], renderedItems.length, handleHide, handleQualityReject, {
        concurrency: 1,
        onPendingChange: (delta) => {
          pendingTileLoads = Math.max(0, pendingTileLoads + delta);
        },
        nextIndex: () => renderedItems.length,
        onAppended: (loadedItem) => {
          renderedItems.push(loadedItem);
        },
      });
      if (!result.ok) layoutWall(wall, renderedItems, handleHide, handleQualityReject);
    }
    if (needsRenderBuffer() || shouldLoadAhead()) scheduleAppend(80);
  };

  const shouldLoadAhead = () => {
    if (pendingTileCount() >= batchSize) return false;
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      wall.scrollHeight,
    );
    const columns = Array.from(wall.querySelectorAll(".masonry-column"));
    const columnHeights = columns
      .map((column) => column.scrollHeight || 0)
      .filter((height) => height > 0);
    const shortestColumnBottom = columnHeights.length
      ? wall.offsetTop + Math.min(...columnHeights)
      : scrollHeight;
    const effectiveScrollHeight = Math.min(scrollHeight, shortestColumnBottom);
    const loadAheadDistance = Math.max(1200, viewportHeight * 1.8);
    return effectiveScrollHeight - (scrollTop + viewportHeight) < loadAheadDistance;
  };

  const liveTileCount = () => renderedItems.length;
  const pendingTileCount = () => pendingTileLoads;
  const renderedCategoryCounts = () => {
    const counts = Object.fromEntries(categories.map((category) => [category, 0]));
    renderedItems.forEach((item) => {
      const category = categoryFor(item);
      if (category && Object.prototype.hasOwnProperty.call(counts, category)) counts[category] += 1;
    });
    return counts;
  };
  const nextBalanceItems = async () => {
    const counts = renderedCategoryCounts();
    const items = [];
    let maxCount = Math.max(...categories.map((category) => counts[category] || 0));
    let guard = categories.length * 4;

    while (guard > 0) {
      guard -= 1;
      const deficitCategory = categories
        .slice()
        .sort((left, right) => (counts[left] || 0) - (counts[right] || 0))
        .find((category) => (counts[category] || 0) < maxCount);
      if (!deficitCategory) break;
      const item = await nextItemForCategory(feedState, deficitCategory);
      if (!item) break;
      items.push(item);
      counts[deficitCategory] = (counts[deficitCategory] || 0) + 1;
      maxCount = Math.max(...categories.map((category) => counts[category] || 0));
    }

    return items;
  };

  const nextLooseItems = async (targetCount = batchSize) => {
    const counts = renderedCategoryCounts();
    const items = [];
    let guard = targetCount * categories.length * 2;

    while (items.length < targetCount && guard > 0) {
      guard -= 1;
      const orderedCategories = categories
        .slice()
        .sort((left, right) => (counts[left] || 0) - (counts[right] || 0));
      let added = false;

      for (const category of orderedCategories) {
        if (items.length >= targetCount) break;
        if (!hasAvailableUnique(feedState, category)) {
          if (category === "food") ensureFoodFallbackVariety(feedState, onlineBatchSize);
          if (category === "kpop") ensureKpopFallbackVariety(feedState);
          if (category === "car") ensureCarFallbackVariety(feedState, onlineBatchSize, true);
        }

        let item = await nextItemForCategory(feedState, category);
        if (!item) item = dequeueAnyUnique(feedState, category);
        if (!item) continue;

        items.push(item);
        counts[category] = (counts[category] || 0) + 1;
        added = true;
      }

      if (!added) break;
    }

    return items;
  };

  const needsViewportCoverage = () => {
    const liveTiles = Array.from(wall.querySelectorAll(".tile.is-loaded"));
    if (!liveTiles.length) return true;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    let visibleCount = 0;
    let lowestTileBottom = Number.NEGATIVE_INFINITY;
    for (const tile of liveTiles) {
      const rect = tile.getBoundingClientRect();
      if (rect.bottom >= 0 && rect.top <= viewportHeight) visibleCount += 1;
      if (rect.bottom > lowestTileBottom) lowestTileBottom = rect.bottom;
    }
    return visibleCount < 2 && lowestTileBottom < viewportHeight + Math.max(900, viewportHeight * 0.9);
  };
  const needsRenderBuffer = () => {
    const live = liveTileCount();
    const pending = pendingTileCount();
    const active = live + pending;
    const targetBuffer = Math.max(batchSize, columnCount() * 10);
    return live < targetBuffer && active < targetBuffer;
  };

  const needsColumnFill = () => {
    const columns = Array.from(wall.querySelectorAll(".masonry-column"));
    if (columns.length < 2) return false;
    const heights = columns
      .map((column) => column.scrollHeight || 0)
      .filter((height) => height > 0);
    if (heights.length < 2) return false;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    return Math.max(...heights) - Math.min(...heights) > Math.max(900, viewportHeight * 1.15);
  };

  const scheduleAppend = (delay = 0) => {
    if (exhausted) return;
    if (loading) {
      appendRequestedWhileLoading = true;
      return;
    }
    if (scheduledAppendTimer) return;
    scheduledAppendTimer = window.setTimeout(() => {
      scheduledAppendTimer = 0;
      appendBatch();
    }, delay);
  };

  if (typeof window !== "undefined") {
    window.__yumFeedDebug = () => ({
      rendered: renderedItems.length,
      liveTiles: liveTileCount(),
      pendingTiles: pendingTileCount(),
      queues: Object.fromEntries(categories.map((category) => [
        category,
        feedState.queues[category].length,
      ])),
      counts: renderedCategoryCounts(),
      seen: feedState.seenKeys.size,
      exhausted,
      loading,
      appendRequestedWhileLoading,
      shouldLoadAhead: shouldLoadAhead(),
      needsViewportCoverage: needsViewportCoverage(),
      needsRenderBuffer: needsRenderBuffer(),
      needsColumnFill: needsColumnFill(),
    });
    window.__yumAppendNow = () => scheduleAppend();
  }

  const ensureImmediateRefillQueues = () => {
    ensureFoodFallbackVariety(feedState, batchSize);
    ensureKpopFallbackVariety(feedState);
    ensureCarFallbackVariety(feedState, batchSize);
  };

  const appendBatch = async () => {
    if (exhausted) return;
    if (loading) {
      appendRequestedWhileLoading = true;
      return;
    }
    loading = true;
    let retryScheduled = false;
    try {
      if (needsRenderBuffer() || shouldLoadAhead()) {
        ensureImmediateRefillQueues();
      }
      const balanceItems = await nextBalanceItems();
      const mixedTarget = Math.max(0, batchSize - balanceItems.length);
      let nextItems = balanceItems.concat(await nextMixedItems(feedState, mixedTarget));
      if (!nextItems.length) {
        nextItems = await nextLooseItems(batchSize);
      }
      if (!nextItems.length && feedState.exhausted) {
        exhausted = true;
      }
      if (!nextItems.length && !exhausted) {
        window.clearTimeout(emptyRetryTimer);
        const retryDelay = feedState.emptyBatches > 2 ? 1600 : 450;
        emptyRetryTimer = window.setTimeout(() => scheduleAppend(), retryDelay);
        retryScheduled = true;
        return;
      }

      const startIndex = renderedItems.length;
      const result = await appendTileElementsInChunks(wall, nextItems, startIndex, handleHide, handleQualityReject, {
        onPendingChange: (delta) => {
          pendingTileLoads = Math.max(0, pendingTileLoads + delta);
        },
        nextIndex: () => renderedItems.length,
        onAppended: (loadedItem) => {
          renderedItems.push(loadedItem);
        },
      });
      if (!feedStartSaved && renderedItems.length) {
        feedStartSaved = true;
        saveFeedStartKeys(renderedItems);
      }
      if (!result.ok) {
        layoutWall(wall, renderedItems, handleHide, handleQualityReject);
      }
      sentinel.dataset.remaining = String(categories.reduce((total, category) => total + feedState.queues[category].length, 0));
      prefetchOnlineItems(feedState);
    } finally {
      loading = false;
      const needsAnotherAppend = !exhausted
        && !retryScheduled
        && (appendRequestedWhileLoading || needsRenderBuffer() || shouldLoadAhead() || needsViewportCoverage());
      if (needsAnotherAppend) {
        appendRequestedWhileLoading = false;
        scheduleAppend(80);
      } else {
        appendRequestedWhileLoading = false;
      }
    }
  };

  scheduleAppend();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (pendingTileCount() === 0 && shouldLoadAhead() && entries.some((entry) => entry.isIntersecting)) {
        scheduleAppend();
        Promise.resolve().then(() => {
          if (exhausted) observer.disconnect();
        });
      }
    }, { rootMargin: "1600px 0px" });
    observer.observe(sentinel);
  }

  let scrollCheckScheduled = false;
  window.addEventListener("scroll", () => {
    if (scrollCheckScheduled) return;
    scrollCheckScheduled = true;
    window.requestAnimationFrame(() => {
      scrollCheckScheduled = false;
      if (needsRenderBuffer() || shouldLoadAhead()) scheduleAppend();
    });
  }, { passive: true });

  const refillHeartbeat = window.setInterval(() => {
    if (exhausted) {
      window.clearInterval(refillHeartbeat);
      return;
    }
    if (needsRenderBuffer() || shouldLoadAhead() || needsViewportCoverage()) scheduleAppend();
  }, 900);

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      layoutWall(wall, renderedItems, handleHide, handleQualityReject);
      if (needsRenderBuffer() || shouldLoadAhead() || needsViewportCoverage()) scheduleAppend();
    }, 140);
  }, { passive: true });

  main.append(wall, marker, sentinel);
  app.replaceChildren(main);
}

render();
