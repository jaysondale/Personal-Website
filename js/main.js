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
        let current = this.loopCount % this.texts.length;

        this.element.innerHTML = '<span class="fadeIn ftco-animated">' +  this.texts[current] + '</span>';

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
    };

    // Scroll to page location (smoother transition)
    let scrollToPage = function() {
        $(document).on('click', '#ftco-nav a[href^="#"]', function(eventObject){
            eventObject.preventDefault();
            let link = $.attr(this, 'href');
            $('html, body').animate({
                scrollTop: $(link).offset().top - 70
            }, 500);
        });
    };

    scrollToPage();

    // Scroll menu bar
    let scrollWindow = function(){
        $(window).scroll(function() {
            let $win = $(this);
            let pos = $win.scrollTop();
            let navbar = $('.ftco-navbar');
            if (pos > 150) {
                if (!navbar.hasClass('scrolled')){
                    navbar.addClass('scrolled');
                }
            }
            if (pos < 150) {
                if (navbar.hasClass('scrolled')){
                    navbar.removeClass('scrolled');
                }
            }
            if (pos > 350) {
                if (!navbar.hasClass('awake')){
                    navbar.addClass('awake');
                }
            }
        })
    };

    scrollWindow();

    let contentWayPoint = function() {
        $('.ftco-animate').waypoint( function(direction) {
            if (direction == 'down' && !$(this.element).hasClass('ftco-animated')) {
                $(this.element).addClass('item-animate');
                setTimeout(function() {
                    $('body .ftco-animate.item-animate').each(function(k){
                        let element = $(this);
                        setTimeout(function() {
                            element.addClass('fadeInUp ftco-animated');
                            element.removeClass('item-animate')
                        }, k * 50, 'easeInOutExpo')
                    })
                }, 100);
            }
        }, {offset: '95%'});
    };

    contentWayPoint();



})(jQuery);