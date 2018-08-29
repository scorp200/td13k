var GameStorage = (function() {

    /**
     * @param {string} key
     * @param {string} value
     * @return {void}
     */
    function set(key, value) {
        window.localStorage.setItem(key, value);
    }

    /**
     * @param {string} key
     * @param {string} defaultValue
     * @return {string}
     */
    function get(key, defaultValue) {
        return window.localStorage.getItem(key) || defaultValue;
    }

    // Export.
    return {
        set: set,
        get: get
    }

})();
