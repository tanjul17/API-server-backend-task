import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    name: string;
    category: string;
    price: number;
    stockQuantity: number;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
