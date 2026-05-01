const app = document.getElementById("app");

function commonsImage(file, width = 1700) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

function commonsSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const items = [
  {
    file: "Korean BBQ-LA Galbi-01.jpg",
    caption: "LA galbi, glossy short ribs and deep char.",
    shape: "hero",
    focus: "center 55%",
  },
  {
    url: "https://unsplash.com/s/photos/salmon-sushi",
    caption: "Salmon sushi, clean rice, soft orange fish, bright finish.",
    shape: "wide",
  },
  {
    url: "https://unsplash.com/s/photos/ramen",
    caption: "Ramen bowl with broth, noodles, egg, and quiet richness.",
    shape: "portrait",
  },
  {
    url: "https://unsplash.com/s/photos/pasta",
    caption: "Silky pasta, glossy sauce, and a clean Italian comfort lane.",
    shape: "wide",
  },
  {
    file: "Homemade salmon sushi 1.jpg",
    caption: "Salmon sushi, clean rice, soft orange fish, bright finish.",
    shape: "portrait",
  },
  {
    file: "Homemade salmon sushi 2.jpg",
    caption: "Salmon rolls, simple and glossy with no extra noise.",
    shape: "square",
  },
  {
    file: "Homemade salmon sushi 3.jpg",
    caption: "Salmon sushi lined up tight, cool and buttery.",
    shape: "wide",
  },
  {
    file: "Homemade salmon sushi 5.jpg",
    caption: "Soft salmon over rice, the good clean sushi lane.",
    shape: "portrait",
  },
  {
    file: "Ramen Bowl 2.jpg",
    caption: "Ramen bowl with broth, noodles, egg, and quiet richness.",
    shape: "hero",
    focus: "center 48%",
  },
  {
    file: "Soft Shelled Crab on Sushi Rice - Arintji (69449046).jpg",
    caption: "Soft shell crab on sushi rice, crisp edges and warm color.",
    shape: "wide",
  },
  {
    file: "Soft shell crab (3196520484).jpg",
    caption: "Soft shell crab, golden and delicate.",
    shape: "square",
  },
  {
    file: "Bottle soju.jpg",
    caption: "Cold soju bottle, clean glass and a late-night table feel.",
    shape: "portrait",
  },
  {
    file: "Soju in korean restaurant.JPG",
    caption: "Soju at the table, simple and sharp.",
    shape: "square",
  },
  {
    file: "Chinese Dumplings.jpg",
    caption: "Chinese dumplings, soft pleats and browned edges.",
    shape: "wide",
  },
  {
    file: "Dalian Liaoning China Homemade-Jiaotze-01.jpg",
    caption: "Homemade jiaozi, folded by hand and packed close.",
    shape: "portrait",
  },
  {
    file: "Pho, popular Vietnamese noodle soup.jpg",
    caption: "Vietnamese pho, clear broth, tender beef, fresh herbs.",
    shape: "hero",
  },
  {
    file: "Pho Vietnamese noodle soup in Ho Chi Minh City, Vietnam.jpg",
    caption: "Pho in Ho Chi Minh City, bright broth and soft noodles.",
    shape: "wide",
  },
  {
    file: "Carbonara 2025.jpg",
    caption: "Carbonara, glossy pasta, black pepper, and creamy depth.",
    shape: "wide",
  },
  {
    file: "Pasta carbonara.jpg",
    caption: "Italian pasta with a silky sauce and clean plate energy.",
    shape: "portrait",
  },
  {
    file: "Cheeseburger.jpg",
    caption: "Cheeseburger, melted cheese, toasted bun, no fuss.",
    shape: "square",
  },
  {
    file: "Cheese Burger - Las Vegas.jpg",
    caption: "Burger close-up, glossy bun and diner-level comfort.",
    shape: "portrait",
  },
  {
    file: "Steak dinner with vegetables.jpg",
    caption: "Steak dinner, browned crust and a generous plate.",
    shape: "wide",
  },
  {
    file: "Grilling.jpg",
    caption: "American grill heat, beef and corn over charcoal.",
    shape: "cinema",
  },
  {
    file: "Barbecue beef ribs.jpg",
    caption: "Barbecue beef ribs, smoke, bark, and a heavy cut.",
    shape: "wide",
  },
  {
    file: "Beef ribs on a smoker grill.jpg",
    caption: "Beef ribs on the smoker, exactly the slow-cooked lane.",
    shape: "portrait",
  },
  {
    file: "Taco de carnitas.jpg",
    caption: "Carnitas taco, soft tortilla, lime, and rich pork.",
    shape: "portrait",
  },
  {
    file: "Carnitas taco - China Poblano.jpg",
    caption: "Carnitas taco, crisp pork pieces and a bright finish.",
    shape: "wide",
  },
  {
    file: "Carnitas tacos.jpg",
    caption: "Carnitas tacos, stacked and juicy without the spicy lane.",
    shape: "square",
  },
  {
    file: "Crawfish gumbo.jpg",
    caption: "Cajun gumbo, dark roux, seafood, and deep comfort.",
    shape: "wide",
  },
  {
    file: "Beef short ribs.jpg",
    caption: "Beef short ribs, rich cut, ready for smoke or braise.",
    shape: "portrait",
  },
];

function imageFor(item) {
  return item.image || commonsImage(item.file, item.width || 1700);
}

function sourceFor(item) {
  return item.url || commonsSource(item.file);
}

function localAsset(index) {
  return `/assets/${String(index + 1).padStart(2, "0")}.jpg`;
}

function render() {
  const tiles = items.map((item, index) => {
    const shape = item.shape || "standard";
    const loading = index < 10 ? "eager" : "lazy";
    const style = item.focus ? ` style="--focus: ${escapeHtml(item.focus)}"` : "";
    return `
      <a class="tile tile--${escapeHtml(shape)}" href="${escapeHtml(sourceFor(item))}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.caption)}"${style}>
        <img src="${escapeHtml(localAsset(index))}" alt="" loading="${loading}" decoding="async">
        <span class="caption"><span>${escapeHtml(item.caption)}</span></span>
      </a>
    `;
  }).join("");

  app.innerHTML = `
    <main class="image-app" aria-label="Food source wall">
      <div class="wall">${tiles}</div>
      <span class="corner-mark" aria-hidden="true"></span>
    </main>
  `;
}

render();
