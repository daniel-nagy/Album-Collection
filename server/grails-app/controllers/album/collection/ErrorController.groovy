package album.collection

// create JSON objects
import grails.converters.JSON

// enumeration of HTTP status codes
import org.springframework.http.HttpStatus

/* handles generic error messages */

class ErrorController {

  /* generic 404 error */
  
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
  
  /* generic 500 error */
  
  def error500() {
    
    def exception = request.exception?.cause?.message ?: "Unknown exception thrown"
    
    def error = new RestError(
      status              : "500 INTERNAL_SERVER_ERROR",
      userMessage         : "You broke the internet.",
      developerMessage    : "The server encountered an unexpected condition.",
      exception           : exception
    )
    render error as JSON
  }
  
}
