# 🚀 COSMOS – Space Dashboard

![GitHub repo size](https://img.shields.io/github/repo-size/tarekhamdy99/COSMOS-Space-Dashboard)
![GitHub last commit](https://img.shields.io/github/last-commit/tarekhamdy99/COSMOS-Space-Dashboard)
![GitHub language count](https://img.shields.io/github/languages/count/tarekhamdy99/COSMOS-Space-Dashboard)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-blue)](https://tarekhamdy99.github.io/COSMOS-Space-Dashboard/)

**COSMOS** is an interactive space exploration dashboard built with pure JavaScript, HTML, and CSS. It pulls real‑time data from NASA’s open APIs to deliver stunning astronomy imagery, Mars weather reports, and a searchable catalogue of celestial objects – all wrapped in a modern, responsive interface.

![COSMOS Screenshot](https://raw.githubusercontent.com/tarekhamdy99/COSMOS-Space-Dashboard/main/Assets/Images/Screenshot_ReadMeFile.png)
_Add a screenshot of the application here_

---

## ✨ Key Features

| Operation              | Description                                                                              |
| :--------------------- | :--------------------------------------------------------------------------------------- |
| **Explore**            | Browse the Astronomy Picture of the Day (APOD) and dive into NASA’s image library.       |
| **Live Data**          | Display real‑time Mars weather (temperature, pressure, season) using interactive charts. |
| **Search**             | Instantly search for planets, moons, or any celestial body by name.                      |
| **Save Favorites**     | Bookmark your favourite APOD images or search results for quick access later.            |
| **Refresh**            | Update all data on demand with a single click – always see the latest from space.        |
| **Responsive Design**  | Fully responsive layout, optimised for desktops, tablets, and mobile devices.            |
| **Persistent Storage** | Favourite items are saved to the browser’s `localStorage`, so they survive page reloads. |

---

## 🛠️ Technologies Used

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat&logo=fontawesome&logoColor=white)
![NASA API](https://img.shields.io/badge/NASA%20APIs-0B3D91?style=flat&logo=nasa&logoColor=white)

- **Frontend:** HTML5, CSS3, Bootstrap 5
- **Logic:** Vanilla JavaScript (ES6+), async/await
- **Charts:** Chart.js
- **Icons:** Font Awesome 6
- **Data:** NASA Open APIs (APOD, Mars Weather, Image & Video Library)
- **Storage:** Browser LocalStorage API

---

## 🚀 Live Demo

Experience the dashboard live: [COSMOS Demo](https://tarekhamdy99.github.io/COSMOS-Space-Dashboard/)

---

## 📂 Project Structure

COSMOS-Space-Dashboard/
│
├── index.html # Main HTML entry point
├── Assets/
│ └── Images/ # Image assets (screenshots, placeholders)
├── CSS/
│ └── style.css # Custom stylesheet
├── JS/
│ ├── Index.js # Core application logic & event handling

---

## ⚙️ Implementation Details

### Data Fetching

The `api.js` module uses the Fetch API with async/await to request data from three NASA endpoints:

- **APOD**: `https://api.nasa.gov/planetary/apod`
- **Mars Weather (InSight)**: `https://api.nasa.gov/insight_weather/`
- **Image & Video Library**: `https://images-api.nasa.gov/search?q=`

All responses are cached locally to reduce API calls and improve performance.

### Interactive Charts

Mars weather data (temperature, pressure, wind speed) is visualised with Chart.js. The dashboard displays line and bar charts that dynamically update when new data is fetched.

### Search & Save

- The **Search** feature filters NASA’s image library and displays matching results as cards.
- A **Favourites** system lets users save any APOD or search result to `localStorage`, rendering them in a dedicated “My Favourites” panel.

### Responsive UI

Built with Bootstrap’s grid system and custom CSS media queries. Cards, charts, and navigation automatically adapt to any screen size.

---

## 🧠 Key Takeaways

This project showcases:

- Fetching and handling third‑party API data asynchronously.
- Visualising scientific data with Chart.js.
- Implementing a client‑side favourites system with `localStorage`.
- Dynamic DOM manipulation and event delegation.
- Responsive design with Bootstrap.
- Clean separation of concerns (API layer, UI layer, chart logic).

---

## 📄 License

This project is open‑source and available for learning purposes. Feel free to use and modify it as needed.

---

## 👤 Author

**Tarek Hamdy Arafa**

[![GitHub](https://img.shields.io/badge/GitHub-tarekhamdy99-181717?style=flat&logo=github)](https://github.com/tarekhamdy99)

---

⭐ **If you find this project helpful, consider giving it a star on GitHub!**
