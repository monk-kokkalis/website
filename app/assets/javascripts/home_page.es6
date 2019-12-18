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

    this.section_subject = (function() {
        var observers = [];
        var sections = [];
        function Section(element) {
            this.element = element;
        }

        Section.prototype.notify = function(data) {
            observers.forEach(function(observer) {
                observer(data);
            });
        }

        Section.prototype.evaluate_bounds = function() {
            var bound_rect = this.element.getBoundingClientRect();
            if (bound_rect.bottom < bound_rect.height + 80 && bound_rect.bottom > 0) {
                this.notify(this.element.id);
            }
        }
        
        return {
            subscribe: function(callback) {
                if (Object.prototype.toString.call(callback) != '[object Function]') {
                    throw callback + ' is not a valid section subject subscriber';
                }
                if (observers.some(o => callback === o)) {
                    throw callback + ' is already subscribed to the section subject';
                }

                observers.push(callback);
            },
            update_state: function() {
                sections.forEach(function(sec) {
                    sec.evaluate_bounds();
                })
            },
            initialize: function() {
                document.querySelectorAll('section[data-page="home"]').each_element(function(el) {
                    sections.push(new Section(el));
                });
            }
        }
    }).call(this);
    this.section_subject.initialize();
    
    var links = document.querySelectorAll('.down-arrow-link');
    Array.prototype.forEach.call(links, function(element) {
        element.setAttribute('data-handler', 'down_arrow');
    });

    var image_containers = document.querySelectorAll('div.portfolio__gallery__item__container');
    var preview_image = document.querySelector('img.figure__image');
    var figure_image_number = document.querySelector('div.figure__image-number');
    this.change_preview_item = function() {
        var index = App.global_variables.active_portfolio_index;
        var direction = this.dataset.direction;
        if (direction == 'left') {
            index -= 1;
            if (index < 0) index = 5;
        }
        if (direction == 'right') {
            index += 1;
            if (index > 5) index = 0;
        }
        App.global_variables.active_portfolio_index = index;
        var active_image = image_containers[index].querySelector('img');
        preview_image.src = active_image.src;
        figure_image_number.innerHTML = index + 1 + '/6'
    }
    
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
            element.style.width = placeholders[0].getBoundingClientRect().width + 'px';
        });
    })();

    this.filter_portfolio = function() {
        var figures = document.querySelectorAll('figure.portfolio__gallery__item');
        figures.each_element(function(element) {
            var height;
            if (window.innerWidth >= 1268) {
                height = '360px';
            } else{
                height = '250px';
            }
            element.style.height = height
        })

        var placeholders = document.querySelectorAll('div.portfolio__gallery__item__placeholder');
        var portfolio_bounds = document.querySelector('section#portfolio').getBoundingClientRect();

        var filter_buttons = document.querySelectorAll('button[data-handler=filter_portfolio]');
        filter_buttons.each_element(function(element) {
            element.classList.remove('active');
        });
        this.classList.add('active');
        var category = this.dataset.category;
        var filtered = image_containers.map_elements(function(element) {
            if (!element.dataset.category) return false;
            return element.dataset.category.match(category);
        });
        var counter = 0;
        filtered.forEach(function(object) {
            if (object.passed) {
                var bounds = placeholders[counter].getBoundingClientRect();
                object.element.style.left = bounds.left - portfolio_bounds.left + 'px';
                object.element.style.top = bounds.top - portfolio_bounds.top + 'px';
                object.element.style.transform = 'scale(1, 1)';
                counter += 1;
            } else {
                object.element.style.transform = 'scale(0, 0)';
            }
        });
        
        var failed = filtered.filter(element => !element.passed).length;
        var counter = 0;
        while (counter < failed) {
            figures[figures.length - 1 - counter].style.height = '0px';
            counter += 1;
        }
    }

    var overlay = document.querySelector('div.overlay');
    var body = document.querySelector('body');
    
    this.preview_portfolio_item = function() {
        var button = this.closest('button');
        var lightbox = button.closest('div.portfolio__gallery__item__container');
        var clicked_image = lightbox.querySelector('img');
        var index = image_containers.find_index(function(element) {
           return element === lightbox;
        });
        App.global_variables.active_portfolio_index = index;
        figure_image_number.innerHTML = index + 1 + '/6'
        preview_image.src = clicked_image.src;

        overlay.style.display = 'block';
        body.style.overflow = 'hidden';
        App.global_variables.overlay_visible = true;
    }

    this.hide_overlay = function() {
        overlay.style.display = 'none';
        body.style.overflow = 'visible';
    }
    
}