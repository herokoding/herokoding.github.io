const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function setMenu(open) {
  mobileNav?.classList.toggle("open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav?.setAttribute("aria-hidden", String(!open));
}

menuToggle?.addEventListener("click", () => {
  setMenu(!mobileNav.classList.contains("open"));
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

/* --- terminal typing ------------------------------------------------ */

const commands = [
  ["whoami", "herotomo.fazry — software programmer"],
  ["pwd", "~/herokoding"],
  ["git push", "sending 3 commits → repo updated"],
  ["cat stack.txt", "PHP · Laravel · CodeIgniter · JavaScript · MySQL · Linux"]
];

const commandText = document.getElementById("terminal-text");
const output = document.querySelector(".terminal-output");

if (commandText && output && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let commandIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeCommand = () => {
    const [command, result] = commands[commandIndex];

    if (!deleting) {
      commandText.textContent = command.slice(0, charIndex++);
      if (charIndex > command.length) {
        output.textContent = result;
        deleting = true;
        setTimeout(typeCommand, 2600);
        return;
      }
    } else {
      commandText.textContent = command.slice(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        charIndex = 0;
        commandIndex = (commandIndex + 1) % commands.length;
      }
    }

    setTimeout(typeCommand, deleting ? 30 : 70);
  };

  typeCommand();
}

/* --- year ------------------------------------------------------------ */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* --- case study sliders ---------------------------------------------- */

document.querySelectorAll(".slider").forEach(slider => {
  const track = slider.querySelector(".slider-track");
  const slides = slider.querySelectorAll(".slider-slide");
  const dotsWrap = slider.querySelector(".slider-dots");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");
  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => go(i));
    dotsWrap?.appendChild(dot);
  });

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dotsWrap?.querySelectorAll("button").forEach((d, di) => d.classList.toggle("active", di === index));
    slides.forEach((s, si) => {
      const v = s.querySelector("video");
      if (!v) return;
      if (si === index) { v.play().catch(() => {}); } else { v.pause(); }
    });
  }

  prev?.addEventListener("click", () => go(index - 1));
  next?.addEventListener("click", () => go(index + 1));

  let touchX = null;
  track?.addEventListener("touchstart", e => touchX = e.touches[0].clientX, { passive: true });
  track?.addEventListener("touchend", e => {
    if (touchX === null) return;
    const diff = e.changedTouches[0].clientX - touchX;
    if (Math.abs(diff) > 40) go(index + (diff < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });
});
