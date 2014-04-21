package album.collection

/* create JSON objects */
import grails.converters.JSON

/* enumeration of HTTP status codes */
import org.springframework.http.HttpStatus

/**
 * Here is were we can handel generic error messages
 */ 

class ErrorController {

    /**
     * Generic 404 error. 
     */
    
    def error404() { 
        def exception = request.exception?.cause?.message ?: "Unknown exception thrown"
        def error = new RestError(
            status              : "404 NOT_FOUND",
            userMessage         : "Are you in the right place?.",
            developerMessage    : "Unobtainable resource.",
            exception           : exception
        )
        render error as JSON
    }
    
    /**
     * Generic 500 error. Your guess is as good as mine.
     */
    
    def error500() {
        def exception = request.exception?.cause?.message ?: "Unknown exception thrown"
        def error = new RestError(
            status              : "500 INTERNAL_SERVER_ERROR",
            userMessage         : "You broke the internet.",
            developerMessage    : "Who the hell knows?",
            exception           : exception
        )
        render error as JSON
    }
}
