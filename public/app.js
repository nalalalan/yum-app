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

function bmwPressImage(id) {
  return `https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=${id}&attachment=1&actEvent=image`;
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
  "Salmon Sushi (3332911172).jpg",
  "Salmon sushi (20250322).jpg",
  "Salmon Sushi.jpg",
  "Salmon sushi.jpg",
]);

baseItems.push(
  { image: unsplashImage("1568901346375-23c9450c58cd"), url: unsplashSource("burger close up"), caption: "Stacked burger, glossy bun, clean melted-cheese pull.", shape: "portrait", focus: "center 50%" },
  { image: unsplashImage("1540189549336-e6e99c3679fe"), url: unsplashSource("restaurant food table"), caption: "Restaurant table spread, warm plates and rich dinner color.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1504674900247-0877df9cc836"), url: unsplashSource("salmon dinner"), caption: "Salmon dinner, crisp color and clean plate light.", shape: "cinema", focus: "center 50%" },
  { image: unsplashImage("1529042410759-befb1204b468"), url: unsplashSource("burger fries"), caption: "Burger and fries, big diner comfort with a polished crop.", shape: "wide", focus: "center 52%" },
  { image: unsplashImage("1546069901-ba9599a7e63c"), url: unsplashSource("fried chicken"), caption: "Fried chicken, golden crunch and hot-table energy.", shape: "portrait", focus: "center 52%" },
  { image: unsplashImage("1512621776951-a57141f2eefd"), url: unsplashSource("grain bowl"), caption: "Bright bowl, clean vegetables and sharp color contrast.", shape: "square", focus: "center 50%" },
  { image: unsplashImage("1484723091739-30a097e8f929"), url: unsplashSource("steak plate"), caption: "Steak plate, browned crust and moody restaurant finish.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1498837167922-ddd27525d352"), url: unsplashSource("pancake breakfast"), caption: "Breakfast plate, soft syrup shine and clean morning color.", shape: "portrait", focus: "center 48%" },
  { image: unsplashImage("1467003909585-2f8a72700288"), url: unsplashSource("food table"), caption: "Shared table spread, bright plates and easy dinner chaos.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1565958011703-44f9829ba187"), url: unsplashSource("pizza close up"), caption: "Pizza close-up, melted cheese and crisp edge detail.", shape: "cinema", focus: "center 52%" },
  { image: unsplashImage("1555939594-58d7cb561ad1"), url: unsplashSource("noodle bowl"), caption: "Noodle bowl, deep broth and glossy toppings.", shape: "portrait", focus: "center 48%" },
  { image: unsplashImage("1559847844-5315695dadae"), url: unsplashSource("sushi close up"), caption: "Sushi close-up, clean fish color and tight plating.", shape: "square", focus: "center 50%" },
  { image: unsplashImage("1476224203421-9ac39bcb3327"), url: unsplashSource("burger restaurant"), caption: "Restaurant burger, toasted bun and serious stack.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1512058564366-18510be2db19"), url: unsplashSource("asian noodles"), caption: "Noodles with deep sauce color and clean chopstick energy.", shape: "portrait", focus: "center 50%" },
  { image: unsplashImage("1481931098730-318b6f776db0"), url: unsplashSource("sushi platter"), caption: "Sushi platter, polished rows and bright fish color.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1544025162-d76694265947"), url: unsplashSource("pizza slice"), caption: "Pizza slice, melted cheese and crisp crust.", shape: "square", focus: "center 50%" },
  { image: unsplashImage("1574071318508-1cdbab80d002"), url: unsplashSource("margherita pizza"), caption: "Margherita pizza, red sauce, basil, and clean heat.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1513104890138-7c749659a591"), url: unsplashSource("pepperoni pizza"), caption: "Pepperoni pizza, loud color and classic comfort.", shape: "cinema", focus: "center 50%" },
  { image: unsplashImage("1598515214211-89d3c73ae83b"), url: unsplashSource("ramen noodles"), caption: "Ramen-style noodles, warm broth and tight bowl crop.", shape: "portrait", focus: "center 50%" },
  { image: unsplashImage("1567620905732-2d1ec7ab7445"), url: unsplashSource("breakfast pancakes"), caption: "Pancakes, soft stack and glossy breakfast light.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1547592166-23ac45744acd"), url: unsplashSource("pasta plate"), caption: "Pasta plate, clean sauce and soft table light.", shape: "square", focus: "center 50%" },
  { image: unsplashImage("1550547660-d9450f859349"), url: unsplashSource("noodles close up"), caption: "Noodles close-up, glossy sauce and sharp texture.", shape: "wide", focus: "center 50%" },
  { image: unsplashImage("1554998171-89445e31c52b"), url: unsplashSource("restaurant plate"), caption: "Restaurant plate, tidy plating and rich color.", shape: "portrait", focus: "center 50%" },
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
  { file: "Tonkatsu Ganko Shinsaibashi.jpg", caption: "Tonkatsu set, crisp pork and calm restaurant light.", shape: "portrait", focus: "center 50%" },
  { file: "Korean cuisine-Kimchi bokkeumbap-01.jpg", caption: "Kimchi fried rice, deep red gloss and hot-pan comfort.", shape: "wide", focus: "center 50%" },
  { file: "A bowl of Kimchi Fried Rice.jpg", caption: "Kimchi fried rice bowl, rich color and compact comfort.", shape: "wide", focus: "center 50%" },
  { file: "Korean stew-Budae jjigae-01.jpg", caption: "Budae jjigae, bubbling broth and cozy heat.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae after boiling.jpg", caption: "Budae jjigae after boiling, glossy broth and soft steam.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae 2014-12-14 (1).jpg", caption: "Budae jjigae table frame, full pot and warm broth.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae (28048555734).jpg", caption: "Budae jjigae, dense broth and a generous pot.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae (28049377433).jpg", caption: "Budae jjigae, rich red soup and comfort-table energy.", shape: "wide", focus: "center 50%" },
  { file: "Budae jjigae (28587380901).jpg", caption: "Budae jjigae, glossy broth and full dinner warmth.", shape: "wide", focus: "center 50%" },
  { file: "Fried Chicken (Unsplash).jpg", caption: "Fried chicken, golden crust and sharp table light.", shape: "wide", focus: "center 50%" },
  { file: "Boneless chicken wings and fries.jpg", caption: "Boneless chicken wings and fries, crisp and heavy.", shape: "square", focus: "center 50%" },
  { file: "Lasagne side.png", caption: "Lasagne slice, molten layers and deep red sauce.", shape: "wide", focus: "center 50%" },
  { file: "Original Mac n Cheese .jpg", caption: "Mac and cheese, creamy folds and warm diner color.", shape: "square", focus: "center 50%" },
  { file: "Boston Market Mac and Cheese (35116783173).jpg", caption: "Mac and cheese, soft pasta and rich sauce.", shape: "wide", focus: "center 50%" },
  { file: "Mac and cheese (3123345645).jpg", caption: "Mac and cheese, glossy comfort in a tight crop.", shape: "wide", focus: "center 50%" },
  { file: "Mac and Cheese (4999893437).jpg", caption: "Mac and cheese, golden sauce and clean plate shine.", shape: "wide", focus: "center 50%" },
  { file: "Pulled pork with mac and cheese at the office.jpg", caption: "Pulled pork with mac and cheese, rich and heavy.", shape: "wide", focus: "center 50%" },
  { file: "Trenne Carbonara (3113690414).jpg", caption: "Trenne carbonara, creamy pasta and sharp black pepper.", shape: "wide", focus: "center 50%" },
  { file: "Pasta Carbonara in Yl\u00e4maa.jpg", caption: "Carbonara, glossy sauce and a clean restaurant plate.", shape: "portrait", focus: "center 50%" },
  { file: "Pasta Carbonara at restaurant Vltava.jpg", caption: "Carbonara at a restaurant, soft pasta and warm sauce.", shape: "wide", focus: "center 50%" },
  { file: "Pasta carbonara at Gete Deli.jpg", caption: "Carbonara plate, rich sauce and soft table light.", shape: "wide", focus: "center 50%" },
  { file: "Pasta Carbonara in Vyborg (cropped).jpg", caption: "Carbonara close frame, creamy and clean.", shape: "cinema", focus: "center 50%" },
  { file: "Fuddruckers cheeseburger and steak fries.jpg", caption: "Cheeseburger and steak fries, big diner plate.", shape: "wide", focus: "center 50%" },
  { file: "Cheeseburger and steak fries at Rentier-Burger.jpg", caption: "Cheeseburger with steak fries, crisp and generous.", shape: "wide", focus: "center 50%" },
  { file: "Hamburger and fries - Grand Union, Lambeth North, London.jpg", caption: "Hamburger and fries, polished pub-table comfort.", shape: "wide", focus: "center 50%" },
  { file: "Cheeseburger and fries, Elephant Bar, Cupertino, CA.jpg", caption: "Cheeseburger and fries, clean diner color.", shape: "wide", focus: "center 50%" },
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
  { file: "Whataburger hamburger and fries.jpg", caption: "Hamburger and fries, diner stack and crisp edges.", shape: "wide", focus: "center 50%" },
  { file: "Hamburger and fries - Brownswood, Finsbury Park, London.jpg", caption: "Hamburger and fries, pub-table comfort.", shape: "wide", focus: "center 50%" },
  { file: "2019-02-15 20 51 38 A bacon cheeseburger and french fries at the Applebee's in Fair Lakes, Fairfax County, Virginia.jpg", caption: "Bacon cheeseburger and fries, big warm plate.", shape: "wide", focus: "center 50%" },
  { file: "Shoarma Carrefour Laval.jpg", caption: "Shawarma plate, warm meat and rich table color.", shape: "wide", focus: "center 50%" },
  { file: "Eating Pancakes (Unsplash).jpg", caption: "Pancakes, soft stack and syrup gloss.", shape: "wide", focus: "center 50%" },
  { file: "Pancake Breakfast (Unsplash).jpg", caption: "Pancake breakfast, warm stack and clean morning light.", shape: "wide", focus: "center 50%" },
  { file: "Pancakes with Walnuts.png", caption: "Pancakes with walnuts, soft stack and warm syrup.", shape: "square", focus: "center 50%" },
  { file: "NY breakfast 01.jpg", caption: "New York breakfast plate, rich diner comfort.", shape: "wide", focus: "center 50%" },
  { file: "NY breakfast 02.jpg", caption: "New York breakfast, warm plate and clean table light.", shape: "wide", focus: "center 50%" },
  { file: "Chicken wings at Hesburger.jpg", caption: "Chicken wings and fries, crisp and snackable.", shape: "wide", focus: "center 50%" },
  { file: "My old mother fried chicken wings at home.jpg", caption: "Homestyle fried chicken wings, golden and hot.", shape: "cinema", focus: "center 50%" },
  { file: "LOW CARB KETO FRIED CHICKEN by Keto Diet Delish Medium.jpg", caption: "Fried chicken close frame, crunchy crust and warm color.", shape: "wide", focus: "center 50%" },
  { file: "Mac and cheese (home cooking) August 2024.JPG", caption: "Mac and cheese, creamy home-cooked comfort.", shape: "wide", focus: "center 50%" },
  { file: "Mac and Cheese.jpg", caption: "Mac and cheese, golden sauce and soft pasta.", shape: "portrait", focus: "center 50%" },
  { file: "Budae jjigae before boiling.jpg", caption: "Budae jjigae pot, ready for rich broth.", shape: "wide", focus: "center 50%" },
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
    caption: "Wonyoung cameo, glossy event smile.",
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

