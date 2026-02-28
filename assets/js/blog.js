import { BLOG_POSTS } from "./data.js";
import { setCartCount } from "./main.js";

const blogGrid = document.getElementById("blogGrid");

blogGrid.innerHTML = BLOG_POSTS.map((post) => `
  <div class="col-md-6 col-lg-4">
    <article class="card h-100">
      <img src="${post.image}" class="card-img-top product-thumb" alt="${post.title}" />
      <div class="card-body d-flex flex-column">
        <h2 class="h5">${post.title}</h2>
        <p class="text-muted small">${post.excerpt}</p>
        <p class="small mt-auto mb-0">${post.content}</p>
      </div>
    </article>
  </div>
`).join("");

setCartCount();