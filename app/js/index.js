import './sprite.svg';
import './transition';
import './collapse';
import './../vendor/slick.min';
import './../vendor/jquery.onepage-scroll';


$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

$(function () {
    $(window).scroll(function() {


        var scroll = $(window).scrollTop();
        var vh = $(window).height();

        if (scroll >= 10) {
            $("body,html").animate({
               // scrollTop: vh
            }, 800);
        }

    });

    /*$(window).bind('mousewheel', function(e) {

        const $target = $(e.target);
        const event = e || window.event;
        const delta = event.detail || event.wheelDelta || -event.deltaY;

        let curDelta = $('wrapper').data('delta');

        if (!$('wrapper').data('lock') && !$target.closest('.js-scroll').length && ($(window).width()>480)) {
            if (($('wrapper').data('delta') < 0 && delta > 0) || ($('wrapper').data('delta') > 0 && delta < 0)) {
                $('wrapper').data('delta', 0);
            }

            $('wrapper').data('delta', curDelta + delta);
            let set = 0;
            if ( $('wrapper').data('delta') < -20) {
                set = 1;
            }
            if ( $('wrapper').data('delta') > 20) {
                set = -1;
            }
            if (set !== 0) {
                $('wrapper').data('delta', 0);
                $('wrapper').check(false, set > 0);
            }
        }

        var vh = $(window).height();
        var scroll = $(window).scrollTop();
        var coef = Math.floor(scroll / vh);
        if (event.originalEvent.wheelDelta >= 0) {
            console.log('Scroll up');
            console.log(coef);
        }
        else {
            console.log('Scroll down');
        }
    }); */


    $('.scene-slider').slick({
        dots: false,
        infinite: false,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    dots: true
                }
            }
        ]
    });
    $('.countries-slider').slick({
        dots: false,
        infinite: false,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    dots: true
                }
            }
        ]
    });

    var changeCircle = function (curCircle, percent) {
        if (isNaN(percent)) {
            percent = 100;
            console.log('100');
        }
        else{
            var r = curCircle.attr('r');
            var c = Math.PI*(r*2);

            if (percent < 0) { percent = 0;}
            if (percent > 96) {percent = 100;}

            var pct = ((100-percent)/100)*c;

            curCircle.css({ strokeDashoffset: pct});

        }
    }

    if ($('.countries-slider').hasClass('slick-slider') && $(window).width() > 480) {

        var slider = $('.countries-slider');
        var slideCount = slider.slick("getSlick").slideCount;
        if (slideCount > 1) {
            var step = Math.floor(100 / slideCount);
            var curArrow = slider.find('.slick-next');
            curArrow.attr('data-pct', step);
            var circleStr = '<svg id="countries-svg" class="animate" width="55" height="55" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<circle id="countries-bar" cx="26.7" cy="27.2" r="23" stroke-dasharray="144.52"  stroke-dashoffset="0" fill="transparent" stroke="white"/>' +
                '</svg>';
            curArrow.append(circleStr);
            var $circle = $('#countries-svg #countries-bar');
            changeCircle($circle, 0);
        }
    }

    $('.countries-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var slideCount = $(this).slick("getSlick").slideCount - 2;
        if (currentSlide === slideCount) {
            $(this).slick('slickPause');
            $('#countries-svg').addClass('no-animate');
        }
        if (!$('#countries-svg').hasClass('no-animate')) {
            $('#countries-svg').addClass('animate');
            var $circle = $('#countries-svg #countries-bar');
            changeCircle($circle, 100);
            setTimeout(function () {
                $('#countries-svg').removeClass('animate');
                changeCircle($circle, 0);
            }, 5000);
        }
    });

    if ($('.scene-slider').hasClass('slick-slider') && $(window).width() > 480) {

        var slider = $('.scene-slider');
        var slideCount = slider.slick("getSlick").slideCount;
        if (slideCount > 1) {
            var step = Math.floor(100 / slideCount);
            var curArrow = slider.find('.slick-next');
            curArrow.attr('data-pct', step);
            var circleStr = '<svg id="scene-svg" class="animate" width="55" height="55" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<circle id="scene-bar" cx="26.7" cy="27.2" r="23" stroke-dasharray="144.52"  stroke-dashoffset="0" fill="transparent" stroke="white"/>' +
                '</svg>';
            curArrow.append(circleStr);
            var $circle = $('#scene-svg #scene-bar');
            changeCircle($circle, 0);
        }
    }

    $('.scene-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){

        var slideCount = $(this).slick("getSlick").slideCount - 2;
        if (currentSlide === slideCount) {
            $(this).slick('slickPause');
            $('#scene-svg').addClass('no-animate');
        }

        if (!$('#scene-svg').hasClass('no-animate')) {
            $('#scene-svg').addClass('animate');
            var $circle = $('#scene-svg #scene-bar');
            changeCircle($circle, 100);
            setTimeout(function () {
                $('#scene-svg').removeClass('animate');
                changeCircle($circle, 0);
            }, 5000);
        }


    });

    $('.cost__diagram').each(function () {
        var percent = $(this).data('percent');
        var $circle = $(this).find('.diagram-svg .diagram-bar');
        changeCircle($circle, percent);
    });

    $('[data-action]').on('click', function (e) {
        var action = $(this).data('action');
        switch (action) {
            case 'top-scroll' :
                e.preventDefault();
                if ($(window).width() > 480) {
                    $(".wrapper").moveDown();
                } else {
                    $("body,html").animate({
                        scrollTop: $('#top-scroll').offset().top
                    }, 800);
                }
                break;
            case 'result' :
                e.preventDefault();
                $('.btn-container-bottom__content').fadeOut(200);
                $('.btn-container-bottom').addClass('result');
                setTimeout(function () {
                    $('.btn-container-bottom__content.result').fadeIn();
                }, 200);
                break;
            default: break;

        }
    });

    if ($(window).width()>750) {
        $(".wrapper").onepage_scroll({
            sectionContainer: "section",
            easing: "ease",

            animationTime: 500,
            pagination: true,
            updateURL: false,
            beforeMove: function (index) {
            },
            afterMove: function (index) {
                console.log(index);
            },
            loop: true,
            keyboard: false,
            responsiveFallback: false,
            // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
            // the browser's width is less than 600, the fallback will kick in.
            direction: "vertical"
        });
    }

    var animateCountrySlider = function () {
        if ($('.scene.active').find('.countries-slider').length > 0) {
            var $circle = $('#countries-svg #countries-bar');

            if (!$('.countries-slider').hasClass('active')) {

                $('.countries-slider').addClass('active');

                setTimeout(function () {
                    $('#countries-svg').addClass('animate');

                    changeCircle($circle, 100);
                }, 100);
                setTimeout(function () {
                    $('.countries-slider').slick('slickPlay');
                }, 1000);
                setTimeout(function () {
                    $('#countries-svg').removeClass('animate');
                    changeCircle($circle, 0);
                }, 5100);
            }
        }
    }

    var animateSceneSlider = function () {
        if ($('.scene.active').find('.scene-slider').length > 0) {
            var $circle = $('#scene-svg #scene-bar');

            if (!$('.scene-slider').hasClass('active')) {

                $('.scene-slider').addClass('active');

                setTimeout(function () {
                    $('#scene-svg').addClass('animate');

                    changeCircle($circle, 100);
                }, 100);
                setTimeout(function () {
                    $('.scene-slider').slick('slickPlay');
                }, 1000);
                setTimeout(function () {
                    $('#scene-svg').removeClass('animate');
                    changeCircle($circle, 0);
                }, 5100);
            }
        }
    }

    $(document).bind('mousewheel  DOMMouseScroll', function (e) {
       animateCountrySlider();
       animateSceneSlider();

        $('.scene.active').find('.content-animation').addClass('animated');

    });

    $(".onepage-pagination li a").click(function (){
        animateCountrySlider();
        animateSceneSlider();
        $('.scene.active').find('.content-animation').addClass('animated');
    });

    $('.scene-slider .slick-arrow').click(function () {
        $('.scene-slider').slick('slickPause');
        $('#scene-svg').addClass('no-animate');
        $('#scene-svg').removeClass('animate');
    });
    $('.countries-slider .slick-arrow').click(function () {
        $('.countries-slider').slick('slickPause');
        $('#countries-svg').addClass('no-animate');
        $('#countries-svg').removeClass('animate');
    });

    $(window).on('load', function () {
        //$('.scene.active').find('.content-animation').addClass('animated');
    });
});