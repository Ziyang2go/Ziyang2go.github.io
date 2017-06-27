
var api = claraplayer('player');
api.sceneIO.fetchAndUse('292b9d5c-1082-464f-b26d-da4e61a12517').then(function() {
	//api.player.displayThumbnail('Form1');
  document.getElementById('upload').onchange = onInputFileChanged;
  document.getElementById('previous').onclick = importPreviousImage;
});

function onInputFileChanged(ev) {
  var file = ev.target.files[0];
  api.assets.importImage(file, 1024).then(handleImport).catch(handleError);
}

function handleImport(attrs) {
  api.scene.set({name: 'Physical', plug: 'Material', property: 'baseMap'}, attrs.imageNodeId);
};

function handleError(err) {
  console.log('Import image error: ', err);
}

function importPreviousImage(ev) {
  api.assets.importImage('b358f029-316a-4b95-8043-b3431f5ae3cd').then(handleImport).catch(handleError);
}
