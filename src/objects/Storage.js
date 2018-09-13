var GameStorage = (function() {

	/**
	 * @param {string} key
	 * @param {string} value
	 * @return {void}
	 */
	function set(key, value) {
		try {
			window.localStorage.setItem(key, value);
		} catch(e) {
			console.warn(e);
		}
	}

	/**
	 * @param {string} key
	 * @param {string} defaultValue
	 * @return {string}
	 */
	function get(key, defaultValue) {
		try {
			return window.localStorage.getItem(key) || defaultValue;
		} catch(e) {
			console.warn(e);
			return defaultValue;
		}
	}

	// Export.
	return {
		set: set,
		get: get
	}

})();
