/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let generateTempList = (tripInfo,callback)=>{

        let query = 'SELECT id FROM items WHERE activity_id = NULL OR activity_id IN $1 OR weather_id = NULL OR weather_id = $2 OR '
        let arr = [tripInfo.weather]

        dbPoolInstance.query(query,arr,(error,queryResult)=>{
            if (error) {
                console.log("GET WEATHER ID ERROR")
                callback(error, null);
            } else {


            }
        })

    }



    return {
        generateTempList,

    };
};
