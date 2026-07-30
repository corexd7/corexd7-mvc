import {
  AUTHENTICATION_MESSAGES,
  PRODUCT_CODE_MAX_LENGTH,
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_CODE_REGEX,
} from "@/constants/authentication";

export interface AuthenticateRequestBody {
  productCode?: unknown;
  id?: unknown;
}

export interface AuthenticateValidationResult {
  isValid: boolean;
  productCode?: string;
  message?: string;
  statusCode?: number;
}

export function normalizeProductCode(code: string): string {
  return code.trim().toLowerCase();
}

export function isValidProductCodeFormat(code: string): boolean {
  const normalized = normalizeProductCode(code);
  return (
    normalized.length >= PRODUCT_CODE_MIN_LENGTH &&
    normalized.length <= PRODUCT_CODE_MAX_LENGTH &&
    PRODUCT_CODE_REGEX.test(normalized)
  );
}

export function validateAuthenticateRequest(
  body: AuthenticateRequestBody
): AuthenticateValidationResult {
  if (!body || typeof body !== "object") {
    return {
      isValid: false,
      message: AUTHENTICATION_MESSAGES.INVALID_BODY,
      statusCode: 400,
    };
  }

  const rawCode = body.productCode ?? body.id;

  if (typeof rawCode !== "string" || rawCode.trim().length === 0) {
    return {
      isValid: false,
      message: AUTHENTICATION_MESSAGES.PRODUCT_CODE_REQUIRED,
      statusCode: 400,
    };
  }

  const productCode = normalizeProductCode(rawCode);

  if (!isValidProductCodeFormat(productCode)) {
    return {
      isValid: false,
      message: AUTHENTICATION_MESSAGES.INVALID_FORMAT,
      statusCode: 400,
    };
  }

  return {
    isValid: true,
    productCode,
  };
}

export function extractProductCodeFromBody(body: AuthenticateRequestBody): string | null {
  const rawCode = body?.productCode ?? body?.id;
  if (typeof rawCode !== "string" || rawCode.trim().length === 0) {
    return null;
  }
  return normalizeProductCode(rawCode);
}
