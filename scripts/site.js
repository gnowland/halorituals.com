/*!
 * halorituals.com
 * @author Gifford Nowland <hi@giffordnowland.com> (https://giffordnowland.com)
 * @license Apache 2.0
 *
 * NOTE: removed sqs-core module include & imageloader function in commit 900705e
 */

 const accountMenu = (cart) => {
  const accountMenu = document.getElementById('account-navigation');
  // Add account menu to cart
  cart.prepend(accountMenu);

  // Set tabindex for accessability
  cart.getElementsByClassName('sqs-pill-shopping-cart-content')[0].tabIndex = 0;

  // Replace default cart icon with FontAwesome icon
  const cartIcon = cart.getElementsByClassName('icon')[0];
  cartIcon.classList.add('icon-shopping-cart');

  // hide items and subtotal if cart empty
  const items = cart.getElementsByClassName('total-quantity')[0].textContent;
  if (parseInt(items) === 0) {
    cart.classList.remove('cart-visible');
  } else {
    cart.classList.add('cart-visible');
  }
}

const cartVisibility = (cart) => {
  // Show cart info on update
  const totalQuantity = cart.getElementsByClassName('total-quantity')[0];
  new MutationObserver((mutations, observer) => {
    const items = totalQuantity.textContent;
    if (parseInt(items) > 0) {
      cart.classList.add('cart-visible');
    } else {
      cart.classList.remove('cart-visible');
    }
  }).observe(totalQuantity, { childList: true });
}

// The event subscription that fires when the page is ready
window.addEventListener('DOMContentLoaded', () => {
  // Wait for cart to exist
  new MutationObserver((mutations, observer) => {
    const cart = document.getElementsByClassName('sqs-pill-shopping-cart')[0];
    if (cart) {
      observer.disconnect(); // stop observing
      accountMenu(cart);
      cartVisibility(cart);
    }
  }).observe(document.body, { childList: true });
});
