/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    id: { type: String, index: { unique: true }},
    user: Object,
    text: String,
    vid: String,
    thumbsUp: {type: Array, default: [] },
    count: { type: Number, min: 0, default: 0 }
},{
    timestamps: true
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Question', QuestionSchema);
