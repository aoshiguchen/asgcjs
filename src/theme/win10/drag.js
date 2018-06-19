/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v0.0.1
 */
Asgc.UI.win10.Drag = function(handle){
	var winform = handle.ele;
	var bar = handle.title;
	var isMoveing = false;
    var isFirstMoveing = true;
    var logInfo = 'theme win10 ' + handle.fullClassName + ' id:' + handle.id + ' ';
    var area;

    var drag = function (e) {
        e = e || window.event;

        var moveMouseCoord = Asgc.util.getMousePosition(e);
        var distX = moveMouseCoord.x - handle.mouseStartCoord.x;
        var distY = moveMouseCoord.y - handle.mouseStartCoord.y;

        logger.info(logInfo + 'drag x:' + moveMouseCoord.x + ' y:' + moveMouseCoord.y);

        isMoveing = true;
        if (isFirstMoveing) {
            isFirstMoveing = false;
            isMoveing = false;
            isFirstMoveing = true;
            document.ontouchend = null;
            document.ontouchmove = null;
        }

        var _left = area.x + distX;
        var _top = area.y + distY;

        handle.ele.style.left = _left + 'px';
        handle.ele.style.top = _top + 'px';

        if(Asgc.types.isFunction(handle.onMove)){
            handle.onMove(e);
        }
    };

    var dragend = function (e) {
        logger.info(logInfo + ' ' + handle.fullClassName + ' id:' + handle.id + ' dragend');
        e = e || window.event;

        document.ontouchend = null;
        document.ontouchmove = null;
        if (Asgc.util.isPC()) {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    };

    var dragstart = function (e) {
        e = e || window.event;

        var mouseCoord = Asgc.util.getMousePosition(e);
        handle.mouseStartCoord = mouseCoord;
        area = handle.ele.getBoundingClientRect();

        logger.info(logInfo + ' dragstart x:' + mouseCoord.x + ' y:' + mouseCoord.y);
        if(Asgc.types.isFunction(handle.moveBefore)){
            handle.moveBefore(e);
        }

        document.ontouchend = dragend;
        document.ontouchmove = drag;
        if (Asgc.util.isPC()) {
            document.onmouseup = dragend;
            document.onmousemove = drag;
        }
                           
    };

    bar.ontouchstart = dragstart;
    if (Asgc.util.isPC()) {
        bar.onmousedown = dragstart;
    }

};