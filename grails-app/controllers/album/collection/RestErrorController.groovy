package album.collection

/* create JSON objects */
import grails.converters.JSON

/* enumeration of HTTP status codes */
import org.springframework.http.HttpStatus

/**
 * Handles errors encountered while preforming CRUD operations.
 */
 
class RestErrorController{

    /**
     * If LIST is invoked on an empty collection.
     */
    
    private void EmptyCollectionException() {
        response.status = HttpStatus.NOT_FOUND.value
        def error = new RestError(
            status              : "404 NOT_FOUND",
            userMessage         : "Your collection is empty.",
            developerMessage    : "No resource at /album/",
            exception           : "EmptyCollectionException"
        )
        render error as JSON
    }
    
    /**
     * If GET is invoked on an album that does not exist.
     *
     * @param title  The title of the album attempting to be accessed.
     */
    
    private void AlbumDoesNotExistException(String title) {
        response.status = HttpStatus.NOT_FOUND.value
        def error = new RestError(
            status              : "404 NOT_FOUND",
            userMessage         : "The album ${title} does not exist in your collection.",
            developerMessage    : "No resource at /album/${title}.",
            exception           : "AlbumDoesNotExistException"
        )
        render error as JSON
    }

    /**
     * If POST is invoked on an album that already exists.
     *
     * @param title  The title of the album attempting to be created.
     */
    
    private void UniqueAlbumException(String title) {
        response.status = HttpStatus.CONFLICT.value
        def error = new RestError(
            status              : "409 CONFLICT",
            userMessage         : "The album ${title} already exists in your collection.",
            developerMessage    : "Validation failed, unique index or primary key violation.",
            exception           : "UniqueAlbumException"
        )
        render error as JSON
    }
    
    /**
     * If POST is invoked on an album that does not have a title.
     */

    private void AbsentTitleException() {
        response.status = HttpStatus.FORBIDDEN.value
        def error = new RestError(
            status              : "403 FORBIDDEN",
            userMessage         : "Your album has no title.",
            developerMessage    : "Validation failed, unique index or primary key violation.",
            exception           : "AbsentTitleException"
        )
        render error as JSON
    }
    
    /**
     * If POST or PUT fail to write to the database.
     *
     * @param title  The title of the album attempting to be saved
     */

    private void AlbumWriteException(String title) {
        response.status = HttpStatus.SERVICE_UNAVAILABLE.value
        def error = new RestError(
            status              : "503 SERVICE_UNAVAILABLE",
            userMessage         : "The album ${title} was unable to be saved.",
            developerMessage    : "Service unavailable, unable to write to database.",
            exception           : "AlbumWriteException"
        )
        render error as JSON
    }
    
    /**
     * If DELETE fails because the client is out of sync with the database.
     *
     * @param exception     The exception thrown
     */

    private void DataIntegrityViolationException() {
        response.status = HttpStatus.CONFLICT.value
        def error = new RestError(
            status              : "409 CONFLICT",
            userMessage         : "This session is out of sync with your collection.",
            developerMessage    : "Could not synchronize database state with session.",
            exception           : "org.hibernate.StaleObjectStateException"
        )
        render error as JSON
    }
}
