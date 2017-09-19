window.onbeforeunload = function () {
    window.setTimeout(function () {
        window.location = 'index.html';
    }, 0);
    window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
}

$(document).ready(function () {
    var arrowCount = 25;
    $("body").append("<div class='numberOfArray' style='position: absolute; z-index: 99; background: #80F4CF; padding: 10px; color: #000; border-radius: 50%; left: 10px; bottom: 10px; font-size: 15px; font-weight: bold; border: 2px solid #000;'>" + arrowCount + "</div>");
    /* === Background Music Fetch Start === */
    //console.log(localStorage.getItem('gamemusic'));
    BgSound.volume = .3;
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
    var movementStrength = 10,
        height = movementStrength / $(window).height(),
        width = movementStrength / $(window).width()
    $("#top-image").mousemove(function (e) {
        var pageX = e.pageX - ($(window).width() / 2),
            pageY = e.pageY - ($(window).height() / 2),
            newvalueX = width * pageX * -1 - 0,
            newvalueY = height * pageY * -1 - 10
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
                var speed = 1000 / 2000;
                var h = Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2));
                bullet.animate({
                    top: 0,
                    left: left
                }, {
                    duration: h / speed,
                    easing: 'linear',
                    complete: function () {
                        //alert('complete triggered');
                        bullet.remove();
                        arrowCount = arrowCount - 1;
                        if (arrowCount == 0) {
                            alert('game over');
                            return false;
                        }
                        $(".numberOfArray").html(arrowCount);
                        clearInterval(liveposition);

                    },
                    step: function (now, fx) {
                        var l = parseInt(bullet.css('left'));
                        if (l > w.width() - 50 || l < 0) {
                            bullet.stop().remove();
                            clearInterval(liveposition);
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
                    //console.log(x3, x4, x4Right, y3, y4, y4Bottom);

                    if (x3 >= x4 && x3 <= x4Right && y3 >= y4 && y3 <= y4Bottom) {
                        clearInterval(liveposition);
                        console.log('shoot');
                        var birdshootSound = document.getElementById('birdshootSound');
                        birdshootSound.play();

                        $('.birdposition').addClass('hideeffect');
                        $('div.hideeffect').remove();
                        var el = parseInt($('.score_count').text());
                        $('.score_count').text(el + 100);
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
    /* in case random number of bird required open this block 
    var randomnumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    for(var i = 0; i< randomnumber ; i++) {
    	callthebird();
    }*/
}

function callthebird() {
    var ranbirdspeed = Math.floor(Math.random() * 15000) + 3000;
    var containerHeight = $('.bird_container').height();
    var ranbirdpos = Math.floor(Math.random() * containerHeight) + 200;
    //console.log(ranbirdpos);
    //console.log('loop');
    $('<div id="" class="animation birdposition fromleft"></div>').appendTo('.bird_container');
    var birdleft = $('.fromleft').offset().left;

    $(".fromleft").css({
        left: birdleft,
        top: 0

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
