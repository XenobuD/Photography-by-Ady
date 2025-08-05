window.addEventListener("load", () => {
  const images = Array.from(document.querySelectorAll('.image-card img'));
  let currentIndex = -1;

  const showImage = (index) => {
    const fullscreen = document.createElement('div');
    fullscreen.classList.add('fullscreen-overlay');
    fullscreen.style.position = 'fixed';
    fullscreen.style.top = 0;
    fullscreen.style.left = 0;
    fullscreen.style.width = '100vw';
    fullscreen.style.height = '100vh';
    fullscreen.style.background = 'rgba(0, 0, 0, 0.9)';
    fullscreen.style.display = 'flex';
    fullscreen.style.justifyContent = 'center';
    fullscreen.style.alignItems = 'center';
    fullscreen.style.zIndex = 9999;
    fullscreen.style.transition = 'opacity 0.3s ease';

    const clone = images[index].cloneNode();
    clone.style.maxWidth = '90%';
    clone.style.maxHeight = '90%';
    clone.style.borderRadius = '10px';

    const btnPrev = document.createElement('button');
    btnPrev.textContent = '←';
    btnPrev.className = 'nav-button left';

    const btnNext = document.createElement('button');
    btnNext.textContent = '→';
    btnNext.className = 'nav-button right';

    btnPrev.onclick = () => {
      fullscreen.remove();
      showImage((index - 1 + images.length) % images.length);
    };

    btnNext.onclick = () => {
      fullscreen.remove();
      showImage((index + 1) % images.length);
    };

    fullscreen.addEventListener('click', () => fullscreen.remove());

    fullscreen.appendChild(clone);
    fullscreen.appendChild(btnPrev);
    fullscreen.appendChild(btnNext);
    document.body.appendChild(fullscreen);
  };

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
    });
  });

  // Intro logic (merged with previous message):
  setTimeout(() => {
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.querySelector(".main-content");

    if (introScreen) introScreen.style.display = "none";
    if (mainContent) mainContent.classList.add("show");
  }, 5000);
});
