/* banner 轮播图 */

// 图片渐变
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
    }
}

// 获取下一张轮播图节点
function getAfterSlide(arr,crtSlide) {
    for (var i=0;i<arr.length;i++) {
        if (crtSlide === arr[i]) {
            var sldIndex = i;
            break;
        }
    }        
    if (sldIndex === (arr.length-1)) {
        return arr[0];
    }else {
        return arr[sldIndex + 1];
    }        
} 

// 轮播函数
function slider() {
    var slides = getByClass('slide'),
        crtSlide = getByClass('crt_slide')[0];

    function animation() {      
        var afterSlide = getAfterSlide(slides, crtSlide);

        slide.fadein(afterSlide,1/50,10);
        slide.fadeout(crtSlide,1/50,10);
        crtSlide.className = "slide";
        afterSlide.className += " crt_slide";
        crtSlide = afterSlide;
    }

    var onload = setInterval(animation,5000);
    for (var i=0;i<slides.length;i++) {   
        eventUtil.addHandler(slides[i], 'mouseover', function(){clearInterval(onload);});
        eventUtil.addHandler(slides[i], 'mouseout', function(){onload = setInterval(animation,5000);});
    }
}

// pointer指示器



addLoadEvent(slider);

