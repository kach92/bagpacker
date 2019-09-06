module.exports = (db) => {


    let nonUserList = async function (request, response) {

        try {
            let finalList = await db.packingList.generateTempList(request.body,request.body.gender);
            response.send(finalList)
        } catch (error) {
            console.log("non user list controller " +error)
        }

    };

    let nonUserListSave = async function (request,response){

        try {
            let user_id = parseInt(request.cookies["user_id"]);
            let tripInfo = requst.body.trip;
            let finalList = request.body.packing_list;

            let trip_id = await db.trips.createTrip(tripInfo,user_id);
            let destination_id = await db.trips.createDestination(tripInfo,trip_id);
            let packing_list_id = await db.packList.createPackingList(trip_id,user_id);
            let packing_list_items = await db.packList.createPackingListItems(finalList,packing_list_id);
            response.send(true);
        } catch (error){
            console.log("non user list save " + error)
        }

    }

    let userListSave = async function (request,response){
        try{
            let tripInfo = request.body;
            let user_id = parseInt(request.cookies["user_id"]);

            if (tripInfo.group.length > 0){
                console.log("PROCEED TO SAVING GROUP TRIP")
                //get all users id
                let user_ids_arr = await db.users.getUserIdsByEmails(tripInfo.group);
                //include user id into array of user ids
                user_ids_arr.push(user_id);
                //get obj of user id and gender
                let user_gender_arrObj = await db.users.getUserIdAndGender(user_ids_arr);
                //create group
                let group_id = await db.users.createGroup(tripInfo);
                //insert users into group
                let insertUsers = await db.users.insertUserIntoGroups(group_id,user_ids_arr);
                //create trip
                let trip_id = await db.trips.createTrip(tripInfo,null,group_id);
                //create destination
                let destination_id = await db.trips.createDestination(tripInfo,trip_id);
                //create packing list id for shared items
                let packing_list_shared_id = await db.packingList.createPackingList(trip_id,null,group_id);
                let finalList_shared = await db.packingList.generateSharedList(tripInfo)
                let packing_list_items_shared = await db.packingList.createPackingListItems(finalList_shared,packing_list_shared_id)
                //create packing list id for each user,generate list and save into packing list

                for(let i = 0; i< user_gender_arrObj.length ; i++) {
                    let finalList = await db.packingList.generateTempList(tripInfo,user_gender_arrObj[i].gender,true);
                    let packing_list_id = await db.packingList.createPackingList(trip_id,user_gender_arrObj[i].id,group_id);
                    let packing_list_items = await db.packingList.createPackingListItems(finalList,packing_list_id);
                }
                //send a true response to tell cliend side save ok, need to redirect to group/invidiaul trip page
                response.status(200).send(trip_id.toString());

            }else{
                let user_id = parseInt(request.cookies["user_id"]);
                console.log("PROCEED TO SAVING SOLO TRIP")
                let user_gender = await db.users.getUserGender(user_id);
                let trip_id = await db.trips.createTrip(tripInfo,user_id);
                let destination_id = await db.trips.createDestination(tripInfo,trip_id);
                let packing_list_id = await db.packingList.createPackingList(trip_id,user_id);
                let finalList = await db.packingList.generateTempList(tripInfo,user_gender);
                let packing_list_items = await db.packingList.createPackingListItems(finalList,packing_list_id);
                console.log(trip_id)

                response.status(200).send(trip_id.toString());

            }
        } catch (error){
            console.log("user list save" + error)
        }

    }

    let updateItemQuantity = async function(request,response){
        try{
            let item_id = parseInt(request.body.item_id);
            let quantity = parseInt(request.body.quantity);
            let getResponse = await db.packingList.updateItemQuantity(item_id,quantity);
            response.send(getResponse);
        }catch (error){
            console.log("update item quantity controller"+ error)
        }
    }

    let updateItemName = async function(request,response){
        try {
            let item_id = parseInt(request.body.item_id);
            let name = request.body.name;
            let getResponse = await db.packingList.updateItemName(item_id,name);
            response.send(getResponse);
        } catch (error) {
            console.log('update item name controller '+error)
        }
    }

    let updateItemPacked = async function(request,response){
        try {
            let item_id = parseInt(request.body.item_id);
            let packed = request.body.packed;
            let getResponse = await db.packingList.updateItemPacked(item_id,packed);
            response.send(getResponse);
        } catch (error) {
            console.log('update item packed controller '+error)
        }
    }

    return {
        nonUserList : nonUserList,
        nonUserListSave : nonUserListSave,
        userListSave : userListSave,
        updateItemQuantity : updateItemQuantity,
        updateItemName : updateItemName,
        updateItemPacked : updateItemPacked
    }

};
