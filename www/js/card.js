var cardId = null;
var cardType = null;
var cardName = null;
var countryId = null;
var accura;

const app = {
    init:()=>{
        document.addEventListener('deviceready', app.ready);
    },
    ready:()=>{
        var cardContainer = document.getElementById("cards");

        var urlParams = new URLSearchParams(window.location.search);
        var jsonData = urlParams.get("card");
        var country = urlParams.get("countryName");
        // Parse the JSON string back to an array
        var array = JSON.parse(decodeURIComponent(jsonData));
        countryId = JSON.parse(decodeURIComponent(country));

        for (var i = 0; i < array.length; i++) {
            var cardItem = document.createElement("li");
            cardItem.appendChild(document.createTextNode(array[i].name));
            cardItem.addEventListener("click", cardSelected);
            cardContainer.appendChild(cardItem)
        }


        function cardSelected(){
            var cardSelected1 = this.innerText;
            var cardSelected = capitalize(cardSelected1);
            for (var i = 0; i < array.length; i++) {
                if(capitalize(array[i].name) == cardSelected){
                    cardId = array[i].id;
                    cardType = array[i].type;
                    cardName = array[i].name;
                    app.startOCR();
                    break;
                }
            }
        }

        function capitalize(s){
            return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
        };

        document.querySelector(".back").addEventListener('click',app.back);
    },
    back:()=>{
        history.back();
    },
    startOCR:()=>{
        accura = cordova.plugins.cordova_accurascan_kyc;

        accura.startOcrWithCard(countryId,cardId,cardName,cardType,
        function success(result){
            navigateToPage(result)  
         },function error(error){

         },)

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