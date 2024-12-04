import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    orderDate: Date;
}

const OrderSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
