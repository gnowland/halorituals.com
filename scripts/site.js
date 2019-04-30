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

let cartSticky = false;
const stickyCart = () => {
  const main = document.getElementById('canvas-wrapper');
  const cart = document.getElementsByClassName('absolute-cart-box')[0];
  if (!cart || !main) return;

  const scroll = window.pageYOffset;
  const mainOffset = main.offsetTop - scroll;

  if (mainOffset > 0 ) {
    cart.style.top = 11 + mainOffset + 'px';
    cartSticky = true;
  } else if (cartSticky) {
    cart.style.top = '';
    cartSticky = false;
  }
}

// Use readystate 'interactive' to wire up the mutationobserver super early
document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    // Wait for cart to exist, then run cart updates
    new MutationObserver((mutations, observer) => {
      const cart = document.getElementsByClassName('sqs-pill-shopping-cart')[0];
      const bar = document.getElementsByClassName('sqs-announcement-bar')[0];
      if (cart && bar) observer.disconnect(); // stop observing
      if (cart) {
        accountMenu(cart);
        cartVisibility(cart);
      }
      if (bar) {
        stickyCart();
        bar.getElementsByClassName('sqs-announcement-bar-close')[0].addEventListener("click", () => {
          document.getElementsByClassName('absolute-cart-box')[0].style.top = '';
          cartSticky = false;
        });
      }
    }).observe(document.body, { childList: true, subtree: false });
  }
}

window.onscroll = stickyCart;
window.addEventListener('orientationchange', stickyCart);

// The event subscription that fires when the page is ready
window.addEventListener('DOMContentLoaded', () => {
});
