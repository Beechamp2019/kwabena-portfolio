# Kwabena Adu Darko-Asare — Portfolio

A single-page, plain HTML/CSS/JS portfolio site. No build step required.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Customize

Look for `<!-- EDIT ME -->` comments in [index.html](index.html) — they mark
the placeholder content you'll want to replace:

- **About** — expand the bio and "Interests" fact.
- **Projects** — swap the 3 placeholder cards for your real projects
  (title, description, tags, live/code links).
- **Skills** — replace the sample skill pills with your actual tools.
- **Contact** — add your real GitHub/LinkedIn URLs.

Colors, fonts, and spacing live in [styles.css](styles.css) as CSS variables
at the top of the file (`:root { --accent: ... }` etc.) if you want to
retheme it.

## Deploy

This is static, so any of these work with zero config:

- **GitHub Pages** — push to a repo, enable Pages on the `main` branch.
- **Netlify / Vercel** — drag-and-drop the folder or connect the repo.
