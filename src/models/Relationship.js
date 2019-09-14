const mongoose = require('mongoose');

const RelationshipSchema = new mongoose.Schema({
    
    User_1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    },
    User_2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const Relationship = mongoose.model('Relationship', RelationshipSchema);

module.exports = Relationship;