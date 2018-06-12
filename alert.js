var alert = document.createElement('div');
alert.style.setProperty('display','block');
alert.style.setProperty('box-shadow','rgba(0, 0, 0, 0.3) 1px 1px 24px');
// alert.style.setProperty('resize','both');
// alert.style.setProperty('overflow','auto');

alert.style.setProperty('width','200px');
alert.style.setProperty('height','140px');
alert.style.setProperty('border','1px solid #3baced');
alert.style.setProperty('border-radius','5px');

var controlBar = document.createElement('div');
controlBar.style.setProperty('height','20px');
// controlBar.style.setProperty('background-color','#ccc');

var leftBar = document.createElement('div');
var rightBar = document.createElement('div');
leftBar.style.setProperty('display','inline-block');
rightBar.style.setProperty('display','inline-block');
rightBar.style.setProperty('float','right');

var icon = document.createElement('div');
icon.style.setProperty('display','inline-block');
icon.style.setProperty('margin','0px 5px 0px 5px');
icon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-default-icon"></use></svg>';
leftBar.appendChild(icon);

var title = document.createElement('div');
title.style.setProperty('display','inline-block');
title.style.setProperty('user-select','none');
title.innerHTML = '系统提示';
leftBar.appendChild(title);

controlBar.appendChild(leftBar);

var minMenu = document.createElement('div');
var maxMenu = document.createElement('div');
var closeMenu = document.createElement('div');

minMenu.style.setProperty('margin','0px 5px 0px 0px');
minMenu.style.setProperty('display','inline-block');
minMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-min"></use></svg>';

maxMenu.style.setProperty('margin','0px 5px 0px 0px');
maxMenu.style.setProperty('display','inline-block');
maxMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-max"></use></svg>';

closeMenu.style.setProperty('margin','0px 5px 0px 0px');
closeMenu.style.setProperty('display','inline-block');
closeMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-destroy"></use></svg>';

// rightBar.appendChild(minMenu);
// rightBar.appendChild(maxMenu);
rightBar.appendChild(closeMenu);

controlBar.appendChild(rightBar);

alert.appendChild(controlBar);

var content = document.createElement('div');
content.style.setProperty('margin','10px auto 10px 10px');
content.style.setProperty('font-size','14px');
content.style.setProperty('color','#039');
content.style.setProperty('height','50%');
content.innerHTML = '这里是消息内容';
alert.appendChild(content);

var bottom = document.createElement('div');
var btnOk = document.createElement('div');

bottom.style.setProperty('border-radius','0px 0px 5px 5px');
bottom.style.setProperty('height','21%');
bottom.style.setProperty('background-color','#f0f0f0');

btnOk.classList.add('asgc-button');
btnOk.style.setProperty('float','right');
btnOk.style.setProperty('margin-right','10px');
btnOk.innerHTML = '确定';

bottom.appendChild(btnOk);

alert.appendChild(bottom);

document.body.appendChild(alert);