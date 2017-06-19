 window.onload = function(){ 
 
    var button = document.getElementById('menu-button');
    var menuTop = document.querySelector('.site-header__nav-item-container-top');
    var menuBottom = document.querySelector('.site-header__nav-item-container-bottom');

    button.onclick = function() {
      menuTop.classList.toggle('site-header__nav-item-container-top--closed');
      menuBottom.classList.toggle('site-header__nav-item-container-bottom--closed');
    };
}; 