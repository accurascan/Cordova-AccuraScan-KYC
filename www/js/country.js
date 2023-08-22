var mrzType = "other";
var accura;
const app = {
    init:()=>{
        document.addEventListener('deviceready', app.ready);
    },
    ready:()=>{
      accura = cordova.plugins.cordova_accurascan_kyc;
        const progressElement = document.querySelector('.progress');
        // progressElement.style.animation = 'none';
        app.CountryList();
        document.querySelector('.ready').addEventListener('click', app.back);
    },
    CountryList:() => {
          var listContainer = document.getElementById("list");

         accura.getMetadata(function (result) {
          app.setUpConfig();
          if(result.isValid){
            cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, successCallback, errorCallback);
            function successCallback(status) {
              if (status.hasPermission) {
                  // You have the permission, perform your write operations here
              } else {
                  // Permission denied, handle accordingly
              }
          }
          
          function errorCallback() {
              // Handle error if permission request fails
          }
            var progress = document.getElementById("progress-container");
            progress.style.visibility = "hidden"
            progress.style.height = "0px"
            progress.style.paddingTop = "0px"
              if(result.isMRZ){
                  var mrzSelected = [{label:"Passport",id:"passport_mrz"},
                                      {label:"ID_MRZ",id:"id_mrz"},
                                      {label:"Visa_MRZ",id:"visa_mrz"},
                                      {label:"OTHER",id:"other_mrz"}];
        
                  for (var i = 0; i < mrzSelected.length; i++) {
                      var listItem = document.createElement("li");
                      listItem.appendChild(document.createTextNode(mrzSelected[i].label));
                      listItem.addEventListener("click", function() {
                          // Handle the click event
                          // alert("You pressed: " + this.innerText);
                          if(this.innerText == "PASSPORT"){
                            mrzType = "passport_mrz";
                          }else if(this.innerText == "ID_MRZ"){
                            mrzType = "id_mrz";
                          }else if(this.innerText == "VISA_MRZ"){
                            mrzType = "visa_card"
                          }else{
                            mrzType = "other_mrz"
                          }
                          app.startMRZ();
                        });
                      listContainer.appendChild(listItem);
                      listItem.style.backgroundColor = "#808080";
                  }               
              }
              if(result.isBankcard){
                var listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode("Bank Card"));
                listItem.addEventListener("click", app.startBankcard);

                listContainer.appendChild(listItem);
                listItem.style.backgroundColor = "#808080";

              }
              if(result.isBarcode){
                var barcodes = result.barcodes;

                var listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode("Barcode"));
                listItem.addEventListener("click", navigateToPage);

                listContainer.appendChild(listItem);
                listItem.style.backgroundColor = "#808080";

                  function navigateToPage() {
                    // Convert the array to a JSON string
                    var jsonArray = JSON.stringify(barcodes);
                    // Perform navigation with the array as a query parameter
                    var queryParameter = "?barcode=" + encodeURIComponent(jsonArray) 
                    window.location.href = "barcode.html" + queryParameter;
                }
              }
              if(result.isOCR){
                  var countries = result.countries;
                  // Loop through the array and create list items
                  for (var i = 0; i < countries.length; i++) {
                    var listItem = document.createElement("li");
                    listItem.appendChild(document.createTextNode(countries[i].name));
                    listItem.addEventListener("click", cardList);
                    listItem.addEventListener("touchstart", function() {
                      // Handle the touchstart even
                      this.style.backgroundColor = "gray";
                      });
              
                    listItem.addEventListener("touchend", function() {
                      // Handle the touchend event
                      this.style.backgroundColor = "";
                      });
                    listContainer.appendChild(listItem);
                  }

                  function cardList(){
                      var cardsSelected = null;
                      var countrySelected1 = this.innerText;
                      var countrySelected = capitalize(countrySelected1);
                      for (var i = 0; i < countries.length; i++) {
                          if(capitalize(countries[i].name) == countrySelected){
                              cardsSelected = countries[i].cards
                              navigateToPage(cardsSelected,countries[i].id)
                              break;
                          }
                      }
                  }

                  function navigateToPage(item,countryName) {
                      // Convert the array to a JSON string
                      var jsonArray = JSON.stringify(item);
                      var country = JSON.stringify(countryName);
                      // Perform navigation with the array as a query parameter
                      var queryParameter = "?card=" + encodeURIComponent(jsonArray) 
                      + "&countryName=" + encodeURIComponent(country);
                      window.location.href = "card.html" + queryParameter;
                  }

                  function capitalize(s){
                      return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
                  };
              }
          }
         }, function (error) {
          alert(error);
      });

    },
    back:()=>{
        history.back();
    },
    startMRZ:()=>{
        //MRZ
        accura.startMRZ(mrzType,function success(result){
          navigateToPage(result);
       },function(error){
        alert(error);
       });

       function navigateToPage(item) {
        // Convert the array to a JSON string
        var jsonStr = JSON.stringify(item);
        // Encode the JSON string for URL inclusion
        var encodedStr = encodeURIComponent(jsonStr);
        var queryParameter = "?data=" + encodedStr;
        // Navigate to the next page with the query parameter
        window.location.href = "result.html" + queryParameter;
    }
    },
    setUpConfig: () => {
        //setConfig
        var config = {
            setFaceBlurPercentage: 80,
            setHologramDetection: true,
            setLowLightTolerance: 10,
            setMotionThreshold: 25,
            setMinGlarePercentage: 6,
            setMaxGlarePercentage: 99,
            setBlurPercentage: 60,
            setCameraFacing: 0,
            EnableLogs:true
          };

        var imagePath = cordova.file.applicationDirectory + 'www/' + 'img/Facematch.jpg'

        var accuraConfigs = {
          setFlipImage: imagePath,
          enableLogs: 1,
          setCameraFacing: 0,
          isShowLogo: 1,
          isFlipImg: 1,
          CameraScreen_CornerBorder_Enable: true,
          CameraScreen_Border_Width: 15,
          Disable_Card_Name: false,
          CameraScreen_Frame_Color: '#D5323F',
          CameraScreen_Text_Color: '#FFFFFF',
          CameraScreen_Text_Border_Color: '#000000',
          CameraScreen_Color: '#80000000',
          CameraScreen_Back_Button: 1,
          CameraScreen_Change_Button: 1,
          ACCURA_ERROR_CODE_MOTION: 'Keep Document Steady',
          ACCURA_ERROR_CODE_DOCUMENT_IN_FRAME: 'Keep document in frame',
          ACCURA_ERROR_CODE_BRING_DOCUMENT_IN_FRAME: 'Bring card near to frame',
          ACCURA_ERROR_CODE_PROCESSING: 'Processing...',
          ACCURA_ERROR_CODE_BLUR_DOCUMENT: 'Blur detect in document',
          ACCURA_ERROR_CODE_FACE_BLUR: 'Blur detected over face',
          ACCURA_ERROR_CODE_GLARE_DOCUMENT: 'Glare detect in document',
          ACCURA_ERROR_CODE_HOLOGRAM: 'Hologram Detected',
          ACCURA_ERROR_CODE_DARK_DOCUMENT: 'Low lighting detected',
          ACCURA_ERROR_CODE_PHOTO_COPY_DOCUMENT:
            'Can not accept Photo Copy Document',
          ACCURA_ERROR_CODE_FACE: 'Face not detected',
          ACCURA_ERROR_CODE_MRZ: 'MRZ not detected',
          ACCURA_ERROR_CODE_PASSPORT_MRZ: 'Passport MRZ not detected',
          ACCURA_ERROR_CODE_ID_MRZ: 'ID MRZ not detected',
          ACCURA_ERROR_CODE_VISA_MRZ: 'Visa MRZ not detected',
          ACCURA_ERROR_CODE_UPSIDE_DOWN_SIDE:
            'Document is upside down. Place it properly',
          ACCURA_ERROR_CODE_WRONG_SIDE: 'Scanning wrong side of Document',
        };
      
          var accuraTitleMsg = {
            SCAN_TITLE_OCR_FRONT: 'Scan Front side of ',
            SCAN_TITLE_OCR_BACK: 'Scan Back side of ',
            SCAN_TITLE_OCR: 'Scan ',
            SCAN_TITLE_MRZ_PDF417_FRONT: 'Scan Front Side of Document',
            SCAN_TITLE_MRZ_PDF417_BACK: 'Scan Back Side of Document',
            SCAN_TITLE_DLPLATE: 'Scan Number plate',
            SCAN_TITLE_BARCODE: 'Scan Barcode',
            SCAN_TITLE_BANKCARD: 'Scan BankCard',
          };

        accura.setupAccuraConfig(config,accuraConfigs,accuraTitleMsg,
        function success(result){
            console.log(result);
        })
    },
    startBankcard:()=>{

      accura.startBankCard(
      function success(result){
        navigateToPage(result)
      })

      function navigateToPage(item) {
        // Convert the array to a JSON string
        var jsonStr = JSON.stringify(item);
        // Encode the JSON string for URL inclusion
        var encodedStr = encodeURIComponent(jsonStr);
        var queryParameter = "?data=" + encodedStr;
        // Navigate to the next page with the query parameter
        window.location.href = "result.html" + queryParameter;
      }

    }
}

app.init();