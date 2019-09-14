const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    nr_value:{
        type: Number,
        required: true
    },
    tx_desc:{
        type: String,
        required: false
    },
    ic_valid:{
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

    id_author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    },
    id_guilty:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;