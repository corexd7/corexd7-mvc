export const DB_NAME = "mrenergyProduct";

/** Existing MongoDB collection where product codes are stored */
export const PRODUCT_AUTHENTICATION_COLLECTION = "product-key";

export const PRODUCT_CODE_MIN_LENGTH = 3;
export const PRODUCT_CODE_MAX_LENGTH = 50;

/** Alphanumeric product codes, e.g. ghl8vnrw3 or COREX-1234-5678 */
export const PRODUCT_CODE_REGEX = /^[A-Za-z0-9_-]+$/;

export const DEFAULT_MAX_VERIFICATION = 4;

export const AUTHENTICATION_MESSAGES = {
  INVALID_BODY: "Invalid request body",
  PRODUCT_CODE_REQUIRED: "Product code is required",
  INVALID_FORMAT: "Invalid product code format",
  NOT_FOUND: "Invalid Product Code",
  INACTIVE: "Product is inactive",
  SUCCESS: "Product authenticated successfully.",
  MAX_REACHED:
    "This product has already been authenticated the maximum number of times.",
  SERVER_ERROR: "An unexpected error occurred. Please try again later.",
} as const;
