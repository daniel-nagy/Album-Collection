package album.collection

/* class for creating REST errors to send back to the client */

public class RestError {

  String  status
  String  userMessage
  String  developerMessage
  String  exception
  
  /* 
   * The following is unessecary becuase the access 
   * control is set to public, this is just practice
   * with the syntax.
   */
  
  // default constructor
  public RestError() {}
  
  // constructor
  public RestError(String status, String userMessage, String developerMessage, String exception) {
    this.status             = status
    this.userMessage        = userMessage
    this.developerMessage   = developerMessage
    this.exception          = exception
  }
  
  // mutators
  public void setStatus(String status) {
    this.status = status
  }
  
  public void setUserMessage(String userMessage) {
    this.userMessage = userMessage
  }
  
  public void setDeveloperMessage(String developerMessage) {
    this.developerMessage = developerMessage
  }
  
  public void setException(String exception) {
    this.exception = exception
  }
  
  // accessors
  public String getStatus() {
    return this.status
  }
  
  public String getUserMessage() {
    return this.userMessage
  }
  
  public String getDeveloperMessage() {
    return this.developerMessage
  }
  
  public String getException() {
    return this.exception
  }
}
