const mongoose = require("mongoose");


const counterSchema = mongoose.Schema({
    url:{type:String,required:true},
    wordCount:{type:Number,required:true},
    
},{
    versionKey:false
})

const CountModel = mongoose.model("counter",counterSchema)

module.exports = {CountModel}