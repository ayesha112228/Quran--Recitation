var crsr= document.querySelector("#cursor")
var blur= document.querySelector("#cursor-blur")

document.addEventListener("mousemove",function(dets){


    crsr.style.left=dets.x+"px"
    crsr.style.top=dets.y+"px"
    blur.style.left=dets.x-200+"px"
    blur.style.top=dets.y-200+"px"

})


gsap.to("#nav",{
    backgroundColor:"#000",
    height:"110px",
    duration:0.5,
    scrollTrigger:{
        trigger:"#nav",
        scroller:"body",
        // markers:true,
        start:"top -10%",
        end:"top -11%",
        scrub:1
    }
})
gsap.to("#main",{
   backgroundColor:"#000",
  
    scrollTrigger:{
        trigger:"#main",
        scroller:"body",
        // markers:true
        start:"top -25%" ,
        end:"top -70%",
        scrub :1
    }
})
document.addEventListener("DOMContentLoaded", function() {
  const surahList = document.getElementById("surahList");
  const qariList = document.getElementById("qariList");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumeControl = document.getElementById("volume");
  const speedControl = document.getElementById("speed");
  const bookmarkBtn = document.getElementById("bookmarkBtn");
  let audioPlayer = new Audio();

  // Fetch surah list from API
  fetch("https://api.quran.com/api/v4/resources/recitations")
    .then(response => response.json())
    .then(data => {
      data.chapters.forEach(surah => {
        const option = document.createElement("option");
        option.value = surah.id;
        option.textContent = `${surah.name_simple} - ${surah.translated_name.name}`;
        surahList.appendChild(option);
      });
    });

  // Event listener for surah selection
  surahList.addEventListener("change", function() {
    const surahId = this.value;
    qariList.innerHTML = ""; // Clear qari list

    // Fetch qari list for selected surah from API
    fetch('https://api.quran.com/api/v4/chapter_recitations/<qari id>')
      .then(response => response.json())
      .then(data => {
        data.recitations.forEach(qari => {
          const option = document.createElement("option");
          option.value = qari.id;
          option.textContent = qari.name;
          qariList.appendChild(option);
        });
      });
  });

  // Event listener for play/pause button
  playPauseBtn.addEventListener("click", function() {
    if (audioPlayer.paused) {
      const qariId = qariList.value;
      const audioUrl = `https://api.quran.com/api/v4/chapter_recitations/<qari id>`; // Example audio URL
      audioPlayer.src = audioUrl;
      audioPlayer.play();
      playPauseBtn.textContent = "Pause";
    } else {
      audioPlayer.pause();
      playPauseBtn.textContent = "Play";
    }
  });

  // Event listener for volume control
  volumeControl.addEventListener("input", function() {
    audioPlayer.volume = this.value;
  });

  // Event listener for speed control
  speedControl.addEventListener("input", function() {
    audioPlayer.playbackRate = this.value;
  });

  // Bookmark feature
  bookmarkBtn.addEventListener("click", function() {
    // Add bookmark logic here
    alert("Bookmark added!");
  });
});
