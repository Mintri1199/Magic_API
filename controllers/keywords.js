const app = require('express')()

module.exports = app => {

    app.get('/', function(req, res) {
        console.log('Hello');
        res.send('Hello')
    })

}