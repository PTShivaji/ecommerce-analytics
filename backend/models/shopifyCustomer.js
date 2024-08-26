const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  company: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  country: String,
  zip: String,
  phone: String,
  name: String,
  province_code: String,
  country_code: String,
  latitude: Number,
  longitude: Number
}, { _id: false });

const EmailMarketingConsentSchema = new mongoose.Schema({
  state: String,
  opt_in_level: String,
  consent_updated_at: Date
}, { _id: false });

const ShopifyCustomerSchema = new mongoose.Schema({
  _id: Number, // MongoDB document ID, same as 'id' field
  addresses: [AddressSchema], // Array of addresses
  admin_graphql_api_id: String, // GraphQL API ID
  created_at: Date, // Customer creation date
  currency: { type: String, default: "" }, // Currency preference
  default_address: AddressSchema, // Default address object
  email: String, // Customer email
  email_marketing_consent: EmailMarketingConsentSchema, // Email marketing consent object
  first_name: String, // Customer's first name
  id: Number, // Shopify customer ID
  last_name: String, // Customer's last name
  last_order_id: { type: Number, default: null }, // Last order ID
  last_order_name: { type: String, default: null }, // Last order name
  multipass_identifier: { type: String, default: null }, // Multipass identifier for single sign-on
  note: { type: String, default: null }, // Notes about the customer
  orders_count: { type: Number, default: 0 }, // Number of orders placed by the customer
  phone: { type: String, default: null }, // Customer's phone number
  sms_marketing_consent: { type: mongoose.Schema.Types.Mixed, default: null }, // SMS marketing consent object
  state: { type: String, default: "disabled" }, // Customer state (active or disabled)
  tags: { type: String, default: "" }, // Tags associated with the customer
  tax_exempt: { type: Boolean, default: false }, // Whether the customer is tax-exempt
  tax_exemptions: { type: [String], default: [] }, // Array of tax exemptions
  total_spent: { type: String, default: "0.00" }, // Total amount spent by the customer
  updated_at: Date, // Last update date for the customer data
  verified_email: { type: Boolean, default: true } // Whether the customer's email is verified
}, { collection: 'shopifyCustomers' });

module.exports = mongoose.model('ShopifyCustomer', ShopifyCustomerSchema);

