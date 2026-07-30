export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(cleaned);
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateRedeemForm(
  productCode: string,
  mobileNo: string
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(productCode)) {
    errors.productCode = "Product code is required";
  }

  if (!isRequired(mobileNo)) {
    errors.mobileNo = "Mobile number is required";
  } else if (!isValidPhoneNumber(mobileNo)) {
    errors.mobileNo = "Please enter a valid mobile number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateProductCode(code: string): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(code)) {
    errors.productCode = "Product code is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
