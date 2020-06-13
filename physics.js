// This is the fun part.

// called on mouseup
function newballs() {

  // get the velocity defined by user
  const velocityx = mouseup.x - mousedown.x
  const velocityy = mouseup.y - mousedown.y

  // for the number of balls...
  for (let i = 0; i < numballs; ++i) {
    // create a new ball
    balls.push({
      idx: balls.length, // identify which ball (for use in flagging touches)
      radius: ballradius, // ball radius
      // mass determined by the area of the ball scaled by the density
      mass: ballradius * ballradius * Math.PI * balldensity,
      coloridx: ++colortally % palletlength, // get the color idx from the tally
      velocity: { x: velocityx, y: velocityy }, // assign the ball the defined velocity
      // randomize the position sligthly as to avoid overlaps
      position: {
        x: mousedown.x + Math.random(),
        y: mousedown.y + Math.random()
      }
    })
  }
}

// simple impulse calculation
// forcefully pushes balls apart
// simply swaps the momenta of each ball if they are touching
function simplecollision(a,b) {
  if (a.flag[b.idx]) return; // make sure a haven't interfaced with b yet
  a.flag[b.idx] = true; // flag b as having interfaced with a

  // get the distance vector
  const x = b.position.x - a.position.x;
  const y = b.position.y - a.position.y;
  const dist = Math.sqrt(x*x + y*y);

  // check if a and b are touching
  if (dist >= a.radius + b.radius) return;

  // calculate the padding to force the balls apart
  const pad = (a.radius + b.radius - dist) / 2 / dist;

  // force the balls apart
  a.position.x -= x * pad; a.position.y -= y * pad;
  b.position.x += x * pad; b.position.y += y * pad;

  // calculate the mass ratio between each ball
  const massratio = b.mass / a.mass

  // save momenta
  const atemp = a.velocity, btemp = b.velocity;

  // swap the momenta
  a.velocity = {
    x: btemp.x * massratio,
    y: btemp.y * massratio
  }
  b.velocity = {
    x: atemp.x / massratio,
    y: atemp.y / massratio
  }
}

// complex impulse calculation
// forcefully pushes balls apart
// swap the components of the momenta aligned with the distance vector between each ball
// There are some weird behaviors between very small balls and large ones
function complexcollision(a,b) {
  if (a.flag[b.idx]) return; // make sure a haven't interfaced with b yet
  a.flag[b.idx] = true; // flag b as having interfaced with a

  // get the distance vector
  const x = b.position.x - a.position.x;
  const y = b.position.y - a.position.y;
  const dist = Math.sqrt(x*x + y*y);

  // check if a and b are touching
  if (dist >= a.radius + b.radius) return;

  // calculate the padding to force the balls apart
  const pad = (a.radius + b.radius - dist) / 2 / dist;

  // force the balls apart
  a.position.x -= x * pad; a.position.y -= y * pad;
  b.position.x += x * pad; b.position.y += y * pad;

  // calculate the mass ratio between each ball
  const massratio = b.mass / a.mass

  // get the unitized version of the distance vector
  const ux = x / dist, uy = y / dist;

  // get the lengths of the velocity components aligned with the distance vector
  let adot = a.velocity.x * ux + a.velocity.y * uy;
  let bdot = b.velocity.x * ux + b.velocity.y * uy;

  // swap the components aligned with the distance vector
  a.velocity.x += ux * (bdot * massratio - adot);
  a.velocity.y += uy * (bdot * massratio - adot);
  b.velocity.x += ux * (adot / massratio - bdot);
  b.velocity.y += uy * (adot / massratio - bdot);
}
