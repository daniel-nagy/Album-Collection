class UrlMappings {

	static mappings = {
    "/$controller/$action?/$id?(.$format)?" {
      constraints {
        // apply constraints here
      }
    }
    
    /* url mappings for POST and GET */
    "/album"(controller: "album") {
      action = [POST: "create", GET: "list"]
    }
    
    /* url mappings for GET, PUT, and DELETE */
    "/album/$title"(controller: "album") {
      action = [GET: "retrieve", PUT: "update", DELETE: "destroy"]
    }
    
    "/"(view:"/index")
    
    /* generate a generic 404 error */
    "404"(controller: "error", action: "error404")
    
    /* generate a generic 500 error */
    "500"(controller: "error", action: "error500")
	}
}
