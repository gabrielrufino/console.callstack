'use strict'

console.callstack = function (label = 'Callstack snapshot') {
  try {
    throw new Error()
  } catch ({ stack }) {
    const regex = /at\s[\S]+/g
    const items = stack.match(regex)

    const [, ...callstack] = items
        .map((item, index, { length }) => ({
          stack: item.replace('at ', ''),
          position: length - index - 1,
        }))

    console.log(`[${label}]`)
    console.table(callstack)
  }
}
