const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav a");
['Trang chủ', 'Cuộc thi', 'Bản đồ hương sắc', 'Thông tin cuộc thi', 'Liên hệ'].forEach((label, index) => {
  if (navLinks[index]) navLinks[index].textContent = label;
});
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 32);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toggle.addEventListener("click", () => {
  const open = header.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "×" : "☰";
});
navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    header.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  }),
);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.1 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));
