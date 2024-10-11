import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(request) {

const uri = "mongodb+srv://mongoatlas:56uYkUlBtKxp4dsy@vinugore.l2zgwsk.mongodb.net/";

const client = new MongoClient(uri);

  try {
    const database = client.db('vinu');
    const movies = database.collection('inventory');

    const query = { };
    const movie = await movies.find(query).toArray();

    console.log(movie);
    return NextResponse.json({"a": 34, movie})
  } finally {
    await client.close();
  }

}