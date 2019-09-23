const fs = require('fs-extra');
const concat = require('concat');

Promise.all([
  // Zone-Full Bundling
  // es2015
  bundleZoneFullEs2015(),
  // es2015 Style-Less
  bundleZoneFullStyleLessEs2015(),
  // es5
  bundleZoneFullEs5(),
  // es5 Style-Less
  bundleZoneFullStyleLessEs5(),
  // Zone-Less Bundling
// es2015
bundleZoneLessEs2015(),
// es2015 Style-Less
bundleZoneLessStyleLessEs2015(),
// es5
bundleZoneLessEs5(),
// es5 Style-Less
bundleZoneLessStyleLessEs5()
])
  .then(() => {
    console.log('Bundled elements success-fully');
  })
  .catch((error) => {
    console.error(error);
  });

// Zone-Full Bundling

// es2015
function bundleZoneFullEs2015() {
  return fs.ensureDir('./dist/elements')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es2015.js',
        './dist/elements/styles-es2015.js',
        './dist/elements/main-es2015.js'
      ], './dist/elements/elements.js');
    })
    .catch(err => {
      console.error('Error while bundling elements check if you build it already');
    });
}
// es2015 style less
function bundleZoneFullStyleLessEs2015() {
  return fs.ensureDir('./dist/elements')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es2015.js',
        './dist/elements/main-es2015.js'
      ], './dist/elements/elements.style-less.js');
    })
    .catch(err => {
      console.error('Error while bundling elements check if you build it already');
    });
}

// es5
function bundleZoneFullEs5() {
  return fs.ensureDir('./dist/elements')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es5.js',
        './dist/elements/styles-es5.js',
        './dist/elements/main-es5.js'
      ], './dist/elements/elements-es5.js')
    }).catch(err => {
      console.error('Error while bundling elements-es5 check if you build it already');
    });
}
// es5 Style-Less
function bundleZoneFullStyleLessEs5() {
  return fs.ensureDir('./dist/elements')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es5.js',
        './dist/elements/main-es5.js'
      ], './dist/elements/elements-es5.style-less.js')
    }).catch(err => {
      console.error('Error while bundling elements-es5 check if you build it already');
    });
}

// Zone-Less Bundling

// es2015
function bundleZoneLessEs2015() {
  return fs.ensureDir('./dist/elements-zone-less')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es2015.js',
        './dist/elements/styles-es2015.js',
        './dist/elements/main-es2015.js'
      ], './dist/elements-zone-less/elements.js')
    }).catch(err => {
      console.error('Error while bundling elements-zone-less check if you build it already');
    });
}

// es2015 Style less
function bundleZoneLessStyleLessEs2015() {
  return fs.ensureDir('./dist/elements-zone-less')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es2015.js',
        './dist/elements/main-es2015.js'
      ], './dist/elements-zone-less/elements.style-less.js')
    }).catch(err => {
      console.error('Error while bundling elements-zone-less check if you build it already');
    });
}


// es5
function bundleZoneLessEs5() {
  return fs.ensureDir('./dist/elements-zone-less')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es5.js',
        './dist/elements/styles-es5.js',
        './dist/elements/main-es5.js'
      ], './dist/elements-zone-less/elements-es5.js')
    }).catch(err => {
      console.error('Error while bundling elements-zone-less-es5 check if you build it already');
    });
}

// es5 Style-Less
function bundleZoneLessStyleLessEs5() {
  return fs.ensureDir('./dist/elements-zone-less')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es5.js',
        './dist/elements/styles-es5.js',
        './dist/elements/main-es5.js'
      ], './dist/elements-zone-less/elements-es5.style-less.js')
    }).catch(err => {
      console.error('Error while bundling elements-zone-less-es5 check if you build it already');
    });
}
