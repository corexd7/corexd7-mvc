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
  const [rewardName, setRewardName] = useState("");

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
        setRewardName(response.rewardName ?? "");
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
    setRewardName("");
  };

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="rounded-2xl border border-green-100 bg-green-50 px-6 py-10 shadow-sm">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-green-700">
            Reward Claimed!
          </h2>

          {rewardName && (
            <p className="mt-2 text-xl font-semibold text-gray-800">
              {rewardName}
            </p>
          )}

          <div className="mx-auto mt-6 max-w-xs rounded-xl bg-white px-5 py-4 text-left shadow-inner">
            <div
              className={`flex items-center justify-between ${rewardName ? "border-b border-gray-100 pb-3" : ""}`}
            >
              <span className="text-sm text-gray-500">Mobile Number</span>
              <span className="text-sm font-medium text-gray-800">{mobileNo}</span>
            </div>
            {rewardName && (
              <div className="flex items-center justify-between pt-3">
                <span className="text-sm text-gray-500">Reward</span>
                <span className="text-sm font-medium text-gray-800">{rewardName}</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Next step: visit our shop
              </p>
              <p className="mt-0.5 text-xs text-amber-700">
                Take a screenshot of this confirmation and present it at our store to collect your reward.
              </p>
            </div>
          </div>

          <Button variant="outline" onClick={handleReset} className="mt-6 w-auto px-8">
            Redeem Another
          </Button>
        </div>
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
