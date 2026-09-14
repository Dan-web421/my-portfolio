# Storyboard — Physics Education & Instructional Design Portfolio

## Purpose

This website is an individual assignment submission, "Create Interactive Content: Web Design Portfolio," for a Digital Instructional Design in Higher Education program. It showcases the designer's professional identity as a physics educator and researcher, knowledge of digital instructional design, ability to create interactive learning materials, application of visual literacy principles, ability to design accessible multimedia, and a set of teaching and research artifacts.

## Target audience

- Potential employers
- University colleagues
- Academic collaborators
- Students
- Educational technology professionals
- General professional visitors

## Website structure

A multi-page site with a persistent top navigation (collapsing to a hamburger menu on mobile) shared across every page. Each major section is its own HTML page, reached through ordinary links rather than same-page anchors:

1. **index.html** — Home: hero statement, physics/research/instructional-design integration line, and a Featured Work section linking into the Portfolio
2. **about.html** — About Me: biography and professional profile card
3. **teaching.html** — Teaching & Learning: course cards for Introduction to Nanophysics, Electrodynamics, and Formative Assessment, plus the Instructional Design Approach section
4. **portfolio.html** — the five interactive artifacts, plus the H5P Integration section
5. **research.html** — Research & Scientific Interests
6. **accessibility.html** — Accessibility & Inclusive Design, CARP Principles, and UDL
7. **cv.html** — Curriculum Vitae
8. **contact.html** — Contact form and details, plus Copyright & Fair Use

Every page shares the same header/navigation and footer. The active page is marked in navigation with bold text, an underline, and `aria-current="page"` — never color alone.

## Content sections and interactive components

| Section | Interactive component |
|---|---|
| From Bulk Materials to Quantum Dots | Slider driving an SVG diagram of particle size vs. energy-level spacing, plus a multiple-choice question |
| Surface-to-Volume Ratio | Buttons selecting a cube size; JavaScript computes surface area, volume, and ratio live; plus a conceptual question |
| Nanomaterials Formative Quiz | Six auto-generated questions (multiple choice, true/false, conceptual), live score, reset button |
| Reading a UV-Vis Spectrum | Clickable/keyboard-focusable points on an SVG curve reporting wavelength, absorbance, and interpretation |
| Visual Electrodynamics | Play/pause/reset controls animating perpendicular E and B field curves along a propagation axis |
| Accessibility Checklist | Toggle button revealing implemented accessibility features |

## Multimedia

Video, narrated presentation, animation, downloadable PDF, and H5P activities are represented as clearly labeled placeholders (no fabricated links or files) pending real assets.

## Accessibility

Perceivable / Operable / Understandable / Robust structure throughout: semantic HTML, ARIA labels and live regions, full keyboard operability, visible focus states, alt text and SVG descriptions, and respect for `prefers-reduced-motion`.

## Copyright / fair-use strategy

Original diagrams were created for every visual. No external images, lyrics, or copyrighted text are reproduced. A dedicated Copyright & Fair Use section states the policy and leaves clearly marked placeholders for attributing any external material added later.

## Design principles

A restrained academic-journal aesthetic: a serif display face for headings, a sans body face, and a monospace face for data/measurement labels; a paper-white background with ink-navy text and two functional accent colors (a spectroscopy teal used for interactive elements, an energy-level amber used for emphasis); left-aligned, single-column-width content; figures numbered like journal figures because the content is a genuine sequence of exhibits. CARP (Contrast, Alignment, Repetition, Proximity) is applied throughout and explained in its own section.
