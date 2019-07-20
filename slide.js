/**
 * date: 2017/6/28
 * author:
 * desc: slide plugin
 */

/*
 event: "click",  //
 mouseOverDelay: 0, //
 auto: true,
 delay: 5000,
 duration: 500,
 showLabel: true,
 onchange: function(c) {},
 onchangestart: function(c) {},
 oninitend: function(c) {}

 * */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.Slide = factory(root.jQuery);
    }
}(this, function ($) {

    // slide
    var Slide = function (element, options) {
        this.opt = $.extend({
            event: "click",
            mouseOverDelay: 0,
            auto: true,
            delay: 5000,
            duration: 500,
            showLabel: true,
            onchange: function (c) {
            },
            onchangestart: function (c) {
            },
            oninitend: function (c) {
            }
        }, options);
        this.container = $(element);
        this.items = this.container.find("li");
        this.index = 0;
        this.pager = null;
        this.animating = false;
        this.screen = false;
        this.mouseIn = false;
        this._init()
    };

    Slide.prototype = {
        Constructor: Slide,
        _init: function () {
            var a = this;
            this.opt.showLabel && this._createLabel();
            this.to(0, true);
            this.container.on("mouseenter mousemove", function () {
                a.mouseIn = true;
                a.autoPause()
            });
            this.container.on("mouseleave", function () {
                a.mouseIn = false;
                if (a._isInScreen()) {
                    a.autoStart()
                }
            });
            if (this._isInScreen()) {
                a.autoStart();
                a.screen = true
            }
            $(window).scroll(function () {
                if (a._isInScreen() && a.screen == false) {
                    a.screen = true;
                    a.autoStart()
                } else {
                    if (!a._isInScreen() && a.screen == true) {
                        a.screen = false;
                        a.autoPause()
                    }
                }
            });
            this.opt.oninitend.call(this, this.container)
        },
        _createLabel: function () {
            var e = this, f = [], g, c, b;
            f.push('<div class="banner-nav">');
            for (c = 1; c <= this.items.size(); c++) {
                f.push('<a href="javascript:;" class="page-item">' + c + "</a>")
            }
            f.push("</div>");
            this.pager = typeof this.opt.showLabel == "string" ? this.container.find(this.opt.showLabel) : $(f.join("")).appendTo(this.container.parent().find(".banner-nav-wrapper"));
            if (this.opt.mouseOverDelay) {
                // 绑定 hover 事件
                this.pager.find("a").hover(function () {
                    var a = $(this).index();
                    g = setTimeout(function () {
                        e.to(a)
                    }, e.opt.mouseOverDelay)
                }, function () {
                    clearTimeout(g)
                })
            } else {
                this.pager.find("a").bind(this.opt.event, function () {
                    e.to($(this).index())
                })
            }
        },
        _isInScreen: function () {
            var a = this.container;
            if (a.length > 0) {
                return ($(document).scrollTop() + $(window).height() - 100 > a.offset().top) && (a.offset().top + a.height() - 100 > $(document).scrollTop())
            }
        },
        autoStart: function () {
            var a = this;
            this.timer = setInterval(function () {
                a.next()
            }, this.opt.delay)
        },
        autoPause: function () {
            clearInterval(this.timer)
        },
        prev: function () {
            this.to(this.index == 0 ? this.items.size() - 1 : this.index - 1, true)
        },
        next: function () {
            this.to(this.index == this.items.size() - 1 ? 0 : this.index + 1, false)
        },
        to: function (index, a) {
            var c = this;
            if (this.animating) {
                return false
            }
            this.opt.onchangestart.call(this, index);
            this.animating = true;
            this.items.eq(index).stop().fadeIn(this.opt.duration, function () {
                c.animating = false
            }).siblings().fadeOut(this.opt.duration);

            if (window.lazyelem) {
                lazyelem.detect();
            }

            // 如果 data-bgflag 为 false
            if (!this.items.eq(index).attr("data-bgflag") || a) {
                if (this.items.eq(index).find("a[cpmId]")) {
                    // cpmRequire(this.items.eq(index))
                }
                // 如果 存在
                if (this.items.eq(index).find("a[cptId]")) {
                    this.items.eq(index).find("a[cptId]").each(function () {
                        var pid = $(this).attr("cptId");
                        if (pid) {
                            try {
                                // apsAdboardCptPvObj.aps_adboard_loadAdCptPv(pid, index.cptTime)
                            } catch (error) {
                            }
                        }
                    })
                }
                this.items.eq(index).attr("data-bgflag", "true")
            }
            this.pager && this.pager.find("a").eq(index).addClass("current").siblings().removeClass("current");
            this.index = index;
            this.opt.onchange.call(this, index)
        }
    };


    // jquery plugin
    /*
     * 提供的方法有
     *  autoStart 开始循环播放
     *  autoPause 停止循环播放
     *  prev 上一帧
     *  next 下一帧
     *  [number] 到自定义帧 （下标从0开始，类似数组）
     *
     * */
    $.fn.slide = function (option) {

        return this.each(function () {
            var $this = $(this);
            var data = $this.data('slide');
            var options = {};
            var action = '';
            // 如果参数是 object
            if (typeof option === 'object') {
                options = option;
            }

            //
            if (typeof option === 'string') {
                action = option;
            }

            if (!data) {
                data = new Slide($this, options);
                $this.data('slide', data);
            }

            if (typeof option == 'number') {
                data.to(option, true);
            }
            else if (action) {
                data[action]();
            }
        });
    };

    $.fn.slide.Constructor = Slide;

    return Slide;
}));




