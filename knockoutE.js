

// array with all 5 required places

var places = [{
        id: 0,
        name: 'Cremer Group',
        location: {
            lat: 53.554072,
            lng: 10.003331,
        },
        type: 'work',  
     
    },
    {
        id: 1,
        name: 'nike',
        location: {
            lat: 53.552850,
            lng: 10.004842,
        },
        type: 'shopping',      
   
    },
    {
        id: 2,
        name: 'perle',
        location: {
            lat: 53.551670,
            lng: 9.999791, 
        },
        type: 'food',       
             
    },
    {
        id: 3,
        name: 'jack jones ',
        location: {
            lat: 53.552315,
            lng: 10.003437,
        },
        type: 'clothes',   

        },
    {
        id: 4,
        name: 'douglas',
        location: {
            lat: 53.552251,
            lng: 10.003797, 
        },
        type: 'shopping',     

    },

];

var markers=[];




function toggleBounce(marker) {
    	marker.setAnimation(google.maps.Animation.BOUNCE);
    	setTimeout(function(){ marker.setAnimation(null); }, 750);
    }  


function initMap() {
 	

     // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.5528124, lng: 10.0047905},
        zoom: 15        
    });
	

        // Style the markers a bit. This will be our listing marker icon.
        var defaultIcon = makeMarkerIcon('0091ff');

        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = makeMarkerIcon('FFFF24');


     var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < places.length; i++) {
          // Get the position from the location array.
          var position = places[i].location;

          var title = places[i].name;
          var id = places[i].id; 
          console.log(title);
          console.log(id);
          console.log(position); 

          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            icon: defaultIcon, 
            animation: google.maps.Animation.DROP,
            id: id
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          viewModel.myplaces()[i].marker= marker; 
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow); 
           });

          marker.addListener('click', function(){
            toggleBounce(this); 
          }); 

        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
           this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
           this.setIcon(defaultIcon);
          });


          bounds.extend(markers[i].position);
        }
        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
      }



    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
          return markerImage;
    }

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.

      function populateInfoWindow(marker, infowindow,content) {
      	getWiki(marker); 
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          console.log(marker.title);
          console.log(content); 
          infowindow.setContent('<div>' + marker.title+ "  " + content + '</div>');
          infowindow.open(map, marker,content);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;

          });
    };
}
   
 
 // from the ajax course. this function shall get the wiki articles for the marker.  
		function getWiki(marker, infowindow){

			var content = "<ul>"; 
  			var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';

  		 var wikiRequestTimeout = setTimeout(function(){
     	  	alert("failed to get wiki");
   		 },8000);

   		 $.ajax({
    		 url : wikiUrl, 
       		 dataType: "jsonp",
       		 // sjonp: "callback"
        		success: function (response){
            		var articleList = response [1];

            		for (var i = 0; i < articleList.length; i++) {
              		  	articleStr = articleList [i];
               			var url = 'http://en.wikipedia.org/wiki/' + articleStr;
               		 	content+= ('<li><a ' + url + '">' + articleStr + '</a></li>'); 
           		 }

           			clearTimeout(wikiRequestTimeout); 
						infowindow.setContent('<div>' + content + '</div>'); 
       					
       	 } 

   	 });  
   	 return false; 
   	 }



 

var place = function(data){
    this.name = ko.observable(data.name);
    this.id = (data.id);
    this.type = ko.observable(data.type); 
    //this.input = ko.observable("");
    //this marker =ko.observableArray([data.marker]); 
    //this.inputfilter = ko.observableArray([]);   
    }; 


var ViewModel = function(){
    var self = this;
    self.myplaces = ko.observableArray([]);


    places.forEach(function(placeitem){
		self.myplaces.push(new place(placeitem));
    });
    
    self.currentplace= ko.observable(self.myplaces()[0]); 
	
	self.markerbounce = function(place) {  
		console.log(place)
		toggleBounce(markers[place.id]);
	};


 

}; 
var viewModel = new ViewModel(); 

ko.applyBindings(viewModel); 

