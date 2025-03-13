var mrzType = "other";
var accura;

const app = {
    init: () => {
        document.addEventListener('deviceready', app.ready);
    },

    ready: () => {
        accura = cordova.plugins.cordova_accurascan_micr;
        app.CountryList();
        document.querySelector('.ready').addEventListener('click', app.back);
    },

    CountryList: () => {
        var listContainer = document.getElementById("list");

        if (!listContainer) {
            console.error("List container not found");
            return;
        }

        accura.getMetadata(function (result) {
            app.setUpConfig();

            // Hide progress indicator
            var progress = document.getElementById("progress-container");
            if (progress) {
                progress.style.visibility = "hidden";
                progress.style.height = "0px";
                progress.style.paddingTop = "0px";
            }

            // Request necessary permissions
            cordova.plugins.permissions.requestPermission(
                cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE,
                function successCallback(status) {
                    if (!status.hasPermission) {
                        console.warn("Permission denied for WRITE_EXTERNAL_STORAGE");
                    }
                },
                function errorCallback() {
                    console.error("Permission request failed");
                }
            );

            // Populate the list if valid
            if (result.isValid && result.isMICR) {
                var listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode("MICR"));
                listItem.addEventListener("click", app.startMICR);
                listItem.style.backgroundColor = "#808080";
                listContainer.appendChild(listItem);
            }

        }, function (error) {
            alert("Error fetching metadata: " + error);
        });
    },

    back: () => {
        history.back();
    },

    startMICR: () => {
        accura.startMICR("e13b",
            function success(result) {
                app.navigateToPage(result);
            },
            function error(error) {
                alert("Error starting MICR: " + error);
            }
        );
    },

    navigateToPage: (item) => {
        var jsonStr = JSON.stringify(item);
        var encodedStr = encodeURIComponent(jsonStr);
        window.location.href = "result.html?data=" + encodedStr;
    },

    setUpConfig: () => {
        var config = {
            setHologramDetection: true,
            setLowLightTolerance: 10,
            setMotionThreshold: 25,
            setMinGlarePercentage: 6,
            setMaxGlarePercentage: 99,
            setBlurPercentage: 60,
            setCameraFacing: 0
        };

        var accuraConfigs = {
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
            ACCURA_ERROR_CODE_MOVE_CLOSER: "Move closer to document",
            ACCURA_ERROR_CODE_MOVE_AWAY:"Move away from document",
            ACCURA_ERROR_CODE_KEEP_MICR_IN_FRAME: "Keep MICR in frame",
        };

        var accuraTitleMsg = {
            SCAN_TITLE_MICR: 'Scan Cheque'
        };

        accura.setupAccuraConfig(config, accuraConfigs, accuraTitleMsg, function success(result) {
            console.log("Accura Config Set:", result);
        });
    }
};

app.init();
