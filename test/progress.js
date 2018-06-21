var border = document.createElement('div');
var content = document.createElement('div');
var progress = document.createElement('div');
var value = document.createElement('div');

content.appendChild(progress);
border.appendChild(content);
border.appendChild(value);

border.style.setProperty('width','40%');
border.style.setProperty('height','20px');
border.style.setProperty('left','30%');
border.style.setProperty('border','1px solid #3baced');
border.style.setProperty('box-shadow','rgb(0, 0, 0, 0.3) 1px 1px 24px');
border.style.setProperty('border-radius','0px');
border.style.setProperty('position','absolute');
border.style.setProperty('margin','auto');

content.style.setProperty('float','left');
content.style.setProperty('height','100%');
content.style.setProperty('width','100%');

progress.style.setProperty('height','100%');
progress.style.setProperty('width','0%');
progress.style.setProperty('background-color','red');

value.innerHTML = '0%';
value.style.setProperty('float','right');
value.style.setProperty('position','absolute');
value.style.setProperty('margin-left','5px');
value.style.setProperty('display','inline-block');

document.body.appendChild(border);

function setProgressValue(val){
	progress.style.setProperty('width',val + '%');
	value.innerHTML = val + '%';
}