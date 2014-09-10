## express-route-controller2

This is a helper function to assign controller actions to routes
in [express](http://expressjs.com/) based on [express-route-controller](https://github.com/arnorhs/express-route-controller).

It provides just a structure on top of a normal express app, but also
doesn't get in the way at all, and you can continue to use express normally and
define even more routes manually if you wish.
It's focused to help in the creation of APIs.

### Usage:

In your express project install express-route-controller2:

```
npm install express-route-controller2
```

Now create a folder where you want all your controllers, eg. `controllers`, and add a file in there,
named `mycontroller.js`. Then define it somehow, like so:

```javascript
module.exports = {
    create: function(req, res) {
    },
    update: function(req, res) {
    },
    read: function(req, res) {
    },
    delete: function(req, res) {
    },
    validate: function(req, res, next) {
    }
};
```

In your main app.js file (or wherever you set up express routes normally) simply call the helper
function (very sparse demo express app):

```javascript
var express = require('express');
var app = express();
var erc2 = require('express-route-controller2');

// set up express route control:
erc2(app, {
  controllers: __dirname + '/controllers',
  routes: {
    "/grades": "mycontroller#read", // method: get
    "/notices/:id": { 
      "get": "mycontroller#read",
      "delete": "mycontroller#delete",
      "put": {
        "middleware": "mycontroller#validate", // this could be an array eg: ["mc#1", "mc#2"]
        "handler": "mycontroller#update"
      }
    }
  }
});

app.listen(3000);
```

You can make this even more easier, by defining your routes in a `routes.json` file, like so:
```json
{
  "/grades": "mycontroller#read", 
  "/notices/:id": { 
    "get": "mycontroller#read",
    "delete": "mycontroller#delete",
    "put": {
      "middleware": "mycontroller#validate",
      "handler": "mycontroller#update"
    }
  }
}
```

And loading the routes is as simple as:

```javascript
...

erc2(app, {
    controllers: __dirname + '/controllers',
    routes: require('routes.json')
});

...
```

### Feedback

Pull requests, feature ideas and bug reports are welcome

### License

MIT
