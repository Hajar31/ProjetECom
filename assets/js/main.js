import { PRODUCTS } from "./data.js";
import { addToCart, getCart, getWishlist, toggleWishlist } from "./store.js";

export const money = (value) => `${value.toFixed(2)} €`;

export const currentPrice = (product) => product.promoPrice ?? product.price;

export const stars = (rating) => "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

export const setCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = String(count);
};

const initGlobalSearch = () => {
  const form = document.getElementById("globalSearchForm");
  const input = document.getElementById("globalSearchInput");
  if (!form || !input) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    const url = new URL("products.html", window.location.href);
    if (query) url.searchParams.set("q", query);
    window.location.href = url.pathname + url.search;
  });
};

export const productCard = (product) => {
  const wished = getWishlist().includes(product.id);
  return `
    <div class="col-md-6 col-xl-4">
      <div class="card h-100">
        <img src="${product.images[0]}" alt="${product.name}" class="card-img-top product-thumb" />
        <div class="card-body d-flex flex-column">
          <div class="small text-muted text-uppercase">${product.brand}</div>
          <h3 class="h6">${product.name}</h3>
          <div class="small mb-2"><span class="rating-stars">${stars(product.rating)}</span> (${product.reviewsCount})</div>
          <div class="mb-2">
            ${product.promoPrice ? `<span class="fw-bold">${money(product.promoPrice)}</span> <span class="text-muted line-through ms-1">${money(product.price)}</span>` : `<span class="fw-bold">${money(product.price)}</span>`}
          </div>
          <div class="mt-auto d-flex gap-2">
            <a class="btn btn-outline-dark btn-sm" href="product.html?id=${product.id}">Voir fiche</a>
            <button class="btn btn-dark btn-sm add-cart" data-id="${product.id}">Ajouter</button>
            <button class="btn btn-sm ${wished ? "btn-danger" : "btn-outline-secondary"} wish-btn" data-id="${product.id}">♥</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const bindCardActions = (root = document) => {
  root.querySelectorAll(".add-cart").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.id), 1, "Standard");
      setCartCount();
    });
  });

  root.querySelectorAll(".wish-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const active = toggleWishlist(Number(button.dataset.id));
      button.classList.toggle("btn-danger", active);
      button.classList.toggle("btn-outline-secondary", !active);
    });
  });
};

const renderHome = () => {
  const container = document.getElementById("featuredProducts");
  if (!container) return;
  const featured = [...PRODUCTS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  container.innerHTML = featured.map(productCard).join("");
  bindCardActions(container);
};

setCartCount();
initGlobalSearch();
renderHome();