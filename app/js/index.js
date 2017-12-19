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

    $('.scene-slider').slick({
        dots: false,
        infinite: false,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
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


    if ($(window).width() > 1200){
        $('.countries-slider-item__title').each(function () {
            let simbolCount = $(this).text().length;
            if ((simbolCount > 7) && (simbolCount < 11)) {
                $(this).css({'font-size' : '110px', 'line-height' : '110px'});
            }
            if ((simbolCount > 10) && (simbolCount < 20)) {
                $(this).css({'font-size' : '80px', 'line-height' : '80px'});
            }
            if (simbolCount > 20) {
                $(this).css({'font-size' : '60px', 'line-height' : '60px'});
            }
        });
    }

    if (($(window).width() > 1024) && ($(window).width() < 1200)){
        $('.countries-slider-item__title').each(function () {
            let simbolCount = $(this).text().length;
            if ((simbolCount > 7) && (simbolCount < 11)) {
                $(this).css({'font-size' : '90px', 'line-height' : '90px'});
            }
            if ((simbolCount > 10) && (simbolCount < 14)) {
                $(this).css({'font-size' : '70px', 'line-height' : '70px'});
            }
            if ((simbolCount > 13) && (simbolCount < 20)) {
                $(this).css({'font-size' : '60px', 'line-height' : '60px'});
            }
            if (simbolCount > 20) {
                $(this).css({'font-size' : '60px', 'line-height' : '60px'});
            }

        });
    }
    if (($(window).width() > 480) && ($(window).width() < 1024)){
        $('.countries-slider-item__title').each(function () {
            let simbolCount = $(this).text().length;
            if ((simbolCount > 7) && (simbolCount < 13)) {
                $(this).css({'font-size' : '60px', 'line-height' : '60px'});
            }
            if (simbolCount > 12)  {
                $(this).css({'font-size' : '50px', 'line-height' : '50px'});
            }

        });
    }

    if ($('.countries-slider').hasClass('slick-slider') && $(window).width() > 480) {

        var slider = $('.countries-slider');
        var slideCount = slider.slick("getSlick").slideCount;
        if (slideCount > 1) {
            var step = Math.floor(100 / slideCount);
            var curArrow = slider.find('.slick-next');
            curArrow.attr('data-pct', step);
            var circleStr = '<svg id="countries-svg" class="progress-svg animate" width="54" height="54" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<circle id="countries-bar" class="progress-bar" cx="27" cy="27" r="24" stroke-dasharray="150.796416"  stroke-dashoffset="0" fill="transparent" stroke="white"/>' +
                '</svg>';
            curArrow.append(circleStr);
            var $circle = $('#countries-svg #countries-bar');
            changeCircle($circle, 0);
        }
    }

    $('.countries-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){

    });

    if ($('.scene-slider').hasClass('slick-slider') && $(window).width() > 480) {

        var slider = $('.scene-slider');
        var slideCount = slider.slick("getSlick").slideCount;
        if (slideCount > 1) {
            var step = Math.floor(100 / slideCount);
            var curArrow = slider.find('.slick-next');
            curArrow.attr('data-pct', step);
            var circleStr = '<svg id="scene-svg" class="progress-svg animate" width="54" height="54" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<circle id="scene-bar" class="progress-bar" cx="27" cy="27" r="24" stroke-dasharray="150.796416"  stroke-dashoffset="0" fill="transparent" stroke="white"/>' +
                '</svg>';
            curArrow.append(circleStr);
            var $circle = $('#scene-svg #scene-bar');
            changeCircle($circle, 0);
        }
    }

    $('.scene-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
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

            animationTime: 1000,
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
            direction: "vertical"
        });
    }



    /*** Анимация слайдера с посещенными странами ***/
    var animateCountrySlider = function () {
        if ($('.scene.active').find('.countries-slider').length > 0) {
            var $circle = $('#countries-svg #countries-bar');

            if (!$('.countries-slider').hasClass('active')) {

                $('.countries-slider').addClass('active');

                setTimeout(function () {
                    $('#countries-svg').addClass('animate');
                    changeCircle($circle, 100);
                }, 100);

                var slideCount = $('.countries-slider').slick("getSlick").slideCount;

                if (slideCount > 1) {
                 for (let i=0; i < slideCount-1; i++) {
                     let time = 5100 * (i+1);
                         setTimeout(function () {
                             if (!$('#countries-svg').hasClass('no-animate')) {
                                 $('#countries-svg').addClass('animate');
                                 changeCircle($circle, 100);
                             } else {
                                 return;
                             }
                         }, time - 5000);
                         setTimeout(function () {
                             if (!$('#countries-svg').hasClass('no-animate')) {
                                 $('.countries-slider').slick('slickNext');
                             } else {
                                 return;
                             }
                         }, time);
                         setTimeout(function () {
                             if (!$('#countries-svg').hasClass('no-animate')) {
                             $('#countries-svg').removeClass('animate');
                             changeCircle($circle, 0);
                             } else {
                                 return;
                             }
                         }, time + 50);
                 }
            }
        }
    }
    else {

        }
    }

    var animateSceneSlider = function () {

        if ($('.scene.active').find('.scene-slider').length > 0) {
            var $circle = $('#scene-svg #scene-bar');

            if (!$('.scene-slider').hasClass('active')) {

                $('.scene-slider').addClass('active');

                //анимация заполнения полоски
                setTimeout(function () {
                    $('#scene-svg').addClass('animate');
                    changeCircle($circle, 100);
                }, 100);

                var slideCount = $('.scene-slider').slick("getSlick").slideCount;

                if (slideCount > 1) {
                    for (let i=0; i < slideCount-1; i++) {
                        let time = 5100 * (i+1);
                        setTimeout(function () {
                            if (!$('#scene-svg').hasClass('no-animate')) {
                                $('#scene-svg').addClass('animate');
                                changeCircle($circle, 100);
                            } else {
                                return;
                            }
                        }, time - 5000);
                        setTimeout(function () {
                            if (!$('#scene-svg').hasClass('no-animate')) {
                                $('.scene-slider').slick('slickNext');
                            } else {
                                return;
                            }
                        }, time);
                        setTimeout(function () {
                            if (!$('#scene-svg').hasClass('no-animate')) {
                                $('#scene-svg').removeClass('animate');
                                changeCircle($circle, 0);
                            } else {
                                return;
                            }
                        }, time + 50);
                    }
                }
            }
        }

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
                }, 800);
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
        $('#scene-svg').addClass('no-animate');
        $('#scene-svg').removeClass('animate');
    });
    $('.countries-slider .slick-arrow').click(function () {
        $('#countries-svg').addClass('no-animate');
        $('#countries-svg').removeClass('animate');
    });

    $('.scene-slider').on('swipe', function(event, slick, direction){
        $('#scene-svg').addClass('no-animate');
        $('#scene-svg').removeClass('animate');
    });

    $('.countries-slider').on('swipe', function(event, slick, direction){
        $('#countries-svg').addClass('no-animate');
        $('#countries-svg').removeClass('animate');
    });

    $(document).ready(function () {
        //$('.scene.active').find('.content-animation').addClass('animated');
    });
});