const ex = require('express');
const path = require('path')
require('./server/db');

const app = ex();

app.set('port', process.env.PORT || 4000);

// middlewares 
app.use(ex.json());

//Static
app.use('/', ex.static(path.join(__dirname, 'client/public')));


//Routes
app.use('/api/note', require('./server/routes/note.route'));
app.use('/api/user', require('./server/routes/user.route'));

app.listen(app.get('port'),()=>{
    console.log("Escuchando en el puerto "+ app.get('port'));
});
