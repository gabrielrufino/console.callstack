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
