



function pushScreenForm(minmedia, qtdnotas){
	var minmedia_value = document.getElementById(minmedia).value;
	var qtdnotas_value = document.getElementById(qtdnotas).value;
	if(minmedia_value > 0 && qtdnotas_value > 1 && qtdnotas_value < 9){
		localStorage.setItem('minmedia', minmedia_value);
		localStorage.setItem('qtdnotas', qtdnotas_value);
		bb.pushScreen('displayform.html', 'displayform');
	}else{
		if(minmedia_value === '' || qtdnotas_value === '' ){
			blackberry.ui.dialog.standardAskAsync("Insira todas as informa&ccedil;&otilde;es por favor.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}else if(qtdnotas_value > 8 && minmedia_value <= 0){
			blackberry.ui.dialog.standardAskAsync("- Insira uma m&eacute;dia positiva <br/>- O limite m&aacute;ximo de notas &eacute; 8.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}else if(qtdnotas_value > 8){
			blackberry.ui.dialog.standardAskAsync("O limite m&aacute;ximo de notas &eacute; 8.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}else if(qtdnotas_value < 2){
			blackberry.ui.dialog.standardAskAsync("O limite m&iacute;nimo de notas &eacute; 2.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}else if(minmedia_value <= 0){
			blackberry.ui.dialog.standardAskAsync("Insira uma m&eacute;dia positiva.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
		}
		
	}
	
}



function editForm(action){

	if(action === '+' && parseInt(localStorage.getItem('indexQtdNotas')) < 9){
		$('a.add').trigger('click');
		localStorage.setItem('indexQtdNotas', parseInt(localStorage.getItem('indexQtdNotas'))+1);
		localStorage.setItem('qtdnotas', localStorage.getItem('indexQtdNotas'));
		document.getElementById('label-nota'+parseInt(localStorage.getItem('indexQtdNotas'))).innerHTML = "Nota "+parseInt(localStorage.getItem('indexQtdNotas'));

	}else if(action === '-' && parseInt(localStorage.getItem('indexQtdNotas')) > 2){
		var idrmv = '#rownota'+localStorage.getItem('indexQtdNotas')+' a';
		$(idrmv).trigger('click');
		localStorage.setItem('indexQtdNotas', parseInt(localStorage.getItem('indexQtdNotas'))-1);
		localStorage.setItem('qtdnotas', localStorage.getItem('indexQtdNotas'));
	}

	if(action === '+' && parseInt(localStorage.getItem('indexQtdNotas')) == 8){
		blackberry.ui.dialog.standardAskAsync("O limite m&aacute;ximo de notas &eacute; 8.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
	}
	if(action === '-' && parseInt(localStorage.getItem('indexQtdNotas')) == 2){
		blackberry.ui.dialog.standardAskAsync("O limite m&iacute;nimo de notas &eacute; 2.", blackberry.ui.dialog.D_OK, null, {title : "Aten&ccedil;&atilde;o"});
	}
}


function isEmpty(array){
	var i = 0;
	while(i < array.length){
		if(array[i] === ""){
			return true;
		}
		i++;
	}
	return false;
}

function mediaPonderadaCompleta(allnotas, allpesos){
	var soma_mult = 0;
	var soma_peso = 0;
	var media = 0;
	var i = 0;
	while(i < allnotas.length){
		soma_mult += allnotas[i] * allpesos[i];
		soma_peso += allpesos[i];
		i++;
	}
	return media = soma_mult / soma_peso;
}

function mediaAritmeticaCompleta(allnotas){
	var soma = 0;
	var media = 0;
	var i = 0;
	while(i < allnotas.length){
		soma += allnotas[i];
		i++;
	}
	return media = soma/ allnotas.length;
}

function situacaoCompleta(mediaPonderada, mediaAritmetica){
	var minmedia = parseFloat(localStorage.getItem('minmedia'));
	if(mediaPonderada >= minmedia || mediaAritmetica >= minmedia){
		return 'true';
	}else{
		return 'false';
	}
}

function normalCalc(allnotas, allpesos){
	//storage setadas fazer calculo e print no index
	localStorage.setItem('allnotas', allnotas);
	localStorage.setItem('allpesos', allpesos);

	var mediaPonderada = mediaPonderadaCompleta(allnotas, allpesos).toFixed(1);
	var mediaAritmetica = mediaAritmeticaCompleta(allnotas).toFixed(1);
	localStorage.setItem('mediaPonderadaCompleta', mediaPonderada);
	localStorage.setItem('mediaAritmeticaCompleta', mediaAritmetica);
	localStorage.setItem('situacao', situacaoCompleta(mediaPonderada, mediaAritmetica));
	bb.pushScreen('displayresul.html', 'displaycompleteresul');
}




function pushScreenResult(){
	var qtdnotas = localStorage.getItem('indexQtdNotas');
	var i = 1;
	var allnotas = new Array();
	var allpesos = new Array();
	allnotas[0] = parseFloat(document.getElementById('nota').value.replace(',','.'));
	allpesos[0] = parseFloat(document.getElementById('peso').value.replace(',','.'));
	while(i < qtdnotas){
		allnotas[i] = parseFloat(document.getElementById('nota'+(i+1)).value.replace(',','.'));
		allpesos[i] = parseFloat(document.getElementById('peso'+(i+1)).value.replace(',','.'));
		i++;
	}

	if(isEmpty(allnotas) || isEmpty(allpesos)){
		//Criar algoritmo que considera as notas faltando e o valor das notas necessárias 
		//calculo de média parcial e situação
		
	}else{
		normalCalc(allnotas, allpesos);
		//Criar algoritmo que completa tela com todos as notas calculo de média e situação
	}
	//bb.pushScreen('displayresul.html', 'displayresulnormal');
}



