// clear all balls from the map
function clearballs() {
  maxradius = 0; // reset the max ball radius
  balls = []; // clear all balls from the map
}

// reset the velocity/momentum of all balls
function clearmomentum() {
  for (const i in balls) balls[i].velocity = {x:0,y:0}; // zero each velocity
}

// Pallet Dropdown Detector
function palletdropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Pallet Select Function
function selectpallet(newpalletname) {
  const palletdropdown = document.getElementById('palletdropdown');
  palletname = newpalletname; // set the global pallet name
  palletdropdown.innerHTML = "Color Pallet: " + newpalletname;
}

// Close the pallet dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (event.target.matches('.dropbtn')) return;
  const dropdowns = document.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    const openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

// toggle collision button listener
function togglecollision() {
  const button = document.getElementById('collisionbutton');
  collisiontoggle = !collisiontoggle; // toggle the collision state
  button.innerHTML = (collisiontoggle ? "Simple" : "Complex") + " Collisions";
}

// show grid toggle button listener
function toggleshowgrid() {
  const button = document.getElementById('showgridbutton');
  showgridtoggle = !showgridtoggle; // toggle the show grid state
  button.innerHTML = (showgridtoggle ? "Hide" : "Show") + " Grid";
}

$(content).mousedown(e => mousedown = getmouse(e));
$(content).mousemove(e => mouseup = getmouse(e));
$(content).mouseup(e => {
  mouseup = getmouse(e);
  newballs();
  mousedown = mouseup = null;
});
