
/* main.js — fitZone front-end logic
   Provides: FitZone.loadUser(), FitZone.login(), FitZone.logout(), FitZone.markWorkoutDone()
   and simple UI hooks: FitZone.updateAuthUI(), FitZone.updateStreakUI()
*/
(function () {
  'use strict';

  // ---- Utilities -----------------------------------------------------------
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  function toInt(value, fallback = 0) {
    const n = parseInt(value, 10);
    return Number.isNaN(n) ? fallback : n;
  }

  // ---- Module State --------------------------------------------------------
  const state = {
    user: null, // { email, lastWorkout:number|null, streak:number }
  };

  // ---- Persistence ---------------------------------------------------------
  function saveUser() {
    if (state.user) {
      localStorage.setItem('fitzone_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('fitzone_user');
    }
  }

  function loadUser() {
    const raw = localStorage.getItem('fitzone_user');
    state.user = raw ? JSON.parse(raw) : null;
    updateAuthUI();
  }

  // ---- UI Hooks (safe no-ops by default) ----------------------------------
  // Replace these with your own implementations in your pages if needed.
  function updateAuthUI() {
    // Example: toggle sections based on login state
    const loggedEl = document.querySelector('[data-auth="logged"]');
    const guestEl = document.querySelector('[data-auth="guest"]');

    if (loggedEl) loggedEl.style.display = state.user ? '' : 'none';
    if (guestEl) guestEl.style.display = state.user ? 'none' : '';

    // Show email if an element exists
    const emailEl = document.querySelector('[data-user-email]');
    if (emailEl) emailEl.textContent = state.user?.email || '';
  }

  function updateStreakUI() {
    const streakEl = document.querySelector('[data-streak]');
    if (streakEl) {
      const streak = toInt(localStorage.getItem('streak'), 0);
      streakEl.textContent = String(streak);
    }

    const lastEl = document.querySelector('[data-last-workout]');
    if (lastEl) {
      const last = toInt(localStorage.getItem('lastWorkout'), 0);
      lastEl.textContent = last ? new Date(last).toLocaleString() : '—';
    }
  }

  // ---- Auth ---------------------------------------------------------------
  function login() {
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');

    const email = (emailInput?.value || '').trim();
    const pass = (passInput?.value || '').trim(); // currently not used for real auth

    if (!email || !pass) {
      alert('Please enter email and password');
      return;
    }

    // Seed streak values from localStorage if present
    const lastWorkout = localStorage.getItem('lastWorkout');
    const streak = toInt(localStorage.getItem('streak'), 0);

    state.user = {
      email,
      lastWorkout: lastWorkout ? toInt(lastWorkout, null) : null,
      streak,
    };

    saveUser();
    updateAuthUI();
    updateStreakUI();
    alert('Logged in successfully');
  }

  function logout() {
    state.user = null;
    saveUser(); // removes fitzone_user
    updateAuthUI();
    alert('Logged out successfully');
  }

  // ---- Workout / Streak ----------------------------------------------------
  /* Strategy:
     - If no previous workout, set streak = 1.
     - If previous workout was yesterday (diff within 1 day), increment streak.
     - If same calendar day, do not change streak.
     - If more than one day gap, reset streak to 1.
  */
  function markWorkoutDone() {
    const now = Date.now();

    const last = toInt(localStorage.getItem('lastWorkout'), 0);
    let streak = toInt(localStorage.getItem('streak'), 0);

    if (!last) {
      // First-ever workout
      streak = 1;
    } else {
      const daysDiff = Math.floor((now - last) / MS_PER_DAY);

      if (daysDiff === 0) {
        // Same day: keep streak as-is
      } else if (daysDiff === 1) {
        // Consecutive day
        streak = streak > 0 ? streak + 1 : 1;
      } else if (daysDiff > 1) {
        // Gap > 1 day: reset
        streak = 1;
      }
    }

    localStorage.setItem('lastWorkout', String(now));
    localStorage.setItem('streak', String(streak));

    // Keep user object in sync if logged in
    if (state.user) {
      state.user.lastWorkout = now;
      state.user.streak = streak;
      saveUser();
    }

    updateStreakUI();
    alert('Workout logged. Streak days: ' + streak);
  }

  // ---- Public API ----------------------------------------------------------
  window.FitZone = {
    // state access (read-only suggestion)
    get user() {
      return state.user;
    },

    // lifecycle
    loadUser,

    // auth
    login,
    logout,

    // workouts
    markWorkoutDone,

    // allow overriding UI hooks from pages if desired
    updateAuthUI: (fn) => {
      if (typeof fn === 'function') {
        updateAuthUI = fn; // rebind local function reference
      }
    },
    updateStreakUI: (fn) => {
      if (typeof fn === 'function') {
        updateStreakUI = fn;
      }
    },
  };

  // Auto-load user on script load
    document.addEventListener('DOMContentLoaded', loadUser); })
