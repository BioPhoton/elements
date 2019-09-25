const fs = require('fs-extra');
const concat = require('concat');

Promise.all([
  // Zone-Full Bundling
  // es2015 StandAlone
  bundleElements('elements', true, true),
  // es2015 Controlled
  bundleElements('elements', true, false),
  // es5 StandAlone
  bundleElements('elements', true, true, true),
  // es5 Controlled
  bundleElements('elements', true, false, true),
  // Zone-Less Bundling
  // es2015 StandAlone
  bundleElements('elements', false, true),
  // es2015 Controlled
  bundleElements('elements', false, false),
  // es5 StandAlone
  bundleElements('elements', false, true, true),
  // es5 Controlled
  bundleElements('elements', false, false, true)
])
  .then(() => {
    console.log('Bundled elements success-fully');
  })
  .catch((error) => {
    console.error(error);
  });

function bundleElements(project = 'elements', zoneFull = true, standAlone = true, es5 = false) {
  const jsVersion = es5 ? 'es5' : 'es2015';
  let folderName = project;
  folderName = !zoneFull ? folderName + '-zone-less' : folderName;
  folderName = standAlone ? folderName + '-stand-alone' : folderName + '-controlled';
  return fs.ensureDir(`./dist/${folderName}`)
    .then(() => {
      return concat([
        `./dist/${folderName}/polyfills-${jsVersion}.js`,
        `./dist/${folderName}/main-${jsVersion}.js`
      ], `./dist/${folderName}/elements${es5 ? '.' + jsVersion : ''}.js`)
        .then(() => console.log(`Successful bundled project ${project} for ${zoneFull ? 'Zone-Full' : 'Zone-Less'} ${standAlone ? 'Stand-Alone' : 'Controlled'} for ECMAScript ${es5 ? 'es5' : 'es2015'}.`));
    })
    .catch(err => {
      console.error(`Error while bundling elements for ${zoneFull ? 'Zone-Full' : 'Zone-Less'} ${standAlone ? 'Stand-Alone' : 'Controlled'} for ECMAScript ${es5 ? 'es5' : 'es2015'}.`);
    });
}
