window.onbeforeunload = function () {
    window.setTimeout(function () {
        window.location = 'index.html';
    }, 0);
    window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
}

$(document).ready(function () {
    /* ==== Mouse Alt click block Start ==== */
    $("body").on("contextmenu", function () {
        return false;
    });
    /* ==== Mouse Alt click block End ==== */
    var arrowCount = 15;
    $("body").append("<div class='numberOfArray arrow_count_display'>Arrow Left: " + arrowCount + "</div>");
    /* === Background Music Fetch Start === */
    //console.log(localStorage.getItem('gamemusic'));
    BgSound.volume = .1;
    var gamemusicstate = localStorage.getItem('gamemusic');
    var mainAudio = document.getElementById('BgSound');
    //console.log(typeof gamemusicstate, gamemusicstate)
    if (gamemusicstate == 'true') {
        //console.log('play');
        mainAudio.play();
    } else {
        //console.log('pause');
        mainAudio.pause("5000");
    }
    /* === Background Music Fetch End === */
    /* === Paralax Background Start === */
    var movementStrength = 15,
        height = movementStrength / $(window).height(),
        width = movementStrength / $(window).width()
    $("#top-image").mousemove(function (e) {
        var pageX = e.pageX - ($(window).width() / 2),
            pageY = e.pageY - ($(window).height() / 2),
            newvalueX = width * pageX * -1 - 0,
            newvalueY = height * pageY * -1 - 5
        $('#top-image').css("background-position", newvalueX + "px     " + newvalueY + "px");
    });
    /* === Paralax Background End === */
    /* === User name fetch start === */
    $('.sparow_name').append(localStorage.getItem('playername'));
    $('body').addClass('cursor_blank');
    /* === User name fetch end === */

    $.fn.rotate = function (deg) {
        this.css({
            'transform': 'rotate(' + deg + 'deg)'
        });
        this.css({
            '-ms-transform': 'rotate(' + deg + 'deg)'
        });
        this.css({
            '-moz-transform': 'rotate(' + deg + 'deg)'
        });
        this.css({
            '-o-transform': 'rotate(' + deg + 'deg)'
        });
        this.css({
            '-webkit-transform': 'rotate(' + deg + 'deg)'
        });
        return this;
    };
    (function () {
        var mouse = {
                x: 0,
                y: 0
            },
            angle;
        $(function () {
            var gun = $('.gun'),
                w = $(window)
            w.mousemove(function (e) {
                mouse.x = e.pageX - w.width() / 2;
                mouse.y = w.height() - e.pageY;
                angle = Math.atan(mouse.x / mouse.y) * 180 / Math.PI;
                gun.rotate(angle);
            });

            function shoot() {
                var shootSound = document.getElementById('shootSound');
                shootSound.play();

                var hoffset = 15;
                var bullet = $('<div id="" class="bullet shootarrow"></div>').appendTo($('body')).rotate(angle).css({
                    top: w.height() - hoffset,
                    left: w.width() / 2 - 2
                });
                var a = (w.height() - hoffset),
                    o = Math.tan(angle * (Math.PI / 180)) * a,
                    left = w.width() / 2 + o;
                var speed = 1500 / 2000;
                var h = Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2));
                bullet.animate({
                    top: 0,
                    left: left
                }, {
                    duration: h / speed,
                    easing: 'linear',
                    complete: function () {
                        bullet.remove();
                        arrowCount = arrowCount - 1;
                        if (arrowCount == 0) {
                            //alert('game over');
                            $('.finisher').show();
                            shootSound.pause("5000");
                            $('.gameScore').text($('.score_count').text());

                            return false;
                        }
                        $(".numberOfArray").text('Arrow Left: ' + arrowCount);
                        clearInterval(liveposition);

                    },
                    step: function (now, fx) {
                        var l = parseInt(bullet.css('left'));
                        if (now < 0 || now > (w.width() - 100)) {
                            clearInterval(liveposition);
                            bullet.stop().remove();
                            arrowCount = arrowCount - 1;
                            if (arrowCount == 0) {
                                //alert('game over');
                                $('.finisher').show();
                                shootSound.pause("5000");
                                $('.gameScore').text($('.score_count').text());
                                return false;
                            }
                            $(".numberOfArray").text('Arrow Left: ' + arrowCount);
                        }
                    }
                });
                var liveposition = setInterval(function () {
                    var x1 = $('.shootarrow').offset().left;
                    var y1 = $('.shootarrow').offset().top;
                    var h1 = $('.shootarrow').outerHeight(true);
                    var w1 = $('.shootarrow').outerWidth(true);
                    var b1 = y1 + h1;
                    var r1 = x1 + w1;
                    var x2 = $('.birdposition').offset().left;
                    var y2 = $('.birdposition').offset().top;
                    var h2 = $('.birdposition').outerHeight(true);
                    var w2 = $('.birdposition').outerWidth(true);
                    var b2 = y2 + h2;
                    var r2 = x2 + w2;
                    var x3 = Math.round(x1);
                    var y3 = Math.round(y1);
                    var x4 = Math.round(x2);
                    var x4Right = parseInt(x4) + 110;
                    var y4 = Math.round(y2);
                    var y4Bottom = parseInt(y4) + 110;
                    if (x3 >= x4 && x3 <= x4Right && y3 >= y4 && y3 <= y4Bottom) {
                        clearInterval(liveposition);
                        var birdshootSound = document.getElementById('birdshootSound');
                        birdshootSound.play();
                        bullet.stop().remove();
                        $('.birdposition').addClass('hideeffect');
                        $('div.hideeffect').stop().remove();
                        var el = parseInt($('.score_count').text());
                        $('.score_count').text(el + 10);
                        canrandomnumberofbirds();
                    }

                }, 100);

            }
            //var ranbirdnumber = Math.floor(Math.random() * 3) + 1;
            callthebird();
            w.click(function (e) {
                if ($('.bullet').length <= 0) {
                    shoot();

                }
            });

        });
    })();


});

