import type { RedeemRewardRequest, RedeemRewardResponse } from "@/types";

export async function redeemReward(
  data: RedeemRewardRequest
): Promise<RedeemRewardResponse> {
  const response = await fetch("/api/redeemReward", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Server error occurred");
  }

  return response.json();
}
