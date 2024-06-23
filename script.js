// Kunci API YouTube Data v3 (ganti dengan kunci API Anda)
const API_KEY = 'YOUR_YOUTUBE_API_KEY';

// Fungsi untuk melakukan pencarian video YouTube
function searchVideos() {
    // Ambil nilai dari input pencarian
    const query = document.getElementById('search').value;
    
    // Panggil fungsi dari YouTube Data API
    gapi.client.youtube.search.list({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10 // Ubah sesuai kebutuhan
    }).then(response => {
        console.log(response);
        displayVideos(response.result.items);
    }).catch(err => console.log('Error fetching videos: ', err));
}

// Fungsi untuk menampilkan hasil pencarian video
function displayVideos(videos) {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = '';

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.medium.url;

        // Tambahkan video ke dalam container
        const videoElement = `
            <div class="video">
                <img src="${videoThumbnail}" alt="${videoTitle}" onclick="playVideo('${videoId}')">
                <h3>${videoTitle}</h3>
            </div>
        `;
        videoContainer.innerHTML += videoElement;
    });
}

// Fungsi untuk memutar video di pemutar YouTube
function playVideo(videoId) {
    if (player) {
        player.loadVideoById(videoId);
    } else {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

// Fungsi ketika pemutar video siap
function onPlayerReady(event) {
    console.log('Player ready');
}

// Fungsi ketika status pemutar video berubah
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log('Video sedang diputar');
    } else if (event.data == YT.PlayerState.PAUSED) {
        console.log('Video dijeda');
    } else if (event.data == YT.PlayerState.ENDED) {
        console.log('Video selesai');
    }
}

// Inisialisasi Google API client untuk YouTube Data API v3
function initClient() {
    gapi.client.init({
        'apiKey': API_KEY,
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    }).then(() => {
        console.log('YouTube API client initialized');
    }).catch(err => console.error('Error initializing API client: ', err));
}

// Memanggil inisialisasi client ketika API YouTube Data siap
gapi.load('client', initClient);
