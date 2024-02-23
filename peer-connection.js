// Initialize PeerJS connection
var peer = new Peer();
var conn; // Connection object

// Setup UI event listeners
function setupUIEventListeners() {
    document.getElementById('btnHost').addEventListener('click', hostSetup);
    document.getElementById('btnJoin').addEventListener('click', joinSetup);
    document.getElementById('btnConnect').addEventListener('click', connectToHost);
}

// Host setup
function hostSetup() {
    showHostControls();
    peer.on('open', displayHostId);
    peer.on('connection', setupConnection);
}

// Show host controls and sections
function showHostControls() {
    document.querySelector('#hostControls').style.display = 'block';
    document.getElementById('hostSection').style.display = 'block';
    document.getElementById('joinSection').style.display = 'none';
}

// Display host ID
function displayHostId(id) {
    document.getElementById('hostId').textContent = id;
}

// Join setup
function joinSetup() {
    document.getElementById('hostSection').style.display = 'none';
    document.getElementById('joinSection').style.display = 'block';
}

// Establish connection to the host
function connectToHost() {
    var peerId = document.getElementById('peerIdInput').value;
    conn = peer.connect(peerId);
    setupConnection(conn);
}

// Setup connection handlers
function setupConnection(connection) {
    conn = connection;
    conn.on('open', () => conn.send("Hello!"));
    conn.on('data', handleDataReceived);
}

// Handle received data
function handleDataReceived(data) {
    console.log('Received:', data);
    if (data.type === 'loadVideo' && data.videoUrl) {
        loadVideoFromUrl(data.videoUrl);
    }
}

// Initial setup
function init() {
    setupUIEventListeners();
}

// Call init to setup everything
init();
