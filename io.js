const fs = require('fs');
const path = require('path');
module.exports = (io)=>{
  var players = {};
  io.on('connection',socket=>{
    let writeStreamDataURL = fs.createWriteStream(path.join(__dirname + `/public/map_data_url_${socket.id}.png`));
    console.log('New Socket with ID: ',socket.id);
    socket.ip = socket.handshake.headers['x-forwarded-for'].split(',')[0];
    //console.log('Player IP: ',socket.ip);
    players[socket.id] = {};
    socket.on('disconnect',()=>{
      console.log(`User with id: ${socket.id} disconnected.`);
      delete players[socket.id];
      fs.unlink(path.join(__dirname + `/public/map_data_url_${socket.id}.png`),()=>{
        console.log(`deleted map_data_url_${socket.id}.png`);
      });
    })
    socket.on('image-data-url', function(data) {
      console.log(`User sent data with key: ${data.key}`);
      if(data.key != process.env.KEY) return;
      writeStreamDataURL.write(data.dataURL,err=>{
        if(err) console.log(err);
        else {
          console.log('DataURL stream write is complete ....');
          io.emit('image-data-url',{dataURL:data.dataURL,userid:socket.id});
        }
      });
    });  
  });
}