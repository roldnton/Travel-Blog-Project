document.addEventListener("DOMContentLoaded", () => {

    const heroImage = document.querySelector('.hero-image');

    window.addEventListener('scroll', () => {

        // Get how many pixels we've scrolled down
        let scrollPosition = window.scrollY;

        // Calculate the blur amount. 
        // Dividing by 50 means it takes 50px of scrolling to get 1px of blur.
        // Math.min caps the maximum blur at 10px so it doesn't get completely unrecognizable.
        let blurValue = Math.min(scrollPosition / 50, 10);
        
        // Apply the blur to the image
        heroImage.style.filter = `blur(${blurValue}px)`; 
    });    

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
