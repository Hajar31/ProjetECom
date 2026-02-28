import { PRODUCTS } from "./data.js";
import { addAddress, addReturn, getAddresses, getOrders, getReturns, getWishlist } from "./store.js";
import { money, setCartCount } from "./main.js";

const ordersList = document.getElementById("ordersList");
const returnsList = document.getElementById("returnsList");
const addressesList = document.getElementById("addressesList");
const wishlistGrid = document.getElementById("wishlistGrid");

const renderOrders = () => {
  const orders = getOrders();
  if (!orders.length) {
    ordersList.innerHTML = `<div class="text-muted">Aucune commande.</div>`;
    return;
  }
  ordersList.innerHTML = orders
    .map(
      (order) => `
      <div class="border rounded-3 p-3 mb-2">
        <div class="d-flex justify-content-between flex-wrap gap-2"><strong>${order.id}</strong><span class="badge text-bg-info">${order.status}</span></div>
        <div class="small text-muted">Tracking: ${order.tracking}</div>
        <div class="small">Total: ${money(order.summary.total)}</div>
      </div>
    `
    )
    .join("");
};

const renderReturns = () => {
  const returns = getReturns();
  if (!returns.length) {
    returnsList.innerHTML = `<div class="text-muted">Aucun retour.</div>`;
    return;
  }
  returnsList.innerHTML = returns
    .map(
      (ret) => `
      <div class="border rounded-3 p-2 mb-2 small">
        <strong>${ret.orderId}</strong> - ${ret.reason} <span class="text-muted">(${new Date(ret.createdAt).toLocaleDateString("fr-FR")})</span>
      </div>
    `
    )
    .join("");
};

const renderAddresses = () => {
  const addresses = getAddresses();
  if (!addresses.length) {
    addressesList.innerHTML = `<div class="text-muted">Aucune adresse enregistrée.</div>`;
    return;
  }
  addressesList.innerHTML = addresses
    .map((address) => `<div class="border rounded-3 p-2 mb-2"><strong>${address.label}</strong><div class="small">${address.value}</div></div>`)
    .join("");
};

const renderWishlist = () => {
  const ids = getWishlist();
  const products = PRODUCTS.filter((product) => ids.includes(product.id));
  if (!products.length) {
    wishlistGrid.innerHTML = `<div class="col-12 text-muted">Aucun favori.</div>`;
    return;
  }
  wishlistGrid.innerHTML = products
    .map(
      (product) => `
      <div class="col-md-6">
        <div class="card h-100">
          <img src="${product.images[0]}" class="card-img-top product-thumb" alt="${product.name}" />
          <div class="card-body">
            <h3 class="h6">${product.name}</h3>
            <a href="product.html?id=${product.id}" class="btn btn-outline-dark btn-sm">Voir fiche</a>
          </div>
        </div>
      </div>
    `
    )
    .join("");
};

document.getElementById("returnForm").addEventListener("submit", (event) => {
  event.preventDefault();
  addReturn({
    orderId: document.getElementById("returnOrderId").value,
    reason: document.getElementById("returnReason").value
  });
  event.target.reset();
  renderReturns();
});

document.getElementById("addressForm").addEventListener("submit", (event) => {
  event.preventDefault();
  addAddress({
    label: document.getElementById("addressLabel").value,
    value: document.getElementById("addressValue").value
  });
  event.target.reset();
  renderAddresses();
});

setCartCount();
renderOrders();
renderReturns();
renderAddresses();
renderWishlist();