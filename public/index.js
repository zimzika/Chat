const socket = io('http://localhost:3000')
$("button").click(function () {
    return false;
})

var a = document.getElementById('msg')

var me = {}

function enviarMensagemForm() {
    $(".enviar button").click(function () {
        if ($(".mensagem").val().length > 0) {
            socket.emit('enviarMensagem', {
                "msg": $(".mensagem").val(),
                "username": me.username
            })
            receberMensagemMinhas({
                "msg": $(".mensagem").val()
            })
            $(".mensagem").val("")
            return false;
        }
    })
}

function entrar() {
    $(".btn").click(function () {
        if ($(".form input").val().length > 0) {
            me = { "username": $(".form input").val() }
            getMensagensAntigas()
            $(".mensagens").removeClass("not")
            $(".quem").addClass("not")
        }
    })
}

entrar()

function getMensagensAntigas() {
    socket.emit('mensagensAntigas', {})
}

enviarMensagemForm()

function receberMensagem(objeto) {
    $(".mensagens .before").before(`
    <li class="left">${objeto.username}:<br>${objeto.msg}</li> <br><br><br>
    `)
    a.scrollTop = a.scrollHeight
}

function receberMensagemMinhas(objeto) {
    $(".mensagens .before").before(`
    <li class="right"
    >Você:<br>${objeto.msg}</li><br><br><br>
    `)
    a.scrollTop = a.scrollHeight
}

socket.on('receberMensagem', function (objeto) {
    receberMensagem(objeto)
})
socket.on('antigasMensagens', function (msgs) {
    $(".mensagens").html(`<div class="before"></div>
    <div class="bottom">
        <form class="enviar">
            <input class="mensagem" type="text" placeholder="Mensagem" autofocus>
            <button class="envio">Enviar</button>
        </form>
    </div>`)

    for (let i = 0; i < msgs.length; i++) {
        $(".mensagens .before").before(`
        <li class="left">${msgs[i].username}:<br>${msgs[i].msg}</li> <br><br><br>
        `)
    }
    enviarMensagemForm()
})
