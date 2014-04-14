import album.collection.Album

class BootStrap {

    def init = { servletContext ->

        // creating test data
        if (!Album.count()) {
            new Album(
                title   : "Magnetic",
                artist  : "Goo Goo Dolls",
                genre   : "Alternative Rock",
                year    : 2013 
            ).save(failOnError: true)

            new Album(
                title   : "The World from the Side of the Moon",
                artist  : "Phillip Phillips",
                genre   : "Singer Songwriter",
                year    : 2012 
            ).save(failOnError: true)

            new Album(
                title   : "Light Grenades",
                artist  : "Incubus",
                genre   : "Alternative Rock",
                year    : 2006 
            ).save(failOnError: true)
        }
    }
    def destroy = {
    }
}