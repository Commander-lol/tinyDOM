tinyDOM.json = {
    /**
     * Gets the keyset of an object
     * @param   {Object} json The object whose keys are to be
     *                      retrieved
     * @returns {Array}  An array of Strings corresponding to
     *                   the properties of an object
     */
    keys: function(json) {
        var kys = [],
            indx;
        for(indx in json){
            if(json.hasOwnProperty(indx)){
                kys.push(indx);
            }
        }
        return kys;
    },
    /**
     * Determines if the parameter represents a valid json object
     * @param   {String}  obj The string to be checked regarding its
     *                      validity as a JSON object
     * @returns {Boolean} Whether or not obj represents a valid json
     *                    object
     */
    is: function (obj) {
        try {
            JSON.parse(obj);
            return obj !== null && typeof obj !== "undefined";
        } catch (e) {
            return false;
        }
    },
    /**
     * Takes two objects and adds the properties of the second to the
     * first, with those of the second taking presedence in cases where
     * both objects intersect
     * @param   {Object} json1 The first object to combine
     * @param   {Object} json2 The second object to combine
     * @returns {Object} If json1 is undefined, returns json2. Otherwise returns
     *                   json1. In cases where json2 is undefined, json1 will be
     *                   unchanged, otherwise json1 will contain all the properties
     *                   of json2.
     */
    merge: function (json1, json2) {
		if (!this.exists(json1)) {
            return json2;
        } else if (!this.exists(json2)) {
			return json1;
		} else {
            var prop;
			for (prop in json2) {
				if (json2.hasOwnProperty(prop)) {
					json1[prop] = json2[prop];
				}
			}
			return json1;
		}
	}
};
