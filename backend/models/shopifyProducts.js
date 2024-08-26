const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  position: Number,
  values: [String]
}, { _id: false });

const VariantSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  title: String,
  price: String,
  sku: String,
  position: Number,
  inventory_policy: String,
  compare_at_price: String,
  fulfillment_service: String,
  inventory_management: String,
  option1: String,
  option2: String,
  option3: String,
  created_at: Date,
  updated_at: Date,
  taxable: Boolean,
  barcode: String,
  grams: Number,
  image_id: Number,
  inventory_quantity: Number,
  weight: Number,
  weight_unit: String,
  inventory_item_id: Number,
  old_inventory_quantity: Number,
  requires_shipping: Boolean
}, { _id: false });

const ShopifyProductSchema = new mongoose.Schema({
  _id: Number, // MongoDB document ID, same as 'id' field
  admin_graphql_api_id: String, // GraphQL API ID
  body_html: { type: String, default: null }, // Product description in HTML
  created_at: Date, // Product creation date
  handle: String, // Unique handle for the product
  id: Number, // Shopify product ID
  image: { type: mongoose.Schema.Types.Mixed, default: null }, // Main product image
  images: { type: [mongoose.Schema.Types.Mixed], default: [] }, // Array of additional images
  options: { type: [OptionSchema], default: [] }, // Product options (e.g., size, color)
  product_type: String, // Type or category of the product
  published_at: { type: Date, default: null }, // Date the product was published
  published_scope: String, // Publishing scope (e.g., 'web')
  status: String, // Product status (e.g., 'active')
  tags: { type: String, default: "" }, // Tags associated with the product
  template_suffix: { type: String, default: null }, // Template suffix for custom templates
  title: String, // Product title
  updated_at: Date, // Last update to the product data
  variants: { type: [VariantSchema], default: [] }, // Array of product variants
  vendor: String // Vendor or manufacturer of the product
}, { collection: 'shopifyProducts' });

module.exports = mongoose.model('ShopifyProduct', ShopifyProductSchema);
