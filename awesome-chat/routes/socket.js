// 这里的io本身就是一个server构造函数。
// 可以通过 require('socket.io')()获得一个server实例
// 也可以通过attach/listen 绑定一个已存在的server到io上
//var io = require('socket.io');
exports.initialize = function(server) {
    // 这一步是必须的, 唯一的配置语句
    //io = io.listen(server);
    var io = require('socket.io')(server);
    // server创建后，会同时提供一个静态文件访问地址，
    // 默认是/socket.io, 供客户端页面访问
    io.sockets.on("connection", function(socket) {
        socket.send(JSON.stringify({
            type: 'serverMessage',
            message: 'Welcome to the most interesting chat room on earth!'
        }));
        socket.on('message', function(message) {
            message = JSON.parse(message);
            if (message.type == "userMessage") {
            // When we send the message using the broadcast object, it will be sent to 
            // all the clients that are connected, `except` to the one for which this socket was created
                socket.broadcast.send(JSON.stringify(message));
                message.type = "myMessage";
                socket.send(JSON.stringify(message));
            }
        });
    });
};
