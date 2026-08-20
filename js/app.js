'use strict';

const CONFIG = {
  title:       'Mostafa & Basmala',
  date:        '4 / 6 / 2026',
  salutation:  'حبيبي Mostafa ❤',
  letter_body: `4/6/2026❤️\n\nاكتر يوم حسيت فيه أن فعلا مفيش خوف من اي حاجه تاني مفيش قلق ومن بعد اليوم وال الشهر دا كل حاجه بقت احسن ف حياتي ي مصطفي بجد\n\nمن يوم محبتك وانت بقيت اغلي حاجه عندي ومليش سند في الدنيا دي غيرك صحبي واخويا قبل متكون حبيبي وحته مني انت اصلا كل حاجه ليا ببقي ماسكه فيك وعايزه اقولك متسبنيش\n\nومتبعدش عني علشان انا بستقوي بيك بجد انا بحبك اوي انا شوفت كل دقيقه حلوه وانا معاك ببقي مبسوطه وانا جمبك ببقي معاك عامله شبه الطفله مش عاوزه حاجه غير اني ابقا معاك بجدد انت احلي واجمل حاجه ربنا كرمني بيها انت عوض ربنا ليا عن كل حاجه وحشه حصلتلي يارب تفضل منور حياتي ودنيتي لاخر العمر عشان انا مش عايزه حاجه من الدنيا دي غيرك بفضل اقول يارب مشوفش فيك حاجه وحشه ابدا عشان مش هستحمل حاجه مصطفي انت بقيت الحاجه الحلوه الي ف حياتي بجد مبقتش عارفه اعدي يومي من غيرك\n\nانت الوحيد الي فهمتني وعرفت تكسب قلبي هفضل احافظ علي مكانتي الكبيره ف قلبك وهفضل قد ثقتك فيا زي م أنا واثقه من مكانتي ف قلبك وهفضل معاك لحد آخر يوم ف حياتنا وهفضل اشكر ربنا عليك ي مصطفي طول حياتي أنا بيك وبوجودك عرفت ان فعلا ربنا بيحبني\n\nأنا الوحيده الي مصدقه انك قد اي حاجه وكل حاجه وعارفه أن ف يوم من الأيام هتبص لعيلنا ونقول هي دي العيال الي كنا بنحلم نربيها من قبل كد\n\nعارفه أننا هنوصل للي احنا عايزنو أن شاء الله ونثبت للعالم كلو ان طول م احنا مع بعض وفي ضهر بعض نقدر نعمل كل حاجه\n\nأنا محبتش قدك ولا هحب قدك البدايه ع أيدك وانهايتها بين ايديك انت مبقتش اتمني حاجه من ربنا غير اني أشوفك دايما جمبي واقف ع رجلك ونحقق كل حاجه سوا ي حبيب بسمله بحبك ي مصطفي مع أن الحقيقه ان الكلمه دي قليله عليك لأن الي جوايا اكبر من كدا بكتير ومن اي كلام ممكن يتقال محدش عارف ولا وصلو أنا بحبك قد اي محدش يعرف ان انت الوحيد الي عرفتني معني الحب وحببتني فيه من او وجديد ي مصطفي انت الوحيد الي مش بجري ولا بقيت اعرف اجري واحكي كل حاجه وانا مش خايفه من حاجه ازاي ربنا يخليك ليا ي حبيبي وميحرمنيش من وجودك ف حياتي وتفضل سند وضهر وسري طول العمر ❤️🏠🫂`,
  from:        'Basmala ❤',
};

/* ==================== LETTER HELPERS ==================== */
const TW_CHAR_DELAY = 20;
const TW_PARA_PAUSE = 400;
function delay(ms){ return new Promise(r => setTimeout(r, ms)); }

const RTL_CHAR_RE = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
function isRTLText(t){ return RTL_CHAR_RE.test(t || ''); }
function applyDir(el, t){ if(el) el.setAttribute('dir', isRTLText(t) ? 'rtl' : 'ltr'); }
function segmentText(t){
  if(typeof Intl !== 'undefined' && Intl.Segmenter){
    try{ return Array.from(new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(t), s=>s.segment); }catch(e){}
  }
  return Array.from(t);
}

