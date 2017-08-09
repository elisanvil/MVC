var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    http = require("http");
    server = http.createServer(app);
    mongoose = require('mongoose');
    path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());


//Import Models and Controllers
//var models = require('./models/facturas')(app,mongoose);
//var FacturaCtrl = require('./controllers/facturas');

var models = require('./models/recibos')(app,mongoose);
var RecibosCtrl = require('./controllers/recibos');


//Exmaple Route
var router = express.Router();
router.get('/', function(req, res) {  
   res.send("Hello World!");
});


// API routes
var facturas = express.Router();

var recibos = express.Router();
/*
facturas.get('/',(req,res) => {
  res.sendFile(__dirname + '/index.html')
  
});*/
//facturas.route('/')  
/*
facturas.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html')
  });

facturas.route('/agregar')
  .get( (req,res) => {
    res.sendFile(__dirname + '/agregar.html') 
  });
*/



app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


//Routes Recibos

recibos.get('/',ReciboCtrl.findAllRecibos);

recibos.get('/nueva-recibo', ReciboCtrl.create);

recibos.get('/edit-recibo/:id',ReciboCtrl.showEditRecibo);

recibos.route('/')  
  .get(ReciboCtrl.findAllRE);

recibos.route('/recibo/:id')  
  .get(ReciboCtrl.findAllRecibos)
  .post(ReciboCtrl.updateRecibo);

recibos.route('/recibos')  
  .get(ReciboCtrl.findAllRecibos)
  .post(ReciboCtrl.addRecibo);

recibos.route('/recibos/:id')  
  .get(ReciboCtrl.findById)
  .put(ReciboCtrl.updateRecibo)
  .delete(ReciboCtrl.deleteRecibo);

app.use('/api', recibos);


app.use(recibos);



//Routes Facturas
/*
facturas.get('/',FacturaCtrl.findAllFacturas);

facturas.get('/nueva-factura', FacturaCtrl.create);

facturas.get('/edit-factura/:id',FacturaCtrl.showEditFactura);

facturas.route('/')  
  .get(FacturaCtrl.findAllFacturas);

facturas.route('/factura/:id')  
  .get(FacturaCtrl.findAllFacturas)
  .post(FacturaCtrl.updateFactura);

facturas.route('/facturas')  
  .get(FacturaCtrl.findAllFacturas)
  .post(FacturaCtrl.addFactura);

facturas.route('/facturas/:id')  
  .get(FacturaCtrl.findById)
  .put(FacturaCtrl.updateFactura)
  .delete(FacturaCtrl.deleteFactura);

app.use('/api', facturas);


app.use(facturas);
*/

mongoose.connect('mongodb://localhost/facturas', function(error, respuesta) {
	if (error) {
		console.log('ERROR: connecting to Database ' +  error);
	}
  /*
	app.listen(8080, function() {
		console.log("Node server running on http://localhost:5602");
	});*/
});

app.listen(8080, function() {  
  console.log("Node server running on http://localhost:8080");
});



