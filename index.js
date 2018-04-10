var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('port', process.env.PORT || 3000);

require('./app/routes/blog.route')(app);

app.listen(app.get('port'),function(){
    console.log('App running on port ',app.get('port'));
});