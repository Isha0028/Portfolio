import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function AIOrb() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    renderer.domElement.className = "h-full w-full";

    // lights
    scene.add(new THREE.AmbientLight(0x6a5cff, 0.55));
    const keyLight = new THREE.PointLight(0x5eead4, 6, 12, 2);
    keyLight.position.set(2.2, 1.6, 3);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xf472b6, 5, 12, 2);
    rimLight.position.set(-2.4, -1.2, 2);
    scene.add(rimLight);
    const fillLight = new THREE.PointLight(0xb491fa, 3, 14, 2);
    fillLight.position.set(0, -2, -3);
    scene.add(fillLight);

    // orb group
    const orb = new THREE.Group();
    scene.add(orb);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 6),
      new THREE.MeshStandardMaterial({
        color: 0x2a2160,
        emissive: 0x5eead4,
        emissiveIntensity: 0.55,
        roughness: 0.25,
        metalness: 0.65,
      })
    );
    orb.add(core);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 1),
      new THREE.MeshBasicMaterial({ color: 0x5eead4, wireframe: true, transparent: true, opacity: 0.3 })
    );
    orb.add(shell);

    const ringMatA = new THREE.MeshBasicMaterial({ color: 0xb491fa, transparent: true, opacity: 0.55 });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.018, 8, 120), ringMatA);
    ringA.rotation.x = Math.PI / 2.4;
    ringA.rotation.y = 0.3;
    orb.add(ringA);

    const ringMatB = new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.4 });
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.014, 8, 120), ringMatB);
    ringB.rotation.x = Math.PI / 3;
    ringB.rotation.y = -0.5;
    orb.add(ringB);

    // eyes
    const eyeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xf5fffb });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.32, 0.12, 0.92);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.32, 0.12, 0.92);
    orb.add(eyeL, eyeR);

    // particle field
    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0x9be8ff, size: 0.035, transparent: true, opacity: 0.55, sizeAttenuation: true })
    );
    scene.add(particles);

    function resize() {
      if (!container) return;
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const targetCamOffset = new THREE.Vector2(0, 0);
    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetCamOffset.set(nx, ny);
    }
    window.addEventListener("pointermove", onPointerMove);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    // blink loop
    let blinkTween: gsap.core.Tween | null = null;
    const blinkInterval = reduceMotion
      ? null
      : window.setInterval(() => {
          blinkTween = gsap.to([eyeL.scale, eyeR.scale], { y: 0.08, duration: 0.09, yoyo: true, repeat: 1, ease: "power1.inOut" });
        }, 3200);

    // scroll-linked motion on the canvas wrapper itself
    let scrollProgress = 0;
    let st: ScrollTrigger | null = null;
    if (!reduceMotion && container.closest("section")) {
      st = ScrollTrigger.create({
        trigger: container.closest("section") as Element,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress = self.progress;
        },
      });
    }

    let raf = 0;
    const clock = new THREE.Clock();

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      if (!reduceMotion) {
        orb.rotation.y += dt * 0.25;
        orb.rotation.z = scrollProgress * 0.6;
        orb.position.y = Math.sin(t * 0.6) * 0.15 - scrollProgress * 1.4;
        orb.scale.setScalar(1 - scrollProgress * 0.25);
        shell.rotation.y -= dt * 0.18;
        shell.rotation.x += dt * 0.05;
        ringA.rotation.z += dt * 0.3;
        ringB.rotation.z -= dt * 0.22;
        particles.rotation.y += dt * 0.02;

        camera.position.x += (targetCamOffset.x * 0.9 - camera.position.x) * 0.04;
        camera.position.y += (-targetCamOffset.y * 0.6 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      st?.kill();
      if (blinkInterval) window.clearInterval(blinkInterval);
      blinkTween?.kill();
      window.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      [core, shell, ringA, ringB, eyeL, eyeR].forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      particleGeo.dispose();
      (particles.material as THREE.Material).dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}
