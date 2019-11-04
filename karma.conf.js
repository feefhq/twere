// Karma configuration
const path = require('path')

module.exports = function (config) {
  config.set({
    captureTimeout: 300000,
    browserNoActivityTimeout: 300000,
    browserDisconnectTolerance: 2,
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      },
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless'
        // flags: ['--no-sandbox']
      }
    },
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      { pattern: 'src/**/!(index).js', type: 'module' },
      { pattern: 'src/**/*.css', type: 'css', included: false }
    ],
    // reporters: ['mocha'],
    reporters: ['mocha', 'coverage-istanbul'],
    port: 9999,
    // Using a different launcher until this issue is resolved
    // https://github.com/karma-runner/karma-safari-launcher/issues/29
    browsers: ['ChromeHeadlessNoSandbox'],
    // browsers: ['ChromeHeadless', 'FirefoxHeadless', 'Safari'],
    preprocessors: {
      'src/**/!(*.spec).js': ['karma-coverage-istanbul-instrumenter']
    },
    coverageIstanbulInstrumenter: {
      esModules: true
    },
    coverageIstanbulReporter: {
      reports: ['lcov', 'text'],
      dir: path.join(__dirname, 'coverage')
    },
    restartOnFileChange: true,
    mochaReporter: {
      output: 'autowatch',
      showDiff: true
    }
  })
}
