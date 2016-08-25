/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    id: String,
    user: Object,
    text: String,
    vid: String,
    thumbsUp: {type: Array, default: [] },
    count: { type: Number, min: 0, default: 0 },
    date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Question', QuestionSchema);
