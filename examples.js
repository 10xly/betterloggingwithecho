const log = require('./index')

console.log('=== betterloggingwithecho Examples ===\n')

// Example 1: Logging a single string
console.log('Example 1: Single string')
log('Hello, World!')
console.log()

// Example 2: Logging multiple strings
console.log('Example 2: Multiple strings')
log('The', 'quick', 'brown', 'fox')
console.log()

// Example 3: Logging an array
console.log('Example 3: Array')
log([1, 2, 3, 4, 5])
console.log()

// Example 4: Logging an object
console.log('Example 4: Object')
log({ name: 'John', age: 30, city: 'New York' })
console.log()

// Example 5: Logging a number
console.log('Example 5: Number')
log(42)
console.log()

// Example 6: Logging a boolean
console.log('Example 6: Boolean')
log(true)
console.log()

// Example 7: Logging null
console.log('Example 7: Null')
log(null)
console.log()

// Example 8: Logging undefined
console.log('Example 8: Undefined')
log(undefined)
console.log()

// Example 9: Mixed types (string + number)
console.log('Example 9: Mixed types (string + number)')
log('The answer is', 42)
console.log()

// Example 10: Mixed types (string + object)
console.log('Example 10: Mixed types (string + object)')
log('User data:', { id: 123, name: 'Alice' })
console.log()

// Example 11: Mixed types (string + array)
console.log('Example 11: Mixed types (string + array)')
log('Numbers:', [10, 20, 30], 'and more')
console.log()

// Example 12: Nested structures
console.log('Example 12: Nested structures')
log({
  user: 'Bob',
  scores: [95, 87, 92],
  metadata: {
    joined: '2024-01-01',
    active: true
  }
})
console.log()

// Example 13: Empty string
console.log('Example 13: Empty string')
log('')
console.log()

// Example 14: Multiple objects
console.log('Example 14: Multiple objects')
log({ a: 1 }, { b: 2 }, { c: 3 })
console.log()

// Example 15: Function
console.log('Example 15: Function')
log(function myFunction() { return 'test' })
console.log()

// Example 16: Error logging
console.log('Example 16: Error object')
const error = new Error('Something went wrong')
log(error)
console.log()

// Example 17: Date object
console.log('Example 17: Date object')
log(new Date())
console.log()

// Example 18: Long string
console.log('Example 18: Long string')
log('This is a very long string that demonstrates how the logger handles extended text content without any issues')
console.log()

// Example 19: Multiple strings with special characters
console.log('Example 19: Special characters')
log('Hello\nWorld', 'Tab\there', 'Quote: "test"')
console.log()

// Example 20: Real-world usage scenario
console.log('Example 20: Real-world scenario - API response logging')
const apiResponse = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  },
  timestamp: new Date().toISOString()
}
log('API Response:', apiResponse)
console.log()

console.log('=== Examples Complete ===')