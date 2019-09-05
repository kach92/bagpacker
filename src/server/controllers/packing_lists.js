module.exports = (db) => {


    let nonUserList = (request, response) => {
        db.packingList.generateTempList(request.body,(error,result)=>{
            if(error){
                console.log("ERROR GENERATING TEMP LIST")
                console.log(error)
            }else{
                if(result){
                    console.log("GENERATE TEMP LIST SUCCESS")
                    response.send(result)
                }else{
                    console.log("UNABLE TO GENERATE TEMP LIST")
                }
            }

        })

    };

    let nonUserListSave = (request,response)=>{
        let trip = requst.body.trip;
        let packList = request.body.packing_list;
        let trip_id = null;
        let packing_list_id = null;

        db.trips.createTrip(trip,(error,result)=>{
            if(result){
                trip_id = result.id;

                db.trips.createDestination(trip,trip_id,(error,result)=>{
                    if(result){

                        db.packList.createPackingList(trip_id,(error,result)=>{
                            if(result){
                                packing_list_id = result.id;

                                db.packList.createPackingListItems(packingList,packing_list_id,(error,result)=>{

                                    if(result){
                                        response.send(true);
                                    }
                                })

                            }
                        })
                    }

                })
            }
        })
    }

    return {
        nonUserList : nonUserList,
        nonUserListSave : nonUserListSave
    }

};
