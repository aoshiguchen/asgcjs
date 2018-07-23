/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v0.0.1
 */
//先不考虑最小化的情况
Asgc.UI.win10.Resize = function(win,handle, isTop, isLeft, lockX, lockY){

    var UIConsts = Asgc.Consts.UI;
	var isResizing = false;
    var isFirstResizing = true;
    var logInfo = 'theme win10 ' + win.fullClassName + ' id:' + win.id + ' resize ';

	var drag = function (e) {
		e = e || window.event;
		
		var moveMouseCoord = Asgc.util.getMousePosition(e);
        var distX = moveMouseCoord.x - handle.mouseStartCoord.x;
        var distY = moveMouseCoord.y - handle.mouseStartCoord.y;

        logger.debug(logInfo + 'drag x:' + moveMouseCoord.x + ' y:' + moveMouseCoord.y);

        var _top = handle.area.top + distY;
        var _left = handle.area.left + distX;
        var _height = isTop ? handle.area.height - distY : handle.area.height + distY;
        var _width = isLeft ? handle.area.width - distX : handle.area.width + distX;

        if (isLeft) {
           _left = Math.min(_left, handle.area.left + handle.area.width - parseInt(win.minWidth));
           _left = Math.max(0, _left);
           _left = Math.max(handle.area.left + handle.area.width - parseInt(win.maxWidth), _left);
        }else{
        	_left = Math.min(_left,handle.area.left);
        	_left = Math.max(_left,handle.area.left);
        } 

        if (isTop) {
           _top = Math.min(_top, handle.area.top + handle.area.height - parseInt(win.minHeight));
           _top = Math.max(0, _top);
           _top = Math.max(handle.area.top + handle.area.height - parseInt(win.maxHeight), _top);
        }else{
        	_top = Math.min(_top,handle.area.top);
        	_top = Math.max(_top,handle.area.top);
        }

        if (lockY) {
            win.ele.style.width = _width + 'px';
            win.ele.style.left = _left + 'px';
        }

        if (lockX) {
            win.ele.style.top = _top + 'px';
            win.ele.style.height = _height + 'px'; 
        }

        if (!lockY && !lockX) {
            win.ele.style.width = _width + 'px';
            win.ele.style.left = _left + 'px';
            win.ele.style.top = _top + 'px';
            win.ele.style.height = _height + 'px';
        }
	};

	var dragend = function (e) {
		e = e || window.event;
		logger.debug(logInfo + ' ' + win.fullClassName + ' id:' + win.id + ' dragend');

		document.ontouchend = null;
        document.ontouchmove = null;
        if (Asgc.util.isPC()) {
            document.onmouseup = null;
            document.onmousemove = null;
        }

	};
 
	var dragstart = function (e) {
		e = e || window.event;

        if(win.status != UIConsts.windowStatus.normal){
            return;
        }

		var mouseCoord = Asgc.util.getMousePosition(e);
		handle.mouseStartCoord = mouseCoord;
		handle.area = win.ele.getBoundingClientRect();

		logger.debug(logInfo + ' dragstart x:' + mouseCoord.x + ' y:' + mouseCoord.y);

		//TODO触发resize事件
		
		document.ontouchend = dragend;
        document.ontouchmove = drag;
        if (Asgc.util.isPC()) {
            document.onmouseup = dragend;
            document.onmousemove = drag;
        }
	 	
	};

    
    handle.ontouchstart = dragstart;
    if (Asgc.util.isPC()) {
        handle.onmousedown = dragstart;
    }
}; 