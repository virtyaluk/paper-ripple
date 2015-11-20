(function(document) {
    [].slice.call(document.querySelectorAll('.paper-button, .image-card')).forEach(function(el) {
        el.PaperRipple = new PaperRipple();
        el.appendChild(el.PaperRipple.$);

        if (el.classList.contains('paper-button--fab') || el.classList.contains('paper-button--fab-mini') || el.classList.contains('paper-button--icon')) {
            el.PaperRipple.$.classList.add('paper-ripple--round');
            el.PaperRipple.recenters = true;
            el.PaperRipple.center = el.classList.contains('paper-button--icon');
        }

        el.addEventListener('mousedown', function(ev) {
            this.PaperRipple.downAction(ev);
        });

        el.addEventListener('mouseup', function() {
            this.PaperRipple.upAction();
        });
    });
}(document));