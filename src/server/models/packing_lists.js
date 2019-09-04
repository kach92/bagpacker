/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let generateTempList = (tripInfo,callback)=>{

        let weather_id = tripInfo.weather_id
        let activity_ids = tripInfo.activity_ids
        let gender = tripInfo.gender
        let flipGender = gender === "M"? "F":"M";
        let duration = tripInfo.duration
        let finalList = {};
        let availableCategory = null;

        let query = 'SELECT * FROM items';

        dbPoolInstance.query(query,(error,queryResult)=>{
            if (error) {
                console.log("SELECT ALL ITEMS FAIL")
                callback(error, null);
            } else {
                if(queryResult.rows.length>0){
                    //filter by weather_id and activity_ids
                    finalList = queryResult.rows.filter(x=>x.weather_id === null || x.weather_id === weather_id || x.activity_id === null || activity_ids.includes(x.activity_id))
                    //filter out opposite gender
                    finalList = finalList.filter(x=>x.gender !== flipGender);
                    availableCategory = [...new Set(finalList.map(x => x.category))];
                    for(let i=0;i<availableCategory.length;i++){
                        finalList[availableCategory[i]] = finalList.filter(x=>x.category === availableCategory[i])
                    }

                    callback(null,finalList)

                }else{
                    console.log("SELECT ALL ITEMS NOTHING")
                    callback(null, null);
                }

            }
        })

    }



    return {
        generateTempList,

    };
};
