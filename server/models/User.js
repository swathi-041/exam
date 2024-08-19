// const mongoose =require('mongoose');
// const {Schema}=mongoose;
// const userSchema=new Schema({
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         default:'student'
//     }
// });
// const userModel=mongoose.model('User',userSchema);
// module.exports=userModel;

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['teacher', 'student'], required: true } // Define role as 'teacher' or 'student'
// });

// const User = mongoose.model('User', UserSchema);
// module.exports = User;


// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
    attemptedExams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
    attemptCount: { type: Number, default: 0 }
});

 const User=mongoose.model('User', UserSchema);
 module.exports =User
