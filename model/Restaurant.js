import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    logo_url: { type: String },
    alias: { type: String},
    type: { type: String },
    description: { type: String },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    opening_time: { type: String },
    closing_time: { type: String },
    categories: {type: [String]},
    parent_categories: {type: [String]},
    customizer_categories : {type: [String]},
    address: { type: String, required: true },
    is_veg_only: { type: Boolean, default: false },
    is_cash_only: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    gstin: { type: String},
    is_open: { type: Boolean, default: false },
    is_seating: { type: Boolean},
    is_takeaway: { type: Boolean},
    tables: { type: String},
    review_url: { type: String},
    feedback_url: { type: String},
    static_payment_QR_Code: { type: String},
    menu_ref: { type: [mongoose.Schema.Types.ObjectId], ref: 'Menu', default: [] },
    add_on_ref: { type: [mongoose.Schema.Types.ObjectId], ref: 'AddOn', default: [] },
    inventory_ref: { type: [mongoose.Schema.Types.ObjectId], ref: 'Inventory',default:[]},
    table_ref: { type: [mongoose.Schema.Types.ObjectId], ref: 'Table', default: [] },
    waiter_ref: { type: [mongoose.Schema.Types.ObjectId], ref: 'Waiter', default: [] },
    customizer_ref: { type: [mongoose.Schema.Types.ObjectId], ref: 'Customizer', default: [] },
    additional_info: {type: Object},
    restaurant_credentials_ref: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestaurantCredentials',
    }],
    menu_view_ref: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuView', default: []
    }],
}, { timestamps: true });

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
