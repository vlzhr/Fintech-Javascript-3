function throttle(time, callback) {

	let isPaused = false;

	function manager() {
	    if (!(isPaused)) {

	   		callback.apply(this, arguments);
	    	isPaused = true;

		    setTimeout(function() {
			    isPaused = false;
		    }, time);

		}
	}
	return manager;
}


module.exports = { throttle };
