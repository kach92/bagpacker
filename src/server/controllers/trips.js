module.exports = (db) => {


    let getAllTrips = async function (request, response) {

        try {
            let user_id = parseInt(request.cookies["user_id"]);
            let group_ids = await db.users.getUserGroups(user_id);
            let trip = await db.trips.getTripsOfUser(user_id,group_ids);
            for(let i = 0; i < trip.length ; i++){
                let destinations = await db.trips.getDestinationsByTrip(trip[i].id);
                trip[i]["destinations"] = destinations;
            }

            let result = {solo:[],group:[]};
            trip.forEach(x=>{
                if(x.group_id){
                    result.group.push(x)
                }else{
                    result.solo.push(x)
                }
            })

            response.send(result);

        } catch (error) {
            console.log("non user list controller " +error)
        }

    };

    let getSingleTrip = async function (request, response) {
        try{
            let trip_id = request.params.id;
            let trip_details = await db.trips.getTripById(trip_id);
            let destination_details = await db.trips.getDestinationsByTrip(trip_id);
            trip_details["destinations"] = destination_details;
            if(trip_details.group_id){
                console.log("GET GROUP TRIP");
                let packing_list_ids = await db.packingList.getGroupPackingListIdsByTripId(trip_id);
            } else{
                console.log("GET SOLO TRIP");
                let packing_list_id = await db.packingList.getPackingListIdByTripId(trip_id);
                let packing_list_items = await db.packingList.getItemsByPackingListId(packing_list_id);
                let finalList = {};
                let availableCategory = [...new Set(packing_list_items.map(x => x.category))];
                for(let i=0;i<availableCategory.length;i++){
                    finalList[availableCategory[i]] = packing_list_items.filter(x=>x.category === availableCategory[i])
                }
                let result = {
                    trip:trip_details,
                    list:finalList
                }
                response.send(result)

            }
        } catch (error){
            console.log("get single trip controller " + error)
        }
    }





    return {
        getAllTrips : getAllTrips,
        getSingleTrip : getSingleTrip
    }

};
