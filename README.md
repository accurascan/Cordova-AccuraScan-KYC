# Cordova Accura Scan KYC


Accura Scan OCR is used for Optical character recognition.

Accura Scan Face Match is used for Matching 2 Faces, Source face and Target face. It matches the User Image from a Selfie vs User Image in document.

Accura Scan Authentication is used for your customer verification and authentication. Unlock the True Identity of Your Users with 3D Selfie Technology


Below steps to setup Accura Scan's SDK to your project.

## Note:-
Add the plugin:- `cordova plugin add cordova_accurascan_kyc`

**Usage**
var accura = cordova.plugins.cordova_accurascan_kyc;

## 1.Setup Android

**Add it in your root build.gradle at the end of repositories.**

```
allprojects {
   repositories {
       google()
       jcenter()
       maven {
           url 'https://jitpack.io'
           credentials { username 'jp_ssguccab6c5ge2l4jitaj92ek2' }
       }    
    }
}
```

**Add it in your app/build.gradle file.**

```
android{
 ...
 packagingOptions {
   pickFirst 'lib/arm64-v8a/libcrypto.so'
   pickFirst 'lib/arm64-v8a/libssl.so'
   
   pickFirst 'lib/armeabi-v7a/libcrypto.so'
   pickFirst 'lib/armeabi-v7a/libssl.so'
   
   pickFirst 'lib/x86/libcrypto.so'
   pickFirst 'lib/x86/libssl.so'
   
   pickFirst 'lib/x86_64/libcrypto.so'
   pickFirst 'lib/x86_64/libssl.so'
   
 }
}
```

## 2.Setup iOS

1.Install Git LFS using command install `git-lfs`

2.Run `pod install`

**Add this permissions into iOS Info.plist file.**

```
<key>NSCameraUsageDescription</key>
<string>App usage camera for scan documents.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>App usage photos for get document picture.</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>App usage photos for save document picture.</string>
```

## 3.Setup Accura Scan licenses into your projects

Accura Scan has two license require for use full functionality of this library. Generate your own Accura license from here
**key.license**

This license is compulsory for this library to work. it will get all setup of accura SDK.

**accuraface.license**

This license is use for get face match percentages between two face pictures.

**For Android**

```
Create "assets" folder under app/src/main and Add license file in to assets folder.
- key.license // for Accura Scan OCR
- accuraface.license // for Accura Scan Face Match
Generate your Accura Scan license from https://accurascan.com/developer/dashboard
```
**For iOS**
```
Place both the license in your project's Runner directory, and add the licenses to the target.
```



## 4.Get license configuration from SDK. It returns all active functionalities of your license.

### Setting up License
```
  accura.getMetadata(function (result) {
    if(result.isValid){
      console.log(result)
    }
  }, function (error) {
    alert(error);
  })
```

**Error:** String

**Success:** JSON String Response = {
**countries:** Array[<CountryModels>],
**barcodes:** Array[],
**isValid:** boolean,
**isOCREnable:** boolean,
**isBarcodeEnable:** boolean,
**isBankCardEnable:** boolean,
**isMRZEnable:** boolean
}

### Setting up Configuration's,Error mssages and Scaning title messages

```
  setUpConfig: () => {
      //setConfig
      var config = {
         setFaceBlurPercentage: 80,   // 0 for clean face and 100 for Blurry face
         setHologramDetection: true,  // true to check hologram on face
         setLowLightTolerance: 10,    // 0 for full dark document and 100 for full bright document
         setMotionThreshold: 25,      // 1 - allows 1% motion on document and 100 - it can not detect motion and allow document to scan.
         setMinGlarePercentage: 6,    // Set min percentage for glare
         setMaxGlarePercentage: 99,   // Set max percentage for glare
         setBlurPercentage: 60,       //0 for clean document and 100 for Blurry document
        };

      var accuraConfigs = {
        enableLogs: 0,
        isShowLogo: 1,     //To hide Logo pass 0
        isFlipImg: 1,      //To hide flip animation pass 0
        CameraScreen_CornerBorder_Enable: true, //To enable corner border frame pass true
        CameraScreen_Border_Width: 15,
        Disable_Card_Name: false, //To disable taking card name automatically pass true
        CameraScreen_Frame_Color: '#D5323F',  //Pass a Hex Code to change frame color
        CameraScreen_Text_Color: '#FFFFFF',    //Pass a Hex Code to change text color
        CameraScreen_Text_Border_Color: '#000000', //Pass a Hex Code to change text border color
        CameraScreen_Color: '#80000000',  //Pass a Hex Code to change Camera Screen Background color
        CameraScreen_Back_Button: 1,   //Pass 0 to hide back button in iOS
        CameraScreen_Change_Button: 1,   //Pass 0 to hide flip camera button
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
  }
```

