var list = [];

run = function() {

	var request = new XMLHttpRequest();

  	request.onreadystatechange = function(){

	  	if (request.readyState == 4)   //
	     	if (request.status == 200) {  //successful request OK

	        	var res = eval('(' + request.responseText + ')');

	        	// var tags = res['tags'];
	        	// alert(tags);

	        	for (var i = 0; i < 5; i++) {
	        		var a = res.objects[0].tags[i].label;
	        		list.push(a);
	        	}
	        }
	    console.log(list);
	}

	var urlInput = document.getElementById('urlInput');
   	var theResource = 'http://api.diffbot.com/v3/article?token=538182bfa76b57bd13b874c35a0f3f47&fields=tags&url=' + urlInput.value;

   	request.open('GET', theResource , true)

	//request.open('GET','urlread.cgi',true)

	request.send(null)
}