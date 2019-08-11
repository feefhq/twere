// Karma configuration
const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'src/**/!(index).js', type: 'module' }
    ],
    reporters: ['mocha', 'coverage-istanbul'],
    port: 9999,
    colors: true,
    logLevel: config.LOG_INFO,
    // Using a different launcher until this issue is resolved
    // https://github.com/karma-runner/karma-safari-launcher/issues/29
    browsers: ['ChromeHeadless', 'Firefox', 'Safari'],
    singleRun: true,
    concurrency: Infinity,
    preprocessors: {
      'src/**/!(*.spec.*).js': ['karma-coverage-istanbul-instrumenter']
    },
    coverageIstanbulInstrumenter: {
      esModules: true
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage')
    }
  })
}
