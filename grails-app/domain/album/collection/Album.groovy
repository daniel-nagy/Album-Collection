package album.collection

/** 
 * Class for creating albums in a collection.
 */

class Album {
  String    title
  String    artist
  String    genre
  String[]  tracks
  int       year
  
  static constraints = {
    
    /* force the user to provide a unique title */
    title(blank: false, unique: true)
    
    year(max: 2014)
  }
}