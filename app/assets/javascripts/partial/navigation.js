this.App.navigation = function() {
    var navigation = document.querySelector('nav.navigation');
    var links = document.querySelectorAll('ul.navigation__list a');
    var button = document.querySelector('button.navigation__mobile-button');
    var color = '#fff';
    if (window.pageYOffset > 50) {
        navigation.style.animation = 'position_fixed 600ms ease-out forwards';
        color = '#000000';
        navigation.setAttribute('data-scroll-locked', false);
    } else {
        if (navigation.getAttribute('data-scroll-locked') == 'true') return;
        navigation.style.animation = 'position_absolute 400ms ease-out forwards';
        color = '#fff';
    }
    Array.prototype.forEach.call(links, function(item){
        item.style.color = color;
    })
    button.style.color = color;
};