



function pushScreenForm(minmedia, qtdnotas){
	var minmedia_value = document.getElementById(minmedia).value
	var qtdnotas_value = document.getElementById(qtdnotas).value
	if(minmedia_value && qtdnotas_value){
		localStorage.setItem('minmedia', minmedia_value);
		localStorage.setItem('qtdnotas', qtdnotas_value);
		bb.pushScreen('displayform.html', 'displayform');
	}else{
		blackberry.ui.dialog.standardAskAsync("Insira as informa&ccedil;&otilde;es por favor", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
	}
	
}




