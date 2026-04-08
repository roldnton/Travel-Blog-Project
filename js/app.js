document.addEventListener("DOMContentLoaded", () => {
  
  const heroSection = document.querySelector('.hero-section');
  
  const bgImages = [
    'img/baguio.jpg',
    'img/Boracay.png',
    'img/Zambales.jpg',
    'img/Malapascua.jpg',
    'img/Intramuros.jpg'
  ];
  
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % bgImages.length;
    heroSection.style.backgroundImage = `url('${bgImages[currentIndex]}')`;
  }, 5000); 



  const toggleBtn = document.getElementById("themeToggle");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    }

  });
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "☀️";
    }

});
