this.App.scripts.navigation = function() {
    var links = document.querySelectorAll('ul.navigation__list a');
    this.scroll_page = function() {
        links.each_element(function(link) {
            link.classList.remove('active');
        });
        this.classList.add('active');
    }
}