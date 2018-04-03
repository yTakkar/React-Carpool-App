/* eslint no-undef:0 */
const { whatExists, getByName } = require('./user-model.js')
const data = require('./users-data')

describe('User modal test', () => {
  it('whatExists(name, takkar shaikh) should equal below object', () => {
    let expected = data[0]
    expect(whatExists('name', 'takkar shaikh')).toEqual(expected)
  })

  it('whatExists(mobile, 7718930233) should equal below object', () => {
    let expected = data[0]
    expect(whatExists('mobile', '7718930233')).toEqual(expected)
  })

  it('whatExists(name, 7718930233) should equal below object', () => {
    expect(whatExists('name', '7718930233')).toEqual(false)
  })

  it('whatExists(name, takkar takkar) should return false', () => {
    expect(whatExists('name', 'takkar takkar')).toEqual(false)
  })

  it('getByName(email, takkar shaikh) should return takkar@gmail.com', () => {
    expect(getByName('email', 'takkar shaikh')).toEqual('takkar@gmail.com')
  })
})
