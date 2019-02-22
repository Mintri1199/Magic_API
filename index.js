const express = require('express')
const app = express()


// Using controllers
require('./controllers/keywords')(app)

const port = process.env.PORT || 3000
app.listen( port, function(){
    console.log('listening on port ' + port);
    
})

module.exports = app 