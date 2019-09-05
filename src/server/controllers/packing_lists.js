module.exports = (db) => {


    let nonUserList = async function (request, response) {

        try {
            let finalList = await db.packingList.generateTempList(request.body);
            response.send(finalList)
        } catch (error) {
            console.log("non user list controller " +error)
        }

    };

    let nonUserListSave = async function (request,response){

        try {
            let trip = requst.body.trip;
            let packList = request.body.packing_list;

            let trip_id = await db.trips.createTrip(trip);
            console.log(trip_id);

            let destination_id = await db.trips.createDestination(trip,trip_id);
            let packing_list_id = await db.packList.createPackingList(trip_id);
            let packing_list_items = await db.packList.createPackingListItems(packingList,packing_list_id);
            response.send(true);
        } catch (error){
            console.log("non user list save " + error)
        }

    }

    let userListSave = async function (request,response){
        try{
            let trip = requst.body.trip;
            let packList = request.body.packing_list;
            let user_id = request.cookies["user_id"];
            let trip_id = null;
            let packing_list_id = null;

            if (trip.group === []){
                console.log("PROCEED TO SAVING GROUP TRIP")
            }else{
                console.log("PROCEED TO SAVING SOLO TRIP")

                let user_gender = await db.users.getUserGender(user_id);


            }
        } catch (error){
            console.log("user list save" + error)
        }

    }

    return {
        nonUserList : nonUserList,
        nonUserListSave : nonUserListSave,
        userListSave : userListSave
    }

};
