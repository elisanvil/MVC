//File: controllers/tickets.js
var mongoose = require('mongoose');  
var Ticket  = mongoose.model('Ticket');

//GET - Return all tickets in the DB
exports.findAllTickets = function(req, res) {  
    Ticket.find(function(err, ticket) {
        if(err) res.send(500, err.message);
        else {
            return res.render('../views/index', {title: 'Lista de Tickets', ticket: ticket});
        }
        console.log('GET /tickets');
            res.status(200).jsonp(ticket);
    });
};

//GET - Return a ticket with specified ID
exports.findById = function(req, res) {  
    Ticket.findById(req.params.id, function(err, ticket) {
    if(err) return res.send(500, err.message);

    console.log('GET /ticket/' + req.params.id);
        res.status(200).jsonp(ticket);
    });
};

//POST - Insert a new ticket in the DB
exports.addTicket = function(req, res, next) {  
    console.log('POST');
    console.log(req.body);

    var ticket = new Ticket({
        fecha:     	req.body.fecha,
        origen:  	req.body.origen,
        destino:  	req.body.destino,
        precio:     	req.body.precio,
	adquiriente:    req.body.adquiriente,
        puesto:    	req.body.puesto,
        summary:  	req.body.summary
    });

    ticket.save(function(err, ticket) {
        if(err) return res.status(500).send( err.message);
        res.redirect('/');
        res.status(200).jsonp(ticket);
    });
};


exports.showEditTicket = function(req, res) {  
    Ticket.findById(req.params.id, function(err, ticket) {
        
        if(err) return res.status(500).send(err.message);
        else return res.render('../views/show', {title: 'Editar Ticket', act: '/ticket/'+req.params.id, ticket:ticket});
        res.status(200).jsonp(ticket);
        
    });
};

//PUT - Update a register already exists
exports.updateTicket = function(req, res, next) {  
    Ticket.findById(req.params.id, function(err, ticket) {
        fecha:     	req.body.fecha;
        origen:  	req.body.origen;
        destino:  	req.body.destino;
        precio:     	req.body.precio;
	adquiriente:    req.body.adquiriente;
        puesto:    	req.body.puesto;
        summary:  	req.body.summary;

        ticket.save(function(err) {
            if(err) return res.status(500).send(err.message);
            else res.render('../views/index', {title: 'Lista de Tickets', ticket: ticket});
            res.status(200).jsonp(ticket);

        });
    });
};

//DELETE - Delete a ticket with specified ID
exports.deleteTicket = function(req, res) {  
    Ticket.findById(req.params.id, function(err, ticket) {
        ticket.remove(function(err) {
            if(err) res.render('../views/index', {title: 'Lista de Tickets', ticket: ticket});
            else res.redirect('/')
                //res.status(200).send();
            
        })
    });
};

exports.create = function (req, res, next) {
    
  return res.render('../views/show', {title: 'Nuevo Ticket', act: '/tickets', ticket: {}})
}
