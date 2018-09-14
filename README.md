# FreeboardRESTButtons:  Freeboard widget for making REST requests

### Install Steps for Linux/Mac
 
 - Via script - copy and run the command below
 ```bash
	git clone https://github.com/NeveIsa/FreeboardRESTButtons.git ; cd FreeboardRESTButtons ; ./start` 
 ```

 - Manual
 1. Clone this repo.
 2. Run make (OR if you don't have make installed, just run ./start).

### Install steps for Windows
 1. Coming soon.



### Usage
 1. Add a new pane in freeboard dash (+ sign).
 2. In the newly created pane, add a widget (+ sign)
 3. In the drop down menu, select REST Button Widget.
 4. Fill in the REST request details  (for testing on http://httpbin.org, just accept the defaults and just select the correct HTTP Method)

### Debugging response / requests
 1. As of now, the request and responses can be viewed in your browser's "Developer Window/Panel" under "Network" tab.
 2. Display status of response on the widget is updated after every request.

## NOTES:
  1. Editing of created buttons is not supported as of now. Create a new button instead of editiing.
  2. Single quotes, (i.e ') are not supported in headers and body of request. Will be fixed in next update.
