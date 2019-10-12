this.App.scripts.home_page = function() {
    var retracting_text = document.querySelector('.retracting-text');
    var bouncing_link = document.querySelector('.banner__down-arrow');
    var animation_present = true;
    var bouncing = true;
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

        function ease(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }
        requestAnimationFrame(animation);
    }
}