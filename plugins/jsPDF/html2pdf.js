function printPDF() {
console.log('entro');
	var doc = new jsPDF();
	var elementHandler = {
		'#oi' : function(element, renderer) {
			return true;
		}
	};

	var source = window.document.getElementsByTagName("body")[0];

	doc.fromHTML($('#table').get(0), 10, 10, {
		'width' : 180
	});	

	doc.output("dataurlnewwindow")	
}

var Show = {
	getFromPDF : function() {
		$('#btn-pdf').click(function() {
			printPDF();
		});
	}
}

$(function() {
	Show.getFromPDF();
});
