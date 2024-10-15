import ScrollReveal from 'scrollreveal'; // Ensure ScrollReveal is imported
import $ from 'jquery';

(function ($) {
    "use strict";

    // Initial function calls
    mobileNav();
    window.sr = ScrollReveal(); // Use the imported ScrollReveal

    // Menu Dropdown Toggle
    if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click', function () {
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }

    // Smooth Scrolling for Navigation Links
    $(document).ready(function () {
        const loc = window.location; // Use window.location

        $('a[href*="#"]:not([href="#"])').on('click', function () {
            if (loc.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && loc.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    var width = $(window).width();
                    if (width < 991) {
                        $('.menu-trigger').removeClass('active');
                        $('.header-area .nav').slideUp(200);
                    }
                    $('html, body').animate({
                        scrollTop: (target.offset().top) - 130
                    }, 700);
                    return false;
                }
            }
        });
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('.nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav ul li a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    }

    // Home separator
    if ($('.home-seperator').length) {
        $('.home-seperator .left-item, .home-seperator .right-item').imgfix();
    }

    // Home number counterup
    if ($('.count-item').length) {
        $('.count-item strong').counterUp({
            delay: 10,
            time: 1000
        });
    }

    // Page loading animation
    $(window).on('load', function () {
        if ($('.cover').length) {
            $('.cover').parallax({
                imageSrc: $('.cover').data('image'),
                zIndex: '1'
            });
        }

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function () {
            setTimeout(function () {
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    });

    // Window Resize Mobile Menu Fix
    $(window).on('resize', function () {
        mobileNav();
    });

    function mobileNav() {
        var width = $(window).width();
        $('.submenu').off('click').on('click', function () {
            if (width < 992) {
                $('.submenu ul').removeClass('active');
                $(this).find('ul').toggleClass('active');
            }
        });
    }

})(window.jQuery);
