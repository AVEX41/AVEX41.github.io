import "./style.css";
import { initBackgroundScene } from "./scene";

const canvas = document.getElementById("bg-canvas") as HTMLCanvasElement;
if (canvas) initBackgroundScene(canvas);

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const SECTION_IDS = ["hero", "pentesting", "student", "homelab", "photography", "contact"];
const SCROLL_DURATION_MS = 750;

function getSections(): HTMLElement[] {
  return SECTION_IDS
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);
}

function getNavOffset(): number {
  const nav = document.querySelector<HTMLElement>(".nav");
  return nav ? nav.getBoundingClientRect().height : 0;
}

function currentSectionIndex(sections: HTMLElement[]): number {
  const probe = window.scrollY + getNavOffset() + 40;
  let idx = 0;
  sections.forEach((sec, i) => {
    if (sec.offsetTop <= probe) idx = i;
  });
  return idx;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let activeScrollToken = 0;

function animatedScrollTo(targetY: number, duration = SCROLL_DURATION_MS) {
  const token = ++activeScrollToken;
  const startY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const clampedTarget = Math.max(0, Math.min(targetY, maxScroll));
  const clampedDistance = clampedTarget - startY;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (token !== activeScrollToken) return;
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + clampedDistance * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function smoothScrollTo(el: HTMLElement) {
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset() + 1;
  animatedScrollTo(top);
}

function goToNextSection() {
  const sections = getSections();
  if (sections.length === 0) return;
  const idx = currentSectionIndex(sections);
  const next = sections[Math.min(idx + 1, sections.length - 1)];
  if (next) smoothScrollTo(next);
}

function goToPrevSection() {
  const sections = getSections();
  if (sections.length === 0) return;
  const idx = currentSectionIndex(sections);
  const prev = sections[Math.max(idx - 1, 0)];
  if (prev) smoothScrollTo(prev);
}

window.addEventListener("keydown", (e) => {
  const target = e.target as HTMLElement | null;
  const isTypingField =
    target &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable);
  if (isTypingField) return;

  if (e.key === "Enter" || e.key === "ArrowDown") {
    e.preventDefault();
    goToNextSection();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    goToPrevSection();
  }
});

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(target);
    history.pushState(null, "", `#${id}`);
  });
});
