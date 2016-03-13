/* banner 轮播图 */

// 待解决问题记录
// hover当前图片对应的pointer时图片均不显示
// IE8 opacity待兼容

// 图片渐变: fadein,fadeout
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
        var setfadeout = setInterval(step, stepTime);
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
        var setfadein = setInterval(step, stepTime);
    }
}

// 获取下一张轮播图节点
function getAfterNode(arr,crtNode) {
    for (var i=0;i<arr.length;i++) {
        if (crtNode === arr[i]) {
            var crtIndex = i;
            break;
        }
    }        
    if (crtIndex === (arr.length-1)) {
        return arr[0];
    }else {
        return arr[crtIndex + 1];
    }        
} 

// 轮播函数
function slider() {
    // 取出轮播图及pointer节点
    var slides = getByClass('slide'),
        crtSlide = getByClass('crt_slide')[0];
    var pointer = getByClass('pointer')[0].getElementsByTagName('i'),
        crtPoint = getByClass('crt_point')[0],
        pointIndex;

    // 图片轮播效果函数
    function animation() {      
        var afterSlide = getAfterNode(slides, crtSlide),
            afterPoint = getAfterNode(pointer, crtPoint);
        // 调用 slide
        slide.fadein(afterSlide,1/50,10);
        slide.fadeout(crtSlide,1/50,10);

        // 将下一节点更换为当前节点
        crtSlide.className = "slide";
        crtPoint.className = "";
        afterSlide.className += " crt_slide";
        afterPoint.className = "crt_point";
        crtSlide = afterSlide;
        crtPoint = afterPoint;
    }

    // 鼠标悬停
    function msover(event) {
        event = event || window.event;
        event.target.style.opacity = 1;      
        clearInterval(onload);
    }
    function msout(event) {
        event = event || window.event;
        event.target.style.opacity = 1;        
        onload = setInterval(animation,5000);
    }

    // 点击poniter后的切换
    function clickPointer(event) {
        event = event || window.event;
        clearInterval(onload);
        for (var i=0;i<3;i++) {
            slides[i].className = "slide";
            pointer[i].className = "";
        }
        crtPoint = event.target;
        crtPoint.className = "crt_point";

        // 取出被click元素的索引值
        for (var i=0;i<pointer.length;i++) {
            if (crtPoint === pointer[i]) {
                pointIndex = i;
                break;
            }
        }

        // 更改切换前后的 opacity
        if(crtSlide !== slides[pointIndex]) {
            slide.fadein(slides[pointIndex],1/50,10);
            slide.fadeout(crtSlide,1/50,10);        
            crtSlide = slides[pointIndex];
            crtSlide.className = "slide crt_slide";
        } else {
            crtSlide.className = "slide crt_slide";
        }       
    }

    // 鼠标悬停事件注册
    for (var i=0;i<slides.length;i++) {
        eventUtil.addHandler(slides[i], 'mouseover', msover);
        eventUtil.addHandler(slides[i], 'mouseout', msout);       
    }

    // pointer切换事件注册
    for (var i=0;i<pointer.length;i++) {
        eventUtil.addHandler(pointer[i], 'mouseover',clickPointer);
    }

    // 每隔5s进行一次轮播
    var onload = setInterval(animation,5000);    

}


/* /banner轮播图 */



addLoadEvent(slider);

