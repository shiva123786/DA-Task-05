/* ============================================================
   3D ROTATING DIGITAL GLOBE WITH GLOW HIGHLIGHT
============================================================ */

(function () {
    const canvas = document.getElementById("globeCanvas");
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 2.8;

    /* -------------------------------
       EARTH GEOMETRY (Wireframe)
    --------------------------------*/
    const globeGeometry = new THREE.SphereGeometry(1, 60, 60);
    const globeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00baff,
        wireframe: true,
        opacity: 0.25,
        transparent: true
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    /* -------------------------------
       GLOWING WHITE HIGHLIGHT LAYER
       (the moving white arc)
    --------------------------------*/
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35
    });

    const glowSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.03, 60, 60),
        glowMaterial
    );

    scene.add(glowSphere);

    /* -------------------------------
       ANIMATION LOOP
    --------------------------------*/
    function animate() {
        requestAnimationFrame(animate);

        // Rotate both layers
        globe.rotation.y += 0.002;
        glowSphere.rotation.y += 0.002;

        // Slight pulsing highlight
        glowSphere.material.opacity = 0.28 + Math.sin(Date.now() * 0.0006) * 0.08;

        renderer.render(scene, camera);
    }

    animate();

    /* -------------------------------
       RESIZE HANDLER
    --------------------------------*/
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

})();

/* ============================================================
   3D ROTATING DIGITAL GLOBE WITH MULTI-LAYER SHINE EFFECT
============================================================ */

(function () {
    const canvas = document.getElementById("globeCanvas");
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 3.1;

    /* ============================================================
       1) MAIN BLUE WIRE GLOBE (Outer Layer)
    ============================================================= */
    const outerGlobe = new THREE.Mesh(
        new THREE.SphereGeometry(1, 70, 70),
        new THREE.MeshBasicMaterial({
            color: 0x00baff,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        })
    );
    scene.add(outerGlobe);

    /* ============================================================
       2) INNER GLOW WHITE LAYER (Fast Rotation Highlight)
    ============================================================= */
    const glowSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.05, 70, 70),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.30
        })
    );
    scene.add(glowSphere);

    /* ============================================================
       3) INNER CORE (Soft Faint Rotating Layer)
    ============================================================= */
    const innerCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.94, 70, 70),
        new THREE.MeshBasicMaterial({
            color: 0x66ccff,
            wireframe: true,
            transparent: true,
            opacity: 0.18
        })
    );
    scene.add(innerCore);

    /* ============================================================
       ANIMATION LOOP
    ============================================================= */
    function animate() {
        requestAnimationFrame(animate);

        // Outer globe rotates slowly
        outerGlobe.rotation.y += 0.002;

        // Inner glow rotates faster
        glowSphere.rotation.y += 0.0035;

        // Core rotates even slower for depth effect
        innerCore.rotation.y += 0.0015;

        // Pulse white glow brightness slowly
        glowSphere.material.opacity =
            0.25 + Math.sin(Date.now() * 0.0007) * 0.08;

        renderer.render(scene, camera);
    }

    animate();

    /* ============================================================
       RESIZE HANDLE
    ============================================================= */
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
})();


/* ============================================================
   1) 3D ROTATING GLOBE BACKGROUND (THREE.JS)
   ============================================================ */

(function () {

  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 7);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  const loader = new THREE.TextureLoader();

  // Earth textures (hosted online)
  const earthTexture = loader.load(
    "https://raw.githubusercontent.com/JulianLaval/country-json/master/maps/earthmap4k.jpg"
  );
  const bumpTexture = loader.load(
    "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthbump1k.jpg"
  );
  const specTexture = loader.load(
    "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthspec1k.jpg"
  );
  const cloudTexture = loader.load(
    "https://raw.githubusercontent.com/JulianLaval/country-json/master/maps/clouds_4k.png"
  );

  const earthGeo = new THREE.SphereGeometry(3, 64, 64);
  const earthMat = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.05,
    specularMap: specTexture,
    specular: new THREE.Color("grey"),
  });

  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  scene.add(earthMesh);

  const cloudGeo = new THREE.SphereGeometry(3.03, 64, 64);
  const cloudMat = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.9
  });

  const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
  scene.add(cloudMesh);

  const starGeo = new THREE.BufferGeometry();
  const starCount = 1500;
  const starArray = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starArray[i * 3] = (Math.random() - 0.5) * 200;
    starArray[i * 3 + 1] = (Math.random() - 0.5) * 200;
    starArray[i * 3 + 2] = -Math.random() * 200;
  }

  starGeo.setAttribute("position", new THREE.BufferAttribute(starArray, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.6,
    transparent: true
  });

  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  function animate() {
    earthMesh.rotation.y += 0.0015;
    cloudMesh.rotation.y += 0.0022;
    stars.rotation.y -= 0.0003;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

})();


/* ============================================================
   2) DARK / LIGHT MODE
   ============================================================ */
const modeBtn = document.getElementById("modeToggle");

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  modeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode ☀️"
    : "Dark Mode 🌙";
});

/* ============================================================
   3) CONTACT FORM VALIDATION
   ============================================================ */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = contactForm.name.value.trim();
    let email = contactForm.email.value.trim();
    let message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      alert("❗ Please fill out all fields.");
    } else {
      alert("✅ Message submitted successfully!");
      contactForm.reset();
    }
  });
}

/* ============================================================
   4) COUNTER FEATURE
   ============================================================ */
let count = 0;
function increaseCounter() {
  count++;
  document.getElementById("counterValue").textContent = count;
}

/* ============================================================
   5) TASK MANAGER
   ============================================================ */
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return alert("⚠ Enter a task first.");

    const li = document.createElement("li");
    li.innerHTML = `
        ${text}
        <button class="completeBtn">✔</button>
        <button class="deleteBtn">🗑</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    li.querySelector(".completeBtn").onclick = () => {
      li.classList.toggle("completed");
    };

    li.querySelector(".deleteBtn").onclick = () => {
      li.remove();
    };
  });
}

/* ============================================================
   6) MOBILE MENU TOGGLE
   ============================================================ */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const nav = document.querySelector("nav");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("showMenu");
  });
}

/* ============================================================
   7) SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: "smooth",
      });
    }

    nav.classList.remove("showMenu");
  });
});


const revealElements = document.querySelectorAll(
  "section, article, .skills-grid div"
);

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    if (el.getBoundingClientRect().top < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ============================================================
   9) BUTTON RIPPLE EFFECT
   ============================================================ */

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

/* ============================================================
   10) HEADER GLOW ANIMATION
   ============================================================ */
const header = document.querySelector("header");

function floatingGlow() {
  header.classList.add("glow-effect");
  setTimeout(() => header.classList.remove("glow-effect"), 3000);
}

setInterval(floatingGlow, 8000);
