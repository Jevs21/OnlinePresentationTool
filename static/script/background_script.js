$(document).ready(function () {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generateTempImg(n, img, screen_width, loc = "center") {
        let left_val = 0
        let falling_anim = getRandomInt(60) // Make this better
        let anim_duration = getRandomInt(3) + 4 // Between 4 and 7s

        if (loc == "left") {
            left_val = getRandomInt(300)
        }
        else if (loc == "right") {
            left_val = getRandomInt(300) + (Math.floor(screen_width) - 300)
        }
        else {
            left_val = getRandomInt(screen_width)
        }

        return `<img class='temp_img t_id_${n}' style='left: ${left_val}px; animation: falling_${falling_anim} ${anim_duration}s;' src='assets/${img}.svg'>`
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
    
        let limit = 20;
        let exit_i = 0;
        for (let image of queue) {
            if (exit_i > limit) {
                break;
            }
            exit_i++;
            for (let i = 0; i < 8; i++) { // 8 random
                container.append(generateTempImg(img_num, image, container.width()))
            }
            for (let i = 0; i < 3; i++) { // 3 in left 300px
                container.append(generateTempImg(img_num, image, container.width(), "left"))
            }
            for (let i = 0; i < 3; i++) { // 3 in right 300px
                container.append(generateTempImg(img_num, image, container.width(), "right"))
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
