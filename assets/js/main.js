const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuToggle?.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  mobileNav.setAttribute("aria-hidden", !open);
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

const commands = [
  ["whoami", "herotomo.fazry — software programmer"],
  ["pwd", "~/herokoding"],
  ["git status", "building useful things since 2013"],
  ["cat stack.txt", "PHP · Laravel · CodeIgniter · JavaScript · MySQL · Linux"]
];

const commandText = document.getElementById("terminal-text");
const output = document.querySelector(".terminal-output");
let commandIndex = 0;
let charIndex = 0;
let deleting = false;

function typeCommand() {
  if (!commandText || !output) return;
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
  setTimeout(typeCommand, deleting ? 35 : 75);
}

typeCommand();

document.getElementById("year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".project, .timeline-item, .services article");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 550, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealItems.forEach(el => {
  el.style.opacity = "0";
  observer.observe(el);
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  }
});
