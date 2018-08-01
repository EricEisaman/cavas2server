window.socket = window.io();
window.socket.on('connected',()=>{
  console.log('My socket id is: ',window.socket.id);
});
var canvas = document.querySelector('canvas');
var ctx=canvas.getContext("2d");
window.socket.on('image-data-url',data=>{
  let d = document.createElement('div');
  d.innerHTML = `<h2>Sent from ${data.userid}</h2>`;
  d.classList = 'hoverborder';
  let image = new Image();
  image.src = data.dataURL;
  d.appendChild(image);
  let removeBtn = document.createElement('btn');
  removeBtn.innerHTML = 'remove';
  removeBtn.classList = 'button red small';
  removeBtn.addEventListener('click',e=>{
    d.parentNode.removeChild(d);
  });
  d.appendChild(removeBtn);
  document.body.appendChild(d);
});
function canvas2server(){
  let key = document.querySelector('#key').value;
  let dataURL = canvas.toDataURL();
  window.socket.emit('image-data-url',{dataURL:dataURL,key:key});
}