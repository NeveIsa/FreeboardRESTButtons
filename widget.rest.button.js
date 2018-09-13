//Freeboard.io Widget to create a simple button which fires a REST Events
//
//

function isa_guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  //return "isa";
  return s4() + s4() + s4();
  //return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

//alert(isa_guid());

(function()
{	
	var buttonWidget = function (settings) {
		var self = this;
		var currentSettings = settings;
		var uuid = isa_guid()

		if (typeof currentSettings.button_color === 'undefined') currentSettings["button_color"] = "green";
		if (typeof currentSettings.post_value === 'undefined') currentSettings["post_value"] = "";

		set_headers=""

		if (typeof currentSettings.headers !== 'undefined')
		{
			headers = JSON.parse(currentSettings.headers)
		
			for (h in headers)
			{
				set_headers += " xhttp.setRequestHeader('" + h + "', '" + headers[h] + "'); "
			}

			console.log(set_headers);
		}

		var myButton = $("<button type='button' id='button-" + uuid +  "' onclick='buttonFunction" + uuid + "()'>"+ currentSettings.button_name +"</button>");
		var myScript = $("<script>function buttonFunction" + uuid +  "() {var xhttp = new XMLHttpRequest(); xhttp.open('POST', '"+currentSettings.rest_path+"', true); " + set_headers  + " xhttp.send('" + currentSettings.post_value + "');}</script>");

			console.log(myScript.html());

		var isaCSS = $("<style> #button-" + uuid + " { background-color: " + currentSettings.button_color  + "; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; }</style>")
		//TODO: implement payload

		function updateState() {
			//TODO: implement changes and re-render button
			//
			//

		}

		this.render = function (containerElement) {
			$(containerElement).append(myButton);
			$(containerElement).append(myScript);
			$(containerElement).append(isaCSS);
		}		

		this.onSettingsChanged = function (newSettings) {
			currentSettings = newSettings;
			updateState();	
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
         // no input so no change ever :-)
     }

     this.onDispose = function () {
     }

     this.getHeight = function () {    
     	return 1;
     }

     this.onSettingsChanged(settings);
 };

 freeboard.loadWidgetPlugin({
 	type_name: "button_widget",
 	display_name: "POST Button Widget",
 	settings: [
 	{
 		name: "button_name",
 		display_name: "Button Name",
 		type: "text"
 	},{
 		name: "rest_path",
 		display_name: "REST Path (POST)",
 		type: "text"
 	},
 	{
 		name: "headers",
 		display_name: "Headers (optional) in JSON key value pairs",
 		type: "text"
 	},
 	{
 		name: "post_value",
 		display_name: "POST Value (optional)[no ' allowed]",
 		type: "text"
 	},
 	{
 		name: "button_color",
 		display_name: "Button Color (optional)",
 		type: "text"
 	}
 	],
 	newInstance: function (settings, newInstanceCallback) {
 		newInstanceCallback(new buttonWidget(settings));
 	}
 });
}());	
