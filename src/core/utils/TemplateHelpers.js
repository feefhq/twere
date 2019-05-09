/**
 * This is a POC for chainable template helper fucntions.
 */

export const then = (action, execute) => {
  return execute ? action : ``
}

export const when = condition => {
  return { then: (action) => then(action, condition) }
}

export const has = condition => {
  return { then: (action) => then(action, condition && condition.length) }
}

export const no = condition => {
  return { then: (action) => then(action, !condition || !condition.length) }
}

export const all = iterable => {
  return { then: (action) => then(iterable.map(action).join(''), true) }
}
