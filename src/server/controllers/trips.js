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





    return {
        getAllTrips : getAllTrips
    }

};
