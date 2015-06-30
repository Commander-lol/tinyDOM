tinyDOM.json = {
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
    is: function (obj) {
        try {
            JSON.parse(obj);
            return obj !== null && typeof obj !== "undefined";
        } catch (e) {
            return false;
        }
    },
    merge: function (json1, json2) {
		if (!this.exists(json1) || !this.exists(json2)) {
			return null;
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
