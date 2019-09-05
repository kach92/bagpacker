/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let createTrip = async function (tripInfo){
        try{
            let user_id = request.cookies["user_id"];
            let query = 'INSERT INTO trips (name,user_id) VALUES ($1,$2) RETURNING *';
            let arr = [`Trip to ${tripInfo.destination}`,user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("CREATE TRIP SUCCESS")
                return queryResult.rows[0].id;
            } else {
                return Promise.reject(new Error("create trip return null"));
            }
        } catch (error) {
            console.log("create trip "+ error);
        }

    }

    let createDestination = async function (tripInfo,trip_id){
        try{
            let query = 'INSERT INTO destinations (name,start_date,end_date,duration,trip_id) VALUES ($1,$2,$3,$4,$5) RETURNING *'
            let arr = [tripInfo.destination,tripInfo.start_date,tripInfo.end_date,tripInfo.duration,trip_id];

            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("CREATE DESTINATION SUCCESS")
                return queryResult.rows[0].id;
            } else {
                return Promise.reject(new Error("create destination return null"));
            }
        } catch (error){
            console.log("create destination" + error)
        }

    }




    return {
        createTrip,
        createDestination

    };
};
