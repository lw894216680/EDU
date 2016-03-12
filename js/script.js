/* banner 轮播图 */
var slide = {
    fadeout: function (ele,stepLength,stepTime) {
        if (!parseFloat(ele.style.opacity)) {
            ele.style.opacity = 1;
        }
        function step () {
            if (parseFloat(ele.style.opacity)-stepLength > 0) {
                ele.style.opacity = parseFloat(ele.style.opacity)-stepLength;
            } else {
                ele.style.opacity = 0;
                clearInterval(setfadeout);
            }
        }
        var setfadeout = setInterval(step, 10);
    },
    fadein: function (ele,stepLength,stepTime) {
        if (!parseFloat(ele.style.opacity)) {
            ele.style.opacity = 0;
        }
        function step () {
            if (parseFloat(ele.style.opacity)+ stepLength < 1) {
                ele.style.opacity = parseFloat(ele.style.opacity)+stepLength;
            } else {
                ele.style.opacity = 1;
                clearInterval(setfadein);
            }
        }
        var setfadein = setInterval(step, 10);
    },
    msover: function(ele,setIntervalId) {
        ele.style.opacity = 1;
        clearInterval(setIntervalId);
    },
    msout: function(setIntervalId,func,time) {
        setIntervalId = setInterval(func,time);
    }
}

// function fadeout (ele) {
//     var stepLength = 1/50;
//     if (!parseFloat(ele.style.opacity)) {
//         ele.style.opacity = 1;
//     }
//     function step () {
//         if (parseFloat(ele.style.opacity)-stepLength > 0) {
//             ele.style.opacity = parseFloat(ele.style.opacity)-stepLength;
//         } else {
//             ele.style.opacity = 0;
//             clearInterval(setIntervalId);
//         }
//     }
//     var setIntervalId = setInterval(step, 10);

// }

// function fadein (ele) {
//     var stepLength = 1/50;
//     if (!parseFloat(ele.style.opacity)) {
//         ele.style.opacity = 0;
//     }
//     function step () {
//         if (parseFloat(ele.style.opacity)+ stepLength < 1) {
//             ele.style.opacity = parseFloat(ele.style.opacity)+stepLength;
//         } else {
//             ele.style.opacity = 1;
//             clearInterval(setIntervalId);
//         }
//     }
//     var setIntervalId = setInterval(step, 10);
// }

function slider() {
            var slides = getByClass('slide'),
            crtSlide = getByClass('crt_slide')[0];  
    function animation() {
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
            afterIndex = 0;
        }
        var afterSlide = slides[afterIndex];

        slide.fadein(afterSlide,1/50,10);
        slide.fadeout(crtSlide,1/50,10);
        crtSlide.className = "slide";
        afterSlide.className += " crt_slide";
    }    
    var onload = setInterval(animation,5000);
    eventUtil.addHandler(crtSlide, 'mouseover', function(){clearInterval(onload)});
    eventUtil.addHandler(crtSlide, 'mouseout', function(){onload = setInterval(animation,5000);});

}

// pointer指示器



addLoadEvent(slider);

