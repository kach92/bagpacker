/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
var format = require('pg-format');

module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let generateTempList = async function (tripInfo,gender,shared=false){

        try {
            let weather_id = parseInt(tripInfo.weather);
            let activity_ids = tripInfo.activities.map(x=>parseInt(x));
            let duration = tripInfo.duration
            let filterList = [];
            let leftOverList_uncommon = [];
            let leftOverList_weather = [];
            let leftOverList_activity = []
            let finalList = {};
            let availableCategory = null;

            let query = 'SELECT * FROM items';
            let queryResult = await dbPoolInstance.query(query);
            if(queryResult.rows.length>0){
                // filter out common items
                queryResult.rows.forEach(x=>{
                    x.weather_id === null && x.activity_id === null ? filterList.push(x) : leftOverList_uncommon.push(x);
                })

                //add items with same weather
                leftOverList_uncommon.forEach(x=>{
                    x.weather_id === weather_id ? filterList.push(x) : leftOverList_weather.push(x);
                })

                //add items with same activities
                leftOverList_weather.forEach(x=>{
                    activity_ids.includes(x.activity_id) ? filterList.push(x) : leftOverList_activity.push(x);
                })


                filterList = filterList.filter(x=>x.gender === null || x.gender === gender)

                //remove duplicates
                filterList = filterList.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj["name"]).indexOf(obj["name"]) === pos;
                });

                //for items with daily boolean true, multiply item quantity by duration
                filterList.forEach(x=>{
                    if(x.daily){
                        x.quantity *= parseInt(tripInfo.duration)
                    }

                })
                //if shared is true, filter out shared items
                if(shared){
                    filterList = filterList.filter(x=>x.shared === false)
                }
                //check available category and put into an array, then seperate all items according to category
                availableCategory = [...new Set(filterList.map(x => x.category))];
                for(let i=0;i<availableCategory.length;i++){
                    finalList[availableCategory[i]] = filterList.filter(x=>x.category === availableCategory[i])
                }
                return finalList
            }else{
                return Promise.reject(new Error("query all items returns null"));
            }

        }catch (error){
            console.log("generate temp list model " + error)
        }


    }

    let createPackingList = async function (trip_id,user_id,group_id = null) {
        try{

            let query = 'INSERT INTO packing_lists (user_id,trip_id,group_id) VALUES ($1,$2,$3) RETURNING *';
            let arr = [user_id,trip_id,group_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("CREATE PACKING LIST SUCCESS");
                return queryResult.rows[0].id
            }else{
                return Promise.reject(new Error("create packing list return null"));
            }
        } catch(error){
            console.log("create packing list " + error)
        }
    }

    let createPackingListItems = async function (packList,packing_list_id,shared=false) {

        try {
            let finalList = []
            for (var key in packList) {
                finalList.concat(packList[key]);
            }

            finalList = finalList.map(x=>[packing_list_id,x.name,x.quantity,x.category,shared])
            let query = format('INSERT INTO packing_list_items (packing_list_id,name,quantity,category,shared) VALUES %L RETURNING *',finalList);

            let queryResult = await dbPoolInstance.query(query);
            if(queryResult.rows.length>0){
                console.log("CREATE PACKING LIST ITEMS SUCCESS");
                return queryResult.rows;
            }else{
                return Promise.reject(new Error("create packing list items return null"));
            }

        } catch (error) {
            console.log ("create packing list items controller" + error);
        }
    }

    let generateSharedList = async function (tripInfo) {
        try {
            let weather_id = parseInt(tripInfo.weather);
            let activity_ids = tripInfo.activities.map(x=>parseInt(x));
            let duration = tripInfo.duration
            let filterList = [];
            let leftOverList_uncommon = [];
            let leftOverList_weather = [];
            let leftOverList_activity = []
            let finalList = {};
            let availableCategory = null;

            let query = 'SELECT * FROM items WHERE shared = true';
            let queryResult = await dbPoolInstance.query(query);
            if(queryResult.rows.length>0){
                // filter out common items
                queryResult.rows.forEach(x=>{
                    x.weather_id === null && x.activity_id === null ? filterList.push(x) : leftOverList_uncommon.push(x);
                })

                //add items with same weather
                leftOverList_uncommon.forEach(x=>{
                    x.weather_id === weather_id ? filterList.push(x) : leftOverList_weather.push(x);
                })

                //add items with same activities
                leftOverList_weather.forEach(x=>{
                    activity_ids.includes(x.activity_id) ? filterList.push(x) : leftOverList_activity.push(x);
                })


                filterList = filterList.filter(x=>x.gender === null || x.gender === gender)

                //remove duplicates
                filterList = filterList.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj["name"]).indexOf(obj["name"]) === pos;
                });

                filterList.forEach(x=>{
                    if(x.daily){
                        x.quantity *= parseInt(tripInfo.duration)
                    }

                })

                availableCategory = [...new Set(filterList.map(x => x.category))];
                for(let i=0;i<availableCategory.length;i++){
                    finalList[availableCategory[i]] = filterList.filter(x=>x.category === availableCategory[i])
                }
                return finalList
            }else{
                return Promise.reject(new Error("query all shared items returns null"));
            }

        } catch (error) {
            console.log("generate shared list model" + error)
        }
    }

    return {
        generateTempList,
        createPackingList,
        createPackingListItems,
        generateSharedList

    };
};
