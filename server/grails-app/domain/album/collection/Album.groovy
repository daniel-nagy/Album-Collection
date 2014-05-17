package album.collection

/* class for creating albums in a collection */

class Album {

  String    title
  String    artist
  String    genre
  String[]  tracks
  String    artwork
  Integer   year
  
  static constraints = {
    
    // only require the user to enter a unique title
    title blank: false, unique: true
    artist nullable: true
    genre nullable: true
    artwork nullable: true
    tracks nullable: true
    year nullable: true, min: 1889, max: 2014
  }
  
  // so hibernate doesn't complain about tracks column size
  static mapping = {
    
    tracks(column: "tracks", sqlType: "char", length: 1000)
  }
}