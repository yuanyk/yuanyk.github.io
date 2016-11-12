function hideshow(id){
	if (!document.getElementById) return;
	if (document.getElementById(id).style.display=="none"){
		document.getElementById(id).style.display="";
	} else {
		document.getElementById(id).style.display="none";
	}
	try{parent.window.hs.getExpander().reflow();}catch(err){}
}
function OSPselectAll(id) {
	var textBox = document.getElementById(id);
	if(textBox!=null) {
	    textBox.onfocus = function() {
			textBox.select();
			textBox.onmouseup = function() {
				textBox.onmouseup = null;
				return false;
			};
		}
	}
};
function OSPgetURLP(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

var fileref=document.createElement('script');
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.1.0/iframeResizer.contentWindow.min.js");

currentlyCompadreReflowing=0;

function compadreReflow(x) {
	if(x>=0) x=x; else x=0;
	if(x==0 && currentlyCompadreReflowing==1) return;
	currentlyCompadreReflowing=1;
	try{
		if(parent.window.hs.getExpander()) {
			OSPselectAll('E-code-i');
			OSPselectAll('E-code-j');
			OSPselectAll('E-code-k');
			parent.window.hs.getExpander().reflow();
			console.log('Compadre reflow success.')
			currentlyCompadreReflowing=0;
		} else {
			console.log('Compadre reflow '+x+' failed.')
			if(x==20) return;
			setTimeout(function(){ compadreReflow(++x); }, 100);
		}
	}
	catch(err){
		setTimeout(function(){ runPostMessage() }, 100);
	}
}

var PostMessageHeight2;

function runPostMessage() {
	PostMessageHeight = window.scrollHeight || document.documentElement.scrollHeight || document.body.scrollHeight;
	PostMessageWidth = window.scrollWidth || document.documentElement.scrollWidth || document.body.scrollWidth;
	if(PostMessageHeight>0 && PostMessageHeight2==PostMessageHeight) setTimeout(function(){ parent.window.postMessage([PostMessageWidth,PostMessageHeight], "*"); }, 300);
	else { PostMessageHeight2=PostMessageHeight; setTimeout(function(){ runPostMessage() }, 100); }
}

function runEJSSonload() {
	compadreReflow(0);
}

window.addEventListener("load",runEJSSonload());
