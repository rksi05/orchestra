import * as mongoose from 'mongoose';

export const InstSchema = new mongoose.Schema({
    instrument: { type: String, required: true},
    rating: { type: String, required: true},
    description: { type: String, required: true},
    solos: {type: String, required: true},
    pros: { type: String, required: true},
    sound: { type: String, required: true},
});

export interface Instrument extends mongoose.Document{
    id: string;
    instrument: string;
    rating: string; 
    description: string;
    solos: string;
    pros: string;
    sound: string;
}