async function typewriteSimple(elId, text, speed){
  const el = document.getElementById(elId);
  if(!el || !text) return;
  applyDir(el, text); el.textContent = '';
  for(const u of segmentText(text)){ el.textContent += u; await delay(speed); }
}

async function typewriteLetter(cfg){
  if(cfg.title)      { await typewriteSimple('letter-title', cfg.title, 80);      await delay(600); }
  if(cfg.date)       { await typewriteSimple('letter-date',  cfg.date,  50);      await delay(300); }
  if(cfg.salutation) { await typewriteSimple('letter-to',    cfg.salutation, 80); await delay(800); }
  const bodyEl = document.getElementById('letter-body');
  if(bodyEl){
    const raw = (cfg.letter_body || '').trim();
    applyDir(bodyEl, raw);
    const paragraphs = raw.split(/\n{2,}/).map(p=>p.trim()).filter(Boolean);
    for(let pi=0;pi<paragraphs.length;pi++){
      const p = document.createElement('p');
      p.dir = isRTLText(paragraphs[pi]) ? 'rtl' : 'ltr';
      p.style.opacity = '0'; bodyEl.appendChild(p);
      const textNode = document.createTextNode(''); p.appendChild(textNode);
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor'; cursor.setAttribute('aria-hidden','true'); p.appendChild(cursor);
      await delay(150);
      p.style.transition = 'opacity 0.4s'; p.style.opacity = '1';
      for(const u of segmentText(paragraphs[pi])){
        textNode.nodeValue += u;
        if((window.innerHeight+window.scrollY)>=(document.body.offsetHeight-120)) cursor.scrollIntoView({block:'nearest',behavior:'auto'});
        const isPunct = '.،!?؟،,'.includes(u);
        await delay(isPunct ? TW_CHAR_DELAY*4 : TW_CHAR_DELAY+(Math.random()*12-6));
      }
      if(cursor.parentNode) cursor.parentNode.removeChild(cursor);
      await delay(TW_PARA_PAUSE);
    }
  }
  if(cfg.from){ await delay(800); await typewriteSimple('letter-from', cfg.from, 110); }
}

/* ==================== FLOWER TRANSITION ==================== */
const FLOWER_IMAGES = [
  'https://res.cloudinary.com/dvc3zpg1i/image/upload/v1781738892/clients/hbffiw11f2ac7pthaqeu.png',
  'https://res.cloudinary.com/dvc3zpg1i/image/upload/v1781739025/clients/fwc3wzy1382zobhdmnbm.png'
];

