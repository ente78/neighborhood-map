const ViewModel = function(){
    var self = this;
    this.myplaces = ko.observableArray([]);

    places.forEach(function(placeitem){
	self.myplaces.push(new place(placeitem));
        });

/*function myFunction() {
    // Declare variables
    
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}*/
}
	this.input = ko.computed(function(){
		var search = this.search().toLowerCase();
    	if (!search) {
        	return null;
    	} else {
        	return ko.utils.arrayFirst(this.filteredItems(), function(item) {
            	return ko.utils.stringStartsWith(item.name().toLowerCase(), search);
        });
	}; 
	})




    var place = function(data){
    this.name = ko.observable(data.name);
    this.id= ko.observable(data.id);
    this.type = ko.observable(data.type); 
    }


ko.applyBindings(new ViewModel()); 


