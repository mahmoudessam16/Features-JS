let mainColor = localStorage.getItem('color_option');

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);
    document.querySelectorAll(".colors-list li").forEach(li => {
        li.classList.remove('active');
    });
    document.querySelector(`[data-color="${mainColor}"]`).classList.add('active');
}


let settingIcon = document.querySelector('.icon');
let settingBox = document.querySelector('.settings-box');

settingIcon.onclick = function () {
    settingBox.classList.toggle("toggle-setting");
}



// Switch Colors 
const ColorsLi = document.querySelectorAll(".colors-list li");

ColorsLi.forEach((li) => {
    li.addEventListener('click', function (e) {
        ColorsLi.forEach(li => {
            li.classList.remove('active');
        })
        console.log(e.target.dataset.color)
        document.querySelector(`[data-color="${e.target.dataset.color}"]`).classList.add("active");
        document.documentElement.style.setProperty('--main-color', `${e.target.dataset.color}`);
        localStorage.setItem("color_option", e.target.dataset.color);
    });
});


let backgroundOption = true;
let backgroundInterval;
const randomBackEl = document.querySelectorAll(".random-buttons span");

randomBackEl.forEach(span => {
    span.classList.remove('active');
});

let backgroundLocalItem = localStorage.getItem("background_option");
document.querySelector(".random-buttons span.yes").classList.add("active");
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
        document.querySelector(".random-buttons span.yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".random-buttons span.no").classList.add("active");
    }
}


randomBackEl.forEach((span) => {
    span.addEventListener('click', function (e) {
        randomBackEl.forEach(span => {
            span.classList.remove('active');
        });
        e.target.classList.add('active');
        if (e.target.textContent.toLowerCase() === "yes") {
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});



let landing = document.querySelector(".landing-page");
let images = ["background-1.jpg", "background-2.jpg", "background-3.jpg", "background-4.jpg", "background-5.jpg"];

function randomizeImg() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            landing.style.backgroundImage = `url("../imgs/${images[Math.floor(Math.random() * images.length)]}")`;
        }, 1000);
    }
}

randomizeImg();

let scroller = document.querySelector(".scroller");
let bodyHeight = document.body.scrollHeight;
scroller.style.width = `${(window.innerHeight / bodyHeight) * 100}%`;

window.onscroll = () => {
    scroller.style.width = `${((window.innerHeight + window.pageYOffset) / bodyHeight) * 100}%`;
    if (window.scrollY >= 600) {
        document.querySelectorAll(".skill-progress span").forEach(span => {
            span.style.width = span.dataset.progress;
        });
    } else {
        document.querySelectorAll(".skill-progress span").forEach(span => {
            span.style.width = '0%';
        });
    }
}

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach(image => {
    image.addEventListener('click', (e) => {
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        let popupImage = document.createElement('img');
        popupImage.src = e.target.src;
        popupBox.appendChild(popupImage);
        let imgHeading = document.createElement('h3');
        let imgText = document.createTextNode(e.target.alt);
        imgHeading.appendChild(imgText);
        imgHeading.className = 'image-heading';
        popupBox.appendChild(imgHeading);
        // Close Btn
        let closeBtn = document.createElement('span');
        let closeBtnText = document.createTextNode("X");
        closeBtn.appendChild(closeBtnText);
        popupBox.appendChild(closeBtn);
        document.body.append(overlay, popupBox);
        closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            popupBox.style.display = 'none';
        })
    });
})


let allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach(bullet => {
    bullet.addEventListener('click', (e) => {
        document.querySelector(`.${e.target.dataset.reach}`).scrollIntoView({
            behavior: 'smooth',
        });
    })
})

let bulletOption = document.querySelectorAll('.bullets-option span');
let bulletsLocalStorage = localStorage.getItem('bullets_option');

if (bulletsLocalStorage !== null) {
    if (bulletsLocalStorage === 'true') {
        document.querySelector(".nav-bullets").style.display = "block";
        bulletOption.forEach(bullet => {
            bullet.classList.remove('active');
        })
        document.querySelector('.bullets-option span.yes').classList.add('active');
    } else {
        document.querySelector(".nav-bullets").style.display = "none";
        bulletOption.forEach(bullet => {
            bullet.classList.remove('active');
        })
        document.querySelector('.bullets-option span.no').classList.add('active');
    }
}
bulletOption.forEach(span => {
    span.addEventListener('click', (e) => {
        if (e.target.dataset.display === "hide") {
            document.querySelector(".nav-bullets").style.display = "none";
            localStorage.setItem('bullets_option', 'false');
        } else if (e.target.dataset.display === 'show') {
            document.querySelector(".nav-bullets").style.display = "block";
            localStorage.setItem('bullets_option', 'true');
        }
        bulletOption.forEach(bullet => {
            bullet.classList.remove('active');
        })
        e.target.classList.add('active');
    })
})

document.querySelector('.reset-options').onclick = function () {
    localStorage.clear();
    window.location.reload();
}

let toggleMenu = document.querySelector('.header .toggle-menu');
let links = document.querySelector('.header .links');

toggleMenu.onclick = function () {
    links.classList.toggle("open");
    this.classList.toggle('menu-active');
}

document.addEventListener('click', function (e) {
    if (e.target !== toggleMenu && e.target !== links) {
        links.classList.remove("open")
        toggleMenu.classList.remove('menu-active');
    }
})
links.onclick = function (e) {
    e.stopPropagation();
}

let footerDate = document.querySelector('.footer span');

footerDate.textContent = new Date().getFullYear();

