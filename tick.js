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

  numballs = parseInt(document.getElementById('numballsslider').value);
  const numballsHTML = document.getElementById('numballs');
  numballsHTML.innerHTML = `Number of Balls: ${numballs}`;

  ballradius = parseInt(document.getElementById('ballradiusslider').value);
  const ballradiusHTML = document.getElementById('ballradius');
  ballradiusHTML.innerHTML = `Ball Radius: ${ballradius}`;
  if (maxradius < ballradius) maxradius = ballradius;

  balldensity = parseInt(document.getElementById('balldensityslider').value);
  const balldensityHTML = document.getElementById('balldensity');
  balldensityHTML.innerHTML = `Ball Density: ${balldensity}`;

  window.requestAnimationFrame(tick);

  const collision = collisiontoggle ? simplecollision : complexcollision;

  const grid = {};
  for (const i in balls) {
    const ball = balls[i];
    ball.flag = {};

    const x = Math.round(ball.position.x / maxradius);
    const y = Math.round(ball.position.y / maxradius);

    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        const gridid = `${x+i},${y+j}`;
        let chunk = grid[gridid];
        if (!chunk) grid[gridid] = chunk = [];
        else for (const i in chunk) collision(ball,chunk[i]);
        chunk.push(ball);
      }
    }
  }

  if (showgridtoggle) {
    ctx.fillStyle = "#505050"
    for (const i in grid) {
      let [x,y] = i.split(",")
      x = parseInt(x) * maxradius;
      y = parseInt(y) * maxradius;
      ctx.beginPath();
      ctx.rect(x-maxradius/2,y-maxradius/2,maxradius,maxradius);
      ctx.closePath();
      ctx.fill();
    }
  }

  const pallet = pallets[palletname];
  for (const i in balls) {
    const ball = balls[i];

    ball.position.x += ball.velocity.x * deltaT;
    ball.position.y += ball.velocity.y * deltaT;

    if (ball.position.x < ball.radius && ball.velocity.x < 0) {
      ball.position.x = ball.radius + Math.random();
      ball.velocity.x = -ball.velocity.x;
    }
    if (ball.position.y < ball.radius && ball.velocity.y < 0) {
      ball.position.y = ball.radius + Math.random();
      ball.velocity.y = -ball.velocity.y;
    }
    if (ball.position.x > width - ball.radius && ball.velocity.x > 0) {
      ball.position.x = width - ball.radius - Math.random();
      ball.velocity.x = -ball.velocity.x;
    }
    if (ball.position.y > height - ball.radius && ball.velocity.y > 0) {
      ball.position.y = height - ball.radius - Math.random();
      ball.velocity.y = -ball.velocity.y;
    }

    ctx.fillStyle = pallet[ball.coloridx];
    ctx.beginPath();
    ctx.arc(ball.position.x,ball.position.y,ball.radius,0,pi2);
    ctx.closePath();
    ctx.fill();
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
