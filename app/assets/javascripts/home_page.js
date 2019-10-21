this.App.scripts.home_page = function() {
    var retracting_text = document.querySelector('.retracting-text');
    var bouncing_link = document.querySelector('.banner__down-arrow');
    var animation_present = true;
    var bouncing = true;

    window.setInterval(function() {
        if (App.global_variables.animating) return;
        if (window.pageYOffset < 600) App.global_variables.animating = false;
    }, 100)

    window.setInterval(function() {
        if (animation_present) {
            retracting_text.classList.remove('retract')
        } else {
            retracting_text.classList.add('retract')
        }
        animation_present = !animation_present;
    },  1800);

    window.setInterval(function() {
        if (bouncing) {
            bouncing_link.classList.remove('bounce');
        } else {
            bouncing_link.classList.add('bounce');
        }
        bouncing = !bouncing;
    }, 2300);

    var links = document.querySelectorAll('.down-arrow-link');
    Array.prototype.forEach.call(links, function(element) {
        element.setAttribute('data-handler', 'down_arrow');
    });
    
    this.down_arrow = function() {
        var target = document.querySelector('#about-me');
        var target_position = target.getBoundingClientRect().top;
        var start_position = window.pageYOffset;
        var distance = target_position;
        var start_time = null;
    
        function animation(current_time) {
            if (!start_time) start_time = current_time;
            var progress = current_time - start_time;
            var movement = ease(progress, start_position, distance - 73, 1000);
            if (progress < 1000) {
                window.scrollTo(0, movement);
                requestAnimationFrame(animation);
            }
        }
        requestAnimationFrame(animation);
    }
    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
    
    var placeholders = document.querySelectorAll('div.portfolio__gallery__item__placeholder');
    var image_containers = document.querySelectorAll('div.portfolio__gallery__item__container');
    var portfolio_bounds = document.querySelector('section#portfolio').getBoundingClientRect();
    (function init_portfolio_images() {
        image_containers.each_element(function(element, index) {
            var bounds = placeholders[index].getBoundingClientRect();
            element.style.top = bounds.top - portfolio_bounds.top + 'px';
            element.style.left = bounds.left - portfolio_bounds.left + 'px';
        });
    })();

    this.filter_portfolio = function() {
        var figures = document.querySelectorAll('figure.portfolio__gallery__item');
        var image_containers = document.querySelectorAll('div.portfolio__gallery__item__container');
    }
}