var barcodeType = null;
var accura;
const app = {
    init:()=>{
        document.addEventListener('deviceready', app.ready);
    },
    ready:()=>{
        accura = cordova.plugins.cordova_accurascan_kyc;
        var cardContainer = document.getElementById("cards");

        var urlParams = new URLSearchParams(window.location.search);
        var jsonData = urlParams.get("barcode");
        // Parse the JSON string back to an array
        var array = JSON.parse(decodeURIComponent(jsonData));

        for (var i = 0; i < array.length; i++) {
            var cardItem = document.createElement("li");
            cardItem.appendChild(document.createTextNode(array[i].name));
            cardItem.addEventListener("click", cardSelected);
            cardContainer.appendChild(cardItem)
        }


        function cardSelected(){
            barcodeType = this.innerText;
            app.startBarcode();
        }

        document.querySelector(".back").addEventListener('click',app.back);
    },
    back:()=>{
        history.back();
    },
    startBarcode:()=>{

        accura.startBarcode(barcodeType,
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