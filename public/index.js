const socket = io('http://rolas-boas.herokuapp.com')
$("button").click(function () {
    return false;
})

var a = document.getElementById('msg')

var mensagens = []

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
        }
    })
}

function entrar() {
    $(".form button").click(function () {
        if ($(".form input").val().length > 0) {
            me = { "username": $(".form input").val() }
            $(".mensagens").removeClass("not")
            $(".quem").addClass("not")
        }
    })
}

enviarMensagemForm()
entrar()

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
