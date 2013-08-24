



function pushScreenModulo(sreenID, averageValue){
	localStorage.setItem(sreenID, averageValue);
	bb.pushScreen(sreenID+'.html', sreenID+'Screen');
	
}




