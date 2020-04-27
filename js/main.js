(function($) {
    "use strict";

    var fullheight = function () {
        // Set element to be height of window
        $('.js-fullheight').css('height', $(window).height());
        // Resize case
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullheight();

    // Enable scrollax effect
    $.Scrollax();

    var TextRotation = function(element, texts, period) {
        this.element = element;
        this.texts = texts;
        this.period = period;
        this.loopCount = 0;
        this.rotate();
    };

    TextRotation.prototype.rotate = function() {
        var current = this.loopCount % this.texts.length;
        this.element.innerHTML = this.texts[current];

        // Increment loop count
        this.loopCount += 1;

        setTimeout(() => this.rotate(), this.period);
    };

    window.onload = function() {
        const elements = document.getElementsByClassName("rotating-text");
        console.log(elements);
        for (let i = 0; i<elements.length; i++) {
            let texts = JSON.parse(elements[i].getAttribute("data"));
            let period = parseInt(elements[i].getAttribute("rotation-period"), 10) || 2000;
            if (texts) {
                new TextRotation(elements[i], texts, period);
            }
        }
    }



})(jQuery);