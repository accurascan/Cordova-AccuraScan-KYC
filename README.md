# Cordova Accura Scan MICR


Below steps to setup Accura Scan's SDK to your project.

## Note:-
Add the plugin:- `cordova plugin add cordova_accurascan_micr`

## Usage:-
var accura = cordova.plugins.cordova_accurascan_micr;

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
Place key.license and accuraface.license in your project's Runner directory, and add the licenses to the target.
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
**isMICR:** boolean
}

### Setting up Configuration,Error messages and Scaning title messages

```
  setUpConfig: () => {
      //setConfig
      var config = {
         setMinGlarePercentage: 6,    // Set min percentage for glare
         setMaxGlarePercentage: 99,   // Set max percentage for glare
         setBlurPercentage: 60,       //0 for clean document and 100 for Blurry document
        };

      var accuraConfigs = {
        isShowLogo: 1,     //To hide Logo pass 0
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
        ACCURA_ERROR_CODE_PROCESSING: 'Processing...',
        ACCURA_ERROR_CODE_BLUR_DOCUMENT: 'Blur detect in document',
        ACCURA_ERROR_CODE_GLARE_DOCUMENT: 'Glare detect in document',
        ACCURA_ERROR_CODE_DARK_DOCUMENT: 'Low lighting detected',
        ACCURA_ERROR_CODE_MOVE_CLOSER: "Move closer to document",
        ACCURA_ERROR_CODE_MOVE_AWAY:"Move away from document",
        ACCURA_ERROR_CODE_KEEP_MICR_IN_FRAME: "Keep MICR in frame",
      };
    
      var accuraTitleMsg = {
        SCAN_TITLE_MICR: 'Scan Cheque',
      };

      accura.setupAccuraConfig(config,accuraConfigs,accuraTitleMsg,
      function success(result){
          console.log(result);
      })
  }
```

## 5.Method for scan MICR documents.

```
  startMICR:()=>{
    //MICR
    accura.startMICR(micrType,function success(result){
      navigateToPage(result);
    },function(error){
    alert(error);
    });
  }
```

**MICRType:** String

#### value: e13b or cmc7<br></br>

**Success:** JSON Response {

**front_data:** JSONObjects?,

**front_img:** URI?


}

**Error:** String



Contributing
See the contributing guide to learn how to contribute to the repository and the development workflow.

License:
MIT
