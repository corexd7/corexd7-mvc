import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body=await req?.json();
  const client = await clientPromise;
  const cursor = await client
    .db("mrenergyProduct")
    .collection("product-key")
    .find({key:body?.id}).toArray();
    
  console.log(cursor)
  if(cursor?.length!==0){
    await client
    .db("mrenergyProduct")
    .collection("product-key")
    .updateOne({key: body?.id,isUsed:0}, {$set:{isUsed:1}})
    return Response.json({ message: "Valid Key",status:true,data:cursor[0] });
  }else{
      return Response.json({ message: "Invalid Key",status:false });
  }
}
