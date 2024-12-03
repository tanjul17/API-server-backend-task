import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    product: mongoose.Schema.Types.ObjectId;
    orderDate: Date;
    quantity: number;
}

const OrderSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    orderDate: { type: Date, default: Date.now },
    quantity: { type: Number, required: true },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
