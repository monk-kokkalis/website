this.App.scripts.mobile_navigation = function () {

    this.button_click = function() {
        this.api.activate();
    }.bind(this);

    this.api = (function() {
        var active = false;
        var element = {
            bars: document.querySelectorAll('button#mobile-button, span.mobile-button__bar'),
            button: document.querySelector('button#mobile-button'),
            links: document.querySelectorAll('a.navigation__link'),
            lower_bar: document.querySelector('span.lower'),
            middle_bar: document.querySelector('span.middle'),
            navigation: document.querySelector('nav.navigation'),
            upper_bar: document.querySelector('span.upper')
        }
        element.bars.each_element(function(el) {
            el.setAttribute('data-handler', 'button_click');
            el.setAttribute('data-controller', 'mobile_navigation');
        });

        var link_generator = (function() {
            var mobile_list = document.createElement('ul');
            var mobile_links = [];
            mobile_list.classList.add('mobile-navigation__list');

            function Link(element) {
                this.element = element;
            }

            Link.prototype.update_border = function() {
                var bounding_rect = this.element.getBoundingClientRect();
            }

            return {
                generate: function() {
                    element.links.each_element(function(el, index) {
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        a.classList.add('mobile-navigation__link');
                        if (index == 0) a.classList.add('active')
                        a.setAttribute('data-controller', el.dataset.controller);
                        a.setAttribute('data-handler', el.dataset.handler);
                        a.setAttribute('data-target', el.dataset.target);
                        a.innerHTML = el.innerHTML;
                        li.appendChild(a);
                        mobile_list.appendChild(li);
                        mobile_links.push(new Link(a));
                    });
                    element.navigation.appendChild(mobile_list);
                },
                get_mobile_links: function() {
                    return mobile_links;
                }
            }

            
        }).call(this);
        link_generator.generate();
        
        return {
            activate: function() {
                if (active) {
                    element.upper_bar.style.transform = 'rotate(0)';
                    element.middle_bar.style.transform = 'scaleX(1)';
                    element.lower_bar.style.transform = 'rotate(0)';
                    element.navigation.style.height = '103px';
                } else {
                    element.upper_bar.style.transform = 'rotate(-45deg)';
                    element.middle_bar.style.transform = 'scaleX(0)';
                    element.lower_bar.style.transform = 'rotate(45deg)';
                    element.navigation.style.height = '374px';
                }
                active = !active;
            },
            update_links: function(section_id) {
                // console.log('el top 1: ' + document.querySelectorAll('section[data-page="home"]')[0].getBoundingClientRect().top)
                // console.log('el bottom 1: ' + document.querySelectorAll('section[data-page="home"]')[0].getBoundingClientRect().bottom)
                // console.log('el 1 height: '+ document.querySelectorAll('section[data-page="home"]')[0].getBoundingClientRect().height)

                // console.log('el top 2: ' + document.querySelectorAll('section[data-page="home"]')[1].getBoundingClientRect().top)
                // console.log('el bottom 2: '+ document.querySelectorAll('section[data-page="home"]')[1].getBoundingClientRect().bottom)
                // console.log('el 2 height: '+ document.querySelectorAll('section[data-page="home"]')[1].getBoundingClientRect().height)
                // link_generator.get_links().forEach(function(el) {
                //     el.classList.remove('active');
                // });
                //  bottom must be less than height but greater than 0;
                // var sections = document.querySelectorAll('section[data-page="home"]');


                // link_generator.get_mobile_links().forEach(function(link) {
                //     link.update_border();
                // })
                console.log(section_id); 
            }
        }
    }).call(this);
    App.scripts.home_page.section_subject.subscribe(this.api.update_links);
}