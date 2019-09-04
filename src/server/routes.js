module.exports = (app, db) => {

    const pokemon = require('./controllers/pokemon')(db);
    const users = require('./controllers/users')(db);

    app.post('/signup',users.signUp)
};
