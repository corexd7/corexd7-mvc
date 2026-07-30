import mongoose from "mongoose";
import {
  DEFAULT_MAX_VERIFICATION,
  PRODUCT_AUTHENTICATION_COLLECTION,
} from "@/constants/authentication";

export interface IProductAuthentication {
  productCode: string;
  verificationCount: number;
  maxVerification: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const productAuthenticationSchema = new mongoose.Schema<IProductAuthentication>(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    verificationCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    maxVerification: {
      type: Number,
      required: true,
      default: DEFAULT_MAX_VERIFICATION,
      min: 1,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: PRODUCT_AUTHENTICATION_COLLECTION,
    strict: false,
  }
);

productAuthenticationSchema.index({ productCode: 1 }, { unique: true });

productAuthenticationSchema.pre("save", function () {
  if (this.productCode) {
    this.productCode = this.productCode.trim().toLowerCase();
  }
});

const ProductAuthentication =
  mongoose.models.ProductAuthentication ??
  mongoose.model<IProductAuthentication>(
    "ProductAuthentication",
    productAuthenticationSchema
  );

export default ProductAuthentication;
