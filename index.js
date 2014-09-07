var ctrlr = require('ctrlr');

module.exports = function(expressApp, config) {
    if (typeof config.routes !== 'object') {
        throw new Error('config.routes must be set to a valid route object map');
    }

    if (typeof config.controllers !== 'string') {
        throw new Error('config.controllers must be set to a valid directory path');
    }

    var controllers = ctrlr(config.controllers);

    for (var route in config.routes) {
        var meta = config.routes[route];

        if (typeof meta === 'string') { 
            expressApp.get(route, controllers(meta));
            continue;
        }

        for (var method in meta) { 
            if (meta.hasOwnProperty(method)) {  
                if (typeof meta[method] === 'string') 
                    expressApp[method](route, controllers(meta[method]));
                else {
                    if (meta[method].middleware instanceof Array)
                        for (var i = 0; i < meta[method].middleware.length; i++)
                            meta[method].middleware[i] = controllers(meta[method].middleware[i]);
                    else 
                        meta[method].middleware = controllers(meta[method].middleware);
                
                    expressApp[method](route, meta[method].middleware, controllers(meta[method].handler));
                }
            }
        }
    }
};


