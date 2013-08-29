



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


function pushScreenResult(){
	var qtdnotas = localStorage.getItem('indexQtdNotas');
	var i = 1;
	var allnotas = new Array();
	var allpesos = new Array();
	allnotas[0] = document.getElementById('nota').value;
	allpesos[0] = document.getElementById('peso').value;
	while(i < qtdnotas){
		allnotas[i] = document.getElementById('nota'+(i+1)).value;
		allpesos[i] = document.getElementById('peso'+(i+1)).value;
		i++;
	}

	if(isEmpty(allnotas) || isEmpty(allpesos)){
		//Criar algoritmo que completa tela com todos as notas calculo de média e situação
	}else{
		//Criar algoritmo que considera as notas faltando e o valor das notas necessárias 
		//calculo de média parcial e situação
		 
	}
	//bb.pushScreen('displayresul.html', 'displayresul');
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