## 5.Method for scan MRZ documents.

```
  startMRZ:()=>{
    //MRZ
    accura.startMRZ(mrzType,function success(result){
      navigateToPage(result);
    },function(error){
    alert(error);
    });
  }
```

**MRZType:** String

#### value: other_mrz or passport_mrz or id_mrz or visa_mrz<br></br>

**Success:** JSON Response {

**front_data:** JSONObjects?,

**back_data:** JSONObjects?,

**type:** Recognition Type,

**face:** URI?

**front_img:** URI?

**back_img:** URI?

}

**Error:** String


## 6.Method for scan OCR documents.
```
  startOCR:()=>{
      accura.startOcrWithCard(countryId,cardId,cardName,cardType,
      function success(result){
        console.log(result)
        },function error(error){
        console.log(error)
        },)
    }
```

**CountryId:** integer

**value:** Id of selected country.

**CardId:** integer

**value:** Id of selected card.

**CardName:** String

**value:** Name of selected card.

**CardType:** integer

**value:** Type of selected card.

**Success:** JSON Response

**Error:** String


## 7.Method for scan barcode.
```
    startBarcode:()=>{
        accura.startBarcode(barcodeType,
        function success(result){
          console.log(result)
        },function error(error){
          console.log(error)
        })
    }
```

**BarcodeType:** String

**value:** Type of barcode documents.

**Success:** JSON Response {
}

**Error:** String


## 8.Method for scan bankcard.

  ```
  startBankcard:()=>{
    accura.startBankCard(
    function success(result){
      console.log(result)
    },function error(error){
      console.log(error)
    })
  }
  ```

**Success:** JSON Response {
}

**Error:** String

## 8.Method for get face match percentages between two face.
```
  facematch:()=>{
      var accuraConfs = {
          face_uri: FaceURI,
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
      },function error(error){
      console.log(error)
      }),
  }
```

**accuraConfs:** JSON Object

**face_uri:** URI


**Success:** JSON Response {
detect: URI?
score: Float
}

**Error:** String


## 9.Method for liveness check.

```
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
          setLivenessURL: 'Your URL',
          setFeedBackLowLightMessage: 'Low light detected',
          feedbackLowLightTolerence: 39,
          feedbackDialogMessage: 'Loading...',
          feedBackProcessingMessage: 'Processing...',
          isShowLogo: 1,
        };
      
      accura.startLiveness(accuraConfs,lconfig,
        function success(result){
          console.log(result)            
        },function error(error){
          console.log(error)
        })
  },
```

**accuraConfs:** JSON Object

**face_uri:** 'uri of face'


**Success:** JSON Response {

detect: URI?,

Face_score: Float,

score: Float,

}

**Error:** String


## 10.Method for Only Facematch.(The following are Optional methods, Use if you need only FaceMatch)
### To Open Gallery 1 and 2:-

_For gallery 1_

```
    startGallery1:()=>{
        var accuraConfs = {
            face1: faceUrl,
            face2: matchUrl,
          };

        accura.gallery1(accuraConfs,
          function success(result){
            console.log(result)
          },function error(error){
            console.log(error)
          }
        )
    },
```

_For gallery 2_
```
   startGallery2:()=>{
        var accuraConfs = {
            face1: faceUrl,
            face2: matchUrl,
          };
 
        accura.gallery2(accuraConfs,
          function success(result){
            console.log(result)
          },function error(error){
            console.log(error)
          }
        )
    }
```

### To Open Camera for Facematch 1 and 2:

_For Facematch 1:_
```
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
              console.log(result)
          },function error(error){
              console.log(error)
          }
        )
    }
```

_For Facematch 2_

```
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
            console.log(result)
          },function error(error){
              console.log(error)
          }
        )
    }
```

**accuraConfs:** JSON Object

**Face1:** 'uri of face1'

**Face2:** ’uri of face2’

**Success:** JSON Response {

**Image:** URI?,

**score:** String,
}

**Error:** String


Contributing
See the contributing guide to learn how to contribute to the repository and the development workflow.

License:
MIT

