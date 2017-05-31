
var api = claraplayer('player');
api.sceneIO.fetchAndUse('8807d330-a80a-431a-a65e-9b6a55cf6c06').then(function() {
  api.commands.runCommand('vrmode');
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
