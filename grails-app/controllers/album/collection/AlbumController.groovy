package album.collection

/* create JSON objects */
import grails.converters.JSON

/* enumeration of HTTP status codes. */
import org.springframework.http.HttpStatus

/* catch database exceptions */
import org.springframework.dao.DataIntegrityViolationException

/**
 * Handles CRUD opperations invoked by REST calls from the client.
 * <p>
 * If you are referencing this file please realize this is a work
 * in progress and is not bulletproof and can be improved.
 */

class AlbumController {
    
    /* Creating an instance of the RestErrorController class. */
    def exception = new RestErrorController()
    
    /**
     * Creates an album in a users collection.
     */
    
    def create(){
        def album = new Album(params)
        if(album.validate()){
            if(album.save(flush: true)){
                response.status = HttpStatus.OK.value
                render album as JSON
            }
            else
                exception.AlbumWriteException("${params.title}")
        }
        else{
            if(params.title)
                exception.UniqueAlbumException("${params.title}")
            
            exception.AbsentTitleException()
        }
    }
    
    /**
     * Lists all the albums in a users collection.
     */
    
    def list(){
        if(!Album.count())
            exception.EmptyCollectionException()
        
        else{
            response.status = HttpStatus.OK.value
            render Album.list() as JSON
        }
    }
    
    /**
     * Retrieves an album in a users collection
     */
    
    def retrieve(){
        def album = Album.findByTitle(params.title)
        
        if(album){
            response.status = HttpStatus.OK.value
            render album as JSON
        }
        else
            exception.AlbumDoesNotExistException("${params.title}")
    }
    
    /**
     * Updates an album in a users collection
     */
    
    def update(){
        def album = Album.findByTitle(params.title)
        
        if(album){
            album.properties = params
            
            if(album.save(flush: true)){
                response.status = HttpStatus.OK.value
                render album as JSON
            }
            else
                exception.AlbumWriteException("${params.title}")
        }
        else
            exception.AlbumDoesNotExistException("${params.title}")
    }
    
    /**
     * Removes an album in a users collection
     *
     * @throws DataIntegrityViolationException   Unable to synchronize
     *                                           with the database.
     */
    
    def destroy(){
        def album = Album.findByTitle(params.title)
        
        if(album){
            try {
                album.delete(flush: true)
                album.delete(flush: true)
                response.status = HttpStatus.NO_CONTENT.value
                render ""
            }
            catch(DataIntegrityViolationException){
                exception.DataIntegrityViolationException()
            }
        }
        else
            exception.AlbumDoesNotExistException("${params.title}")
    }
}
