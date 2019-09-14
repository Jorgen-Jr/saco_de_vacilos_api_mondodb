const mongoose = require('../database');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    tx_username:{
        type: String,
        unique: true,
        required: true,
    },
    tx_name:{
        type: String,
        required: true,
    },
    tx_pass:{
        type: String,
        required: true,
        select: false,
    },
    tx_email:{
        type: String,
        unique:true,
        trim: true
    },
    tx_bio:{
        type: String
    },
    bin_profile_pic:{
        type: Buffer
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcryptjs.hash(this.tx_pass, 10);
    this.tx_pass = hash;
    
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;