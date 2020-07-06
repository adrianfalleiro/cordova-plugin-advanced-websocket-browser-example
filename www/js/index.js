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
    wsConnectionId: null,
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
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var listeningElement = document.querySelector('.listening');
        var receivedElement = document.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        var connectEl = document.querySelector('.ws-connect-btn');
        var disconnectEl = document.querySelector('.ws-disconnect-btn');
        var textEl = document.querySelector('.ws-text-input');
        var sendEl = document.querySelector('.ws-send-btn');

        connectEl.addEventListener('click', app.wsConnect);
        disconnectEl.addEventListener('click', app.wsClose);
        sendEl.addEventListener('click', function(event) {
            var text = textEl.value;
            app.wsSend(text);
        })
    },

    wsConnect: function() {
        window.CordovaWebsocketPlugin.wsConnect(
            { url: "ws://localhost:8080" },
            function(recvEvent) {
                console.log("Received callback from WebSocket:", recvEvent);
            },
            function(success) {
                console.log("Connected to WebSocket with id: " + success.webSocketId);
                app.wsConnectionId = success.webSocketId;
            },
            function(error) {
                console.log("Failed to connect to WebSocket: " +
                            "code: " + error["code"] +
                            ", reason: " + error["reason"] +
                            ", exception: " + error["exception"]);
            }
        );
    },

    wsSend: function(message) {
        window.CordovaWebsocketPlugin.wsSend(app.wsConnectionId, message);
    },

    wsClose: function() {
        window.CordovaWebsocketPlugin.wsClose(app.wsConnectionId);
    },
};

app.initialize();