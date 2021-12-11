'use strict';

const Mocha = require('mocha');
const {
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
} = Mocha.Runner.constants;

class EtestReporter {
  constructor(runner) {
    const stats = runner.stats;

    runner
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(`failed: ${test.fullTitle()}`)
        console.log('actual:')
        console.log(err.actual);
        console.log('expected:');
        console.log(err.expected);
      })
      .once(EVENT_RUN_END, () => {
        console.log(`end: ${stats.passes}/${stats.passes + stats.failures} ok`);
      });
  }
}

module.exports = EtestReporter;
