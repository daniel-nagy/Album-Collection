package album.collection

//********************************************
// class for creating albums in a collection

class Album {
    String  title
    String  artist
    String  genre
    int     year

    static constraints = {

        // force the user to provide a title
        title(blank: false, unique: true)
    }
}