this.App.scroll = function() {
    'use strict';
    var navigation = document.querySelector('nav.navigation');
    var links = document.querySelectorAll('ul.navigation__list a');
    var button_bars = document.querySelectorAll('button.navigation__mobile-button span');
    var color = '#fff';

    if (window.pageYOffset > 50) {
        navigation.style.animation = 'position_fixed 600ms ease-out forwards';
        navigation.style.position = 'fixed';
        color = '#000000';
        navigation.setAttribute('data-scroll-locked', false);
    } else {
        if (navigation.getAttribute('data-scroll-locked') == 'true') return;
        navigation.style.animation = 'position_absolute 400ms ease-out forwards';
        navigation.style.position = 'absolute';
        color = '#fff';
    }
    Array.prototype.forEach.call(links, function(item){
        item.style.color = color;
    })
    Array.prototype.forEach.call(button_bars, function(bar){
        bar.style.backgroundColor = color;
    })

    var achievements_section = document.querySelector('section#achievements');
    var bounding_rect = achievements_section.getBoundingClientRect();
    var numbers = document.querySelectorAll('div.achievements__item__count');
 
    if (bounding_rect.top < window.innerHeight) {
        animate_count();
    } else {
        App.global_variables.animating = false;
    }

    function animate_count() {
        if (App.global_variables.animating) return;
        if (App.global_variables.interval_present) return;
        App.global_variables.animating = true;
        App.global_variables.interval_present = true;
        var counter = 0;
        var interval = window.setInterval(function() {
            Array.prototype.forEach.call(numbers, function(number, index) {
                if (index == 1 && counter >= 54) return;
                if (index == 2 && counter >= 43) return;
                if (index == 3 && counter >= 29) return;
                number.innerHTML = counter;
            })
            counter += 1;
            if (counter == 84) {
                clearInterval(interval);
                App.global_variables.interval_present = false;
            }
        }, 50);
    }
};