import album.collection.Album

class BootStrap {

    def init = { servletContext ->

        /* creating test data */
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
            new Album(
                title   : "I-Empire",
                artist  : "Angels & Airwaves",
                genre   : "Progressive Rock",
                year    : 2007
            ).save(failOnError: true)
            
            new Album(
                title   : "Megalithic Symphony",
                artist  : "Awolnation",
                genre   : "Electronic Rock",
                year    : 2011
            ).save(failOnError: true)
            
            new Album(
                title   : "Night Visions",
                artist  : "Imagine Dragons",
                genre   : "Alternative Rock",
                year    : 2012
            ).save(failOnError: true)
            new Album(
                title   : "Ocean Avenue",
                artist  : "Yellowcard",
                genre   : "Pop Punk",
                year    : 2003
            ).save(failOnError: true)
            
            new Album(
                title   : "Science & Faith",
                artist  : "The Script",
                genre   : "Alternative Rock",
                year    : 2010
            ).save(failOnError: true)
            
            new Album(
                title   : "Endgame",
                artist  : "Rise Against",
                genre   : "Melodic Hardcore",
                year    : 2011
            ).save(failOnError: true)
            new Album(
                title   : "Too Weird To Live, Too Rare To Die!",
                artist  : "Panic! At The Disco",
                genre   : "Synthpop",
                year    : 2013
            ).save(failOnError: true)
            
            new Album(
                title   : "Native",
                artist  : "OneRepublic",
                genre   : "Progressive Rock",
                year    : 2013
            ).save(failOnError: true)
            
            new Album(
                title   : "Rise And Fall, Rage And Grace",
                artist  : "The Offspring",
                genre   : "Punk Rock",
                year    : 2008
            ).save(failOnError: true)
        }
    }
    def destroy = {
    }
}