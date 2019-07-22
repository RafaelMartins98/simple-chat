var request = require('request')

describe('calc', ()=>{
    it('should multiply 2 and 2', () =>{
        expect(2*2).toBe(4)
    })
})


describe('get messages', () =>{
    it('should return 200 OK', (done) =>{
        request.get('http://localhost:3000/messages', (err, res)=>{
            console.log(res.body)
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('should return a list, thats not empty', (done) =>{
        request.get('http://localhost:3000/messages', (err, res)=>{
            console.log(res.body)
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe('get messages from user', () => {
    it('should return 200 OK', (done) =>{
        request.get('http://localhost:3000/messages/Example', (err, res)=>{
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('the name should be Rafael', (done) =>{
        request.get('http://localhost:3000/messages/Example2', (err, res)=>{
            expect(JSON.parse(res.body)[0].name).toEqual('Example2')
            done()
        })
    })
})
