/**
 * Do some wrangling of objects to strings.
 */
export const f = (val) => {
  switch (val.constructor) {
    case Array:
      return val.reduce((a, c) => a + c);
    default:
      return val;
  }
};

/**
 * Currently just here to stop linter complaining about defaults.
 */
export const mock = () => {};
