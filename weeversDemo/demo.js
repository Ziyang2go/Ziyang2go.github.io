var api = claraplayer('clara-embed');

api.sceneIO.fetchAndUse('5ee9adcb-5b88-4263-8328-7f251f5ff630');
api.on('loaded', function(){
  ['orbit', 'pan', 'zoom', 'home', 'fullscreen'].forEach(function(tool){
    api.player.hideTool(tool);
  });
  canvasId = api.scene.find({name:'baseMap'});
  setInterval(function() {
    api.sceneGraph.touch(canvasId)
  }, 1000/15);
});

var canvas = new fabric.Canvas('sourceCanvas');
var background

document.getElementById('buttonInputText').addEventListener('click', function(e) {
  var text = document.getElementById('inputText').value;
  canvas.add(new fabric.Text(text, {
    left: 100,
    top: 100,
    fill: 'black',
  }));
});

document.getElementById('upload').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (ev) {
    var data = ev.target.result;                    
    fabric.Image.fromURL(data, function (img) {
      var oImg = img.set({left: 100, top: 100, angle: 00, width:200, height:200});
      canvas.add(oImg).renderAll();
    });
  };
  reader.readAsDataURL(file);
});

document.getElementById('buttonDownloadPDF').addEventListener('click', function(e){

  // only jpeg is supported by jsPDF
  var imgData = canvas.toDataURL("image/jpeg", 1.0);
  var pdf = new jsPDF({
    unit: 'px',
    format: [canvas.width,canvas.height]
  });
  pdf.addImage(imgData, 'JPEG', 0, 0,canvas.width, canvas.height);

  pdf.save("download.pdf");
});
