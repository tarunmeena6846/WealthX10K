import mongoose, { Document, Schema } from "mongoose";

export interface Admin extends Document {
  username: string;
  password: string;
  imageUrl?: string;
  verified: Boolean;
  // subscriptions: Schema.Types.ObjectId[];
  stripePlanId?: string;
  stripeUserId?: string;
  isSubscribed?: Boolean;
  isTopTier: Boolean;
  verificationToken: string;
  myWhy: string;
  swotSessionTime: Date;
}

const adminSchema = new Schema<Admin>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    // unique: true,
    required: true,
  },
  imageUrl: String,
  stripePlanId: String,
  stripeUserId: String,
  isSubscribed: Boolean,
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  isTopTier: { type: Boolean, default: false },
  myWhy: { type: String, default: "" },
  swotSessionTime: Date,

  // subscriptions: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Subscription",
  //   },
  // ],
});

const AdminModel = mongoose.model<Admin>("Admin", adminSchema);

export default AdminModel;
