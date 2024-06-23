const API_KEY = 'YOUR_API_KEY';
let player;

// Fungsi ini dipanggil oleh API YouTube ketika API sudah siap
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '450',
        width: '800',
        videoId: '',
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    console.log('Player is ready.');
}

function searchVideos() {
    const query = document.getElementById('search').value;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const videos = document.getElementById('videos');
            videos.innerHTML = '';
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const thumbnail = item.snippet.thumbnails.high.url;
                const videoElement = document.createElement('div');
                videoElement.classList.add('video');
                videoElement.innerHTML = `
                    <img src="${thumbnail}" alt="${title}">
                    <h4>${title}</h4>
                `;
                videoElement.onclick = () => playVideo(videoId);
                videos.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
}

function playVideo(videoId) {
    player.loadVideoById(videoId);
}
