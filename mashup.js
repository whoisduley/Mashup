var list = [];

getTags = function() {

	var request = new XMLHttpRequest();

	// Takes the article url from the input and glues it on the api request.
	var urlInput = document.getElementById('urlInput');
   	var theResource = 'http://api.diffbot.com/v3/article?token=538182bfa76b57bd13b874c35a0f3f47&fields=tags&url=' + urlInput.value;

   	request.open('GET', theResource , true)

   	request.onreadystatechange = function(){

	  	if (request.readyState == 4)   
	     	if (request.status == 200) {

				// Parses the JSON response into an objects
	        	var res = eval('(' + request.responseText + ')');

				// Takes the tags from the object and pushes them into an array.
				// http://json.parser.online.fr/
				var title = document.createElement('li');
				title.id = 'title';
				title.innerHTML = res.objects[0].title;
				var headings = document.getElementById('headings');
				headings.appendChild(title);

				var author = document.createElement('li');
				author.id = 'author';
				author.innerHTML = 'Author : ' + res.objects[0].author;
				headings.appendChild(author);

				var date = document.createElement('li');
				date.id = 'date';
				date.innerHTML = 'Date : ' + res.objects[0].date;
				headings.appendChild(date);

				var image = document.createElement('IMG');
				image.id = 'image';
				image.src = res.objects[0].images[0].url;
				headings.appendChild(image);


	        	for (var i = 0; i < 5; i++) {
	        		if (res.objects[0].tags[i]) {
		        		var a = res.objects[0].tags[i].label;
		        		list.push(a);
		        	}
		        	else {
		        		break;
		        	}
	        	}
	       		for (var j = 0; j < list.length; j++) {
	       			getInfo(list[j]);
	       		}
	        }
	}
	request.send(null)
}

getInfo = function(tag) {
	var request = new XMLHttpRequest();

	var query = tag;
	var theResource = 'http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?MaxHits=1&QueryString=' + query;

   	request.open('GET', theResource , true);
   	// Changes response from XML to JSON
   	request.setRequestHeader('Accept', 'application/json');
	request.send();

	request.onreadystatechange = function() {
		if (request.readyState == 4) 
			if(request.status == 200) {
			var res = eval('(' + request.responseText + ')');
			var item = document.createElement('li');
			item.class = 'items';

			var tags = document.createElement('li');
			tags.setAttribute("class", "tags");
			tags.innerHTML = tag;
			item.innerHTML = res.results[0].description;

			// var link = document.createElement('li');
			// link.setAttribute('class', 'links');
			// var read = 'Read More';
			// var URL = "http://www.w3schools.com/jsref/prop_html_innerhtml.asp";
			// read.link(URL);
			// link.innerHTML(read);
			//link.innerHTML = 'Read More';
			//link.href = 'http://www.w3schools.com/jsref/prop_html_innerhtml.asp';

			// var link = document.createTextNode('Read More');
			// var URL = "http://www.w3schools.com/jsref/prop_html_innerhtml.asp";
			// link.link(URL);


			var items = document.getElementById('items');
			items.appendChild(tags);
			items.appendChild(item);	
		}
	}
}
