define( [
	"../core",
	"../selector",
	"../effects"
], function( jQuery ) {

"use strict";

jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery._TIME_rs, function( fn ) {
		return elem === fn.elem;
	} ).length;
};

} );
