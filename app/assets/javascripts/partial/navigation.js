this.App.scripts.navigation = function() {
    this.scroll_page = function() {
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
    
    this.api = (function() {
        var links = document.querySelectorAll('ul.navigation__list a');
        // var e = links.find_element(function(el) {
        //     return el.dataset.target == 'main'
        // })
        return  {
            update_links: function(section_id) {
                var active_link = links.find_element(function(el) {
                    return el.dataset.target == section_id
                })
                links.each_element(function(el) {
                    el.classList.remove('active');
                });
                active_link.classList.add('active');
            }
        }
    }).call(this)
}