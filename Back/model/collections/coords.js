const db=require('../../config/database')

module.exports=class Coords{
    constructor(Letter, Coords){
        this.Letter=Letter,
        this.Coords=Coords
    }

    static getAll() {
        return db.execute(`SELECT * FROM coords`)

    }

}