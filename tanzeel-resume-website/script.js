const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const themeToggle = document.getElementById("themeToggle");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const savedTheme = localStorage.getItem("tanzeel-theme");
if (savedTheme === "light") document.documentElement.setAttribute("data-theme", "light");
themeToggle.textContent = document.documentElement.dataset.theme === "light" ? "☾" : "☼";
themeToggle.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme !== "light";
  if (light) document.documentElement.setAttribute("data-theme", "light");
  else document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("tanzeel-theme", light ? "light" : "dark");
  themeToggle.textContent = light ? "☾" : "☼";
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const copyButton = document.getElementById("copyEmail");
copyButton.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  const feedback = document.getElementById("copyFeedback");
  try {
    await navigator.clipboard.writeText(email);
    feedback.textContent = "Email copied to clipboard.";
  } catch {
    feedback.textContent = email;
  }
});
document.getElementById("year").textContent = new Date().getFullYear();

// Mark the navigation item for the section currently in view.
const sectionLinks = [...mainNav.querySelectorAll('a[href^="#"]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sectionLinks.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
