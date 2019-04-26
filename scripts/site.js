
// Use the sqs-core module to access core Squarespace
// functionality, like Lifecycle and ImageLoader. For
// full documentation, go to:
//
// http://github.com/squarespace/squarespace-core

const core = require('@squarespace/core');

// SquareSpace Image Loader
// https://developers.squarespace.com/imageloader
//
// "Our image loader will then help render images at the
// proper size, even on retina displays. The ImageLoader
// can also be used to fit or fill an image inside parent
// container, where it automatically determines which image
// size to use depending on the current dimensions of the
// container."
//
// Add the imageLoader JSON-T formatter to an img tag
// <img {@| image - meta} />
const loadAllImages = () => {
  const images = document.querySelectorAll('img[data-src]');

  for (let i = 0; i < images.length; i++) {
    core.ImageLoader.load(images[i], {
      load: true
    });
  }
}

let accountMenuDone = false;
const accountMenu = () => {
  const accountMenu = document.getElementById('account-navigation');
  const cart = document.getElementsByClassName('sqs-pill-shopping-cart')[0];

  // Bail if cart lement does not exist or this scrip has ran already
  if (typeof cart === "undefined" || accountMenuDone === true) return;

  // Add account menu to cart
  cart.prepend(accountMenu);
  accountMenuDone = true;

  // Set tabindex for accessability
  cart.getElementsByClassName('sqs-pill-shopping-cart-content')[0].tabIndex = 0;

  // Replace default cart icon with FontAwesome icon
  const cartIcon = cart.getElementsByClassName('icon')[0];
  cartIcon.classList.add('icon-shopping-cart');

  // hide items and subtotal if cart empty
  const items = cart.getElementsByClassName('total-quantity')[0].textContent;
  if (parseInt(items) === 0) {
    cart.classList.add('cart-empty');
  } else {
    cart.classList.remove('cart-empty');
  }
  const addToCartButtons = document.getElementsByClassName('sqs-add-to-cart-button');
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", () => {
      cart.classList.remove('cart-empty');
    });
  }
}

const init = () => {
  loadAllImages();
  accountMenu();
};

// The event subscription that fires when the page is ready
window.addEventListener('DOMContentLoaded', () => {
  init();
});

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    init();
  }
}

// The event subscription that fires when the page is resized
window.addEventListener('resize', () => {
  loadAllImages();
});
