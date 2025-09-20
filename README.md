# Searene Project

Static, no-bundler build (GH Pages friendly). Open `searene.html` in a browser.

Structure:
- `searene.html` – HTML shell
- `styles/styles.css` – Theme tokens + custom styles
- `src/utils.js` – Global utils (`brandLogoSVG`, `showMessage`, `sanitizeHTML`, `safeReadJSON`, `themeVar`)
- `src/theme.js` – Theme API (`window.Theme`)
- `src/main.js` – App bootstrap and nav wiring
- `src/modules/*.js` – Feature IIFEs attached to `window.*Module`
