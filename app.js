const ex = require('express');
const path = require('path')
require("./src/server/db");

const app = ex();

app.set('port', process.env.PORT || 4000);

// middlewares 
app.use(ex.json());

//Static
app.use('/', ex.static(path.join(__dirname, 'src/client/public')));


//Routes
app.use('/api/model', require('./src/server/routes/route'));

app.listen(app.get('port'),()=>{
    console.log("Escuchando en el puerto "+ app.get('port'));
});
