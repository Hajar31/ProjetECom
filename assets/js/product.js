import { PRODUCTS } from "./data.js";
import { addReview, addToCart, getReviews, getWishlist, toggleWishlist } from "./store.js";
import { money, setCartCount, stars } from "./main.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const product = PRODUCTS.find((item) => item.id === id);

const page = document.getElementById("productPage");

const renderReviews = () => {
  const reviewsData = getReviews()[String(id)] || [];
  const box = document.getElementById("reviewsList");
  if (!box) return;
  if (!reviewsData.length) {
    box.innerHTML = `<div class="text-muted small">Aucun avis pour le moment.</div>`;
    return;
  }
  box.innerHTML = reviewsData
    .map(
      (review) => `
      <div class="border rounded-3 p-2 mb-2">
        <div class="d-flex justify-content-between"><strong>${review.author}</strong><span class="rating-stars">${stars(review.rating)}</span></div>
        <div class="small text-muted">${new Date(review.date).toLocaleDateString("fr-FR")}</div>
        <p class="mb-0 small">${review.comment}</p>
      </div>
    `
    )
    .join("");
};

if (!product) {
  page.innerHTML = `<div class="alert alert-danger">Produit introuvable.</div>`;
} else {
  const wished = getWishlist().includes(product.id);
  page.innerHTML = `
    <div class="row g-4">
      <div class="col-lg-6">
        <img src="${product.images[0]}" class="img-fluid rounded-4 mb-2" alt="${product.name}" />
        <div class="row g-2">
          ${product.images
            .map((image) => `<div class="col-6"><img src="${image}" class="img-fluid rounded-3" alt="${product.name}" /></div>`)
            .join("")}
        </div>
      </div>
      <div class="col-lg-6">
        <div class="small text-uppercase text-muted">${product.brand}</div>
        <h1 class="h3">${product.name}</h1>
        <div class="mb-2"><span class="rating-stars">${stars(product.rating)}</span> (${product.reviewsCount} avis)</div>
        <div class="h4 mb-3">${money(product.promoPrice ?? product.price)} ${product.promoPrice ? `<small class="text-muted line-through">${money(product.price)}</small>` : ""}</div>

        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <label class="form-label">Variante (teinte/parfum/taille)</label>
            <select id="variant" class="form-select">${product.variants.map((variant) => `<option>${variant}</option>`).join("")}</select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Quantité</label>
            <input id="qty" class="form-control" type="number" min="1" value="1" />
          </div>
        </div>

        <div class="d-flex gap-2 mb-4">
          <button class="btn btn-dark" id="addToCartBtn">Ajouter au panier</button>
          <button class="btn ${wished ? "btn-danger" : "btn-outline-secondary"}" id="wishBtn">Favori ♥</button>
        </div>

        <ul class="list-group mb-3">
          <li class="list-group-item"><strong>INCI:</strong> ${product.ingredients}</li>
          <li class="list-group-item"><strong>Conseils d'utilisation:</strong> ${product.usage}</li>
          <li class="list-group-item"><strong>Contenance:</strong> ${product.size}</li>
          <li class="list-group-item"><strong>Origine:</strong> ${product.origin}</li>
          <li class="list-group-item"><strong>Type de peau:</strong> ${product.skinType}</li>
        </ul>

        <div class="ratio ratio-16x9 rounded overflow-hidden border">
          <iframe src="${product.video}" title="Vidéo produit" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <section class="mt-5">
      <h2 class="h4">Avis & notation</h2>
      <form class="row g-2 mb-3" id="reviewForm">
        <div class="col-md-3"><input required class="form-control" id="author" placeholder="Nom" /></div>
        <div class="col-md-2">
          <select class="form-select" id="rating">
            <option value="5">5/5</option><option value="4">4/5</option><option value="3">3/5</option><option value="2">2/5</option><option value="1">1/5</option>
          </select>
        </div>
        <div class="col-md-5"><input required class="form-control" id="comment" placeholder="Ton avis" /></div>
        <div class="col-md-2"><button class="btn btn-outline-dark w-100">Publier</button></div>
      </form>
      <div id="reviewsList"></div>
    </section>
  `;

  document.getElementById("addToCartBtn").addEventListener("click", () => {
    const qty = Number(document.getElementById("qty").value || 1);
    const variant = document.getElementById("variant").value;
    addToCart(product.id, qty, variant);
    setCartCount();
  });

  document.getElementById("wishBtn").addEventListener("click", (event) => {
    const active = toggleWishlist(product.id);
    event.target.classList.toggle("btn-danger", active);
    event.target.classList.toggle("btn-outline-secondary", !active);
  });

  document.getElementById("reviewForm").addEventListener("submit", (event) => {
    event.preventDefault();
    addReview(product.id, {
      author: document.getElementById("author").value,
      rating: Number(document.getElementById("rating").value),
      comment: document.getElementById("comment").value
    });
    event.target.reset();
    renderReviews();
  });

  renderReviews();
}

setCartCount();