import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI is missing" }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const query = {};
    const products = await inventory.find(query).toArray();

    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI is missing" }, { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
    }

    await client.connect();
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const product = await inventory.insertOne(body);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}