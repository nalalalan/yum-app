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

const cameoItems = [
  {
    file: "Newjeans Hanni 2023 10.jpg",
    caption: "Hanni cameo, soft cute pause between sushi and galbi.",
    shape: "square",
    focus: "center 40%",
    width: 1500,
  },
  {
    file: "Haerin (NewJeans) 220813.jpg",
    caption: "Haerin cameo, gentle NewJeans glow before the next plate.",
    shape: "portrait",
    focus: "center 34%",
    width: 1500,
  },
  {
    file: "Jang Wonyoung 240513.jpg",
    caption: "Wonyoung cameo, bright polished smile tucked into the feast.",
    shape: "portrait",
    focus: "center 38%",
    width: 1500,
  },
  {
    file: "NINGNING (54295363093).jpg",
    caption: "Ningning cameo, sweet stage sparkle before ramen returns.",
    shape: "portrait",
    focus: "center 36%",
    width: 1500,
  },
];

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

function weaveAccents(foodItems, cameos, cars) {
  const woven = [];
  const cameoInterval = 9;
  const carInterval = 5;
  let cameoIndex = 0;
  let carIndex = 0;

  foodItems.forEach((item, index) => {
    const position = index + 1;
    woven.push(item);

    if (position % carInterval === 0 && carIndex < cars.length) {
      woven.push(cars[carIndex]);
      carIndex += 1;
    }

    if (position % cameoInterval === 0 && cameoIndex < cameos.length) {
      woven.push(cameos[cameoIndex]);
      cameoIndex += 1;
    }
  });

  return woven.concat(cars.slice(carIndex), cameos.slice(cameoIndex));
}

function uniqueBySource(list) {
  const seen = new Set();
  return list.filter((item) => {
    const key = item.image || item.file || item.url || item.caption;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const foodItems = baseItems.filter((item) => !item.file || !skippedFiles.has(item.file));
const items = uniqueBySource(weaveAccents(foodItems, cameoItems, carItems));

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

function batchItems(batch) {
  const start = batch * batchSize;
  return items.slice(start, start + batchSize);
}

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
  let exhausted = false;
  const renderedItems = [];
  const appendBatch = () => {
    if (exhausted) return;
    const nextItems = batchItems(batch);
    if (!nextItems.length) {
      exhausted = true;
      sentinel.hidden = true;
      return;
    }
    renderedItems.push(...nextItems);
    layoutWall(wall, renderedItems);
    batch += 1;
    exhausted = renderedItems.length >= items.length;
    sentinel.hidden = exhausted;
  };

  appendBatch();
  appendBatch();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!exhausted && entries.some((entry) => entry.isIntersecting)) {
        appendBatch();
      }
    }, { rootMargin: "1800px 0px" });
    observer.observe(sentinel);
  } else {
    window.addEventListener("scroll", () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 1800;
      if (!exhausted && nearBottom) appendBatch();
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
