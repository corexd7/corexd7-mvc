import type { AuthenticateResponse } from "@/types";

export async function verifyProductCode(
  productCode: string
): Promise<AuthenticateResponse> {
  const response = await fetch("/api/authenticate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productCode }),
  });

  const data: AuthenticateResponse = await response.json();

  if (!response.ok && !data.message) {
    throw new Error("Server error occurred");
  }

  return data;
}
