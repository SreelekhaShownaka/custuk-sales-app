import mongoose, { Schema, Document } from 'mongoose';

export interface SalesmanDocument extends Document {
  id: string; 
  name: string; 
  sales: number[]; 
}

const SalesmanSchema = new Schema<SalesmanDocument>({
  id: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  sales: {
    type: [Number],
    required: true,
  },
});

export const SalesmanModel = mongoose.model<SalesmanDocument>(
  'Salesman',
  SalesmanSchema
);
