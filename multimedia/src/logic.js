var images = ['img/1.jpg', "img/2.jpg", "img/3.jpg", "img/5.jpg", "img/4.jpg"];
var groups = ['INSTASAMKA', 'Михаил Круг', 'Scoop Dogg, The Doors', 'Yolanda Be Cool, DCUP', 'Chuck Berry'];
var songs = ['ЗА ДЕНЬГИ ДА', 'Фраер', 'Riders On The Storm', 'We No Speak Americano', 'You Never Can Tell']
var audios=['music/Instasamka.mp3','music/Mikhail_Krug.mp3','music/Riders_on_the_storm.mp3','music/We_No_Speak_Americano.mp3','music/You_Never_Can_Tell.mp3',]
var currentIndex = 0;
var currentImg = document.getElementById('img');
var nextBtn = document.getElementById('next-btn');
var prvButton = document.getElementById('prev-btn');
var group = document.getElementById("group");
var song = document.getElementById("song");
var audio = document.getElementById('audio');
var play = document.getElementById('play');
var audioContext = new (window.AudioContext)();
var analyser = audioContext.createAnalyser();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);
var canvas1 = document.getElementById('canvas');
var canvasCtx = canvas1.getContext('2d');
var source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

document.addEventListener('mousedown', function() {
    audioContext.resume();
});

function loop(){
    window.requestAnimationFrame(loop);
    array = frequencyData;
    analyser.getByteFrequencyData(array);
    var minHeight = array[40] / 2;
    var minHeight2 = array[100] / 2;
    var minHeight3 = array[1] / 2;
    var minHeight4 = array[22] / 2;
    var minHeight5 = array[70] / 2;
    var minHeight6 = array[50] / 2;


    canvasCtx.clearRect(50, 0, 40, canvas1.height);
    canvasCtx.fillStyle = '#fdbaab';
    canvasCtx.fillRect(50, canvas1.height - minHeight3, 40, minHeight3);

    canvasCtx.clearRect(0, 0, 50, canvas1.height);
    canvasCtx.fillStyle = '#3c385a';
    canvasCtx.fillRect(0, canvas1.height - minHeight2, 40, minHeight2);

    canvasCtx.clearRect(100, 0, 40, canvas1.height);
    canvasCtx.fillStyle = '#5d5272';
    canvasCtx.fillRect(100, canvas1.height - minHeight, 40, minHeight);

    canvasCtx.clearRect(150, 0, 40, canvas1.height);
    canvasCtx.fillStyle = '#f3b2a9';
    canvasCtx.fillRect(150, canvas1.height - minHeight4, 40, minHeight4);

    canvasCtx.clearRect(200, 0, 40, canvas1.height);
    canvasCtx.fillStyle = '#b68293';
    canvasCtx.fillRect(200, canvas1.height - minHeight5, 40, minHeight5);

    canvasCtx.clearRect(250, 0, 40, canvas1.height);
    canvasCtx.fillStyle = '#6b5a79';
    canvasCtx.fillRect(250, canvas1.height - minHeight6, 40, minHeight6);

}

loop();

function showNextImage() {
    let isPlaying = !audio.paused;
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    currentImg.src = images[currentIndex];
    group.innerHTML = groups[currentIndex];
    song.innerHTML = songs[currentIndex];
    audio.src = audios[currentIndex];
    continueAudio(isPlaying);
}

function showPrevImage() {
    let isPlaying = !audio.paused;
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length-1;
    }
    currentImg.src = images[currentIndex];
    group.innerHTML = groups[currentIndex];
    song.innerHTML = songs[currentIndex];
    audio.src = audios[currentIndex];
    continueAudio(isPlaying);
}

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        play.innerHTML = '∎';
    } else {
        audio.pause();
        play.innerHTML = "►";
    }
}

function continueAudio(isPlaying){
    if (isPlaying){
        audio.play();
        play.innerHTML = '∎';
    }else {
        audio.pause();
        play.innerHTML = "►";
    }
}

nextBtn.addEventListener('click', showNextImage);
prvButton.addEventListener('click', showPrevImage);

// обновление визуализации в зависимости от выбранной песни
audio.addEventListener('play', function() {
    loop();
});



audio.addEventListener('ended', function() {
    showNextImage();
});
