this.App.scroll = function() {
    'use strict';
    
    (function animate_navigation() {
        var navigation = document.querySelector('nav.navigation');
        var links = document.querySelectorAll('ul.navigation__list a');
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
        links.each_element(function(item) {
            item.style.color = color;
            if (window.pageYOffset > 50) {
                item.classList.add('dark-border');
            } else {
                item.classList.remove('dark-border');
            }
        });
        App.scripts.home_page.section_subject.update_state();
        // App.scripts.mobile_navigation.api.update_links(window.pageYOffset);
    }).call(this);

    (function animate_achievements() {
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
    }).call(this);

    (function animate_skills() {
        var skills_section = document.querySelector('section#skills');
        var bounding_rect = skills_section.getBoundingClientRect();
        var skill_items = document.querySelectorAll('div.skills__container__item');

        var generate_animation = (function() {
            return function(element, target, duration, index) {
                element.style.width = 0;
                var start_counter = 1;
                var start_time = null;
                function animation(current_time) {
                    if (!start_time) start_time = current_time;
                    var progress = current_time - start_time;
                    var movement = App.easing_functions.quad_ease_out(progress, start_counter, target, duration);
                    if (progress < duration) {
                        element.style.width = movement + '%';
                        requestAnimationFrame(animation);
                    } else {
                        App.global_variables.skill_elements_animating[index] = true;
                    }
                }
                requestAnimationFrame(animation);
            };
        }).call(this);

        var start_skills_animation =  function() {
            if (App.global_variables.skills_animating) return;
            if (App.global_variables.skill_elements_animating.some(done => done == false)) return;
            App.global_variables.skills_animating = true;
            for (var counter = 0; counter < 8; counter +=1) {
                App.global_variables.skill_elements_animating[counter] = false;
            }
            skill_items.each_element(function(item, index) {
                setTimeout(function() {
                    var progress = item.querySelector('div.skill__percentage__progress');
                    generate_animation(progress, progress.dataset.targetWidth, 1500 + 100 * index, index);
                }, index * 400);
            });
        }

        if (bounding_rect.top < window.innerHeight - 120) {
            start_skills_animation();
        } else {
            App.global_variables.skills_animating = false;
            if (App.global_variables.skill_elements_animating.some(done => done == false)) return;
            var bars = document.querySelectorAll('div.skill__percentage__progress');
            bars.each_element(function(el) {
                el.style.width = 0;
            })
        }
    }).call(this);

};