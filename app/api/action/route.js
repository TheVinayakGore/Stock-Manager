// /app/api/action/route.js
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const { action, slug } = await request.json();

    if (!slug || !["plus", "minus"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("stock");
    const inventory = db.collection("inventory");

    const product = await inventory.findOne({ slug });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let newQuantity = action === "plus" ? product.quantity + 1 : product.quantity - 1;
    if (newQuantity < 0) newQuantity = 0;

    await inventory.updateOne(
      { slug },
      { $set: { quantity: newQuantity } }
    );

    return NextResponse.json({ success: true, message: "Quantity updated" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

// Handle product update
export async function PUT(request) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI is missing" }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    const { slug, ...updateData } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await client.connect();
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const filter = { slug: slug };

    // Ensure only valid fields are updated
    const validFields = ["slug", "quantity", "price"];
    const sanitizedUpdateData = Object.keys(updateData)
      .filter((key) => validFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    const updateDoc = {
      $set: sanitizedUpdateData,
    };

    const result = await inventory.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

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

// Handle product deletion
export async function DELETE(request) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI is missing" }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await client.connect();
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const filter = { slug: slug };

    const result = await inventory.deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} document(s) deleted`,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}