addExternalCameos(haerinItems, "Haerin", "https://kpopping.com/kpics/240526-NewJeans-Haerin-How-Sweet-Bubble-Gum-at-Inkigayo", [
  ["https://legacy.kpopping.com/9f/1/240526-NewJeans-Haerin-How-Sweet-at-Inkigayo-documents-1.jpeg", "Haerin cameo, adult-era bright stage portrait.", "portrait", "center 36%"],
]);

addExternalCameos(haerinItems, "Haerin", "https://kpopping.com/kpics/240616-NewJeans-Haerin-How-Sweet-at-Inkigayo", [
  ["https://legacy.kpopping.com/71/2/240616-NewJeans-Haerin-How-Sweet-at-Inkigayo-documents-1.jpeg", "Haerin cameo, adult-era close stage glow.", "portrait", "center 34%"],
]);

addExternalCameos(hanniItems, "Hanni", "https://kpopping.com/kpics/240201-New-Jeans-Hanni-2024-F-W-Seoul-Fashion-Week", [
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/02/1770824189997-ozopbe-0.webp", "Hanni cameo, soft pigtail table-card glow.", "wide", "center 40%"],
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/02/1770773474221-kdd70c-0.webp", "Hanni cameo, black-sleeveless headband glow.", "portrait", "center 38%"],
]);

addExternalCameos(wonyoungItems, "Wonyoung", "https://kpopping.com/kpics/WONYOUNG-x-Tommy-Jeans-for-Marie-Claire-Korea-Special-Edition", [
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/05/1777792889590-ow8qtv-0.jpg", "Wonyoung cameo, red off-shoulder editorial spark.", "portrait", "center 36%"],
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/05/1777675586432-v6o3ir-0.jpg", "Wonyoung cameo, glossy shoulder-pose magazine glow.", "portrait", "center 38%"],
  ["https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/05/1777628047807-iz6r3x-0.jpg", "Wonyoung cameo, soft curl beauty-card glow.", "portrait", "center 38%"],
]);

const cameoItems = interleaveGroups([haerinItems, wonyoungItems, hanniItems]);

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
]);

