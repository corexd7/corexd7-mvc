import ProductAuthentication from "@/models/ProductAuthentication";
import connectMongoDB from "@/lib/mongoose";
import { AUTHENTICATION_MESSAGES } from "@/constants/authentication";
import type { ApiResponse } from "@/lib/api/response";

export interface AuthenticationData {
  productCode: string;
  verificationCount: number;
  remainingAttempts: number;
}

export type AuthenticateHandlerResult = ApiResponse<AuthenticationData>;

export async function authenticateProduct(
  productCode: string
): Promise<{ result: AuthenticateHandlerResult; statusCode: number }> {
  await connectMongoDB();

  const product = await ProductAuthentication.findOne({
    productCode: productCode.toLowerCase(),
  });

  if (!product) {
    return {
      result: {
        success: false,
        message: AUTHENTICATION_MESSAGES.NOT_FOUND,
      },
      statusCode: 404,
    };
  }

  if (product.isActive === false) {
    return {
      result: {
        success: false,
        message: AUTHENTICATION_MESSAGES.INACTIVE,
      },
      statusCode: 403,
    };
  }

  const maxVerification = product.maxVerification ?? 4;
  const currentCount = product.verificationCount ?? 0;

  if (currentCount >= maxVerification) {
    return {
      result: {
        success: false,
        message: AUTHENTICATION_MESSAGES.MAX_REACHED,
      },
      statusCode: 409,
    };
  }

  const updatedProduct = await ProductAuthentication.findOneAndUpdate(
    {
      productCode: productCode.toLowerCase(),
      isActive: { $ne: false },
      verificationCount: { $lt: maxVerification },
    },
    { $inc: { verificationCount: 1 } },
    { new: true }
  );

  if (!updatedProduct) {
    return {
      result: {
        success: false,
        message: AUTHENTICATION_MESSAGES.MAX_REACHED,
      },
      statusCode: 409,
    };
  }

  const verificationCount = updatedProduct.verificationCount ?? 0;
  const remainingAttempts = maxVerification - verificationCount;

  return {
    result: {
      success: true,
      message: AUTHENTICATION_MESSAGES.SUCCESS,
      data: {
        productCode: updatedProduct.productCode,
        verificationCount,
        remainingAttempts,
      },
    },
    statusCode: 200,
  };
}
