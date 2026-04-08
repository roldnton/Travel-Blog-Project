document.addEventListener("DOMContentLoaded", () => {
  
  const heroSection = document.querySelector('.hero-section');
  
  const bgImages = [
    'img/Baguio.jpg',
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

});