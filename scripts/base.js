function onLoad() {
    document.querySelector('#name').innerHTML = sessionStorage.getItem('name');
    document.querySelector('#main_body').classList.add('default-background');
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
    subMenus.forEach(subMenu => {
        subMenu.style.display = 'none';
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
