const app = () => {  // grabbing all the values from hmtl file as point of refernce. many items have  values already preset in the html file
    const song = document.querySelector('.player-container audio');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    // Duration to benchmark animation
    let fakeDuration = 600;                     // set to 10mins automatically

    outline.style.strokeDasharray = outlineLength; // clever way to animate. with the 2 images overtop each other we can seperate and use css styling to create an animation effect
    outline.style.strokeDashoffset = outlineLength; // this is the overlay that will count down the progress bar

    //Pick different sounds
    sounds.forEach(sound => {               // setting the soundscape when you select.
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Play sounds
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select time interval
    timeSelect.forEach(option => {
        option.addEventListener('click', function (){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${"0"+Math.floor(fakeDuration % 60)}`; // added the '0' from comments on the tutorial vid
        });
    });


    // Create a function to stop & play the sounds
    const checkPlaying = (song) => {
        if (song.paused) {              // confusing bc the visual svg img & the mp3/4 player are acting in opposites. Its where it starts out from that triggers the if/else
            song.play();                // i.e mp3 starts off paused, hence on click play and make changes to DOM
            video.play();
            play.src = './svg/pause.svg';
        }else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //We can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;         // a built in fn to get time of media
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

    // Animate the circle progress bar
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    //outlineLength.style.strokeDashoffset = progress;

    // Animate the timeDisplay
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {      // to make the time reset to normal after it finishes
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    }
    };

}; // run all code

app();
