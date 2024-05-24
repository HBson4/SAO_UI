function onLoad() {
    document.querySelector('#name').innerHTML = sessionStorage.getItem('name');
    document.querySelector('#main_body').classList.add('default-background');

    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('introVideo');
    
    // Check if the video has already been played
    if (sessionStorage.getItem('videoPlayed') !== 'True') {
        videoContainer.classList.remove('closed');
        video.addEventListener('ended', fadeOutVideo);
        video.play();
    } else {
        videoContainer.classList.add('closed');
    }
}

function fadeOutVideo() {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.style.opacity = '0';

    // Remove the video container from the DOM after the transition ends
    videoContainer.addEventListener('transitionend', () => {
        videoContainer.classList.add('closed');
        sessionStorage.setItem('videoPlayed', 'True');
    });
}

function setBackground(button) {
    // Get the source of the clicked thumbnail
    const imgSrc = button.querySelector('img').src;

    // Set the body background image
    const body = document.getElementById('main_body');
    body.style.backgroundImage = `url(${imgSrc})`;
}

function onSubmit() {
    const account = document.querySelector('input[type="text"]').value;
    sessionStorage.setItem('name', account);
}

function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

window.addEventListener('auxclick', function(event) {
    if (event.button == 1) {
        toggleMenu();
    }
});

function toggleMenu() {
    menuOpenSound();

    const menu = document.querySelector('#menu');
    menu.classList.toggle('open');
    menu.classList.toggle('closed');

    // If the menu is closed, hide all submenus
    if (menu.classList.contains('closed')) {
        hideAllSubMenus();
        deselectMenuBtn();
    }
}

function hideAllSubMenus() {
    const subMenus = document.querySelectorAll('.subMenu');
    const activeButton = document.querySelector('.subMenuBtn.activeSub');
    subMenus.forEach(subMenu => {
        subMenu.style.display = 'none';
        if (activeButton) {
            activeButton.classList.remove('.activeSub');
            const img = activeButton.querySelector('img');
            img.src = img.src.replace('_on', '');
        }
    });

    // Remove any existing arrow
    const existingArrow = document.querySelector('.arrow');
    if (existingArrow) {
        existingArrow.remove();
    }
}

function selectMenuBtn(button) {
    menuSelectSound();

    // Remove active class from any currently active button and restore image src
    const activeButton = document.querySelector('.menuBtn.active');
    if (activeButton) {
        activeButton.classList.remove('active');
        const img = activeButton.querySelector('img');
        img.src = img.src.replace('_on', '');
    }

    const activeSubButton = document.querySelector('.subMenuBtn.activeSub');
    if (activeSubButton) {
        activeSubButton.classList.remove('activeSub');
        const img = activeSubButton.querySelector('img');
        img.src = img.src.replace('_on', '');
    }

    // Add active class to the clicked button and modify image src
    button.classList.add('active');
    const img = button.querySelector('img');
    const newSrc = img.src.replace('.png', '_on.png');
    img.src = newSrc;

    // Show submenu and position the arrow
    showSubMenu(button.id);
}

function deselectMenuBtn() {
    const activeButton = document.querySelector('.menuBtn.active');
    if (activeButton) {
        activeButton.classList.remove('active');
        const img = activeButton.querySelector('img');
        img.src = img.src.replace('_on', '');
    }
}

function selectSubMenuItem(button) {
    menuSelectSound();

    // Remove active class from any currently active button and restore image src
    const activeButton = document.querySelector('.subMenuBtn.activeSub');
    
    if (activeButton) {
        activeButton.classList.remove('activeSub');
        const img = activeButton.querySelector('img');
        img.src = img.src.replace('_on', '');
    }

    // Add active class to the clicked button and modify image src
    button.classList.add('activeSub');
    const img = button.querySelector('img');
    const newSrc = img.src.replace('.png', '_on.png');
    img.src = newSrc;
}

function showSubMenu(menuId) {
    // Hide all submenus
    const subMenus = document.querySelectorAll('.subMenu');
    subMenus.forEach(subMenu => subMenu.style.display = 'none');

    // Get the relevant submenu and show it
    const subMenu = document.querySelector(`#${menuId}Sub`);
    subMenu.style.display = 'flex';

    // Remove any existing arrow
    const existingArrow = document.querySelector('.arrow');
    if (existingArrow) {
        existingArrow.remove();
    }

    // Create and append the arrow
    const arrow = document.createElement('div');
    arrow.classList.add('arrow');
    arrow.innerHTML = `<div class="triangleLeft"></div>
                       <div class="verticleLine"></div>`;
    document.body.appendChild(arrow);

    // Position the submenu and arrow next to the selected menu button
    const button = document.querySelector(`#${menuId}`);
    const rect = button.getBoundingClientRect();
    subMenu.style.top = `${rect.top + window.scrollY - 25}px`;
    subMenu.style.left = `${rect.left + rect.width + 20}px`;

    // Position the arrow
    arrow.style.top = `${rect.top + window.scrollY + rect.height / 2 - 58}px`;
    arrow.style.left = `${rect.left + rect.width + 10}px`;
}

// AUDIO
function menuOpenSound() {
    var audio = new Audio('audio/sao_menu_open.mp3');
    audio.play();
}

function menuSelectSound() {
    var audio = new Audio('audio/sao_menu_select.mp3');
    audio.play();
}
