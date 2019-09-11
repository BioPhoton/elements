const fs = require('fs-extra');

(async function build() {

  await fs.ensureDir('./dist/elements');
  await fs.copyFile('./dist/elements/main-es2015.js', './dist/elements/elements.js', (err) => {
    if (err) throw err;
    console.log('main-es2015.js bundle renamed to elements.js');
  });
})();
