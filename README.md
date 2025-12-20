<p align="center">
  <img src="img/fitzone_logo.png" alt="FitZone Logo" width="200"/>
</p>

<h1 align="center">🏋️ FitZone - Fitness & Wellness Platform</h1>

<p align="center">
  <strong>Transform Your Body with the Futuristic Fitness Companion</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white" alt="Python Version"/>
  <img src="https://img.shields.io/badge/Flask-3.x-green?logo=flask&logoColor=white" alt="Flask"/>
  <img src="https://img.shields.io/badge/SQLite-3-blue?logo=sqlite&logoColor=white" alt="SQLite"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License"/>
  <img src="https://img.shields.io/badge/Version-8.0-purple" alt="Version"/>
</p>

---

## 📖 Overview

**FitZone** is a comprehensive fitness and wellness web application designed to help users achieve their health and fitness goals. Built with a stunning **Neon Cyberpunk** design aesthetic, FitZone offers workout planning, nutrition tracking, calorie calculators, and progress monitoring—all in one platform.

---

## ✨ Features

### 🏠 Core Features
- **User Authentication** - Secure registration and login system with password hashing
- **User Profiles** - Personal profile management with avatar upload
- **Progress Tracking** - Log and track your weight, workouts, and notes over time
- **Workout Streak System** - Gamified workout tracking with streak counters

### 💪 Training & Workouts
- **Exercise Library** - Curated exercises with embedded video tutorials
- **Training Splits** - Pre-built workout programs:
  - Bro Split
  - Full Body
  - Push/Pull
  - Body Part Split
  - Powerbuilding

### 🍎 Nutrition
- **Healthy Meals Gallery** - 10+ nutritious meal options with macros
- **Advanced Calorie Calculator** - BMR & TDEE calculation using Mifflin-St Jeor equation
- **Macro Calculator** - Personalized protein, carbs, and fat recommendations
- **Goal-Based Planning** - Bulking, cutting, and maintenance macros

### 📊 Calculators
- **BMR Calculator** - Basal Metabolic Rate estimation
- **TDEE Calculator** - Total Daily Energy Expenditure
- **Activity Level Adjustment** - Low, Normal, and High activity multipliers

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Backend** | Python, Flask |
| **Database** | SQLite3 |
| **Frontend** | HTML5, CSS3, JavaScript |
| **Styling** | Custom CSS with Neon Cyberpunk theme |
| **Authentication** | Werkzeug (Password Hashing) |
| **Icons** | Font Awesome 6.5 |
| **Fonts** | Google Fonts (Cairo) |

---

## 📁 Project Structure

```
fitZone/
├── app.py                 # Main Flask application
├── fitzone.db             # SQLite database
├── requirements.txt       # Python dependencies
├── setup_database.php     # Database setup script
│
├── api/                   # REST API endpoints
│   ├── auth/              # Authentication APIs
│   ├── meals/             # Meals API
│   ├── exercises/         # Exercises API
│   ├── progress/          # Progress tracking API
│   └── ...
│
├── templates/             # Flask HTML templates
│   ├── base.html          # Base template
│   ├── index.html         # Home page
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── profile.html       # User profile
│   └── ...
│
├── static/                # Static assets
├── css/
│   └── style.css          # Main stylesheet (Neon Cyberpunk)
├── js/
│   └── main.js            # Main JavaScript file
├── img/                   # Images and media
│
├── database/
│   └── schema.sql         # Database schema with seed data
│
├── index.html             # Static home page
├── about.html             # About page
├── services.html          # Services page
├── meals.html             # Meals gallery
├── training.html          # Training programs
├── contact.html           # Contact form
├── login.html             # Static login page
└── register.html          # Static registration page
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+**
- **pip** (Python package manager)
- **XAMPP** (optional, for PHP/MySQL setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitZone.git
   cd fitZone
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/macOS
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**
   
   The SQLite database (`fitzone.db`) is included. To reset or recreate it:
   ```bash
   # Using the SQL schema
   sqlite3 fitzone.db < database/schema.sql
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   ```
   http://localhost:5000
   ```

---

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with activity tracker |
| `/register` | User registration |
| `/login` | User login |
| `/logout` | Logout (clears session) |
| `/profile` | User profile & progress tracking |
| `/workouts` | Workout plans |
| `/nutrition` | Recipes & meal plans |
| `/calculators` | Health calculators |
| `/contact` | Contact form |
| `/blog` | Fitness blog |
| `/api/calc` | BMR/TDEE calculation API |

---

## 🎨 Design Philosophy

FitZone features a **Neon Cyberpunk** aesthetic with:

- 🌙 **Dark Theme** - Easy on the eyes, perfect for late-night workout planning
- ⚡ **Neon Accents** - Vibrant yellow (`#ffeb0e`) and cyan (`#6decfb`) highlights
- 🌐 **Glassmorphism** - Modern glass-like panels with subtle transparency
- ✨ **Micro-animations** - Smooth hover effects and pulse animations
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🗃️ Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `users` | User accounts with profile data (name, email, password, avatar, weight, height, goal) |
| `meals` | Healthy meals with nutritional information (calories, protein, carbs, fat) |
| `exercises` | Exercise library with video URLs |
| `training_programs` | Pre-built workout split programs |
| `user_progress` | Progress tracking entries (date, weight, notes) |
| `contacts` | Contact form submissions |

---

## 🔐 Security Features

- ✅ Password hashing using Werkzeug's `generate_password_hash`
- ✅ Session-based authentication
- ✅ Secure file upload with filename sanitization
- ✅ CSRF protection through Flask sessions
- ✅ SQL injection prevention via parameterized queries

---

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Home Page
*Futuristic landing page with activity tracker*

### Services Page
*Training programs and calorie calculator*

### Meals Gallery
*10+ healthy meal options with macros*

</details>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**FitZone Team**

- 📍 Location: Cairo, Egypt
- 📧 Contact: Via the [Contact Page](contact.html)

---

## 🙏 Acknowledgments

- [Flask](https://flask.palletsprojects.com/) - Web framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Cairo font family
- All the fitness enthusiasts who inspired this project

---

<p align="center">
  <strong>© 2025 FitZone • Neon Cyberpunk v8</strong>
</p>

<p align="center">
  Made with 💪 for fitness enthusiasts worldwide
</p>
