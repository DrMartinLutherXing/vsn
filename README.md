# Vision API Demonstration
### *with webcam.js*
---

## Description
A basic implementation of [Google's Vision API](https://cloud.google.com/vision/) in conjunction with webcam.

## Steps
	1. Snap a cool picture of yourself with the button "Take Snapshot". Your snapshot will appear next to your webcam's preview.
	2. Now you can analyze this snapshot with google's api by pressing the button "Analyze Snapshot". The response data will appear next to your snapshot.
	3. Review your results.
It's that easy!

## Setup
You will need an API Key to run the api request. This key will need to be placed in a file `keys.js` within the js directory.
The `keys.js` file should be of the form:  
`{
"key": "API KEY"
}`  
You'll have to get this "API KEY" from me (I generated a couple, but didn't want to leave them sitting in git).

## Support
Should work with multiple faces. The Vision API responds with much more data including facial bounding boxes, facial landmarks (left eye, right eye, chin, etc) and many others.  
There is also support for brand Label Detection and a few other things.

