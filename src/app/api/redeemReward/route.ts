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
    const collection = client.db("mrenergyProduct").collection("product-key");

    const product = await collection.findOne({
      productCode: productCode.toLowerCase(),
    });

    if (!product) {
      return NextResponse.json(
        { message: "Invalid code", status: false },
        { status: 404 }
      );
    }

    if (product.isClaimed === true) {
      return NextResponse.json(
        { message: "Reward already claimed", status: false },
        { status: 409 }
      );
    }

    await collection.updateOne(
      { productCode: productCode.toLowerCase() },
      { $set: { isClaimed: true } }
    );

    return NextResponse.json({
      message: "Reward claimed successfully!",
      status: true,
      rewardName: product.rewardName ?? null,
    });
  } catch {
    return NextResponse.json(
      { message: "Server error occurred", status: false },
      { status: 500 }
    );
  }
}
