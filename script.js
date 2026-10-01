document.documentElement.classList.add("js-loaded");
const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const progress = document.getElementById("progress");

themeBtn?.addEventListener("click", () => {
  body.classList.toggle("light");
  themeBtn.textContent = body.classList.contains("light") ? "☼" : "◐";
  localStorage.setItem("adil-theme", body.classList.contains("light") ? "light" : "dark");
});

if (localStorage.getItem("adil-theme") === "light") {
  body.classList.add("light");
  themeBtn.textContent = "☼";
}

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.textContent = navLinks.classList.contains("open") ? "Close" : "Menu";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "Menu";
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    document.querySelectorAll(".project").forEach(card => {
      const categories = card.dataset.category || "";
      card.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

// Small interactive terminal effect: keeps the hero feeling alive without heavy libraries.
const cursor = document.querySelector(".cursor");
setInterval(() => {
  if (cursor) cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
}, 650);
