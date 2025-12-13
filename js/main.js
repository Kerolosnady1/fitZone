
/* fitzone v8 main js */
const App = {
  init(){ 
    this.cache(); this.bind(); this.loadUser();
  },
  cache(){ 
    this.body = document.body;
    this.loginForm = document.getElementById('loginForm');
    this.logoutBtn = document.getElementById('logoutBtn');
    this.calForm = document.getElementById('calForm');
    this.streakElem = document.getElementById('streakCount');
    this.exerciseList = document.getElementById('exerciseList');
  },
  bind(){
    if(this.loginForm) this.loginForm.addEventListener('submit', e=>{ e.preventDefault(); this.login(); });
    if(this.logoutBtn) this.logoutBtn.addEventListener('click', ()=>this.logout());
    if(this.calForm) this.calForm.addEventListener('submit', e=>{ e.preventDefault(); this.calcCalories(); });
    this.renderExercises();
    this.updateStreakUI();
  },
  loadUser(){
    this.user = JSON.parse(localStorage.getItem('fitzone_user')||'null');
    this.updateAuthUI();
  },
  saveUser(){ localStorage.setItem('fitzone_user', JSON.stringify(this.user)); },
  login(){
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    if(!email||!pass){ alert('يرجى إدخال البريد وكلمة المرور'); return; }
    // simple demo auth - store in localStorage
    this.user = {email, lastWorkout: localStorage.getItem('lastWorkout')||null, streak: parseInt(localStorage.getItem('streak')||'0')};
    this.saveUser(); this.updateAuthUI(); alert('تم تسجيل الدخول');
  },
  logout(){ this.user=null; localStorage.removeItem('fitzone_user'); this.updateAuthUI(); alert('تم تسجيل الخروج'); },
  updateAuthUI(){
    if(this.user){
      document.querySelectorAll('.auth-only').forEach(el=>el.style.display='inline-block');
      document.querySelectorAll('.guest-only').forEach(el=>el.style.display='none');
      const el = document.getElementById('userEmail'); if(el) el.textContent = this.user.email;
    } else {
      document.querySelectorAll('.auth-only').forEach(el=>el.style.display='none');
      document.querySelectorAll('.guest-only').forEach(el=>el.style.display='inline-block');
    }
  },
  calcCalories(){
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    if(!weight||!height||!age){ alert('الرجاء إدخال جميع القيم'); return; }
    // Mifflin-St Jeor Equation
    let bmr = gender==='male' ? 10*weight + 6.25*height - 5*age + 5 : 10*weight + 6.25*height - 5*age -161;
    const activity = document.getElementById('activity').value;
    const factor = parseFloat(activity);
    const calories = Math.round(bmr * factor);
    document.getElementById('calResult').textContent = calories + ' kcal/day';
  },
  renderExercises(){
    if(!this.exerciseList) return;
    const exercises = [
      {title:'Push Ups', video:'https://www.youtube.com/embed/_l3ySVKYVJ8'},
      {title:'Squats', video:'https://www.youtube.com/embed/aclHkVaku9U'},
      {title:'Plank', video:'https://www.youtube.com/embed/pSHjTRCQxIw'},
      {title:'Deadlift', video:'https://www.youtube.com/embed/op9kVnSso6Q'},
      {title:'Shoulder Press', video:'https://www.youtube.com/embed/qEwKCR5JCog'},
    ];
    exercises.forEach(ex=>{
      const div = document.createElement('div');
      div.className='card';
      div.innerHTML = `<h3>${ex.title}</h3><p>شرح التمرين من مدرب محترف</p><div style="margin-top:8px"><button class="btn" onclick="App.openVideo('${ex.video}')">شاهد الفيديو</button></div>`;
      this.exerciseList.appendChild(div);
    });
  },
  openVideo(src){
    const modal = document.getElementById('videoModal'); if(!modal) return;
    modal.innerHTML = `<div style="position:relative;padding-top:56.25%"><iframe src="${src}" style="position:absolute;left:0;top:0;width:100%;height:100%" frameborder="0" allowfullscreen></iframe></div><div style="text-align:right;margin-top:8px"><button class="btn" onclick="App.closeVideo()">إغلاق</button></div>`;
    modal.style.display='block';
  },
  closeVideo(){ const modal = document.getElementById('videoModal'); if(modal) modal.style.display='none'; modal.innerHTML=''; },
  // Streak logic: when marking a workout done, update lastWorkout and streak. If more than 24h passed, increment streak continuation, else ignore
  markWorkoutDone(){
    const now = Date.now();
    const last = parseInt(localStorage.getItem('lastWorkout')||'0');
    let streak = parseInt(localStorage.getItem('streak')||'0');
    if(!last){ streak = 1; } else {
      const diff = now - last;
      if(diff > 24*60*60*1000){ // more than 24h since last workout -> increase streak
        streak += 1;
      } else {
        // if within 24h, do not increment but allow marking
      }
    }
    localStorage.setItem('lastWorkout', now.toString());
    localStorage.setItem('streak', streak.toString());
    this.updateStreakUI();
    alert('تم تسجيل التمرين. أيام الحماس: ' + streak);
  },
  updateStreakUI(){
    const streak = parseInt(localStorage.getItem('streak')||'0');
    if(this.streakElem) this.streakElem.textContent = streak;
  }
};
window.addEventListener('DOMContentLoaded', ()=>App.init());

