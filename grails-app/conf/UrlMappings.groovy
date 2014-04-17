class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        
        // CRUD
        "/album"(controller: "album"){
            action = [POST: "create", GET: "list"]
        }

        "/album/$title"(controller: "album"){
        	action = [GET: "retrieve", PUT: "update", DELETE: "destroy"]
        }

        "/"(view:"/index")
        "500"(view:'/error')
	}
}
