// Karma configuration
const path = require('path')

module.exports = function (config) {
  config.set({
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
        displayName: 'FirefoxHeadless'
      }
    },
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'src/**/!(index).js', type: 'module' }
    ],
    reporters: ['mocha', 'coverage-istanbul'],
    port: 9999,
    // Using a different launcher until this issue is resolved
    // https://github.com/karma-runner/karma-safari-launcher/issues/29
    browsers: ['ChromeHeadless'],
    // browsers: ['ChromeHeadless', 'FirefoxHeadless', 'Safari'],
    preprocessors: {
      'src/**/!(*.spec.*).js': ['karma-coverage-istanbul-instrumenter']
    },
    coverageIstanbulInstrumenter: {
      esModules: true
    },
    coverageIstanbulReporter: {
      reports: ['lcovonly'],
      dir: path.join(__dirname, 'coverage')
    },
    restartOnFileChange: true
  })
}