function canrandomnumberofbirds() {
    callthebird();
    /*in case random number of bird required open this block 
    var randomnumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    for(var i = 0; i< randomnumber ; i++) {
    	callthebird();
    }*/
}

function callthebird() {
    var ranbirdspeed = Math.floor(Math.random() * 8000) + 3000;
    var containerHeight = $('.bird_container').height();
    var ranbirdpos = Math.floor(Math.random() * containerHeight) + 280;

    //console.log(ranbirdpos);
    //console.log($('.bird_container').height());

    $('<div id="" class="animation fromleft birdposition"></div>').appendTo('.bird_container');
    var birdleft = $('.fromleft').offset().left;
    //console.log()
    $(".fromleft").css({
        left: birdleft,
        top: Math.floor(Math.random() * (1 - 280)) + containerHeight - 280

    }).animate({
        left: -150
    }, {
        duration: ranbirdspeed,
        /*specialEasing: {
        	width: "linear",
        	height: "easeOutBounce"
        },*/
        complete: function () {
            $('.fromleft').remove();
            canrandomnumberofbirds()
        }
    });
}

/* $(function () {
     setTimeout(function () {
         alert();
     }, 60000)
 });*/
/*window.setInterval(function () {



}, 3000);*/

$('#replayButton').on('click', function (e) {
    e.preventDefault();
    $("body").fadeOut(1000, function () {
        window.location.replace("index.html");
    })
});
$('#exitButton').on('click', function (e) {
    e.preventDefault();

    window.top.close();
});


/*================ Custom Preloder Start ================*/

var scrolled = 0;
var veil = 0;
var lastScroll = 0;
var direction = "down";
var ignore = false;
var oldNum = null;
$(window).on('beforeunload', function () {
    resetSlide();
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showQuotes() {

    var quotes = new Array("Building your game floor....", "Move your cursor to shoot the target", "Click to shoot", "You will get 15 arrow", "When you the shoot the target you will get your arrow back");
    var num = 0;
    do {
        num = getRandomInt(0, 3);
        //console.log("calculating num..");
    }
    while (num == oldNum);
    //console.log("Selected:"+num);
    var selectedQuote = quotes[num];
    oldNum = num;
    //window.setTimeout(function() { },5000);
    $("#quotes").html("“" + selectedQuote + "”");
    $("#quotes").removeClass("fadeOutDown").addClass("fadeInUp");
    //		console.log(Date()+": Refreshing in 5 secs");
    window.setTimeout(hideQuotes, 4000);
}

function hideQuotes() {
    $("#quotes").removeClass("fadeInUp").addClass("fadeOutDown");
    if ($("body").hasClass("hide_overflow")) {
        //console.log(Date()+": Showing again");
        window.setTimeout(showQuotes, 500);
    }
}
$(window).load(function () {
    $("body").removeClass("hide_overflow");
    $("html").removeClass("hide_overflow");
    $("#preloader").fadeOut();
    if (scrolled == 0) {
        $(".scroll-arrow").css("opacity", "1");
        window.setTimeout(showDots, 2000);
    }
});

function showDots() {
    for (var i = 0; i < 300; i++) {
        $(".dots").height(i);
        //console.log("height"+i+"px");
    };
}

/*================ Custom Preloder End ================*/
