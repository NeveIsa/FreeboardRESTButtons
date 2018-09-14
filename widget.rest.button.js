//Freeboard.io Widget to create a simple button which fires a REST POST Event to control a sensor
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

		
		// Automatically set httpbin.org path for testing
		//
		if (currentSettings.rest_path=="http://httpbin.org/_auto")
		{
			currentSettings.rest_path = "http://httpbin.org/" + currentSettings.http_verb.toLowerCase();
		}

		set_headers=""

		if (typeof currentSettings.headers !== 'undefined' && currentSettings.headers.length !=0 )
		{
			//headers = JSON.parse(currentSettings.headers)
			
			isa_headers = currentSettings.headers	
			
			for (index in isa_headers)
			{
				var name  = isa_headers[index].name;
				var value = isa_headers[index].value;

				set_headers += " xhttp.setRequestHeader('" + name + "', '" + value + "'); "
			}

			console.log(set_headers);
		}

		var myButton = $("<button type='button' id='button-" + uuid +  "' onclick='buttonFunction" + uuid + "()'>"+ currentSettings.button_name +"</button>");
		var myScript = $("<script>function buttonFunction" + uuid +  "() {var xhttp = new XMLHttpRequest(); xhttp.open('" + currentSettings.http_verb + "', '"+currentSettings.rest_path+"', true); " + set_headers  + " xhttp.send('" + currentSettings.post_value + "');}</script>");

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
 	display_name: "REST Button Widget",
 	settings: [
 	{
 		name: "button_name",
 		display_name: "Button Name",
 		type: "text",
		default_value: "Test httpbin.org"
 	},
	{
		name: "http_verb",
		display_name: "HTTP Method",
		type: "option",
		options : [ 
				{name:"GET",value:"GET"},
				{name:"POST",value:"POST"},
				{name:"PUT",value:"PUT"},
				{name:"DELETE",value:"DELETE"}
		]		
	},
	{
 		name: "rest_path",
 		display_name: "REST URL Path",
 		type: "text",
		default_value: "http://httpbin.org/_auto"
 	},
 	
	//{
 	//	name: "headers",
 	//	display_name: "Headers (optional) in JSON key value pairs",
 	//	type: "text",
	//	default_value: "{}"
	//	description: 'Example - {"Content-Type":"application/json","X-My-Header":"Whatever"}'
 	//},
	
	{
                name: "headers",
                display_name: "Headers",
                type: "array",
		description: "Note: single quotes(') are not allowed in headers",
                settings: [
				{
					name: "name",
					display_name: "Name",
					type: "text"
				},
				{
					name: "value",
					display_name: "Value",
					type: "text"
				}
                          ]
         },

 	{
 		name: "post_value",
 		display_name: "PUT/POST Value (optional)",
 		type: "text"
		description: "Note: single quotes(') are not allowed in headers",
 	},
 	{
 		name: "button_color",
 		display_name: "Button Color (optional)",
 		type: "text",
		default_value: "green"
 	}
 	],
 	newInstance: function (settings, newInstanceCallback) {
 		newInstanceCallback(new buttonWidget(settings));
 	}
 });
}());	
