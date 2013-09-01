/*
 * Copyright 2013 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
// called by the webworks ready event
function initApp() {
	console.log('app init');
	bb.pushScreen('main.html', 'main');
}


// setup window covers, and register with bbm platform
function welcome() {
	// register with bbm
	bbm.register();

	// setup the window cover (displayed when app is minimized)
	blackberry.ui.cover.setContent(blackberry.ui.cover.TYPE_IMAGE, {
		path: 'local:///cover.png'
	});
	blackberry.ui.cover.updateCover();

	
}


// called when access is given by the user to connect w/bbm via bbm.register()
function accessChangedCallback(accessible, status) {
	if (status == "unregistered") {
		// App is unregistered, proceed to register
		registerApp();
	} else if (status == "allowed") {}
	// Listen for other status...
}


// setup the global bbm object so we can call bbm.<function> from where-ever in the app
var bbm = {
	registered: false,

	// registers this application with the blackberry.bbm.platform APIs.
	register: function() {
		blackberry.event.addEventListener('onaccesschanged', function(accessible, status) {

			if (status === 'unregistered') {
				blackberry.bbm.platform.register({
					uuid: '33490f91-ad95-4ba9-82c4-33f6ad69fbbc'
				});

			} else if (status === 'allowed') {
				bbm.registered = accessible;
			}

		}, false);
	},

	// update the users personal message in bbm
	updateMessage: function() {

		// dialog callback
		function dialogCallBack(selection) {
			var txt = selection.promptText;
			blackberry.bbm.platform.self.setPersonalMessage(
			txt,

			function(accepted) {
			});
		}

		// standard async dialog to get new 'personal message' for bbm
		blackberry.ui.dialog.standardAskAsync("Enter your new status", blackberry.ui.dialog.D_PROMPT, dialogCallBack, {
			title: "I am a dialog"
		});
	},

	// invite a contact to download your app via bbm
	inviteToDownload: function() {
		blackberry.bbm.platform.users.inviteToDownload();
	},

	sendMessageBBM: function () {
		var message = $("#resul-screen").text();
		message += "\n\nvia averate app.";
		blackberry.invoke.invoke({
				target: 'sys.bbm.sharehandler',
				action: 'bb.action.BBMCHAT',
				data: message,
				mimeType: 'text/plain'
			});
	}

};


// invoke the filepicker card
function invokeFilePicker(details, type) {
	blackberry.invoke.card.invokeFilePicker(details, function(path) {
		// image
		var title = "Share Image";
		var request = {
			action: 'bb.action.SHARE',
			uri: 'file://' + path,
			target_type: ["APPLICATION", "VIEWER", "CARD"]
		};
		loadShareCard(title, request);
	},

	// cancelled filepicker
	function(reason) {
		toast("cancelled " + reason);

		// filepicker error
	}, function(error) {
		if (error) {
			toast("invoke error " + error);
		} else {
			console.log("invoke success ");
		}
	});
}


// load the share card
function loadShareCard(title, request) {
	blackberry.invoke.card.invokeTargetPicker(request, title,

	// success
	function() {},

	// error
	function(e) {
	});
}


// display a toast message to the user
function toast(msg) {
	blackberry.ui.toast.show(msg);
}


