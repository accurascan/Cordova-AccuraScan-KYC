var faceUrl = "";
var matchUrl = "";
var accura;

const app = {
    init:()=>{
        document.addEventListener('deviceready', app.ready);
    },
    ready:()=>{
        accura = cordova.plugins.cordova_accurascan_kyc;

        document.querySelector('.ready').addEventListener('click', app.back);
        document.querySelector('#gallery1').addEventListener('click', app.startGallery1);
        document.querySelector('#gallery2').addEventListener('click', app.startGallery2);
        document.querySelector('#facematch1').addEventListener('click', app.startFaceMatch1);
        document.querySelector('#facematch2').addEventListener('click', app.startFaceMatch2);
        if(device.platform == 'iOS'){
            var appMargin = document.getElementById('app-bar')
            appMargin.style.marginTop = "30px"
        }
    },
    back:()=>{
        history.back();
    },
    startGallery1:()=>{
        var accuraConfs = {
            face1: faceUrl,
            face2: matchUrl,
          };

        accura.gallery1(accuraConfs,
        function success(result){
            faceUrl = result.Image;
            if(faceUrl != ""){
                app.displayImage(faceUrl,"face1","dummy1");
            }
            if(JSON.stringify(result.score) != "0"){
                var score = document.getElementById("score");
                score.textContent = "Score: " + result.score + "%"
            }
        })
    },
    startFaceMatch1:()=>{
        var accuraConfs = {
            face1: faceUrl,
            face2: matchUrl,
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
          
        accura.facematch1(accuraConfs,fconfig,
          function success(result){
            faceUrl = result.Image;
            if(faceUrl != ""){
                app.displayImage(faceUrl,"face1","dummy1");
            }
            if(JSON.stringify(result.score) != "0"){
                var score = document.getElementById("score");
                score.textContent = "Score: " + result.score + "%"
            }
        })
    },
    startGallery2:()=>{
        var accuraConfs = {
            face1: faceUrl,
            face2: matchUrl,
          };
 
        accura.gallery2(accuraConfs,
        function success(result){
            matchUrl = result.Image;
            if(matchUrl != ""){
                app.displayImage(matchUrl,"face2","dummy2");
            }
            if(JSON.stringify(result.score) != "0"){
                var score = document.getElementById("score");
                score.textContent = "Score: " + result.score + "%"
            }
        })
    },
    startFaceMatch2:()=>{
        var accuraConfs = {
            face1: faceUrl,
            face2: matchUrl,
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
        accura.facematch2(accuraConfs,fconfig,
          function success(result){
            matchUrl = result.Image;
            if(matchUrl != ""){
                app.displayImage(matchUrl,"face2","dummy2");
            }
            if(JSON.stringify(result.score) != "0"){
                var score = document.getElementById("score");
                score.textContent = "Score: " + result.score + "%"
            }
        })
    },

    displayImage:(path,imageId,para)=>{
        var imagePath = path;


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
                        imgElement.onload = function() {
                            const desiredHeight = 200; // Replace with your desired height value
                            const desiredWidth = 300; // Replace with your desired width value
                            
                            const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
                            
                            let newHeight, newWidth;
                            if (desiredHeight / desiredWidth > aspectRatio) {
                                newHeight = desiredWidth / aspectRatio;
                                newWidth = desiredWidth;
                            } else {
                                newHeight = desiredHeight;
                                newWidth = desiredHeight * aspectRatio;
                            }
                            
                            imgElement.style.height = newHeight + "px";
                            imgElement.style.width = newWidth + "px";
                            };
                            imgElement.style.paddingBottom = "30px";
                            imgElement.style.marginLeft = "auto";
                            imgElement.style.marginRight = "auto";
                            imgElement.style.display = "block";
                            imgElement.style.marginTop = "-20px"

                        var paraElement = document.getElementById(para);
                            paraElement.style.padding = "0px";
                            // imgElement.style.margin = "0px";
                            paraElement.style.visibility = "hidden";
                            console.log("FaceImage");
                            // console.log(reader.result);
                            // Create a Blob from the base64 data
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
                    imgElement.onload = function() {
                        const desiredHeight = 200; // Replace with your desired height value
                        const desiredWidth = 300; // Replace with your desired width value
                        
                        const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
                        
                        let newHeight, newWidth;
                        if (desiredHeight / desiredWidth > aspectRatio) {
                            newHeight = desiredWidth / aspectRatio;
                            newWidth = desiredWidth;
                        } else {
                            newHeight = desiredHeight;
                            newWidth = desiredHeight * aspectRatio;
                        }
                        
                        imgElement.style.height = newHeight + "px";
                        imgElement.style.width = newWidth + "px";
                        };
                        imgElement.style.paddingBottom = "30px";
                        imgElement.style.marginLeft = "auto";
                        imgElement.style.marginRight = "auto";
                        imgElement.style.display = "block";
                        imgElement.style.marginTop = "-20px"
                    // }

                    var paraElement = document.getElementById(para);
                        paraElement.style.padding = "0px";
                        // imgElement.style.margin = "0px";
                        paraElement.style.visibility = "hidden";
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