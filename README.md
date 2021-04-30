# console.callstack

Prints a snapshot of the callstack at the time of the call

### Getting started

```js
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
```

### Example

```js
require('./index')


function three() {
  console.callstack('Inside three')
  console.log('Hey')
}

function two() {
  console.callstack('Inside two')
  three()
}

function one() {
  console.callstack('Inside one')
  two()
}

console.callstack('Initial stack')
one()
```

Running the `example.js`:

```bash
$ node example.js

[Initial stack]
┌─────────┬──────────────────────────────────────────┬──────────┐
│ (index) │                  stack                   │ position │
├─────────┼──────────────────────────────────────────┼──────────┤
│    0    │           'Object.<anonymous>'           │    6     │
│    1    │            'Module._compile'             │    5     │
│    2    │     'Object.Module._extensions..js'      │    4     │
│    3    │              'Module.load'               │    3     │
│    4    │         'Function.Module._load'          │    2     │
│    5    │     'Function.executeUserEntryPoint'     │    1     │
│    6    │ 'internal/main/run_main_module.js:17:47' │    0     │
└─────────┴──────────────────────────────────────────┴──────────┘
[Inside one]
┌─────────┬──────────────────────────────────────────┬──────────┐
│ (index) │                  stack                   │ position │
├─────────┼──────────────────────────────────────────┼──────────┤
│    0    │                  'one'                   │    7     │
│    1    │           'Object.<anonymous>'           │    6     │
│    2    │            'Module._compile'             │    5     │
│    3    │     'Object.Module._extensions..js'      │    4     │
│    4    │              'Module.load'               │    3     │
│    5    │         'Function.Module._load'          │    2     │
│    6    │     'Function.executeUserEntryPoint'     │    1     │
│    7    │ 'internal/main/run_main_module.js:17:47' │    0     │
└─────────┴──────────────────────────────────────────┴──────────┘
[Inside two]
┌─────────┬──────────────────────────────────────────┬──────────┐
│ (index) │                  stack                   │ position │
├─────────┼──────────────────────────────────────────┼──────────┤
│    0    │                  'two'                   │    8     │
│    1    │                  'one'                   │    7     │
│    2    │           'Object.<anonymous>'           │    6     │
│    3    │            'Module._compile'             │    5     │
│    4    │     'Object.Module._extensions..js'      │    4     │
│    5    │              'Module.load'               │    3     │
│    6    │         'Function.Module._load'          │    2     │
│    7    │     'Function.executeUserEntryPoint'     │    1     │
│    8    │ 'internal/main/run_main_module.js:17:47' │    0     │
└─────────┴──────────────────────────────────────────┴──────────┘
[Inside three]
┌─────────┬──────────────────────────────────┬──────────┐
│ (index) │              stack               │ position │
├─────────┼──────────────────────────────────┼──────────┤
│    0    │             'three'              │    8     │
│    1    │              'two'               │    7     │
│    2    │              'one'               │    6     │
│    3    │       'Object.<anonymous>'       │    5     │
│    4    │        'Module._compile'         │    4     │
│    5    │ 'Object.Module._extensions..js'  │    3     │
│    6    │          'Module.load'           │    2     │
│    7    │     'Function.Module._load'      │    1     │
│    8    │ 'Function.executeUserEntryPoint' │    0     │
└─────────┴──────────────────────────────────┴──────────┘
Hey
```

### License

The MIT License
