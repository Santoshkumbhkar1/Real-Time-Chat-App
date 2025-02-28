import mongoose from 'mongoose';

const mesSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }

});

const Mesg = mongoose.model('Mesg', mesSchema);
export default Mesg;