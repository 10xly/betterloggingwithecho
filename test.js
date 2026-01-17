const { expect } = require("chai")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe("log function", () => {
  let log
  let consoleStub
  let sinkStub
  let functionsHaveNamesStub
  let logToConsoleStub

  beforeEach(() => {
    // Create stubs for all dependencies
    consoleStub = {
      log: sinon.stub()
    }

    sinkStub = {
      output: sinon.stub()
    }

    logToConsoleStub = {
      log: sinon.stub()
    }

    functionsHaveNamesStub = sinon.stub().returns(true)

    // Load the module with stubs using proxyquire
    log = proxyquire("./index", {
      "@10xly/global/console": consoleStub,
      "fizzbuzz-enterprise/source/main/output/sink/OutputSink": sinkStub,
      "functions-have-names": functionsHaveNamesStub,
      "logtoconsole": logToConsoleStub
    })
  })

  afterEach(() => {
    sinon.restore()
  })

  describe("single argument behavior", () => {
    describe("when argument is a string", () => {
      it("should output string to sink and log empty string", () => {
        log("test string")

        expect(sinkStub.output.calledOnce).to.be.true
        expect(sinkStub.output.calledWith("test string")).to.be.true
        expect(consoleStub.log.calledOnce).to.be.true
        expect(consoleStub.log.calledWith("")).to.be.true
      })

      it("should handle empty string", () => {
        log("")

        expect(sinkStub.output.calledWith("")).to.be.true
        expect(consoleStub.log.calledWith("")).to.be.true
      })

      it("should handle strings with special characters", () => {
        const specialString = "Hello\nWorld\t!"

        log(specialString)

        expect(sinkStub.output.calledWith(specialString)).to.be.true
      })
    })

    describe("when argument is an array", () => {
      it("should log array directly to console", () => {
        const arr = [1, 2, 3]

        log(arr)

        expect(consoleStub.log.calledOnce).to.be.true
        expect(consoleStub.log.calledWith(arr)).to.be.true
        expect(sinkStub.output.called).to.be.false
      })

      it("should handle empty array", () => {
        const arr = []

        log(arr)

        expect(consoleStub.log.calledWith(arr)).to.be.true
      })

      it("should handle nested arrays", () => {
        const arr = [[1, 2], [3, 4]]

        log(arr)

        expect(consoleStub.log.calledWith(arr)).to.be.true
      })
    })

    describe("when argument is neither string nor array", () => {
      it("should use logtoconsole for objects", () => {
        const obj = { key: "value" }

        log(obj)

        expect(logToConsoleStub.log.calledOnce).to.be.true
        expect(logToConsoleStub.log.calledWith(obj)).to.be.true
      })

      it("should use logtoconsole for numbers", () => {
        log(42)

        expect(logToConsoleStub.log.calledWith(42)).to.be.true
      })

      it("should use logtoconsole for null", () => {
        log(null)

        expect(logToConsoleStub.log.calledWith(null)).to.be.true
      })

      it("should use logtoconsole for undefined", () => {
        log(undefined)

        expect(logToConsoleStub.log.calledWith(undefined)).to.be.true
      })

      it("should use logtoconsole for booleans", () => {
        log(true)

        expect(logToConsoleStub.log.calledWith(true)).to.be.true
      })
    })
  })

  describe("multiple arguments behavior", () => {
    describe("when all arguments are strings", () => {
      it("should output each string to sink with spaces and log empty string", () => {
        log("hello", "world", "test")

        expect(sinkStub.output.callCount).to.equal(6) // 3 strings + 3 spaces
        expect(sinkStub.output.getCall(0).args[0]).to.equal("hello")
        expect(sinkStub.output.getCall(1).args[0]).to.equal(" ")
        expect(sinkStub.output.getCall(2).args[0]).to.equal("world")
        expect(sinkStub.output.getCall(3).args[0]).to.equal(" ")
        expect(sinkStub.output.getCall(4).args[0]).to.equal("test")
        expect(sinkStub.output.getCall(5).args[0]).to.equal(" ")
        expect(consoleStub.log.calledWith("")).to.be.true
      })

      it("should handle two string arguments", () => {
        log("first", "second")

        expect(sinkStub.output.callCount).to.equal(4)
        expect(consoleStub.log.calledOnce).to.be.true
      })
    })

    describe("when at least one argument is not a string", () => {
      it("should log all arguments to console when one is a number", () => {
        log("string", 123, "another")

        expect(consoleStub.log.calledOnce).to.be.true
        expect(consoleStub.log.calledWith("string", 123, "another")).to.be.true
        expect(sinkStub.output.called).to.be.false
      })

      it("should log all arguments to console when one is an object", () => {
        const obj = { a: 1 }

        log("text", obj)

        expect(consoleStub.log.calledWith("text", obj)).to.be.true
      })

      it("should log all arguments to console when one is an array", () => {
        log("text", [1, 2, 3], "more text")

        expect(consoleStub.log.calledWith("text", [1, 2, 3], "more text")).to.be.true
      })

      it("should log all arguments to console when one is null", () => {
        log("text", null, "more")

        expect(consoleStub.log.calledWith("text", null, "more")).to.be.true
      })

      it("should log all arguments to console when one is undefined", () => {
        log("text", undefined)

        expect(consoleStub.log.calledWith("text", undefined)).to.be.true
      })

      it("should log all arguments to console when one is a boolean", () => {
        log("text", false, "more")

        expect(consoleStub.log.calledWith("text", false, "more")).to.be.true
      })
    })

    describe("mixed type combinations", () => {
      it("should handle string, number, object combination", () => {
        const obj = { key: "val" }

        log("start", 99, obj, "end")

        expect(consoleStub.log.calledWith("start", 99, obj, "end")).to.be.true
      })

      it("should handle all non-string types", () => {
        log(1, true, null, [])

        expect(consoleStub.log.calledOnce).to.be.true
      })
    })
  })

  describe("getStringLog function behavior", () => {
    it("should use function name when functions have names", () => {
      functionsHaveNamesStub.returns(true)

      log = proxyquire("./index", {
        "@10xly/global/console": consoleStub,
        "fizzbuzz-enterprise/source/main/output/sink/OutputSink": sinkStub,
        "functions-have-names": functionsHaveNamesStub,
        "logtoconsole": logToConsoleStub
      })

      log("test")

      expect(consoleStub.log.called).to.be.true
    })

    it("should construct 'log' string when functions don't have names", () => {
      functionsHaveNamesStub.returns(false)

      const concatStub = sinon.stub().returns("log")

      log = proxyquire("./index", {
        "@10xly/global/console": consoleStub,
        "fizzbuzz-enterprise/source/main/output/sink/OutputSink": sinkStub,
        "functions-have-names": functionsHaveNamesStub,
        "@rightpad/concat": concatStub,
        "logtoconsole": logToConsoleStub
      })

      log("test")

      expect(consoleStub.log.called).to.be.true
    })
  })

  describe("edge cases", () => {
    it("should handle no arguments gracefully", () => {
      expect(() => log()).to.not.throw()
    })

    it("should handle very long strings", () => {
      const longString = "a".repeat(10000)

      log(longString)

      expect(sinkStub.output.calledWith(longString)).to.be.true
    })

    it("should handle many arguments", () => {
      const args = Array(100).fill("test")

      log(...args)

      expect(sinkStub.output.callCount).to.equal(200) // 100 strings + 100 spaces
    })

    it("should handle special string values", () => {
      log("0")
      log("false")
      log("null")
      log("undefined")

      expect(sinkStub.output.callCount).to.equal(4)
    })

    it("should handle symbols", () => {
      const sym = Symbol("test")

      log(sym)

      expect(logToConsoleStub.log.calledWith(sym)).to.be.true
    })

    it("should handle functions", () => {
      const fn = () => {}

      log(fn)

      expect(logToConsoleStub.log.calledWith(fn)).to.be.true
    })
  })

  describe("integration scenarios", () => {
    it("should correctly differentiate single string from multiple strings", () => {
      log("single")
      sinkStub.output.resetHistory()
      consoleStub.log.resetHistory()

      log("first", "second")

      expect(sinkStub.output.callCount).to.equal(4) // Not 2
    })

    it("should handle alternating single and multiple calls", () => {
      log("one")
      log("two", "three")
      log([1, 2])
      log({ a: 1 })

      expect(consoleStub.log.callCount).to.be.at.least(3)
    })
  })
})