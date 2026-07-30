import { NextRequest } from "next/server";
import { authenticateProduct } from "@/lib/authenticate/handler";
import {
  validateAuthenticateRequest,
  type AuthenticateRequestBody,
} from "@/lib/authenticate/validation";
import { AUTHENTICATION_MESSAGES } from "@/constants/authentication";

/** Legacy endpoint — delegates to the shared authentication handler */
export async function POST(req: NextRequest) {
  try {
    let body: AuthenticateRequestBody;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        { message: "Invalid request body", status: false },
        { status: 400 }
      );
    }

    const validation = validateAuthenticateRequest(body);

    if (!validation.isValid || !validation.productCode) {
      return Response.json(
        {
          message: validation.message ?? AUTHENTICATION_MESSAGES.INVALID_BODY,
          status: false,
        },
        { status: validation.statusCode ?? 400 }
      );
    }

    const { result } = await authenticateProduct(validation.productCode);

    if (!result.success) {
      return Response.json(
        { message: result.message, status: false },
        { status: 404 }
      );
    }

    const { productCode, verificationCount, remainingAttempts } = result.data!;

    return Response.json({
      message: "Valid Key",
      status: true,
      data: {
        key: productCode,
        productCode,
        verificationCount,
        remainingAttempts,
        isUsed: remainingAttempts === 0 ? 1 : 0,
      },
    });
  } catch (error) {
    console.error("[POST /api/searchProduct]", error);
    return Response.json(
      { message: AUTHENTICATION_MESSAGES.SERVER_ERROR, status: false },
      { status: 500 }
    );
  }
}
