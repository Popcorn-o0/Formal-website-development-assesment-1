        
        //event listener checks if submit button was clicked 
        let db;
        let check = false;
        let request;
        //open database called GameTest1 version 1: if it doesnt exist, create it
        const openRequest = indexedDB.open('GameTest1', 1);

        //check if the database has an object store named Test1
        openRequest.onupgradeneeded = function (e) {
            db = e.target.result;
            console.log('running onupgradeneeded');
            //if doesn't exist, create
            if (!db.objectStoreNames.contains('Test1')) {
                const gameObjectStore = db.createObjectStore('Test1', { autoIncrement: true});
                check = true;
            }
        };
        //if transaction was successful, call addItems
        openRequest.onsuccess = function (e) {
            console.log('Yey');
            db = e.target.result;
            //only create items if oject store is newly created, then read the items
            if(check){
                createItem();
                readItem();
            }else{
                readItem();
            }
            
        };
        //if failed, display error
        openRequest.onerror = function (e) {
            console.log('Help');
            console.dir(e);
        };

         
				//create game objects
				function createItem() {
					const transaction = db.transaction(['Test1'], 'readwrite');
					const store = transaction.objectStore('Test1');

                    //create game objects when page loads, you need to create 10
					const game1 = {
						name: "game One",
						type: "type1",
						ratinge: "rating1"
						};
                    const game2 = {
                        name: "game Two",
                        type: "type2",
                        ratinge: "rating2"
                     };

                     //load them into an array
                     let arr = [gameOne, gameTwo];

					//add to store
                    for(let i = 0; i < arr.length; i++){
					request = store.add(arr[i]);
                    
					request.onerror = function (e) {
						console.log('Help', e.target.error.name);
					};
					// if successful, retrieve data and display on alert
					request.onsuccess = function (e) {
						console.log('the Value has been added');
                    }	
						
					}
				}

            //read from database
            function readItem() {
                //clear the div before reading
                document.getElementById("woah").innerHTML = "";

                const transaction = db.transaction(['Test1'], 'readonly');
                const store = transaction.objectStore('Test1');

                //cursor itterates through items/indexes in a database
                request = store.openCursor();

                request.onerror = function(event) {
                     console.err("error fetching data");
                 };
                request.onsuccess = function(event) {
                let cursor = event.target.result;

                //if there is an object in the object store
                  if (cursor) {
                        //get the key and value of the object (object is the value)
                        let key = cursor.primaryKey;
                        let value = cursor.value;
                        console.log(key, value);

                         //display on screen
                         //create a paragraph
                         const par = document.createElement("p");
                         //insert text with values
                         par.innerHTML="Game name: " + value.name + " Game type: " + value.type;
                
                         //create corresponding delete buttons
                        const btn = document.createElement("button");
                        //insert attributes for the button
                        btn.innerHTML = "Delete";
                        btn.setAttribute("name", "delete");
                        btn.setAttribute("value", key);
                        btn.setAttribute("class", "btn btn-danger");
                        //create an onclick event to call the delete function
                        btn.setAttribute("onclick", "deleteObject(value)");
                
                        //append both the paragraph and button into the div
                        document.getElementById("woah").append(par, btn);
                        //go to next data point
                        cursor.continue();
                    }
            };
        }
        
        