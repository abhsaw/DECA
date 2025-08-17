
# WHS DECA — Site

- Light theme with DECA watermark in page background **and behind hero titles**.
- Mobile-friendly nav, sticky header, active-link highlight, scroll reveal.
- Big editable cards/panels for forms and content.
- Footer: © 2025 WHS DECA.

## Customize
- Replace `assets/deca-logo.png` with a new logo if needed (same filename).
- Adjust watermark intensity/size via `css/modern.css`:
  ```css
  --wm-opacity: .08;
  --wm-size: min(68vmin, 980px);
  ```
- Add a hero photo per page by inserting in `<head>` of that page:
  ```html
  <style>:root{ --hero-photo:url('assets/your-photo.jpg'); --hero-photo-opacity:.18; }</style>
  ```
