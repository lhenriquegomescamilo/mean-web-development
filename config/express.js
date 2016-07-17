var express = require('express'),
    morgan = require('morgan').
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');


module.exports = function(){
  var app = express();
  if(process.env.NODE_ENV === 'deploymonent'){
    app.use(morgan('dev'));
  }else if(process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended : true
  }));

  app.use(bodyParser.json());
  require('../app/routes/index.server.routes.js')(app);
  return app;
};


/*
module.exports = function(){
  var app = express();
  require('../app/routes/index.server.routes.js')(app);
  return app;
};
*/
