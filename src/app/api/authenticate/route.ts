import { NextRequest } from "next/server";
import { authenticateProduct } from "@/lib/authenticate/handler";
import {
  validateAuthenticateRequest,
  type AuthenticateRequestBody,
} from "@/lib/authenticate/validation";
import { errorResponse, successResponse } from "@/lib/api/response";
import { AUTHENTICATION_MESSAGES } from "@/constants/authentication";

export async function POST(req: NextRequest) {
  try {
    let body: AuthenticateRequestBody;

    try {
      body = await req.json();
    } catch {
      return errorResponse(AUTHENTICATION_MESSAGES.INVALID_BODY, 400);
    }

    const validation = validateAuthenticateRequest(body);

    if (!validation.isValid || !validation.productCode) {
      return errorResponse(
        validation.message ?? AUTHENTICATION_MESSAGES.INVALID_BODY,
        validation.statusCode ?? 400
      );
    }

    const { result, statusCode } = await authenticateProduct(
      validation.productCode
    );

    if (!result.success) {
      return errorResponse(result.message, statusCode);
    }

    return successResponse(result.message, result.data, statusCode);
  } catch (error) {
    console.error("[POST /api/authenticate]", error);
    return errorResponse(AUTHENTICATION_MESSAGES.SERVER_ERROR, 500);
  }
}
