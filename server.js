require('dotenv').config({ silent: true });

var express = require('express'),
    app = express(),
    staticOptions = (process.env.NODE_ENV === 'production') ? { maxAge: 259200000 } : {};

app.use(express.static('./', staticOptions));
app.listen(3100, function() {
    console.log('Listening on port 3100');
});