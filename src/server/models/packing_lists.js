/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let generateTempList = (tripInfo,callback)=>{

        let weather_id = parseInt(tripInfo.weather);
        let activity_ids = tripInfo.activities.map(x=>parseInt(x));
        let gender = tripInfo.gender
        let duration = tripInfo.duration
        let filterList = null;
        let finalList = {};
        let availableCategory = null;

        let query = 'SELECT * FROM items';

        dbPoolInstance.query(query,(error,queryResult)=>{
            if (error) {
                console.log("SELECT ALL ITEMS FAIL")
                callback(error, null);
            } else {

                if(queryResult.rows.length>0){
                    console.log("////////////////////////////////")
                    console.log(weather_id)
                    console.log(activity_ids)
                    console.log("////////////////////////////////")
                    //filter out common items
                    filterList = queryResult.rows.filter(x=>x.weather_id === null && x.activity_id === null)
                    //add items with same weather
                    filterList = filterList.concat(queryResult.rows.filter(x=>x.weather_id === weather_id))
                    //add items with same activities
                    filterList = filterList.concat(queryResult.rows.filter(x=>activity_ids.includes(x.activity_id)))
                    filterList = filterList.filter(x=>x.gender === null || x.gender === gender)

                    //remove duplicates
                    filterList = filterList.filter((obj, pos, arr) => {
                        return arr.map(mapObj => mapObj["name"]).indexOf(obj["name"]) === pos;
                    });
                    availableCategory = [...new Set(filterList.map(x => x.category))];
                    for(let i=0;i<availableCategory.length;i++){
                        finalList[availableCategory[i]] = filterList.filter(x=>x.category === availableCategory[i])
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
