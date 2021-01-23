$(document).ready(function() {
    function sendButtonPress(img) {
        $.ajax({
            method: 'GET',
            url: '/button_pressed',
            data: {
                image: img
            } 
        })
    }

    $("#yes_button").click(     () => { sendButtonPress("yes") });
    $("#no_button").click(      () => { sendButtonPress("no") });
    $("#love_button").click(    () => { sendButtonPress("love") });
    $("#laugh_button").click(   () => { sendButtonPress("laugh") });
    $("#wow_button").click(     () => { sendButtonPress("wow") });
    $("#confused_button").click(() => { sendButtonPress("confused") });
});