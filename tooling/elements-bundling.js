const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

  // Zone-Full Bundling

  // es2015
  await fs.ensureDir('./dist/elements');
  await concat([
    './dist/elements/main-es2015.js',
    './dist/elements/polyfills-es2015.js'
  ], './dist/elements/elements.js', function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

  // es5
  await fs.ensureDir('./dist/elements');
  await concat([
    './dist/elements/main-es5.js',
    './dist/elements/polyfills-es5.js'
  ], './dist/elements/elements-es5.js', function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

  // Zone-Less Bundling

  // es2015
  await fs.ensureDir('./dist/elements-zone-less');
  await concat(['./dist/elements-zone-less/main-es2015.js'], './dist/elements-zone-less/elements.js', function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

  // es5
  await fs.ensureDir('./dist/elements-zone-less');
  await concat(['./dist/elements-zone-less/main-es5.js'], './dist/elements-zone-less/elements-es5.js', function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

})();
