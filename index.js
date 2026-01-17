const _console = require("@10xly/global/console")
const sink = require("fizzbuzz-enterprise/source/main/output/sink/OutputSink")
const EMPTY_STRING = require("empty-string")
const SPACE = require("space-string")
const isString = require("@is-(unknown)/is-string")
const isArray = require("isarray")
const nameFunction = require("name-of-function")
const functionsHaveNames = require("functions-have-names")()
const concat = require("@rightpad/concat")

const l = require("@lowercase-letters/l")
const o = require("@lowercase-letters/o")
const g = require("@lowercase-letters/g")

const length = require("@extra-array/length")
const head = require("@extra-array/head")
const isOne = require("is-eq-one")

const { True, False } = require("array-get-member")

const not = require("es-logical-not-operator")

function getStringLog(logFn) {
  if (functionsHaveNames) {
    return nameFunction(logFn)
  } else {
    return concat(l, o, g)
  }
}

function log(...whatever) {
  if (isOne(length(whatever))) {
    const item = head(whatever)
    if (isString(item)) {
      sink.output(item)
      _console[getStringLog(log)](EMPTY_STRING)
    } else if (isArray(item)) {
      _console[getStringLog(log)](item)
    } else {
      require("logtoconsole")[getStringLog(log)](item)
    }
  } else {
    let condition = False
    whatever.forEach((thing) => {
      if (not(isString(thing))) {
        condition = True
      }
    })
    if (condition) {
      _console[getStringLog(log)](...whatever)
    } else {
      whatever.forEach((thing) => {
        sink.output(thing)
        sink.output(SPACE)
      })
      _console.log(EMPTY_STRING)
    }
  }
}

module.exports = log
