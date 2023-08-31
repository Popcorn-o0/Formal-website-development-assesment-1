//the delete buttons will call this function and send the value relating to the object
function deleteObject(gameKey){
            
    const transaction = db.transaction(['Test1'], 'readwrite');
    const store = transaction.objectStore('Test1');
   
    //use the key to delete the object
    request = store.delete(parseInt(gameKey));
    console.log(gameKey);
    request.onerror = function (e) {
        console.log('Help', e.target.error.name);
        
    };
    // if successful, retrieve data and display on alert
    request.onsuccess = function (e) {
        console.log('The Game has been deleted');

        //write to the success div
        document.getElementById("alertSuccess").style.display = "unset";
        document.getElementById("alertSuccess").innerHTML = "";
        let success = document.createElement("p").innerHTML = "The item was successfully deleted";
        document.getElementById("alertSuccess").append(success);
        ;
        //re-read all items
        readItem();
    }
    
}