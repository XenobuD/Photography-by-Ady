setTimeout(() => {
  document.querySelector('.intro').style.display = 'none';
  document.querySelector('.main-content').classList.remove('hidden');
}, 4000);

// Navigation hover colors
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('mouseenter', () => link.style.color = '#f54291');
  link.addEventListener('mouseleave', () => link.style.color = '#d2006b');
});

// Block right-click image saving
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  alert('SORRY :D : salvarea imaginilor nu este permisă 📷');
});

// Inject contact section
const contactSection = document.getElementById('contact-info');
contactSection.innerHTML = `
  <div class="contact-links">
    <p class="cinema-line" style="animation-delay: 0.3s">📘 Facebook: 
      <a href="https://www.facebook.com/VisanAdrianPhotography/" target="_blank">Visan Adrian</a></p>
    <p class="cinema-line" style="animation-delay: 0.6s">💬 WhatsApp: 
      <a href="https://wa.me/40742092640" target="_blank">0742 092 640</a></p>
    <p class="cinema-line" style="animation-delay: 0.9s">📞 Telefon: 
      <a href="tel:0742 092 640">0742 092 640</a></p>
    <p class="cinema-line" style="animation-delay: 1.2s">🛠️ Servicii: 
      Fotografie de nuntă, Trash the Dress, Albume foto</p>
    <p class="cinema-line" style="animation-delay: 1.5s">🛠️ Servicii: 
      Botezuri, Majorate, Aniversari, etc.. </p>
  </div>
`;

// Fullscreen gallery logic (without × button)
window.addEventListener("load", () => {
  const images = Array.from(document.querySelectorAll(".gallery-grid-five img, .gallery-row img"));
  let currentIndex = -1;

  function showImage(index) {
    const fullscreen = document.createElement("div");
    fullscreen.className = "fullscreen-overlay";
    fullscreen.style.position = "fixed";
    fullscreen.style.top = 0;
    fullscreen.style.left = 0;
    fullscreen.style.width = "100vw";
    fullscreen.style.height = "100vh";
    fullscreen.style.background = "rgba(0,0,0,0.9)";
    fullscreen.style.display = "flex";
    fullscreen.style.justifyContent = "center";
    fullscreen.style.alignItems = "center";
    fullscreen.style.zIndex = 9999;
    fullscreen.style.overflow = "hidden";

    const clone = images[index].cloneNode();
    clone.style.maxWidth = "90%";
    clone.style.maxHeight = "90%";
    clone.style.borderRadius = "12px";

    const btnLeft = document.createElement("button");
    btnLeft.textContent = "←";
    btnLeft.className = "nav-button left";
    btnLeft.onclick = (e) => {
      e.stopPropagation();
      fullscreen.remove();
      showImage((index - 1 + images.length) % images.length);
    };

    const btnRight = document.createElement("button");
    btnRight.textContent = "→";
    btnRight.className = "nav-button right";
    btnRight.onclick = (e) => {
      e.stopPropagation();
      fullscreen.remove();
      showImage((index + 1) % images.length);
    };

    // Clicking anywhere closes fullscreen
    fullscreen.onclick = () => fullscreen.remove();

    fullscreen.append(clone, btnLeft, btnRight);
    document.body.appendChild(fullscreen);
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage(currentIndex);
    });
  });
});