// Advanced calorie & macro calc
App.calcAdvanced = function() {
  const w = parseFloat(document.getElementById('adv_weight').value);
  const h = parseFloat(document.getElementById('adv_height').value);
  const age = parseInt(document.getElementById('adv_age').value);
  const gender = document.getElementById('adv_gender').value;
  const activity = parseFloat(document.getElementById('adv_activity').value);
  const goal = document.getElementById('adv_goal').value;
  if(!w||!h||!age){ alert('الرجاء إدخال القيم'); return; }
  let bmr = gender==='male' ? 10*w + 6.25*h - 5*age + 5 : 10*w + 6.25*h - 5*age -161;
  let maintenance = Math.round(bmr * activity);
  let calories = maintenance;
  if(goal==='bulking') calories = Math.round(maintenance * 1.15);
  if(goal==='cutting') calories = Math.round(maintenance * 0.8);
  const macros = {
    bulking: {protein:0.30, carbs:0.50, fat:0.20},
    cutting: {protein:0.40, carbs:0.30, fat:0.30},
    maintenance: {protein:0.35, carbs:0.45, fat:0.20}
  };
  const m = macros[goal];
  const protein_g = Math.round((calories * m.protein)/4);
  const carbs_g = Math.round((calories * m.carbs)/4);
  const fat_g = Math.round((calories * m.fat)/9);
  const resultsDiv = document.getElementById('advResults');
  resultsDiv.innerHTML = `
    <div class="result-card"><h4>Calories</h4><p>${calories} kcal/day</p></div>
    <div class="result-card"><h4>Protein</h4><p>${protein_g} g</p></div>
    <div class="result-card"><h4>Carbs</h4><p>${carbs_g} g</p></div>
    <div class="result-card"><h4>Fat</h4><p>${fat_g} g</p></div>
  `;
}

// Split modal content
App.openSplit = function(key) {
  const content = document.getElementById('splitContent');
  const map = {
    bro: {title:'Bro Split', body:`<h3>Bro Split</h3><p>السبت: صدر<br>الأحد: ظهر<br>الإثنين: كتف<br>الثلاثاء: رجل<br>الأربعاء: ذراع<br>الخميس/الجمعة: راحة</p><p>تمارين عزل كثيرة · عدد مجموعات كبير · مناسب للتضخيم</p>`},
    full: {title:'Full Body', body:`<h3>Full Body</h3><p>الجسم كله في نفس اليوم · 3-4 مرات أسبوعيًا</p><p>تمارين مركبة أساسية · التركيز على التكنيك والقوة</p>`},
    pushpull: {title:'Push / Pull', body:`<h3>Push / Pull</h3><p>Push: صدر+كتف+تراي · Pull: ظهر+باي · 4-5 أيام/أسبوع</p><p>تمارين مركبة بنسبة 70%</p>`},
    bodypart: {title:'Body Part Split', body:`<h3>Body Part Split</h3><p>اليوم 1: عضلات كبيرة (صدر+ظهر+رجلين)<br>اليوم 2: عضلات صغيرة (كتف+باي+تراي)</p><p>Supersets · Drop sets · مناسب ل3-4 أيام/أسبوع</p>`},
    power: {title:'Powerbuilding', body:`<h3>Powerbuilding</h3><p>مزيج قوة + ضخامة · 4-5 أيام/أسبوع</p><p>تمارين أساسية ثقيلة + تمارين عزل خفيفة · تكرارات منخفضة في أيام القوة (3–5) وعالية في أيام الضخامة (8–12)</p>`}
  };
  const d = map[key];
  content.innerHTML = `<div style="display:flex;gap:12px"><div style="flex:1"><h2 style="color:var(--neon)">${'${d.title}'}</h2>${'${d.body}'}</div><div style="width:220px"><button class="btn" onclick="App.closeSplit()">إغلاق</button></div></div>`;
  document.getElementById('splitModal').style.display='flex';
}
App.closeSplit = function(){ document.getElementById('splitModal').style.display='none'; document.getElementById('splitContent').innerHTML=''; }


// Modal backdrop close handling
document.addEventListener('click', function(e){
  const backdrop = document.getElementById('splitModal');
  if(backdrop && backdrop.style.display==='flex' && e.target === backdrop){ App.closeSplit(); }
});
document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ App.closeSplit(); } });

// reveal animations
document.addEventListener('DOMContentLoaded', function(){ setTimeout(function(){ document.querySelectorAll('.fade-slide').forEach(function(el){ el.classList.add('show'); }); }, 120); });
