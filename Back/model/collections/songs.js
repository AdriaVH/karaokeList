const db=require('../../config/database')

module.exports=class Song{
    constructor(Id, Artist, Title, Language, Edition, Year, SongPath, Selected, TimeStamp){
        this.Id=Id,
        this.Artist=Artist,
        this.Title=Title,
        this.Language=Language,
        this.Edition=Edition,
        this.Year=Year,
        this.SongPath=SongPath,
        this.Selected=Selected,
        this.TimeStamp=TimeStamp

    }
    static getById(Id) {
        return db.execute(`SELECT * FROM karaoke_list WHERE karaoke_list.Id=${Id}`)
    }
    static getAll() {
        return db.execute(`SELECT * FROM karaoke_list`)

    }
     updateSelected(Id){
  
            return db.execute(`UPDATE karaoke_list SET Selected=${this.Selected}, TimeStamp="${this.TimeStamp}" WHERE Id=${Id}`)
    
        
    }

}