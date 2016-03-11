/* banner 轮播图 */
function fadeout (ele) {
    var stepLength = 1/25;
    if (!parseFloat(ele.style.opacity)) {
        ele.style.opacity = 1;
    }
    function step () {
        if (parseFloat(ele.style.opacity)-stepLength > 0) {
            ele.style.opacity = parseFloat(ele.style.opacity)-stepLength;
        } else {
            ele.style.opacity = 0;
            clearInterval(setIntervalId);
        }
    }
    var setIntervalId = setInterval(step, 20);
}

function fadein (ele) {
    var stepLength = 1/25;
    if (!parseFloat(ele.style.opacity)) {
        ele.style.opacity = 0;
    }
    function step () {
        if (parseFloat(ele.style.opacity)+ stepLength < 1) {
            ele.style.opacity = parseFloat(ele.style.opacity)+stepLength;
        } else {
            ele.style.opacity = 1;
            clearInterval(setIntervalId);
        }
    }
    var setIntervalId = setInterval(step, 20);
}

function slider() {
    var slides = getByClass('slide'),
        crtSlide = getByClass('crt_slide')[0];        
    var sldIndex, afterIndex;
    for (var i=0;i<slides.length;i++) {
        if (crtSlide === slides[i]) {
            sldIndex = i;
            break;
        }
    }
    if (sldIndex === 0) {
        afterIndex = 1;
    } else if (sldIndex === 1) {
        afterIndex = 2;
    } else {
        afterIndex =0;
    }
    var afterSlide = slides[afterIndex];
    function animation() {
        fadein(afterSlide);
        fadeout(crtSlide);
        crtSlide.className.replace('crt_slide','');
        afterSlide.className += "crt_slide"
    }    
    var setTimeoutID = setTimeout(slider,5000);
}

addLoadEvent(slider);

