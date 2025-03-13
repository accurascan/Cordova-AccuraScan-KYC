var dictionary = null;
var accura;

const app = {
    init:()=>{
        // alert("RESULT")
        document.addEventListener('deviceready', app.ready);
    },

    ready:()=>{
        accura = cordova.plugins.cordova_accurascan_micr;

        document.querySelector('.ready').addEventListener('click', app.back);
        // document.querySelector('#faceMatch').addEventListener('click', app.facematch);
        // document.querySelector('#liveness').addEventListener('click', app.liveness);

        var urlParams = new URLSearchParams(window.location.search);

        var encodedStr = urlParams.get("data");
        
        // Decode the URL-encoded JSON string
        var jsonStr = decodeURIComponent(encodedStr);

        // Parse the JSON string back to an object
        var dict = JSON.parse(jsonStr);

        dictionary = dict;

        if(dictionary.front_data != null){
            const keys = Object.keys(dictionary.front_data);

            if(keys.length > 0){
                app.frontTable();
            }
        }

        if(dictionary.back_data != null){
            const keys = Object.keys(dictionary.back_data);

            if(keys.length > 0){
            app.backTable();
            }
        }

        if(dictionary.mrz_data != null){
            const keys = Object.keys(dictionary.mrz_data);

            if(keys.length > 0){
              app.mrzTable();
            }
        }

        if(dict.front_img != null){
            var frontImg = document.getElementById("FrontImg");
            frontImg.textContent = "Front Image";
            
            app.displayImage(dict.front_img,"frontImage",false)
        }

        if(dict.back_img != null){
            var imgElement = document.getElementById("BackImg");
            imgElement.textContent = "Back Image";
            imgElement.style.backgroundColor = "grey";
            imgElement.style.fontFamily = "bold";
            imgElement.style.color = "white";
            imgElement.style.fontSize = "large";
            imgElement.style.padding = "10px";

            app.displayImage(dict.back_img,"backImage",false);
        }
    },

    frontTable:()=>{
        // Retrieve the keys and values from the dictionary
        const keys = Object.keys(dictionary.front_data);
        const values = Object.values(dictionary.front_data);

        // Create the HTML structure for the table
        const table = document.createElement("table");
        const caption = document.createElement("caption");
        caption.textContent = "Front Data"; // Set the heading text
        table.appendChild(caption);
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        
        // Generate the table rows dynamically using the keys and values
        for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        
        const row = document.createElement("tr");
        const keyCell = document.createElement("td");
        const valueCell = document.createElement("td");

        keyCell.textContent = key;
        
        if (key === "signature") {
        if(device.platform == 'iOS'){
            const image = document.createElement("img");
            var imagePath = value;                    
            window.resolveLocalFileSystemURL(imagePath, function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        image.src = reader.result;
                    };
                    reader.readAsDataURL(file);
                });
            }, function(error) {
                console.log("Failed to resolve file path: " + error);
            });
            image.style.width = "100px";
            image.style.height = "75px";
            valueCell.appendChild(image);
        }else{
            const image = document.createElement("img");
            var imagePath = value;
            window.FilePath.resolveNativePath(imagePath, function(nativePath) {
            window.resolveLocalFileSystemURL(nativePath, function(fileEntry) {
                fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function() {
                    image.src = reader.result;
                };
                reader.readAsDataURL(file);
                });
            });
            }, function(error) {
            console.log("Failed to resolve file path: " + error);
            });
            image.style.width = "100px";
            image.style.height = "75px";
            valueCell.appendChild(image);
        }

        } else {
        valueCell.textContent = value;
        }

        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
        }
        
        // Append the table to a container element in the HTML
        const container = document.getElementById("fronttable");
        container.appendChild(table);
    },

    backTable:()=>{
        // Retrieve the keys and values from the dictionary
        const keys = Object.keys(dictionary.back_data);
        const values = Object.values(dictionary.back_data);

        // Create the HTML structure for the table
        const table = document.createElement("table");
        const caption = document.createElement("caption");
        caption.textContent = "Back Data"; // Set the heading text
        table.appendChild(caption);
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        
        // Generate the table rows dynamically using the keys and values
        for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        
        const row = document.createElement("tr");
        const keyCell = document.createElement("td");
        const valueCell = document.createElement("td");

        keyCell.textContent = key;
        
        if (key === "signature") {
         if(device.platform == 'iOS'){
             const image = document.createElement("img");
             var imagePath = value;                    
             window.resolveLocalFileSystemURL(imagePath, function(fileEntry) {
                 fileEntry.file(function(file) {
                     var reader = new FileReader();
                     reader.onloadend = function() {
                         image.src = reader.result;
                     };
                     reader.readAsDataURL(file);
                 });
             }, function(error) {
                 console.log("Failed to resolve file path: " + error);
             });
             image.style.width = "100px";
             image.style.height = "75px";
             valueCell.appendChild(image);
         }else{
             const image = document.createElement("img");
             var imagePath = value;
             window.FilePath.resolveNativePath(imagePath, function(nativePath) {
             window.resolveLocalFileSystemURL(nativePath, function(fileEntry) {
                 fileEntry.file(function(file) {
                 var reader = new FileReader();
                 reader.onloadend = function() {
                     image.src = reader.result;
                 };
                 reader.readAsDataURL(file);
                 });
             });
             }, function(error) {
             console.log("Failed to resolve file path: " + error);
             });
             image.style.width = "100px";
             image.style.height = "75px";
             valueCell.appendChild(image);
         }

       } else {
         valueCell.textContent = value;
       }

        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
        }
        
        // Append the table to a container element in the HTML
        const container = document.getElementById("backtable");
        container.appendChild(table);
    },


    back:()=>{
        history.back();
    },


    displayImage:(path,imageId,isFace)=>{
        var imagePath = path;
        var isFaceImage = isFace;
        if(device.platform == 'iOS'){
            console.log("iOS");
            // Resolve the file path using the cordova-plugin-file plugin
            window.resolveLocalFileSystemURL(imagePath, function(fileEntry) {
                // Read the file as a data URL
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        // Set the source of the image element to the Base64 data URI
                        var imgElement = document.getElementById(imageId);
                        if(isFaceImage){
                            imgElement.style.height = "150px";
                            imgElement.style.width = "120px";
                            imgElement.style.padding = "30px";
                        }
                        imgElement.src = reader.result;
                    };
                    reader.readAsDataURL(file);
                });
            }, function(error) {
                console.log("Failed to resolve file path: " + error);
            });
         }else{
            console.log("android");
            var imagePath = path;
            // Resolve the file path using the cordova-plugin-filepath plugin
            window.FilePath.resolveNativePath(imagePath, function(nativePath) {
             // Read the file as a data URL
             window.resolveLocalFileSystemURL(nativePath, function(fileEntry) {
                fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function() {
                    // Set the source of the image element to the Base64 data URI
                    var imgElement = document.getElementById(imageId);
                    if(isFaceImage){
                        imgElement.style.height = "150px";
                        imgElement.style.width = "120px";
                        imgElement.style.padding = "30px";
                    }
                    imgElement.src = reader.result;
                };
                reader.readAsDataURL(file);
                });
             });
            }, function(error) {
             console.log("Failed to resolve file path: " + error);
            });
        }

    }

}

app.init();