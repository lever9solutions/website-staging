document.documentElement.classList.add("motion");

const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const shellHeader = document.querySelector("[data-site-header]");
if (shellHeader) {
  const current = shellHeader.dataset.current || "";
  const nav = [
    ["services", "services.html", "Services"],
    ["process", "how-we-work.html", "How We Work"],
    ["capabilities", "capabilities.html", "Capabilities"],
    ["industries", "industries.html", "Industries"],
    ["about", "about.html", "About"],
  ];
  shellHeader.outerHTML = `
    <header class="site-header">
      <div class="nav-inner">
        <a class="brand" href="index.html" aria-label="lever9 home"><svg class="brand-mark" viewBox="-0.5 -0.5 34 34" fill="none" aria-hidden="true"><circle cx="3.5" cy="3.5" r="3.5" fill="currentColor" /><circle cx="3.5" cy="16.5" r="3.5" fill="currentColor" /><circle cx="3.5" cy="29.5" r="3.5" fill="currentColor" /><circle cx="16.5" cy="3.5" r="3.5" fill="currentColor" /><circle cx="16.5" cy="16.5" r="3.5" fill="currentColor" /><circle cx="16.5" cy="29.5" r="3.5" fill="currentColor" /><circle cx="29.5" cy="29.5" r="3.5" fill="currentColor" /><rect x="26" y="0" width="7" height="20" rx="3.5" fill="currentColor" /></svg><span>lever9</span></a>
        <nav class="site-nav" aria-label="Primary navigation">${nav.map(([key, href, label]) => `<a href="${href}" ${current === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
        <div class="header-actions"><a class="header-link" href="contact.html#schedule">Start a Project</a></div>
        <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
        <div class="scroll-progress" aria-hidden="true"></div>
      </div>
    </header>
    <nav class="mobile-menu" aria-label="Mobile navigation">
      <a href="services.html">Services</a><a href="how-we-work.html">How We Work</a><a href="capabilities.html">Capabilities</a><a href="industries.html">Industries</a><a href="about.html">About</a><a href="enterprise.html">Enterprise</a><a href="readiness.html">AI Readiness</a><a href="contact.html#schedule">Start a Project</a><small>Custom systems / architecture + engineering + construction</small>
    </nav>
    ${current === "contact" ? "" : '<a class="mobile-sticky-cta" href="contact.html#schedule">Start a Project</a>'}`;
}

const shellFooter = document.querySelector("[data-site-footer]");
if (shellFooter) {
  shellFooter.outerHTML = `
    <footer class="site-footer">
      <div class="footer-brand"><p class="eyebrow brand-name">lever9</p><h2>Built around how the work actually moves.</h2></div>
      <div class="footer-column"><h3>Offer</h3><a href="services.html">Services</a><a href="capabilities.html">Capabilities</a><a href="included.html">What Is Included</a><a href="enterprise.html">Enterprise</a><a href="industries.html">Industries</a></div>
      <div class="footer-column"><h3>Company</h3><a href="how-we-work.html">How We Work</a><a href="about.html">About</a></div>
      <div class="footer-column"><h3>Resources</h3><a href="readiness.html">AI Readiness</a><a href="roi.html">ROI Calculator</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div>
      <div class="footer-base"><span>&copy; <span data-current-year></span> <span class="brand-name">lever9</span></span><span>San Francisco / AI systems for AEC</span></div>
    </footer>`;
}

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };
  menuButton.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

document.querySelectorAll(".page-hero").forEach((hero) => {
  if (hero.hasAttribute("data-hex-hero")) return;
  if (!hero.querySelector(".binary-layer")) {
    const binary = document.createElement("div");
    binary.className = "binary-layer";
    binary.dataset.binary = "";
    binary.setAttribute("aria-hidden", "true");
    hero.prepend(binary);
  }
  const art = hero.querySelector(".page-hero-art");
  if (art && !art.querySelector(".ascii-visual")) {
    const ascii = document.createElement("pre");
    ascii.className = "ascii-visual";
    ascii.dataset.ascii = "terrain";
    ascii.setAttribute("aria-hidden", "true");
    art.appendChild(ascii);
  }
});

const makeBinary = (element) => {
  const columns = Math.max(40, Math.ceil(element.clientWidth / 5.8));
  const rows = Math.max(30, Math.ceil(element.clientHeight / 9.5));
  let output = "";
  let state = 127;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      state = (state * 1103515245 + 12345) & 0x7fffffff;
      output += state % 5 === 0 ? "1" : "0";
      if (column % 2 === 1) output += " ";
    }
    output += "\n";
  }
  element.textContent = output;
};

const asciiCharacters = "@%#*+=-:.";
const makeAscii = (element) => {
  const mobile = window.innerWidth <= 760;
  const columns = mobile ? 62 : 108;
  const rows = mobile ? 82 : 69;
  let output = "";
  for (let row = 0; row < rows; row += 1) {
    const y = (row / (rows - 1)) * 2 - 1;
    for (let column = 0; column < columns; column += 1) {
      const x = (column / (columns - 1)) * 2 - 1;
      const head = ((x - 0.22) / 0.28) ** 2 + ((y + 0.48) / 0.27) ** 2 < 1;
      const hardHat = ((x - 0.22) / 0.38) ** 2 + ((y + 0.61) / 0.2) ** 2 < 1 && y < -0.49;
      const brim = y > -0.49 && y < -0.455 && x > -0.18 && x < 0.65;
      const neck = x > 0.04 && x < 0.37 && y > -0.27 && y < -0.1;
      const leftEdge = -0.36 - Math.sin((y + 0.2) * 2.1) * 0.08;
      const rightEdge = 0.68 - Math.cos(y * 1.9) * 0.07;
      const torso = y > -0.14 && y < 0.98 && x > leftEdge && x < rightEdge;
      const arm = ((x + 0.34) / 0.24) ** 2 + ((y - 0.25) / 0.58) ** 2 < 1 && x < -0.18;
      const plan = x > -0.83 && x < -0.2 && y > 0.08 && y < 0.52 && Math.abs(y - (0.31 - x * 0.08)) < 0.2;
      const figure = head || hardHat || brim || neck || torso || arm;
      const texture = Math.abs(Math.sin((x * x * 8.4 + y * y * 6.7 + x * 2.8 - y * 1.4) * Math.PI));
      const contour = Math.abs(Math.sin((x * 5.1 + y * 7.3) * Math.PI));
      const surveyLine = plan && (Math.abs(y - (0.18 - x * 0.18)) < 0.018 || Math.abs(y - (0.42 + x * 0.12)) < 0.018);
      if (figure && (texture > 0.13 || contour > 0.78)) {
        const intensity = Math.floor(clamp((texture * 0.72 + contour * 0.28)) * (asciiCharacters.length - 1));
        output += asciiCharacters[intensity];
      } else if (surveyLine) {
        output += "+";
      } else {
        output += " ";
      }
    }
    output += "\n";
  }
  element.textContent = output;
};

const renderGeneratedFields = () => {
  document.querySelectorAll("[data-binary]").forEach(makeBinary);
  document.querySelectorAll("[data-ascii]").forEach(makeAscii);
};
renderGeneratedFields();

const wireframeCanvases = [...document.querySelectorAll("[data-wireframe]")];
const workflowBranchCanvases = [...document.querySelectorAll("[data-workflow-branch]")];
const workflowPointerStates = new WeakMap();

workflowBranchCanvases.forEach((canvas) => {
  const interactionSurface = canvas.closest(".gamut-hero, .page-hero, .market-signal, .system-thesis, .offer-field, .service-visual, .feature-card, .cta") || canvas;
  const state = {
    clientX: 0,
    clientY: 0,
    x: 0,
    y: 0,
    strength: 0,
    targetStrength: 0,
    initialized: false,
  };
  workflowPointerStates.set(canvas, state);
  interactionSurface.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    state.clientX = event.clientX;
    state.clientY = event.clientY;
    state.targetStrength = 1;
  }, { passive: true });
  interactionSurface.addEventListener("pointerleave", () => {
    state.targetStrength = 0;
  });
});

const canvasContexts = new WeakMap();
const wireframeLayouts = new WeakMap();

const prepareCanvas = (canvas) => {
  const rect = canvas.getBoundingClientRect();
  const maxRatio = canvas.closest(".capability-grid, .service-visual")
    ? 1.5
    : canvas.matches("[data-workflow-branch]")
      ? 1.5
      : 2;
  const ratio = Math.min(window.devicePixelRatio || 1, maxRatio);
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
  }
  let context = canvasContexts.get(canvas);
  if (!context) {
    context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    canvasContexts.set(canvas, context);
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  return { context, width, height, rect };
};

const makeEarthPoint = (longitude, latitude) => {
  const latitudeRadians = latitude * Math.PI / 180;
  return {
    longitude: longitude * Math.PI / 180,
    cosineLatitude: Math.cos(latitudeRadians),
    sineLatitude: Math.sin(latitudeRadians),
  };
};

let earthLandRings = [];
if (wireframeCanvases.some((canvas) => canvas.dataset.wireframe === "globe")) {
  fetch("public/data/land-110m.json")
    .then((response) => {
      if (!response.ok) throw new Error("Earth geometry unavailable");
      return response.json();
    })
    .then((topology) => {
      const [scaleX, scaleY] = topology.transform.scale;
      const [translateX, translateY] = topology.transform.translate;
      const decodedArcs = topology.arcs.map((arc) => {
        let x = 0;
        let y = 0;
        return arc.map(([deltaX, deltaY]) => {
          x += deltaX;
          y += deltaY;
          return makeEarthPoint(x * scaleX + translateX, y * scaleY + translateY);
        });
      });
      const landObject = topology.objects.land;
      const geometries = landObject.type === "GeometryCollection" ? landObject.geometries : [landObject];
      const rings = [];
      geometries.forEach((geometry) => {
        const polygons = geometry.type === "MultiPolygon" ? geometry.arcs : [geometry.arcs];
        polygons.forEach((polygon) => polygon.forEach((arcReferences) => {
          const ring = [];
          arcReferences.forEach((reference) => {
            const source = decodedArcs[reference < 0 ? ~reference : reference];
            const points = reference < 0 ? [...source].reverse() : source;
            ring.push(...(ring.length ? points.slice(1) : points));
          });
          if (ring.length > 2) rings.push(ring);
        }));
      });
      earthLandRings = rings;
    })
    .catch(() => {});
}

const earthGraticules = [];
[-60, -30, 0, 30, 60].forEach((latitude) => {
  earthGraticules.push(Array.from({ length: 121 }, (_, index) => makeEarthPoint(-180 + index * 3, latitude)));
});
for (let longitude = -150; longitude <= 180; longitude += 30) {
  earthGraticules.push(Array.from({ length: 61 }, (_, index) => makeEarthPoint(longitude, -90 + index * 3)));
}

const drawMesh = (canvas, phase, variant) => {
  const { context, width, height } = prepareCanvas(canvas);
  const columns = variant === "terrain" ? 17 : 14;
  const rows = variant === "terrain" ? 13 : 11;
  const points = [];
  for (let row = 0; row < rows; row += 1) {
    const line = [];
    const v = row / (rows - 1);
    for (let column = 0; column < columns; column += 1) {
      const u = column / (columns - 1);
      const wave = Math.sin(u * 8 + v * 3 + phase) * 3 + Math.cos(v * 9 - phase) * 2;
      const hill = variant === "terrain"
        ? Math.exp(-(((u - 0.48) / 0.23) ** 2 + ((v - 0.48) / 0.33) ** 2)) * height * 0.25
        : Math.sin((u + v) * Math.PI) * height * 0.035;
      const skew = variant === "connections" ? (v - 0.5) * width * 0.1 : 0;
      line.push({
        x: width * (0.09 + u * 0.82) + skew + wave,
        y: height * (0.14 + v * 0.68) - hill + wave * 0.45,
      });
    }
    points.push(line);
  }

  context.lineWidth = 0.75;
  context.strokeStyle = "rgba(55, 65, 81, .62)";
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const point = points[row][column];
      if (column < columns - 1) {
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(points[row][column + 1].x, points[row][column + 1].y);
        context.stroke();
      }
      if (row < rows - 1) {
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(points[row + 1][column].x, points[row + 1][column].y);
        context.stroke();
      }
      if (row < rows - 1 && column < columns - 1) {
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(points[row + 1][column + 1].x, points[row + 1][column + 1].y);
        context.stroke();
      }
    }
  }

  if (variant === "terrain") {
    context.fillStyle = "rgba(77, 141, 255, .2)";
    for (let row = 4; row < 8; row += 1) {
      for (let column = 5; column < 9; column += 1) {
        const a = points[row][column];
        const b = points[row][column + 1];
        const c = points[row + 1][column + 1];
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.lineTo(c.x, c.y);
        context.closePath();
        context.fill();
      }
    }
  }
};

const drawGlobe = (canvas, phase) => {
  const { context, width, height } = prepareCanvas(canvas);
  const radius = Math.min(width, height) * .29;
  const centerX = width * .5;
  const centerY = height * .47;
  const rotation = reducedMotion ? -.35 : phase * .13 - .35;
  const axialTilt = -.12;
  const cosineTilt = Math.cos(axialTilt);
  const sineTilt = Math.sin(axialTilt);

  const project = (point) => {
    const longitude = point.longitude + rotation;
    const x = point.cosineLatitude * Math.sin(longitude);
    const baseY = -point.sineLatitude;
    const baseZ = point.cosineLatitude * Math.cos(longitude);
    const y = baseY * cosineTilt - baseZ * sineTilt;
    const z = baseY * sineTilt + baseZ * cosineTilt;
    return { x, y, z, screenX: centerX + x * radius, screenY: centerY + y * radius };
  };
  const horizonIntersection = (from, to) => {
    const ratio = from.z / (from.z - to.z);
    const x = from.x + (to.x - from.x) * ratio;
    const y = from.y + (to.y - from.y) * ratio;
    const magnitude = Math.hypot(x, y) || 1;
    return { x: x / magnitude, y: y / magnitude, z: 0, screenX: centerX + x / magnitude * radius, screenY: centerY + y / magnitude * radius };
  };
  const visibleRuns = (ring) => {
    const points = ring.map(project);
    const hiddenIndex = points.findIndex((point) => point.z <= 0);
    if (hiddenIndex === -1) return [{ points, closed: true }];
    const ordered = Array.from({ length: points.length + 1 }, (_, index) => points[(hiddenIndex + index) % points.length]);
    const runs = [];
    let active = [];
    for (let index = 0; index < ordered.length - 1; index += 1) {
      const from = ordered[index];
      const to = ordered[index + 1];
      if (from.z <= 0 && to.z > 0) active = [horizonIntersection(from, to), to];
      else if (from.z > 0 && to.z > 0) {
        if (!active.length) active.push(from);
        active.push(to);
      } else if (from.z > 0 && to.z <= 0) {
        if (!active.length) active.push(from);
        active.push(horizonIntersection(from, to));
        runs.push({ points: active, closed: false });
        active = [];
      }
    }
    return runs;
  };
  const tracePoints = (points, close = false) => {
    context.beginPath();
    points.forEach((point, index) => {
      if (index === 0) context.moveTo(point.screenX, point.screenY);
      else context.lineTo(point.screenX, point.screenY);
    });
    if (close) context.closePath();
  };

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.arc(centerX, centerY, radius + 7, 0, Math.PI * 2);
  context.strokeStyle = "rgba(77, 141, 255, .08)";
  context.lineWidth = 10;
  context.stroke();

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.clip();
  const ocean = context.createRadialGradient(centerX - radius * .35, centerY - radius * .4, 2, centerX, centerY, radius);
  ocean.addColorStop(0, "rgba(255, 255, 255, .94)");
  ocean.addColorStop(.7, "rgba(238, 244, 251, .72)");
  ocean.addColorStop(1, "rgba(218, 229, 242, .66)");
  context.fillStyle = ocean;
  context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

  context.strokeStyle = "rgba(69, 84, 105, .2)";
  context.lineWidth = .55;
  earthGraticules.forEach((line) => {
    let drawing = false;
    context.beginPath();
    line.forEach((point) => {
      const projected = project(point);
      if (projected.z <= 0) {
        drawing = false;
        return;
      }
      if (!drawing) context.moveTo(projected.screenX, projected.screenY);
      else context.lineTo(projected.screenX, projected.screenY);
      drawing = true;
    });
    context.stroke();
  });

  earthLandRings.forEach((ring) => {
    visibleRuns(ring).forEach((run) => {
      if (run.points.length < 3) return;
      tracePoints(run.points, run.closed);
      if (!run.closed) {
        const start = run.points[0];
        const end = run.points.at(-1);
        const startAngle = Math.atan2(start.y, start.x);
        const endAngle = Math.atan2(end.y, end.x);
        let delta = startAngle - endAngle;
        while (delta > Math.PI) delta -= Math.PI * 2;
        while (delta < -Math.PI) delta += Math.PI * 2;
        const steps = Math.max(2, Math.ceil(Math.abs(delta) / .12));
        for (let index = 1; index <= steps; index += 1) {
          const angle = endAngle + delta * (index / steps);
          context.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        }
        context.closePath();
      }
      context.fillStyle = "rgba(104, 137, 178, .15)";
      context.fill();

      tracePoints(run.points, run.closed);
      context.strokeStyle = "rgba(53, 70, 94, .68)";
      context.lineWidth = .8;
      context.stroke();
    });
  });
  context.restore();

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.strokeStyle = "rgba(52, 66, 86, .76)";
  context.lineWidth = .95;
  context.stroke();
  context.beginPath();
  context.arc(centerX, centerY, radius - 2.5, -1.15, .55);
  context.strokeStyle = "rgba(77, 141, 255, .42)";
  context.lineWidth = .8;
  context.stroke();
  context.restore();
};

const drawIntegrationSphere = (canvas, phase) => {
  const { context, width, height, rect } = prepareCanvas(canvas);
  const centerX = width * .5;
  const centerY = height * .51;
  const radius = Math.min(width, height) * .18;
  const layoutKey = `${width}x${height}`;
  let layout = wireframeLayouts.get(canvas);
  if (!layout || layout.key !== layoutKey) {
    const nodes = [...canvas.closest(".integration-sphere-stage").querySelectorAll("[data-integration-node]")]
      .map((node) => {
        const nodeRect = node.getBoundingClientRect();
        return {
          x: nodeRect.left - rect.left + nodeRect.width / 2,
          y: nodeRect.top - rect.top + nodeRect.height / 2,
        };
      });
    layout = { key: layoutKey, nodes };
    wireframeLayouts.set(canvas, layout);
  }
  const { nodes } = layout;

  context.save();
  context.lineCap = "round";
  nodes.forEach((node, index) => {
    const angle = Math.atan2(node.y - centerY, node.x - centerX);
    const start = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
    const midpoint = {
      x: start.x + (node.x - start.x) * .56,
      y: start.y + (node.y - start.y) * .56,
    };
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(midpoint.x, midpoint.y);
    context.lineTo(node.x, node.y);
    context.strokeStyle = index % 3 === 0 ? "rgba(77, 141, 255, .52)" : "rgba(87, 102, 124, .42)";
    context.lineWidth = index % 3 === 0 ? 1 : .75;
    context.stroke();

    context.fillStyle = index % 3 === 0 ? "rgba(77, 141, 255, .9)" : "rgba(94, 107, 126, .68)";
    context.beginPath();
    context.arc(start.x, start.y, index % 3 === 0 ? 2.2 : 1.6, 0, Math.PI * 2);
    context.fill();
  });

  context.strokeStyle = "rgba(55, 65, 81, .72)";
  context.lineWidth = .78;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.stroke();

  [-.66, -.33, 0, .33, .66].forEach((offset) => {
    context.beginPath();
    context.ellipse(
      centerX,
      centerY + radius * offset,
      radius * Math.sqrt(1 - offset ** 2),
      radius * .2,
      0,
      0,
      Math.PI * 2,
    );
    context.stroke();
  });

  [-.64, -.32, 0, .32, .64].forEach((offset) => {
    context.beginPath();
    context.ellipse(centerX, centerY, radius * .3, radius, offset * .72 + phase * .23, 0, Math.PI * 2);
    context.stroke();
  });

  context.strokeStyle = "rgba(77, 141, 255, .26)";
  for (let index = 0; index < 9; index += 1) {
    const startAngle = index * 2.31 + phase * .31;
    const endAngle = startAngle + 1.64;
    context.beginPath();
    context.moveTo(centerX + Math.cos(startAngle) * radius, centerY + Math.sin(startAngle) * radius);
    context.lineTo(centerX + Math.cos(endAngle) * radius, centerY + Math.sin(endAngle) * radius);
    context.stroke();
  }

  context.strokeStyle = "rgba(77, 141, 255, .5)";
  context.lineWidth = 1;
  context.beginPath();
  context.ellipse(centerX, centerY, radius * .3, radius, phase * .23, 0, Math.PI * 2);
  context.stroke();

  context.fillStyle = "rgba(77, 141, 255, .92)";
  context.shadowColor = "rgba(77, 141, 255, .5)";
  context.shadowBlur = 8;
  context.beginPath();
  context.arc(centerX, centerY, 2.6, 0, Math.PI * 2);
  context.fill();
  context.restore();
};

const drawAgentHierarchy = (canvas, phase) => {
  const { context, width, height, rect } = prepareCanvas(canvas);
  const stage = canvas.closest(".agent-hierarchy-stage");
  if (!stage) return;

  const layoutKey = `${width}x${height}`;
  let layout = wireframeLayouts.get(canvas);
  if (!layout || layout.key !== layoutKey) {
    const nodes = new Map([...stage.querySelectorAll("[data-hierarchy-node]")].map((node) => {
      const nodeRect = node.getBoundingClientRect();
      return [node.dataset.hierarchyNode, {
        x: nodeRect.left - rect.left + nodeRect.width / 2,
        top: nodeRect.top - rect.top,
        bottom: nodeRect.bottom - rect.top,
      }];
    }));
    layout = { key: layoutKey, nodes };
    wireframeLayouts.set(canvas, layout);
  }
  const { nodes } = layout;

  const edgeSpecs = [
    ["task", "hermes", .01, .18],
    ["hermes", "atlas", .22, .49],
    ["hermes", "plato", .25, .52],
    ["hermes", "daedalus", .28, .55],
    ["atlas", "result", .58, .88],
    ["plato", "result", .61, .91],
    ["daedalus", "result", .64, .94],
  ];

  const routes = edgeSpecs.map(([from, to, start, end]) => {
    const source = nodes.get(from);
    const target = nodes.get(to);
    const first = { x: source.x, y: source.bottom };
    const last = { x: target.x, y: target.top };
    const midpointY = first.y + (last.y - first.y) * .5;
    const points = Math.abs(first.x - last.x) < 1
      ? [first, last]
      : [first, { x: first.x, y: midpointY }, { x: last.x, y: midpointY }, last];
    const lengths = points.slice(1).map((point, index) => Math.hypot(
      point.x - points[index].x,
      point.y - points[index].y,
    ));
    return { points, lengths, total: lengths.reduce((sum, length) => sum + length, 0), start, end };
  });

  const pointOnRoute = (route, progress) => {
    let remaining = clamp(progress) * route.total;
    for (let index = 0; index < route.lengths.length; index += 1) {
      const segmentLength = route.lengths[index];
      if (remaining <= segmentLength || index === route.lengths.length - 1) {
        const ratio = segmentLength ? remaining / segmentLength : 0;
        const from = route.points[index];
        const to = route.points[index + 1];
        return {
          x: from.x + (to.x - from.x) * ratio,
          y: from.y + (to.y - from.y) * ratio,
        };
      }
      remaining -= segmentLength;
    }
    return route.points.at(-1);
  };

  const strokeRoute = (route, start = 0, end = 1) => {
    const samples = Math.max(2, Math.ceil((end - start) * 20));
    context.beginPath();
    for (let index = 0; index <= samples; index += 1) {
      const point = pointOnRoute(route, start + (end - start) * (index / samples));
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    }
  };

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  routes.forEach((route) => {
    strokeRoute(route);
    context.strokeStyle = "rgba(79, 91, 110, .4)";
    context.lineWidth = .75;
    context.stroke();
  });

  const cycle = reducedMotion ? .72 : (phase * .3) % 1;
  routes.forEach((route) => {
    if (cycle < route.start || cycle > route.end) return;
    const progress = (cycle - route.start) / (route.end - route.start);
    const trailStart = Math.max(0, progress - .22);
    const lead = pointOnRoute(route, progress);

    strokeRoute(route, trailStart, progress);
    context.strokeStyle = "rgba(77, 141, 255, .14)";
    context.lineWidth = 6;
    context.stroke();

    strokeRoute(route, trailStart, progress);
    context.strokeStyle = "rgba(77, 141, 255, .92)";
    context.lineWidth = 1.35;
    context.stroke();

    context.fillStyle = "rgba(77, 141, 255, .12)";
    context.beginPath();
    context.arc(lead.x, lead.y, 8, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "rgba(111, 183, 255, .98)";
    context.beginPath();
    context.arc(lead.x, lead.y, 2.5, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "rgba(111, 183, 255, .62)";
    context.lineWidth = .45;
    context.beginPath();
    context.moveTo(lead.x - 6, lead.y);
    context.lineTo(lead.x + 6, lead.y);
    context.moveTo(lead.x, lead.y - 6);
    context.lineTo(lead.x, lead.y + 6);
    context.stroke();
  });
  context.restore();
};

const drawPrecisionTarget = (canvas, phase) => {
  const { context, width, height } = prepareCanvas(canvas);
  const centerX = width * .55;
  const centerY = height * .5;
  const radius = Math.min(width, height) * .29;
  const yaw = .83;
  const tilt = .035;
  const depthX = radius * .105;
  const depthY = radius * .035;
  const cosine = Math.cos(tilt);
  const sine = Math.sin(tilt);

  const project = (x, y, offsetX = 0, offsetY = 0) => ({
    x: centerX + offsetX + x * yaw * cosine - y * sine,
    y: centerY + offsetY + x * yaw * sine + y * cosine,
  });
  const drawProjectedDisc = (discRadius, offsetX = 0, offsetY = 0) => {
    context.save();
    context.translate(centerX + offsetX, centerY + offsetY);
    context.rotate(tilt);
    context.scale(yaw, 1);
    context.beginPath();
    context.arc(0, 0, discRadius, 0, Math.PI * 2);
    context.restore();
  };
  const drawLine = (points) => {
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    context.stroke();
  };

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";

  drawProjectedDisc(radius, depthX, depthY);
  context.fillStyle = "rgba(235, 239, 245, .32)";
  context.fill();
  context.strokeStyle = "rgba(62, 74, 92, .52)";
  context.lineWidth = .75;
  context.stroke();

  const sideAngles = Array.from({ length: 29 }, (_, index) => -1.42 + index * (2.84 / 28));
  context.beginPath();
  sideAngles.forEach((angle, index) => {
    const point = project(Math.cos(angle) * radius, Math.sin(angle) * radius);
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  [...sideAngles].reverse().forEach((angle) => {
    const point = project(Math.cos(angle) * radius, Math.sin(angle) * radius, depthX, depthY);
    context.lineTo(point.x, point.y);
  });
  context.closePath();
  context.fillStyle = "rgba(232, 237, 244, .42)";
  context.fill();
  context.strokeStyle = "rgba(66, 78, 96, .42)";
  context.lineWidth = .65;
  context.stroke();

  for (let index = 0; index < sideAngles.length - 3; index += 4) {
    const front = project(Math.cos(sideAngles[index]) * radius, Math.sin(sideAngles[index]) * radius);
    const back = project(Math.cos(sideAngles[index + 3]) * radius, Math.sin(sideAngles[index + 3]) * radius, depthX, depthY);
    context.strokeStyle = "rgba(72, 85, 104, .32)";
    context.lineWidth = .55;
    drawLine([front, back]);
  }

  drawProjectedDisc(radius);
  context.fillStyle = "rgba(255, 255, 255, .3)";
  context.fill();
  context.strokeStyle = "rgba(54, 66, 84, .72)";
  context.lineWidth = .9;
  context.stroke();

  const ringRatios = [1, .8, .6, .4, .22];
  ringRatios.slice(1).forEach((ratio, index) => {
    drawProjectedDisc(radius * ratio);
    if (ratio <= .4) {
      context.fillStyle = ratio === .22 ? "rgba(77, 141, 255, .055)" : "rgba(77, 141, 255, .02)";
      context.fill();
    }
    context.strokeStyle = `rgba(69, 82, 101, ${.48 - index * .035})`;
    context.lineWidth = .68;
    context.stroke();
  });

  const sectors = 18;
  const sectorAngle = Math.PI * 2 / sectors;
  for (let sector = 0; sector < sectors; sector += 1) {
    const angle = sector * sectorAngle;
    const inner = project(Math.cos(angle) * radius * .22, Math.sin(angle) * radius * .22);
    const outer = project(Math.cos(angle) * radius, Math.sin(angle) * radius);
    context.strokeStyle = "rgba(67, 80, 99, .3)";
    context.lineWidth = .55;
    drawLine([inner, outer]);

    for (let ring = 0; ring < ringRatios.length - 1; ring += 1) {
      const outerRatio = ringRatios[ring];
      const innerRatio = ringRatios[ring + 1];
      const nextAngle = angle + sectorAngle;
      const diagonal = (sector + ring) % 2 === 0
        ? [
          project(Math.cos(angle) * radius * outerRatio, Math.sin(angle) * radius * outerRatio),
          project(Math.cos(nextAngle) * radius * innerRatio, Math.sin(nextAngle) * radius * innerRatio),
        ]
        : [
          project(Math.cos(nextAngle) * radius * outerRatio, Math.sin(nextAngle) * radius * outerRatio),
          project(Math.cos(angle) * radius * innerRatio, Math.sin(angle) * radius * innerRatio),
        ];
      context.strokeStyle = "rgba(78, 91, 110, .2)";
      context.lineWidth = .48;
      drawLine(diagonal);
    }
  }

  drawProjectedDisc(radius * .105);
  context.fillStyle = "rgba(77, 141, 255, .94)";
  context.fill();
  context.strokeStyle = "rgba(49, 111, 221, .9)";
  context.lineWidth = .8;
  context.stroke();

  const wobble = reducedMotion ? 0 : Math.sin(phase * 4.8) * .011 + Math.sin(phase * 9.6) * .003;
  const arrowAngle = Math.atan2(-depthY, -depthX) + wobble;
  const arrowLength = Math.min(width * .39, radius * 1.48);
  context.save();
  context.translate(centerX, centerY);
  context.rotate(arrowAngle);

  context.strokeStyle = "rgba(77, 141, 255, .12)";
  context.lineWidth = 4;
  drawLine([{ x: 1, y: 0 }, { x: arrowLength, y: 0 }]);
  context.strokeStyle = "rgba(77, 141, 255, .96)";
  context.lineWidth = 1.2;
  drawLine([{ x: 1, y: 0 }, { x: arrowLength, y: 0 }]);

  const featherStart = arrowLength - 39;
  const featherEnd = arrowLength - 4;
  context.beginPath();
  context.moveTo(featherStart, 0);
  context.lineTo(featherStart + 8, -7.5);
  context.lineTo(featherEnd, -4.6);
  context.lineTo(featherEnd, 0);
  context.closePath();
  context.fillStyle = "rgba(77, 141, 255, .16)";
  context.fill();
  context.strokeStyle = "rgba(77, 141, 255, .78)";
  context.lineWidth = .7;
  context.stroke();
  context.beginPath();
  context.moveTo(featherStart + 4, 0);
  context.lineTo(featherStart + 10, 6.5);
  context.lineTo(featherEnd, 4);
  context.lineTo(featherEnd, 0);
  context.closePath();
  context.fillStyle = "rgba(77, 141, 255, .09)";
  context.fill();
  context.stroke();
  context.strokeStyle = "rgba(77, 141, 255, .5)";
  context.lineWidth = .45;
  drawLine([{ x: featherStart + 8, y: -1 }, { x: featherEnd - 2, y: -3.8 }]);
  drawLine([{ x: featherStart + 10, y: 1 }, { x: featherEnd - 2, y: 3.2 }]);
  context.strokeStyle = "rgba(77, 141, 255, .82)";
  context.lineWidth = .75;
  context.beginPath();
  context.moveTo(arrowLength, -4.2);
  context.lineTo(arrowLength, 4.2);
  context.stroke();
  context.restore();

  context.fillStyle = "rgba(77, 141, 255, .1)";
  context.beginPath();
  context.arc(centerX, centerY, 12, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(225, 241, 255, .98)";
  context.beginPath();
  context.arc(centerX, centerY, 2, 0, Math.PI * 2);
  context.fill();

  [-.7, .1, .9, 1.7].forEach((angle) => {
    const inner = 7;
    const outer = 10;
    context.strokeStyle = "rgba(77, 141, 255, .52)";
    context.lineWidth = .45;
    context.beginPath();
    context.moveTo(centerX + Math.cos(angle) * inner, centerY + Math.sin(angle) * inner);
    context.lineTo(centerX + Math.cos(angle) * outer, centerY + Math.sin(angle) * outer);
    context.stroke();
  });
  context.restore();
};

const drawServiceSystem = (canvas, phase) => {
  const { context, width, height } = prepareCanvas(canvas);
  const centerX = width * .5;
  const centerY = height * .5;
  const radius = Math.min(width * .21, height * .17, 120);
  const laneOffset = Math.min(height * .28, radius * 1.65);
  const leftX = width * .1;
  const rightX = width * .9;
  const laneY = [centerY - laneOffset, centerY, centerY + laneOffset];
  const leftAnchors = [
    { x: centerX - radius * .7, y: centerY - radius * .7 },
    { x: centerX - radius, y: centerY },
    { x: centerX - radius * .7, y: centerY + radius * .7 },
  ];
  const rightAnchors = leftAnchors.map((point) => ({ x: width - point.x, y: point.y }));

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";

  const routes = laneY.flatMap((y, index) => [
    [
      { x: leftX, y },
      { x: centerX - radius * 1.8, y },
      leftAnchors[index],
    ],
    [
      rightAnchors[index],
      { x: centerX + radius * 1.8, y },
      { x: rightX, y },
    ],
  ]);

  context.beginPath();
  routes.forEach((route) => {
    context.moveTo(route[0].x, route[0].y);
    route.slice(1).forEach((point) => context.lineTo(point.x, point.y));
  });
  context.strokeStyle = "rgba(67, 80, 99, .4)";
  context.lineWidth = .75;
  context.stroke();

  context.beginPath();
  context.moveTo(leftX, laneY[0]);
  context.lineTo(leftX, laneY[2]);
  context.moveTo(rightX, laneY[0]);
  context.lineTo(rightX, laneY[2]);
  context.strokeStyle = "rgba(77, 90, 109, .16)";
  context.lineWidth = .55;
  context.stroke();

  laneY.forEach((y) => {
    [leftX, rightX].forEach((x) => {
      context.beginPath();
      context.arc(x, y, 7, 0, Math.PI * 2);
      context.strokeStyle = "rgba(69, 82, 101, .24)";
      context.lineWidth = .6;
      context.stroke();
      context.fillStyle = "rgba(63, 76, 95, .68)";
      context.beginPath();
      context.arc(x, y, 1.8, 0, Math.PI * 2);
      context.fill();
    });
  });

  const signalProgress = reducedMotion ? .68 : (phase * .1) % 1;
  const signalX = leftX + (rightX - leftX) * signalProgress;
  context.strokeStyle = "rgba(77, 141, 255, .16)";
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(Math.max(leftX, signalX - 24), centerY);
  context.lineTo(signalX, centerY);
  context.stroke();
  context.strokeStyle = "rgba(77, 141, 255, .74)";
  context.lineWidth = 1;
  context.stroke();
  context.fillStyle = "rgba(105, 183, 255, .95)";
  context.beginPath();
  context.arc(signalX, centerY, 2.3, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "rgba(255, 255, 255, .72)";
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fill();

  [1, .72, .43].forEach((ratio, index) => {
    context.beginPath();
    context.arc(centerX, centerY, radius * ratio, 0, Math.PI * 2);
    context.strokeStyle = index === 0 ? "rgba(52, 66, 86, .68)" : "rgba(62, 76, 96, .34)";
    context.lineWidth = index === 0 ? .9 : .6;
    context.stroke();
  });

  for (let index = 0; index < 12; index += 1) {
    const angle = index * Math.PI / 6;
    context.beginPath();
    context.moveTo(
      centerX + Math.cos(angle) * radius * .43,
      centerY + Math.sin(angle) * radius * .43,
    );
    context.lineTo(
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius,
    );
    context.strokeStyle = "rgba(67, 80, 99, .2)";
    context.lineWidth = .5;
    context.stroke();
  }

  const orbitAngle = reducedMotion ? .3 : phase * .035;
  [0, Math.PI / 3, Math.PI * 2 / 3].forEach((offset, index) => {
    context.beginPath();
    context.ellipse(
      centerX,
      centerY,
      radius * .84,
      radius * .27,
      orbitAngle + offset,
      0,
      Math.PI * 2,
    );
    context.strokeStyle = index === 0 ? "rgba(77, 141, 255, .42)" : "rgba(68, 82, 101, .3)";
    context.lineWidth = index === 0 ? .8 : .55;
    context.stroke();
  });

  const arcStart = reducedMotion ? -.8 : phase * .045;
  context.beginPath();
  context.arc(centerX, centerY, radius + 4, arcStart, arcStart + 1.05);
  context.strokeStyle = "rgba(77, 141, 255, .66)";
  context.lineWidth = 1;
  context.stroke();

  for (let index = 0; index < 4; index += 1) {
    const angle = orbitAngle + index * Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius * .73;
    const y = centerY + Math.sin(angle) * radius * .73;
    context.fillStyle = index === 0 ? "rgba(91, 164, 255, .9)" : "rgba(66, 79, 98, .48)";
    context.beginPath();
    context.arc(x, y, index === 0 ? 2.2 : 1.5, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = "rgba(77, 141, 255, .12)";
  context.beginPath();
  context.arc(centerX, centerY, 10, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(77, 141, 255, .94)";
  context.beginPath();
  context.arc(centerX, centerY, 2.4, 0, Math.PI * 2);
  context.fill();
  context.restore();
};

const drawOpportunityField = (canvas, phase) => {
  const { context, width, height } = prepareCanvas(canvas);
  const centerX = width * .5;
  const centerY = height * .5;
  const fieldWidth = Math.min(width * .82, height * .66, 440);
  const fieldHeight = fieldWidth * .78;
  const bottom = centerY + fieldHeight * .5;
  const top = centerY - fieldHeight * .5;

  const project = (effort, value) => {
    const perspectiveWidth = fieldWidth * (1 - value * .2);
    return {
      x: centerX + (effort - .5) * perspectiveWidth,
      y: bottom - value * fieldHeight,
    };
  };

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";

  const corners = [project(0, 0), project(1, 0), project(1, 1), project(0, 1)];
  context.beginPath();
  context.moveTo(corners[0].x, corners[0].y);
  corners.slice(1).forEach((point) => context.lineTo(point.x, point.y));
  context.closePath();
  context.fillStyle = "rgba(255, 255, 255, .52)";
  context.fill();

  for (let index = 0; index <= 6; index += 1) {
    const ratio = index / 6;
    const verticalStart = project(ratio, 0);
    const verticalEnd = project(ratio, 1);
    const horizontalStart = project(0, ratio);
    const horizontalEnd = project(1, ratio);
    context.beginPath();
    context.moveTo(verticalStart.x, verticalStart.y);
    context.lineTo(verticalEnd.x, verticalEnd.y);
    context.moveTo(horizontalStart.x, horizontalStart.y);
    context.lineTo(horizontalEnd.x, horizontalEnd.y);
    context.strokeStyle = index === 0 ? "rgba(55, 68, 88, .46)" : "rgba(71, 84, 103, .18)";
    context.lineWidth = index === 0 ? .75 : .5;
    context.stroke();
  }

  for (let row = 0; row < 6; row += 1) {
    for (let column = 0; column < 6; column += 1) {
      const start = project(column / 6, row / 6);
      const end = project((column + 1) / 6, (row + 1) / 6);
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = "rgba(73, 86, 105, .1)";
      context.lineWidth = .45;
      context.stroke();
    }
  }

  const selected = { effort: .27, value: .84 };
  const selectedPoint = project(selected.effort, selected.value);
  const effortGuide = project(selected.effort, 0);
  const valueGuide = project(0, selected.value);
  context.setLineDash([3, 6]);
  context.beginPath();
  context.moveTo(effortGuide.x, effortGuide.y);
  context.lineTo(selectedPoint.x, selectedPoint.y);
  context.moveTo(valueGuide.x, valueGuide.y);
  context.lineTo(selectedPoint.x, selectedPoint.y);
  context.strokeStyle = "rgba(77, 141, 255, .3)";
  context.lineWidth = .65;
  context.stroke();
  context.setLineDash([]);

  const route = [
    project(.04, .05),
    project(.12, .34),
    project(.2, .6),
    selectedPoint,
  ];
  context.beginPath();
  context.moveTo(route[0].x, route[0].y);
  route.slice(1).forEach((point) => context.lineTo(point.x, point.y));
  context.strokeStyle = "rgba(77, 141, 255, .12)";
  context.lineWidth = 5;
  context.stroke();
  context.strokeStyle = "rgba(77, 141, 255, .72)";
  context.lineWidth = .95;
  context.stroke();

  const routeLengths = route.slice(1).map((point, index) => Math.hypot(
    point.x - route[index].x,
    point.y - route[index].y,
  ));
  const routeTotal = routeLengths.reduce((sum, length) => sum + length, 0);
  let remaining = (reducedMotion ? .72 : (phase * .1) % 1) * routeTotal;
  let signalPoint = route[0];
  for (let index = 0; index < routeLengths.length; index += 1) {
    const segmentLength = routeLengths[index];
    if (remaining <= segmentLength) {
      const ratio = segmentLength ? remaining / segmentLength : 0;
      signalPoint = {
        x: route[index].x + (route[index + 1].x - route[index].x) * ratio,
        y: route[index].y + (route[index + 1].y - route[index].y) * ratio,
      };
      break;
    }
    remaining -= segmentLength;
    signalPoint = route[index + 1];
  }

  const opportunities = [
    { effort: .18, value: .25, radius: 4 },
    { effort: .36, value: .38, radius: 5 },
    { effort: .51, value: .64, radius: 4 },
    { effort: .67, value: .42, radius: 6 },
    { effort: .78, value: .72, radius: 5 },
    { effort: .84, value: .22, radius: 4 },
  ];
  opportunities.forEach(({ effort, value, radius }) => {
    const point = project(effort, value);
    context.fillStyle = "rgba(255, 255, 255, .92)";
    context.beginPath();
    context.arc(point.x, point.y, radius + 2.5, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "rgba(62, 76, 96, .58)";
    context.lineWidth = .7;
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "rgba(65, 79, 98, .7)";
    context.beginPath();
    context.arc(point.x, point.y, 1.4, 0, Math.PI * 2);
    context.fill();
  });

  const pulse = reducedMotion ? 0 : Math.sin(phase * .8) * 1.2;
  context.strokeStyle = "rgba(77, 141, 255, .36)";
  context.lineWidth = .7;
  [10 + pulse, 17 + pulse].forEach((radius) => {
    context.beginPath();
    context.arc(selectedPoint.x, selectedPoint.y, radius, 0, Math.PI * 2);
    context.stroke();
  });
  context.fillStyle = "rgba(77, 141, 255, .96)";
  context.beginPath();
  context.arc(selectedPoint.x, selectedPoint.y, 3, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "rgba(102, 182, 255, .96)";
  context.beginPath();
  context.arc(signalPoint.x, signalPoint.y, 2.3, 0, Math.PI * 2);
  context.fill();

  const fontSize = width < 420 ? 7 : 8;
  context.fillStyle = "rgba(75, 88, 108, .72)";
  context.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.textBaseline = "middle";
  context.fillText("EFFORT", corners[1].x - 36, corners[1].y + 20);
  context.save();
  context.translate(corners[3].x - 18, top + 34);
  context.rotate(-Math.PI / 2);
  context.fillText("VALUE", 0, 0);
  context.restore();
  context.restore();
};

const drawDeployment = (canvas, phase) => {
  const { context, width, height } = prepareCanvas(canvas);
  const shift = Math.sin(phase) * 4;
  const front = [{ x: width * .24, y: height * .25 }, { x: width * .69, y: height * .54 }, { x: width * .3, y: height * .72 }];
  const back = front.map((point) => ({ x: point.x + width * .12 + shift, y: point.y - height * .13 }));
  context.strokeStyle = "rgba(55, 65, 81, .7)";
  context.lineWidth = 0.85;
  [front, back].forEach((triangle) => {
    context.beginPath();
    context.moveTo(triangle[0].x, triangle[0].y);
    triangle.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    context.closePath();
    context.stroke();
  });
  front.forEach((point, index) => {
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(back[index].x, back[index].y);
    context.stroke();
  });
  for (let index = 1; index < 9; index += 1) {
    const ratio = index / 10;
    context.beginPath();
    context.moveTo(front[0].x + (front[1].x - front[0].x) * ratio, front[0].y + (front[1].y - front[0].y) * ratio);
    context.lineTo(front[2].x + (front[1].x - front[2].x) * ratio, front[2].y + (front[1].y - front[2].y) * ratio);
    context.stroke();
  }
  context.strokeStyle = "rgba(77, 141, 255, .9)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(front[0].x, front[0].y);
  context.lineTo(back[1].x, back[1].y);
  context.stroke();
};

const securityLockArtwork = new Image();
let securityLockRenderable = null;
const securityLockLayers = new WeakMap();
securityLockArtwork.decoding = "async";
securityLockArtwork.addEventListener("load", () => {
  const buffer = document.createElement("canvas");
  const bufferSize = 900;
  buffer.width = bufferSize;
  buffer.height = bufferSize;
  const bufferContext = buffer.getContext("2d", { willReadFrequently: true });
  bufferContext.drawImage(securityLockArtwork, 0, 0, bufferSize, bufferSize);
  const imageData = bufferContext.getImageData(0, 0, bufferSize, bufferSize);
  const pixels = imageData.data;
  for (let index = 0; index < pixels.length; index += 4) {
    const luminance = (pixels[index] * .2126 + pixels[index + 1] * .7152 + pixels[index + 2] * .0722) / 255;
    const lineStrength = Math.pow(clamp((luminance - .006) / .994), .86);
    pixels[index] = 236;
    pixels[index + 1] = 242;
    pixels[index + 2] = 252;
    pixels[index + 3] = Math.round(lineStrength * 255);
  }
  bufferContext.putImageData(imageData, 0, 0);
  securityLockRenderable = buffer;
  requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
});
if (document.querySelector("[data-security-lock]")) {
  securityLockArtwork.src = "public/security-lock-reference.png";
}

const drawSecurityLock = (canvas, progress = 0) => {
  const { context, width, height } = prepareCanvas(canvas);
  if (!securityLockRenderable) return;

  const amount = clamp(progress);
  const imageWidth = securityLockRenderable.width;
  const imageHeight = securityLockRenderable.height;
  const sourceX = imageWidth * .18;
  const sourceY = imageHeight * .055;
  const sourceWidth = imageWidth * .64;
  const sourceHeight = imageHeight * .82;
  const sourceAspect = sourceWidth / sourceHeight;
  const drawWidth = Math.min(width * .96, height * .92 * sourceAspect);
  const drawHeight = drawWidth / sourceAspect;
  const drawX = (width - drawWidth) / 2;
  const drawY = (height - drawHeight) / 2;
  const smooth = (value) => value * value * (3 - 2 * value);
  const point = (x, y) => ({ x: drawX + x * drawWidth, y: drawY + y * drawHeight });
  const points = (coordinates) => coordinates.map(([x, y]) => point(x, y));
  const arc = (centerX, centerY, radiusX, radiusY, start, end, steps = 40) => Array.from(
    { length: steps + 1 },
    (_, index) => {
      const angle = start + (end - start) * (index / steps);
      return point(centerX + Math.cos(angle) * radiusX, centerY + Math.sin(angle) * radiusY);
    },
  );
  const tracePartial = (targetContext, pathPoints, localProgress, closed = false) => {
    const route = closed ? [...pathPoints, pathPoints[0]] : pathPoints;
    const lengths = route.slice(1).map((pathPoint, index) => Math.hypot(
      pathPoint.x - route[index].x,
      pathPoint.y - route[index].y,
    ));
    const totalLength = lengths.reduce((total, length) => total + length, 0);
    let remaining = totalLength * clamp(localProgress);
    let endpoint = route[0];
    targetContext.beginPath();
    targetContext.moveTo(route[0].x, route[0].y);
    for (let index = 0; index < lengths.length; index += 1) {
      const from = route[index];
      const to = route[index + 1];
      if (remaining >= lengths[index]) {
        targetContext.lineTo(to.x, to.y);
        endpoint = to;
        remaining -= lengths[index];
        continue;
      }
      const ratio = lengths[index] ? remaining / lengths[index] : 0;
      endpoint = {
        x: from.x + (to.x - from.x) * ratio,
        y: from.y + (to.y - from.y) * ratio,
      };
      targetContext.lineTo(endpoint.x, endpoint.y);
      break;
    }
    return endpoint;
  };

  const drawArtwork = (alpha, filter = "none") => {
    context.save();
    context.globalCompositeOperation = "screen";
    context.globalAlpha = alpha;
    context.filter = filter;
    context.drawImage(
      securityLockRenderable,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      drawX,
      drawY,
      drawWidth,
      drawHeight,
    );
    context.restore();
  };

  drawArtwork(.008 + amount * .012);

  const outerShackle = [
    point(.27, .43),
    point(.27, .24),
    ...arc(.5, .24, .23, .2, Math.PI, Math.PI * 2),
    point(.73, .43),
  ];
  const middleShackle = [
    point(.3, .43),
    point(.3, .245),
    ...arc(.5, .245, .2, .165, Math.PI, Math.PI * 2),
    point(.7, .43),
  ];
  const innerShackle = [
    point(.34, .43),
    point(.34, .25),
    ...arc(.5, .25, .16, .13, Math.PI, Math.PI * 2),
    point(.66, .43),
  ];
  const outerHousing = points([
    [.16, .43], [.1, .49], [.1, .82], [.16, .9],
    [.84, .9], [.9, .82], [.9, .49], [.84, .43],
  ]);
  const innerHousing = points([
    [.18, .455], [.125, .505], [.125, .8], [.18, .875],
    [.82, .875], [.875, .8], [.875, .505], [.82, .455],
  ]);
  const leftArmor = points([
    [.18, .47], [.13, .52], [.13, .59], [.21, .66],
    [.21, .77], [.145, .83], [.19, .86], [.27, .86],
    [.31, .81], [.31, .55], [.25, .47],
  ]);
  const rightArmor = leftArmor.map((pathPoint) => ({
    x: drawX + drawWidth - (pathPoint.x - drawX),
    y: pathPoint.y,
  }));
  const tracePaths = [
    { path: outerShackle, start: .01, end: .28 },
    { path: middleShackle, start: .05, end: .31 },
    { path: innerShackle, start: .09, end: .34 },
    { path: points([[.23, .43], [.23, .39], [.31, .39], [.31, .43]]), start: .19, end: .34, closed: true },
    { path: points([[.69, .43], [.69, .39], [.77, .39], [.77, .43]]), start: .21, end: .36, closed: true },
    { path: outerHousing, start: .26, end: .54, closed: true },
    { path: innerHousing, start: .31, end: .58, closed: true },
    { path: leftArmor, start: .39, end: .66, closed: true },
    { path: rightArmor, start: .42, end: .69, closed: true },
    { path: points([[.24, .45], [.76, .45], [.7, .55], [.3, .55]]), start: .46, end: .65, closed: true },
    { path: points([[.3, .55], [.3, .81], [.26, .86]]), start: .5, end: .69 },
    { path: points([[.7, .55], [.7, .81], [.74, .86]]), start: .52, end: .71 },
    { path: points([[.28, .84], [.72, .84], [.76, .88], [.24, .88]]), start: .57, end: .75, closed: true },
    { path: arc(.5, .69, .15, .15, -Math.PI / 2, Math.PI * 1.5, 56), start: .58, end: .8, closed: true },
    { path: arc(.5, .69, .12, .12, -Math.PI / 2, Math.PI * 1.5, 48), start: .63, end: .84, closed: true },
    { path: arc(.5, .69, .064, .064, -Math.PI / 2, Math.PI * 1.5, 36), start: .7, end: .88, closed: true },
    { path: points([[.47, .735], [.47, .81], [.53, .81], [.53, .735]]), start: .76, end: .91 },
    { path: arc(.17, .5, .014, .014, 0, Math.PI * 2, 18), start: .73, end: .83, closed: true },
    { path: arc(.83, .5, .014, .014, 0, Math.PI * 2, 18), start: .75, end: .85, closed: true },
    { path: arc(.17, .81, .014, .014, 0, Math.PI * 2, 18), start: .77, end: .87, closed: true },
    { path: arc(.83, .81, .014, .014, 0, Math.PI * 2, 18), start: .79, end: .89, closed: true },
  ];
  for (let index = 0; index < 9; index += 1) {
    const y = .57 + index * .023;
    tracePaths.push({ path: points([[.1, y], [.17, y]]), start: .68 + index * .012, end: .83 + index * .012 });
    tracePaths.push({ path: points([[.83, y], [.9, y]]), start: .69 + index * .012, end: .84 + index * .012 });
  }
  tracePaths.push(
    { path: points([[.42, .48], [.58, .48]]), start: .8, end: .92 },
    { path: points([[.4, .84], [.6, .84]]), start: .82, end: .94 },
  );

  let layers = securityLockLayers.get(canvas);
  if (!layers) {
    layers = {
      maskCanvas: document.createElement("canvas"),
      revealedArtwork: document.createElement("canvas"),
    };
    securityLockLayers.set(canvas, layers);
  }
  const layerWidth = Math.max(1, Math.round(width));
  const layerHeight = Math.max(1, Math.round(height));
  const { maskCanvas, revealedArtwork } = layers;
  if (maskCanvas.width !== layerWidth || maskCanvas.height !== layerHeight) {
    maskCanvas.width = layerWidth;
    maskCanvas.height = layerHeight;
    revealedArtwork.width = layerWidth;
    revealedArtwork.height = layerHeight;
  }
  const maskContext = maskCanvas.getContext("2d");
  maskContext.clearRect(0, 0, layerWidth, layerHeight);
  maskContext.lineCap = "round";
  maskContext.lineJoin = "round";
  maskContext.lineWidth = Math.max(12, drawWidth * .04);
  maskContext.strokeStyle = "#fff";

  let tracer = null;
  tracePaths.forEach(({ path, start, end, closed }) => {
    const local = smooth(clamp((amount - start) / (end - start)));
    if (local <= 0) return;
    const endpoint = tracePartial(maskContext, path, local, closed);
    maskContext.stroke();
    if (local < 1) tracer = endpoint;
  });

  const revealedContext = revealedArtwork.getContext("2d");
  revealedContext.globalCompositeOperation = "source-over";
  revealedContext.clearRect(0, 0, layerWidth, layerHeight);
  revealedContext.drawImage(
    securityLockRenderable,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    drawX,
    drawY,
    drawWidth,
    drawHeight,
  );
  revealedContext.globalCompositeOperation = "destination-in";
  revealedContext.drawImage(maskCanvas, 0, 0);
  context.save();
  context.globalCompositeOperation = "screen";
  context.globalAlpha = .62 + amount * .2;
  context.drawImage(revealedArtwork, 0, 0);
  context.restore();

  const completion = smooth(clamp((amount - .91) / .09));
  if (completion > 0) {
    drawArtwork(completion * .07, "blur(5px)");
    drawArtwork(completion * .17);
  }

  if (tracer) {
    context.save();
    context.globalCompositeOperation = "lighter";
    context.strokeStyle = "rgba(83, 159, 255, .5)";
    context.lineWidth = .7;
    context.beginPath();
    context.moveTo(tracer.x - 9, tracer.y);
    context.lineTo(tracer.x + 9, tracer.y);
    context.moveTo(tracer.x, tracer.y - 9);
    context.lineTo(tracer.x, tracer.y + 9);
    context.stroke();
    context.shadowColor = "rgba(83, 159, 255, .95)";
    context.shadowBlur = 10;
    context.fillStyle = "rgba(133, 194, 255, .96)";
    context.beginPath();
    context.arc(tracer.x, tracer.y, 1.8, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
};

const drawVault = (canvas, phase) => {
  const { context, width, height } = prepareCanvas(canvas);
  const white = "rgba(255,255,255,.9)";
  const muted = "rgba(255,255,255,.5)";
  const centerX = width * .54;
  const centerY = height * .45 + Math.sin(phase) * 4;
  const radius = Math.min(width, height) * .115;
  context.strokeStyle = white;
  context.lineWidth = 1.4;
  context.beginPath();
  context.moveTo(width * .16, height * .58);
  context.lineTo(width * .2, height * .82);
  context.lineTo(width * .58, height * .96);
  context.moveTo(width * .77, height * .48);
  context.lineTo(width * .79, height * .75);
  context.lineTo(width * .64, height * .89);
  context.moveTo(width * .13, height * .28);
  context.lineTo(width * .42, height * .33);
  context.moveTo(width * .47, height * .21);
  context.lineTo(width * .76, height * .24);
  context.stroke();
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.ellipse(centerX, centerY, radius, radius * .34, 0, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.ellipse(centerX, centerY, radius * .34, radius, 0, 0, Math.PI * 2);
  context.stroke();
  context.fillStyle = white;
  context.beginPath();
  context.arc(centerX, centerY, 3, 0, Math.PI * 2);
  context.fill();
  context.setLineDash([6, 5]);
  context.strokeStyle = muted;
  context.beginPath();
  context.moveTo(centerX - radius, centerY + radius * .72);
  context.lineTo(width * .77, height * .7);
  context.stroke();
  context.setLineDash([]);
};

const workflowNetwork = (() => {
  const columnCount = 27;
  const laneCount = 21;
  const layers = Array.from({ length: columnCount }, (_, column) => {
    const nodes = [];
    for (let lane = -1; lane <= laneCount; lane += 1) {
      const parity = ((lane - column) % 2 + 2) % 2;
      if (parity !== 0) continue;
      nodes.push({
        id: `${column}-${lane}`,
        column,
        lane,
        x: .012 + (column / (columnCount - 1)) * .976,
        y: .012 + (lane / (laneCount - 1)) * .976,
      });
    }
    return nodes;
  });
  const layerMaps = layers.map((layer) => new Map(layer.map((node) => [node.lane, node])));
  const edges = [];

  for (let column = 0; column < columnCount - 1; column += 1) {
    layers[column].forEach((source) => {
      [source.lane - 1, source.lane + 1].forEach((targetLane) => {
        const target = layerMaps[column + 1].get(targetLane);
        if (target) edges.push({ source, target });
      });
    });
  }

  return { nodes: layers.flat(), edges };
})();

const workflowRoute = (source, target) => {
  const stem = (target.x - source.x) * .3;
  return [
    source,
    { x: source.x + stem, y: source.y },
    { x: target.x - stem, y: target.y },
    target,
  ];
};

const routePoint = (points, progress) => {
  const segmentLengths = points.slice(1).map((point, index) => Math.hypot(
    point.x - points[index].x,
    point.y - points[index].y,
  ));
  const routeLength = segmentLengths.reduce((total, length) => total + length, 0);
  let distance = clamp(progress) * routeLength;
  for (let index = 0; index < segmentLengths.length; index += 1) {
    const segmentLength = segmentLengths[index];
    if (distance <= segmentLength || index === segmentLengths.length - 1) {
      const localProgress = segmentLength ? distance / segmentLength : 0;
      return {
        x: points[index].x + (points[index + 1].x - points[index].x) * localProgress,
        y: points[index].y + (points[index + 1].y - points[index].y) * localProgress,
      };
    }
    distance -= segmentLength;
  }
  return points[points.length - 1];
};

const drawWorkflowBranch = (canvas, time) => {
  time += Number(canvas.dataset.hexPhase || 0);
  const { context, width, height, rect } = prepareCanvas(canvas);
  const mobile = width < 700;
  const phase = time / 1000;
  const paddingX = mobile ? 12 : 36;
  const paddingY = mobile ? 8 : 10;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;
  const pointer = workflowPointerStates.get(canvas);
  if (pointer) {
    const targetX = pointer.clientX - rect.left;
    const targetY = pointer.clientY - rect.top;
    if (!pointer.initialized && pointer.targetStrength) {
      pointer.x = targetX;
      pointer.y = targetY;
      pointer.initialized = true;
    }
    const smoothing = reducedMotion ? 1 : .2;
    pointer.x += (targetX - pointer.x) * smoothing;
    pointer.y += (targetY - pointer.y) * smoothing;
    pointer.strength += (pointer.targetStrength - pointer.strength) * (reducedMotion ? 1 : .16);
  }
  const hoverRadius = mobile ? 105 : Math.min(175, height * .26);
  const pushDistance = mobile ? 4.5 : 7;
  const nodeMap = new Map(workflowNetwork.nodes.map((node) => {
    let x = paddingX + node.x * usableWidth;
    let y = paddingY + node.y * usableHeight;
    let influence = 0;
    if (pointer?.strength > .01) {
      const deltaX = x - pointer.x;
      const deltaY = y - pointer.y;
      const distance = Math.hypot(deltaX, deltaY);
      if (distance < hoverRadius) {
        influence = (1 - distance / hoverRadius) ** 2 * pointer.strength;
        const angle = distance > .001 ? Math.atan2(deltaY, deltaX) : (node.column + node.lane) * .7;
        x += Math.cos(angle) * pushDistance * influence;
        y += Math.sin(angle) * pushDistance * influence;
      }
    }
    return [node.id, { ...node, x, y, influence }];
  }));

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";

  context.beginPath();
  workflowNetwork.edges.forEach(({ source: sourceNode, target: targetNode }) => {
    const source = nodeMap.get(sourceNode.id);
    const target = nodeMap.get(targetNode.id);
    const route = workflowRoute(source, target);
    context.moveTo(route[0].x, route[0].y);
    route.slice(1).forEach((point) => context.lineTo(point.x, point.y));
  });
  context.strokeStyle = "rgba(35, 44, 60, .24)";
  context.lineWidth = mobile ? .54 : .68;
  context.stroke();

  if (pointer?.strength > .01) {
    const appendInfluencedRoutes = (minimumInfluence) => {
      context.beginPath();
      workflowNetwork.edges.forEach(({ source: sourceNode, target: targetNode }) => {
        const source = nodeMap.get(sourceNode.id);
        const target = nodeMap.get(targetNode.id);
        const influence = Math.max(source.influence, target.influence);
        if (influence < minimumInfluence) return;
        const route = workflowRoute(source, target);
        context.moveTo(route[0].x, route[0].y);
        route.slice(1).forEach((point) => context.lineTo(point.x, point.y));
      });
    };

    context.save();
    appendInfluencedRoutes(.015);
    context.strokeStyle = `rgba(83, 168, 255, ${.1 + pointer.strength * .1})`;
    context.lineWidth = mobile ? .72 : .9;
    context.stroke();

    appendInfluencedRoutes(.13);
    context.strokeStyle = `rgba(83, 168, 255, ${.22 + pointer.strength * .12})`;
    context.lineWidth = mobile ? 1 : 1.35;
    context.shadowColor = `rgba(97, 203, 255, ${pointer.strength * .32})`;
    context.shadowBlur = 5;
    context.stroke();
    context.restore();
  }

  const lightGroups = new Map();
  workflowNetwork.edges.forEach(({ source: sourceNode, target: targetNode }, index) => {
    if (index % 8 !== 0) return;
    const source = nodeMap.get(sourceNode.id);
    const target = nodeMap.get(targetNode.id);
    const route = workflowRoute(source, target);
    const progress = reducedMotion ? .56 : (phase * (.085 + (index % 7) * .006) + index * .173) % 1;
    const packet = routePoint(route, progress);
    const twinkle = reducedMotion ? .72 : .58 + (Math.sin(phase * 2.6 + index * 1.7) + 1) * .21;
    const pointerDistance = pointer?.strength ? Math.hypot(packet.x - pointer.x, packet.y - pointer.y) : Infinity;
    const pointerBoost = pointerDistance < hoverRadius ? (1 - pointerDistance / hoverRadius) * pointer.strength : 0;
    const lightStrength = Math.min(1.2, twinkle + pointerBoost * .38);
    const trailStartProgress = Math.max(0, progress - (mobile ? .16 : .23));
    const trail = Array.from({ length: 7 }, (_, sample) => routePoint(
      route,
      trailStartProgress + (progress - trailStartProgress) * (sample / 6),
    ));
    const neon = index % 10 === 0 ? "95, 229, 255" : "112, 151, 255";
    const tier = index % 24 === 0 || pointerBoost > .28 ? "bright" : "dim";
    const groupKey = `${neon}|${tier}`;
    if (!lightGroups.has(groupKey)) lightGroups.set(groupKey, []);
    lightGroups.get(groupKey).push({ trail, packet, lightStrength });
  });

  lightGroups.forEach((lights, groupKey) => {
    const [neon, tier] = groupKey.split("|");
    const bright = tier === "bright";
    context.save();
    context.globalCompositeOperation = "lighter";

    context.beginPath();
    lights.forEach(({ trail }) => {
      context.moveTo(trail[0].x, trail[0].y);
      trail.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    });
    context.strokeStyle = `rgba(${neon}, ${bright ? .2 : .13})`;
    context.lineWidth = mobile ? (bright ? 3 : 2.4) : (bright ? 3.8 : 3);
    context.stroke();

    context.beginPath();
    lights.forEach(({ trail }) => {
      context.moveTo(trail[0].x, trail[0].y);
      trail.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    });
    context.strokeStyle = `rgba(${neon}, ${bright ? .72 : .5})`;
    context.lineWidth = mobile ? 1 : (bright ? 1.4 : 1.2);
    context.stroke();

    context.beginPath();
    lights.forEach(({ packet, lightStrength }) => {
      const pointRadius = (mobile ? 1.15 : 1.6) * (.84 + lightStrength * .16);
      context.moveTo(packet.x + pointRadius, packet.y);
      context.arc(packet.x, packet.y, pointRadius, 0, Math.PI * 2);
    });
    context.fillStyle = `rgba(${neon}, ${bright ? .96 : .82})`;
    context.fill();

    context.beginPath();
    lights.forEach(({ packet, lightStrength }) => {
      const haloRadius = (mobile ? 5 : 7.5) * lightStrength;
      context.moveTo(packet.x - haloRadius, packet.y);
      context.lineTo(packet.x + haloRadius, packet.y);
      context.moveTo(packet.x, packet.y - haloRadius);
      context.lineTo(packet.x, packet.y + haloRadius);
    });
    context.strokeStyle = `rgba(${neon}, ${bright ? .62 : .42})`;
    context.lineWidth = .4;
    context.stroke();
    context.restore();
  });

  workflowNetwork.nodes.forEach((node) => {
    const point = nodeMap.get(node.id);
    if (point.y < 0 || point.y > height) return;
    context.fillStyle = point.influence > .01
      ? `rgba(84, 165, 255, ${.48 + point.influence * .42})`
      : "rgba(62, 73, 91, .42)";
    context.beginPath();
    context.arc(point.x, point.y, (mobile ? .6 : .85) + point.influence * 1.5, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
};

const staticWireframeKeys = new WeakMap();
const wireframeVisibility = new WeakMap();
const wireframeNextDraw = new WeakMap();
const animatedWireframeRates = {
  "integration-sphere": 20,
  "agent-hierarchy": 22,
  "precision-target": 22,
  "service-system": 12,
  "opportunity-field": 10,
  globe: 15,
};
const allAnimatedCanvases = wireframeCanvases.filter((canvas) => canvas.hasAttribute("data-animated-wireframe"));

const canvasIsVisible = (canvas) => {
  if (wireframeVisibility.has(canvas)) return wireframeVisibility.get(canvas);
  const rect = canvas.getBoundingClientRect();
  return rect.bottom >= -120 && rect.top <= window.innerHeight + 120;
};

if ("IntersectionObserver" in window) {
  const canvasObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        wireframeVisibility.set(entry.target, entry.isIntersecting);
        if (entry.isIntersecting) wireframeNextDraw.set(entry.target, -Infinity);
      });
    },
    { rootMargin: "140px 0px" },
  );
  [...wireframeCanvases, ...workflowBranchCanvases].forEach((canvas) => canvasObserver.observe(canvas));
}

const renderWireframes = (time = 0, force = false) => {
  const phase = time / 1400;
  let animatedDrawCount = 0;
  wireframeCanvases.forEach((canvas, index) => {
    if (!canvasIsVisible(canvas)) return;
    const animated = canvas.hasAttribute("data-animated-wireframe");
    const renderKey = `${Math.round(canvas.clientWidth)}x${Math.round(canvas.clientHeight)}@${window.devicePixelRatio || 1}`;
    if (!animated && staticWireframeKeys.get(canvas) === renderKey) return;
    const variant = canvas.dataset.wireframe;
    if (animated && !force) {
      const interval = 1000 / (animatedWireframeRates[variant] || 20);
      const nextDraw = wireframeNextDraw.get(canvas);
      if (nextDraw === undefined) {
        const stagger = (index % Math.max(1, allAnimatedCanvases.length)) * (interval / Math.max(1, allAnimatedCanvases.length));
        wireframeNextDraw.set(canvas, time + stagger);
        if (stagger > 0) return;
      } else if (time < nextDraw) {
        return;
      }
      if (animatedDrawCount >= 2) return;
      wireframeNextDraw.set(canvas, time + interval);
      animatedDrawCount += 1;
    }
    if (["terrain", "plane", "connections"].includes(variant)) drawMesh(canvas, phase, variant);
    if (variant === "integration-sphere") drawIntegrationSphere(canvas, phase);
    if (variant === "agent-hierarchy") drawAgentHierarchy(canvas, phase);
    if (variant === "precision-target") drawPrecisionTarget(canvas, phase);
    if (variant === "service-system") drawServiceSystem(canvas, phase);
    if (variant === "opportunity-field") drawOpportunityField(canvas, phase);
    if (variant === "globe") drawGlobe(canvas, phase);
    if (variant === "deployment") drawDeployment(canvas, phase);
    if (variant === "vault") drawVault(canvas, phase);
    if (!animated) staticWireframeKeys.set(canvas, renderKey);
  });
  workflowBranchCanvases.forEach((canvas) => {
    if (!canvasIsVisible(canvas)) return;
    const interval = 1000 / 24;
    const nextDraw = wireframeNextDraw.get(canvas) ?? -Infinity;
    if (!force && time < nextDraw) return;
    wireframeNextDraw.set(canvas, time + interval);
    drawWorkflowBranch(canvas, time);
  });
};

let wireframeFrame;
let isPageScrolling = false;
let lastCanvasScrollY = window.scrollY;
const animateWireframes = (time) => {
  const scrollChanged = window.scrollY !== lastCanvasScrollY;
  lastCanvasScrollY = window.scrollY;
  if (!isPageScrolling && !scrollChanged) {
    renderWireframes(time);
  }
  if (!reducedMotion) wireframeFrame = requestAnimationFrame(animateWireframes);
};
if (wireframeCanvases.length || workflowBranchCanvases.length) {
  renderWireframes(0, true);
  if (!reducedMotion) wireframeFrame = requestAnimationFrame(animateWireframes);
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    [...wireframeCanvases, ...workflowBranchCanvases].forEach((canvas) => {
      wireframeLayouts.delete(canvas);
      wireframeNextDraw.set(canvas, -Infinity);
    });
    renderGeneratedFields();
    renderWireframes(performance.now(), true);
  }, 180);
});

const symbols = "#@%&+*?/<>[]{}";
const scramble = (element) => {
  if (element.dataset.scrambled === "true") return;
  element.dataset.scrambled = "true";
  const finalText = element.dataset.label || element.textContent.trim();
  let frame = 0;
  const timer = setInterval(() => {
    element.textContent = finalText
      .split("")
      .map((character, index) => {
        if (character === " ") return " ";
        if (index < frame / 2) return character;
        return symbols[(index * 7 + frame * 3) % symbols.length];
      })
      .join("");
    frame += 2;
    if (frame > finalText.length * 2 + 4) {
      clearInterval(timer);
      element.textContent = finalText;
    }
  }, 24);
};

const revealItems = document.querySelectorAll(".reveal, .reveal-line, .scramble-label");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
    if (item.classList.contains("scramble-label")) item.textContent = item.dataset.label || item.textContent;
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        if (entry.target.classList.contains("scramble-label")) scramble(entry.target);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const marketSignal = document.querySelector("[data-market-signal]");
if (marketSignal) {
  const counters = [...marketSignal.querySelectorAll("[data-market-count]")];
  const setFinalValues = () => counters.forEach((counter) => {
    counter.textContent = Number(counter.dataset.marketCount).toLocaleString("en-US");
  });
  const runCounters = () => {
    if (marketSignal.dataset.counted === "true") return;
    marketSignal.dataset.counted = "true";
    marketSignal.classList.add("is-visible");
    if (reducedMotion) {
      setFinalValues();
      return;
    }
    const duration = 1900;
    const start = performance.now();
    const tick = (time) => {
      const progress = clamp((time - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      counters.forEach((counter) => {
        const target = Number(counter.dataset.marketCount);
        counter.textContent = Math.round(target * eased).toLocaleString("en-US");
      });
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (reducedMotion || !("IntersectionObserver" in window)) {
    runCounters();
  } else {
    const marketObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      runCounters();
      marketObserver.disconnect();
    }, { threshold: .18 });
    marketObserver.observe(marketSignal);
  }
}

const scrollWordGroups = [...document.querySelectorAll("[data-scroll-words]")];
if (scrollWordGroups.length) {
  let scrollWordsFrame = 0;
  const updateScrollWords = () => {
    scrollWordsFrame = 0;
    scrollWordGroups.forEach((group) => {
      const section = group.closest(".system-thesis") || group;
      const words = [...group.querySelectorAll(":scope > i")];
      const rect = section.getBoundingClientRect();
      const pin = section.querySelector(".system-thesis-pin");
      const stickyTop = pin ? parseFloat(getComputedStyle(pin).top) || 0 : window.innerHeight * .2;
      const travel = pin ? Math.max(240, section.offsetHeight - pin.offsetHeight) : Math.max(220, window.innerHeight * .52);
      const progress = reducedMotion ? 1 : clamp((stickyTop - rect.top) / travel);
      words.forEach((word, index) => {
        const threshold = words.length === 1 ? 0 : index / (words.length - 1);
        word.classList.toggle("is-lit", progress >= threshold * .82 + .08);
      });
    });
  };
  const requestScrollWordUpdate = () => {
    if (scrollWordsFrame) return;
    scrollWordsFrame = requestAnimationFrame(updateScrollWords);
  };
  window.addEventListener("scroll", requestScrollWordUpdate, { passive: true });
  window.addEventListener("resize", requestScrollWordUpdate, { passive: true });
  updateScrollWords();
}

const rotatingWord = document.querySelector("[data-rotating-word]");
if (rotatingWord) {
  const desktopWords = (rotatingWord.dataset.words || "your operation.|proposals end to end.|research at scale.|project delivery.|field reporting.|lead generation.|client follow-up.|compliance workflows.|document production.|back-office operations.|around the clock.|without a prompt.").split("|");
  const mobileWords = (rotatingWord.dataset.mobileWords || rotatingWord.dataset.words || "").split("|").filter(Boolean);
  const mobileQuery = window.matchMedia("(max-width: 760px)");
  const measureContext = document.createElement("canvas").getContext("2d");
  let words = mobileQuery.matches && mobileWords.length ? mobileWords : desktopWords;
  let wordIndex = 0;

  const fitRotatingWord = () => {
    const headline = rotatingWord.parentElement;
    const hero = rotatingWord.closest(".gamut-hero");
    if (!headline || !hero || !measureContext) return;

    const nextWords = mobileQuery.matches && mobileWords.length ? mobileWords : desktopWords;
    if (nextWords !== words) {
      words = nextWords;
      wordIndex = 0;
      rotatingWord.textContent = words[0];
    }

    rotatingWord.style.removeProperty("font-size");
    rotatingWord.style.removeProperty("line-height");
    const headlineStyle = getComputedStyle(headline);
    const baseSize = parseFloat(headlineStyle.fontSize);
    const baseLineHeight = parseFloat(headlineStyle.lineHeight);
    measureContext.font = `${headlineStyle.fontWeight} ${baseSize}px ${headlineStyle.fontFamily}`;

    const widestWord = Math.max(...words.map((word) => measureContext.measureText(word).width));
    const heroRect = hero.getBoundingClientRect();
    const wordRect = rotatingWord.getBoundingClientRect();
    const sideClearance = mobileQuery.matches ? 18 : 32;
    const availableWidth = Math.max(1, heroRect.right - wordRect.left - sideClearance);
    const fittedSize = Math.min(baseSize, baseSize * availableWidth / widestWord);

    rotatingWord.style.fontSize = `${Math.floor(fittedSize * 10) / 10}px`;
    rotatingWord.style.lineHeight = `${baseLineHeight}px`;
  };

  fitRotatingWord();
  document.fonts?.ready.then(fitRotatingWord);
  mobileQuery.addEventListener?.("change", fitRotatingWord);
  window.addEventListener("resize", fitRotatingWord, { passive: true });

  if (!reducedMotion) {
    setInterval(() => {
      rotatingWord.classList.add("is-changing");
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        rotatingWord.textContent = words[wordIndex];
        rotatingWord.classList.remove("is-changing");
      }, 220);
    }, 2800);
  }
}

const processStory = document.querySelector("[data-process-story]");
if (processStory) {
  const processSticky = processStory.querySelector(".process-sticky");
  const processSteps = [...processStory.querySelectorAll("[data-process-step]")];
  const processViews = [...processStory.querySelectorAll("[data-process-view]")];
  const processMarkers = [...processStory.querySelectorAll("[data-process-marker]")];
  const processStageLabel = processStory.querySelector("[data-process-stage-label]");
  const processStageState = processStory.querySelector("[data-process-stage-state]");
  let activeProcessStep = -1;
  let processFrame;

  const renderProcessStory = () => {
    processFrame = null;
    if (!processSticky || !processSteps.length) return;

    const storyRect = processStory.getBoundingClientRect();
    const stickyTop = parseFloat(getComputedStyle(processSticky).top) || 0;
    const scrollRange = Math.max(1, processStory.offsetHeight - processSticky.offsetHeight);
    const progress = clamp((stickyTop - storyRect.top) / scrollRange);
    const nextStep = Math.min(processSteps.length - 1, Math.floor(progress * processSteps.length));
    processStory.style.setProperty("--process-progress", progress.toFixed(4));

    if (nextStep === activeProcessStep) return;
    activeProcessStep = nextStep;
    processSteps.forEach((step, index) => {
      const active = index === nextStep;
      step.classList.toggle("is-active", active);
      step.setAttribute("aria-hidden", String(!active));
    });
    processViews.forEach((view, index) => view.classList.toggle("is-active", index === nextStep));
    processMarkers.forEach((marker, index) => {
      marker.classList.toggle("is-active", index === nextStep);
      marker.classList.toggle("is-complete", index < nextStep);
      if (index === nextStep) marker.setAttribute("aria-current", "step");
      else marker.removeAttribute("aria-current");
    });

    const activeMarker = processMarkers[nextStep];
    if (activeMarker && processStageLabel) processStageLabel.textContent = activeMarker.dataset.label || "";
    if (activeMarker && processStageState) processStageState.textContent = activeMarker.dataset.state || "";
  };

  const requestProcessRender = () => {
    if (processFrame) return;
    processFrame = requestAnimationFrame(renderProcessStory);
  };

  window.addEventListener("scroll", requestProcessRender, { passive: true });
  window.addEventListener("resize", requestProcessRender, { passive: true });
  renderProcessStory();
}

const progressBar = document.querySelector(".scroll-progress");
const siteHeader = document.querySelector(".site-header");
const asciiItems = document.querySelectorAll(".ascii-visual");
const orbitItems = document.querySelectorAll(".security-orbit, .aegis-orbit");
let motionFrame;

const updateMotion = () => {
  motionFrame = null;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pageProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (progressBar) progressBar.style.transform = `scaleX(${clamp(pageProgress)})`;
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
  if (reducedMotion) return;

  asciiItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const local = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
    item.style.setProperty("--ascii-shift", `${(local - 0.5) * 26}px`);
  });
  orbitItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const local = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
    item.style.setProperty("--orbit-rotation", `${(local - 0.5) * 24}deg`);
  });
};

const requestMotion = () => {
  if (motionFrame) return;
  motionFrame = requestAnimationFrame(updateMotion);
};
let scrollIdleTimer;
const pauseCanvasForScroll = () => {
  isPageScrolling = true;
  document.documentElement.classList.add("is-page-scrolling");
  clearTimeout(scrollIdleTimer);
  scrollIdleTimer = setTimeout(() => {
    isPageScrolling = false;
    document.documentElement.classList.remove("is-page-scrolling");
    const restartTime = performance.now();
    allAnimatedCanvases.forEach((canvas, index) => {
      wireframeNextDraw.set(canvas, restartTime + (index % 4) * 8);
    });
    workflowBranchCanvases.forEach((canvas, index) => {
      wireframeNextDraw.set(canvas, restartTime + (index % 3) * 8);
    });
  }, 140);
};
const handleScroll = () => {
  pauseCanvasForScroll();
  requestMotion();
};
window.addEventListener("wheel", pauseCanvasForScroll, { passive: true });
window.addEventListener("touchmove", pauseCanvasForScroll, { passive: true });
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", requestMotion);
updateMotion();

const demo = document.querySelector("[data-product-demo]");
if (demo) {
  const scrollStage = demo.closest("[data-demo-scroll]") || demo;
  const steps = [...demo.querySelectorAll(".demo-step")];
  const summaryItems = [...demo.querySelectorAll("[data-summary-step]")];
  const activityStatus = demo.querySelector("[data-demo-status]");
  const summaryStatus = demo.querySelector("[data-demo-summary-status]");
  let demoScrollFrame;

  const setDemoStatus = (element, state, label) => {
    if (!element) return;
    element.dataset.state = state;
    element.textContent = label;
  };

  const setDemoProgress = (progress) => {
    const sequenceProgress = clamp((progress - .04) / .9);
    const cursor = sequenceProgress * steps.length;
    const completedCount = Math.min(steps.length, Math.floor(cursor + .001));
    const activeIndex = sequenceProgress > .01 && completedCount < steps.length ? completedCount : -1;

    steps.forEach((step, index) => {
      const complete = index < completedCount;
      const active = index === activeIndex;
      step.classList.toggle("is-complete", complete);
      step.classList.toggle("is-active", active);
      const check = step.querySelector(".step-check");
      if (check) check.textContent = complete ? (index === steps.length - 1 ? "ready" : "done") : (active ? "working" : "queued");
    });

    summaryItems.forEach((item) => {
      item.classList.toggle("is-visible", cursor >= Number(item.dataset.summaryStep));
    });

    if (sequenceProgress >= 1) {
      setDemoStatus(activityStatus, "complete", "complete");
      setDemoStatus(summaryStatus, "complete", "ready");
    } else if (sequenceProgress > .01) {
      setDemoStatus(activityStatus, "working", "working");
      setDemoStatus(summaryStatus, "working", "assembling");
    } else {
      setDemoStatus(activityStatus, "idle", "waiting");
      setDemoStatus(summaryStatus, "idle", "assembling");
    }
    demo.classList.toggle("is-complete", sequenceProgress >= 1);
    demo.style.setProperty("--demo-scroll-progress", String(sequenceProgress));
  };

  const updateDemoFromScroll = () => {
    demoScrollFrame = null;
    if (reducedMotion) {
      setDemoProgress(1);
      return;
    }
    const stageRect = scrollStage.getBoundingClientRect();
    let progress;
    if (window.innerWidth <= 760) {
      const start = window.innerHeight * .82;
      const travel = Math.max(1, stageRect.height + window.innerHeight * .45);
      progress = (start - stageRect.top) / travel;
    } else {
      const topOffset = (siteHeader?.offsetHeight || 64) + 18;
      const travel = Math.max(1, scrollStage.offsetHeight - demo.offsetHeight);
      progress = (topOffset - stageRect.top) / travel;
    }
    setDemoProgress(clamp(progress));
  };

  const requestDemoUpdate = () => {
    if (demoScrollFrame) return;
    demoScrollFrame = requestAnimationFrame(updateDemoFromScroll);
  };

  demo.querySelectorAll("[data-outcome-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.outcomeTab;
      demo.querySelectorAll("[data-outcome-tab]").forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      demo.querySelectorAll("[data-outcome-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.outcomePanel !== key;
      });
    });
  });

  if (reducedMotion) {
    setDemoProgress(1);
  } else {
    window.addEventListener("scroll", requestDemoUpdate, { passive: true });
    window.addEventListener("resize", requestDemoUpdate);
    updateDemoFromScroll();
  }
}

document.querySelectorAll("[data-tab-group]").forEach((group) => {
  const tabs = [...group.querySelectorAll("[data-tab]")];
  const panels = [...group.querySelectorAll("[data-tab-panel]")];
  const scrollControlled = group.hasAttribute("data-scroll-band") && !reducedMotion;
  const progressMarker = group.querySelector(".band-scroll-progress b");
  const stickyContent = group.querySelector(".band-grid");
  let bandScrollFrame;

  const activateTab = (index) => {
    tabs.forEach((item, itemIndex) => {
      const active = itemIndex === index;
      item.classList.toggle("is-active", active);
      item.classList.toggle("is-complete", itemIndex < index);
      item.setAttribute("aria-selected", String(active));
    });
    panels.forEach((panel, panelIndex) => panel.classList.toggle("is-active", panelIndex === index));
    group.style.setProperty("--active-tab", String(index));
  };

  const updateBandFromScroll = () => {
    bandScrollFrame = null;
    if (!scrollControlled || window.innerWidth <= 900) return;
    const groupRect = group.getBoundingClientRect();
    const topOffset = (siteHeader?.offsetHeight || 64) + 8;
    const travel = Math.max(1, group.offsetHeight - stickyContent.offsetHeight);
    const progress = clamp((topOffset - groupRect.top) / travel);
    const activeIndex = Math.min(tabs.length - 1, Math.floor(progress * tabs.length));
    group.style.setProperty("--band-scroll-progress", String(progress));
    if (progressMarker) progressMarker.style.left = `${progress * 100}%`;
    activateTab(activeIndex);
  };

  const requestBandUpdate = () => {
    if (bandScrollFrame) return;
    bandScrollFrame = requestAnimationFrame(updateBandFromScroll);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const index = tabs.indexOf(tab);
      if (!scrollControlled || window.innerWidth <= 900) {
        activateTab(index);
        return;
      }
      const topOffset = (siteHeader?.offsetHeight || 64) + 8;
      const stageTop = window.scrollY + group.getBoundingClientRect().top - topOffset;
      const travel = Math.max(1, group.offsetHeight - stickyContent.offsetHeight);
      const targetProgress = index === 0 ? 0 : Math.min(.98, (index + .5) / tabs.length);
      window.scrollTo({ top: stageTop + travel * targetProgress, behavior: "smooth" });
    });
  });

  if (scrollControlled) {
    window.addEventListener("scroll", requestBandUpdate, { passive: true });
    window.addEventListener("resize", requestBandUpdate);
    updateBandFromScroll();
  }
});

const securityScrollBand = document.querySelector("[data-security-scroll]");
if (securityScrollBand) {
  const lockCanvas = securityScrollBand.querySelector("[data-security-lock]");
  const stickyContent = securityScrollBand.querySelector(".band-grid");
  const tabs = [...securityScrollBand.querySelectorAll("[data-security-target]")];
  const details = [...securityScrollBand.querySelectorAll("[data-security-step]")];
  const marker = securityScrollBand.querySelector(".security-flow-progress b");
  let securityScrollFrame;

  const setSecurityProgress = (progress) => {
    const boundedProgress = clamp(progress);
    const activeIndex = Math.min(details.length - 1, Math.floor(boundedProgress * details.length));
    securityScrollBand.style.setProperty("--security-scroll-progress", String(boundedProgress));
    if (marker) marker.style.left = `${boundedProgress * 100}%`;
    tabs.forEach((tab, index) => {
      const active = index === activeIndex;
      tab.classList.toggle("is-active", active);
      tab.classList.toggle("is-complete", index < activeIndex);
      tab.setAttribute("aria-selected", String(active));
    });
    details.forEach((detail, index) => detail.classList.toggle("is-active", index === activeIndex));
    drawSecurityLock(lockCanvas, boundedProgress);
  };

  const updateSecurityFromScroll = () => {
    securityScrollFrame = null;
    if (reducedMotion || window.innerWidth <= 900) {
      setSecurityProgress(1);
      return;
    }
    const sectionRect = securityScrollBand.getBoundingClientRect();
    const topOffset = (siteHeader?.offsetHeight || 64) + 8;
    const travel = Math.max(1, securityScrollBand.offsetHeight - stickyContent.offsetHeight);
    setSecurityProgress((topOffset - sectionRect.top) / travel);
  };

  const requestSecurityUpdate = () => {
    if (securityScrollFrame) return;
    securityScrollFrame = requestAnimationFrame(updateSecurityFromScroll);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      if (reducedMotion || window.innerWidth <= 900) {
        setSecurityProgress((index + .5) / tabs.length);
        return;
      }
      const topOffset = (siteHeader?.offsetHeight || 64) + 8;
      const sectionTop = window.scrollY + securityScrollBand.getBoundingClientRect().top - topOffset;
      const travel = Math.max(1, securityScrollBand.offsetHeight - stickyContent.offsetHeight);
      const targetProgress = (index + .5) / tabs.length;
      window.scrollTo({ top: sectionTop + travel * targetProgress, behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", requestSecurityUpdate, { passive: true });
  window.addEventListener("resize", requestSecurityUpdate);
  updateSecurityFromScroll();
}

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");
    const open = !item.classList.contains("is-open");
    item.classList.toggle("is-open", open);
    question.setAttribute("aria-expanded", String(open));
  });
});

const readinessQuestions = [
  { question: "How consistently are your core workflows documented?", options: ["Mostly tribal knowledge", "Some checklists exist", "Core steps are documented", "Steps, owners, and exceptions are current"] },
  { question: "How much project information is re-entered between tools?", options: ["Constant manual re-entry", "Several recurring handoffs", "A few known handoffs", "Systems share most structured data"] },
  { question: "How usable is the data behind the workflow?", options: ["Scattered or unreliable", "Accessible with manual cleanup", "Mostly structured and available", "Governed, current, and permissioned"] },
  { question: "Where does AI use stand today?", options: ["No approved use", "Individual experimentation", "A controlled pilot", "Approved tools in live workflows"] },
  { question: "Who owns workflow improvement?", options: ["No clear owner", "An informal champion", "A named workflow owner", "An accountable cross-functional team"] },
  { question: "How are AI-assisted outputs reviewed?", options: ["No defined standard", "Review depends on the person", "Key outputs have review steps", "Risk-based gates and audit trails are defined"] },
  { question: "Can the team measure the workflow today?", options: ["No baseline", "Anecdotal pain is known", "Time or error data exists", "Cycle time, quality, and exceptions are tracked"] },
  { question: "How prepared is the team to change the workflow?", options: ["Low capacity or alignment", "Interest without allocated time", "A pilot team is available", "Leadership and users are ready to embed it"] },
];

const readinessStages = [
  { max: 6, name: "By Hand", copy: "Start by mapping one expensive workflow before choosing technology.", actions: ["Choose one recurring workflow", "Name its owner", "Capture a baseline"] },
  { max: 12, name: "Patched", copy: "The opportunity is visible, but process and data foundations need tightening.", actions: ["Document exceptions", "Reduce duplicate entry", "Define approved data access"] },
  { max: 18, name: "Pilot Ready", copy: "You have enough structure to test a narrow, controlled system.", actions: ["Select a measurable pilot", "Set human review gates", "Run against live examples"] },
  { max: 24, name: "Operational", copy: "The organization is positioned to embed and expand proven AI workflows.", actions: ["Connect approved systems", "Monitor quality and adoption", "Expand from proven workflows"] },
];

const quiz = document.querySelector("[data-readiness-quiz]");
if (quiz) {
  let currentQuestion = 0;
  const answers = Array(readinessQuestions.length).fill(null);
  const questionView = quiz.querySelector("[data-quiz-question-view]");
  const resultView = quiz.querySelector("[data-quiz-result]");
  const progress = document.querySelector("[data-quiz-progress]");

  const renderQuestion = () => {
    const data = readinessQuestions[currentQuestion];
    questionView.innerHTML = `
      <div class="micro-label">Question ${currentQuestion + 1} / ${readinessQuestions.length}</div>
      <h3>${data.question}</h3>
      <div class="quiz-options">${data.options.map((option, index) => `<button class="quiz-option ${answers[currentQuestion] === index ? "is-selected" : ""}" type="button" data-answer="${index}"><span>0${index + 1}</span>${option}</button>`).join("")}</div>
      <div class="quiz-nav"><button class="button button-outline" type="button" data-quiz-back ${currentQuestion === 0 ? "disabled" : ""}>Back</button><button class="button button-dark" type="button" data-quiz-next ${answers[currentQuestion] === null ? "disabled" : ""}>${currentQuestion === readinessQuestions.length - 1 ? "See Result" : "Next"}</button></div>`;
    progress?.style.setProperty("--quiz-progress", `${((currentQuestion + 1) / readinessQuestions.length) * 100}%`);
    questionView.querySelectorAll("[data-answer]").forEach((option) => option.addEventListener("click", () => {
      answers[currentQuestion] = Number(option.dataset.answer);
      renderQuestion();
    }));
    questionView.querySelector("[data-quiz-back]")?.addEventListener("click", () => { currentQuestion -= 1; renderQuestion(); });
    questionView.querySelector("[data-quiz-next]")?.addEventListener("click", () => {
      if (currentQuestion < readinessQuestions.length - 1) {
        currentQuestion += 1;
        renderQuestion();
        return;
      }
      const score = answers.reduce((total, answer) => total + answer, 0);
      const stage = readinessStages.find((item) => score <= item.max) || readinessStages.at(-1);
      questionView.hidden = true;
      resultView.classList.add("is-visible");
      resultView.innerHTML = `<div class="micro-label">Your readiness signal</div><div class="result-score">${score}<small>/24</small></div><div class="result-stage">${stage.name}</div><p>${stage.copy}</p><div class="result-actions">${stage.actions.map((action, index) => `<span>0${index + 1} / ${action}</span>`).join("")}</div><div class="button-row"><a class="button button-dark" href="contact.html">Discuss the Result</a><button class="button button-outline" type="button" data-quiz-reset>Retake</button></div>`;
      resultView.querySelector("[data-quiz-reset]")?.addEventListener("click", () => {
        answers.fill(null);
        currentQuestion = 0;
        resultView.classList.remove("is-visible");
        resultView.innerHTML = "";
        questionView.hidden = false;
        renderQuestion();
      });
    });
  };
  renderQuestion();
}

const roiForm = document.querySelector("[data-roi-form]");
if (roiForm) {
  const updateRoi = () => {
    const team = Math.max(1, Number(roiForm.elements.team.value) || 1);
    const hourly = Math.max(0, Number(roiForm.elements.hourly.value) || 0);
    const weekly = Math.max(0, Number(roiForm.elements.weekly.value) || 0);
    const assist = clamp((Number(roiForm.elements.assist.value) || 0) / 100);
    const hours = Math.round(team * weekly * 48 * assist);
    const value = Math.round(hours * hourly);
    const selected = roiForm.querySelectorAll('input[name="focus"]:checked').length;
    document.querySelector("[data-roi-hours]").textContent = hours.toLocaleString();
    document.querySelector("[data-roi-value]").textContent = `$${value.toLocaleString()}`;
    document.querySelector("[data-roi-focus]").textContent = selected;
  };
  roiForm.addEventListener("input", updateRoi);
  updateRoi();
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  const formSteps = [...contactForm.querySelectorAll(".form-step")];
  const stepSignals = [...document.querySelectorAll(".contact-steps span")];
  let step = 0;
  const renderFormStep = () => {
    formSteps.forEach((item, index) => item.classList.toggle("is-active", index === step));
    stepSignals.forEach((item, index) => item.classList.toggle("is-active", index <= step));
  };
  contactForm.querySelectorAll("[data-form-next]").forEach((button) => button.addEventListener("click", () => {
    const fields = [...formSteps[step].querySelectorAll("input, select, textarea")];
    if (!fields.every((field) => field.reportValidity())) return;
    step = Math.min(formSteps.length - 1, step + 1);
    renderFormStep();
  }));
  contactForm.querySelectorAll("[data-form-back]").forEach((button) => button.addEventListener("click", () => {
    step = Math.max(0, step - 1);
    renderFormStep();
  }));
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(`Workflow inquiry from ${data.get("company") || data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nIndustry: ${data.get("industry")}\nPriority: ${data.get("priority")}\nWorkflow: ${data.get("workflow")}\nOutcome: ${data.get("outcome")}\nTiming: ${data.get("timing")}\n\nContext:\n${data.get("message")}`);
    window.location.href = `mailto:hello@customaisystems.com?subject=${subject}&body=${body}`;
  });
  renderFormStep();
}

document.querySelectorAll("[data-current-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});
