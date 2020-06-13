define( [
	"../core",
	"../queue",
	"../effects" // Delay is optional because of this dependency
], function( jQuery ) {

"use strict";

// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( _TIME_, type ) {
	_TIME_ = jQuery.fx ? jQuery.fx.speeds[ _TIME_ ] || _TIME_ : _TIME_;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var _TIME_out = window.setTimeout( next, _TIME_ );
		hooks.stop = function() {
			window.clearTimeout( _TIME_out );
		};
	} );
};

return jQuery.fn.delay;
} );
