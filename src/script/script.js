// const searchForm = document.querySelector('.search-form');
// const searchBtn = document.querySelector('#search-btn');
// const shoppingCart = document.querySelector('.shopping-cart');
// const cartBtn = document.querySelector('#cart-btn');
// const favForm = document.querySelector('.fav-form');
// const favBtn = document.querySelector('#fav-btn');
// const navbar = document.querySelector('.navbar');
// const section = document.querySelectorAll('section');
// const navLinks = document.querySelectorAll('header .navbar a');

// searchBtn.onclick = () => {
//   searchForm.classList.toggle('active');
//   shoppingCart.classList.remove('active');
//   favForm.classList.remove('active');
//   navbar.classList.remove('active');
// };

// cartBtn.onclick = () => {
//   shoppingCart.classList.toggle('active');
//   favForm.classList.remove('active');
//   searchForm.classList.remove('active');
//   navbar.classList.remove('active');
// };

// favBtn.onclick = () => {
//   favForm.classList.toggle('active');
//   searchForm.classList.remove('active');
//   shoppingCart.classList.remove('active');
//   navbar.classList.remove('active');
// };

// menuBtn.onclick = () => {
//   navbar.classList.toggle('active');
//   favForm.classList.remove('active');
//   searchForm.classList.remove('active');
//   shoppingCart.classList.remove('active');
// };

// Wait for DOM to fully load
window.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const searchBtn = document.querySelector('#search-btn');
  const shoppingCart = document.querySelector('.shopping-cart');
  const cartBtn = document.querySelector('#cart-btn');
  const favForm = document.querySelector('.fav-form');
  const favBtn = document.querySelector('#fav-btn');
  const navbar = document.querySelector('.navbar');
  const menuBtn = document.querySelector('#menu-btn');

  // Toggle logic
  searchBtn.onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    favForm.classList.remove('active');
    navbar.classList.remove('active');
  };

  cartBtn.onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    favForm.classList.remove('active');
    navbar.classList.remove('active');
  };

  favBtn.onclick = () => {
    favForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
  };

  menuBtn.onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    favForm.classList.remove('active');
  };

  // Function to update total
  function updateCartTotal() {
    const priceEls = shoppingCart.querySelectorAll('.price');
    let total = 0;
    priceEls.forEach(el => {
      total += parseInt(el.textContent.replace('₹', '').trim());
    });
    const totalEl = shoppingCart.querySelector('.total');
    if (totalEl) totalEl.textContent = `total : ₹${total}`;
  }

  // Function to add to cart
  function addToCart(name, price, img) {
    const cart = shoppingCart;
    const totalDiv = cart.querySelector('.total');

    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = `
      <i class="fas fa-trash"></i>
      <img src="${img}" alt="" />
      <div class="content">
        <h3>${name}</h3>
        <span class="price">₹${price}</span>
        <span class="quantity">qty : 1</span>
      </div>
    `;
    cart.insertBefore(box, totalDiv);
    updateCartTotal();
  }

  // Optional: Add to favorite
  function addToFav(name, price, img) {
    const fav = favForm;
    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = `
      <i class="fas fa-trash"></i>
      <img src="${img}" alt="" />
      <div class="content">
        <h3>${name}</h3>
        <span class="price">₹${price}</span>
        <span class="quantity">qty : 1</span>
      </div>
    `;
    fav.appendChild(box);
  }

  // Handle "Add to Cart" button clicks
  const dishBoxes = document.querySelectorAll('.dishes .box');
  dishBoxes.forEach(dish => {
    const btn = dish.querySelector('.btn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = dish.querySelector('h3').textContent;
      const price = dish.querySelector('span').textContent.replace('₹', '').trim();
      const img = dish.querySelector('img').getAttribute('src');

      addToCart(name, price, img);
      // addToFav(name, price, img); // Enable this if you want it added to fav also
    });
  });

  // Remove item from cart or fav
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-trash')) {
      const box = e.target.closest('.box');
      const isCart = shoppingCart.contains(box);
      box.remove();
      if (isCart) updateCartTotal();
    }
  });

  // Initial cart total update
  updateCartTotal();
});
