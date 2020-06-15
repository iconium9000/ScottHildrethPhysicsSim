[GitHub Project Repository](github.com/iconium9000/ScottHildrethPhysicsSim.git)

Originally Written by John J FitzGerald III for Scott Hildreth.

To use, simply open OPENME.html in any browser (tested in Chrome, Firefox and Safari). Click and drag to launch balls!

This project was designed to display basic ballistic physics.
There are two collision modes; simple and complex.
- Simple swap of the momenta balls which come into contact with each other. This mode allows for some fun experiments and interesting behaviors.
- Complex takes into account the locations of each ball in a collision and only swaps the velocities which are aligned with the distance vector between the colliding balls.

I employed a simple, chunk-based system which massively improves algorithmic complexity. Each ball only checks for collisions with balls in its immediate vicinity corresponding to the radius of the largest ball on screen. This still has O(n<sup>2</sup>) complexity in the worst case, but that worst case only occurs when many balls occupy the same chunks. You can see this chunk system work in action by enabling "Show Chunks", but this tends to add a performance penalty.

Have fun!
