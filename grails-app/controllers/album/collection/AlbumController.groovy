package album.collection

// create JSON objects
import grails.converters.JSON

class AlbumController {
    
    // **********************************************************************************
    // album not found
    
    private def sendNotFoundResponse(){
        response.status = 404
        def error = "The album ${params.title} was not found."
        render error
    }
    
    // **********************************************************************************
    // validation failed
    
    private def sendValidationFailedResponse(){
        response.status = 403
        def error
        if(params.title){
            error = "The album ${params.title} already exists in your colllection."
        }
        else{
            error = "Your album has no title"
        }
        render error
    }
    
    // **********************************************************************************
    // save failed
    
    private def sendSaveFailedResponse(){
        response.status = 500
        def error = "The album ${params.title} can not be saved."
        render error
    }
    
    // **********************************************************************************
    // add an album
    
    def create(){
        def album = new Album(params)
        if(album.validate()){
            if(album.save(flush: true)){
                response.status = 200
                render album as JSON
            }
            else{
                sendSaveFailedResponse()
            }
        }
        else{
            sendValidationFailedResponse()
        }
    }
    
    // **********************************************************************************
    // list all albums
    
    def list(){
        if(!Album.count()){
            response.status = 404
            def error = "No albums in your colection."
            render error
        }
        else{
            response.status = 200
            render Album.list() as JSON
        }
    }
    
    // **********************************************************************************
    // find an album
    
    def retrieve(){
        def album = Album.findByTitle(params.title)
        if(album){
            response.status = 200
            render album as JSON
        }
        else{
            sendNotFoundResponse()
        }
    }
    
    // **********************************************************************************
    // update an album
    
    def update(){
        def album = Album.findByTitle(params.title)
        if(album){
            album.properties = params
            if(album.validate()){
                if(album.save(flush: true)){
                    response.status = 200
                    render album as JSON
                }
                else{
                    sendSaveFailedResponse()
                }
            }
            else{
                sendValidationFailedResponse()
            }
        }
        else{
            sendNotFoundResponse()
        }
    }
    
    // **********************************************************************************
    // remove an album
    
    def destroy(){
        def album = Album.findByTitle(params.title)
        if(album){
            try{
                album.delete(flush: true)
                response.status = 204
            }
            catch(Exception exception){
                response.status = 403
                def error = "The album ${params.title} could not be removed"
                render error
            }
        }
        else{
            sendNotFoundResponse()
        }
    }
}
