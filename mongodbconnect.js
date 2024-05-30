import mongoose from "mongoose";



// let uri2="mongodb+srv://ayush99:Bhawishya11@cluster0.gwaih4j.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0"
// // const uri = `mongodb+srv://Bhawishyasingh:${pass}@cluster0.qxhqyuf.mongodb.net/${collection_name}?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.connect(uri2, {
    
// })



const registerschema=new mongoose.Schema({
  
    name:String,
    email:String,
    password:String,
  
})
export {registerschema}

const loginschema=new mongoose.Schema({
    
    password:String,
    email:String
})
export {loginschema}


