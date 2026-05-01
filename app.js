const app = document.getElementById("app");

function commonsImage(file, width = 1800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

function commonsSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

const items = [
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

function shuffled(list, seed) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const x = Math.sin((seed + 1) * (i + 17)) * 10000;
    const j = Math.floor((x - Math.floor(x)) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function columnCount() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1200;
  if (width <= 560) return 2;
  if (width <= 820) return 3;
  return Math.max(4, Math.min(9, Math.floor(width / 218)));
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
  const renderedItems = [];
  const appendBatch = () => {
    const batchItems = batch === 0 ? items : shuffled(items, batch);
    renderedItems.push(...batchItems);
    layoutWall(wall, renderedItems);
    batch += 1;
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
