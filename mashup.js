// 3 Columns, 3 tweets each, embed tweets not feed or collections
// Key:Secret
// njWdPM26IKC5fVwP9X7WLXQrk:oSgM4BfF3XdLdLAGci1Cz6bqgfi9ix3nUrhn55uetBhvjLVyN3
// Base64 Encoded
// bmpXZFBNMjZJS0M1ZlZ3UDlYN1dMWFFyazpvU2dNNEJmRjNYZExkTEFHY2kxQ3o2YnFnZmk5aXgzblVyaG41NXVldEJodmpMVnlOMw==

var list = [];

run = function() {

	var request = new XMLHttpRequest();

  	request.onreadystatechange = function(){

	  	if (request.readyState == 4)   //
	     	if (request.status == 200) {  //successful request OK
			
			// Parses the JSON response into an object
	        	var res = eval('(' + request.responseText + ')');
			
			// Takes the tags from the object and pushes them into an array.
			// http://json.parser.online.fr/
	        	for (var i = 0; i < 5; i++) {
	        		var a = res.objects[0].tags[i].label;
	        		list.push(a);
	        	}
	        }
	    console.log(list);
	}

	// Takes the article url from the input and glues it on the api request.
	var urlInput = document.getElementById('urlInput');
   	var theResource = 'http://api.diffbot.com/v3/article?token=538182bfa76b57bd13b874c35a0f3f47&fields=tags&url=' + urlInput.value;

   	request.open('GET', theResource , true)

	request.send(null)
}
