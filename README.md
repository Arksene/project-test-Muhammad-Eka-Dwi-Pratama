# 💡 Suitmedia Ideas UI Implementation

A responsive and interactive web application for displaying idea posts using a public API. Built with vanilla HTML, CSS, and JavaScript.

## 📌 Features

### 1. Header
✅ **Fixed Position & Show/Hide on Scroll**  
- Header uses `position: fixed` (via `.header` class in `style.css`).  
- `handleScroll()` in `script.js` hides the header when scrolling down and shows it when scrolling up using the `.hidden` class (`transform: translateY(-100%)`).

✅ **Transparent Background on Scroll**  
- When scrolled more than 100px, `.scrolled` class is added to make the header slightly transparent using `rgba(255, 107, 53, 0.95)` and `backdrop-filter: blur(10px)`.

✅ **Active State for Menu**  
- The "Ideas" menu in `index.html` has an `.active` class styled with an underline in CSS (`.nav a.active`).

---

### 2. Banner
✅ **Background Image & Skewed Bottom Edge**  
- Background image applied to `.banner-bg`, easily customizable in CSS.  
- Diagonal edge achieved with `.banner-diagonal` and `transform: skewY(-2deg)`.

✅ **Parallax Scrolling Effect**  
- Implemented in `handleScroll()` by transforming `.banner-bg` and `.banner-content` at different scroll speeds.

---

### 3. List Post
✅ **Sorting & Pagination**  
- Users can choose "Sort by" (`Newest` / `Oldest`) and "Show per page" (`10`, `20`, `50`).  
- Event listeners update state and re-fetch data on change.

✅ **State Persistence via URL**  
- URL parameters (`?page=2&size=20&sort=published_at`) are preserved using `URLSearchParams` and `history.replaceState()`.  
- Refreshing the page retains filters and page number.

✅ **Consistent Thumbnail Ratio**  
- Thumbnails are uniform using `object-fit: cover`, `height: 200px`, and `overflow: hidden`.

✅ **Lazy Loading for Images**  
- `IntersectionObserver` is used to load images only when they enter the viewport.  
- Initially set via `data-src`, and updated to `src` when visible.

✅ **Multiline Text Clamping**  
- Titles are limited to 3 lines using `-webkit-line-clamp: 3` with ellipsis (`...`) for overflow.

---

### 4. API Integration
✅ **Dynamic API Request**  
- Fetches data from:  
  `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=...&page[size]=...&append[]=small_image&append[]=medium_image&sort=...`

✅ **Handled API Errors**  
- **403 Error (Forbidden)**: Caused by hotlink protection. As a workaround, image URLs are replaced with random images from [Picsum Photos](https://picsum.photos).

---
