$(document).ready(function () {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    function clearTempImgs(img_num) {
        if (img_num >= 0) {
            $(`.t_id_${img_num}`).remove();
        }
        else {
            $(`.temp_img`)
        }
    }
    
    function placeTempImgs(queue, img_num) {
        let container = $('#container');
    
        let limit = 100;
        let exit_i = 0;
        for (let image of queue) {
            if (exit_i > limit) {
                break;
            }
            exit_i++;
            for (let i = 0; i < 10; i++) {
                let left_val = getRandomInt(container.width())
                let falling_anim = getRandomInt(60) // Make this better
                let anim_duration = getRandomInt(3) + 2
    
                container.append(`<img class='temp_img t_id_${img_num}' style='left: ${left_val}px; animation: falling_${falling_anim} ${anim_duration}s;' src='assets/${image}.svg'>`);
            }
        }
        
    }
    
    let buffer = 8000 // 8 second buffer.
    let poll_interval = 500;
    let buffer_n = Math.floor(buffer / poll_interval); 
    let IMG_NUM = 0;
    
    setInterval(function(){ 
        $.ajax({
            method: 'GET',
            url: '/poll_for_reactions'
        })
        .done((data) => {
            if (IMG_NUM > buffer_n) { // Buffer of 
                clearTempImgs(IMG_NUM - buffer_n);
            }
            placeTempImgs(data, IMG_NUM);
            IMG_NUM++;
            if (IMG_NUM > Number.MAX_SAFE_INTEGER - 1) {
                IMG_NUM = 0
                clearTempImgs(-1);
            }
        })
        .fail((err) => {
            console.log("ERROR");
            console.log(err);
        })
    
        //  
    }, poll_interval);
});
