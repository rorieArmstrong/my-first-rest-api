const express = require("express");
const app = express();
let fs = require("fs");

// const houseSchema = new Schema({
//     Number: String,
//     Address: String,
//     Ocupants: Array,
//     Owner: String
// })

// const userModel = mongoose.model('House', houseSchema);

function getData(){
    let data = fs.readFileSync("./data.json");
    data = JSON.parse(data);
    return data;
}

//get a houses data (address and owner)
app.get("/house/:houseNumber", (req, res, next) => {
    let data = getData();
    const houseNumber = req.params.houseNumber;
    try{
        console.log("fetching data")
        for(let i = 0; i < data.Houses.length; i++){
            if (data.Houses[i].number == houseNumber){
                res.json(data.Houses[i]);
                console.log(data.Houses[i])
            }
        }
    }
    catch(err){
        res.json({"message": "error"})
    }
});
   

//get people in neightbourhood in age bracket
app.get("/age/:min/:max", (req, res, next) => {
    let data = getData();
    const min = Number(req.params.min);
    const max = Number(req.params.max);
    try{
        let response = []
        console.log("fetching data")
        for(let i = 0; i < data.Houses.length; i++){
            for(let j = 0; j < data.Houses[i].Ocupants.length; j++){
                if (min <= data.Houses[i].Ocupants[j].age && data.Houses[i].Ocupants[j].age <= max){
                    console.log(data.Houses[i].Ocupants[j].age)
                    response.push(data.Houses[i].Ocupants[j])
                }
            }
        }
        if(response.length === 0){
            res.json({"message": "No enties in age range"})
        }else{
            res.json(response);
            console.log(response)
        }
    }
    catch(err){
        res.json({"message": "error"})
    }
});


//get houses on neightbourhood with specifc occupancy
app.get("/occupancy/:amount", (req, res, next) => {
    let data = getData();
    const amount = req.params.amount;
    try{
        let response = []
        console.log("fetching data")
        for(let i = 0; i < data.Houses.length; i++){
            if (data.Houses[i].Ocupants.length == amount){
                console.log(data.Houses[i].Ocupants)
                response.push(data.Houses[i].Ocupants)
            }
        }
        if(response.length === 0){
            res.json({"message": "No Houses have that many occupants"})
        }else{
            res.json(response);
            console.log(response)
        }
    }
    catch(err){
        res.json({"message": "error"})
    }
})





app.listen(3000, () => {
 console.log("Server running on port 3000");
});