var audio = document.getElementById('audio');
var progressBar = document.getElementById('progress-bar');
var progress = document.getElementById('progress');


audio.addEventListener('timeupdate', function() {
    var percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
});

function changeCurrentTime(event) {
    var percent = event.offsetX / progressBar.offsetWidth;
    audio.currentTime = percent * audio.duration;
}


