
// array with all 5 required places

var places = [{
        id: 'ChIJKyKVyeGOsUcRLG5WX_0h-84',
        name: 'here i work',
        location: {
            lat: 53.554072,
            lng: 10.003331,
        },
        type: 'work',
   
     
    },
    {
        id: ' ChIJnZksd-GOsUcRXy8G81NGKoY',
        name: 'nike',
        location: {
            lat: 53.552850,
            lng: 10.004842,
        },
        type: 'shopping',
       
   
    },
    {
        id: 'ChIJsZdNCeKOsUcReeo-KaQ5ed8',
        name: 'perle',
        location: {
            lat: 53.551670,
            lng: 9.999791, 
        },
        type: 'food',
        
             
    },
    {
        id: 'ChIJKyKVyeGOsUcRLG5WX_0h-84',
        name: 'jack jones ',
        location: {
            lat: 53.552315,
            lng: 10.003437,
        },
        type: 'clothes',
       
 

        },
    {
        id: ' ChIJU7knXByPsUcR-Na5tai2l8g',
        name: 'douglas',
        location: {
            lat: 53.552251,
            lng: 10.003797, 
        },
        type: 'shopping',
      

    },

];


var place = function(data){
    this.name = ko.observable(data.name);
    this.id= ko.observable(data.id);
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

}; 

	this.markerbounce = function() {  	
 	 self.animate(marker);  
};

   // self.input = ko.observable("");

   
/*
    this.search = ko.computed(function(){
	    var filter = self.input().toLowerCase();
   		 return ko.utils.arrayFilter(places, function(marker) {
   			 if (marker.title.toLowerCase().indexOf(filter) > -1) {
         		 return marker.setVisible(true);
     	 } else {
         		 return marker.setVisible(false);
    	  }
   		 });
	}, this);
*/ 



/*

If you wish to just to hide/show the marker you could use the setVisible method of of the marker like:

 start_marker.setVisible(false);//to hide
 start_marker.setVisible(true);//to show

 */

ko.applyBindings(new ViewModel()); 




