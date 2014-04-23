package album.collection


/** 
 * Class for creating albums in a collection.
 */

class Album {
    String  title
    String  artist
    String  genre
    int     year

    static constraints = {
        
        /* force the user to provide a unique title */
        title(blank: false, unique: true)
    }
}