# betterloggingwithecho
log things to the console

## installation
```sh
npm install betterloggingwithecho
```

## usage
```js
const log = require("betterloggingwithecho")

log("hello world!") // outputs "hello world!"

log('The', 'quick', 'brown', 'fox') // outputs 'The quick brown fox'

log(1) // outputs 1

log() // outputs undefined

log({e:1}) // outputs { e: 1 }
```

## tests
simply clone the repo, install, and run `npm test`

## examples
clone the repo and run `node example`

## licence
mit