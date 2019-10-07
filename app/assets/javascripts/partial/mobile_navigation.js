this.App.scripts.mobile_navigation = function () {
    var button = document.querySelector('button#mobile-button');
    var elements = document.querySelectorAll('button#mobile-button, span.mobile-button__bar');
    Array.prototype.forEach.call(elements, function(el) {
        el.setAttribute('data-handler', 'button_click');
        el.setAttribute('data-controller', button.dataset.controller);
    });
    var upper_bar = button.querySelector('span.upper');
    var middle_bar = button.querySelector('span.middle');
    var lower_bar = button.querySelector('span.lower');
    var button_active = button.getAttribute('data-active') == 'true';
    this.button_click = function() {
        if (button_active) {
            upper_bar.style.transform = 'rotate(0)';
            middle_bar.style.transform = 'scaleX(1)';
            lower_bar.style.transform = 'rotate(0)';
        } else {
            upper_bar.style.transform = 'rotate(-45deg)';
            middle_bar.style.transform = 'scaleX(0)';
            lower_bar.style.transform = 'rotate(45deg)';
        }
        button_active = !button_active;
    }
}