// 待解决问题记录
// IE8 opacity待兼容



/* 顶部提示信息 */
// 点击后再刷新会先显示再隐藏，不友好，待解决
function msgDisplay() {
    var cookie = getCookie();
    var msg = getByClass('m-msg')[0],
        close = getByClass('close_msg')[0];
    if (cookie.hiddenMsg) {
        addClass(msg, 'f-dn');
    } else {
        eventUtil.addHandler(close, 'click', function(){
            addClass(msg, 'f-dn');            
            setCookie('hiddenMsg', 'true', '/');
        });
    }   
}
/* /顶部提示信息 */


/* banner 轮播图 */
// 图片渐变: fadein,fadeout
function fadeout (ele,stepLength,stepTime) {
    // 重置opacity及z-index
    ele.style.opacity = 1;
    ele.style.zIndex = 0;
    function step () {
        if (parseFloat(ele.style.opacity)-stepLength > 0) {
            ele.style.opacity = parseFloat(ele.style.opacity)-stepLength;
        } else {
            ele.style.opacity = 0; 
            clearInterval(setfadeout);
        }
    }
    var setfadeout = setInterval(step, stepTime);
}

function fadein (ele,stepLength,stepTime) {
    // 重置opacity及z-index
    ele.style.opacity = 0;
    ele.style.zIndex = 1;     
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
        fadein(afterSlide,1/50,10);
        fadeout(crtSlide,1/50,10);

        // 将下一节点更换为当前节点
        removeClass(crtSlide, 'crt_slide');
        removeClass(crtPoint, 'crt_point');
        addClass(afterSlide, 'crt_slide');
        addClass(afterPoint, 'crt_point');
        crtSlide = afterSlide;
        crtPoint = afterPoint;
    }

    // 鼠标悬停
    function msover(event) {
        // 清除 animation 
        clearInterval(onload);
    }
    function msout(event) { 
        // 重置 nimation 
        onload = setInterval(animation,5000);
    }

    // hover poniter后的切换
    function clickPointer(event) {
        event = event || window.event;
        clearInterval(onload);
        removeClass(crtPoint, 'crt_point');
        crtPoint = eventUtil.getElement(event);
        addClass(crtPoint, 'crt_point');

        // 取出被click元素的索引值
        for (var i=0;i<pointer.length;i++) {
            if (crtPoint === pointer[i]) {
                pointIndex = i;
                break;
            }
        }

        // 切换 slide
        if(crtSlide !== slides[pointIndex]) {
            fadein(slides[pointIndex],1/50,10);
            fadeout(crtSlide,1/50,10); 
            removeClass(crtSlide, 'crt_slide');     
            crtSlide = slides[pointIndex];
            addClass(crtSlide, 'crt_slide');
        } 
        else {
            addClass(crtSlide, 'crt_slide');
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




/* 登录框 */
function signin() {
    var flwBtn = getByClass('u-btn-1')[0];

    var plhdUser = getByClass('plhd_user')[0],
        plhdPswd = getByClass('plhd_pswd')[0],
        user = document.getElementById('user'),
        pswd = document.getElementById('pswd');

    var mask = getByClass('m-mask')[0],
        login = getByClass('m-login')[0],
        closeLogin = getByClass('close_login')[0];

    // 弹出登录框
    eventUtil.addHandler(flwBtn, 'click', function(){
        removeClass(mask, 'f-dn');
        removeClass(login, 'f-dn');
    });

    // 输入框获得焦点，隐藏占位符
    eventUtil.addHandler(user, 'keydown', function(){
        addClass(plhdUser, 'f-dn');
    });
    eventUtil.addHandler(pswd, 'keydown', function(){
        addClass(plhdPswd, 'f-dn');
    });

    // 输入框失去焦点，且为空时显示占位符
    eventUtil.addHandler(user, 'blur', function(){
        if (!user.value) {
            removeClass(plhdUser, 'f-dn');
        };
    });    
    eventUtil.addHandler(pswd, 'blur', function(){
        if (!pswd.value) {
            removeClass(plhdPswd, 'f-dn');
        };
    });

    // 关闭登录框
    eventUtil.addHandler(closeLogin, 'click', function(){
        addClass(mask, 'f-dn');
        addClass(login, 'f-dn');
    });
}

/* /登录框 */




/* 课程 */

// 展示课程
function showCourse(courseData, options) {  
    var courses = getByClass('courses')[0],
        courseHtml = '';
    var mPager = getByClass('m-pager')[0];

    // 遍历课程数据
    for(var i=0; i<courseData.list.length; i++) {
        var course = document.createElement('div');
        addClass(course, 'm-course');

        // 课程数据输入HTML中
        courseHtml = '<div class="summary"><img src="' + courseData.list[i].middlePhotoUrl + '" alt="课程图片"><div class="summary_txt"><h5>' + courseData.list[i].name + '</h5><p>' + courseData.list[i].provider + '</p><div class="nums f-ib"><span class="f-ib"></span>' + courseData.list[i].learnerCount + '</div><p class="cost">¥ ' + courseData.list[i].price + '</p></div></div><div class="detail f-dn"><img src="' + courseData.list[i].middlePhotoUrl + '" alt="课程图片"><div class="f-cb dtltxt_1"><h5>' + courseData.list[i].name + '</h5><div class="u-num u-num-1"><span class="f-ib"></span>57人在学</div><p class="author">发布者：' + courseData.list[i].provider + '</p><p>分类：' + courseData.list[i].categoryName + '</p></div><div class="dtltxt_2"><p>' + courseData.list[i].description + '</p></div></div>';
        course.innerHTML = courseHtml;
        // 将新建节点出入 div.courses 内
        courses.appendChild(course);
    }

    // 重置翻页器页码
    var num = options.pageNo;
    var totlePage = courseData.pagination.totlePageCount;
    renewPager(num, totlePage);
    // 课程加载后显示翻页器
    removeClass(mPager, 'f-vh');  
}


// 获取课程 
function getCourse(num, cType){
    // 清除原有课程
    var courses = getByClass('courses')[0];
        courses.innerHTML = '';

    // 换页成功前隐藏翻页器
    var mPager = getByClass('m-pager')[0]; 
    addClass(mPager, 'f-vh'); 

    var url = 'http://study.163.com/webDev/couresByCategory.htm';
    num = num || 1;
    cType = cType || 10;
    var options =  {pageNo:num, psize:20, type:cType};
    get(url, options, showCourse);
}


// 切换标签
function tab() {
    var tab = document.querySelectorAll('.tab h4');
    // 添加click事件
    for(var i=0; i<tab.length; i++) {
        eventUtil.addHandler(tab[i], 'click', clickTab);
    }
}
// 获取tab的筛选类型
function getCType() {
    var tab = document.querySelectorAll('.tab h4'),
        crtTab = getByClass('crt_tab')[0],
        cType;       
    if(crtTab == tab[0]) {
        return cType = 10;
    } else {
        return cType = 20;
    }
}
// 点击tab
function clickTab(event) {
    event = event || window.event;
    var crtTab = getByClass('crt_tab')[0];
    var tab = document.querySelectorAll('.tab h4');
    var cType;
    oClick = eventUtil.getElement(event);
    // 判断被点击tab是否为当前tab
    if (oClick != crtTab) {
        // 重置当前tab
        removeClass(crtTab, 'crt_tab');
        addClass(oClick, 'crt_tab');
        var mPager = getByClass('m-pager')[0]; 
        addClass(mPager, 'f-vh');
        // 获取课程
        getCourse(1, getCType());
    }
}

/* /课程 */

/* 热门课程排行 */
// 获取课程数据
function getHotCourse(){
    var url = 'http://study.163.com/webDev/hotcouresByCategory.htm';
    get(url, '', showHotCourse);
}
// 展示热门课程
function showHotCourse(data) {
    var cardTop = getByClass('m-card-top')[0],
        topCourse = document.createElement('div'),
        courseHTML = '';

    // 取到课程数据后显示热门排行
    removeClass(cardTop, 'f-vh');

    // 遍历前10门课程
    for(var i=0; i<10; i++) {
        var courseData = data[i];
        var  topCourse = document.createElement('div');
        addClass(topCourse, 'top_course f-cb');

        courseHTML = '<img src="' + courseData.smallPhotoUrl + '" alt="' + courseData.name + '"><p class="course_name">' + courseData.name + '</p><div class="u-num"><span class="f-ib"></span>' + courseData.learnerCount + '</div>';

        topCourse.innerHTML = courseHTML;
        cardTop.appendChild(topCourse);
    }
    replaceHot(data);
}
// 隔5秒替换一个热门课程
function replaceHot (data) {
    // 未显示课程索引值
    var restList = [10,11,12,13,14,15,16,17,18,19];

    function change() {
        // 取出第一个未显示课程索引值
        var add = restList.shift();
        // 将被移除的课程索引值重新添加到 restList，即可无限循环
        if(add >= 10) {
            restList.push(add-10);
        }else {
            restList.push(add+10);
        }

        // 取出课程数据
        var courseData = data[add];
        // 新建节点
        var topCourse = getByClass('top_course');
        var cardTop = topCourse[0].parentNode;
        var newCourse = document.createElement('div');
        addClass(newCourse, 'top_course f-cb');

        var courseHTML = '<img src="' + courseData.smallPhotoUrl + '" alt="' + courseData.name + '"><p class="course_name">' + courseData.name + '</p><div class="u-num"><span class="f-ib"></span>' + courseData.learnerCount + '</div>';
        // 移出课程
        remove(topCourse[0]);
        // 添加课程
        newCourse.innerHTML = courseHTML;
        cardTop.appendChild(newCourse);  
    }
    // 5s更换一门课程
    setInterval(change, 5000);
}

/* /热门课程排行 */


/* 翻页器 */
// 点击事件注册
function pager () {
    var pPage = getByClass('prevs_page')[0],
        nPage = getByClass('next_page')[0];
    var pgr = getByClass('pgr');

    // 点击页码 
    for(var i=0; i<pgr.length; i++) {
        pgr[i].onclick = function(event) {
            eventUtil.preventDefault(event);
        }
        eventUtil.addHandler(pgr[i], 'click', clickPage);
    }

    // 上一页
    pPage.onclick = function(event) {
        eventUtil.preventDefault(event);
    }
    eventUtil.addHandler(pPage, 'click', prevsPage);

    // 下一页
    nPage.onclick = function(event) {
        eventUtil.preventDefault(event);
    }
    eventUtil.addHandler(nPage, 'click', nextPage); 

}

// 翻页后上移
function returnTop() {
    window.scrollBy(0,-50);
    if(document.body.scrollTop>1150) { 
        var sdelay= setTimeout('returnTop()',10);
    }
}

// 换页
function clickPage (event) {
    event = event || window.event;

    var pageBtn = eventUtil.getElement(event);
    var crtPage = getByClass('crt_page')[0]; 
    var oClick = eventUtil.getElement(event);

    // 点击对象非当前对象时继续进行
    if (oClick != crtPage) {
        returnTop();
        // 获取get请求参数pageNo、type
        var num = parseInt(pageBtn.firstChild.nodeValue);

        // 更换当前页码
        if (num < 7) {
            removeClass(crtPage, 'crt_page');
            addClass(pageBtn, 'crt_page');
        } 
        // 获取cType
        var cType = getCType();

        // 获取课程
        getCourse(num, cType);
    }  
}

// 上一页
function prevsPage() {
    var  crtPage = getByClass('crt_page')[0];

    if (crtPage.firstChild.nodeValue !== '1') {
        returnTop();
        // 取出前一页页码
        var reg = /pgr([0-9])/;
        var crtClass = crtPage.getAttribute('class');
        var crtIndex = crtClass.match(reg)[1];
        var prevsIndex = crtIndex - 1;
        var prevsClass = "pgr" + prevsIndex;
        var prevs = getByClass(prevsClass)[0];
        var prevsNum = parseInt(prevs.firstChild.nodeValue);

        // 页码小于7时更换当前页码（注：大于7时在 renewPager() 函数中进行处理）
        if (prevsNum < 7) {
            var prevsClass = 'pgr' + prevsNum;
            var prevs = getByClass(prevsClass)[0];
            removeClass(crtPage, 'crt_page');
            addClass(prevs, 'crt_page');
        } 

        // 获取课程
        var cType = getCType();
        getCourse(prevsNum, cType);
    }
}

// 下一页
function nextPage() {
    var  crtPage = getByClass('crt_page')[0];

    var reg = /pgr([0-9])/;
    var crtClass = crtPage.getAttribute('class');
    var crtIndex = crtClass.match(reg)[1];
    var crtTxt = crtPage.firstChild.nodeValue; 
    var judge = crtIndex == 7 && crtTxt == '7';

    // 若当前页为最后一页，则不进行
    if (crtIndex != 7 || judge) {
        returnTop();
        var nextIndex = parseInt(crtIndex) + 1;
        var nextClass = "pgr" + nextIndex;
        var next = getByClass(nextClass)[0];
        var nextNum = parseInt(next.firstChild.nodeValue);

        // 更换当前页码
        if (nextNum < 7) {
            var nextClass = 'pgr' + nextNum;
            var next = getByClass(nextClass)[0];
            removeClass(crtPage, 'crt_page');
            addClass(next, 'crt_page');
        } 

        var cType = getCType();
        getCourse(nextNum, cType);      
    }
}

// 更换显示页码
function renewPager(num,totlePage) {
    var pgr1 = getByClass('pgr1')[0],
        pgr2 = getByClass('pgr2')[0],
        pgr3 = getByClass('pgr3')[0],
        pgr4 = getByClass('pgr4')[0],
        pgr5 = getByClass('pgr5')[0],
        pgr6 = getByClass('pgr6')[0],
        pgr7 = getByClass('pgr7')[0];

    var crtPage = getByClass('crt_page')[0];
    var dot1 = getByClass('dot1')[0],
        dot2 = getByClass('dot2')[0];

    // 获取页为最后一页
    if (num === totlePage) {
        // 更新当前页
        removeClass(crtPage, 'crt_page');
        addClass(pgr7, 'crt_page'); 
        // 隐藏省略号
        addClass(dot2, 'f-dn');       
        // 重置页码
        pgr2.innerHTML = totlePage -5;
        pgr3.innerHTML = totlePage -4;
        pgr4.innerHTML = totlePage -3;
        pgr5.innerHTML = totlePage -2;      
        pgr6.innerHTML = totlePage -1;
        pgr7.innerHTML = totlePage;        
    } else if (num === totlePage-1) {
        // 获取页为倒数第二页
        removeClass(crtPage, 'crt_page');
        addClass(pgr6, 'crt_page');

        addClass(dot2, 'f-dn');         

        pgr2.innerHTML = totlePage -5;
        pgr3.innerHTML = totlePage -4;
        pgr4.innerHTML = totlePage -3;
        pgr5.innerHTML = totlePage -2;      
        pgr6.innerHTML = totlePage -1;
        pgr7.innerHTML = totlePage; 
    } else if (num >= 7) {
        // 获取页小于7
        removeClass(crtPage, 'crt_page');
        addClass(pgr5, 'crt_page');

        // 前往页码大于等于7时，显示页码1旁的省略符号
        removeClass(dot1, 'f-dn');
        removeClass(dot2, 'f-dn')

        pgr2.innerHTML = num - 3;
        pgr3.innerHTML = num - 2;
        pgr4.innerHTML = num - 1;
        pgr5.innerHTML = num;
        pgr6.innerHTML = num + 1;
        pgr7.innerHTML = num + 2;
    } else if (num > 1){
        // 前往页码小于7时，隐藏页码1旁的省略符号
        addClass(dot1, 'f-dn');
        removeClass(dot2, 'f-dn')

        pgr2.innerHTML = 2;
        pgr3.innerHTML = 3;
        pgr4.innerHTML = 4;
        pgr5.innerHTML = 5;      
        pgr6.innerHTML = 6;
        pgr7.innerHTML = 7;        
    } else {
        // num==1时切换tab，重置为第一页
        removeClass(crtPage, 'crt_page');
        addClass(pgr1, 'crt_page');

        pgr2.innerHTML = 2;
        pgr3.innerHTML = 3;
        pgr4.innerHTML = 4;
        pgr5.innerHTML = 5;      
        pgr6.innerHTML = 6;
        pgr7.innerHTML = 7;         
    }
}
/* 翻页器 */

addLoadEvent(getHotCourse);
addLoadEvent(tab);
addLoadEvent(pager);
addLoadEvent(getCourse);
addLoadEvent(msgDisplay);
addLoadEvent(slider);
addLoadEvent(signin);

