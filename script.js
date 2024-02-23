var player;
// This function initializes or updates the YouTube player with a new video ID
function loadVideoFromUrl() {
    var videoUrl = document.getElementById('videoUrlInput').value; // Get video URL from input field
    var videoId = extractVideoID(videoUrl); // Extract the video ID from the URL

    if (player && videoId) {
        player.loadVideoById(videoId); // If player exists and videoId is valid, load new video ID
    } else if (videoId) {
        // Initialize the YouTube player with the extracted video ID
        player = new YT.Player('youtube-player', {
            height: '390',
            width: '640',
            videoId: videoId, // Use the extracted video ID
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        alert('Invalid YouTube URL'); // Alert the user if the URL is invalid
    }
}


// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('youtube-player', {
//         height: '390',
//         width: '640',
//         videoId: '',
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         }
//     });
// }

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo(); // Auto-play the video when ready
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

// Function to extract video ID from YouTube URL using Regex
function extractVideoID(url) {
    var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        // Return null if the video ID is not found or URL is invalid
        return null;
    }
}