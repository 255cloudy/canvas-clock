const canvas = document.querySelector("#game");
const ctx = canvas.getContext('2d');
function draw(){
    
    ctx.clearRect(0, 0, 500, 500);
const circle = {
    x: 250,
    y: 250,
    r: 200,
    startAngle: 0,
    stopAngle: 2*Math.PI
}

// draw the circle 
ctx.save();
ctx.strokeStyle = '#4287f5';
ctx.lineWidth = 4;
ctx.beginPath();
ctx.arc(circle.x, circle.y, circle.r, circle.startAngle,circle.stopAngle);
ctx.stroke();
ctx.restore();

// draw the minute ticks 
ctx.save();
const minutTick = {
    width: 20,
    height: 4,
    get x() {return circle.x+155},
    get y() {return circle.y-(this.height/2)}
   
};

const armsLengths = {
    minute: 135,
    second: 155,
    hour: 100,
}
ctx.fillStyle = 'red'
const radians = Math.PI/180
ctx.save()
// ctx.fillRect(minutTick.x, minutTick.y, minutTick.width, minutTick.height);
ctx.translate(circle.x, circle.y)
// ctx.fillRect(155, minutTick.height/2, minutTick.width, minutTick.height);
for(let i = 0; i<60; i++) {
    ctx.fillRect(armsLengths.minute+25, -(minutTick.height/2), minutTick.width, minutTick.height);
    ctx.rotate(6*radians)
}
ctx.restore()

// draw hour ticks
ctx.fillStyle = 'black'
ctx.save();
const hrTick = {
    width: 40,
    height: 8,
    get x() {return circle.x+155},
    get y() {return circle.y-(this.height/2)}
   
};

ctx.translate(circle.x, circle.y);
for (let index = 0; index < 12; index++) {
    ctx.fillRect(armsLengths.minute+15, -(hrTick.height/2), hrTick.width, hrTick.height)
    ctx.rotate(30*radians)
}
ctx.restore()

const now = new Date(Date.now())
const hour = now.getHours()
const minutes = now.getMinutes()
const sec = now.getSeconds()
//minute readout
ctx.save()
ctx.strokeStyle = 'red'
const minRead = minutes*360/60*radians
ctx.translate(circle.x, circle.y)
ctx.rotate(minRead)
ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(armsLengths.minute, 0)
ctx.lineWidth = minutTick.height
ctx.stroke()
ctx.restore()

//hour readout
const hrRead = hour*360/12*radians
ctx.save()
ctx.strokeStyle = 'black'
ctx.translate(circle.x, circle.y)
ctx.rotate(hrRead)
ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(armsLengths.hour, 0)
ctx.lineWidth = hrTick.height
ctx.stroke()
ctx.restore()

// second readout
const secRead = sec*360/60*radians
ctx.save()
ctx.strokeStyle = 'blue'
ctx.translate(circle.x, circle.y)
ctx.rotate(secRead)
ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(armsLengths.second, 0)
ctx.lineWidth = minutTick.height/4
ctx.stroke()
ctx.restore()

// draw center ball
ctx.save()
ctx.fillStyle = 'blue'
ctx.beginPath()
ctx.arc(circle.x, circle.y, 10, circle.startAngle,circle.stopAngle);
ctx.fill();
ctx.restore()

canvas.style.transform= 'rotate(-90deg)'

window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)