// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Avatar placeholder logic
const img = document.getElementById("avatarImg");
const ph = document.getElementById("avatarPlaceholder");

img.addEventListener("load", () => {
  img.style.display = "block";
  ph.style.display = "none";
});

img.addEventListener("error", () => {
  img.style.display = "none";
  ph.style.display = "block";
});
