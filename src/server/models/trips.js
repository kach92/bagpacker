/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
var format = require('pg-format');

module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let createTrip = async function (tripInfo,user_id,group_id = null){
        try{
            let query = null;
            let arr = null;
            if(group_id){
                query = 'INSERT INTO trips (name,group_id) VALUES ($1,$2) RETURNING *';
                arr = [`Trip to ${tripInfo.location}`,group_id];
            }else{
                query = 'INSERT INTO trips (name,user_id) VALUES ($1,$2) RETURNING *';
                arr = [`Trip to ${tripInfo.location}`,user_id];
            }
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
            let query = 'INSERT INTO destinations (name,start_date,end_date,duration,trip_id,image) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *'
            let arr = [tripInfo.location,tripInfo.startDate,tripInfo.endDate,tripInfo.duration,trip_id,tripInfo.image];

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


    let getTripsOfUser = async function(user_id,group_ids){
        try{
            let query = null
            console.log("iohnheowifhowehfhouwe")
            console.log(group_ids)
            if (group_ids.length <1){
                console.log("test")
                query = format('SELECT * FROM trips WHERE user_id = %L',user_id);
            }else{
                console.log("test")
                group_ids = [group_ids]
                query = format('SELECT * FROM trips WHERE user_id = %L OR group_id IN %L',user_id,group_ids);
            }

            let queryResult = await dbPoolInstance.query(query);
            if (queryResult.rows.length > 0) {
                console.log("GET TRIPS OF USERS SUCCESS")
                return queryResult.rows;
            } else {
                console.log("NO TRIPS BY USER")
                return [];
            }
        } catch (error) {
            console.log("get trips of users "+ error);
        }
    }

    let getDestinationsByTrip = async function (trip_id){
        try {
            let query = 'SELECT * FROM destinations WHERE id = $1'
            let arr = [trip_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("GET TRIPS OF USERS SUCCESS")
                return queryResult.rows;
            } else {
                return [];
            }
        } catch (error) {
            console.log('get destinations by trip' + error)
        }
    }

    let getTripById = async function (trip_id){
        try {
            let query = 'SELECT * FROM trips WHERE id = $1'
            let arr = [trip_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("GET TRIP BY ID SUCCESS")
                return queryResult.rows[0];
            } else {
                return Promise.reject(new Error("no trip exists"));
            }

        } catch (error) {
            console.log('get trip by id '+ error)
        }
    }

    let deleteTrip = async function (trip_id) {
        try {
            let query = 'DELETE FROM trips WHERE id = $1 RETURNING *'
            let arr = [trip_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("DELETE TRIP SUCCESS")
                return queryResult.rows[0];
            } else {
                return Promise.reject(new Error("trip delete returns null"));
            }
        }catch (error){
            console.log('delete trip model '+error)
        }
    }

    return {
        createTrip,
        createDestination,
        getTripsOfUser,
        getDestinationsByTrip,
        getTripById,
        deleteTrip


    };
};
