const { Coords } = require("../model/index")
const getCoords = (request, response) => {

    try {
        Coords.getAll().then((data) => {
            response.status(200).send(data[0])
        })
            .catch((err) => response.status(400).send(err))
    } catch (err) {
        response.status(500).send("SERVER ERROR")
    }
}
module.exports={getCoords}