function playFlowerTransition(){
  return new Promise(resolve => {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;overflow:hidden';
    document.body.appendChild(container);
    const slotSize=65, cols=Math.ceil(window.innerWidth/slotSize)+2, rows=Math.ceil(window.innerHeight/slotSize)+2;
    const cx=window.innerWidth/2, cy=window.innerHeight/2, maxDist=Math.sqrt(cx*cx+cy*cy);
    const flowers=[];
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
      const x=(c-.5)*slotSize+(Math.random()-.5)*slotSize*.7, y=(r-.5)*slotSize+(Math.random()-.5)*slotSize*.7;
      const dist=Math.sqrt(Math.pow(x-cx,2)+Math.pow(y-cy,2));
      flowers.push({x,y,delay:(dist/maxDist)*1100+Math.random()*180,rippleDelay:(dist/maxDist)*1100});
    }
    let bloomed=0; const total=flowers.length;
    flowers.forEach((f,i)=>{
      const el=document.createElement('div'); f.el=el;
      const src=FLOWER_IMAGES[i%FLOWER_IMAGES.length], size=55+Math.random()*75, rotation=Math.random()*360;
      f.finalRotation=rotation+(Math.random()>.5?1:-1)*(180+Math.random()*180);
      f.finalScale=1.0+Math.random()*1.6;
      el.style.cssText='position:absolute;left:'+f.x+'px;top:'+f.y+'px;width:'+size+'px;height:'+size+'px;transform:translate(-50%,-50%) rotate('+rotation+'deg) scale(0);opacity:0;will-change:transform,opacity;transition:transform 1.2s cubic-bezier(0.25,1,0.5,1),opacity 0.7s ease-in-out;';
      el.innerHTML='<img src="'+src+'" style="width:100%;height:100%;object-fit:contain;display:block;" alt="">';
      container.appendChild(el);
      setTimeout(function(){
        el.style.opacity='1';
        el.style.transform='translate(-50%,-50%) rotate('+f.finalRotation+'deg) scale('+f.finalScale+')';
        if(++bloomed===total){
          resolve();
          setTimeout(function(){
            let maxFall=0;
            flowers.forEach(function(flower){
              const fd=flower.rippleDelay+Math.random()*80; if(fd>maxFall) maxFall=fd;
              setTimeout(function(){
                const dur=1.8+Math.random()*.8;
                flower.el.style.transition='transform '+dur+'s ease-in,opacity '+(dur-.4)+'s ease-in-out';
                flower.el.style.opacity='0';
                flower.el.style.transform='translate(-50%,calc(-50% + '+(90+Math.random()*130)+'px)) rotate('+(flower.finalRotation+(Math.random()>.5?1:-1)*(18+Math.random()*28))+'deg) scale('+flower.finalScale+')';
              },fd);
            });
            setTimeout(function(){container.remove();}, maxFall+1100);
          },550);
        }
      },f.delay);
    });
  });
}

/* ==================== PAGE NAVIGATION ==================== */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0});
}

function goToJourney(){
  showPage('page-journey');
  startFloats();
}

function goToMessage(){
  showPage('page-message');
  var msgs=document.querySelectorAll('#page-message .message');
  msgs.forEach(function(m,i){
    m.style.opacity='0';
    m.style.transform='translateY(30px)';
    void m.offsetWidth;
    m.style.transition='opacity 0.7s ease '+i*0.35+'s, transform 0.7s ease '+i*0.35+'s';
    m.style.opacity='1';
    m.style.transform='translateY(0)';
  });
}

function backToMemories(){
  showPage('page-journey');
}

/* ==================== FLOATING HEARTS ==================== */
const heartIcons = ['💖','💗','💕','💞','💓'];
let floatInterval = null;
function startFloats(){
  if(floatInterval) return;
  floatInterval = setInterval(()=>{
    for(let i=0;i<2;i++){
      const el=document.createElement('div');
      el.className='float-item';
      el.textContent=heartIcons[Math.floor(Math.random()*heartIcons.length)];
      el.style.left=Math.random()*100+'%';
      el.style.fontSize=(Math.random()*14+26)+'px';
      el.style.animationDuration=(Math.random()*5+8)+'s';
      el.style.animationDelay=(Math.random()*.8)+'s';
      el.style.opacity='0';
      document.getElementById('floatsContainer').appendChild(el);
      setTimeout(()=>el.remove(),15000);
    }
  },1200);
}

/* ==================== COUNTDOWN ==================== */
const startDate1 = new Date('2026-06-04T00:00:00').getTime(); // أول مرة قولتلك بحبك
const startDate2 = new Date('2026-05-27T00:00:00').getTime(); // أول مرة اتقابالنا

function updateCountdown(){
  // العداد الأول - قولتلك بحبك
  const d1=Date.now()-startDate1;
  document.getElementById('days').textContent    = Math.floor(d1/86400000);
  document.getElementById('hours').textContent   = String(Math.floor((d1%86400000)/3600000)).padStart(2,'0');
  document.getElementById('minutes').textContent = String(Math.floor((d1%3600000)/60000)).padStart(2,'0');
  document.getElementById('seconds').textContent = String(Math.floor((d1%60000)/1000)).padStart(2,'0');

  // العداد التاني - اتقابالنا
  const d2=Date.now()-startDate2;
  document.getElementById('days2').textContent    = Math.floor(d2/86400000);
  document.getElementById('hours2').textContent   = String(Math.floor((d2%86400000)/3600000)).padStart(2,'0');
  document.getElementById('minutes2').textContent = String(Math.floor((d2%3600000)/60000)).padStart(2,'0');
  document.getElementById('seconds2').textContent = String(Math.floor((d2%60000)/1000)).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown,1000);

