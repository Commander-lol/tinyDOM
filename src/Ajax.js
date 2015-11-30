tinyDOM.ajax = function (options) {
    var req = new XMLHttpRequest(),
        _this = this,
        ev,
        i,
        params = {
            method: 'GET',
            url: '',
            async: true,
            user: null,
            password: null,
            responseType: 'text',
            data: null,
            headers: [],
            callbacks: {}
        },
        makeListener = function (callback) {
            return function (data) {
                callback(data.currentTarget.response, data);
            };
        };

    tinyDOM.json.merge(params, options);

    req.responseType = params.responseType;

    if (this.exists(params.callbacks)) {
        for (ev in params.callbacks) {
            if (params.callbacks.hasOwnProperty(ev)) {
                req.addEventListener(ev, makeListener(params.callbacks[ev]));
            }
        }
    }

    req.open(
        params.method,
        params.url,
        params.async,
        params.user,
        params.password
    );

    for (i = 0; i < params.headers.length; i++) {
        req.setRequestHeader(params.headers[i].header, params.headers[i].value);
    }

    req.send(params.data);
    return req;
};
