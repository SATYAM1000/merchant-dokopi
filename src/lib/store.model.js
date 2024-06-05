import mongoose from "mongoose";
const xeroxStoreSchema = new mongoose.Schema(
  {
    storeDetails: {
      storeName: {
        type: String,
        required: true,
        trim: true,
      },
      storePhoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Phone number already exists"],
      },
      storeEmail: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Email already exists"],
      },
      storeLocation: {
        storeLandmark: { type: String, trim: true },
        storeZipCode: { type: String, trim: true },
        storeCity: { type: String, trim: true },
        storeState: { type: String, trim: true },
        storeCountry: { type: String, trim: true },
      },

      storeLogoURL: { type: String, trim: true },
      storeOpeningHours: {
        Monday: { type: String, trim: true },
        Tuesday: { type: String, trim: true },
        Wednesday: { type: String, trim: true },
        Thursday: { type: String, trim: true },
        Friday: { type: String, trim: true },
        Saturday: { type: String, trim: true },
        Sunday: { type: String, trim: true },
      },
      storeServices: [{ type: String }],
      storeDescription: { type: String, trim: true },
    },
    storeLocationCoordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    storeStatus: {
      isStoreVerified: { type: Boolean, default: false },
      isStoreBlocked: { type: Boolean, default: false },
    },
    storeCurrentStatus: {
      type: { type: String, enum: ["online", "offline"], default: "offline" },
    },
    storeImagesURL: [{ type: String , default:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4HtE_O8tvs-TlF27vWMWHjxoCQ7HmFmZHBkZpKt1n4PFIN-aN&usqp=CAU"}],
    storePrices: {
      binding: { type: Number },
      lamination: { type: Number },
      taping: { type: Number },
      simplexBlackAndWhite: { type: Number },
      simplexColor: { type: Number },
      duplexBlackAndWhite: { type: Number },
      duplexColor: { type: Number },
    },
    storeOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    storeReviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "StoreReview" },
    ],
    storeWalletBalance: {
      type: Number,
      default: 0,
    },
    storeAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    storeProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    storeCoupons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }],
    storeCreatedDate: { type: Date, default: Date.now() },
    socketId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

xeroxStoreSchema.index({ storeLocationCoordinates: "2dsphere" });

export const XeroxStore = mongoose.models?.XeroxStore || mongoose.model("XeroxStore", xeroxStoreSchema);
