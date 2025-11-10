document.addEventListener('DOMContentLoaded', () => {
    const garden = document.getElementById('garden');
    const nightSky = document.getElementById('night-sky');
    const initialFlowerCount = 5;
    const petalColors = ['#ffffff', '#f8f8ff', '#f5f5dc', '#fffafa', '#fafad2'];
    const labellumSpotColors = [
        '#ffd700', '#da70d6', '#ff69b4'
    ];

    const random = (min, max) => Math.random() * (max - min) + min;

    function createFlower(x, y, delay = 0) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        const scale = random(0.6, 1.1);
        flower.style.transform = `scale(${scale})`;

        if (x && y) {
            flower.style.left = `${x}px`;
            flower.style.bottom = `${window.innerHeight - y}px`;
        } else {
            flower.style.left = `${random(10, 90)}vw`;
            flower.style.bottom = `${random(10, 40)}vh`;
        }

        const baseColor = petalColors[Math.floor(random(0, petalColors.length))];
        const spotColor = labellumSpotColors[Math.floor(random(0, labellumSpotColors.length))];
        const stemHeight = random(100, 250);

        flower.innerHTML = `
            <div class="orchid">
                <div class="orchid__petal orchid__petal--side-sepal-left" style="background: radial-gradient(circle, #ffffff 60%, ${baseColor});"></div>
                <div class="orchid__petal orchid__petal--side-sepal-right" style="background: radial-gradient(circle, #ffffff 60%, ${baseColor});"></div>
                <div class="orchid__petal orchid__petal--top-sepal" style="background: radial-gradient(circle, #ffffff 60%, ${baseColor});"></div>
                
                <div class="orchid__petal orchid__petal--side-petal-left" style="background: radial-gradient(circle, #ffffff 60%, ${baseColor});"></div>
                <div class="orchid__petal orchid__petal--side-petal-right" style="background: radial-gradient(circle, #ffffff 60%, ${baseColor});"></div>

                <div class="orchid__labellum" style="background: radial-gradient(circle, #ffffff 60%, ${baseColor});">
                    <div class="orchid__labellum__center" style="background-image: radial-gradient(circle, ${spotColor} 20%, transparent 21%), radial-gradient(circle, ${spotColor} 20%, transparent 21%);"></div>
                </div>
            </div>
            <div class="flower__line" style="height: ${stemHeight}px;">
                <div class="flower__line__leaf flower__line__leaf--1"></div>
                <div class="flower__line__leaf flower__line__leaf--2"></div>
            </div>
        `;

        flower.style.setProperty('--anim-delay', `${delay}s`);
        flower.style.setProperty('--stem-height', `${stemHeight}px`);
        
        garden.appendChild(flower);
    }

    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = `${random(-20, 80)}%`;
        star.style.top = `${random(0, 60)}%`;
        star.style.animationDuration = `${random(2, 4)}s`;
        star.style.animationDelay = `${random(0, 15)}s`;
        nightSky.appendChild(star);

        star.addEventListener('animationend', () => star.remove());
    }

    for (let i = 0; i < initialFlowerCount; i++) {
        createFlower(null, null, i * 0.5);
    }
    for (let i = 0; i < 15; i++) {
        createShootingStar();
    }
    setInterval(createShootingStar, 3000);


    window.addEventListener('click', (e) => {
        if (e.target.id === 'music-toggle') return;
        
        createFlower(e.clientX, e.clientY, 0);
    });

    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;
    music.volume = 0.3;

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicToggle.textContent = 'Müziği Başlat';
        } else {
            music.play().catch(() => {
                musicToggle.textContent = 'Müzik Engellendi';
            });
            musicToggle.textContent = 'Müziği Durdur';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${random(0, 100)}%`;
        star.style.top = `${random(0, 100)}%`;
        star.style.animationDelay = `${random(0, 5)}s`;
        star.style.animationDuration = `${random(2, 5)}s`;
        nightSky.appendChild(star);
    }
});