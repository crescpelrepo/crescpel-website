# CRESCPEL — Static Website

A modern, responsive, SEO-friendly static website for **CRESCPEL**, a US consumer products brand selling through Amazon and Walmart.

Built with plain **HTML, CSS, and JavaScript** — no frameworks, no build step, no backend.

## Folder structure

```
CR_Website/
├── index.html          # Home
├── products.html       # Products
├── about.html          # About Us
├── faq.html            # FAQ (accordion + FAQ schema)
├── contact.html        # Contact (validated form, no backend)
├── css/
│   └── style.css       # Design system + all styles
├── js/
│   └── main.js         # Nav toggle, FAQ accordion, form validation, scroll reveal
├── assets/
│   ├── logo.svg
│   ├── favicon.svg
│   └── images/         # SVG product + hero placeholders
├── robots.txt
├── sitemap.xml
└── README.md
```

## Design

- White background, green accent (`#16a34a`), clean Inter typography
- Fully mobile responsive (hamburger nav under 760px)
- Accessible: semantic HTML, ARIA labels, keyboard focus styles, reduced-motion support
- Fast loading: single CSS/JS file, lazy-loaded images, inline SVG icons

## Running locally

It's fully static — just open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Customizing

| What | Where |
| --- | --- |
| Brand colors / fonts | `:root` tokens at the top of `css/style.css` |
| Retailer buy links | Replace the `amazon.com/s?k=CRESCPEL` and `walmart.com/search?q=CRESCPEL` URLs with real product links |
| Product images | Drop real images into `assets/images/` and update the `<img src>` paths |
| Domain | Replace `https://www.crescpel.com/` in canonical/OG tags, `sitemap.xml`, and `robots.txt` |
| Contact form | Currently front-end only (shows a success message). Connect to a form service (Formspree, Netlify Forms, etc.) by setting the `<form>` `action`/`method` |

## SEO

- Unique `<title>` + meta description per page
- Canonical URLs, Open Graph / Twitter tags
- `robots.txt` + `sitemap.xml`
- JSON-LD: Organization (home) and FAQPage (FAQ)
- Semantic headings and descriptive `alt` text
