import './sprite.svg';
import './transition';
import './collapse';
import './../vendor/slick.min';

$(function () {
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 60) {
            $(".header").addClass("isScroll");
        } else {
            $(".header").removeClass("isScroll");
        }
    });
    $('.scene-slider').slick({
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1
    });
    $('.countries-slider').slick({
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1
    });
    $('[data-action]').on('click', function (e) {
        var action = $(this).data('action');
        switch (action) {
            case 'top-scroll' :
                e.preventDefault();
                $("body,html").animate({
                    scrollTop: $('#top-scroll').offset().top
                }, 800);
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
});
