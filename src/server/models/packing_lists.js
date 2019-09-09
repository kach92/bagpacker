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

    let createPackingListItems = async function (packList,packing_list_id,shared,group_id=null,category_obj) {

        try {
            let finalList = [];
            for (var key in packList) {
                finalList = finalList.concat(packList[key]);
            }
            if(shared){
                finalList = finalList.map(x=>[packing_list_id,x.name,x.quantity,category_obj.id,shared,group_id]);
            }else{
                finalList = finalList.map(x=>{
                    x.category = category_obj[x.category]
                    return [packing_list_id,x.name,x.quantity,x.category,shared,group_id]
                });
            }



            let query = format('INSERT INTO packing_list_items (packing_list_id,name,quantity,category_id,shared,group_id) VALUES %L RETURNING *',finalList);

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


    let getPackingListIdByTripId = async function (trip_id) {
        try {
            let query = 'SELECT * FROM packing_lists WHERE trip_id = $1';
            let arr = [trip_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("GET PACKING LIST BY TRIP ID SUCCESS")
                return queryResult.rows[0].id;
            } else {
                return Promise.reject(new Error("packing list returns null"));
            }
        } catch (error) {
            console.log("get packing list by trip id " + error)
        }
    }

    let getItemsByPackingListId = async function (packing_list_id){
        try {
            let query = `
            SELECT packing_list_items.*,categories.name AS category
            FROM packing_list_items
            INNER JOIN packing_list_categories
            ON (packing_list_items.category_id = packing_list_categories.id)
            INNER JOIN categories
            ON (packing_list_categories.category_id = categories.id)
            WHERE packing_list_items.packing_list_id = $1`;
            let arr = [packing_list_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("GET ITEMS BY PACKING LIST ID SUCCESS")
                return queryResult.rows;
            } else {
                return [];
            }
        } catch (error) {
            console.log("get items by packing list id model "+error)
        }
    }

    let getGroupPackingListByTripId = async function (trip_id) {
        try{
            let query = 'SELECT * FROM packing_lists WHERE trip_id = $1';
            let arr = [trip_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("GET GROUP PACKING LIST IDS BY TRIP ID SUCCESS");

                return queryResult.rows;
            } else {
                return Promise.reject(new Error("group packing list returns null"));
            }
        } catch (error) {
            console.log("get group pacling list ids by trip id" + error)
        }
    }

    let getPackingListItemsByPackingListId = async function (packing_list_id,group_id = null){
        try{
            let query = null;
            let arr = null;
            if(group_id){
                query = 'SELECT * FROM packing_list_items WHERE group_id = $1 AND shared = true'
                arr = [group_id];
            }else{
                query = 'SELECT * FROM packing_list_items WHERE packing_list_id = $1'
                arr = [packing_list_id];
            }

            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                console.log("GET PACKINGN LIST ITEMS PACKING LIST ID SUCCESS");
                return queryResult.rows;
            } else {
                console.log("GET PACKING LIST ITEMS BY PACKINIG LIST ID RETURNS NULL")
                return [];
            }


        } catch (error) {
            console.log("get packing list items by packing list id" + error)
        }
    }

    let updateItemQuantity = async function (item_id,quantity){
        try{
            let query = 'UPDATE packing_list_items SET quantity = $1 WHERE id = $2 RETURNING *'
            let arr = [quantity,item_id]
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("UPDATE ITEM QUANTITY SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("update item quantity return null"));
            }
        }catch (error){
            console.log("update item quantity model "+error)

        }
    }

    let updateItemName = async function (item_id,name){
        try{
            let query = 'UPDATE packing_list_items SET name = $1 WHERE id = $2 RETURNING *'
            let arr = [name,item_id]
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("UPDATE ITEM name SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("update item name return null"));
            }
        }catch (error){
            console.log("update item name model "+error)

        }
    }

    let updateItemPacked = async function (item_id,packed){
        try{
            let query = 'UPDATE packing_list_items SET packed = $1 WHERE id = $2 RETURNING *'
            let arr = [packed,item_id]
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("UPDATE ITEM PACKED SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("update item packed return null"));
            }
        }catch (error){
            console.log("update item packed model "+error)

        }
    }

    let getUserPackingListIdByUserIdAndTripId = async function (user_id,trip_id){
        try {
            let query = 'SELECT * FROM packing_lists WHERE user_id = $1 AND trip_id = $2'
            let arr = [user_id,trip_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("GET USER PACKING LIST ID BY USER ID AND TRIP ID SUCCESS");
                return queryResult.rows[0].id;
            }else{
                return Promise.reject(new Error("get user packing list id by user id and trip id returns null"));
            }
        } catch (error) {
            console.log("get user packing list id by user id and trip id "+ error)
        }
    }

    let updateSharedItemId = async function (item_id,new_plist_id){
        try{
            let query = 'UPDATE packing_list_items SET packing_list_id = $1 WHERE id = $2 RETURNING *'
            let arr = [new_plist_id,item_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("UPDATE SHARED ITEM ID SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("update shared item id returns null"));
            }
        }catch (error){
            console.log("update shared item id "+null)
        }
    }


    let getPackingListDetailsByUserIdAndTripId = async function (user_id,trip_id){
        try{
            let query = null;
            let arr = null;
            if(user_id){
                query = 'SELECT * FROM packing_lists WHERE user_id = $1 AND trip_id = $2';
                arr = [user_id,trip_id];
            }else{
                query = 'SELECT * FROM packing_lists WHERE user_id IS NULL AND trip_id = $1';
                arr = [trip_id];
            }
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("GET PACKING LIST DETAILS BY USER ID AND TRIP ID SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("get packing list details by user id and trip id returns null"));
            }

        }catch (error){
            console.log("get packing list details by user id and trip id model "+ error)
        }
    }

    let addCustomItem = async function(packing_list_id,group_id,item_name,quantity,shared,category_id){

        try{
            let query = 'INSERT INTO packing_list_items (packing_list_id,group_id,name,quantity,shared,category_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
            let arr = [packing_list_id,group_id,item_name,quantity,shared,category_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("ADD CUSTOM ITEM SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("ADD CUSTOM ITEM RETURN NULL"));
            }
        }catch (error){
            console.log("add custom item model "+ error)
        }
    }

    let deleteItem = async function(item_id){
        try{
            let query = 'DELETE FROM packing_list_items WHERE id = $1 RETURNING *';
            let arr = [item_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("DELETE ITEM SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("delete item return null"));
            }
        }catch (error){
            console.log("delete item model "+ error)
        }
    }

    let generatePackingListCategories = async function(packing_list_id,shared){
        try{
            if(shared){
                let query = "SELECT * FROM categories WHERE name = 'Shared'";
                let category_id = await dbPoolInstance.query(query);
                let query2 = "INSERT INTO packing_list_categories (packing_list_id,category_id) VALUES ($1,$2) RETURNING *"
                let arr = [packing_list_id,category_id.rows[0].id];
                let queryResult = await dbPoolInstance.query(query2,arr);
                if(queryResult.rows.length>0){
                    console.log("generate shared packing list categories success".toUpperCase());
                    return queryResult.rows[0];
                }else{
                    return Promise.reject(new Error("generate shared packing list categories returns null"));
                }
            }else{
                let query = "SELECT * FROM categories WHERE NOT name = 'Shared'";
                let categoryArrObj = await dbPoolInstance.query(query);

                let arrOfarr = [];
                categoryArrObj.rows.forEach(x=>{
                    arrOfarr.push([packing_list_id,x.id])
                })

                let query2 = format('INSERT INTO packing_list_categories (packing_list_id,category_id) VALUES %L RETURNING *',arrOfarr);
                let queryResult = await dbPoolInstance.query(query2);

                let query3 = 'SELECT packing_list_categories.id, categories.name FROM packing_list_categories INNER JOIN categories ON (packing_list_categories.category_id = categories.id) WHERE packing_list_categories.packing_list_id = $1';
                let arr = [packing_list_id];
                let queryResult2 = await dbPoolInstance.query(query3,arr);
                if(queryResult2.rows.length>0){
                    console.log("generate packing list categories success".toUpperCase());
                    return queryResult2.rows;
                }else{
                    return Promise.reject(new Error("generate packing list categories returns null"));
                }

            }

        } catch (error){
            console.log("generate packing list categories model "+error)
        }
    }

    let getAvailableCategory = async function(packing_list_id){
        try{
            let query = `
                SELECT categories.name
                FROM packing_list_categories
                INNER JOIN categories
                ON(packing_list_categories.category_id = categories.id)
                WHERE packing_list_categories.packing_list_id = $1
            `;
            let arr = [packing_list_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                    console.log("get available category success".toUpperCase());
                    return queryResult.rows.map(x=>x.name);
            }else{
                return Promise.reject(new Error("get available category returns null"));
            }
        }catch (error){
            console.log("get available category "+ error)
        }
    }

    let getSharedItemCategoryId = async function(packing_list_id){
        try{
            let query = 'SELECT * FROM packing_list_categories WHERE packing_list_id = $1';
            let arr = [packing_list_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                    console.log("get shared item category id success".toUpperCase());
                    return queryResult.rows[0].id;
            }else{
                return Promise.reject(new Error("get shared item category id return null"));
            }
        }catch (error){
            console.log('get shared item category id model '+error)
        }
    }

    let getItemsByCategoryId = async function(category_id){
        try{
            let query = `
                SELECT packing_list_items.*,categories.name AS category
                FROM packing_list_items
                INNER JOIN packing_list_categories
                ON (packing_list_items.category_id = packing_list_categories.id)
                INNER JOIN categories
                ON (packing_list_categories.category_id = categories.id)
                WHERE packing_list_items.category_id = $1
            `
            let arr = [category_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                    console.log("get items by category id success".toUpperCase());
                    return queryResult.rows;
            }else{
                return Promise.reject(new Error("get items by category id"));
            }
        }catch (error){
            console.log("get items by category id ")+error
        }
    }

    let getCategoryIdByPackingListId = async function(packing_list_id,pure_id){
        try{
            let query = 'SELECT * FROM packing_list_categories WHERE packing_list_id = $1 AND category_id = $2'
            let arr = [packing_list_id,pure_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                    console.log("get category id by packing list id success".toUpperCase());
                    return queryResult.rows[0].id;
            }else{
                return Promise.reject(new Error("get category id by packing list id returns null"));
            }
        }catch (error){
            console.log("get category id by packing list id")
        }
    }

    let getPureCategoryIdByName = async function(category){
        try{
            let query = 'SELECT * FROM categories WHERE name = $1'
            let arr = [category];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                    console.log("get pure category id by name success".toUpperCase());
                    return queryResult.rows[0].id;
            }else{
                return Promise.reject(new Error("get pure category id by name return snull"));
            }
        }catch (error){
            console.log("get pure category id by name "+error)
        }
    }

    return {
        generateTempList,
        createPackingList,
        createPackingListItems,
        generateSharedList,
        getPackingListIdByTripId,
        getItemsByPackingListId,
        getGroupPackingListByTripId,
        getPackingListItemsByPackingListId,
        updateItemQuantity,
        updateItemName,
        updateItemPacked,
        getUserPackingListIdByUserIdAndTripId,
        updateSharedItemId,
        getPackingListDetailsByUserIdAndTripId,
        addCustomItem,
        deleteItem,
        generatePackingListCategories,
        getAvailableCategory,
        getSharedItemCategoryId,
        getItemsByCategoryId,
        getCategoryIdByPackingListId,
        getPureCategoryIdByName

    };
};
