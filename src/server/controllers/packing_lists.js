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
        let packList = request.body.packing_list
    }

    return {
        nonUserList : nonUserList,
        nonUserListSave : nonUserListSave
    }

};
