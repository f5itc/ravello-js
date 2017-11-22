// example/listBlueprints
const r = require('..');

r.listBlueprints().then((res) => {
  console.log('Got', res.length, 'blueprints');
});
