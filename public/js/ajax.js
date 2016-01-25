function getText(taskid){

	var id = 'collapse' + taskid;
	var texttofill = document.getElementById(id);
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "/getonetask?taskid=" + taskid, true);
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var text = JSON.parse(xhttp.responseText);
			console.log("READY at getText");
			texttofill.innerHTML = text.local.text;
		}
	};
		xhttp.send();
}

function deleteTask(taskid){

	var xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "/task?taskid=" + taskid, true);

	xhttp.onreadystatechange = function(){
		console.log(xhttp.readyState);
		if (xhttp.readyState == 4 && xhttp.status == "200") {
			id = 'panel' + taskid;
			document.getElementById(id).style.display = 'none';
		}
	};
		xhttp.send();
}
