import mongoose from "mongoose";

const orderCounterSchema = new mongoose.Schema({
  restaurant_ref_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true,
    unique: true 
  },
  last_order_number: { 
    type: Number, 
    default: 0 
  }
});

const OrderCounter = mongoose.models.OrderCounter || mongoose.model('OrderCounter', orderCounterSchema); 

export default OrderCounter;