import "./style.css";
import { initBackgroundScene } from "./scene";

const canvas = document.getElementById("bg-canvas") as HTMLCanvasElement;
if (canvas) initBackgroundScene(canvas);

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
