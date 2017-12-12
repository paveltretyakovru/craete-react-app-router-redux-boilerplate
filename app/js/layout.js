export default class {
    constructor(options) {
        const defaults = {
            el: '.wrapper',
            dom: {
                screen: '.js-layout-screen',
                scroll: '.js-layout-scroll',
                inner: '.js-layout-inner',
                start: '.js-layout-start',
                home: '.js-layout-home',
                next: '.js-layout-screen-next',
                prev: '.js-layout-screen-prev',
                showPopupText: '.js-layout-show-popup-text',
                showPopupRules: '.js-layout-show-popup-rules',
                popupTextHolder: '.js-popup-text-holder',
                bouncingArrow: '.js-bouncing-arrow',
                scrollToNextScreenMobile: '.js-scroll-mobile-scroll-to-second-screen',
                firstSceneVideo: '.js-first-scene-video',
                returnLink: '.js-return-link'
            },
            classes: {
                active: 'layout__screen_state_active',
                scene1: 'layout_scene_1',
                scene2: 'layout_scene_2',
                scene3: 'layout_scene_3',
                scene4: 'layout_scene_4',
                form: 'layout_state_form',
                popup: 'layout_state_popup',
                final: 'layout_state_final'
            }
        };
        this.options = $.extend(true, {}, defaults, options);
        this.$window = $(window);
        this.$document = $(document);
        this.$el = $(this.options.el);
        this.lock = true;
        this.delta = 0;
        this.touch = 0;
        this.index = 0;
        this.arrowIsBouncing = true;
        return this;
    }
    getDom() {
        this.$screen = this.$el.find(this.options.dom.screen);
        this.$scroll = this.$el.find(this.options.dom.scroll);
        this.$inner = this.$el.find(this.options.dom.inner);
        this.$start = this.$el.find(this.options.dom.start);
        this.$home = this.$el.find(this.options.dom.home);
        this.$next = this.$el.find(this.options.dom.next);
        this.$prev = this.$el.find(this.options.dom.prev);
        this.$showPopupText = this.$el.find(this.options.dom.showPopupText);
        this.$showPopupRules = this.$el.find(this.options.dom.showPopupRules);
        this.$bouncingArrow = this.$el.find(this.options.dom.bouncingArrow);
        this.$scrollToNextScreenMobile = this.$el.find(this.options.dom.scrollToNextScreenMobile);
        this.$firstSceneVideo = this.$el.find(this.options.dom.firstSceneVideo);
        this.$returnLink = this.$el.find(this.options.dom.returnLink);
        return this;
    }
    onUnlock(fast = false) {
        const self = this;
        if (fast) {
            self.lock = false;
        }else {
            setTimeout(function () {
                self.lock = false;
            }, 1000);
        }
        return self;
    }
    onLock() {
        this.lock = true;
        return this;
    }
    check(index = false, scrolled = 0) {
        if (!this.lock) {
            const $current = this.$screen.filter('.' + this.options.classes.active);
            let $activate = false;
            if (index !== false) {
                $activate = this.$screen.eq(index);
            }
            const $scroll = $current.find(this.$scroll);
            const $inner = $current.find(this.$inner);
            if (scrolled === true && $scroll.scrollTop() + $scroll.height() < $inner.height() - 2) {
                scrolled = 0;
                this.onLock();
                const self = this;
                setTimeout(function () {
                    self.onUnlock(true);
                }, 250);
            }
            if (scrolled === false && $scroll.scrollTop() > 2) {
                scrolled = 0;
                this.onLock();
                const self = this;
                setTimeout(function () {
                    self.onUnlock(true);
                }, 250);
            }
            if (scrolled !== 0 && scrolled === true) {
                $activate = $current.next();
            }
            if (scrolled !== 0 && scrolled === false) {
                $activate = $current.prev();
            }
            if ($activate !== false && $activate.length && $activate.is(this.$screen)) {
                this.onLock();
                if (index === false) {
                    this.index = $activate.index();
                } else {
                    this.index = index;
                }
                $activate.addClass(this.options.classes.active);
                $current.removeClass(this.options.classes.active);
                this.$el
                    .removeClass(this.options.classes.scene1)
                    .removeClass(this.options.classes.scene2)
                    .removeClass(this.options.classes.scene3)
                    .removeClass(this.options.classes.scene4);
                this.$el.addClass(this.options.classes[$activate.data('type')]);
                this.onUnlock();
            }
        }
    }
    onNext(event) {
        event.preventDefault();
        this.check(this.index + 1);
    }
    onPrev(event) {
        event.preventDefault();
        this.check(this.index - 1);
    }
    onHome() {
        this.$el
            .addClass(this.options.classes.scene1)
            .removeClass(this.options.classes.scene2)
            .removeClass(this.options.classes.scene3)
            .removeClass(this.options.classes.scene4)
            .removeClass(this.options.classes.form)
            .removeClass(this.options.classes.popup)
            .removeClass(this.options.classes.final);
        this.index = 0;
        this.$screen.filter('.' + this.options.classes.active).removeClass(this.options.classes.active);
        this.$screen.eq(0).addClass(this.options.classes.active);
        this.onUnlock();
    }
    isMobile() {
        return this.$el.width() < 768;
    }
    setScreen(event, index) {
        this.check(index);
    }
    onScreen(event) {
        const $target = $(event.currentTarget);
        const target = $target.data('screen');
        if (this.max >= target && target !== this.index) {
            this.check($target.data('screen'));
        }
    }
    onWheel(e) {
        const $target = $(e.target);
        const event = e || window.event;
        const delta = event.detail || event.wheelDelta || -event.deltaY;

        if (!this.lock && !$target.closest('.js-scroll').length && !this.isMobile()) {
            if ((this.delta < 0 && delta > 0) || (this.delta > 0 && delta < 0)) {
                this.delta = 0;
            }
            this.delta += delta;
            let set = 0;
            if (this.delta < -20) {
                set = 1;
            }
            if (this.delta > 20) {
                set = -1;
            }
            if (set !== 0) {
                this.delta = 0;
                this.check(false, set > 0);
            }
        }
    }
    onKey(event) {
        const code = event.keyCode || event.which;
        if (!this.lock && !this.isMobile()) {
            let set = 0;
            if ((code === 34 || code === 40)) {
                set = 1;
            }
            if ((code === 33 || code === 38)) {
                set = -1;
            }
            if (set !== 0) {
                this.check(false, set > 0);
            }
        }
    }
    onTouchStart(event) {
        const $target = $(event.target);
        if (!this.lock && !$target.closest('.js-scroll').length && !this.isMobile()) {
            this.touch = event.pageY || event.originalEvent.changedTouches[0].pageY;
        }
    }
    onTouchEnd(event) {
        const end = event.pageY || event.originalEvent.changedTouches[0].pageY;
        const delta = this.touch - end;
        if (!this.lock && this.touch !== false) {
            this.delta += delta;
            let set = 0;
            if (delta > 40) {
                set = 1;
            }
            if (delta < -40) {
                set = -1;
            }
            if (set !== 0) {
                this.check(false, set > 0);
                this.touch = false;
            }
        }
        if (event.type === 'touchend') {
            this.touch = false;
        }
    }
    onFormOpen() {
        this.scrollFix(true);
        this.onLock();
        this.$el.addClass(this.options.classes.form);
    }
    onFormClose() {
        this.onUnlock();
        this.$el.removeClass(this.options.classes.form);
        this.scrollFix(false);
    }
    onPopupOpen() {
        this.scrollFix(true);
        this.onLock();
        this.$el.addClass(this.options.classes.popup);
    }
    onPopupClose() {
        this.onUnlock();
        this.$el.removeClass(this.options.classes.popup);
        this.scrollFix(false);
    }
    onPopupTextShow = obj => (e) => {
    const html = $(obj).find(this.options.dom.popupTextHolder).html();
    this.$window.trigger('popup.setText', html);
    this.$window.trigger('popup.set', 'text');
    this.onPopupOpen();
}
onPopupRulesShow() {
    this.$window.trigger('popup.set', 'rules');
    this.onPopupOpen();
}
onFinal() {
    this.scrollFix(true);
    this.onLock();
    this.$el
        .removeClass(this.options.classes.popup)
        .removeClass(this.options.classes.form)
        .addClass(this.options.classes.final);
}

onFinalBack() {
    this.$el.removeClass(this.options.classes.final)
    this.onFormOpen();
}
onScene() {
    if (this.isMobile()) {
        // const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // console.log(scrollTop);
        // let sh = 0;
        // this.$screen.each(function () {
        // 	sh += $(this).height();
        // });
        // const height = sh - this.$screen.last().height();
        // const heightStatue = this.$statue.height();
        // const top = scrollTop * 0.7;
        // this.$statue.css(this.prefixed.css.transform, 'translateY(' + top + 'px) translateZ(0)');
    }
}
scrollFix(open = false) {
    if (open) {
        this.scrollTop = window.pageYOffset;
        this.$window.scrollTop(0);
    }else {
        this.$window.scrollTop(this.scrollTop);
    }
}
animateBouncingArrow() {
    const $svg = this.$bouncingArrow.find('svg');
    const duration = 800;
    $svg.animate({ left: '1vw' }, { duration: duration, easing: 'swing', complete: () => {
            if (this.arrowIsBouncing) {
        $svg.animate({left: '-1vw'}, { duration: duration, easing: 'swing', complete: () => {
                if (this.arrowIsBouncing) {
            this.animateBouncingArrow();
        } else {
            $svg.animate({left: '0'}, { duration: duration });
        }
    }});
    } else {
        $svg.animate({left: '0'}, { duration: duration });
    }
}});
}
onBouncingArrowHover() {
    this.arrowIsBouncing = false;
}

onNextScreenMobile () {
    $('body').animate({ scrollTop: this.$screen.eq(1).offset().top }, 500);
}
fixVideoSize() {
    const $container = this.$firstSceneVideo.parents(this.options.dom.screen);
    const cw = $container.width();
    const ch = $container.height();

    const videoRatio = 1600 / 1000;
    const containerRatio = cw / ch;
    let vw;
    let vh;
    if (videoRatio < containerRatio) {
        vw = cw;
        vh = 'auto';
    } else if (videoRatio > containerRatio) {
        vw = 'auto';
        vh = ch;
    } else {
        vw = 'auto';
        vh = 'auto';
    }

    this.$firstSceneVideo
        .width(vw)
        .height(vh);
}

onReturnLinkClick() {
    if (this.$el.hasClass(this.options.classes.form)) {
        this.onFormClose();
    } else if (this.$el.hasClass(this.options.classes.final)) {
        this.onFinalBack();
    }
}
render() {
    if (this.$el.length) {
        this.getDom();
        this.fixVideoSize();
        this.animateBouncingArrow();
        if (this.$document[0].addEventListener) {
            if ('onwheel' in document) {
                this.$document[0].addEventListener('wheel', _.debounce(this.onWheel.bind(this), 100, { maxWait: 500 }));
            } else if ('onmousewheel' in document) {
                this.$document[0].addEventListener('mousewheel', _.debounce(this.onWheel.bind(this), 100, { maxWait: 500 }));
            } else {
                this.$document[0].addEventListener('MozMousePixelScroll', _.debounce(this.onWheel.bind(this), 100, { maxWait: 500 }));
            }
        } else {
            this.$document[0].attachEvent('onmousewheel', _.debounce(this.onWheel.bind(this), 100, { maxWait: 500 }));
        }
        this.$document
            .on('touchstart', this.onTouchStart.bind(this))
            .on('touchmove', this.onTouchEnd.bind(this))
            .on('touchend', this.onTouchEnd.bind(this))
            .on('keydown', this.onKey.bind(this));
        this.$next.on('click', this.onNext.bind(this));
        this.$prev.on('click', this.onPrev.bind(this));
        this.$start.on('click', this.onFormOpen.bind(this));
        this.$home.on('click', this.onHome.bind(this));
        this.$showPopupRules.on('click', this.onPopupRulesShow.bind(this));
        this.$bouncingArrow.on('mouseover', this.onBouncingArrowHover.bind(this));
        this.$screen.eq(1).on('touchstart', this.onBouncingArrowHover.bind(this));
        this.$scrollToNextScreenMobile.on('click', this.onNextScreenMobile.bind(this));
        this.$returnLink.on('click', this.onReturnLinkClick.bind(this));

        this.$window.on('form.close', this.onFormClose.bind(this));
        this.$window.on('popup.open', this.onPopupOpen.bind(this));
        this.$window.on('popup.close', this.onPopupClose.bind(this));
        this.$window.on('screen.final', this.onFinal.bind(this));
        this.$window.on('resize', this.fixVideoSize.bind(this));
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
            $('html').addClass('isiphone');
        }

        if (navigator.userAgent.match(/iPad/i)) {
            $('html').addClass('isipad');
        }
        this.onUnlock();
    }
    return this;
}
}