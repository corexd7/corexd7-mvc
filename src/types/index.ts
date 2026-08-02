export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeroConfig {
  title?: string;
  subtitle?: string;
  backgroundImage: string;
  overlay?: boolean;
  showLogo?: boolean;
  cta?: {
    label: string;
    href: string;
  };
  height?: "full" | "banner";
}

export interface AboutContent {
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  category: string;
  price: number;
  isFeatured: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AuthenticateResponse {
  success: boolean;
  message: string;
  data?: {
    productCode: string;
    verificationCount: number;
    remainingAttempts: number;
  };
}

/** @deprecated Legacy searchProduct shape — kept for backward compatibility */
export interface ProductVerificationResponse {
  message: string;
  status: boolean;
  data?: {
    key: string;
    isUsed: number;
    verificationCount?: number;
    remainingAttempts?: number;
    _id?: string;
  };
}

export type VerificationStatus =
  | "idle"
  | "loading"
  | "success"
  | "already_authenticated"
  | "inactive"
  | "invalid"
  | "error";

export interface RedeemRewardRequest {
  productCode: string;
  mobileNo: string;
}

export interface RedeemRewardResponse {
  message: string;
  status: boolean;
  rewardName?: string | null;
  otpRequired?: boolean;
}

export type RedeemStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "validation_error";

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  apiBaseUrl: string;
}
