this.App.scripts.navigation = function() {
        this.link = function(link_target) {
        var target = document.querySelector('section' + '#' + link_target);
        var target_position = target.getBoundingClientRect().top;
        var start_position = window.pageYOffset;
        var distance = target_position - start_position;
        var start_time = null;

        
        function animation(current_time) {
            if (!start_time) start_time = current_time;
            var progress = current_time - start_time;
            // console.log(progress)
            // var movement = ease(progress);
            var movement = ease(progress, start_position, distance - 113, 1000);
            if (progress < 1000) {
                // console.log(movement)
                // console.log(movement)
                window.scrollTo(0, movement);
                requestAnimationFrame(animation);
            }
            // window.scrollTo(0, )
        }

        function ease(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }

        // function ease (t) { 
        //     return t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2) + 1 
        // }

        requestAnimationFrame(animation);
    }
}