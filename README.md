# Daniel — Physics Education & Instructional Design Portfolio

## How to open the website

Double-click `index.html`, or open it from a browser with **File → Open**. No build step, server, or install is required. The site also works when uploaded to any static web host. Every page is a separate HTML file connected by ordinary links, so navigation works whether the site is opened locally or hosted.

## Folder structure

```
index.html               Home
about.html                About Me
teaching.html             Teaching & Learning
portfolio.html            Portfolio (all five interactive artifacts + H5P section)
research.html             Research & Scientific Interests
accessibility.html        Accessibility, CARP, and UDL
cv.html                    CV
contact.html               Contact + Copyright & Fair Use
style.css                 Shared styling and design tokens
script.js                 Shared interactivity (guards against missing elements per page)
assets/
  images/                 Photos, screenshots
  icons/                  Small icon graphics, if any are added
  diagrams/               Exported/static versions of diagrams
  video/                  Instructional video, narrated presentation
  documents/              CV.pdf and any downloadable PDFs
STORYBOARD.md             Planning document
REFLECTION.md             Assignment reflection
README.md                 This file
SUBMISSION_CHECKLIST.md   Final pre-submission checklist
```

Every page shares the same header, navigation, and footer. The navigation link for the page currently open is marked both with bold text and an underline (and `aria-current="page"`) so the active page is clear without relying on color alone. `script.js` is loaded on every page but only wires up the elements that exist on that page, so there are no console errors on pages without a particular quiz or animation.

## How to replace placeholders

Search `about.html`, `cv.html`, and `contact.html` for square-bracket placeholders and replace each with real information:

- `[Professional Email]` — About Me profile card, Contact page, and the `mailto:` link on Contact
- `[ORCID Profile]`, `[Google Scholar Profile]`, `[LinkedIn Profile]` — About Me and Contact pages
- CV page text blocks marked `[Add ...]`

Also update the `<span class="placeholder-tag">` elements once the item they describe (CV file, publications, external attributions) has been added — either remove the tag or change its wording.

## How to add the CV

1. Save the CV as `assets/documents/CV.pdf`.
2. The **Download CV** button on `cv.html` already points at that path — no HTML change needed.
3. Remove the "CV PDF — Add file before publishing" tag next to the button.

## How to add images

1. Place image files in `assets/images/` (photos) or `assets/diagrams/` (exported diagram graphics).
2. Reference them with a relative path, e.g. `<img src="assets/images/portrait.jpg" alt="Describe the image">`.
3. Always write a meaningful `alt` attribute — this site's accessibility claims depend on it.

## How to add videos

1. Place video files in `assets/video/`.
2. Add a `<video>` element wherever a video placeholder currently sits (for example on `portfolio.html`), e.g.:
   ```html
   <video controls>
     <source src="assets/video/quantum-confinement.mp4" type="video/mp4">
     <track kind="captions" src="assets/video/quantum-confinement.vtt" srclang="en" label="English captions">
   </video>
   ```
3. Provide a caption `.vtt` file and link a transcript nearby — both are called for on the Accessibility page.

## How to embed H5P

1. Publish or export the H5P activity from your LMS and obtain its embed URL.
2. In `portfolio.html`, find the HTML comment inside the `#h5p` section that begins "To embed real H5P content..."
3. Replace the comment with the real `<iframe>` tag it shows, filling in `H5P_URL_HERE`.
4. Update or remove the disabled placeholder buttons above it once real activities are linked.

## Adding a new page

1. Copy the header/navigation block and footer from any existing page (they are identical everywhere).
2. Add a link to the new page inside every page's `<nav>` list, and mark it `class="active" aria-current="page"` only on the new page itself.
3. Keep the `<link rel="stylesheet" href="style.css">` and `<script src="script.js"></script>` includes so the new page matches the site's look and behavior.

## How to publish the website online

Any static host will work, for example:

- **GitHub Pages** — push this folder to a repository and enable Pages on the `main` branch.
- **Netlify / Vercel** — drag-and-drop the folder (or connect the repository) for an instant deploy.
- **University web hosting** — upload the folder contents via FTP/SFTP to the public web root.

No server-side code, database, or build process is required — it is a static site.
