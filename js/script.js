 window.onload = function(){ 
 
    var buttonMenu = document.getElementById('menu-button');
    var menuTop = document.querySelector('.site-header__nav-item-container-top');
    var menuBottom = document.querySelector('.site-header__nav-item-container-bottom');

    buttonMenu.onclick = function() {
      menuTop.classList.toggle('site-header__nav-item-container-top--closed');
      menuBottom.classList.toggle('site-header__nav-item-container-bottom--closed');
      buttonMenu.classList.toggle('site-header__button--open');
    };

    var buttonBuy = document.getElementById('buy');
    var modalForm = document.querySelector('.buy-form');

    buttonBuy.onclick = function() {
      modalForm.classList.toggle('buy-form--open');
    };

}; 