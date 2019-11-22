/**
 * This is a POC for chainable template helper fucntions.
 */

export const when = condition => {
  return { then: action => then(action, condition) }
}

export const has = condition => {
  return { then: action => then(action, condition && condition.length) }
}

/**
 *
 * @param {*} condition
 */
export const no = condition => {
  return { then: action => then(action, !condition || !condition.length) }
}

/**
 *
 * @param {*} iterable
 */
export const all = (iterable = []) => {
  return { then: action => then(iterable.map(action).join(''), true) }
}

/**
 *
 * @param {*} action
 * @param {*} execute
 */
export const then = (action, execute) => {
  return action !== undefined && execute ? action : ''
}
