$(document).ready(function () {
    $(".friend .link").hover(function () {
        $(this).next().slideDown("fast")
    });
    $(".friend").mouseleave(function () {
        $(this).find(".linkUl").slideUp("fast")
    });
    $(".auth .username").hover(function () {
        $(".auth .hand").show();
    })
    $(".auth .hand").mouseleave(function () {
        $(".auth .hand").hide();
    })
    // $(".auth").hover(function () {
    //     $(this).next().show();
    //     $(this).addClass("active")
    // },function(){
    //     $(this).next().hide();
    //     $(this).removeClass("active")
    // });
    $(".vip").mouseleave(function () {
        $(this).find("ul").hide();
        $(this).find(".active").removeClass("active")
    });
    $("#menu>li").has("ul").hover(function () {
        $(this).addClass("current1").find("ul").first().stop().slideDown()
    }, function () {
        $(this).removeClass("current1").find("ul").stop().slideUp(10)
    });
    $(".erji").has("ul").hover(function () {
        console.log('erji')
        if($(this).find('ul li').length){
            $(this).addClass("current1").find("ul").first().stop().slideDown()
        }
    }, function () {
        $(this).removeClass("current1").find("ul").stop().slideUp(10)
    });
    $(".erji").hover(function(){
        $(this).find('ul').offset({
            top:$(this).offset().top
        })
    })
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1000) {
            $("#backTop").fadeIn(1000)
        } else {
            $("#backTop").fadeOut(1000)
        }
    });
    $("#backTop").click(function () {
        $("body, html").animate({scrollTop: 0}, 600);
        return false
    })
});