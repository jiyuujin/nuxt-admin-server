const http = require('../../../../functions/src/sample')

describe('Auth', () => {
    it('Successful Response', () => {
        const req = {}
        const res = {
            send: (payload) => {
                expect(payload).toBe('Hello from Firebase!')
            }
        }

        http.helloWorld(req, res)
    })
})