/* ==================== TAP CARD ==================== */
const hearts = ['🤎','💙','🤎','💙'];
function tapCard(e, card){
  const rc=card.querySelector('.ripple-container');
  if(rc){
    const r=document.createElement('div'); r.className='ripple';
    const rect=rc.getBoundingClientRect(), size=Math.max(rect.width,rect.height)*1.5;
    r.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
    rc.appendChild(r); setTimeout(()=>r.remove(),600);
  }
  const h=document.createElement('div'); h.className='heart-burst';
  h.textContent=hearts[Math.floor(Math.random()*hearts.length)];
  const crect=card.getBoundingClientRect();
  h.style.left=(e.clientX-crect.left-11)+'px'; h.style.top=(e.clientY-crect.top-11)+'px';
  card.appendChild(h); setTimeout(()=>h.remove(),750);
}

/* ==================== LIGHTBOX ==================== */
function closeLightbox(e){
  if(e.target===document.getElementById('lightbox')){
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow='';
  }
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; }
});

/* ==================== MUSIC PLAYER ==================== */
const songs=(function(){
  try{
    const urls=['audio/01.Bataminak.mp3'];
    const names=['❤️'];
    return urls.map(function(src,i){return{src:src,name:names[i]||('Agrigine '+(i+1))};});
  }catch(e){return[];}
})();

let curSong=0;
const audio=document.getElementById('loveSong'), playIcon=document.getElementById('playIcon'),
      disc=document.getElementById('disc'), soundWave=document.getElementById('soundWave'),
      fillEl=document.getElementById('progressFill'), curTEl=document.getElementById('currentTime'),
      totTEl=document.getElementById('totalTime');

