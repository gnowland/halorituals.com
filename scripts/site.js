/*!
 * halorituals.com
 * @author Gifford Nowland <hi@giffordnowland.com> (https://giffordnowland.com)
 * @license Apache 2.0
 */

/**
 * NOTE: removed sqs-core module include & imageloader function in 900705e
 */

// set up the mutation observer
const cartExists = new MutationObserver((mutations, me) => {
  // `mutations` is an array of mutations that occurred
  // `me` is the MutationObserver instance
  const cart = document.getElementsByClassName('sqs-pill-shopping-cart')[0];
  if (cart) {
    accountMenu(cart);
    me.disconnect(); // stop observing
    return;
  }
});

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
  // start observing
  cartExists.observe(document.body, {
    childList: true
  });
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
