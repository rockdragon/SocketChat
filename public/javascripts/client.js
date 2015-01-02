$(function(){
    // generate socket connection
    var socketClient = function () {
        var socket = io.connect('/', {
            reconnection: false
        });
        return socket;
    };

    var socket = socketClient();
    socket.on('connect', function () {
        console.log('connection established.');
    });
    socket.on('disconnect', function () {
        console.log('disconnected.');
    });

    // message handler
    socket.on('private', function(msg){

    });

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
            $('#messageBoard').append(msg + '\n');
            var selected = getSelectedItem();
            console.log(selected.text, selected.value);
        }
    });
});


