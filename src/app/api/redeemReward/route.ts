import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { isValidPhoneNumber, isRequired } from "@/utils/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productCode = body?.productCode?.trim();
    const mobileNo = body?.mobileNo?.trim();

    if (!isRequired(productCode)) {
      return NextResponse.json(
        { message: "Product code is required", status: false },
        { status: 400 }
      );
    }

    if (!isRequired(mobileNo) || !isValidPhoneNumber(mobileNo)) {
      return NextResponse.json(
        { message: "Please enter a valid mobile number", status: false },
        { status: 400 }
      );
    }

    const client = await clientPromise;

    const existingKey = await client
      .db("mrenergyProduct")
      .collection("product-key")
      .findOne({ productCode: productCode.toLowerCase() });

    if (!existingKey) {
      return NextResponse.json(
        { message: "Invalid product code", status: false },
        { status: 404 }
      );
    }

    const existingRedemption = await client
      .db("mrenergyProduct")
      .collection("reward-redemptions")
      .findOne({ productCode, mobileNo });

    if (existingRedemption) {
      return NextResponse.json(
        { message: "Reward already redeemed for this product", status: false },
        { status: 409 }
      );
    }

    await client
      .db("mrenergyProduct")
      .collection("reward-redemptions")
      .insertOne({
        productCode,
        mobileNo,
        redeemedAt: new Date(),
      });

    return NextResponse.json({
      message: "Reward redeemed successfully! We will contact you shortly.",
      status: true,
    });
  } catch {
    return NextResponse.json(
      { message: "Server error occurred", status: false },
      { status: 500 }
    );
  }
}
