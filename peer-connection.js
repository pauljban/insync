// Initialize PeerJS connection
var peer = new Peer();
var conn; // Connection object

// Setup UI event listeners
function setupUIEventListeners() {
    document.getElementById('btnHost').addEventListener('click', hostSetup);
    document.getElementById('btnJoin').addEventListener('click', joinSetup);
    document.getElementById('btnConnect').addEventListener('click', connectToHost);
}

function hideButtonContainer() {
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.opacity = 0;
    setTimeout(() => { buttonContainer.style.display = 'none' }, 500);


}

function showYoutubeContainer() {
    document.querySelector('#youtube-player').style.display = 'flex';
}

// Host setup
function hostSetup() {
    hideButtonContainer();
    showHostControls();
    showYoutubeContainer();
    if (peer.id) {
        displayHostId(peer.id);
    } else {
        // Only set up the event listener if the peer ID is not yet available.
        console.log('here');
        peer.on('open', displayHostId);
    }
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
    hideButtonContainer();
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

var calibrate = false;
// Handle received data
function handleDataReceived(data) {
    console.log('Received:', data);
    // Set the flag to false to indicate the action was initiated by a peer message
    actionInitiatedByUser = false;

    if (data.type === 'loadVideo' && data.videoUrl) {
        loadVideoFromUrl(data.videoUrl);
    } else if (data.type === 'controlVideo') {
        switch (data.action) {
            case 'pause':
                if (player.getPlayerState() != YT.PlayerState.PAUSED) {
                    player.pauseVideo();
                    player.seekTo(data.timestamp, true);
                }
                break;
            case 'play':
                //if (player.getPlayerState() != YT.PlayerState.PLAYING) {
                player.playVideo();
                if (Math.abs(player.getCurrentTime() - data.timestamp) > 0.02) {
                    player.seekTo(data.timestamp, true);
                    calibrate = true;
                } else {
                    calibrate = false;
                }

                //}

                break;
            case 'buffer':
                if (player.getPlayerState() != YT.PlayerState.BUFFERING) {
                    player.pauseVideo();
                }
                break;
        }
    }
}

// Initial setup
function init() {
    setupUIEventListeners();
}

// Call init to setup everything
init();