// A Socket instance is returned for the namespace specified by the
// pathname in the URL, defaulting to /. For example, if the url is
// http://localhost/users, a transport connection will be established to
// http://localhost and a Socket.IO connection will be established to
// /users.
var socket = io.connect('/'),
    $messages = $('#messages');
socket.on('message', function(data) {
    data = JSON.parse(data);
    $messages.append('<div class="' + data.type + '">' + data.message +
        '</div>');
});
socket.on('connect_failed', function () {
    $messages.append('<div class="connect_failed">连接失败……</div>')
})
socket.on('error', function () {
    $messages.append('<div class="connect_failed">未知错误……</div>')
})
$(function() {
    $('#send').click(function() {
        var data = {
            message: $('#message').val(),
            type: 'userMessage'
        };
        socket.send(JSON.stringify(data));
        $('#message').val('');
    });
});
