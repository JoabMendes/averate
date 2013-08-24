



function pushScreenModulo(sreenID, averageValue){
	localStorage.setItem(sreenID, document.getElementById(averageValue).value);
	bb.pushScreen(sreenID+'.html', sreenID+'Screen');
}




