import mongoose, { Document, Schema } from 'mongoose';

interface Job extends Document {
    title: string;
    company: string;
    location: string;
    summary: string;
    salary: string;
}

const jobSchema: Schema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    summary: { type: String, required: true },
    salary: { type: String, required: true }
});

export default mongoose.model<Job>('Job', jobSchema);