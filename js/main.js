var Breaking = {
    $obj: $(".ticker.ticker-breaking"), $container: $("#breaking"), interval: false
    , init: function () {
//        Breaking.$obj = $(".ticker.ticker-breaking");
//        Breaking.$container = $("#breaking");
        Breaking.$container.find(".close").on("click", function () {
            Breaking.close();
        });
        if (!Breaking.$obj.length) {
            return false;
        }
        return true;
    }, open: function () {
        if (Breaking.$obj.length) {
//                $("#header").animate({'padding-top': '37px'});
            Breaking.$container.slideDown(function () {
                Breaking.initTicker();
            });
        }
    }, close: function () {
        if (Breaking.$obj.length) {
//                $("#header").animate({'padding-top': 0});
            Breaking.$container.slideUp();
            Breaking.destroyTicker();
        }
    }, initTicker: function () {
        if (Breaking.interval === false) {
            Breaking.interval = setInterval(function () {
                Breaking.$obj.find('li:first').slideUp(function () {
                    $(this).appendTo(Breaking.$obj.find('ul')).slideDown();
                });
            }, 7000);
        }
    }, destroyTicker: function () {
        if (Breaking.interval !== false) {
            clearInterval(Breaking.interval);
            Breaking.interval = false;
            return;
        }
    }
};


$(function () {
    // Search collapse
    $(document).on('click', ".header-menu .search > a", function (e) {
        var $search = $(this).next();
        if (!$("body").hasClass('_xs')) {
            $search.animate({width: 260, padding: 5}, function () {
                $search.find("input").focus();
            });
            $search.on('focusout', "input", function () {
                $search.animate({width: 0, padding: '5px 0'});
            });
        } else {
            $search.fadeIn(500, function () {
                $search.find("input").focus();
                $search.on('click', function (e) {
                    if (e.target !== this)
                        return;
                    $search.fadeOut(500);
                });
            });
        }
        e.preventDefault();
    });

    $(".to-top").click(function (e) {
        $("html, body").animate({'scrollTop': 0}, 800, 'easeOutSine');
        e.preventDefault();
    });

    if ($(".item-gallery").length) {
        $(".item-gallery ul").owlCarousel({
            items: 1
            , nav: true
            , loop: true
            , navText: ["", ""]
            , navContainer: $(".item-gallery")
            , autoHeight: true
            , rtl: $("body").hasClass('rtl') ? true : false
                    // Classes
            , themeClass: ''
            , baseClass: 'carousel'
            , loadedClass: 'loaded'
            , itemClass: 'carousel-item'
            , navContainerClass: 'pager'
            , navClass: ["prev", "next"]
        });
    }
    
    (function breaking() {
        var scripts = document.getElementsByTagName('script');
        var breakingExt = '';
        for (jk = 0; jk < scripts.length; jk++)
            if (scripts[jk].src.toLowerCase().indexOf('site.js') !== -1) {
                breakingExt = scripts[jk].src.replace(/^[^\?]+\??/, '');
                break;
            }
        $.ajax({url: "/callback/breaking" + breakingExt}).done(function (d) {
            for (var i = 0; i < d.length; i++) {
                $("#breaking ul:first").append("<li><a href='" + (breakingExt === 'fa' ? d[i].CleanUrlFa : d[i].CleanUrl) + "'>" + d[i].Summary + "</a></li>");
            }
            if (d.length > 0)
                Breaking.open();
//            setInterval(function () {
//                tick();
//            }, 7000);
        });
    })();

    $(document).on('click', ".panel.has-tabs .header-tabs a", function (e) {
        // Load items with ajax
        var $list = $(this).parents("ul:first");
        $list.find("> li").removeClass('active');
        $(this).parent().addClass('active');
        e.preventDefault();
    });

    $("#navbar .menu li.haschild").hover(function (e) {
        if (!$("body").hasClass('_xs')) {
            var $li = $(this);
            $li.find(".child").fadeIn(100, function () {
                $li.addClass("active");
            });
        }
    }, function () {
        if (!$("body").hasClass('_xs')) {
            var $li = $(this);
            $li.find(".child").fadeOut(100, function () {
                $li.removeClass("active");
            });
        }
    });
    
    $(document).on('click', "body._xs #navbar .menu li.haschild > a", function (e) {
        var $li = $(this).parent();
        var $child = $li.find(".child:first");
        if (!$child.is(":visible")) {
            $child.slideDown(200);
            $li.addClass('open');
        } else {
            $child.slideUp(200);
            $li.removeClass('open');
        }
        e.preventDefault();
    });

    $(document).on('click', "body._xs .footer-menu h4 a", function (e) {
        e.preventDefault();
        var $menu = $(this).parents(".footer-menu:first");
        var $child = $menu.find(".row, ol");
        if ($child.is(':hidden')) {
            $child.slideDown(function () {
                $menu.addClass("open");
            });
        } else {
            $child.slideUp(function () {
                $menu.removeClass("open");
            });
        }
        return false;
    });

    $(document).on('click', "[data-toggle]", function (e) {
        var $this = $(this);
        var $target = $($this.attr('data-target'));
        switch ($this.attr('data-toggle')) {
            case 'slide':
                if ($target.is(':visible'))
                    $target.slideUp();
                else
                    $target.slideDown();
                break;
            case 'toggle':
                $target.toggle();
                break;
            case 'fade':
                if ($target.is(':visible'))
                    $target.fadeOut();
                else
                    $target.fadeIn();
                break;
        }
        e.preventDefault();
    });
});

function socialIcons () {
    var offset = $("#item").length ? $("#item").offset() : null;
    if (offset && $(".item-sharings").length) {
        if (!$("body").hasClass('rtl'))
            $(".item-sharings").css({'left': offset.left - 60});
        else
            $(".item-sharings").css({'right': $("#mainbody .container:first").offset().left - 60});
    }
}
socialIcons ();

$(window).scroll(function() {
    var maxScroll = ($(document).height() - $(window).height());
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (maxScroll - scroll <= windowHeight)
        $(".item-sharings").css({'top': 60});
    else
        $(".item-sharings").css({'top': 160});
});
$(window).resize(function () { // Change width value on user resize, after DOM
    responsive_resize();
    socialIcons();
});
responsive_resize();
function responsive_resize() {
    var current_width = $(window).width();
    if (current_width < 768) {
        // XS
        $('body').addClass("_xs").removeClass("_sm").removeClass("_md").removeClass("_lg");
    } else if (current_width > 767 && current_width < 992) {
        $('body').addClass("_sm").removeClass("_xs").removeClass("_md").removeClass("_lg");
    } else if (current_width > 991 && current_width < 1200) {
        $('body').addClass("_md").removeClass("_xs").removeClass("_sm").removeClass("_lg");
    } else if (current_width > 1199) {
        $('body').addClass("_lg").removeClass("_xs").removeClass("_sm").removeClass("_md");
    }
}

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 */
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        if (!p)
            p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2)
            return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

// serializeArray - 
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};



// Election
$(function () {
    $(document).on('click', ".close-sidebar", function (e) {
        e.preventDefault();
        $($(this).attr('data-target')).removeClass($(this).attr('data-class'));
        return false;
    });
    $(document).on('click', ".panel.candidates li", function(e) {
        var $data = $(this).find("pre").html();
        $("#sidebar-details .contents").html($data).promise().done(function () {
            $("body").addClass("sidebar-open");
        });
    });
}); 