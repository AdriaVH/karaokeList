
const { Song } = require("../model/index")
const getSongs = (request, response) => {

    try {
        Song.getAll().then((data) => {
            response.status(200).send(data[0])
        })
            .catch((err) => response.status(400).send(err))
    } catch (err) {
        response.status(500).send("SERVER ERROR")
    }
}
const getSongById = (request, response) => {

    try {
        const { id } = request.params

        Song.getById(id).then((data) => {

            response.status(200).send(data[0])
        })
            .catch((err) => response.status(400).send(err))
    }catch (err) {
        response.status(500).send("SERVER ERROR")
}
}
const updateSelectedById= (request, response)=>{
    try{
        const { id } = request.params
        const { Id, Artist, Title, Language, Edition, Year, SongPath, Selected, TimeStamp } = request.body
        const newSong = new Song(Id, Artist, Title, Language, Edition, Year, SongPath, Selected, TimeStamp)
        newSong.updateSelected(id).then((data) => {
            response.status(200).send({ data: newSong
             })
        }).catch((err) => response.status(400).send(err))
    }catch(err){
        response.status(500).send(err)
    }
}


module.exports = {
    getSongs,
    getSongById,
    updateSelectedById
}