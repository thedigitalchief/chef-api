const mongoose = require("mongoose");
const DataTable = require("mongoose-datatable");
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
// mongoose.plugin(DataTable.init);
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

let self = (module.exports = {});

/* sub Schema for table `homepage`*/
let homePageSchema = new mongoose.Schema({
  image: { type: String },
  heading: { type: String },
  description: { type: String },
  isActive: { type: Boolean },
});
// self.homepage = mongoose.model('homepage', homePageSchema);

/* sub Schema for table `homepage`*/
let cmssettingsSchema = new mongoose.Schema({
  key: { type: String },
  homepage: [homePageSchema],
});
self.cms_setting = mongoose.model("cms_setting", cmssettingsSchema);
/* Schema for table `settings` */

let settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
    env: { type: String, required: true },
    is_object: String,
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
    enabled: { type: Number, default: 1 },
  },
  { versionKey: false }
);
self.settings = mongoose.model("settings", settingSchema);
/* Schema for table `settings` */

/* Schema for table `devices` */
let deviceSchema = new mongoose.Schema(
  {
    device_id: { type: String },
    device_type: { type: String },
    device_os: { type: String },
    device_token: { type: String },
    device_os_version: { type: String },
    device_make: { type: String },
    device_model: { type: String, default: "" },
    api_token: { type: String },
    user_id: { type: String, ref: "users" },
    user_type: String,
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
    enabled: { type: Number, default: 1 },
  },
  { versionKey: false }
);
self.devices = mongoose.model("devices", deviceSchema);
/* Schema for table `devices` */

/* Schema for table `cms_chef_post` */

let chefPostScheme = new mongoose.Schema({
  chefId: { type: Schema.Types.ObjectId, ref: "users" },
  description: { type: String, required: true },
  images: [],
});
self.chef_post = mongoose.model("chef_post", chefPostScheme);
/* Schema for table `cms_chef_post` */

/* Schema for table `cms_users` */
let usersSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    type: { type: String, required: false },
    mobile: { type: Number, required: true },
    mobile_isd: Number,
    email: { type: String, required: true, unique: true },
    kind_of_chef:{type:Number,required:false},
    description: String,
    lnglat: { type: [Number], index: "2d", default: [] },
    geo_location: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    url: [],
    otp: String,
    profile_pic: { type: String, default: "" },
    image1: String,
    image2: String,
    images: [],
    utensils: String,
    paypal_id: String,
    social_security_number: String,
    zipcode: { type: String },
    cuisine: [{ type: Schema.Types.ObjectId, ref: "cuisine" }],
    dish: [{ type: Array, ref: "dishes" }],
    availability: {
      /*date=[], start_time, end_time, max_distance*/
    },
    preferences: {
      /*cuisine = [], kiitchen, description*/
    },
    exclusive_service: {
      type: String,
      default: null,
      ref: "exclusive_services",
    },
    is_address_updated: { type: Boolean, default: false },
    is_password_updated: { type: Boolean, default: false },
    is_preferences_updated: { type: Boolean, default: false },
    is_card_updated: { type: Boolean, default: false },
    salt: { type: String, required: false },
    token: { type: String, required: false },
    password: { type: String, required: false },
    resetPasswordToken: String,
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
    enabled: { type: Number, default: 1 },
  },
  { versionKey: false }
);
self.users = mongoose.model("users", usersSchema);
/* Schema for table `cms_users` */

