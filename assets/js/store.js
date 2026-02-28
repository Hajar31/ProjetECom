const KEYS = {
  cart: "glowcare_cart",
  wishlist: "glowcare_wishlist",
  reviews: "glowcare_reviews",
  orders: "glowcare_orders",
  returns: "glowcare_returns",
  addresses: "glowcare_addresses"
};

const read = (key, fallback) => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getCart = () => read(KEYS.cart, []);

export const setCart = (items) => write(KEYS.cart, items);

export const addToCart = (productId, qty = 1, variant = "Standard") => {
  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId && item.variant === variant);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty, variant });
  }
  setCart(cart);
};

export const updateCartQty = (productId, variant, qty) => {
  const cart = getCart().map((item) => {
    if (item.productId === productId && item.variant === variant) {
      return { ...item, qty };
    }
    return item;
  }).filter((item) => item.qty > 0);
  setCart(cart);
};

export const clearCart = () => setCart([]);

export const getWishlist = () => read(KEYS.wishlist, []);

export const toggleWishlist = (productId) => {
  const wishlist = getWishlist();
  const exists = wishlist.includes(productId);
  const next = exists ? wishlist.filter((id) => id !== productId) : [...wishlist, productId];
  write(KEYS.wishlist, next);
  return !exists;
};

export const getReviews = () => read(KEYS.reviews, {});

export const addReview = (productId, review) => {
  const reviews = getReviews();
  const key = String(productId);
  const list = reviews[key] || [];
  reviews[key] = [{ ...review, date: new Date().toISOString() }, ...list];
  write(KEYS.reviews, reviews);
};

export const getOrders = () => read(KEYS.orders, []);

export const addOrder = (order) => {
  const orders = getOrders();
  const next = [{ ...order, createdAt: new Date().toISOString() }, ...orders];
  write(KEYS.orders, next);
};

export const getReturns = () => read(KEYS.returns, []);

export const addReturn = (ret) => {
  const returns = getReturns();
  write(KEYS.returns, [{ ...ret, createdAt: new Date().toISOString() }, ...returns]);
};

export const getAddresses = () => read(KEYS.addresses, []);

export const addAddress = (address) => {
  const addresses = getAddresses();
  write(KEYS.addresses, [address, ...addresses]);
};