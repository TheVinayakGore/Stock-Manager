// /app/api/search/route.js
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    await client.connect();
    const db = client.db("stock");
    const inventory = db.collection("inventory");

    const products = await inventory
      .find({ slug: { $regex: query, $options: "i" } })
      .toArray();

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}