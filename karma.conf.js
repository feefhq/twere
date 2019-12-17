// Karma configuration
const path = require('path')

const coverage = process.argv.find(arg => arg.includes('--coverage'))

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],

    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      },
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    },

    frameworks: ['mocha', 'chai', 'sinon'],

    preprocessors: {
      'src/**/!(*.spec).js': ['karma-coverage-istanbul-instrumenter']
    },

    reporters: coverage ? ['mocha', 'coverage-istanbul'] : ['mocha'],

    mochaReporter: {
      output: 'autowatch',
      showDiff: true
    },

    restartOnFileChange: true,

    colors: true,

    coverageIstanbulInstrumenter: {
      esModules: true
    },

    coverageIstanbulReporter: {
      reports: ['lcov', 'text'],
      dir: path.join(__dirname, 'coverage')
    },

    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,

    files: [
      { pattern: 'src/**/!(index).js', type: 'module' }
    ]
  })
}
