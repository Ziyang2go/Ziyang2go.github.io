var jobId = null;

function exportClara() {
	var xhttp = new XMLHttpRequest();
	var sceneId = document.getElementById('sceneId').value;
	var type = document.getElementById('type').value || 'clara';
	var username = document.getElementById('username').value;
	var accessToken = document.getElementById('accessToken').value;
	var url = 'https://clara.io/api/scenes/' + sceneId + '/export/' + type;
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	jobId = xhttp.responseText.substr(23,36);
    	//enable download
			var download = document.getElementById('download');
			download.href = 'https://clara.io/api/jobs/' + jobId + '/result';
			download.click();
    }
	};
	xhttp.open("GET", url, true);
	xhttp.setRequestHeader('accept', 'text/event-stream');
	xhttp.setRequestHeader('authorization', 'Basic ' + btoa(username + ':'+ accessToken));
	xhttp.addEventListener("progress", updateProgress);
	xhttp.send();
}

function updateProgress(e, xhr) {
	console.log('report process....');
}
