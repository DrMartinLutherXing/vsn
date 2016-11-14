$(function() {
	getAPIKey(function(e) {
				console.log("JSON request fail:\n");
				console.log(e);
			},
		function() {
				console.log("JSON request done:\n");
				initWebcam('my_camera', 320, 240, 'jpeg', 90);
			});
	$('#snapshot').on('click', takeSnapshot);
	$('#analyze').on('click', analyzeSnapshot);
});
