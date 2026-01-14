import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    name: String,
    email: String,
    organization: String
});

export const Participant = mongoose.models.participant || mongoose.model('participant', participantSchema);