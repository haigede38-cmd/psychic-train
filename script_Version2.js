// Target date: 31 December 2025 00:00:00 local time
const target = new Date('2025-12-31T00:00:00');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const celebrateBtn = document.getElementById('celebrateBtn');
const confettiCanvas = document.getElementById('confettiCanvas');

const audio = document.getElementById('bgAudio');
const audioBtn = document.getElementById('audioBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volume');

let confettiActive = false;

// Initialize audio defaults
audio.volume = parseFloat(volumeSlider.value) || 0.7;
audio.preload = 'metadata';

// Update audio UI
function setAudioPlayingUI(isPlaying) {
  audioBtn.textContent = isPlaying ? 'Jeda Musik' : 'Putar Musik';
  audioBtn.setAttribute('aria-pressed', String(isPlaying));
}
function setMutedUI(isMuted) {
  muteBtn.textContent = isMuted ? '🔇' : '🔈';
}

// Toggle audio playback (call on user gesture)
async function toggleAudio() {
  try {
    if (audio.paused) {
      await audio.play();
      setAudioPlayingUI(true);
    } else {
      audio.pause();
      setAudioPlayingUI(false);
    }
  } catch (err) {
    // play failed (browser autoplay policies), keep UI consistent
    console.warn('Audio play failed:', err);
  }
}

// Mute / unmute
function toggleMute() {
  audio.muted = !audio.muted;
  setMutedUI(audio.muted);
  muteBtn.setAttribute('aria-pressed', String(audio.muted));
}

// Volume control
volumeSlider.addEventListener('input', (e) => {
  audio.volume = parseFloat(e.target.value);
  if (audio.volume === 0) {
    audio.muted = true;
    setMutedUI(true);
  } else {
    if (audio.muted) {
      audio.muted = false;
      setMutedUI(false);
    }
  }
});

// Wire buttons
audioBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleAudio();
});
muteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleMute();
});

// Countdown update
function updateCountdown(){
  const now = new Date();
  let diff = Math.max(0, target - now);

  const sec = Math.floor(diff / 1000) % 60;
  const min = Math.floor(diff / (1000*60)) % 60;
  const hr = Math.floor(diff / (1000*60*60)) % 24;
  const day = Math.floor(diff / (1000*60*60*24));

  daysEl.querySelector('.num').textContent = String(day).padStart(2,'0');
  hoursEl.querySelector('.num').textContent = String(hr).padStart(2,'0');
  minutesEl.querySelector('.num').textContent = String(min).padStart(2,'0');
  secondsEl.querySelector('.num').textContent = String(sec).padStart(2,'0');

  if(diff <= 0){
    onCelebrate();
    clearInterval(intervalId);
  }
}

const intervalId = setInterval(updateCountdown, 250);
updateCountdown();

// Simple confetti (lightweight) ------------------------------------------------
function createConfetti() {
  if(confettiActive) return;
  confettiActive = true;

  const ctx = confettiCanvas.getContext('2d');
  const w = confettiCanvas.width = innerWidth;
  const h = confettiCanvas.height = innerHeight;

  const pieces = [];
  const colors = ['#D9B84A','#F4E1B1','#FFD9A6','#FFFFFF','#F6D365'];

  for(let i=0;i<120;i++){
    pieces.push({
      x: Math.random()*w,
      y: Math.random()*h - h,
      r: Math.random()*8 + 4,
      d: Math.random()*50 + 5,
      color: colors[Math.floor(Math.random()*colors.length)],
      tilt: Math.floor(Math.random()*20)-10,
      tiltSpeed: Math.random()*0.1+0.05
    });
  }

  let t = 0;
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of pieces){
      p.y += Math.cos(t + p.d) + 3 + p.r/2;
      p.x += Math.sin(t);
      p.tilt += p.tiltSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tilt * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*0.6);
      ctx.restore();

      if(p.y > h + 50){
        p.y = -10;
        p.x = Math.random()*w;
      }
    }
    t += 0.02;
    if(confettiActive) requestAnimationFrame(draw);
  }
  draw();

  // stop after a while
  setTimeout(()=> {
    confettiActive = false;
    ctx.clearRect(0,0,w,h);
  }, 10000);
}

// Celebrate handler
function onCelebrate(){
  // Change headline and show confetti
  document.querySelector('.headline').textContent = 'Selamat Tahun Baru!';
  document.querySelector('.subhead').textContent = '31 Desember 2025 — Dengan Cinta, deajusss';
  createConfetti();

  // Try to play audio (must be triggered by user gesture ideally)
  audio.play().then(()=> {
    setAudioPlayingUI(true);
  }).catch((err)=> {
    // autoplay without gesture blocked — keep silence until user interacts
    console.warn('Audio play blocked until user interacts:', err);
  });
}

// Button to trigger confetti anytime
celebrateBtn.addEventListener('click', ()=> {
  onCelebrate();
});

// Resize canvas on window resize
window.addEventListener('resize', ()=> {
  if(confettiCanvas.width !== innerWidth || confettiCanvas.height !== innerHeight){
    confettiCanvas.width = innerWidth;
    confettiCanvas.height = innerHeight;
  }
});

// On page load set UI according to state
document.addEventListener('DOMContentLoaded', ()=> {
  setAudioPlayingUI(!audio.paused && !audio.ended);
  setMutedUI(audio.muted);
});