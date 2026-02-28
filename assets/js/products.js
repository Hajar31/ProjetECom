import { PRODUCTS } from "./data.js";
import { bindCardActions, productCard, setCartCount } from "./main.js";

const params = new URLSearchParams(window.location.search);

const state = {
  category: params.get("category") || "",
  skinType: "",
  brand: "",
  maxPrice: 120,
  promo: false,
  query: params.get("q") || "",
  sortBy: "popular"
};

const refs = {
  grid: document.getElementById("productGrid"),
  filterCategory: document.getElementById("filterCategory"),
  filterSkin: document.getElementById("filterSkin"),
  filterBrand: document.getElementById("filterBrand"),
  filterPrice: document.getElementById("filterPrice"),
  priceLabel: document.getElementById("priceLabel"),
  filterPromo: document.getElementById("filterPromo"),
  resetFilters: document.getElementById("resetFilters"),
  sortBy: document.getElementById("sortBy"),
  globalSearchForm: document.getElementById("globalSearchForm"),
  globalSearchInput: document.getElementById("globalSearchInput")
};

const currentPrice = (product) => product.promoPrice ?? product.price;

const applyFilters = () => {
  let list = PRODUCTS.filter((product) => {
    const categoryOk = !state.category || product.category === state.category;
    const skinOk = !state.skinType || product.skinType === state.skinType || product.skinType === "tous";
    const brandOk = !state.brand || product.brand.toLowerCase().includes(state.brand.toLowerCase());
    const priceOk = currentPrice(product) <= state.maxPrice;
    const promoOk = !state.promo || product.promo;
    const queryOk = !state.query || `${product.name} ${product.brand}`.toLowerCase().includes(state.query.toLowerCase());
    return categoryOk && skinOk && brandOk && priceOk && promoOk && queryOk;
  });

  if (state.sortBy === "priceAsc") list.sort((a, b) => currentPrice(a) - currentPrice(b));
  if (state.sortBy === "priceDesc") list.sort((a, b) => currentPrice(b) - currentPrice(a));
  if (state.sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
  if (state.sortBy === "popular") list.sort((a, b) => b.reviewsCount - a.reviewsCount);

  refs.grid.innerHTML = list.length
    ? list.map(productCard).join("")
    : `<div class="col-12"><div class="alert alert-warning mb-0">Aucun produit trouvé avec ces filtres.</div></div>`;

  bindCardActions(refs.grid);
};

const bindEvents = () => {
  refs.filterCategory.value = state.category;
  refs.filterPrice.value = String(state.maxPrice);
  refs.priceLabel.textContent = String(state.maxPrice);
  refs.globalSearchInput.value = state.query;

  refs.filterCategory.addEventListener("change", (event) => {
    state.category = event.target.value;
    applyFilters();
  });
  refs.filterSkin.addEventListener("change", (event) => {
    state.skinType = event.target.value;
    applyFilters();
  });
  refs.filterBrand.addEventListener("input", (event) => {
    state.brand = event.target.value;
    applyFilters();
  });
  refs.filterPrice.addEventListener("input", (event) => {
    state.maxPrice = Number(event.target.value);
    refs.priceLabel.textContent = String(state.maxPrice);
    applyFilters();
  });
  refs.filterPromo.addEventListener("change", (event) => {
    state.promo = event.target.checked;
    applyFilters();
  });
  refs.sortBy.addEventListener("change", (event) => {
    state.sortBy = event.target.value;
    applyFilters();
  });
  refs.globalSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = refs.globalSearchInput.value.trim();
    applyFilters();
  });

  refs.resetFilters.addEventListener("click", () => {
    state.category = "";
    state.skinType = "";
    state.brand = "";
    state.maxPrice = 120;
    state.promo = false;
    state.sortBy = "popular";

    refs.filterCategory.value = "";
    refs.filterSkin.value = "";
    refs.filterBrand.value = "";
    refs.filterPrice.value = "120";
    refs.priceLabel.textContent = "120";
    refs.filterPromo.checked = false;
    refs.sortBy.value = "popular";

    applyFilters();
  });
};

setCartCount();
bindEvents();
applyFilters();