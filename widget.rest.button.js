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

		responseDivID="response_" + uuid;
		
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

		var myButton = $("<button class='isa_rest_button' type='button' id='button-" + uuid +  "' onclick='buttonFunction" + uuid + "()'>"+ currentSettings.button_name +"</button>");


		
		status_text = Date().substring(15,25) +  ": status"
		var isaResponseDiv = $("<p class='isa_rest_response' style='background:black;' id='" + responseDivID + "'>" + status_text  + "</p>")

		sending_status = `$('#${responseDivID}').html("Sending...");`

		if(currentSettings.include_timestamp) 
		{
			function post_value_with_timestamp()
			{
					if (currentSettings.post_value.length===0)
					{
						currentSettings["post_value"]='{}';
					}

					var jtemp=JSON.parse(currentSettings.post_value);

					jtemp["timestamp"] = new Date().toJSON();

					currentSettings["post_value"] = JSON.stringify(jtemp);
					
					console.log(currentSettings.post_value);

					return currentSettings.post_value;
			}

		}
		else
		{
			function post_value_with_timestamp()
			{
				return currentSettings.post_value; 
			}
		}	

		eval("post_value_with_timestamp_" + uuid + " = post_value_with_timestamp"); // create a copy of the function


		//var myScript = $("<script>function buttonFunction" + uuid +  "() {" + sending_status  + "var xhttp = new XMLHttpRequest(); xhttp.open('" + currentSettings.http_verb + "', '"+currentSettings.rest_path+"', false); " + set_headers  + " xhttp.send('" + currentSettings.post_value + "');  $('#" + responseDivID  + "').html(Date() + ' </br> HTTP_STATUS: '  + xhttp.status ); console.log(xhttp.response)  }</script>");
		
		var myScript = $("<script>function buttonFunction" + uuid +  "() {" + sending_status  + "var xhttp = new XMLHttpRequest(); xhttp.open('" + currentSettings.http_verb + "', '"+currentSettings.rest_path+"', false); " + set_headers  + " xhttp.send(" + "post_value_with_timestamp_" + uuid + "()"  + ");  $('#" + responseDivID  + "').html(Date() + ' </br> HTTP_STATUS: '  + xhttp.status ); console.log(xhttp.response)  }</script>");

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
			$(containerElement).append(isaResponseDiv);
			$(containerElement).append(myScript);
			$(containerElement).append(isaCSS);
			freeboard.addStyle('.isa_rest_button','width: 100%; height:50%; float:left')
			freeboard.addStyle('.isa_rest_response','width: 100%; height:50%; float:right;')
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


		
    // ISA --> for proper height - http://freeboard.github.io/freeboard/docs/plugin_example.html 
     this.getHeight = function () {    
     	return 2;
     }

     this.onSettingsChanged(settings);
 };

 freeboard.loadWidgetPlugin({
 	type_name: "button_widget",
 	display_name: "REST Button Widget",
	fill_size: false,
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
		description: "Note: single quotes are not allowed in headers",
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
 		type: "text",
		description: "Note: single quotes are not allowed in body",
 	},
 	{
 		name: "include_timestamp",
 		display_name: "Include Timestamp (optional)",
 		type: "boolean"
		//default_value: "green"
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
