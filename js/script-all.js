



function pushScreenForm(minmedia, qtdnotas){
	var minmedia_value = document.getElementById(minmedia).value
	var qtdnotas_value = document.getElementById(qtdnotas).value
	if(minmedia_value > 0 && qtdnotas_value > 0 && qtdnotas_value < 9){
		localStorage.setItem('minmedia', minmedia_value);
		localStorage.setItem('qtdnotas', qtdnotas_value);
		bb.pushScreen('displayform.html', 'displayform');
	}else{
		if(qtdnotas_value > 8 && minmedia_value < 0){
			blackberry.ui.dialog.standardAskAsync("- Insira uma m&eacute;dia positiva <br/>- O limite m&aacute;ximo de notas &eacute; 8.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}else if(qtdnotas_value > 8){
			blackberry.ui.dialog.standardAskAsync("O limite m&aacute;ximo de notas &eacute; 8.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}else if(minmedia_value < 0){
			blackberry.ui.dialog.standardAskAsync("Insira uma m&eacute;dia positiva.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}else{
			blackberry.ui.dialog.standardAskAsync("Insira as informa&ccedil;&otilde;es por favor.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}
		
	}
	
}

/*
*	Fazer todas alterações de localstorage para adiconar ou retirar input
*	Mudar texto do label
*	icrementar local storage do ídice
*	chamar remove e colocar para o último indice
*	
*/

function editForm(action){
	if(action === '+'){
		$('a.add').trigger('click');
	}else{
		//onclick="$(this).parent().slideUp(function(){ $(this).remove();  this elemento do indice
		//ver http://www.andresvidal.com/labs/relcopy.html
	}
}


