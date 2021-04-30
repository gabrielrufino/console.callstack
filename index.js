'use strict'

console.callstack = function () {
  try {
    throw new Error()
  } catch ({ stack }) {
    const regex = /at\s[\S]+/g
    const items = stack.match(regex)

    const callstack = items.map((item, index, { length }) => ({
      stack: item,
      position: length - index - 1,
    }))

    console.table(callstack, Object.keys(callstack[0]))
  }
}

console.callstack()
