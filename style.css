// Fungsi untuk menginisialisasi API YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '', // ID video akan dimasukkan saat video dipilih
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
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

// Fungsi untuk mencari video di YouTube
function searchVideos() {
    // Ambil nilai input pencarian
    var query = document.getElementById('search').value.trim();

    // Lakukan request ke API YouTube untuk mencari video
    var request = gapi.client.youtube.search.list({
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: 10 // Jumlah maksimal video yang akan ditampilkan
    });

    // Lakukan eksekusi request
    request.execute(function(response) {
        console.log(response);
        var videos = response.result.items;

        // Tampilkan hasil pencarian dalam daftar
        var videosContainer = document.getElementById('videos');
        videosContainer.innerHTML = '';

        videos.forEach(function(video) {
            var videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.innerHTML = `
                <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                <div class="video-info">
                    <h2>${video.snippet.title}</h2>
                    <p>${video.snippet.description}</p>
                    <button onclick="playVideo('${video.id.videoId}')">Play</button>
                </div>
            `;
            videosContainer.appendChild(videoItem);
        });
    });
}

// Fungsi untuk memutar video yang dipilih
function playVideo(videoId) {
    player.loadVideoById(videoId);
}
