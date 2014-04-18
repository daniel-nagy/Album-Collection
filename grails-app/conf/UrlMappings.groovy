class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        
        // url mappings for creat and list
        "/album"(controller: "album"){
            action = [POST: "create", GET: "list"]
        }
        
		// url mappings for retrieve, update, and destroy
        "/album/$title"(controller: "album"){
        	action = [GET: "retrieve", PUT: "update", DELETE: "destroy"]
        }

        "/"(view:"/index")
        "500"(view:'/error')
	}
}
