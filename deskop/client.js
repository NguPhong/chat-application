let socket = io.connect('http://localhost:2401');

let btnSend = document.getElementById('btnSend');

socket.on('connect', function() {
    btnSend.onclick = function () {
        let Message = document.getElementById('MessageBox').value;
        let MyName = document.getElementById('TxtBoxName').value;
        if (Message != '' && MyName != '') {
            socket.emit('send-message-to-server', MyName + ' : ' + Message);
        }
        else {
            alert('Please enter your name and message');
        }
        document.getElementById('MessageBox').value = '';
    }
    document.getElementById('MessageBox').addEventListener('keydown', function(event) {
        if (event.key == 'Enter') {
            btnSend.click();
        }
    })

    socket.on('send-message-to-client', function(message){
        let Message = document.createElement('p');
        Message.innerHTML = message;
        document.getElementById('MessagesList').appendChild(Message);
    })
})