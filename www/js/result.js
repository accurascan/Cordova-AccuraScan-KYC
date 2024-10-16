var dictionary = null;
var nfcResult = null;
var accura;
var DOB = "";
var DOE = "";
var PassNo = "";

const app = {
    init:()=>{
        // alert("RESULT")
        document.addEventListener('deviceready', app.ready);
    },

    ready:()=>{
        accura = cordova.plugins.cordova_accurascan_kyc;

        document.querySelector('.ready').addEventListener('click', app.back);
        document.querySelector('#faceMatch').addEventListener('click', app.facematch);
        document.querySelector('#liveness').addEventListener('click', app.liveness);

        app.createPopup();

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

        if(dict.face != null){
            var faceButton = document.getElementById("faceMatch"); 
            var liveButton = document.getElementById("liveness");
            faceButton.style.visibility = "visible"
            liveButton.style.visibility = "visible"
           app.displayImage(dict.face,"faceImage",true)
        }

        if(dict.front_img != null){
            var frontImg = document.getElementById("FrontImg");
            frontImg.textContent = "Front Image";
            
            app.displayImage(dict.front_img,"frontImage",false)
        }
        if(dict.face != null){
            var faceButton = document.getElementById("faceMatch"); 
            var liveButton = document.getElementById("liveness");
            faceButton.style.visibility = "visible"
            liveButton.style.visibility = "visible"
           app.displayImage(dict.face,"faceImage",true)
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

        document.getElementById("okButton").onclick = function () {
            app.handlePopupOk();
        };
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

    mrzTable:()=>{
        // Retrieve the keys and values from the dictionary
        const keys = Object.keys(dictionary.mrz_data);
        const values = Object.values(dictionary.mrz_data);

        // Create the HTML structure for the table
        const table = document.createElement("table");
        const caption = document.createElement("caption");
        caption.textContent = "MRZ"; // Set the heading text
        table.appendChild(caption);
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        
        // Generate the table rows dynamically using the keys and values
        for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        if (key == "Document No.") {
            PassNo = value;
        }else if(key == "Date of Birth"){
            DOB = value;
        }else if(key == "Date of Expiry"){
            DOE = value;
        }
        const row = document.createElement("tr");
        const keyCell = document.createElement("td");
        const valueCell = document.createElement("td");
        
        keyCell.textContent = key;
        valueCell.textContent = value;
        
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
        }
        app.showPopup();
        // Append the table to a container element in the HTML
        const container = document.getElementById("mrztable");
        container.appendChild(table);


    },
    nfcTable:()=>{
        // Retrieve the keys and values from the dictionary
        const keys = Object.keys(nfcResult);
        const values = Object.values(nfcResult);

        // Create the HTML structure for the table
        const table = document.createElement("table");
        const caption = document.createElement("caption");
        caption.textContent = "NFC"; // Set the heading text
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
        valueCell.textContent = value;
        
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
        }
        // Append the table to a container element in the HTML
        const container = document.getElementById("nfctable");
        container.appendChild(table);


    },

    back:()=>{
        history.back();
    },
    

    facematch:()=>{
        var accuraConfs = {
            face_uri: dictionary.face,
          };
          var fconfig = {
            backGroundColor: '#FFC4C4C5',
            closeIconColor: '#FF000000',
            feedbackBackGroundColor: '#FFC4C4C5',
            feedbackTextColor: '#FF000000',
            setFeedbackTextSize: 18,
            setFeedBackframeMessage: 'Frame Your Face',
            setFeedBackAwayMessage: 'Move Phone Away',
            setFeedBackOpenEyesMessage: 'Keep Your Eyes Open',
            setFeedBackCloserMessage: 'Move Phone Closer',
            setFeedBackCenterMessage: 'Move Phone Center',
            setFeedbackMultipleFaceMessage: 'Multiple Face Detected',
            setFeedBackFaceSteadymessage: 'Keep Your Head Straight',
            setFeedBackLowLightMessage: 'Low light detected',
            setFeedBackBlurFaceMessage: 'Blur Detected Over Face',
            setFeedBackGlareFaceMessage: 'Glare Detected',
            setBlurPercentage: 80,
            setGlarePercentage_0: -1,
            setGlarePercentage_1: -1,
            feedbackDialogMessage: 'Loading...',
            feedBackProcessingMessage: 'Processing...',
            isShowLogo: 1,
          };

      accura.startFaceMatch(accuraConfs,fconfig,
        function success(result){
            if(result.score != null){
                var faceScore = document.getElementById("faceScore");
                var liveScore = document.getElementById("liveScore");
                faceScore.style.visibility = "visible"
                faceScore.textContent = Number(result.score).toFixed(2) + "%";
                liveScore.style.visibility = "visible"
                liveScore.textContent = "0.00%";

            }
            if(result.detect != null){
                app.displayImage(result.detect,"matchImage",true);
            }
       })
    },

    liveness:()=>{
        var accuraConfs = {
            face_uri: dictionary.face,
          };
      
          var lconfig = {
            backGroundColor: '#FFC4C4C5',
            closeIconColor: '#FF000000',
            feedbackBackGroundColor: '#FFC4C4C5',
            feedbackTextColor: '#FF000000',
            setFeedbackTextSize: 18,
            setFeedBackframeMessage: 'Frame Your Face',
            setFeedBackAwayMessage: 'Move Phone Away',
            setFeedBackOpenEyesMessage: 'Keep Your Eyes Open',
            setFeedBackCloserMessage: 'Move Phone Closer',
            setFeedBackCenterMessage: 'Move Phone Center',
            setFeedbackMultipleFaceMessage: 'Multiple Face Detected',
            setFeedBackFaceSteadymessage: 'Keep Your Head Straight',
            setFeedBackBlurFaceMessage: 'Blur Detected Over Face',
            setFeedBackGlareFaceMessage: 'Glare Detected',
            setBlurPercentage: 80,
            setGlarePercentage_0: -1,
            setGlarePercentage_1: -1,
            setLivenessURL: '',
            setFeedBackLowLightMessage: 'Low light detected',
            feedbackLowLightTolerence: 39,
            feedbackDialogMessage: 'Loading...',
            feedBackProcessingMessage: 'Processing...',
            isShowLogo: 1,
          };
        
        accura.startLiveness(accuraConfs,lconfig,
        function success(result){
            if(result.face_score != null){
                var faceScore = document.getElementById("faceScore");
                faceScore.style.visibility = "visible"
                faceScore.textContent = Number(result.face_score).toFixed(2) + "%";
            }
            if(result.score != null){
                var liveScore = document.getElementById("liveScore");
                liveScore.textContent = Number(result.score).toFixed(2) + "%";
                liveScore.style.visibility = "visible"
            }
            if(result.detect != null){
                app.displayImage(result.detect,"matchImage",true);
            }            
        })
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

    },

    createPopup: () => {
        // Create popup HTML and inject into body
        const popupHTML = `
        <div id="popup" class="popup">
            <div class="popup-content">
                <span class="close">&times;</span>
                <h2 class="start_NFC">Press OK to start NFC</h2>
                <label class="start_NFC" for="passportNumber">Passport Number:</label><br>
                <input type="text" id="passportNumber" name="passportNumber"><br><br>
                <label class="start_NFC" for="dob">DOB:</label><br>
                <input type="date" id="dob" name="dob"><br><br>
                <label class="start_NFC" for="doe">DOE:</label><br>
                <input type="date" id="doe" name="doe"><br><br>
                <button type="button" id="okButton">OK</button>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Add popup styles
        const style = document.createElement('style');
        style.innerHTML = `
        .start_NFC {
            color: black;
        }
        .popup {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
        }
        .popup-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 300px;
            border-radius: 10px;
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        `;
        document.head.appendChild(style);

        // Add event listener for close button
        document.querySelector('.close').onclick = function () {
            document.getElementById("popup").style.display = "none";
        };

        // Close popup when clicking outside of it
        window.onclick = function (event) {
            if (event.target == document.getElementById("popup")) {
                document.getElementById("popup").style.display = "none";
            }
        };

        // Add event listener for the OK button
        document.getElementById('okButton').onclick = app.handlePopupOk;
    },

    showPopup: () => {
        var popup = document.getElementById("popup");
        
        function convertDateFormat(inputDate) {
            // Split the input date by hyphen
            const [day, month, year] = inputDate.split('-');
        
            // Determine the century
            let fullYear;
            if (year.length === 2) {
                fullYear = parseInt(year) < 50 ? '20' + year : '19' + year;
            } else {
                fullYear = year;
            }
        
            // Create a new Date object
            const date = new Date(fullYear, month - 1, day);
        
            // Get the formatted date parts
            const formattedYear = date.getFullYear();
            const formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure two digits
            const formattedDay = ('0' + date.getDate()).slice(-2); // Ensure two digits
        
            // Return the formatted date
            return `${formattedYear}-${formattedMonth}-${formattedDay}`;
        }
        
        
        // Prefill the popup with values
        var passportNumber = document.getElementById("passportNumber");
        var dob = document.getElementById("dob");
        var doe = document.getElementById("doe");

        console.log("passportNumber:", PassNo);
        console.log("dob:", DOB);
        console.log("DOE:", DOE);

        // Replace with actual data
        passportNumber.value = PassNo || '';
        dob.value = convertDateFormat(DOB) || '';
        doe.value = convertDateFormat(DOE) || '';

        popup.style.display = "block";
    },
    

    handlePopupOk: () => {
        const passportNumber = document.getElementById("passportNumber").value;
        const dob = document.getElementById("dob").value;
        const doe = document.getElementById("doe").value;

        console.log("Passport Number:", passportNumber);
        console.log("DOB:", dob);
        console.log("DOE:", doe);

        
        accura.startNFC(passportNumber,dob,doe,
            function success(result){
                nfcResult = result
                app.nfcTable();
                console.log(result)
           },function(error){
            alert(error);
           })
        document.getElementById("popup").style.display = "none";
    },

}

app.init();