import mongoose, { mongo } from "mongoose";
import { string } from "zod";


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,

    bio: {
        type: String, 
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    threads: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        },
    ],
    
    onboarded: {
        type: Boolean,
        default: false
    },

    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]

    
    
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;