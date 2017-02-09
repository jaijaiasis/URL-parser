/**
 *  Parses the given URL into its different components.
 *
 *  TODO: Implement this function.
 *  NOTE: You may implement additional functions as you need, as long as this
 *    function behaves as specified in the instructions. Have fun! :)
 **/
function parse(url) {
	var string = decodeURIComponent(url);
	var scheme = "";
	var components = {
		scheme: "",
		authority: {
			username: null,
			password: null,
			host: null,
			port: null
		},
		path: "",
		query: {},
		fragment: null
	};

	components.scheme = string.slice(0, string.indexOf("/")-1); // get scheme

	var a = document.createElement("A"); // get data using anchor tag
	a.setAttribute("href", string);

	components.authority = getAuthority(a, components.scheme); // get authority subcomponents
	components.path = getPath(a.pathname); // get path
	components.query = getQuery(a.search); // get query string
	components.fragment = getFragment(string); // get fragment

	return components;
}

function getPath(path_name){
	while(path_name.includes("%20"))
		path_name = path_name.replace("%20"," ");
	return path_name;
}

function getAuthority(a, scheme){
	var authority = {
		username: null,
		password: null,
		host: null,
		port: null
	};

	authority.username = decodeURIComponent(a.username);
	authority.password = decodeURIComponent(a.password);
	if(authority.username == "" && authority.password == ""){
		authority.username = null;
		authority.password = null;
	}

	authority.host = decodeURIComponent(a.host);

	if (authority.host == ""){
		authority.host = null;
	}
	else if(authority.host.includes(":")){
		var x = authority.host.split(":")
		authority.host = x[0];
		authority.port = x[1];
	}
	else{
		if(scheme == "http")
			authority.port = "80";
		else if (scheme == "ftp")
			authority.port = "21";
		else if (scheme == "https")
			authority.port = "443";
	}

	return authority;
}

function getQuery(s){
	var query = {};
	var d;

	if(s.includes("?")){
		// get string after '?'
		s = s.substring(1, s.length);
		s = decodeURIComponent(s)

		// multiple queries
		if (s.includes("\&")){
			var data = s.split("\&");			
			for(var i = 0 ; i < data.length ; i++){
				var x = data[i].split("\=");
				query[x[0]] = x[1];
			}
		}
		// single query
		else { 
			var x = s.split("=");
			query[x[0]] = x[1];
		}
	}
	else
		query = null;

	return query;
}

function getFragment(str) {
	var fr = "";

	if(str.includes("#"))
		fr = str.substring(str.indexOf("#")+1, str.length);
	else
		fr = null;

	return fr;
}