import mongoose from "mongoose";

const connectToMongodb = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI);
        if(res){
            console.log("mongoDB connceted");
        }
    } catch (error) {
        console.log("error in db connection: " , error.message);
    }
}

export default connectToMongodb;