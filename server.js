const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
const porta = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

//Routes
app.use('/', (req, res) => {
    res.render('index.html')
})

let messages = []

io.on('connection', socket => {
    console.log(`Conectado com id ${socket.id}`)
    //Quando receber uma mensagem
    socket.on('enviarMensagem', data => {
        if (data.msg.length > 0 && data.username.length > 0) {
            messages.push(data)
            socket.broadcast.emit('receberMensagem', data)
        } else {
            return;
        }
    })
    socket.on('mensagensAntigas', data => {
        socket.emit('antigasMensagens', messages)
    })
})

server.listen(porta)