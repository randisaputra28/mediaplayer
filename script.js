// Variable untuk menyimpan pemutar video YouTube
var player;

// Fungsi untuk menginisialisasi API YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE', // Ganti dengan ID video YouTube yang ingin Anda tampilkan
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
