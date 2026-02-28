import { COUPONS, PRODUCTS } from "./data.js";
import { addOrder, clearCart, getCart, setCart, updateCartQty } from "./store.js";
import { money, setCartCount } from "./main.js";

const refs = {
  cartItems: document.getElementById("cartItems"),
  summaryList: document.getElementById("summaryList"),
  totalPrice: document.getElementById("totalPrice"),
  couponInput: document.getElementById("couponInput"),
  applyCoupon: document.getElementById("applyCoupon"),
  couponMessage: document.getElementById("couponMessage"),
  checkoutForm: document.getElementById("checkoutForm"),
  checkoutMessage: document.getElementById("checkoutMessage"),
  zone: document.getElementById("zone"),
  shippingMethod: document.getElementById("shippingMethod")
};

let couponCode = "";

const currentPrice = (product) => product.promoPrice ?? product.price;

const shippingCost = (zone, method, weight) => {
  const zoneFactor = zone === "local" ? 1 : zone === "national" ? 1.5 : 2.4;
  const methodBase = method === "relay" ? 3.5 : 5.5;
  return (methodBase + weight * 2.2) * zoneFactor;
};

const cartLines = () => {
  const cart = getCart();
  return cart
    .map((item) => {
      const product = PRODUCTS.find((entry) => entry.id === item.productId);
      if (!product) return null;
      return {
        ...item,
        product,
        unitPrice: currentPrice(product),
        lineTotal: currentPrice(product) * item.qty
      };
    })
    .filter(Boolean);
};

const computeDiscount = (subtotal, lines) => {
  if (!couponCode || !COUPONS[couponCode]) return 0;
  const coupon = COUPONS[couponCode];
  if (subtotal < coupon.minAmount) return 0;

  if (coupon.type === "percent") return (subtotal * coupon.value) / 100;
  if (coupon.type === "fixed") return coupon.value;
  if (coupon.type === "bundle") {
    const eligible = lines.filter((line) => line.product.bundleEligible);
    const totalQty = eligible.reduce((sum, line) => sum + line.qty, 0);
    if (totalQty < 3) return 0;
    const cheapest = Math.min(...eligible.map((line) => line.unitPrice));
    return cheapest;
  }
  return 0;
};

const render = () => {
  const lines = cartLines();

  if (!lines.length) {
    refs.cartItems.innerHTML = `<div class="alert alert-info mb-0">Ton panier est vide.</div>`;
    refs.summaryList.innerHTML = "";
    refs.totalPrice.textContent = money(0);
    setCartCount();
    return;
  }

  refs.cartItems.innerHTML = lines
    .map(
      (line) => `
      <div class="d-flex gap-3 align-items-center border rounded-3 p-2 mb-2">
        <img src="${line.product.images[0]}" width="70" height="70" class="rounded object-fit-cover" alt="${line.product.name}" />
        <div class="flex-grow-1">
          <div class="fw-semibold">${line.product.name}</div>
          <div class="small text-muted">Variante: ${line.variant} | ${money(line.unitPrice)}</div>
        </div>
        <input type="number" min="0" class="form-control form-control-sm w-auto qty-input" data-id="${line.productId}" data-variant="${line.variant}" value="${line.qty}" />
      </div>
    `
    )
    .join("");

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const weight = lines.reduce((sum, line) => sum + line.product.weight * line.qty, 0);
  const shipping = shippingCost(refs.zone.value, refs.shippingMethod.value, weight);
  const discount = computeDiscount(subtotal, lines);
  const total = Math.max(0, subtotal + shipping - discount);

  refs.summaryList.innerHTML = `
    <li class="list-group-item d-flex justify-content-between"><span>Sous-total</span><span>${money(subtotal)}</span></li>
    <li class="list-group-item d-flex justify-content-between"><span>Livraison</span><span>${money(shipping)}</span></li>
    <li class="list-group-item d-flex justify-content-between"><span>Réduction</span><span>-${money(discount)}</span></li>
  `;
  refs.totalPrice.textContent = money(total);

  refs.cartItems.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", () => {
      updateCartQty(Number(input.dataset.id), input.dataset.variant, Number(input.value));
      render();
    });
  });

  setCartCount();
};

refs.applyCoupon.addEventListener("click", () => {
  const code = refs.couponInput.value.trim().toUpperCase();
  if (!COUPONS[code]) {
    refs.couponMessage.className = "text-danger small mt-2";
    refs.couponMessage.textContent = "Code invalide";
    return;
  }
  couponCode = code;
  refs.couponMessage.className = "text-success small mt-2";
  refs.couponMessage.textContent = `Coupon ${code} appliqué`;
  render();
});

refs.zone.addEventListener("change", render);
refs.shippingMethod.addEventListener("change", render);

refs.checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const lines = cartLines();
  if (!lines.length) {
    refs.checkoutMessage.innerHTML = `<div class="alert alert-warning mb-0">Ajoute au moins un produit.</div>`;
    return;
  }

  const id = `CMD-${Date.now().toString().slice(-6)}`;
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const weight = lines.reduce((sum, line) => sum + line.product.weight * line.qty, 0);
  const shipping = shippingCost(refs.zone.value, refs.shippingMethod.value, weight);
  const discount = computeDiscount(subtotal, lines);
  const total = Math.max(0, subtotal + shipping - discount);

  const formData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    zip: document.getElementById("zip").value,
    zone: refs.zone.value,
    shippingMethod: refs.shippingMethod.value,
    paymentMethod: document.getElementById("paymentMethod").value
  };

  addOrder({
    id,
    status: "Préparation",
    tracking: `TRK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    items: lines,
    summary: { subtotal, shipping, discount, total },
    customer: formData
  });

  clearCart();
  couponCode = "";
  refs.checkoutForm.reset();
  refs.checkoutMessage.innerHTML = `<div class="alert alert-success mb-0">Commande ${id} validée. Facture et email envoyés (simulation).</div>`;
  render();
});

if (!getCart().length) setCart([]);
setCartCount();
render();