
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

// The event subscription that fires when the page is ready
window.addEventListener('DOMContentLoaded', function () {
  loadAllImages();
});

// The event subscription that fires when the page is resized
window.addEventListener('resize', function () {
  loadAllImages();
});