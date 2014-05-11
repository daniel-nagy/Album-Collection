package album.collection

/* class for creating albums in a collection */

class Album {

  String    title
  String    artist
  String    genre
  String[]  tracks 
  int       year
  
  static constraints = {
    
    // force the user to provide a unique title
    title(blank: false, unique: true)
    
    year(max: 2014)
  }
  
  // so hibernate doesn't complain about tracks column size
  static mapping = {
    
    tracks(column: "tracks", sqlType: "char", length: 1000)
  }
}