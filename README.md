# REST Countries API with Color Theme Switcher

An interactive frontend application that fetches country data from the REST Countries API (or local data fallback), allows users to search, 
filter by region, and view detailed information for each country.

Built as a multi-page TypeScript application using **Vite** and deployed on **Render.com**.

🔗 **Live Demo:** [https://rest-countries-api-5t77.onrender.com](https://rest-countries-api-5t77.onrender.com)

---

## 🛠️ Features

* **Multi-Page Architecture:** Clean navigation between the main listing (`index.html`) and individual detail views (`detail.html`).
* **Dark/Light Theme Switcher:** Persistent theme selection saved in `localStorage` across page reloads and navigation.
* **Search & Region Filter:** Dynamic client-side searching and filtering without making redundant network requests.
* **API Rate Limit Prevention & Offline Data Access** Data sourcing logic that prevents reaching public API limits.
* **Offline Data Access:** Local fallback dataset (`public/data.p.json`) ensures application availability during API downtime.
* **Responsive Layout:** Tailored design for mobile and desktop screens.
* **Empty State Handling:** Displays a clear, user-friendly message (`Country not found`) when search queries yield no matching results.
* **Border Country Navigation:** Dynamic mapping of border country codes to full names with direct click-through navigation.
* **Interactive Map Integration:** Uses **Leaflet.js** to display an interactive geographical map for each country on the detail page (`detail.html`) based on API `latlng` coordinates.
---

## ⚡ Technical Challenges & Solutions

### 1. API Rate Limit & Local Fallback Handling
To prevent exceeding API request limits during rapid user interactions or frequent page reloads, a dedicated fallback variable was implemented in the code. 
This variable controls data sourcing by automatically directing fetch calls to the local dataset (`public/data.p.json`) instead of hitting external REST API endpoints repeatedly.

### 2. Handling Missing and Inconsistent Country Identifiers
In the dataset, not all countries possessed a uniform primary key or unique code.
* **Fallback Identification Strategy:** Implemented a robust lookup function in TypeScript that checks available unique identifiers in order of priority (`alpha-3` → `uuid` → name).
* **Safe Navigation & Fallback Redirects:** If a user navigates to `detail.html` with an invalid or missing country code parameter, the application safely detects the issue and
  redirects back to the main list without throwing unhandled exceptions.

### 3. Dynamic Empty State & Defensive UI
To provide clear feedback when users search for non-existent countries or apply non-matching filters:
* **User Feedback:** The UI dynamically intercepts empty filter results and renders a dedicated `<p>Country not found</p>` notification rather than leaving a blank screen.
* **Safe Re-renders:** The container safely clears previous card elements before applying search query updates, ensuring smooth performance and zero DOM clutter.

### 4. State Persistence & Theme Switching Mechanics
* **Theme Synchronization:** Implemented a dark/light mode toggle that saves the user's preference in `localStorage`. 
* **Cross-Page Persistence:** Ensured that when navigating between `index.html` and `detail.html`, the application reads the saved theme state upon DOM initialization to maintain visual consistency without theme resets.

### 5. Border Country Mapping & Dynamic Routing
* **Alpha Code Resolution:** The REST API provides border countries only as 3-letter alpha codes (e.g., `["FRA", "DEU"]`). Implemented a dynamic lookup parser
  that maps these codes against the dataset to resolve full country names.
* **Interactive Navigation:** Transformed raw border codes into interactive components, allowing users to smoothly transition between adjacent country
  detail pages via URL parameters (`detail.html?code=FRA`).


### 6. Leaflet Map Rendering & Dynamic Coordinates
* **Geographical Mapping:** Integrated Leaflet.js to render custom interactive maps on `detail.html`.
* **Dynamic Center Realignment:** Extracted latitude and longitude arrays (`latlng`) from the country data model to dynamically re-center the map view and place location markers upon page load.







