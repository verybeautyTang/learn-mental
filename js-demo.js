function test() {
  returnFn()
  return
  function returnFn() {
    const x = 1
    console.log(x)
    return x
  }
}

test()

function* fib(max) {
  debugger
  let t,
    a = 0,
    b = 1,
    n = 0
  while (n < max) {
    yield a
    ;[a, b] = [b, a + b]
    n++
  }
  return
}
let f = fib(5)
f.next() // {value: 0, done: false}
f.next() // {value: 1, done: false}
f.next() // {value: 1, done: false}
f.next() // {value: 2, done: false}
f.next() // {value: 3, done: false}
f.next() // {value: undefined, done: true}
