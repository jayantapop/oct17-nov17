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
         var gun = $('.gun');

         var w = $(window);

         w.mousemove(function (e) {
             mouse.x = e.pageX - w.width() / 2;
             mouse.y = w.height() - e.pageY;
             angle = Math.atan(mouse.x / mouse.y) * 180 / Math.PI;
             gun.rotate(angle);
         });

         function shoot() {
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
             //console.log(bullet);
             bullet.animate({
                 top: 0,
                 left: left
             }, {
                 duration: h / speed,
                 easing: 'linear',
                 complete: function () {
                     bullet.remove();
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
                     //$('.birdposition').addClass('hideeffect');
                     var el = parseInt($('.score_count').text());
                     $('.score_count').text(el + 1);

                 }

             }, 100);
         }
         w.click(function (e) {
             if (e.target.id !== 'playButton') {
                 if ($('.bullet').length <= 0) {
                     shoot();
                     window.setInterval(function () {
                         var ranbirdnumber = Math.floor(Math.random() * 3) + 1;
                         var ranbirdspeed = Math.floor(Math.random() * 15000) + 3000;
                         var containerHeight = $('.bird_container').height();
                         var ranbirdpos = Math.floor(Math.random() * containerHeight) + 200;
                         console.log(ranbirdpos);
                         for (var number = 0; number < ranbirdnumber; number++) {
                             console.log('loop');
                             $('<div id="" class="animation birdposition fromleft"></div>').appendTo('.bird_container');
                             var left = $('.fromleft').offset().left;
                             $(".fromleft").css({
                                 left: left,
                                 top: ranbirdpos
                             }).animate({
                                 left: -150
                             }, {
                                 duration: ranbirdspeed,
                                 specialEasing: {
                                     width: "linear",
                                     height: "easeOutBounce"
                                 },
                                 complete: function () {}
                             });
                         }
                     }, 3000);

                 }
             }
         });
     });
 })();




 var glower = $('#name');
 window.setInterval(function () {
     glower.toggleClass('border_active');
 }, 1000);

 $(document).ready(function () {
     $('#playButton').on('click', function (e) {
         e.preventDefault();
         var name = $('#name').val();
         flag = 0;
         if (name == '' || name.length > 8) {
             flag = 1;
             $('#name').focus();
             $('#formName').addClass('blink_me');
             $('#formName').html('You must choose your alias name within 8 letter');

         }
         if (flag == 0) {
             localStorage.setItem('playername', name);
             //console.log(localStorage.getItem('playername'));
             $('.starter').fadeOut('slow');
             $('.sparow_name').append(localStorage.getItem('playername'));
             $('body').addClass('cursor_blank');




         }
     });
     $('#name').on('keypress', function (e) {
         var key = e.which;
         if (key == 13) // the enter key code
         {
             $('#playButton').click();
             return false;
         }
     });

     var movementStrength = 5;
     var height = movementStrength / $(window).height();
     var width = movementStrength / $(window).width();
     $("#top-image").mousemove(function (e) {
         var pageX = e.pageX - ($(window).width() / 2);
         var pageY = e.pageY - ($(window).height() / 2);
         var newvalueX = width * pageX * -1 - 0;
         var newvalueY = height * pageY * -1 - 5;
         $('#top-image').css("background-position", newvalueX + "px     " + newvalueY + "px");
     });

     /*===== Audio Control Start ========*/
     BgSound.volume = .4;
     clicked = true;
     var mainAudio = document.getElementById('BgSound');


     $(".bar-c").click(function () {
         if (clicked) {
             $(".bar").addClass("noAnim");
             $(".bar-c").addClass("bar-active");
             mainAudio.pause("5000");
             clicked = false;
         } else {
             $(".bar").removeClass("noAnim");
             $(".bar-c").removeClass("bar-active");
             mainAudio.play();
             clicked = true;
         }
     });



 });
