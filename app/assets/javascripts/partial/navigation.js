this.App.scripts.navigation = function() {
    var links = document.querySelectorAll('ul.navigation__list a');
    this.scroll_page = function() {
        links.each_element(function(link) {
            link.classList.remove('active');
        });
        this.classList.add('active');

        var target = document.querySelector('#' + this.dataset.target);
        if (!target) {
            throw new Error('Link target is not speficied');
        }
        var target_position = target.getBoundingClientRect().top;
        var start_position = window.pageYOffset;
        var start_time = null;
        var ease = App.easing_functions.ease_in_out;

        function animation(current_time) {
            if (!start_time) start_time = current_time;
            var progress = current_time - start_time;
            var movement = ease(progress, start_position, target_position - 73, 1000);
            if (progress < 1000) {
                window.scrollTo(0, movement);
                requestAnimationFrame(animation);
            }
        }
        requestAnimationFrame(animation);
    }
    
}