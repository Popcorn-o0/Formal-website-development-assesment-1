        //hhiding success div
		document.getElementById("alertSuccess").style.display = "none";
        //event listener checks if submit button was clicked 
		document.getElementById("submit").addEventListener("click", function(event){
			//prevent the form from auto submitting and resetting
			event.preventDefault();
			//call the saveData function
			saveData();
		});
		
		//creating databases, accessing data
		function saveData(){
			//collect inputs from user
				let db;
				let name = document.getElementById("gamename").value;
				
				let type = document.getElementById("gametype").value;
				
                let rating = document.getElementById("gamerating").value;
				
				//check if inputs are filled: please add extra validation
				if(name == "" || type == "" || rating == ""){
					alert("Please fill in all boxes.");
				}
				else{
				//open database called GameTest1 version 1: if it doesnt exist, create it
				const openRequest = indexedDB.open('GameTest1', 1);

				//check if the database has an object store named Test1
				openRequest.onupgradeneeded = function (e) {
					db = e.target.result;
					console.log('running onupgradeneeded');
					//if doesn't exist, create
					if (!db.objectStoreNames.contains('Test1')) {
						const gameObjectStore = db.createObjectStore('Test1', { autoIncrement: true});
					}
				};
				//if transaction was successfull, call addItems
				openRequest.onsuccess = function (e) {
					console.log('Yay');
					db = e.target.result;
					//call the additem function
					addItem();
				};
				//if failed, display error
				openRequest.onerror = function (e) {
					console.log('Help');
					console.dir(e);
				};
			}
                
				//specify which object store we want to access
				function addItem() {
					const transaction = db.transaction(['Test1'], 'readwrite');
					const store = transaction.objectStore('Test1');
					
					//create object with user data
					const game = {
						name: name,
						type: type,
						rating: rating
						};


					//add to store
					const request = store.add(game);

					request.onerror = function (e) {
						console.log('Help', e.target.error.name);
					};
					// if successful, retrieve data and display on alert
					request.onsuccess = function (e) {
						console.log('The Game has been added');

						//set visibility to true and add info into the success div
						document.getElementById("alertSuccess").style.display = "unset";
                        document.getElementById("alertSuccess").innerHTML = "";
      					let deleted = document.createElement("p").innerHTML = "This was successfully added";
      					document.getElementById("alertSuccess").append(deleted);
						const myRecord = request.result;

						//re-read all data from database
                        readItem();
					}
				}
		
			}
			//reset form manually
			let lala  = document.getElementById("forms1");
			lala.reset();