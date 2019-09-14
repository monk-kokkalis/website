this.App.scripts.static_pages = function() {
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
}