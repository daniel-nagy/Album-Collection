import album.collection.Album

class BootStrap {

  def init = { servletContext ->
    
    /* creating test data */
    if (!Album.count()) {
      new Album(
        title   : "Magnetic",
        artist  : "Goo Goo Dolls",
        genre   : "Alternative Rock",
        tracks  : [
          "Rebel Beat",
          "When the World Breaks Your Heart",
          "Slow It Down",
          "Caught in the Storm",
          "Come to Me",
          "Bring on the Light",
          "More of You",
          "Bulletproofangel",
          "Last Hot Night",
          "Happiest of Days",
          "Keep the Car Running"
        ],
        year    : 2013
      ).save(failOnError: true)
      
      new Album(
        title   : "The World from the Side of the Moon",
        artist  : "Phillip Phillips",
        genre   : "Singer Songwriter",
        tracks  : [
          "Man on the Moon",
          "Home",
          "Gone, Gone, Gone",
          "Hold on",
          "Tell Me a Story",
          "Get Up Get Down",
          "Where We Came From",
          "Drive Me",
          "Wanted is Love",
          "Can't Go Wrong",
          "A Fool's Dance",
          "So Easy"
        ],
        year    : 2012
      ).save(failOnError: true)
      
      new Album(
        title   : "Light Grenades",
        artist  : "Incubus",
        genre   : "Alternative Rock",
        tracks  : [
          // "Quicksand",
          // "A Kiss to Send Us Off",
          // "Dig",
          // "Anna Molly",
          // "Love Hurts",
          // "Light Grenades",
          // "Earth to Bella (Part I)",
          // "Oil and Water",
          // "Diamonds and Coal",
          // "Rogues",
          // "Paper Shoes",
          // "Pendulous Threads",
          // "Earth to Bella (Part II)",
          // "Punchdrunk",
          // "Look Alive"
        ],
        year    : 2006
      ).save(failOnError: true)
      
      new Album(
        title   : "I-Empire",
        artist  : "Angels & Airwaves",
        genre   : "Progressive Rock",
        tracks  : [
          "Call to Arms",
          "Everything's Magic",
          "Breathe",
          "Love Like Rockets",
          "Sirens",
          "Secrete Crowds",
          "Star of Bethlehem",
          "True Love",
          "Lifeline",
          "Jumping Rooftops",
          "Rite of Spring",
          "Heaven"
        ],
        year    : 2007
      ).save(failOnError: true)
      
      new Album(
        title   : "Megalithic Symphony",
        artist  : "Awolnation",
        genre   : "Electronic Rock",
        tracks  : [
          // "Megalithic Symphony",
          // "Some Sort of Creature",
          // "Soul Wars",
          // "Jumping on My Shoulders",
          // "Burn It Down",
          // "Guilty Filthy Soul",
          // "Kill Your Heroes",
          // "My Nightmare's Dream",
          // "Sail",
          // "Wake Up",
          // "Not Your Fault",
          // "All I Need",
          // "Knights of Shame"
        ],
        year    : 2011
      ).save(failOnError: true)
      
      new Album(
        title   : "Night Visions",
        artist  : "Imagine Dragons",
        genre   : "Alternative Rock",
        tracks  : [
          "Radioactive",
          "Tiptoe",
          "It's Time",
          "Demons",
          "On Top of the World",
          "Amsterdam",
          "Hear Me",
          "Every Night",
          "Bleeding Out",
          "Underdog",
          "Nothing Left to Say"
        ],
        year    : 2012
      ).save(failOnError: true)
      
      new Album(
        title   : "Ocean Avenue",
        artist  : "Yellowcard",
        genre   : "Pop Punk",
        tracks  : [
          "Way Away",
          "Breathing",
          "Ocean Avenue",
          "Empty Apartment",
          "Life of a Salesman",
          "Only One",
          "Mile Apart",
          "Twentythree",
          "View from Heaven",
          "Inside Out",
          "believe",
          "One Year, Six Months",
          "Back Home"
        ],
        year    : 2003
      ).save(failOnError: true)
      
      new Album(
        title   : "Science & Faith",
        artist  : "The Script",
        genre   : "Alternative Rock",
        tracks  : [
          "You Won't Feel a Thing",
          "For the First Time",
          "Nothing",
          "Science & Faith",
          "If You Ever Come Back",
          "Long Gone and Moved on",
          "Dead Man Walking",
          "This = Love",
          "Walk Away",
          "Exit Wounds"
        ],
        year    : 2010
      ).save(failOnError: true)
      
      new Album(
        title   : "Endgame",
        artist  : "Rise Against",
        genre   : "Melodic Hardcore",
        tracks  : [
          // "Architects",
          // "Help is on the Way",
          // "Make it Stop (September's Children)",
          // "Disparity by Design",
          // "Satellite",
          // "Midnight Hands",
          // "Survivor Guilt",
          // "Broken Mirrors",
          // "Wait for Me",
          // "A Gentlemen's Coup",
          // "This is Letting Go",
          // "Endgame"
        ],
        year    : 2011
      ).save(failOnError: true)
      
      new Album(
        title   : "Too Weird To Live, Too Rare To Die!",
        artist  : "Panic! At The Disco",
        genre   : "Synthpop",
        tracks  : [
          // "This is Gospel",
          // "Miss Jackson (feat. Lolo)",
          // "Vegas Lights",
          // "Girl that You Love",
          // "Nicotine",
          // "Girls/Girls/Boys",
          // "Casual Affair",
          // "Far too Young to Die",
          // "Collar Full",
          // "The End of All Things",
          // "Can't Fight Against the Youth (Bonus Track)",
          // "All the Boys (Bonus Track)"
        ],
        year    : 2013
      ).save(failOnError: true)
      
      new Album(
        title   : "Native",
        artist  : "OneRepublic",
        genre   : "Progressive Rock",
        tracks  : [
          // "Counting Stars",
          // "If I Lose Myself",
          // "Feel Again",
          // "What You Wanted",
          // "I Lived",
          // "Light It Up",
          // "Can't Stop",
          // "Au Revoir",
          // "Burning Bridges",
          // "Something I Need",
          // "Preacher",
          // "Don't Look Down",
          // "Somethings Gotta Give",
          // "Life in Color"
        ],
        year    : 2013
      ).save(failOnError: true)
      
      new Album(
        title   : "Rise And Fall, Rage And Grace",
        artist  : "The Offspring",
        genre   : "Punk Rock",
        tracks  : [
          // "Half-Truism",
          // "Trust in You",
          // "You're Gonna Go Far, Kid",
          // "Hammerhead",
          // "A Lot Like Me",
          // "Takes Me Nowhere",
          // "Kristy, Are You Doing Okay?",
          // "Nothingtown",
          // "Stuff is Messed Up",
          // "Fix You",
          // "Let's Hear it for Rock Bottom",
          // "Rise and Fall"
        ],
        year    : 2008
      ).save(failOnError: true)
    }
  }
  
  def destroy = {
  }
}