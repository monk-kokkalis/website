this.App.scripts.static_pages = function() {
    var retracting_text = document.querySelector('.retracting-text');
    // retracting_text.width = retracting_text.scrollWidth + 'px';
    var element_width = retracting_text.scrollWidth;

    console.log(element_width)
    window.setInterval(function() {
        if (retracting_text.classList.contains('retracted')) {
            retracting_text.style.width = element_width + 'px';
            retracting_text.classList.remove('retracted');
        } else {
            console.log(element_width * 0.28 +  'px')
            retracting_text.style.width = element_width * 0.28 +  'px';
            
            retracting_text.classList.add('retracted');
        }
    }, 1500);
}