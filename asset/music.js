let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let volumeIcon = document.querySelector('#volume_icon');
let cecentVolume = document.querySelector('#volume');
let volumeShow = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let showDuration = document.querySelector('#show-duration');
let trackImage = document.querySelector('#track_image');
let autoPlay = document.querySelector('#audio');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let currentTime = document.querySelector('#current_time');
let durationTime = document.querySelector('#duration_time');

let timer;
let autoplay = 0;

let indexNo = 0;
let playingSong = false;

// create a audio element
let track = document.createElement('audio');
console.log([track])
// all songs list
let allSong = [
	{
		name: 'first song',
		path: './files/src/music.mp3',
		img: './files/img/img1.jpg',
		singer: 'first singer'
	},
	{
		name: 'second song',
		path: './files/src/music1.mp3',
		img: './files/img/img2.jpg',
		singer: 'second singer'
	},
	{
		name: 'third song',
		path: './files/src/music2.mp3',
		img: './files/img/img3.jpg',
		singer: 'third singer'
	},
	{
		name: 'fourth song',
		path: './files/src/music3.mp3',
		img: './files/img/img4.jpg',
		singer: 'fourth singer'
	},
	{
		name: 'fifth song',
		path: './files/src/music4.mp3',
		img: './files/img/img5.jpg',
		singer: 'fifth singer'
	},
	{
		name: 'sixth song',
		path: './files/src/music5.mp3',
		img: './files/img/img6.jpg',
		singer: 'sixth singer'
	},
	{
		name: 'seventh song',
		path: './files/src/music6.mp3',
		img: './files/img/img7.jpg',
		singer: 'seventh singer'
	},
];

// all function

// function load the track
function load_track (indexNo) {
	clearInterval(timer);
	reset_slider();
	track.src = allSong[indexNo].path;
	title.innerHTML = allSong[indexNo].name;
	trackImage.src = allSong[indexNo].img;
	artist.innerHTML = allSong[indexNo].singer;
	track.load();

	total.innerHTML = allSong.length;
	present.innerHTML = indexNo + 1;
	timer = setInterval(range_slider, 10000);
}
load_track(indexNo);
// mute soud
function mute_sound () {
	soundSongIcon = volumeIcon.classList.contains('fa-volume-up');
	if (soundSongIcon) {
		volumeIcon.classList.remove('fa-volume-up');
		volumeIcon.classList.add('fa-volume-xmark');
		track.volume = 0;
		volume.value = 0;
		volumeShow.innerHTML = 0;
	} else {
		volumeIcon.classList.remove('fa-volume-xmark');
		volumeIcon.classList.add('fa-volume-up');
		track.volume = 1;
		volume.value = 90;
		volumeShow.innerHTML = 90;
	}
}

// resset song slider
function reset_slider () {
	slider.value = 0;
}

// checking the song is playing  or not
function just_play() {
	if (playingSong === false) {
		playsong();
	} else {
		pausesong();
	}
}

// play song
function playsong () {
	track.play();
	playingSong = true;
	play.innerHTML = '<i class= "fa fa-pause"></i>';
}

// pause song
function pausesong () {
	track.pause();
	playingSong = false;
	play.innerHTML = '<i class= "fa fa-play"></i>';
}

// next song
function next_song () {
	if (indexNo < allSong.length - 1) {
		indexNo += 1;
		load_track(indexNo);
		playsong();
	} else {
		indexNo = 0;
		load_track(indexNo);
		playsong();
	}
}

// previous song
function previous_song () {
	if (indexNo > 0) {
		indexNo -= 1;
		load_track(indexNo);
		playsong();
	} else {
		indexNo = allSong.length;
		load_track(indexNo);
		playsong();
	}
}

// change volume
function volume_change() {
	volumeShow.innerHTML = cecentVolume.value;
	track.volume = cecentVolume.value / 100;
}

// Song time
	track.ontimeupdate = function () {
		// current time song
		let minute = Math.floor(track.currentTime / 60);
		let second = Math.floor(track.currentTime % 60);
		if (minute < 10) {
			minute = `0${minute}`;
		}
		if (second < 10) {
			second = `0${second}`;
		}
		currentTime.innerText = `${minute}:${second}`;
		// duration song
		track.onloadeddata = function () {
			let totalMinute = Math.floor(track.duration / 60);
			let totalSecond = Math.floor(track.duration % 60);
			if(totalMinute < 10) {
				totalMinute = `0${totalMinute}`;
			}
			if(totalSecond < 10) {
				totalSecond = `0${totalSecond}`;
			}
			durationTime.innerHTML = `${totalMinute}:${totalSecond}`;
		}
	}

// change slider position
function change_duration () {
	let slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch () {
	if (autoplay == 1) {
		autoplay = 0;
		autoPlay.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		autoPlay.style.background = '#ff8a65';
	}
}

function range_slider () {
	let position = 0;
	// update slider position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;	
	}

	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play"></i>';
		if (autoplay == 1) {
			indexNo += 1;
			load_track(indexNo);
			playsong();
		}
	}

}