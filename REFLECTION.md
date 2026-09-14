# Reflection

## What was the biggest design challenge?

The hardest problem was not visual — it was deciding how much interactivity a single concept needed before it helped rather than distracted. Quantum confinement, for example, could have been presented as a static diagram with a caption. Turning it into a slider that redraws the energy-level spacing in real time meant deciding, in advance, exactly which visual variable (line spacing) should map to which physical variable (particle size), and keeping that mapping conceptually honest rather than pretending to compute exact energies for an unspecified material.

## How was the challenge overcome?

The fix was to separate "what is true in general" from "what would require real material parameters." Each interactive artifact was scoped to a single, defensible learning objective, and the JavaScript behind it was written to demonstrate a trend (energy levels spread apart as size decreases; surface-to-volume ratio rises as a cube shrinks) rather than to output a specific numeric prediction that would misrepresent precision the model does not have. Labeling the UV-Vis spectrum explicitly as an "illustrative educational spectrum" served the same purpose: it let the interaction be genuinely useful for building intuition without implying it was real experimental data.

## How did learning about visual design and instructional design influence the website?

Instructional-design reading on multimedia learning (see, e.g., Mayer, 2020; Clark & Mayer, 2016) argues that pairing a visual with a tightly coupled explanation, rather than separating them, reduces the cognitive load of relating the two. That shaped a concrete layout rule used throughout the site: every diagram sits immediately beside the text or control that explains it, and every quiz question sits immediately beside its feedback. Malamed's (2015) emphasis on visuals that carry meaning rather than decorate a page, and Allen's (2016) case for meaningful practice over passive reading, pushed the design away from static illustrations and toward manipulable diagrams with a question attached to each one.

## How could the website be used or improved in the future?

As built, the site is ready to receive real content: a CV PDF, an actual instructional video with captions and a transcript, real H5P activity URLs, and verified publication and dataset links, all of which are currently clearly marked placeholders rather than fabricated entries. Future iterations could extend the quantum-confinement and surface-to-volume simulations to accept a specific material's parameters for a more advanced course, add a glossary linked from first use of each technical term, and expand the formative quiz bank so that returning students see a different subset of questions on each visit.

**References**

Allen, M. W. (2016). *Michael Allen's Guide to e-Learning*. Wiley.
Clark, R. C., & Mayer, R. E. (2016). *e-Learning and the Science of Instruction*. Wiley.
Malamed, C. (2015). *Visual Design Solutions*. Wiley.
Mayer, R. E. (2020). *Multimedia Learning*. Cambridge University Press.
