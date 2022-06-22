import mongoose from "mongoose";

const connectDB=()=>{
    if(mongoose.connections[0].readyState){
        console.log('Already connected')
        return;
    }
    mongoose.connect(process.env.MONGODB_URL,{
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        useNewUrlParser: true
    },err=>{
        if(err) throw err;
        console.log('Connected to mongodb')
    })
}
export default connectDB