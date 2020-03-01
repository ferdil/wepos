///
///	@file mpresspay.js
///
///	@author Ferdi Ladeira
///
///	@brief mPress Handler
///
/// @description
///
///	The mpress methods talk to mPress via the Shoplit plugin
///

/*
 * This is loaded on by the Wordpress code in the wepos plugin
 * and contains the payment call to the mPress plugin running
 * in the Cordova WebView
 * This will fail if run on a non-cordova webview
 */
var mpress;

    mpress = {
        //
        // Application Initializer
        initialize: function () {
            return true;
        },
        startPEDPayment: function(data) {
            console.log('Incoming mPress Payment Request :' + JSON.stringify(data));
            if (window.Shoplit == undefined)
                return;
            return window.Shoplit.startPEDPayment(JSON.stringify(data));
        },
        donePEDPayment: function(data) {
            console.log('Result Data :'+JSON.stringify(data));
            document.getElementById('mpress_result').value = JSON.stringify(data);
            document.getElementById('mpress_result').dispatchEvent(new Event("input")); // Triggers change event in Home.vue
        },
        failedPEDPayment: function(data) {
            console.log('Failed Data :'+JSON.stringify(data));
            document.getElementById('mpress_result').value = JSON.stringify(data);
            document.getElementById('mpress_result').dispatchEvent(new Event("input")); // Triggers change event in Home.vue
        },
        openCashDrawer: function() {
            console.log('Open Cash Drawer Request :');
            if (window.Shoplit == undefined)
                return;
            return window.Shoplit.openCashDrawer();

        },
        pushScannerData: function(scannerData) {
            document.getElementById('product-search').value = scannerData;
            document.getElementById('handlescan').click();
        },
        hideKeyboard: function() {
            window.Shoplit.hideKeyboard();
        },
        showKeyboard: function() {
            window.Shoplit.showKeyboard();
        }
    };

(function(){
	// Include any directives at a top level
	'use strict';
})();
