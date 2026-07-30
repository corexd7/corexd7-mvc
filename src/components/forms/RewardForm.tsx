"use client";

import { useState, FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { redeemReward } from "@/services/redeemReward";
import { validateRedeemForm } from "@/utils/validation";
import type { RedeemStatus } from "@/types";

export default function RewardForm() {
  const [productCode, setProductCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [status, setStatus] = useState<RedeemStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = validateRedeemForm(productCode, mobileNo);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatus("validation_error");
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await redeemReward({
        productCode: productCode.trim(),
        mobileNo: mobileNo.trim(),
      });

      if (response.status) {
        setSuccessMessage(response.message);
        setStatus("success");
      } else {
        setErrors({ form: response.message });
        setStatus("error");
      }
    } catch {
      setErrors({ form: "Server error — please try again later" });
      setStatus("error");
    }
  };

  const handleReset = () => {
    setProductCode("");
    setMobileNo("");
    setStatus("idle");
    setErrors({});
    setSuccessMessage("");
  };

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-green-600">{successMessage}</p>
        <Button variant="outline" onClick={handleReset} className="mt-6 w-auto px-8">
          Redeem Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl space-y-6" noValidate>
      <Input
        label="Product Code"
        placeholder="Enter Product Code"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        error={errors.productCode}
        disabled={status === "loading"}
        autoComplete="off"
      />
      <Input
        label="Mobile No"
        placeholder="Enter Mobile No"
        type="tel"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
        error={errors.mobileNo}
        disabled={status === "loading"}
        autoComplete="tel"
      />

      {errors.form && (
        <p className="text-center text-sm text-red-500" role="alert">
          {errors.form}
        </p>
      )}

      <Button type="submit" isLoading={status === "loading"}>
        Submit
      </Button>
    </form>
  );
}
