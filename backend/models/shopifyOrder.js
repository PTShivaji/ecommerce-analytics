const mongoose = require('mongoose');

const ShopifyOrderSchema = new mongoose.Schema({
  _id: Number, // MongoDB document ID, same as 'id' field
  id: Number,  // Shopify order ID
  email: String, // Customer email
  closed_at: { type: Date, default: null }, // Order closing date, if any
  created_at: Date, // Order creation date
  updated_at: Date, // Last update to the order
  number: Number, // Order number
  note: { type: String, default: null }, // Additional notes about the order
  token: { type: String, default: "" }, // Payment token
  gateway: String, // Payment gateway used
  test: { type: Boolean, default: false }, // Whether the order is a test order
  total_price: String, // Total price of the order
  subtotal_price: String, // Subtotal price (before tax)
  total_weight: { type: Number, default: 0 }, // Total weight of items in the order
  total_tax: String, // Total tax applied to the order
  taxes_included: { type: Boolean, default: true }, // Whether taxes are included in the total price
  currency: String, // Currency used for the order
  financial_status: String, // Payment status (e.g., 'paid')
  confirmed: { type: Boolean, default: true }, // Whether the order is confirmed
  total_discounts: { type: String, default: "0.00" }, // Total discounts applied
  buyer_accepts_marketing: { type: Boolean, default: false }, // Whether the buyer accepts marketing
  name: String, // Order name (e.g., '#10027060')
  referring_site: { type: String, default: null }, // Referring site, if any
  landing_site: { type: String, default: null }, // Landing site, if any
  cancelled_at: { type: Date, default: null } // Date when the order was cancelled, if applicable
  // You can add more fields as necessary based on your data structure
}, { collection: 'shopifyOrders' });

module.exports = mongoose.model('ShopifyOrder', ShopifyOrderSchema);

