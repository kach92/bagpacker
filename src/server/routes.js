
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
    app.get('/get_all_trips',trips.getAllTrips);
    app.get('/get_trip/:id',trips.getSingleTrip);
    app.post('/update_item_quantity',packingLists.updateItemQuantity);
    app.post('/update_item_quantity',packingLists.updateItemQuantity);
    app.post('/update_item_name',packingLists.updateItemName);
    app.post('/update_item_packed',packingLists.updateItemPacked);
    app.post('/update_shared_item',packingLists.updateSharedItem);
    app.post('/add_custom_item',packingLists.addCustomItem);
    app.post('/delete_item',packingLists.deleteItem);
    app.post('/delete_trip',trips.deleteTrip);
    app.post('/edit_profile_general',users.editProfileGeneral);
    app.post('/edit_profile_password',users.editProfilePassword);
    app.post('/change_profile_pic',users.changeProfilePic);
    app.get('/get_user_info',users.getUserInfo);
    app.post('/add_new_category',packingLists.addNewCategory);
    app.post('/change_category_name',packingLists.changeCategoryName);
    app.post('/delete_category',packingLists.deleteCategory);
    app.post('/edit_trip_name',trips.editTripName);
    app.post('/private_item',packingLists.privateItem);
};
