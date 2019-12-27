/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
       
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        /* 追加箇所 ここから */
        var contactKey = "marketingcloud.cordova";
        MCCordovaPlugin.setContactKey(contactKey,
            function(success){
                console.log("setContact Success");
            }, function(error){
                console.log("setContact Error");
        });

        /* payload
        {
            "key2": "key2",
            "_h": "0z5l1yoCXzYdOLvR9K/CCwAAAAAA",
            "_m": "NDIyOjExNDow",
            "url": "https://www.yahoo.co.jp/",
            "_r": "7ce633b2-bc49-4a9c-9b9e-58d58eaa3c66",
            "type": "openDirect",
            "title": "cordova test1225-15",
            "key1": "key1",
            "_sid": "SFMC",
            "_od": "https://www.yahoo.co.jp/",
            "alert": "cordova test1225-15",
            "_mt": 1
          }
        */
        MCCordovaPlugin.setOnNotificationOpenedListener(function(params){
            console.log("---- openListener Called -------");

            var valtxt = JSON.stringify(params.values);
            console.log(`values: ${valtxt}`);

            var type = params.values.type; 
            var url = params.values.url;
            //$('#txt1').text(`values: ${valtxt}`);

            if((type == "cloudPage" || type == "openDirect") && url != ""){
                window.open(url , '');
            }

        });

        MCCordovaPlugin.setOnUrlActionListener(function(url){
            console.log("---- urlActionListener Called -------");

            $('#txt2').text(`url: ${url}`);

            window.open(url , '');
            console.log(url);
        });

        /* 追加箇所 ここまで */

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var successCallback = function (success){
    $('#txt1').text("success");
    console.log("Success");
}

var errorCallback = function (success){
    $('#txt1').text("error");
    console.log("Error");
}

$("#btn1").click(function () {
    var tagval = $('#tag').val();
    MCCordovaPlugin.addTag(tagval, successCallback, errorCallback);
    $('#tag').val("");
});