const carItems = [
  {
    image: "https://mediapool.bmwgroup.com/cache/P9/202410/P90572660/P90572660-the-new-bmw-m235-xdrive-gran-coup-10-2024-2100px.jpg",
    url: "https://www.press.bmwgroup.com/usa/article/detail/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "White 2025 BMW M235 xDrive Gran Coupe, official press light and compact-sedan ambition.",
    carGroup: "car:bmw-m235-white",
    shape: "cinema",
    focus: "center 54%",
  },
  {
    image: "https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=P90572400&attachment=1&actEvent=image",
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "White BMW 2 Series Gran Coupe, crisp studio stance instead of parking-lot energy.",
    carGroup: "car:bmw-m235-white",
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
    caption: "White Mercedes-Benz CLA, sunset paint and compact luxury future.",
    carGroup: "car:mercedes-cla-white",
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

carItems.push(
  {
    image: bmwPressImage("P90572282"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, clean official exterior frame with real wallpaper energy.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572283"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, compact sedan stance in crisp press light.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572286"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, low clean frame and serious daily-driver energy.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572287"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW compact sedan, glossy official angle with no filler.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572288"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW 2 Series Gran Coupe, clean side profile and tight proportions.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572289"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235, compact official motion frame with polished paint.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572290"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, official exterior shot built for the wall.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572292"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW 2 Series Gran Coupe, clean press-gallery compact car shot.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572293"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW compact sedan, balanced official composition and sharp stance.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572295"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, clean front-three-quarter press shot.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572306"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, full road shot with clean compact-sedan movement.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572307"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW 2 Series Gran Coupe, full exterior frame under sharp architecture.",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90572308"),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: "BMW M235 Gran Coupe, clean road frame with the whole car visible.",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: bmwPressImage("P90543017"),
    url: "https://www.press.bmwgroup.com/usa/photo/detail/P90543017/MINI-John-Cooper-Works-Countryman-03-2024",
    caption: "MINI Countryman JCW, punchy compact crossover with clean official polish.",
    shape: "wide",
    focus: "center 52%",
  }
);

[
  "P90572309",
  "P90572310",
  "P90572311",
  "P90572312",
  "P90572313",
  "P90572314",
  "P90572315",
  "P90572316",
  "P90572317",
  "P90572318",
  "P90572319",
  "P90572320",
  "P90572332",
  "P90572333",
  "P90572337",
  "P90572340",
  "P90572342",
  "P90572343",
  "P90572344",
  "P90572345",
  "P90572346",
  "P90572347",
  "P90572348",
].forEach((id, index) => {
  carItems.push({
    image: bmwPressImage(id),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0445698EN_US/the-new-2025-bmw-2-series-gran-coupe?language=en_US",
    caption: `BMW M235 Gran Coupe, curated official full-car exterior ${index + 1}.`,
    carGroup: "car:bmw-m235-gran-coupe",
    shape: index % 5 === 0 ? "cinema" : "wide",
    focus: "center 52%",
  });
});

[
  "P90550995",
  "P90550998",
  "P90551001",
  "P90551003",
  "P90551005",
  "P90551006",
  "P90551007",
  "P90551008",
  "P90551009",
  "P90551010",
  "P90551013",
  "P90551015",
].forEach((id, index) => {
  carItems.push({
    image: bmwPressImage(id),
    url: "https://www.press.bmwgroup.com/usa/article/detail/T0433849EN_US/the-new-bmw-m3-cs?language=en_US",
    caption: `BMW M3 sedan, curated official full-car exterior ${index + 1}.`,
    carGroup: "car:bmw-m3",
    shape: index % 4 === 1 ? "cinema" : "wide",
    focus: "center 52%",
  });
});

[
  "P90557405",
  "P90557502",
  "P90557503",
  "P90557504",
  "P90557505",
  "P90557511",
  "P90557512",
  "P90557513",
  "P90557514",
].forEach((id, index) => {
  carItems.push({
    image: bmwPressImage(id),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0442513EN_US/the-new-bmw-m5-sedan?language=en_US",
    caption: `BMW M5 sedan, curated official green full-car exterior ${index + 1}.`,
    carGroup: "car:bmw-m5-green",
    shape: index % 4 === 2 ? "cinema" : "wide",
    focus: "center 52%",
  });
});

[
  "P90575570",
  "P90575571",
  "P90575572",
  "P90575573",
  "P90575574",
  "P90575575",
  "P90575576",
  "P90575577",
  "P90575578",
  "P90575579",
  "P90575580",
  "P90575581",
  "P90575582",
  "P90575583",
  "P90575584",
  "P90575585",
  "P90575586",
  "P90575587",
  "P90575588",
  "P90575589",
  "P90575590",
  "P90575591",
  "P90575592",
  "P90575593",
  "P90575594",
  "P90575595",
  "P90575596",
  "P90575597",
  "P90575598",
  "P90575599",
  "P90575600",
  "P90575601",
  "P90575602",
  "P90575603",
  "P90575604",
  "P90575605",
  "P90575606",
  "P90575607",
  "P90575608",
  "P90575609",
  "P90575610",
  "P90575611",
  "P90575612",
  "P90575613",
  "P90575614",
  "P90575615",
  "P90575616",
  "P90575617",
  "P90575618",
  "P90575619",
  "P90575620",
  "P90575621",
  "P90575622",
  "P90575623",
  "P90575624",
  "P90575625",
  "P90575626",
  "P90575627",
].forEach((id, index) => {
  carItems.push({
    image: bmwPressImage(id),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0442513EN_US/the-new-bmw-m5-sedan?language=en_US",
    caption: `BMW M5 sedan, curated official purple full-car exterior ${index + 1}.`,
    carGroup: "car:bmw-m5-purple",
    shape: index % 5 === 3 ? "cinema" : "wide",
    focus: "center 52%",
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
  {
    image: "https://uploads.audi-mediacenter.com/system/production/cars/13/photos/26081dce7551d068d6dff540378ea129be4b0fbd/web_1440_S3_Limousine.png?1761751290",
    url: "https://www.audi-mediacenter.com/en/audi-a3-11",
    caption: "White Audi S3 Limousine sedan, compact performance without SUV bulk.",
    carGroup: "car:audi-s3-white",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/cars/216/photos/62a6e55dd1cd97ddfa99960d067de4a264f07ed1/web_1440_RS_3_Limousine.png?1761751244",
    url: "https://www.audi-mediacenter.com/en/audi-a3-11",
    caption: "White Audi RS 3 Limousine sedan, sharp compact sedan stance.",
    carGroup: "car:audi-rs3-white",
    shape: "wide",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/127417/images/ec323eab85eeec9f9eb2cf1a83002de11cc656d3/A250345_web_2880.jpg?1742551323",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-a5-sedan-e-hybrid-quattro-127417",
    caption: "White Audi A5 Sedan e-hybrid quattro, clean modern sedan profile.",
    carGroup: "car:audi-a5-white",
    shape: "cinema",
    focus: "center 52%",
  },
  {
    image: "https://uploads.audi-mediacenter.com/system/production/media/106329/images/6f337cc6e71cc8b66e6b277004afaf88777200ae/A218062_web_2880.jpg?1768479091",
    url: "https://www.audi-mediacenter.com/en/photos/detail/audi-rs-3-sportback-audi-rs-3-sedan-2021-106329",
    caption: "Audi RS 3 Sedan, compact sedan performance stance.",
    carGroup: "car:audi-rs3",
    shape: "wide",
    focus: "center 52%",
  },
].forEach((item) => {
  carItems.push(item);
});

[
  "P90549616",
  "P90549617",
  "P90549618",
  "P90549619",
  "P90549620",
  "P90549621",
  "P90549622",
  "P90549623",
  "P90549625",
  "P90549626",
  "P90549627",
  "P90549629",
].forEach((id, index) => {
  const groups = ["car:bmw-330i", "car:bmw-m340i", "car:bmw-3-series"];
  carItems.push({
    image: bmwPressImage(id),
    url: "https://www.press.bmwgroup.com/usa/photo/compilation/T0442407EN_US/the-new-2025-bmw-3-series?language=en_US",
    caption: `Modern BMW 3 Series sedan, clean official exterior ${index + 1}.`,
    carGroup: groups[index % groups.length],
    shape: index % 4 === 0 ? "cinema" : "wide",
    focus: "center 52%",
  });
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

[
  ["126608", "https://uploads.audi-mediacenter.com/system/production/media/126608/images/f071c03abc3b7552163ffa623806ffb28eb0d4f8/A244456_web_2880.jpg?1732010858"],
  ["126610", "https://uploads.audi-mediacenter.com/system/production/media/126610/images/9443d50c0096f1d1936e2e8955fa7b74ecabef09/A244458_web_2880.jpg?1729589341"],
  ["126607", "https://uploads.audi-mediacenter.com/system/production/media/126607/images/7beacee8083226bd6b34b32d345978d21a39d92a/A244455_web_2880.jpg?1729589334"],
  ["126589", "https://uploads.audi-mediacenter.com/system/production/media/126589/images/64ec685105a401a63754098b32bde69179dab977/A244437_web_2880.jpg?1732010641"],
  ["126590", "https://uploads.audi-mediacenter.com/system/production/media/126590/images/fbde0d572106fdfcc912c4f5d0554b3a38ba6265/A244438_web_2880.jpg?1732010681"],
  ["126592", "https://uploads.audi-mediacenter.com/system/production/media/126592/images/77fe939d962482cca5aae5dc41e9bce046893b5f/A244440_web_2880.jpg?1729588060"],
  ["126593", "https://uploads.audi-mediacenter.com/system/production/media/126593/images/69f650d677d4c308961c831d876131819c50b24c/A244441_web_2880.jpg?1729588046"],
  ["126594", "https://uploads.audi-mediacenter.com/system/production/media/126594/images/ee924395f87fa54d9bde533a0ae247f5bbf97f5e/A244442_web_2880.jpg?1729588063"],
  ["126596", "https://uploads.audi-mediacenter.com/system/production/media/126596/images/24ccb4aad24c5377b1fc0b60fabd1cdc020e9f31/A244444_web_2880.jpg?1732010712"],
  ["126597", "https://uploads.audi-mediacenter.com/system/production/media/126597/images/d5851176e13137574ba80137836e5cd4d4408530/A244445_web_2880.jpg?1732010739"],
  ["126598", "https://uploads.audi-mediacenter.com/system/production/media/126598/images/d1a3416300eb067f6dcf6d07db046336996322a8/A244446_web_2880.jpg?1732010754"],
  ["126599", "https://uploads.audi-mediacenter.com/system/production/media/126599/images/7e882960a34e12bbd2672db7d638b4d514c36b06/A244447_web_2880.jpg?1732010776"],
  ["126602", "https://uploads.audi-mediacenter.com/system/production/media/126602/images/8f4229b11c62591c0a3a0ee02fb70766e5eadc7d/A244450_web_2880.jpg?1729588835"],
  ["126603", "https://uploads.audi-mediacenter.com/system/production/media/126603/images/7e344b8c30e485e8045d575f700a9a4d33d37d24/A244451_web_2880.jpg?1729588800"],
  ["126606", "https://uploads.audi-mediacenter.com/system/production/media/126606/images/62cbbc8caf5268f5262e2800ffd81065283d1299/A244454_web_2880.jpg?1754651542"],
].forEach(([id, image], index) => {
  carItems.push({
    image,
    url: `https://www.audi-mediacenter.com/en/photos/detail/audi-a5-sedan-${id}`,
    caption: `Audi A5 Sedan, clean modern official sedan exterior ${index + 1}.`,
    carGroup: "car:audi-a5",
    shape: index % 4 === 2 ? "cinema" : "wide",
    focus: "center 52%",
  });
});

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
  "suv",
  "crossover",
  "countryman",
  "hatchback",
  "sportback",
  "bmw x2",
  "bmw ix2",
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
  "tomato soup",
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
  "plain",
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
  "performance",
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
];

const disallowedCarPattern = /firefighter|fire truck|firetruck|fire engine|fire department|feuerwehr|werkfeuerwehr|p905430|suv|crossover|countryman|hatchback|sportback|bmw x[1-7]|bmw ix[1-7]|audi q[2-8]|cayenne|macan|classic|vintage|oldtimer|youngtimer|old car|museum|exhibition|motor show|auto show|show floor|auto zuerich|sauerland|tuning show|moscow|iaa|frankfurt|parade|traffic|china|lwb|e class|w212|v212|e30|e34|e36|e39|e46|e60|e90|e92|e93|f30|w124|w201|w202|w203|w204|199[0-9]|200[0-9]|201[0-9]/i;
const carIdentityPattern = /bmw|mercedes|benz|audi|mini|sedan|gran coupe|m235|m3|3 series|cla|c-class|a3|a4|a5|s3|rs3|mediapool|uploads\.audi|mercedes-benz/i;
const dislikedCarGroups = new Set([
  "car:bmw-m5-green",
  "car:bmw-m5-purple",
  "car:bmw-m3",
  "car:bmw-m235-gran-coupe",
]);
const likedCarGroups = new Set([
  "car:bmw-m235-white",
  "car:mercedes-cla-white",
  "car:audi-a3",
  "car:audi-a3-white",
  "car:audi-a4",
  "car:audi-a5",
  "car:audi-a5-white",
  "car:audi-rs3",
  "car:audi-s3-white",
  "car:audi-rs3-white",
]);
const dislikedCarTastePattern = /(?:purple|green).{0,40}\bm5\b|\bm5\b.{0,40}(?:purple|green)|green.{0,40}\bm3\b|\bm3\b.{0,40}green|blue.{0,40}\bm235\b|\bm235\b.{0,40}(?:blue|borusan)|borusan blue|\bm3 cs\b/i;
const likedCarTastePattern = /white|alpine white|\bm235\b|2 series gran coupe|gran coupe|\bcla\b|a3 limousine|a5 sedan|s3 limousine|rs ?3 limousine|rs ?3 sedan|\baudi\b.{0,32}\bsedan\b/i;

function isDisallowedCarText(text) {
  return disallowedCarPattern.test(text);
}

function carTasteRejected(item, text = "") {
  const group = (item && item.carGroup) || carGroupFor(item, text);
  if (group && dislikedCarGroups.has(group)) return true;
  return dislikedCarTastePattern.test(text);
}

function carTasteScore(item, text = "") {
  const group = (item && item.carGroup) || carGroupFor(item, text);
  let score = 0;
  if (group && likedCarGroups.has(group)) score += 8;
  if (/bmw-m235-white|mercedes-cla-white|audi-a3-white|audi-a5-white|audi-s3-white|audi-rs3-white/i.test(group || "")) score += 4;
  if (likedCarTastePattern.test(text)) score += 4;
  if (/white|alpine white/i.test(text)) score += 3;
  if (/audi|a3|a4|a5|s3|rs3|rs 3/i.test(text)) score += 3;
  if (/interior|cupholder|gear|dashboard|seat|vent|console|badge|emblem|detail/i.test(text)) score -= 4;
  if (carTasteRejected(item, text)) score -= 40;
  return score;
}

function prioritizeCarItems(list) {
  return list
    .filter((item) => !carTasteRejected(item, curationText(item, { category: "car" })))
    .map((item, index) => ({ item, index, score: carTasteScore(item, curationText(item, { category: "car" })) }))
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map(({ item }) => item);
}

function isBlockedContentItem(item) {
  const text = [
    item && item.person,
    item && item.file,
    item && item.caption,
    item && item.carGroup,
    item && item.sourceId,
    item && item.image,
    item && item.url,
  ].map((value) => normalizeSourceText(value || "").toLowerCase()).join(" ");

  if (carIdentityPattern.test(text) && isDisallowedCarText(text)) return true;
  if (carIdentityPattern.test(text) && carTasteRejected(item, text)) return true;
  return blockedContentTerms.some((term) => text.includes(term));
}

const curatorProfiles = {
  food: {
    prefer: [
      /barbecue|galbi|bulgogi|ramen|noodle|sushi platter|sashimi platter|dumpling|jiaozi|pho|carbonara|pasta|burger|steak|ribs|taco|quesadilla|gumbo|fried chicken|pizza|shared table|restaurant table|grill/i,
      /glossy|char|broth|crispy|golden|platter|plate|bowl|stacked|sliced|sauce|steam|melted/i,
    ],
    reject: [
      /vegetable|vegetables|veggies|salad|broccoli|kale|spinach|lettuce|greens|leafy|arugula|cucumber|zucchini|squash|pumpkin|tomato soup|carrot|corn|cabbage|bean|chickpea|olive|nigiri|single|isolated|white background|plain|raw|uncooked|ingredient/i,
    ],
    minScore: 2,
  },
  kpop: {
    prefer: [
      /soft|natural|clean|gentle|bright|smile|calm|airport|public relations|olens|hanni|haerin|wonyoung|newjeans|ive/i,
      /2024|2025|2026|241|250|260/i,
    ],
    reject: [
      /stage|performance|concert|festival|inkigayo|music bank|microphone|fancam|fan concert|awards?|mma|mama|golden disc|photocall|launch event|beauty event|editorial|glam|heavy makeup|red carpet/i,
    ],
    minScore: 3,
  },
  car: {
    prefer: [
      /sedan|gran coupe|m235|3 series|cla|c-class|a3|a4|a5|s3|rs3|modern|official|press|studio|road|motion|exterior|white/i,
      /2024|2025|2026|g20|g87|compact|limousine/i,
    ],
    reject: [
      disallowedCarPattern,
      dislikedCarTastePattern,
    ],
    minScore: 3,
  },
};

function curationText(item, source = {}) {
  return [
    item && item.person,
    item && item.file,
    item && item.caption,
    item && item.carGroup,
    item && item.sourceId,
    item && item.image,
    item && item.url,
    source.label,
    source.query,
  ].map((value) => normalizeSourceText(value || "").toLowerCase()).join(" ");
}

function curationCategory(item, source = {}) {
  return source.category || (item && item.category) || categoryFor(item || {});
}

function curatorScore(item, source = {}) {
  const category = curationCategory(item, source);
  const profile = curatorProfiles[category];
  if (!profile) return 0;

  const text = curationText(item, source);
  if (profile.reject.some((pattern) => pattern.test(text))) return -100;
  if (category === "car" && carTasteRejected(item, text)) return -100;

  let score = 0;
  profile.prefer.forEach((pattern) => {
    if (pattern.test(text)) score += 2;
  });

  if (/thumb|official|press|studio|restaurant|platter|road|exterior|airport/i.test(text)) score += 1;
  if (category === "kpop" && source.provider === "kpopping" && /natural|clean|portrait/i.test(text)) score += 1;
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
  Haerin: 96,
  Wonyoung: 96,
  Hanni: 96,
};
const cameoPeople = Object.keys(cameoPersonTargets);
const allowedCameoPeople = new Set(cameoPeople);

function isAllowedCameo(item) {
  if (!allowedCameoPeople.has(item.person)) return false;
  if (item.external) return true;
  if (blockedCameoFiles.has(item.file)) return false;
  if (casualCameoFiles.has(item.file)) return false;
  return true;
}

function glamCaption(item) {
  if (!item.person) return item;
  const source = `${item.file || ""} ${item.caption || ""}`.toLowerCase();
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
  if (/airport|olens|hanni|haerin|wonyoung|241022|soft|clean|natural|smile/.test(source)) return 4;
  if (/kerastase|mise-en-scene/.test(source)) return 1;
  return 2;
}

function diversifyCameoGroup(person, items) {
  if (person === "Hanni") return items;
  if (person !== "Haerin") return items;
  const dior = items.filter((item) => /dior/i.test(item.file || ""));
  const olens = items.filter((item) => /olens/i.test(item.file || ""));
  const other = items.filter((item) => !/dior|olens/i.test(item.file || ""));
  return interleaveGroups([dior, olens, other]);
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

const batchSize = 63;
const onlineBatchSize = 24;
const categories = ["food", "kpop", "car"];
const mixPattern = ["food", "kpop", "car"];
const longScrollItemsPerCategory = 360;
const foodItems = uniqueBySource(baseItems.filter((item) => !item.file || !skippedFiles.has(item.file)));
const kpopItems = buildCameoPool(cameoItems);
const dreamCarItems = uniqueBySource(prioritizeCarItems(carItems));

const onlineSources = [
  { category: "food", label: "Korean barbecue", query: "korean barbecue galbi food", requireAny: ["galbi", "barbecue"], maxItems: 90 },
  { category: "food", label: "Bulgogi", query: "bulgogi korean food", requireAny: ["bulgogi"], maxItems: 72 },
  { category: "food", label: "Ramen", query: "ramen noodles bowl food", requireAny: ["ramen", "noodle"], maxItems: 90 },
  { category: "food", label: "Sushi", query: "sushi salmon sashimi food", requireAny: ["sushi", "sashimi"], maxItems: 90 },
  { category: "food", label: "Dumplings", query: "dumplings jiaozi gyoza food", requireAny: ["dumpling", "jiaozi", "gyoza"], maxItems: 84 },
  { category: "food", label: "Pho", query: "pho vietnamese noodle soup food", requireAny: ["pho"], maxItems: 60 },
  { category: "food", label: "Carbonara", query: "carbonara pasta food", requireAny: ["carbonara", "pasta"], maxItems: 72 },
  { category: "food", label: "Burgers", query: "cheeseburger hamburger fries food", requireAny: ["burger", "hamburger", "cheeseburger"], maxItems: 90 },
  { category: "food", label: "Steak", query: "steak dinner restaurant food", requireAny: ["steak"], maxItems: 90 },
  { category: "food", label: "Tacos", query: "tacos carnitas quesadilla mexican food", requireAny: ["taco", "carnitas", "quesadilla"], maxItems: 84 },
  { category: "food", label: "Cajun", query: "gumbo cajun seafood food", requireAny: ["gumbo", "cajun"], maxItems: 48 },
  { category: "food", label: "Fried chicken", query: "fried chicken food", requireAny: ["fried chicken", "chicken"], maxItems: 72 },
  { category: "kpop", label: "Hanni archive", provider: "kpopping", person: "Hanni", query: "Hanni clean online portrait", maxItems: 180 },
  { category: "kpop", label: "Haerin archive", provider: "kpopping", person: "Haerin", query: "Haerin clean online portrait", maxItems: 180 },
  { category: "kpop", label: "Wonyoung archive", provider: "kpopping", person: "Wonyoung", query: "Wonyoung clean online portrait", maxItems: 240 },
  { category: "kpop", label: "Hanni natural", query: "Hanni NewJeans airport natural", requireAny: ["hanni"], person: "Hanni", kind: "girl", maxItems: 54 },
  { category: "kpop", label: "Haerin natural", query: "Haerin NewJeans airport natural", requireAny: ["haerin"], person: "Haerin", kind: "girl", maxItems: 54 },
  { category: "kpop", label: "Wonyoung natural", query: "Wonyoung IVE airport natural", requireAny: ["wonyoung", "won-young"], person: "Wonyoung", kind: "girl", maxItems: 72 },
  { category: "kpop", label: "Wonyoung clean portraits", query: "Jang Wonyoung IVE 2024 2025", requireAny: ["wonyoung", "won-young"], person: "Wonyoung", kind: "girl", maxItems: 72 },
  { category: "car", group: "car:bmw-m235-white", label: "White BMW M235 Gran Coupe", query: "white 2025 BMW M235 Gran Coupe sedan exterior", requireAny: ["2025", "2026", "m235", "gran coupe"], kind: "car", maxItems: 96 },
  { category: "car", group: "car:bmw-3-series", label: "BMW G20 3 Series", query: "2024 2025 BMW G20 3 Series sedan car", requireAny: ["2024", "2025", "2026", "g20", "3 series"], kind: "car", maxItems: 72 },
  { category: "car", group: "car:audi-a5-white", label: "Audi A5 sedan", query: "2025 2026 Audi A5 sedan exterior", requireAny: ["2025", "2026", "a5"], kind: "car", maxItems: 84 },
  { category: "car", group: "car:mercedes-cla-white", label: "White Mercedes CLA", query: "white 2025 2026 Mercedes CLA sedan exterior", requireAny: ["2025", "2026", "cla"], kind: "car", maxItems: 96 },
  { category: "car", group: "car:mercedes-c-class", label: "Mercedes W206 C-Class", query: "2024 2025 Mercedes W206 C-Class sedan car", requireAny: ["2024", "2025", "2026", "w206", "c-class"], kind: "car", maxItems: 72 },
  { category: "car", group: "car:audi-a3", label: "Audi A3 sedan", query: "2024 2025 Audi A3 sedan car", requireAny: ["2024", "2025", "2026", "a3"], kind: "car", maxItems: 72 },
  { category: "car", group: "car:audi-s3-white", label: "Audi S3 sedan", query: "2024 2025 Audi S3 sedan exterior", requireAny: ["2024", "2025", "2026", "s3"], kind: "car", maxItems: 72 },
  { category: "car", group: "car:audi-a4", label: "Audi A4 sedan", query: "2024 2025 Audi A4 sedan car", requireAny: ["2024", "2025", "2026", "a4"], kind: "car", maxItems: 72 },
  { category: "car", group: "car:audi-rs3", label: "Audi RS3 sedan", query: "2024 2025 Audi RS3 sedan car", requireAny: ["2024", "2025", "2026", "rs3"], kind: "car", maxItems: 72 },
];

onlineSources.forEach((source) => {
  source.category = source.category || (source.kind === "car" ? "car" : "food");
});

const generatedOnlineSourceSeeds = {
  food: [
    { label: "Tonkotsu ramen", query: "tonkotsu ramen bowl food", requireAny: ["ramen", "tonkotsu"], maxItems: 72 },
    { label: "Japanese ramen", query: "japanese ramen noodles restaurant", requireAny: ["ramen", "noodle"], maxItems: 72 },
    { label: "Korean stew", query: "korean jjigae stew food", requireAny: ["jjigae", "stew"], maxItems: 60 },
    { label: "Korean fried chicken", query: "korean fried chicken food", requireAny: ["fried chicken", "chicken"], maxItems: 72 },
    { label: "Korean barbecue table", query: "korean barbecue meat grill restaurant", requireAny: ["barbecue", "grill", "galbi"], maxItems: 90 },
    { label: "Vietnamese pho", query: "vietnamese pho noodle soup", requireAny: ["pho", "noodle"], maxItems: 60 },
    { label: "Dumpling table", query: "jiaozi gyoza dumplings restaurant", requireAny: ["dumpling", "jiaozi", "gyoza"], maxItems: 72 },
    { label: "Burger close-up", query: "restaurant cheeseburger fries", requireAny: ["burger", "cheeseburger", "hamburger"], maxItems: 84 },
    { label: "Steak plate", query: "restaurant steak dinner plate", requireAny: ["steak"], maxItems: 84 },
    { label: "Pizza table", query: "pizza restaurant melted cheese food", requireAny: ["pizza"], maxItems: 72 },
    { label: "Mexican tacos", query: "tacos carnitas mexican restaurant food", requireAny: ["taco", "carnitas"], maxItems: 72 },
    { label: "Cajun gumbo", query: "cajun gumbo seafood bowl", requireAny: ["gumbo", "cajun"], maxItems: 48 },
  ],
  kpop: [],
  car: [
    { group: "car:bmw-m235-white", label: "White BMW M235 Gran Coupe", query: "white 2025 BMW M235 Gran Coupe sedan exterior", requireAny: ["2025", "2026", "m235", "gran coupe"], kind: "car", maxItems: 96 },
    { group: "car:mercedes-cla-white", label: "White Mercedes CLA sedan", query: "white 2025 Mercedes CLA sedan exterior", requireAny: ["2025", "2026", "cla"], kind: "car", maxItems: 96 },
    { group: "car:bmw-3-series", label: "BMW G20 sedan", query: "2024 2025 BMW G20 3 Series sedan", requireAny: ["2024", "2025", "2026", "g20"], kind: "car", maxItems: 84 },
    { group: "car:bmw-3-series", label: "BMW 330i sedan", query: "2024 2025 BMW 330i sedan car", requireAny: ["2024", "2025", "2026", "330i"], kind: "car", maxItems: 84 },
    { group: "car:bmw-3-series", label: "BMW M340i sedan", query: "2024 2025 BMW M340i sedan car", requireAny: ["2024", "2025", "2026", "m340i"], kind: "car", maxItems: 72 },
    { group: "car:mercedes-c-class", label: "Mercedes C-Class sedan", query: "2024 2025 Mercedes C-Class W206 sedan", requireAny: ["2024", "2025", "2026", "w206"], kind: "car", maxItems: 72 },
    { group: "car:audi-a3", label: "Audi A3 sedan", query: "2024 2025 Audi A3 sedan exterior", requireAny: ["2024", "2025", "2026", "a3"], kind: "car", maxItems: 72 },
    { group: "car:audi-a5-white", label: "Audi A5 sedan", query: "2025 2026 Audi A5 sedan exterior", requireAny: ["2025", "2026", "a5"], kind: "car", maxItems: 84 },
    { group: "car:audi-s3-white", label: "Audi S3 sedan", query: "2024 2025 Audi S3 sedan exterior", requireAny: ["2024", "2025", "2026", "s3"], kind: "car", maxItems: 72 },
    { group: "car:audi-a4", label: "Audi A4 sedan", query: "2024 2025 Audi A4 sedan exterior", requireAny: ["2024", "2025", "2026", "a4"], kind: "car", maxItems: 72 },
    { group: "car:audi-rs3", label: "Audi RS3 sedan", query: "2024 2025 Audi RS3 sedan exterior", requireAny: ["2024", "2025", "2026", "rs3"], kind: "car", maxItems: 72 },
  ],
};

const generatedOnlineSourceIndex = { food: 0, kpop: 0, car: 0 };
const carFallbackGroups = [
  {
    group: "car:bmw-m235-white",
    label: "White BMW M235 Gran Coupe",
    terms: "2025,bmw,m235,gran-coupe,white,sedan,car",
    query: "white 2025 BMW M235 Gran Coupe sedan exterior",
    lockBase: 130000,
  },
  {
    group: "car:mercedes-cla-white",
    label: "White Mercedes CLA sedan",
    terms: "2025,mercedes,cla,white,sedan,car",
    query: "white 2025 Mercedes CLA sedan exterior",
    lockBase: 130500,
  },
  {
    group: "car:bmw-3-series",
    label: "Modern BMW 3 Series sedan",
    terms: "2025,bmw,3-series,sedan,car",
    query: "2025 BMW 3 Series sedan exterior",
    lockBase: 131000,
  },
  {
    group: "car:audi-a5-white",
    label: "White Audi A5 sedan",
    terms: "2025,audi,a5,white,sedan,car",
    query: "2025 Audi A5 sedan exterior",
    lockBase: 132000,
  },
  {
    group: "car:mercedes-cla",
    label: "Modern Mercedes CLA sedan",
    terms: "2025,mercedes,cla,sedan,car",
    query: "2025 Mercedes CLA sedan exterior",
    lockBase: 133000,
  },
  {
    group: "car:mercedes-c-class",
    label: "Modern Mercedes C-Class sedan",
    terms: "2025,mercedes,c-class,w206,sedan,car",
    query: "2025 Mercedes C-Class W206 sedan exterior",
    lockBase: 134000,
  },
  {
    group: "car:audi-a3",
    label: "Modern Audi A3 sedan",
    terms: "2025,audi,a3,sedan,car",
    query: "2025 Audi A3 sedan exterior",
    lockBase: 135000,
  },
  {
    group: "car:audi-s3-white",
    label: "White Audi S3 sedan",
    terms: "2025,audi,s3,white,sedan,car",
    query: "2025 Audi S3 sedan exterior",
    lockBase: 135500,
  },
  {
    group: "car:audi-a4",
    label: "Modern Audi A4 sedan",
    terms: "2025,audi,a4,sedan,car",
    query: "2025 Audi A4 sedan exterior",
    lockBase: 136000,
  },
  {
    group: "car:audi-rs3",
    label: "Modern Audi RS3 sedan",
    terms: "2025,audi,rs3,sedan,car",
    query: "2025 Audi RS3 sedan exterior",
    lockBase: 137000,
  },
];

function ensureKpopFallbackVariety(state, targetPerPerson = 12) {
  return 0;
}

function ensureCarFallbackVariety(state, targetPerGroup = 8) {
  return 0;
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
  "single",
  "isolated",
  "white background",
  "plain",
  "nigiri",
  "take away",
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
  "tomato soup",
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
  "concert",
  "festival",
  "live",
  "microphone",
  "music bank",
  "radio",
  "ningning",
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
  if (item && (item.category === "kpop" || item.person)) return 2600;
  if (item && item.width) return item.width;
  return 1800;
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
  "2023", "2024", "2025", "2026", "audi", "benz", "bmw", "cameo", "car", "clean",
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
    ["vegetable_spread", /vegetable|vegetables|veggies|salad|broccoli|kale|spinach|lettuce|greens|leafy|arugula|cucumber|zucchini|squash|pumpkin|tomato soup|carrot|corn|cabbage|bean|chickpea|olive|tomato|pepper|ingredient/i],
    ["isolated_sushi", /nigiri|single|isolated|plain|white background|salmon sushi(?!.*platter)|sushi close-up|sushi close up/i],
    ["raw_plain", /raw|uncooked|ingredient|sterile|product shot|white background/i],
  ],
  kpop: [
    ["stage", /stage|performance|concert|festival|inkigayo|music bank|microphone|fancam|fan concert|k-link/i],
    ["awards", /awards?|awards-night|awards-event|mma|mama|melon|golden disc|red carpet/i],
    ["fashion_event", /fashion-event|fashion week|dior|bvlgari|tommy|rimowa|miu miu|photocall|launch event/i],
    ["beauty_editorial", /beauty|editorial|glam|heavy makeup|marie claire|kerastase|mise-en-scene|olens|magazine|shoulder-pose|off-shoulder/i],
    ["too_polished", /press-day|event frame|glossy|sparkle|polished awards|polished press/i],
  ],
  car: [
    ["old_car", /classic|vintage|oldtimer|old car|e36|e46|199[0-9]|200[0-9]|2010|2011|2012/i],
    ["show_floor", /museum|exhibition|motor show|auto show|show floor|auto zuerich|iaa|frankfurt|parade/i],
    ["traffic_doc", /traffic|china|lwb|e class|w212|v212|taxi|police|surveillance|license plate/i],
    ["suv_hatch", /suv|crossover|countryman|hatchback|sportback|bmw x[1-7]|audi q[2-8]|cayenne|macan/i],
    ["service_vehicle", /firefighter|fire truck|firetruck|fire engine|fire department|feuerwehr|werkfeuerwehr|p905430/i],
    ["dealer_bad", /dealer|dealership|auction|sale|used car|damaged|wreck|crash/i],
  ],
};

const strongNegativeFeatures = new Set([
  "vegetable_spread",
  "isolated_sushi",
  "raw_plain",
  "stage",
  "awards",
  "fashion_event",
  "beauty_editorial",
  "too_polished",
  "old_car",
  "show_floor",
  "traffic_doc",
  "suv_hatch",
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
    personCounts: Object.fromEntries(cameoPeople.map((person) => [person, 0])),
    recentPeople: [],
    recentVisualGroups: [],
    carGroupCounts: {},
    recentCarGroups: [],
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
  if (preferenceRejectsItem(nextItem, category)) return false;
  const key = sourceKey(nextItem);
  if (!key || hiddenKeySet.has(key) || isLowQualityRejectedItem(nextItem) || state.seenKeys.has(key) || state.queuedKeys.has(key)) return false;
  state.queuedKeys.add(key);
  state.queues[category].push(nextItem);
  return true;
}

function validQueuedItem(state, category, item) {
  const key = sourceKey(item);
  return key
    && !hiddenKeySet.has(key)
    && !isBlockedContentItem(item)
    && !isLowQualityRejectedItem(item)
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
    penalty += state.recentVisualGroups.filter((recentGroup) => recentGroup === visualGroup).length * 700;
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

  if (!hasBalancedChoice()) ensureCarFallbackVariety(state, 6);

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

    for (let fillAttempt = 0; fillAttempt < 2; fillAttempt += 1) {
      for (let offset = 0; offset < cameoPeople.length; offset += 1) {
        const personIndex = (state.nextKpopPersonIndex + offset) % cameoPeople.length;
        const person = cameoPeople[personIndex];
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
        const candidateIndexes = variedIndexes.length ? variedIndexes : matchingIndexes;
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

function prefetchOnlineItemsForCategory(state, category) {
  if (!state || !state.prefetchingCategories || state.prefetchingCategories.has(category)) return;
  const targetQueued = category === "kpop" ? onlineBatchSize * 4 : onlineBatchSize * 2;
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
  return (state.queues.kpop || []).some((item) => {
    if (!validQueuedItem(state, "kpop", item)) return false;
    const person = personFor(item);
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

  if (source.kind === "car" && (/dealer|dealership|auction|sale|crash|wreck|damaged|police|taxi/i.test(lowerTitle) || isDisallowedCarText(lowerTitle) || carTasteRejected({ carGroup: source.group }, `${lowerTitle} ${source.label || ""} ${source.query || ""}`))) {
    return null;
  }

  if (source.category === "kpop" && /2020|2021|2022|220|fan|fancam|stage|performance|concert|festival|music bank|inkigayo|microphone|ningning/i.test(lowerTitle)) {
    return null;
  }

  const fileName = String(page.title || "").replace(/^File:/i, "");
  return {
    image: info.thumburl || info.url,
    original: info.url,
    sourceId: fileName,
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
  const nextItem = matched || item;
  if (!nextItem || preferenceRejectsItem(nextItem, source.category) || !passesCurator(nextItem, source)) return null;
  return { ...nextItem, category: nextItem.category || source.category };
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
    }, 4500);

    if ([404, 405, 501, 503].includes(response.status)) {
      aiCuratorUnavailable = true;
      return [];
    }

    if (!response.ok) return [];

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
  const locallyRanked = uniqueBySource(localRankCandidates(source, candidates));
  if (!locallyRanked.length) return [];
  if (source.provider === "kpopping") return locallyRanked;

  const aiRanked = await curateCandidatesWithAi(source, locallyRanked, onlineBatchSize);
  return aiRanked.length ? aiRanked : locallyRanked;
}

function nextOnlineSource(category, state = null) {
  if ((onlineSourceCooldownUntil[category] || 0) > Date.now()) return null;

  let sources = onlineSources.filter((source) => source.category === category && !source.exhausted);
  if (!sources.length) {
    addGeneratedOnlineSources(category, 8);
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
  let added = 0;
  let attempts = 0;
  let generatedFallbackAdded = false;
  const categorySourceCount = onlineSources.filter((source) => source.category === category).length;
  const maxAttempts = Math.max(16, categorySourceCount * 2);
  const hasEnoughQueuedVariety = () => {
    if (category === "kpop") return availableKpopPeople(state).size >= Math.min(3, cameoPeople.length);
    if (category === "car") return availableVisualGroups(state, "car").size >= Math.min(5, carFallbackGroups.length);
    return true;
  };
  const needsMore = () => added < targetCount || !hasEnoughQueuedVariety();

  const trySource = async () => {
    const source = nextOnlineSource(category, state);
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

  while (needsMore() && attempts < maxAttempts) {
    const tried = await trySource();
    if (!tried) break;
  }

  if (!added) {
    generatedFallbackAdded = addGeneratedOnlineSources(category, 8) > 0;
  }

  if (!added && generatedFallbackAdded) {
    attempts = 0;
    const fallbackMaxAttempts = Math.max(12, (generatedOnlineSourceSeeds[category] || []).length * 2);
    while (needsMore() && attempts < fallbackMaxAttempts) {
      const tried = await trySource();
      if (!tried) break;
    }
  }

  if (category === "kpop" && (!hasEnoughQueuedVariety() || !hasKpopWindowBalancedChoice(state))) {
    added += ensureKpopFallbackVariety(state);
  }
  if (category === "car" && (!hasEnoughQueuedVariety() || !hasCarWindowBalancedChoice(state))) {
    added += ensureCarFallbackVariety(state);
  }

  return added;
}

async function nextItemForCategory(state, category) {
  const firstPaintStillFilling = state.seenKeys.size < batchSize;
  if (!hasAvailableUnique(state, category)) {
    await loadMoreOnlineItemsForCategory(state, category, onlineBatchSize);
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
    if (key) state.seenKeys.delete(key);
    if (!state.queues[category]) state.queues[category] = [];
    state.queues[category].unshift(item);
  });
}

async function nextMixedItems(state, targetCount = batchSize) {
  const nextItems = [];
  const targetSetCount = Math.floor(targetCount / mixPattern.length);

  for (let setIndex = 0; setIndex < targetSetCount; setIndex += 1) {
    for (const category of mixPattern) {
      const firstPaintStillFilling = state.seenKeys.size < batchSize;
      const needsRefill = !hasAvailableUnique(state, category)
        || (!firstPaintStillFilling && category === "kpop" && !hasKpopWindowBalancedChoice(state))
        || (!firstPaintStillFilling && category === "car" && !hasCarWindowBalancedChoice(state));
      if (!hasAvailableUnique(state, category)) {
        await loadMoreOnlineItemsForCategory(state, category, onlineBatchSize);
      } else if (needsRefill) {
        prefetchOnlineItemsForCategory(state, category);
      }
    }

    if (!mixPattern.every((category) => hasAvailableUnique(state, category))) {
      state.emptyBatches = nextItems.length ? 0 : ((state.emptyBatches || 0) + 1);
      return nextItems;
    }

    const setItems = [];
    for (const category of mixPattern) {
      let item = await nextItemForCategory(state, category);
      if (!item) {
        await loadMoreOnlineItemsForCategory(state, category, onlineBatchSize);
        item = await nextItemForCategory(state, category);
      }
      if (!item) {
        restoreDequeuedItems(state, setItems);
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
  return width * height >= 1600000 && shortEdge >= 900 && longEdge >= 1550;
}

function createTile(item, index, onHide, onQualityReject) {
  const tile = document.createElement("article");
  const key = sourceKey(item);
  const visualGroup = visualGroupFor(item);
  tile.className = `tile tile--${item.shape || "standard"}`;
  tile.dataset.category = categoryFor(item);
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
  img.src = imageFor(item);
  img.alt = "";
  img.loading = index < 18 ? "eager" : "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => {
    if (categoryFor(item) === "kpop" && typeof onQualityReject === "function") {
      onQualityReject(item);
      return;
    }
    tile.remove();
  }, { once: true });
  if (categoryFor(item) === "kpop") {
    img.addEventListener("load", () => {
      if (typeof onQualityReject === "function" && !isHighQualityKpopImage(img)) {
        onQualityReject(item);
      }
    }, { once: true });
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

function appendTileElement(wall, item, index, onHide, onQualityReject) {
  const columns = Array.from(wall.querySelectorAll(".masonry-column"));
  if (!columns.length) return false;

  const category = categoryFor(item);
  const person = personFor(item);
  const visualGroup = visualGroupFor(item);
  const globalRecentTiles = Array.from(wall.querySelectorAll(".tile")).slice(-32);
  const target = columns.reduce((best, column) => {
    const lastTile = column.lastElementChild;
    const recentTiles = Array.from(column.querySelectorAll(".tile")).slice(-8);
    const visualHeight = column.scrollHeight || column.children.length * 320;
    let score = visualHeight;
    if (lastTile?.dataset.category === category) score += 180;
    if (person && lastTile?.dataset.person === person) score += 360;
    score += recentTiles.filter((tile) => tile.dataset.category === category).length * 90;
    score += globalRecentTiles.filter((tile) => tile.dataset.category === category).length * 22;
    if (person) {
      score += recentTiles.filter((tile) => tile.dataset.person === person).length * 620;
      score += globalRecentTiles.filter((tile) => tile.dataset.person === person).length * 220;
    }
    if (visualGroup) {
      if (lastTile?.dataset.visualGroup === visualGroup) score += 2200;
      score += recentTiles.filter((tile) => tile.dataset.visualGroup === visualGroup).length * 1450;
      score += globalRecentTiles.filter((tile) => tile.dataset.visualGroup === visualGroup).length * 820;
    }
    return score < best.score ? { column, score } : best;
  }, { column: columns[0], score: Number.POSITIVE_INFINITY }).column;

  target.append(createTile(item, index, onHide, onQualityReject));
  return true;
}

async function appendTileElementsInChunks(wall, items, startIndex, onHide, onQualityReject, chunkSize = 10) {
  for (let offset = 0; offset < items.length; offset += 1) {
    if (!appendTileElement(wall, items[offset], startIndex + offset, onHide, onQualityReject)) return false;
    if ((offset + 1) % chunkSize === 0) await yieldToBrowser();
  }
  return true;
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
  }

  return `${person || category}:${canonicalFileKey(item.file || item.sourceId || item.url || item.image || item.caption)}`;
}

function layoutWall(wall, renderedItems, onHide, onQualityReject) {
  const count = columnCount();
  const columns = Array.from({ length: count }, () => {
    const column = document.createElement("div");
    column.className = "masonry-column";
    return column;
  });
  const heights = Array.from({ length: count }, () => 0);
  const lastCategoryByColumn = Array.from({ length: count }, () => "");
  const lastPersonByColumn = Array.from({ length: count }, () => "");
  const lastVisualGroupByColumn = Array.from({ length: count }, () => "");
  const recentPeopleByColumn = Array.from({ length: count }, () => []);
  const recentPeople = [];
  const recentVisualGroupsByColumn = Array.from({ length: count }, () => []);
  const recentVisualGroups = [];

  function placementScore(item, columnIndex) {
    const category = categoryFor(item);
    const person = personFor(item);
    const visualGroup = visualGroupFor(item);
    const columnPeople = recentPeopleByColumn[columnIndex];
    const columnVisualGroups = recentVisualGroupsByColumn[columnIndex];
    let score = heights[columnIndex] + (lastCategoryByColumn[columnIndex] === category ? 0.55 : 0);

    if (person) {
      if (lastPersonByColumn[columnIndex] === person) score += 4.5;
      score += columnPeople.filter((recentPerson) => recentPerson === person).length * 2.2;
      score += recentPeople.filter((recentPerson) => recentPerson === person).length * 1.1;
    }
    if (visualGroup) {
      if (lastVisualGroupByColumn[columnIndex] === visualGroup) score += 7.5;
      score += columnVisualGroups.filter((recentGroup) => recentGroup === visualGroup).length * 3.8;
      score += recentVisualGroups.filter((recentGroup) => recentGroup === visualGroup).length * 1.9;
    }

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
    columns[target].append(createTile(item, index, onHide, onQualityReject));
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
    heights[target] += shapeScore(item) + 0.03;
  });

  wall.style.setProperty("--columns", count);
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
          renderedItems.push(replacement);
          if (!appendTileElement(wall, replacement, renderedItems.length - 1, handleHide, handleQualityReject)) {
            layoutWall(wall, renderedItems, handleHide, handleQualityReject);
          }
          if (shouldLoadAhead()) scheduleAppend();
        }
      }, 20);
    }, 0);
  };

  const handleQualityReject = async (item) => {
    const key = sourceKey(item);
    if (!key || lowQualityRejectedKeySet.has(key) || categoryFor(item) !== "kpop") return;

    lowQualityRejectedKeySet.add(key);
    prefetchOnlineItemsForCategory(feedState, "kpop");
    const itemIndex = renderedItems.findIndex((renderedItem) => sourceKey(renderedItem) === key);
    if (itemIndex < 0) return;

    renderedItems.splice(itemIndex, 1);
    if (!removeTileElement(wall, key)) {
      layoutWall(wall, renderedItems, handleHide, handleQualityReject);
    }

    let replacement = null;
    try {
      replacement = await nextItemForCategory(feedState, "kpop");
    } catch {
      replacement = null;
    }

    if (replacement) {
      const insertIndex = Math.min(itemIndex, renderedItems.length);
      renderedItems.splice(insertIndex, 0, replacement);
      layoutWall(wall, renderedItems, handleHide, handleQualityReject);
    }
    if (shouldLoadAhead()) scheduleAppend(80);
  };

  const shouldLoadAhead = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      wall.scrollHeight,
    );
    const loadAheadDistance = Math.max(3200, viewportHeight * 3.5);
    return scrollHeight - (scrollTop + viewportHeight) < loadAheadDistance;
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

  const appendBatch = async () => {
    if (exhausted) return;
    if (loading) {
      appendRequestedWhileLoading = true;
      return;
    }
    loading = true;
    let retryScheduled = false;
    try {
      const nextItems = await nextMixedItems(feedState, batchSize);
      if (!nextItems.length && feedState.exhausted) {
        exhausted = true;
      }
      if (!nextItems.length && !exhausted) {
        window.clearTimeout(emptyRetryTimer);
        const retryDelay = feedState.emptyBatches > 2 ? 2500 : 900;
        emptyRetryTimer = window.setTimeout(() => scheduleAppend(), retryDelay);
        retryScheduled = true;
        return;
      }

      const startIndex = renderedItems.length;
      renderedItems.push(...nextItems);
      if (!feedStartSaved && startIndex === 0) {
        feedStartSaved = true;
        saveFeedStartKeys(renderedItems);
      }
      const hasColumns = wall.querySelectorAll(".masonry-column").length > 0;
      const appended = hasColumns
        && await appendTileElementsInChunks(wall, nextItems, startIndex, handleHide, handleQualityReject);
      if (!appended) {
        layoutWall(wall, renderedItems, handleHide, handleQualityReject);
      }
      sentinel.dataset.remaining = String(categories.reduce((total, category) => total + feedState.queues[category].length, 0));
      prefetchOnlineItems(feedState);
      if (shouldLoadAhead()) {
        const refillDelay = feedState.prefetchingCategories && feedState.prefetchingCategories.size ? 320 : 80;
        scheduleAppend(refillDelay);
      }
    } finally {
      loading = false;
      if (!exhausted && !retryScheduled && (appendRequestedWhileLoading || shouldLoadAhead())) {
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
      if (entries.some((entry) => entry.isIntersecting)) {
        scheduleAppend();
        Promise.resolve().then(() => {
          if (exhausted) observer.disconnect();
        });
      }
    }, { rootMargin: "1800px 0px" });
    observer.observe(sentinel);
  }

  window.addEventListener("scroll", () => {
    if (shouldLoadAhead()) scheduleAppend();
  }, { passive: true });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      layoutWall(wall, renderedItems, handleHide, handleQualityReject);
      if (shouldLoadAhead()) scheduleAppend();
    }, 140);
  }, { passive: true });

  main.append(wall, marker, sentinel);
  app.replaceChildren(main);
}

render();
