$(document).ready(function () {
    /* ==== Mouse Alt click block Start ==== */
    $("body").on("contextmenu", function () {
        return false;
    });
    /* ==== Mouse Alt click block End ==== */
    var glower = $('#name');
    window.setInterval(function () {
        glower.toggleClass('border_active');
    }, 1000);
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
            //$('.starter').fadeOut('slow');
            //$('.sparow_name').append(localStorage.getItem('playername'));
            //$('body').addClass('cursor_blank');

            $("body").fadeOut(1000, function () {
                window.location.replace("game.html");
            })

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

    /*===== Audio Control Start ========*/
    BgSound.volume = .4;
    playmusic = true;
    var mainAudio = document.getElementById('BgSound');
    $(".bar-c").click(function () {
        if (playmusic) {
            $(".bar").addClass("noAnim");
            $(".bar-c").addClass("bar-active");
            mainAudio.pause("5000");
            playmusic = false;

        } else {
            $(".bar").removeClass("noAnim");
            $(".bar-c").removeClass("bar-active");
            mainAudio.play();
            playmusic = true;
        }
        localStorage.setItem('gamemusic', playmusic);
    });
    localStorage.setItem('gamemusic', playmusic);

});
