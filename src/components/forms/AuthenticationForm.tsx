"use client";

import { useState, FormEvent } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { verifyProductCode } from "@/services/productVerification";
import { validateProductCode } from "@/utils/validation";
import { AUTHENTICATION_MESSAGES } from "@/constants/authentication";
import type { VerificationStatus } from "@/types";

const statusMessages: Record<
  Exclude<VerificationStatus, "idle" | "loading">,
  { text: string; color: string; animation: string }
> = {
  success: {
    text: "Successfully Verified",
    color: "text-green-600",
    animation: "/animations/success-1.json",
  },
  already_authenticated: {
    text: AUTHENTICATION_MESSAGES.MAX_REACHED,
    color: "text-yellow-600",
    animation: "/animations/warning.json",
  },
  inactive: {
    text: AUTHENTICATION_MESSAGES.INACTIVE,
    color: "text-yellow-600",
    animation: "/animations/warning.json",
  },
  invalid: {
    text: AUTHENTICATION_MESSAGES.NOT_FOUND,
    color: "text-red-600",
    animation: "/animations/failure.json",
  },
  error: {
    text: "Server Error — Please try again",
    color: "text-red-600",
    animation: "/animations/failure.json",
  },
};

export default function AuthenticationForm() {
  const [productCode, setProductCode] = useState("");
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successDetail, setSuccessDetail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = validateProductCode(productCode);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setStatus("loading");
    setSuccessDetail("");

    try {
      const response = await verifyProductCode(productCode.trim());

      if (response.success && response.data) {
        setStatus("success");
        setSuccessDetail(
          `${response.data.remainingAttempts} verification attempt${
            response.data.remainingAttempts === 1 ? "" : "s"
          } remaining`
        );
        return;
      }

      switch (response.message) {
        case AUTHENTICATION_MESSAGES.MAX_REACHED:
          setStatus("already_authenticated");
          break;
        case AUTHENTICATION_MESSAGES.INACTIVE:
          setStatus("inactive");
          break;
        case AUTHENTICATION_MESSAGES.NOT_FOUND:
          setStatus("invalid");
          break;
        default:
          setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrors({});
    setSuccessDetail("");
  };

  if (status !== "idle" && status !== "loading") {
    const result = statusMessages[status];

    return (
      <div className="flex flex-col items-center">
        <Player
          autoplay
          loop
          src={result.animation}
          style={{ height: "200px", width: "200px" }}
        />
        <p className={`mt-2 text-center text-lg font-semibold ${result.color}`}>
          {result.text}
        </p>
        {successDetail && (
          <p className="mt-1 text-center text-sm text-text-muted">
            {successDetail}
          </p>
        )}
        <Button
          variant="outline"
          onClick={handleReset}
          className="mt-6 w-auto px-8"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl space-y-6"
      noValidate
    >
      <Input
        label="Product Code"
        placeholder="Enter Product Code"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        error={errors.productCode}
        disabled={status === "loading"}
        autoComplete="off"
      />
      <Button type="submit" isLoading={status === "loading"}>
        Submit
      </Button>
    </form>
  );
}
