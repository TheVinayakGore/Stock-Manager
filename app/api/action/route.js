import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI is missing" }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    const { action, slug, initialQuantity } = await request.json();

    if (!action || !slug || initialQuantity === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await client.connect();
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const filter = { slug: slug };

    const newQuantity = action === "plus" ? initialQuantity + 1 : initialQuantity - 1;

    const updateDoc = {
      $set: {
        quantity: newQuantity,
      },
    };

    const result = await inventory.updateOne(filter, updateDoc);

    return NextResponse.json({
      success: true,
      message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}