/**STRIPE USERS*/
let stripeUsersSchema = new mongoose.Schema({
  user_id: String,
  stripe_customer_id: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.stripe_users = mongoose.model("stripe_users", stripeUsersSchema);
/**END OF STRIPE USERS*/

/**CUISINE MASTER*/
let cuisineMasterSchema = new mongoose.Schema({
  name: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.cuisine_master = mongoose.model("cuisine_master", cuisineMasterSchema);
/**END OF CUISINE MASTER*/

/**KITCHEN MASTER*/
let kitchenMasterSchema = new mongoose.Schema({
  name: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.kitchen_master = mongoose.model("kitchen_master", kitchenMasterSchema);
/**END OF KITCHEN MASTER*/

/**FOOD TYPE MASTER*/
let foodTypeSchema = new mongoose.Schema({
  name: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.food_master = mongoose.model("food_master", foodTypeSchema);
/**END OF FOOD TYPE MASTER*/

/**DISH MASTER*/
let dishMasterSchema = new mongoose.Schema({
  name: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.dish_master = mongoose.model("dish_master", dishMasterSchema);
/**END OF DISH MASTER*/

/**ORGANIZATION*/
let organizationSchema = new mongoose.Schema({
  name: String,
  type: String,
  no_users: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.organization = mongoose.model("organization", organizationSchema);
/**END OF ORGANIZATION MASTER*/

/**PRIVATE GROUP*/
let privateGroupSchema = new mongoose.Schema({
  name: String,
  // chef_org : {type:[], ref:'organization'},
  // consumer_org : {type:[], ref:'organization'},
  zipcodes: { type: [], ref: "zipcodes" },
  chef_days: [],
  chef_start_time: String,
  max_distance: String,
  hourly_cooking_charges: String,
  consumer_days: [],
  consumer_start_time: String,
  consumer_max_guest: String,
  platform_fee: String,
  minimum_cooking_time: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.private = mongoose.model("private", privateGroupSchema);
/**END OF PRIVATE GROUP*/

/**COUSINES*/
let cousinesSchema = new mongoose.Schema({
  name: String,
  alias: String,
  description: String,
  image1: String,
  image2: String,
  url: [],
  video: [],
  cooking_info: [],
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.cuisine = mongoose.model("cuisine", cousinesSchema);
/**END OF COUSINES*/

/**DISH*/
let dishSchema = new mongoose.Schema({
  name: String,
  alias: String,
  description: String,
  cuisine: { type: [], ref: "cuisine" },
  image1: String,
  image2: String,
  primaryChefId: { type: Schema.Types.ObjectId, ref: "users" },
  secondaryChefId: [{ type: Schema.Types.ObjectId, ref: "users" }],
  images: [],
  food_type: { type: String, enum: [1 , 2, 3], default: 3 },
  cuisine_category:{type: Schema.Types.ObjectId, ref: "cuisine_category"},
  url: [],
  ingredient:{type:String},
  video: [],
  cooking_info: [],
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.dish = mongoose.model("dish", dishSchema);
/**END OF DISH*/

/** Zipcodes */
let zipcodeSchema = new mongoose.Schema({
  private_group: { type: String, ref: "private" },
  zipcode: { type: String, required: true },
  state_name: { type: String, required: true },
  state_code: { type: String, required: true },
  country_code: { type: String, ref: "country_master" },
  tax1: { type: Number, default: 0 },
  tax2: { type: Number, default: 0 },
  tax3: { type: Number, default: 0 },
  tax4: { type: Number, default: 0 },
  tax5: { type: Number, default: 0 },
  total_tax: { type: Number, default: 0 },
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.zipcodes = mongoose.model("zipcodes", zipcodeSchema);

/**ORDERS*/
let orderSchema = new mongoose.Schema({
  consumer_id: { type: String, ref: "users" },
  chef_id: { type: String, ref: "users" },
  date_in_utc: Date,
  start_time: String,
  timezone: String,
  guests: String,
  cuisine: { type: String, ref: "cuisine" },
  dishes: { type: [], ref: "dish" },
  dish_for_persons: { type: [], ref: "dish" },
  api_version: String,
  address_1: String,
  address_2: String,
  lnglat: { type: [Number], index: "2d", default: [] },
  latitude: String,
  longitude: String,
  chef_rating: String,
  rating: String,
  reason: String,
  state: String,
  city: String,
  zipcode: String,
  feedback: String,
  status: String,
  dish_charges: String,
  other_charges: { type: [] },
  total_amount: String,
  total_tax: String,
  grocery_amount: String,
  platform_fee: String,
  hourly_cooking_charges: String,
  is_grocery_picked_up: { type: Boolean, default: false },
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.orders = mongoose.model("orders", orderSchema);
/*End of orders*/

/** Transactions */
let transactionsSchema = new mongoose.Schema({
  order_id: { type: String, ref: "orders" },
  transaction_details: {},
  status: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.transactions = mongoose.model("transactions", transactionsSchema);
/**End of Transactions */

/** States */
let stateMasterSchema = new mongoose.Schema({
  title: String,
  code: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.state_master = mongoose.model("state_master", stateMasterSchema);
/**End of  States */

/** States */
let exclusiveServicesSchema = new mongoose.Schema({
  title: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.exclusive_services = mongoose.model(
  "exclusive_services",
  exclusiveServicesSchema
);
/**End of  States */

/** Others */
let othersSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
  enabled: { type: Number, default: 1 },
});
self.others = mongoose.model("others", othersSchema);
/**End of  Others */

/** Countries */
let countryMasterSchema = new mongoose.Schema({
  title: String,
  code: String,
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.country_master = mongoose.model("country_master", countryMasterSchema);
/**End of  Countries */

/**Customer Queries */
let customerQuerySchema = new mongoose.Schema({
  user_id: { type: String, ref: "users" },
  title: String,
  description: String,
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.customer_queries = mongoose.model("customer_queries", customerQuerySchema);
/**End of  Customer Queries */
/** Order Status */
let orderStatusSchema = new mongoose.Schema({
  title: String,
  key: String,
  sequence_order: { type: Number, default: 0 },
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});

self.order_status_master = mongoose.model(
  "order_status_master",
  orderStatusSchema
);

let chefScheduleSchema = new mongoose.Schema({
  chef_id: { type: String },
  schedule_date: { type: Date },
  start_time: { type: Date },
  end_time: { type: Date },
  address_1: { type: String },
  address_2: { type: String },
  zipcode: { type: String, ref: "zipcodes" },
  lnglat: { type: [Number], default: [] },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [] },
  },
  proximity: { type: String },
  timezone: { type: String },
  enabled: { type: Number, default: 1 },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});

// chefScheduleSchema.index({location: "2dsphere"});
chefScheduleSchema.index({ lnglat: "2dsphere" });
self.chef_schedule = mongoose.model("chef_schedule", chefScheduleSchema);

let cuisineCategorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  description: { type: String, required: false },
  isActive: { type: Boolean, default: true },
  image: { type: String, required: false },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
self.cuisine_category = mongoose.model(
  "cuisine_category",
  cuisineCategorySchema
);
