

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
                let packingList = await db.packingList.getGroupPackingListByTripId(trip_id);
                //take out packing list for shared items
                let shared_packing_list = null
                packingList.forEach((x,index)=>{
                    if(x.user_id === null){
                        shared_packing_list = packingList.splice(index,1);
                    }
                })
                let individualList = [];
                for(let i=0; i<packingList.length;i++){
                    let user = await db.users.getUserDetailsById(packingList[i].user_id);
                    let listItems = await db.packingList.getPackingListItemsByPackingListId(packingList[i].id);
                    let finalList = {};
                    let availableCategory = [...new Set(listItems.map(x => x.category))];
                    for(let i=0;i<availableCategory.length;i++){
                        finalList[availableCategory[i]] = listItems.filter(x=>x.category === availableCategory[i])
                    }
                    user["items"] = finalList;
                    individualList.push(user);
                }

                let sharedListItems = await db.packingList.getPackingListItemsByPackingListId(shared_packing_list[0].id,trip_details.group_id)
                response.send({
                    trip:trip_details,
                    list:individualList,
                    shared:sharedListItems
                })



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


    let deleteTrip = async function (request,response){
        try{
            let trip_id = request.body.trip_id;
            let deleteTrip = await db.trips.deleteTrip(trip_id);
            response.send(true);
        }catch (error){
            console.log("delete trip controller "+error)
        }
    }


    return {
        getAllTrips : getAllTrips,
        getSingleTrip : getSingleTrip,
        deleteTrip : deleteTrip
    }

};
