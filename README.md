# ProjetECom - GlowCare (HTML + Bootstrap + JavaScript)

Prototype e-commerce cosmétique front-end avec pages et fonctionnalités clés.

## Fonctionnalités incluses

- Accueil + catégories (`visage`, `cheveux`, `corps`)
- Recherche globale + filtres (type de peau, marque, prix, promotions)
- Fiches produit détaillées:
	- INCI (ingrédients)
	- Conseils d'utilisation
	- Contenance, origine, type de peau
	- Photos HD, vidéo, variantes
- Panier + checkout simplifié
- Coupons & promotions (`BEAUTY5`, `PACK10`, `BUNDLE2P1`)
- Espace client:
	- Commandes + tracking simulé
	- Retours simplifiés
	- Adresses
	- Wishlist/favoris
- Avis & notation produits
- Blog/Conseils (SEO)
- Paiement, livraison, sécurité (simulés en front)

## Pages

- `index.html`
- `products.html`
- `product.html`
- `cart.html`
- `account.html`
- `blog.html`

## Lancement local

Comme c'est un site statique avec modules JS, ouvre le projet avec un serveur local.

Option VS Code: extension Live Server, puis "Open with Live Server" sur `index.html`.

Option Python:

```bash
python -m http.server 5500
```

Puis ouvre:

`http://localhost:5500/index.html`

## Note

Le projet est prêt pour une évolution vers backend réel (authentification, Stripe/PayPal API, transporteurs, emails transactionnels, base de données).