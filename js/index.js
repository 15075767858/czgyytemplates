$(document).ready(function () {
    $("#myCarousel").carousel({interval: 3000});
    $(".numTips li").click(function () {
        var B = $(this).index();
        $(this).siblings().removeClass("current");
        $(this).addClass("current");
        $(".img-info img").hide();
        $(".img-info img").eq(B).fadeIn();
        $(".newsIndex").html("0" + (B + 1) + "/");
        $(".news-detail").hide();
        $(".news-detail").eq(B).show();
        $(".news-title dl").hide();
        $(".news-title dl").eq(B).show()
    });

    $(".business-nav li").hover(function () {
        var B = $(this).index();
        $(this).siblings().removeClass("current");
        $(this).addClass("current");
        $(".business-box .tabpage").removeClass("active");
        $(".business-box .tabpage").eq(B).addClass("active")
    });
    $(".sideNav li").click(function () {
        var B = $(this).index();
        $(this).siblings().removeClass("current");
        $(this).addClass("current");
        $(this).parents(".sideNav").next().find(".tabpanel").hide();
        $(this).parents(".sideNav").next().find(".tabpanel").eq(B).fadeIn()
    });
    $.extend(jQuery.easing, {
        easeOutStrong: function (C, D, E, F, B) {
            return -F * ((D = D / B - 1) * D * D * D - 1) + E
        }
    });
    $(".slider").on("mouseenter", function () {
        var E = [0];
        var D = $(this).attr("pid");
        for (var C = 0; C < 4; C++) {
            var B = C == D ? 280 : 0;
            if (C > 0) {
                E[C] = E[C - 1] + 205 + B
            }
            $(".slider").eq(C).stop().animate({"left": E[C]}, 1000, "easeOutStrong");
            $(".slider").find(".current").removeClass("current");
            $(this).find(".bgslide").addClass("current");
            $(".slider").find(".active").removeClass("active");
            $(this).find(".slideTitle").addClass("active")
        }
    });
    var A = [0, 205, 410, 615];
    $("#slider").on("mouseleave", function () {
        for (var B = 0; B < 4; B++) {
            $(".slider").eq(B).stop().animate({"left": A[B]}, 1000, "easeOutStrong");
            $(this).find(".current").removeClass("current");
            $(this).find(".slider").eq("3").find(".bgslide").addClass("current")
        }
    })
});