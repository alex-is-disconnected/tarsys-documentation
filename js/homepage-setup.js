import * as THREE from "three";
import AsciiEffect from "./three/AsciiEffect.js";
import TypeShuffle from "./utils/shuffle.js";
import "./create-tooltip.js";

let camera, scene, renderer, effect;

let material, geometry, mesh;

let scale = 3;
const maxScale = 6;
const minScale = 2;
let scaleStep = 0.00051;

const start = Date.now();

init();
fadeInMaterial(material, 6000, 6000);
animate();

function fadeInMaterial(material, duration = 2000, delay = 0) {
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    if (elapsed > delay) {
      // Check if delay has elapsed
      const progress = elapsed - delay;
      const opacity = Math.min(progress / duration, 0.5);
      material.opacity = opacity;
    }

    if (elapsed < duration + delay) {
      // Continue animation until duration + delay is reached
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 5;
  camera.position.z = 500;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(15, 15, 15);

  material = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 0,
    flatShading: true,
  });

  const pointLight1 = new THREE.PointLight(0xb75b42, 50, 0, 0);
  pointLight1.position.set(500, 500, 500);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
  pointLight2.position.set(-500, -500, -500);
  scene.add(pointLight2);

  // new THREE.SphereGeometry( 200, 20, 10 )
  // new THREE.TorusKnotGeometry(100, 8, 88, 8, 17, 9);
  geometry = new THREE.TorusKnotGeometry(100, 1, 58, 5, 17, 9);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const depth = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const asciiGradient = ' `^",:;Il!i+_-?][}{1)(XYUJCLQ0OZ#MW&8%B@$0';
  const og = " .,`ASDEFGJHGEJ-+|%890";
  effect = new AsciiEffect(renderer, asciiGradient, { invert: false });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "var(--ui";
  effect.domElement.style.fontSize = "16px";

  const mask = document.createElement("div");
  mask.id = "ascii-mask";

  mask.appendChild(effect.domElement);
  document.body.appendChild(mask);

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  scale += scaleStep;
  if (scale > maxScale || scale < minScale) {
    scaleStep = -scaleStep;
  }
  mesh.scale.set(scale, scale, scale);

  effect.render(scene, camera);
}

const title = document.getElementById("cicada");
const titleTS = new TypeShuffle(title);
const asciiWrapper = document.getElementById("ascii-wrapper");
const homepageWrapper = document.getElementById("homepage-wrapper");
const siteMap = document.getElementById("site-map");

const fastSetting = false;
function loadHomepage() {
  if (fastSetting === false) {
    titleTS.trigger("fx6");

    setTimeout(() => {
      homepageWrapper.style.opacity = "1";
      setTimeout(() => {
        asciiWrapper.style.opacity = "1";
        setTimeout(() => {
          setTimeout(() => {
            siteMap.style.visibility = "visible";
            setTimeout(() => {
              siteMap.style.width = "220px";
              siteMap.style.height = "103px";
            }, 400);
          }, 750);
        }, 3000);
      }, 2000);
    }, 2000);
  } else {
    titleTS.trigger("fx6");
    setTimeout(() => {
      homepageWrapper.style.opacity = "1";
      setTimeout(() => {
        asciiWrapper.style.opacity = "1";
        setTimeout(() => {
          siteMap.style.visibility = "visible";
          setTimeout(() => {
            setTimeout(() => {
              siteMap.style.width = "220px";
              siteMap.style.height = "103px";
            }, 1);
          }, 1);
        }, 1);
      }, 1);
    }, 1);
  }
}

loadHomepage();
