const { fetchTasks } = require('../scripts/list')

const unmockedFetch = global.fetch

const mockResponse = [{"_id": "6359288586fd962e6ee74c2f", "title": "Paint the wall", "description": "Please paint the walls in white color", "checked": true, "__v": 0}]

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('fetchTasks()', () => {
  it('should succeed, response is array type and is equal to mockResponse value', async () => {
    const response = await fetchTasks()
    expect(Array.isArray(response)).toEqual(true)
    expect(response).toEqual(mockResponse)
  })
})
