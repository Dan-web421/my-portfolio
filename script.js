(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Mobile navigation ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Expandable artifact cards ---------------- */
  document.querySelectorAll(".artifact-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      btn.textContent = expanded ? "Expand" : "Collapse";
    });
  });

  /* ---------------- Generic quiz-option handler ---------------- */
  function wireQuizQuestion(container, onAnswered) {
    var buttons = container.querySelectorAll(".quiz-options button");
    var feedback = container.querySelector(".feedback");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        if (button.disabled) return;
        var correct = button.getAttribute("data-correct") === "true";
        buttons.forEach(function (b) {
          b.disabled = true;
          if (b.getAttribute("data-correct") === "true") {
            b.setAttribute("data-state", "correct");
          } else if (b === button) {
            b.setAttribute("data-state", "incorrect");
          }
        });
        if (feedback) {
          feedback.hidden = false;
          feedback.setAttribute("data-tone", correct ? "correct" : "incorrect");
          feedback.textContent = correct
            ? "Correct. " + (container.getAttribute("data-explain-correct") || "")
            : "Not quite. " + (container.getAttribute("data-explain-incorrect") || "The highlighted option shows the correct answer.");
        }
        if (typeof onAnswered === "function") onAnswered(correct);
      });
    });
  }

  /* Single-question artifacts */
  var qd = document.getElementById("quizQuantumDots");
  if (qd) {
    qd.setAttribute("data-explain-correct", "Confining the electron to a smaller space forces its allowed energy levels further apart.");
    qd.setAttribute("data-explain-incorrect", "Smaller confinement pushes energy levels further apart, not closer together.");
    wireQuizQuestion(qd);
  }
  var qsv = document.getElementById("quizSurfaceVolume");
  if (qsv) {
    qsv.setAttribute("data-explain-correct", "At the nanoscale, a much larger share of atoms sit at or near the surface, so surface-related behavior dominates.");
    qsv.setAttribute("data-explain-incorrect", "The key reason is the fraction of atoms located at the surface, not mass or a change in physical law.");
    wireQuizQuestion(qsv);
  }
  var quv = document.getElementById("quizUvVis");
  if (quv) {
    quv.setAttribute("data-explain-correct", "A UV-Vis spectrum shows optical absorption, which can relate to electronic transitions and optical properties when interpreted carefully.");
    quv.setAttribute("data-explain-incorrect", "A spectrum alone cannot confirm exact chemical identity or atomic structure; it shows optical absorption.");
    wireQuizQuestion(quv);
  }

  /* ---------------- Artifact 1: quantum confinement slider ---------------- */
  var sizeSlider = document.getElementById("sizeSlider");
  var sizeSliderVal = document.getElementById("sizeSliderVal");
  var materialShape = document.getElementById("materialShape");
  var energyLevels = document.getElementById("energyLevels");
  var confinementText = document.getElementById("confinementText");
  var regimeReadout = document.getElementById("regimeReadout");
  var spacingReadout = document.getElementById("spacingReadout");

  function updateConfinement(value) {
    var v = Number(value); // 0 = bulk, 100 = quantum dot
    var sizePx = 120 - v * 0.95; // shrink the square
    var half = sizePx / 2;
    var cx = 120, cy = 120;
    materialShape.setAttribute("x", cx - half);
    materialShape.setAttribute("y", cy - half);
    materialShape.setAttribute("width", sizePx);
    materialShape.setAttribute("height", sizePx);

    var lines = energyLevels.querySelectorAll("line");
    var baseGaps = [30, 30, 110]; // gaps between consecutive levels at bulk
    var spreadFactor = 1 + (v / 100) * 2.6;
    var y = 200;
    var ys = [200];
    for (var i = 0; i < 3; i++) {
      y = y - baseGaps[i] * (i === 2 ? spreadFactor : 1 + (v / 100) * 0.6);
      ys.push(y);
    }
    // ensure stays within viewbox
    var minY = 25;
    if (ys[3] < minY) {
      var scale = (ys[0] - minY) / (ys[0] - ys[3]);
      for (var j = 1; j < ys.length; j++) {
        ys[j] = ys[0] - (ys[0] - ys[j]) * scale;
      }
    }
    for (var k = 0; k < lines.length; k++) {
      lines[k].setAttribute("y1", ys[k]);
      lines[k].setAttribute("y2", ys[k]);
    }

    var label, regime, spacing, text;
    if (v < 15) {
      label = "Bulk material";
      regime = "Bulk";
      spacing = "Continuous";
      text = "At bulk size, energy levels are so closely spaced they form a continuous band.";
    } else if (v < 60) {
      label = "Nanostructure";
      regime = "Nanostructure";
      spacing = "Discrete, closely spaced";
      text = "As the material shrinks toward the nanoscale, the energy levels start to separate into distinguishable, discrete values.";
    } else {
      label = "Quantum dot";
      regime = "Quantum dot";
      spacing = "Discrete, widely spaced";
      text = "At quantum-dot size, confinement is strong: energy levels are clearly discrete and widely separated, and the gap grows further at higher energy.";
    }
    sizeSliderVal.textContent = label;
    regimeReadout.textContent = regime;
    spacingReadout.textContent = spacing;
    confinementText.textContent = text;
  }
  if (sizeSlider) {
    updateConfinement(sizeSlider.value);
    sizeSlider.addEventListener("input", function () { updateConfinement(sizeSlider.value); });
  }

  /* ---------------- Artifact 2: surface-to-volume calculator ---------------- */
  var edgeReadout = document.getElementById("edgeReadout");
  var areaReadout = document.getElementById("areaReadout");
  var volReadout = document.getElementById("volReadout");
  var ratioReadout = document.getElementById("ratioReadout");
  var cubeGroup = document.getElementById("cubeGroup");

  function formatNumber(n) {
    if (n >= 100) return n.toFixed(0);
    if (n >= 1) return n.toFixed(2);
    return n.toExponential(2);
  }

  function updateCube(edge) {
    var s = Number(edge);
    var area = 6 * s * s;
    var vol = s * s * s;
    var ratio = area / vol;
    edgeReadout.textContent = s;
    areaReadout.textContent = formatNumber(area);
    volReadout.textContent = formatNumber(vol);
    ratioReadout.textContent = formatNumber(ratio);
    // Visual scale: map edge (log-ish) to an on-screen size between 20 and 90
    var visualScale = Math.max(0.18, Math.min(1, Math.log(s + 1) / Math.log(11)));
    cubeGroup.setAttribute("transform", "translate(160,110) scale(" + visualScale.toFixed(2) + ")");
  }
  document.querySelectorAll("[data-cube]").forEach(function (btn) {
    btn.addEventListener("click", function () { updateCube(btn.getAttribute("data-cube")); });
  });
  if (document.getElementById("cubeSvg")) updateCube(10);

  /* ---------------- Artifact 3: formative quiz (6 questions) ---------------- */
  var formativeQuestions = [
    {
      text: "1. A quantum dot is best described as a:",
      options: [
        { label: "A. Bulk crystal with no special properties", correct: false },
        { label: "B. Nanoscale semiconductor structure showing quantum confinement", correct: true },
        { label: "C. Type of visible-light detector unrelated to size", correct: false }
      ],
      explainCorrect: "A quantum dot is a nanoscale semiconductor small enough that confinement effects change its electronic structure.",
      explainIncorrect: "Size and confinement are the defining features of a quantum dot."
    },
    {
      text: "2. True or False: Every nanoscale material automatically behaves as a quantum dot.",
      options: [
        { label: "True", correct: false },
        { label: "False", correct: true }
      ],
      explainCorrect: "Being nanoscale is necessary but not sufficient — quantum-dot behavior depends on the specific confinement and material.",
      explainIncorrect: "Nanoscale size alone does not guarantee quantum-dot behavior; the specific confinement and material matter."
    },
    {
      text: "3. As a cube's edge length increases, its surface-to-volume ratio:",
      options: [
        { label: "A. Increases", correct: false },
        { label: "B. Decreases", correct: true },
        { label: "C. Stays exactly the same", correct: false }
      ],
      explainCorrect: "Volume (s³) grows faster than surface area (6s²), so the ratio falls as the cube gets bigger.",
      explainIncorrect: "Because volume grows faster than surface area, the ratio falls — not rises or stays fixed — as the cube grows."
    },
    {
      text: "4. Which of these is a technique commonly used to characterize nanomaterials?",
      options: [
        { label: "A. UV-Vis spectroscopy", correct: true },
        { label: "B. Guessing based on color alone", correct: false },
        { label: "C. Measuring only total mass", correct: false }
      ],
      explainCorrect: "UV-Vis spectroscopy is a standard tool for probing the optical properties of nanomaterials.",
      explainIncorrect: "Spectroscopic techniques such as UV-Vis are the standard approach, not visual guessing or mass alone."
    },
    {
      text: "5. Conceptual question: Why might two samples of the same material but different nanoparticle sizes show different colors in solution?",
      options: [
        { label: "A. Because their electronic energy levels — and therefore the light they absorb — depend on particle size", correct: true },
        { label: "B. Because larger particles are always a darker shade of the same color", correct: false },
        { label: "C. Color in nanoparticle solutions is random and unrelated to physics", correct: false }
      ],
      explainCorrect: "Size-dependent confinement shifts the energy levels involved in absorption, which shifts which wavelengths of light are absorbed and which are transmitted or scattered.",
      explainIncorrect: "The physical link is between particle size, confinement, and which wavelengths of light are absorbed."
    },
    {
      text: "6. True or False: A material's optical properties can change as its size is reduced to the nanoscale, even though its chemical composition stays the same.",
      options: [
        { label: "True", correct: true },
        { label: "False", correct: false }
      ],
      explainCorrect: "Composition can stay fixed while confinement changes the electronic structure, which changes optical behavior.",
      explainIncorrect: "Composition can stay the same while confinement still changes electronic structure and optical behavior."
    }
  ];

  var formativeContainer = document.getElementById("formativeQuiz");
  var quizScoreEl = document.getElementById("quizScore");
  var quizLiveRegion = document.getElementById("quizLiveRegion");
  var formativeScore = 0;
  var formativeAnswered = 0;

  function buildFormativeQuiz() {
    formativeContainer.innerHTML = "";
    formativeScore = 0;
    formativeAnswered = 0;
    quizScoreEl.textContent = "0 / " + formativeQuestions.length;

    formativeQuestions.forEach(function (q, idx) {
      var wrap = document.createElement("div");
      wrap.className = "quiz-question";
      wrap.setAttribute("data-explain-correct", q.explainCorrect);
      wrap.setAttribute("data-explain-incorrect", q.explainIncorrect);

      var p = document.createElement("p");
      p.className = "q-text";
      p.textContent = q.text;
      wrap.appendChild(p);

      var ul = document.createElement("ul");
      ul.className = "quiz-options";
      q.options.forEach(function (opt) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = opt.label;
        btn.setAttribute("data-correct", opt.correct ? "true" : "false");
        li.appendChild(btn);
        ul.appendChild(li);
      });
      wrap.appendChild(ul);

      var feedback = document.createElement("div");
      feedback.className = "feedback";
      feedback.hidden = true;
      wrap.appendChild(feedback);

      formativeContainer.appendChild(wrap);

      wireQuizQuestion(wrap, function (correct) {
        formativeAnswered++;
        if (correct) formativeScore++;
        quizScoreEl.textContent = formativeScore + " / " + formativeQuestions.length;
        if (quizLiveRegion) {
          quizLiveRegion.textContent = (correct ? "Correct. " : "Incorrect. ") + "Score now " + formativeScore + " out of " + formativeQuestions.length + ".";
        }
      });
    });
  }
  if (formativeContainer) buildFormativeQuiz();

  var quizResetBtn = document.getElementById("quizReset");
  if (quizResetBtn) quizResetBtn.addEventListener("click", buildFormativeQuiz);

  /* ---------------- Artifact 4: UV-Vis spectrum ---------------- */
  var wlReadout = document.getElementById("wlReadout");
  var absReadout = document.getElementById("absReadout");
  var spectrumNote = document.getElementById("spectrumNote");

  function selectSpectrumPoint(point) {
    document.querySelectorAll(".spectrum-point").forEach(function (p) { p.setAttribute("r", "7"); });
    point.setAttribute("r", "9");
    wlReadout.textContent = point.getAttribute("data-wl") + " nm";
    absReadout.textContent = point.getAttribute("data-abs");
    spectrumNote.textContent = point.getAttribute("data-note");
  }
  document.querySelectorAll(".spectrum-point").forEach(function (point) {
    point.addEventListener("click", function () { selectSpectrumPoint(point); });
    point.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectSpectrumPoint(point);
      }
    });
  });

  /* ---------------- Artifact 5: electrodynamics animation ---------------- */
  var eField = document.getElementById("eField");
  var bField = document.getElementById("bField");
  var edPlay = document.getElementById("edPlay");
  var edPause = document.getElementById("edPause");
  var edReset = document.getElementById("edReset");
  var edRunning = false;
  var edOffset = 0;
  var edRAF = null;

  var eBasePoints = [
    [20, 110], [60, 20], [100, 110], [140, 200], [180, 110],
    [220, 20], [260, 110], [300, 200], [340, 110], [380, 20], [420, 110]
  ];
  var bBasePoints = [
    [20, 110], [60, 110], [100, 165], [140, 110], [180, 55],
    [220, 110], [260, 165], [300, 110], [340, 55], [380, 110], [420, 110]
  ];

  function buildPath(points, phaseShift) {
    var d = "M" + points[0][0] + "," + points[0][1];
    for (var i = 1; i < points.length; i += 2) {
      var cp = points[i];
      var end = points[i + 1] || points[i];
      d += " Q" + cp[0] + "," + (cp[1] + phaseShift) + " " + end[0] + "," + end[1];
    }
    return d;
  }

  function renderFields(t) {
    // Animate by sliding a phase term into the control-point offsets.
    var amp = 90;
    var wobble = Math.sin(t) * amp;
    var eOffset = wobble - amp; // baseline keeps original look at t=0
    var bOffset = -wobble - amp * -1;
    var ePoints = eBasePoints.map(function (pt, i) {
      return i % 2 === 1 ? [pt[0], 110 + (pt[1] - 110) * Math.cos(t)] : pt;
    });
    var bPoints = bBasePoints.map(function (pt, i) {
      return i % 2 === 1 ? [pt[0], 110 + (pt[1] - 110) * Math.cos(t + Math.PI)] : pt;
    });
    eField.setAttribute("d", buildPath(ePoints, 0));
    bField.setAttribute("d", buildPath(bPoints, 0));
  }

  function edTick() {
    edOffset += 0.05;
    renderFields(edOffset);
    edRAF = window.requestAnimationFrame(edTick);
  }
  function edStart() {
    if (edRunning || prefersReducedMotion) return;
    edRunning = true;
    edTick();
  }
  function edStop() {
    edRunning = false;
    if (edRAF) window.cancelAnimationFrame(edRAF);
  }
  function edResetFields() {
    edStop();
    edOffset = 0;
    renderFields(0);
  }
  if (edPlay) edPlay.addEventListener("click", edStart);
  if (edPause) edPause.addEventListener("click", edStop);
  if (edReset) edReset.addEventListener("click", edResetFields);
  if (eField && bField) {
    renderFields(0);
    if (prefersReducedMotion && edPlay) {
      edPlay.disabled = true;
      edPlay.title = "Animation disabled by your reduced-motion preference";
    }
  }

  /* ---------------- Accessibility checklist toggle ---------------- */
  var checklistToggle = document.getElementById("checklistToggle");
  var checklist = document.getElementById("a11yChecklist");
  if (checklistToggle && checklist) {
    checklistToggle.addEventListener("click", function () {
      var expanded = checklistToggle.getAttribute("aria-expanded") === "true";
      checklistToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      checklist.hidden = expanded;
    });
  }

  /* ---------------- Contact form (static demonstration) ---------------- */
  var contactForm = document.getElementById("contactForm");
  var contactLiveRegion = document.getElementById("contactLiveRegion");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (contactLiveRegion) {
        contactLiveRegion.textContent = "This is a static demonstration form and does not send email. Please use the mailto link instead.";
      }
    });
  }
})();
