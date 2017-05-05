var api = claraplayer('clara-embed');
var canvasId;
api.sceneIO.fetchAndUse('4a06a7a6-1c7a-4e01-babb-654ad53051f9');

api.on('loaded', function(){
  api.player.useCamera('fbb45c46-8a7c-44c8-b1e2-245e94f2e250');
  ['orbit', 'pan', 'zoom', 'home', 'fullscreen'].forEach(function(tool){
    api.player.hideTool(tool);
  });
  canvasId = api.scene.find({name:'baseMap'});
});

var canvas = new fabric.Canvas('sourceCanvas');

canvas.on({
  'touch:drag': function() {
    api.sceneGraph.touch(canvasId);
  },
  'mouse:move': function() {
    api.sceneGraph.touch(canvasId);
  },
});

document.getElementById('buttonInputText').addEventListener('click', function(e) {
  var text = document.getElementById('inputText').value;
  canvas.add(new fabric.Text(text, {
    left: 100,
    top: 100,
    fill: 'black',
  }));
  api.sceneGraph.touch(canvasId);
});

document.getElementById('upload').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var name = document.getElementById('filename');
  name.value = file.name;
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

//responsive resize canvas object
canvas.setHeight($(window).height()/1.2);
canvas.setWidth($(window).width()/2.5);
canvas.renderAll();

$(window).resize(function(){
  canvas.setHeight($(window).height()/1.2);
  canvas.setWidth($(window).width()/2.5);
  canvas.renderAll();
})

function clearCanvas() {
  var imageName = document.getElementById('filename');
  var textName = document.getElementById('inputText');
  imageName.value = '';
  textName.value = '';
  canvas.clear();
}