function fmt(s){ return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'); }

function loadSong(idx,autoplay){
  curSong=(idx+songs.length)%songs.length;
  if(!songs[curSong]||!songs[curSong].src) return;
  audio.src=songs[curSong].src;
  document.getElementById('songName').textContent=songs[curSong].name;
  document.getElementById('songNum').textContent=(curSong+1)+' / '+songs.length;
  fillEl.style.width='0%'; curTEl.textContent='0:00'; totTEl.textContent='0:00';
  if(autoplay){audio.play();setPlaying(true);}else{setPlaying(false);}
}

function setPlaying(on){
  playIcon.className=on?'fa-solid fa-pause':'fa-solid fa-play';
  soundWave.classList.toggle('playing',on);
  disc.classList.toggle('spinning',on);
}

function toggleMusic(){
  if(!audio.src&&songs.length) loadSong(0,true);
  else if(audio.paused){audio.play().then(()=>setPlaying(true)).catch(()=>{});}
  else{audio.pause();setPlaying(false);}
}
function prevSong(){ if(songs.length) loadSong(curSong-1,!audio.paused); }
function nextSong(){ if(songs.length) loadSong(curSong+1,!audio.paused); }

function seekMusic(e){
  const bar=document.getElementById('progressBar');
  if(audio.duration) audio.currentTime=(e.offsetX/bar.offsetWidth)*audio.duration;
}

audio.addEventListener('timeupdate',function(){ if(!audio.duration)return; fillEl.style.width=(audio.currentTime/audio.duration*100)+'%'; curTEl.textContent=fmt(audio.currentTime); });
audio.addEventListener('loadedmetadata',function(){ totTEl.textContent=fmt(audio.duration); });
audio.addEventListener('ended',function(){ audio.currentTime=0; audio.play().catch(function(){}); });

if(songs.length) loadSong(0,false);

/* ==================== MINESWEEPER GAME ==================== */
const MINE_ROWS = 5, MINE_COLS = 5, MINE_BOMBS = 3, MINE_LIVES = 3;
let mineBoard, mineRevealed, mineLivesLeft, mineGameActive, mineGemCount;

function initMineGame(){
  mineBoard = [];
  mineRevealed = [];
  mineLivesLeft = MINE_LIVES;
  mineGameActive = true;
  mineGemCount = 0;

  const grid = document.getElementById('mineGrid');
  grid.innerHTML = '';

  for(let r = 0; r < MINE_ROWS; r++){
    mineBoard[r] = [];
    mineRevealed[r] = [];
    for(let c = 0; c < MINE_COLS; c++){
      mineBoard[r][c] = 0;
      mineRevealed[r][c] = false;
    }
  }

  let placed = 0;
  while(placed < MINE_BOMBS){
    const r = Math.floor(Math.random() * MINE_ROWS);
    const c = Math.floor(Math.random() * MINE_COLS);
    if(mineBoard[r][c] !== -1){ mineBoard[r][c] = -1; placed++; }
  }

  for(let r = 0; r < MINE_ROWS; r++){
    for(let c = 0; c < MINE_COLS; c++){
      if(mineBoard[r][c] === -1) continue;
      let count = 0;
      for(let dr = -1; dr <= 1; dr++){
        for(let dc = -1; dc <= 1; dc++){
          const nr = r+dr, nc = c+dc;
          if(nr >= 0 && nr < MINE_ROWS && nc >= 0 && nc < MINE_COLS && mineBoard[nr][nc] === -1) count++;
        }
      }
      mineBoard[r][c] = count;
    }
  }

  for(let r = 0; r < MINE_ROWS; r++){
    for(let c = 0; c < MINE_COLS; c++){
      const cell = document.createElement('div');
      cell.className = 'mine-cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.addEventListener('click', () => onMineClick(r, c));
      grid.appendChild(cell);
    }
  }

  updateMineUI();
}

function onMineClick(r, c){
  if(!mineGameActive || mineRevealed[r][c]) return;
  mineRevealed[r][c] = true;

  const idx = r * MINE_COLS + c;
  const cell = document.getElementById('mineGrid').children[idx];
  cell.classList.add('opened');

  if(mineBoard[r][c] === -1){
    cell.classList.add('boom');
    cell.textContent = '💔';
    mineLivesLeft--;
    updateMineUI();
    if(mineLivesLeft <= 0){
      mineGameActive = false;
      setTimeout(() => showMineResult(false), 600);
    }
  } else {
    cell.classList.add('safe');
    mineGemCount++;
    const emojis = ['💎','✨','🌟','⭐','💫'];
    cell.textContent = mineBoard[r][c] > 0 ? mineBoard[r][c] : emojis[Math.floor(Math.random()*emojis.length)];
    if(mineBoard[r][c] === 0){
      cell.textContent = '💎';
      cell.classList.add('gem');
      for(let dr = -1; dr <= 1; dr++){
        for(let dc = -1; dc <= 1; dc++){
          const nr = r+dr, nc = c+dc;
          if(nr >= 0 && nr < MINE_ROWS && nc >= 0 && nc < MINE_COLS && !mineRevealed[nr][nc]){
            setTimeout(() => onMineClick(nr, nc), 80);
          }
        }
      }
    }
    updateMineUI();
    if(mineGemCount >= (MINE_ROWS * MINE_COLS - MINE_BOMBS)){
      mineGameActive = false;
      setTimeout(() => showMineResult(true), 400);
    }
  }
}

function updateMineUI(){
  const livesEl = document.getElementById('mineLives');
  livesEl.textContent = '❤️'.repeat(mineLivesLeft) + '🖤'.repeat(MINE_LIVES - mineLivesLeft);
  document.getElementById('mineFound').textContent = '💎 ' + mineGemCount;
}

function showMineResult(won){
  const result = document.getElementById('quizResult');
  const emoji = document.getElementById('quizEmoji');
  const title = document.getElementById('quizWinText');
  const msg = document.getElementById('quizMsg');

  if(won){
    emoji.textContent = '🎉';
    title.textContent = 'ربحت ي حبيبي! قلبك انتصر 💖';
    msg.textContent = 'زي ما كسبت في "قلبي في المواجهة"، أنا كمان اخترتك وأنا متأكدة إنك أحسن اختيار في حياتي. كل يوم بحبك أكتر من اللي قبله، وأنت اللي بتملالي دنيتي فرح وحلاوة 💕 يارب أعيش معاك لآخر يوم في عمرنا';
  } else {
    emoji.textContent = '💔';
    title.textContent = 'خسرت ي حبيبي! بس قلبي معاك ❤️';
    msg.textContent = 'اللعبة خسرتها بس قلبي معاك دايماً. أنا عارفة إنك بتحبني أكتر من كده بكتير، وأنا كمان بحبك أوي ي حبيبي ❤️';
  }
  result.classList.remove('hidden');
}

function resetMineGame(){
  document.getElementById('quizResult').classList.add('hidden');
  initMineGame();
}

try { initMineGame(); } catch(e){ console.error('Mine game init error:', e); }

/* ==================== EVENT LISTENERS ==================== */
document.getElementById('next-btn').addEventListener('click', goToJourney);
document.getElementById('toPage3Btn').addEventListener('click', goToMessage);
document.getElementById('backBtn').addEventListener('click', backToMemories);

document.addEventListener('click',function(e){
  var card=e.target.closest('.photo-card');
  if(card) tapCard(e,card);
});

// Video pauses music, music resumes when video stops
var musicWasPlaying=false;
document.querySelectorAll('video').forEach(function(v){
  v.addEventListener('play',function(){
    musicWasPlaying=!audio.paused;
    if(musicWasPlaying){audio.pause();setPlaying(false);}
  });
  v.addEventListener('pause',function(){
    if(v.ended || v.currentTime<0.5) return;
    setTimeout(function(){
      if(v.paused && !v.ended && musicWasPlaying){
        audio.play().then(function(){setPlaying(true);}).catch(function(){});
        musicWasPlaying=false;
      }
    },300);
  });
  v.addEventListener('ended',function(){
    if(musicWasPlaying){
      audio.play().then(function(){setPlaying(true);}).catch(function(){});
      musicWasPlaying=false;
    }
  });
});

/* ==================== INIT ==================== */

// ===== LOGIN =====
(function createLoginHearts(){
  const container = document.getElementById('loginHearts');
  if(!container) return;
  const hearts = ['💖', '💗', '💕', '💞', '💓', '💘', '❤️'];
  for(let i = 0; i < 35; i++){
    const el = document.createElement('div');
    el.className = 'login-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (Math.random() * 20 + 22) + 'px';
    el.style.animationDuration = (Math.random() * 3 + 3.5) + 's';
    el.style.animationDelay = (Math.random() * 3) + 's';
    container.appendChild(el);
  }
})();

function checkLogin(){
  var pass = document.getElementById('loginPassword').value.trim().toLowerCase();
  if(pass === 'بحبك'){
    document.getElementById('login-screen').style.display = 'none';
    document.querySelector('.page#page-letter').classList.add('active');
    try{ audio.muted=false; audio.play().catch(function(){}); }catch(e){}
    playFlowerTransition().then(async function(){
      const paper = document.getElementById('letter-paper');
      if(paper) requestAnimationFrame(function(){requestAnimationFrame(function(){paper.classList.add('is-revealing');});});
      await delay(1350);
      await typewriteLetter(CONFIG);
    });
  } else {
    const err = document.getElementById('loginError');
    err.style.display = 'block';
    err.style.animation = 'none';
    err.offsetHeight;
    err.style.animation = 'shake 0.5s ease';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginPassword').focus();
  }
}

document.getElementById('loginPassword').addEventListener('keypress', function(e){
  if(e.key === 'Enter') checkLogin();
});

document.addEventListener('click', function(){
  if(audio.paused){
    audio.muted = false;
    audio.play().then(()=>setPlaying(true)).catch(function(){});
  }
}, {once: true});
