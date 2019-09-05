module.exports = (app, db) => {

    const users = require('./controllers/users')(db);
    const packingLists = require('./controllers/packing_lists')(db);
    const trips = require('./controllers/trips')(db);

    app.post('/signup', users.signUp);
    app.post('/login', users.login);
    app.post('/non_user_list', packingLists.nonUserList);
    app.post('/list/save', packingLists.nonUserListSave);
    app.post('/trips', packingLists.userListSave);
    app.get('/signout',users.signOut);
    app.get('/trips',trips.getAllTrips);
};
