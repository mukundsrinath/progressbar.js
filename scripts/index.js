const _ = {
  map: require('lodash.map'),
  forEach: require('lodash.foreach')
};
const ProgressBar = require('progressbar.js');
const introSquare = require('./examples/intro-square');
const introCircle = require('./examples/intro-circle');
const introTriangle = require('./examples/intro-triangle');
const initializeExamples = require('./init-examples');

function onLoad() {
  // Create a fake loading bar, just for a demo. :)
  var loadingBar = createLoadingBar();
  playFakeLoadingDemo(loadingBar)

  const playIntro = initializeIntro();
  const playExamples = initializeExamples();

  setTimeout(() => {
    playIntro();
    playExamples();
  }, 1500);
}

function initializeIntro() {
  const createBars = [introSquare, introCircle, introTriangle];
  const introBars = _.map(createBars, (createBar, i) => {
    return createBar('#intro-demo' + (i + 1));
  });

  setInterval(() => {
    _.forEach(introBars, bar => bar.set(0));
    playIntroDemo(introBars);
  }, 5000);

  return () => playIntroDemo(introBars);
}

function playIntroDemo(introBars) {
  _.forEach(introBars, bar => bar.animate(1));
  var triangle = introBars[2];

  setTimeout(() => {
    triangle.path.style['stroke-linecap'] = 'round';
  }, 100);
}

function playFakeLoadingDemo(loadingBar) {
  setTimeout(() => loadingBar.animate(0.1), 20);
  setTimeout(() => {
    loadingBar.animate(1.0, {
      duration: 500,
      easing: 'easeIn'
    })
  }, 500);
  setTimeout(() => loadingBar.set(0), 1200);
}

function createLoadingBar() {
  return new ProgressBar.Line('#loading-bar', {
    color: '#0FA0CE',
    svgStyle: {
      width: '100%',
      height: '100%',
      display: 'block'
    }
  });
}

window.onload = onLoad;
