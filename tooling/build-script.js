const fs = require('fs-extra');

(async function build() {

  await fs.ensureDir('./dist/elements');
  await fs.rename('./dist/elements/main-es2015.js', './dist/elements/elements.js', function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

  await fs.ensureDir('./dist/elements-zone-less');
  await fs.rename('./dist/elements-zone-less/main-es2015.js', './dist/elements-zone-less/elements.js', function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

})();
