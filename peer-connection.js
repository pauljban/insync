// Event listener for listening whether connection with PeerServer 
// is establishied.
// peer.on('open', id => {
//     console.log(`My peer ID is: ${id}`);
// });
var peer = new Peer();

document.getElementById('btnHost').addEventListener('click', function () {

    peer.on('open', function (id) {
        document.getElementById('hostId').textContent = id;
        document.getElementById('hostSection').style.display = 'block';
        document.getElementById('joinSection').style.display = 'none';
    });

    // Setup connection handler
    peer.on('connection', function (conn) {
        conn.on('data', function (data) {
            console.log('Received:', data);
        });
        conn.on('open', function () {
            conn.send("Hello from the host!");
        });
    });

});

document.getElementById('btnJoin').addEventListener('click', function () {
    document.getElementById('hostSection').style.display = 'none';
    document.getElementById('joinSection').style.display = 'block';
});

document.getElementById('btnConnect').addEventListener('click', function () {
    var peerId = document.getElementById('peerIdInput').value;
    var conn = peer.connect(peerId);

    conn.on('open', function () {
        conn.send("Hello from the guest!");
    });

    conn.on('data', function (data) {
        console.log('Received:', data);
    });
});