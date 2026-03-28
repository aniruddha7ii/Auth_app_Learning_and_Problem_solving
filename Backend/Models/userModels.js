import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{ type:String, requared: true},
    email:{ type:String, requared:true, unique: true},
    password:{ type:String, requared:true},
    createdAt:{ type:Date, default: Date.now},
    
    verifyotp:{type:String, default:''},
    verifyotpExpireAt:{type:Number,default:0},
    isAccountVerified:{type:Boolean, default:false},
    resetotp:{type:String, default:''},
    resetotpExpireAt:{type:Number,default:0}
})

const userModel = mongoose.model.user || mongoose.model('user',userSchema);

export default userModel;