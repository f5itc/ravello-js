// example/listImages
const r = require('..');

r.listImages().then((images) => {
  console.log('Got', images.length, 'images');
});
