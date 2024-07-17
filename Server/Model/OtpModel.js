// import mongoose from "mongoose";

// const otpSchema = mongoose.Schema(
//   {
//     email: { type: String, default: null },
//     otp: { type: String, default: null },
//     expiry: { type: Date, default: DateTime.now().plus({ hour: 1 }).toJSDate() },

//   },
//   { timestamps: true }
// );

// export const OtpModel = mongoose.model("Otp", otpSchema);


import mongoose, { Model, Schema } from "mongoose";
import { DateTime } from "luxon"
/**
 * @type {Schema}
 */
const tokenSchema = mongoose.Schema(
  {
    userId: { type: String, default: null, require: true },
    token: { type: String, default: null, require: true },
    type: { type: String, enum: ['EMAIL', 'SMS'], },
    scope: { type: String, enum: ['VERIFICATION','PASSWORD_CHANGE'], },
    status: { type: String, enum: ['UNVERIFIED','VERIFIED'], default:"UNVERIFIED"},
    email: { type: String, },
    phone_number: { type: String,},
    ttl: { type: Number, default: 1 },
    ttl_unit: { type: String, enum: ['HOUR', 'MINUTE', 'SECOND'], default: 'HOUR' },
    expiry: { type: Date, default: DateTime.now().plus({ hour: 1 }).toJSDate() },
  },
  { timestamps: true }
);
tokenSchema.pre("save", async function () {
  let { ttl, ttl_unit } = this;
  this.expiry = DateTime.now().plus({ [ttl_unit.toLowerCase()]: ttl });
  
})
/**upodatw
 * @template tokenSchema
 * @type{Model}
 */
export const TokenModel = mongoose.model("Token", tokenSchema);