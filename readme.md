# Classroom Hub

This is a responsive frontend web application built as a custom classroom clone for participating in the **Code2Canvas** frontend development competition. 

🔗 **Live Website:** [https://classroom-c2c.netlify.app](https://classroom-c2c.netlify.app)

---

## 🚀 Features

* **Dashboard & Course Grid:** Overview of enrolled college courses with live search and filtering by level, language, and type.
* **Dynamic Course Pages (`ai-course.html`):** Dynamically adapts its banner, course title, instructor, and course code based on the selected card (Artificial Intelligence, Operating Systems, Web Programming, Cloud Computing, Software Engineering, or Graphic Designing).
* **Interactive Communication Hub (`messages.html`):** Real-time-style simulated chat interface to exchange messages with faculty and classmates.
* **Classmates & Friends (`friends.html`):** Directory to view online/offline status, shared tags, and manage pending student connection requests.
* **Weekly Schedule Timetable (`schedule.html`):** Filterable timetable view sorted by weekdays and class time slots.
* **To-do Tracker (`todo.html`):** Interactive assignment checklist with live status toggles for Assigned, Missing, and Done tasks.
* **Settings & Theme Persistence:** Fully functional preferences panel with **Default**, **Dark**, and **Day** themes saved to browser `localStorage`.
* **Mobile-Responsive Drawer:** Off-canvas responsive navigation menu with a hamburger toggle for mobile devices.
* **Custom Toast Notifications:** Action feedback notifications integrated across all navigation actions and buttons.

---

## 🛠️ Frameworks & Tools Used

* **HTML5:** Semantic markup utilizing modern document structure and standard anchor routing.
* **CSS3:** Custom styles, CSS Variables (`--root`) for dynamic theming, CSS Grid, Flexbox, and responsive media queries.
* **JavaScript (ES6+):** Vanilla DOM manipulation, local storage persistence, dynamic URL query parameters (`URLSearchParams`), and event-driven state updates.
* **Google Fonts:** Typography styled using *DM Sans* and *Manrope*.
* **Netlify:** Hosted and deployed for continuous deployment and public web access.
