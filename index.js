const {log} = console

let collisiontoggle = true

const colors = ["#AA0A00","#D52D12","#EB8B25","#F4B900","#0B0B0B","#E7A17E"];
let colortally = 0;
let balls = [];
let numballs = 1, ballsize = 5, balldensity = 5;
const pi2 = 2 * Math.PI;
const maxsize = 20;

let time = (new Date()).getTime()

function clearBalls() {
  balls = [];
}

function clearMomentum() {
  for (const i in balls) balls[i].velocity = {x:0,y:0};
}

function togglecollision() {
  const button = document.getElementById('collisionbutton');
  collisiontoggle = !collisiontoggle;
  button.innerHTML = (collisiontoggle ? "Simple" : "Complex") + " Collisions";
}

function simplecollision(a,b) {
  const x = b.position.x - a.position.x;
  const y = b.position.y - a.position.y;
  const dist = Math.sqrt(x*x + y*y);

  if (dist >= a.radius + b.radius) return;

  const atemp = a.velocity, btemp = b.velocity;

  const pad = (a.radius + b.radius - dist) / 2 / dist;

  a.position.x -= x * pad;
  a.position.y -= y * pad;
  b.position.x += x * pad;
  b.position.y += y * pad;

  a.velocity = {
    x: btemp.x / a.mass * b.mass,
    y: btemp.y / a.mass * b.mass
  }
  b.velocity = {
    x: atemp.x / b.mass * a.mass,
    y: atemp.y / b.mass * a.mass
  }
}

function complexcollision(a,b) {
  // log('complexcollision')
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // CanvasRenderingContext2D
const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');

let mousedown = null, mouseup = null;
const getmouse = e => { return {x:e.offsetX,y:e.offsetY}; };
$(content).mousedown(e => mousedown = getmouse(e));
$(content).mousemove(e => mouseup = getmouse(e));

$(content).mouseup(e => {
  mouseup = getmouse(e);
  const velocity = {
    x: mouseup.x - mousedown.x,
    y: mouseup.y - mousedown.y
  };

  log(mouseup.x,mouseup.y);

  for (let i = 0; i < numballs; ++i) {
    balls.push({
      radius: ballsize,
      mass: ballsize * ballsize * Math.PI * balldensity,
      color: colors[++colortally % colors.length],
      velocity: {
        x: velocity.x,
        y: velocity.y
      },
      position: {
        x: mousedown.x + Math.random(),
        y: mousedown.y + Math.random()
      }
    })
  }

  mousedown = mouseup = null;
});

tick();
function tick() {

  const temptime = (new Date()).getTime();
  const deltaT = (temptime - time) * 1e-3;
  time = temptime;

  const {innerWidth,innerHeight} = window;
  const {offsetWidth,offsetHeight} = sidebar;
  let width = innerWidth - offsetWidth - 40;
  let height = innerHeight - offsetHeight - 40;
  if (innerWidth - offsetWidth < 40) width = innerWidth - 40;
  else height = innerHeight - 20;
  canvas.width = width;
  canvas.height = height;

  numballs = parseInt(document.getElementById('numballslider').value);
  const numballsHTML = document.getElementById('numballs');
  numballsHTML.innerHTML = `Number of Balls: ${numballs}`;

  ballsize = parseInt(document.getElementById('ballsizeslider').value);
  const ballsizeHTML = document.getElementById('ballsize');
  ballsizeHTML.innerHTML = `Ball Radius: ${ballsize}`;

  balldensity = parseInt(document.getElementById('balldensityslider').value);
  const balldensityHTML = document.getElementById('balldensity');
  balldensityHTML.innerHTML = `Ball Density: ${balldensity}`;

  window.requestAnimationFrame(tick);

  const grid = {};
  for (const i in balls) {
    const ball = balls[i];
    ball.positions = [];
    ball.velocities = [];

    const x = Math.round(ball.position.x / maxsize);
    const y = Math.round(ball.position.y / maxsize);

    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        const gridid = `${x+i},${y+j}`;
        let chunk = grid[gridid];
        // if (chunk) log(chunk)
        if (!chunk) grid[gridid] = chunk = [];
        else if (collisiontoggle) {
          for (const i in chunk) simplecollision(ball,chunk[i]);
        }
        else for (const i in chunk) complexcollision(ball,chunk[i]);
        chunk.push(ball);
      }
    }
  }

  for (const i in balls) {
    const ball = balls[i];
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.position.x,ball.position.y,ball.radius,0,pi2);
    ctx.closePath();
    ctx.fill();

    ball.position.x += ball.velocity.x * deltaT;
    ball.position.y += ball.velocity.y * deltaT;

    if (ball.position.x < ball.radius && ball.velocity.x < 0) {
      ball.position.x = ball.radius;
      ball.velocity.x = -ball.velocity.x;
    }
    if (ball.position.y < ball.radius && ball.velocity.y < 0) {
      ball.position.y = ball.radius;
      ball.velocity.y = -ball.velocity.y;
    }
    if (ball.position.x > width - ball.radius && ball.velocity.x > 0) {
      ball.position.x = width - ball.radius;
      ball.velocity.x = -ball.velocity.x;
    }
    if (ball.position.y > height - ball.radius && ball.velocity.y > 0) {
      ball.position.y = height - ball.radius;
      ball.velocity.y = -ball.velocity.y;
    }
  }

  if (mousedown && mouseup) {
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(mousedown.x,mousedown.y)
    ctx.lineTo(mouseup.x,mouseup.y)
    ctx.closePath()
    ctx.stroke()
  }



}
