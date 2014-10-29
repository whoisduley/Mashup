// 3 Columns, 3 tweets each, embed tweets not feed or collections
// Key:Secret
// njWdPM26IKC5fVwP9X7WLXQrk:oSgM4BfF3XdLdLAGci1Cz6bqgfi9ix3nUrhn55uetBhvjLVyN3
// Base64 Encoded
// bmpXZFBNMjZJS0M1ZlZ3UDlYN1dMWFFyazpvU2dNNEJmRjNYZExkTEFHY2kxQ3o2YnFnZmk5aXgzblVyaG41NXVldEJodmpMVnlOMw==

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

	     		console.log(request.responseText);

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

	        	for (var i = 0; i < 5; i++) {
	        		var a = res.objects[0].tags[i].label;
	        		list.push(a);
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
			item.innerHTML = tag + ' : ' + res.results[0].description;
			var items = document.getElementById('items');
			items.appendChild(item);
		}
	}
}


// getTweets = function(tag) {
// 	var request = new XMLHttpRequest();

// 	var query = tag;
// 	var theResource = 'https://api.twitter.com/1.1/search/tweets.json?q=corgi&callback=myCallback';

// 	request.open('GET', theResource, true);
// 	request.setRequestHeader();
// 	request.send();
// }

// myCallback = function(data) {
// 	console.log('ijij');
// 	var text = '';
// 	var len = data.length;
// 	for (var i = 0; i < len; i++) {
// 		console.log(data[i]);
// 	}
// }