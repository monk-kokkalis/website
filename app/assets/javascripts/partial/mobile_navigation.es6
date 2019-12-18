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

            return {
                generate: function() {
                    element.links.each_element(function(el) {
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        a.classList.add('mobile-navigation__link');
                        a.setAttribute('data-controller', el.dataset.controller);
                        a.setAttribute('data-handler', el.dataset.handler);
                        a.setAttribute('data-target', el.dataset.target);
                        a.innerHTML = el.innerHTML;
                        li.appendChild(a);
                        mobile_list.appendChild(li);
                        mobile_links.push(a);
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
                var mobile_links = link_generator.get_mobile_links();
                var active_link = mobile_links.find(function(el) {
                    return el.dataset.target == section_id;
                });
                mobile_links.forEach(function(link) {
                    link.classList.remove('active');
                });
                active_link.classList.add('active');
            }
        }
    }).call(this);
}