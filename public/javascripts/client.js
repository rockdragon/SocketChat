$(function(){
    // generate socket connection
    var socketClient = function () {
        return io.connect('/', {
            reconnection: false
        });
    };

    var socket = socketClient();
    socket.on('connect', function () {
        console.log('connection established.');
    });
    socket.on('disconnect', function () {
        console.log('disconnected.');
    });

    // message handler
    socket.on('private', function(data){
        $('#messageBoard').append('[私聊] 来自 [' + data.name + ']: ' + data.msg + '\n');
    });
    function sendPrivate(session_id, msg){
        socket.emit('private', {to_session_id: session_id, msg: msg});
    }
    socket.on('broadcast', function(data){
        $('#messageBoard').append('[广播] 来自 [' + data.name + ']: ' + data.msg + '\n');
    });
    function sendBroadcast(msg){
        socket.emit('broadcast', {msg: msg});
    }

    //UI event
    function getSelectedItem(){
        var selected = $('#target').find('option:selected');
        return { text: selected.text(), value: selected.val() };
    }
    $('#clear').click(function(){
        $('#messageBoard').text('');
    });
    $('#send').click(function(){
        var message = $('#message');
        var msg = message.val();
        if(msg) {
            message.val('');
            var selected = getSelectedItem();
            if(selected.value === 'broadcast'){
                $('#messageBoard').append('[我] 对所有人说: ' + msg + '\n');
                sendBroadcast(msg);
            } else {
                $('#messageBoard').append('[我] 对 [' + selected.text + '] 说: ' + msg + '\n');
                sendPrivate(selected.value, msg);
            }
        }
    });

    //定时获取其他人列表
    function updateOthers(){
        $.post('/chat/others', function(others){
            for(var i=0, len=others.length; i < len; i++){
                var one = others[i];
                var optGroup =  $('#optGroup');
                var opt = optGroup.find('option[value="' + one.session_id + '"]');
                console.log(opt);
                if(opt.length === 0){
                    optGroup.append('<option value="' + others[i].session_id + '">'
                        + others[i].name + '</option>');
                }
            }
            setTimeout(updateOthers, 1000);
        });
    }
    setTimeout(updateOthers, 1000);
});


