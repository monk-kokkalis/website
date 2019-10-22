this.App.resize = function() {
    var portfolio_bounds = document.querySelector('section#portfolio').getBoundingClientRect();
    var item_containers = document.querySelectorAll('div.portfolio__gallery__item__container');
    var placeholders = document.querySelectorAll('div.portfolio__gallery__item__placeholder');
    item_containers.each_element(function(item, index) {
        var bounds = placeholders[index].getBoundingClientRect();
        item.style.width = placeholders[0].getBoundingClientRect().width + 'px';
        item.style.left = bounds.left + 'px';
        item.style.top = bounds.top - portfolio_bounds.top + 'px';
        // var image = item.querySelector('img');
            
        // image.style.width = placeholders[index].getBoundingClientRect().width + 'px';
        // image.style.height = placeholders[index].getBoundingClientRect().height + 'px';
        
    });        
}