package album.collection

import grails.converters.JSON

class AlbumController {

    def create(){
        def album = new Album(params)
        album.save()
        render album as JSON
    }

    def list(){
        render Album.list() as JSON
    }
    
    def retrieve(){
        def album = Album.findByTitle(params.title)
        render album as JSON
    }
    
    def update(){
        def album = Album.findByTitle(params.title)
        album.properties = params
        album.save()
        render album as JSON
    }
    
    def destroy(){
        def album = Album.findByTitle(params.title)
        album.delete()
        render "album deleted"
    }
}