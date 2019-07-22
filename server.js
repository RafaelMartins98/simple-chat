var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

var dbURL = 'mongodb+srv://user:user@learning-node-p2wta.mongodb.net/test?retryWrites=true&w=majority'

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


var Message = mongoose.model('Message', {
    name : String,
    message : String
})

app.get("/messages", (req, res) =>{
    Message.find({}, (err, messages)=>{
        res.send(messages)
    })
})

app.get("/messages/:user", (req, res) =>{
    var user = req.params.user
    Message.find({name: user}, (err, messages)=>{
        res.send(messages)
    })
})

app.post("/messages", async (req, res) =>{

    try {

        var message = new Message(req.body)

        var savedMessage = await message.save()

        console.log("Saved Message")

        var censored = await Message.findOne({message: 'badword'})

        if (censored) {
            await Message.deleteOne({_id: censored.id})
        } else {
            io.emit('message', req.body)
        }

        res.sendStatus(200)
    }catch (err) {
        res.sendStatus(500)
        console.log(err)
    }

})

io.on('connection', (socket) =>{
    console.log("A user has connected ")
})

mongoose.connect(dbURL, { useNewUrlParser: true }, (err)=>{
    console.log('MongoDB connection', (err != null)? err : '')
})

var server = http.listen(3000, () => {
    console.log("Server is listening on port ", server.address().port)
})