'use strict';

/*!
 * clack: a node.js websocket server
 * Copyright(c) 2016 Suhail Gupta <suhailgupta03@gmail.com>
 * MIT Licensed
 */

var HttpClient = require("./HttpClient")
  , httpClient = new HttpClient("127.0.0.1",5984);

/**
 * Couche Pipe implementation
 *
 * @constructor
 * @param {String} address IP address running the CoucheDB
 * @param {Integer} port Port running CoucheDB
 * @api public
 */
var CouchePipe = function(address,port) {
    this.url = address;
    this.port = port;
    this.database = null;
}
 
/**
 * Set the address/ip running Couche Database
 * @param {String} address IP address of the server
 * return {Boolean|Object}
 */
CouchePipe.prototype.setAddress = function(address) {
    if("string" !== typeof address)
        return false;
    this.url = address;
    return this;
}

/**
 * Set the address/ip running Couche Database
 * @param {Integer} port Port on which the database is running
 * return {Boolean|Object}
 */
CouchePipe.prototype.setPort = function(port) {
    if("integer" !== typeof port)
        return false;
    this.port = port;
    return this;
}

/**
 * Selects the database, over which the subsequent queries will be performed
 * @param {String} database Name of the database to use
 * @return {Boolean|Object}
 */
CouchePipe.prototype.useDatabase = function(database) {
    if("string" !== typeof database)
        return false;
    this.database = database;
    return this;
}

/**
 * Creates a new database on the CoucheDB server
 * @param {String} newDatabase Database to create
 * @return {Boolean|Object}
 */
CouchePipe.prototype.createDatabase = function(newDatabase) {
    if("string" !== typeof newDatabase)
        return false;
    
}

/**
 * Get the document from the database
 * Sample CURL request curl -X GET http://localhost:5984/sukhanvar/5f5db394cc793d969c12fe8546000817
 * @param {String} documentID Generated document id
 */
CouchePipe.prototype.getDocument = function(documentID) {
    if("string" !== typeof documentID)
        return false;
    var path  = `/${this.database}/${documentID}`;
    httpClient.sendGet(path);
}


// -- HttpClient Events --

httpClient.on("downstream",function(chunk,response) {
    console.log(chunk);
});

httpClient.on("complete",function(response) {
    console.log("response complete");
});

// -- HttpClient Event Handling Ends --

//Exports
module.exports = CouchePipe;