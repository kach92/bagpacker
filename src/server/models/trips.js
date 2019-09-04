/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let createTrip = (tripInfo,callback)=>{
        let user_id = request.cookies["user_id"]

        let query = 'INSERT INTO trips (name,user_id) VALUES ($1,$2) RETURNING *'
        let arr = [`Trip to ${tripInfo.destination}`,user_id]

        dbPoolInstance.query(query,arr,(error,queryResult)=>{
            if (error) {
                console.log("ERROR CREATING TRIP")
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    console.log("CREATE TRIP SUCCESS")
                    callback(null, queryResult.rows[0]);
                } else {
                    console.log("CREATE TRIP RETURN NULL")
                    callback(null, null);
                }
            }
        })

    }

    let createDestination = (tripInfo,trip_id,callback)=>{
        let query = 'INSERT INTO destinations (name,start_date,end_date,duration,trip_id) VALUES ($1,$2,$3,$4,$5) RETURNING *'
        let arr = [tripInfo.destination,tripInfo.start_date,tripInfo.end_date,tripInfo.duration,trip_id];

        dbPoolInstance.query(query,arr,(error,queryResult)=>{
            if (error) {
                console.log("ERROR CREATING DESTINATION")
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    console.log("CREATE DESTINATION SUCCESS")
                    callback(null, queryResult.rows[0]);
                } else {
                    console.log("CREATE DESTINATION RETURNS NULL")
                    callback(null, null);
                }
            }
        })

    }




    return {
        createTrip,
        createDestination

    };
};
