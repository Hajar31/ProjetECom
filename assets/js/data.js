export const PRODUCTS = [
  {
    id: 1,
    name: "Sérum Vitamine C Éclat",
    category: "visage",
    brand: "Dermalya",
    skinType: "mixte",
    price: 34.9,
    promoPrice: 29.9,
    rating: 4.7,
    reviewsCount: 128,
    stock: 24,
    weight: 0.2,
    origin: "France",
    size: "30 ml",
    ingredients: "Aqua, Ascorbic Acid, Glycerin, Niacinamide, Tocopherol",
    usage: "Appliquer 3 gouttes matin/soir sur peau propre avant la crème.",
    variants: ["Classique", "Sans parfum"],
    video: "https://www.youtube.com/embed/9No-FiEInLA",
    images: [
      "https://images.unsplash.com/photo-1620917669788-c6f1cf3f2b44?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=80"
    ],
    promo: true,
    bundleEligible: true
  },
  {
    id: 2,
    name: "Crème Hydratante Céramides",
    category: "visage",
    brand: "PureSkin",
    skinType: "sèche",
    price: 27.5,
    promoPrice: null,
    rating: 4.8,
    reviewsCount: 94,
    stock: 35,
    weight: 0.25,
    origin: "Corée",
    size: "50 ml",
    ingredients: "Aqua, Ceramide NP, Hyaluronic Acid, Shea Butter, Panthenol",
    usage: "Appliquer matin et soir après le sérum.",
    variants: ["50 ml", "100 ml"],
    video: "https://www.youtube.com/embed/uQITWbAaDx0",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
    ],
    promo: false,
    bundleEligible: true
  },
  {
    id: 3,
    name: "Shampoing Réparateur Kératine",
    category: "cheveux",
    brand: "Capilla",
    skinType: "tous",
    price: 19.9,
    promoPrice: 16.9,
    rating: 4.5,
    reviewsCount: 76,
    stock: 60,
    weight: 0.5,
    origin: "Italie",
    size: "250 ml",
    ingredients: "Aqua, Keratin, Argania Spinosa Oil, Cocamidopropyl Betaine",
    usage: "Masser sur cheveux mouillés, laisser 2 min, rincer.",
    variants: ["250 ml", "500 ml"],
    video: "https://www.youtube.com/embed/lP26UCnoH9s",
    images: [
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=1000&q=80"
    ],
    promo: true,
    bundleEligible: false
  },
  {
    id: 4,
    name: "Masque Nourrissant Coco",
    category: "cheveux",
    brand: "Capilla",
    skinType: "tous",
    price: 24,
    promoPrice: null,
    rating: 4.6,
    reviewsCount: 51,
    stock: 32,
    weight: 0.4,
    origin: "Espagne",
    size: "200 ml",
    ingredients: "Aqua, Cocos Nucifera Oil, Glycerin, Hydrolyzed Wheat Protein",
    usage: "Appliquer sur longueurs, poser 5 minutes puis rincer.",
    variants: ["200 ml"],
    video: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=1000&q=80"
    ],
    promo: false,
    bundleEligible: true
  },
  {
    id: 5,
    name: "Lait Corps Apaisant",
    category: "corps",
    brand: "BioNatura",
    skinType: "sensible",
    price: 18.9,
    promoPrice: 15.9,
    rating: 4.4,
    reviewsCount: 41,
    stock: 45,
    weight: 0.35,
    origin: "Maroc",
    size: "300 ml",
    ingredients: "Aqua, Aloe Barbadensis Leaf Juice, Calendula Officinalis Extract",
    usage: "Appliquer après la douche sur peau sèche.",
    variants: ["Sans parfum", "Parfum coton"],
    video: "https://www.youtube.com/embed/sNPnbI1arSE",
    images: [
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80"
    ],
    promo: true,
    bundleEligible: true
  },
  {
    id: 6,
    name: "Gommage Corps Doux",
    category: "corps",
    brand: "BioNatura",
    skinType: "tous",
    price: 21,
    promoPrice: null,
    rating: 4.3,
    reviewsCount: 33,
    stock: 28,
    weight: 0.45,
    origin: "Tunisie",
    size: "250 g",
    ingredients: "Sucrose, Aqua, Prunus Amygdalus Dulcis Oil, Vitamin E",
    usage: "1 à 2 fois par semaine sur peau humide.",
    variants: ["Vanille", "Rose"],
    video: "https://www.youtube.com/embed/ZbZSe6N_BXs",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1000&q=80"
    ],
    promo: false,
    bundleEligible: true
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Routine peau sèche: matin & soir",
    excerpt: "Les étapes essentielles pour hydrater durablement et renforcer la barrière cutanée.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    content: "Nettoyant doux, sérum hydratant, crème aux céramides et SPF en journée."
  },
  {
    id: 2,
    title: "Acné adulte: erreurs fréquentes",
    excerpt: "Pourquoi l'exfoliation excessive et les actifs mal dosés aggravent les imperfections.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
    content: "Privilégier une routine simple avec niacinamide, acide salicylique et hydratation."
  },
  {
    id: 3,
    title: "Choisir son shampoing selon son cuir chevelu",
    excerpt: "Gras, sec, sensible: le bon diagnostic pour de meilleurs résultats.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    content: "Adapter les tensioactifs et la fréquence de lavage à ton profil capillaire."
  }
];

export const COUPONS = {
  BEAUTY5: { type: "percent", value: 5, minAmount: 30 },
  PACK10: { type: "fixed", value: 10, minAmount: 80 },
  BUNDLE2P1: { type: "bundle", value: 1, minAmount: 0 }
};