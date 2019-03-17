/**
 * This is the client-side of a really rudimentary test runner, which runs
 * tests in headless Chrome via Puppeter. It's currently MVP.
 *
 * Next steps will be to do wildcard matching (with overrides), and to work out
 * a more elegant interface for running tests and exposing the results.
 *
 * Future features might include timings (should be relatively easy with new,
 * native APIs), and to see if there's a way to figure out code coverage without
 * loads of dependencies.
 */
import * as tests from './../src/application.unit.test.mjs';

/**
 * Iterates through test module keys and calls any functions it finds. This
 * isn't safe at the moment: there's no type checking or exception catching.
 */
Object.keys(tests).forEach(test => {
  console.log(`Running test: ${test}`);
  const result = tests[test].call();
  console.log(`${test} result: ${result}`);
});

export default function something() {
  
}
