module.exports = (app, db) => {

    const users = require('./controllers/users')(db);
    const packingLists = require('./controllers/packing_lists')(db);

    app.post('/signup',users.signUp);
    app.post('/login',users.login);
    app.post('/non_user_list',packingLists.nonUserList);
};
