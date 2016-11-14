var metrics = [
	"detectionConfidence", "joyLikelihood", "sorrowLikelihood",
	"angerLikelihood", "surpriseLikelihood", "headwearLikelihood"
];

var getAPIKey = function(eb, cb) {
	$.getJSON("js/keys.js", function(keys) {
			APIKEY = keys["key"];
			console.log("API KEY variable set succesfully!");
		}).done(cb).fail(eb);
};

var visionAPIRequest = function(eb, cb, imgdata) {
	var data = data || {}, body = [];
	if (window.APIKEY == undefined || !("image" in imgdata)) return;
	if (!("features" in imgdata))
		imgdata.features = [{ "type": "FACE_DETECTION" }];
	body.push(imgdata)
	$.ajax({
			method: "POST",
			contentType: "application/json",
			url: "https://vision.googleapis.com/v1/images:annotate?key="+APIKEY,
			data: JSON.stringify({ "requests": body })
		}).done(cb).fail(eb);
};

var toDataUrl = function(url, cb) {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.onload = function() {
		var reader = new FileReader();
		reader.onloadend = function() {
			//passed the untrimmed base64 encoded image
			cb(reader.result);
		};
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.send();
};

var initWebcam = function(id, w, h, f, q) {
	Webcam.set({
			width: w,
			height: h,
			image_format: 'jpeg',
			jpeg_quality: q
		});
	Webcam.attach('#' + id)
};

var takeSnapshot = function() {
	Webcam.snap(function(uri) {
			var contents = '<h2>Your Snapshot</h2>' +
				'<img id="snapped" src="' + uri + '"/>';
			console.log("Snapshot taken succesfully!:\n");
			$('#results').html(contents);
		});
};

var analyzeSnapshot = function() {
	var uri = $('#snapped').attr('src').slice(23);
	console.log("Analyse image uri:\n");
	visionAPIRequest(function(e) {
			console.log("Vision API Request fail:\n" + e);
		}, handleResponse, { "image": { "content": uri } });
};

var handleResponse = function(response) {
	var resp, fAs;
	console.log("Vision API Request done:\n" + JSON.stringify(response));
	if (response.responses.length > 0) {
		fAs = response.responses.slice();
		resp = JSON.stringify(handleFaceAnnotations(fAs))
			.replace(/,/g, ',\n');
	} else
		resp = "Sorry no responses";
	$('#analysis').html(resp);
};

var handleFaceAnnotations = function(rsps) {
	var parsedForMetrics = [];
	console.log("Handling faceAnnotations array:\n" + JSON.stringify(rsps));
	rsps.forEach(function(rsp) {
			var fA, fAs;
			if ("faceAnnotations" in rsp)
				rsp.faceAnnotations.forEach(function(fA) {
						for (var metric in fA)
							if (metrics.indexOf(metric) == -1)
								delete fA[metric];
						parsedForMetrics.push(fA);
					});
		});
	return parsedForMetrics;
};
