import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverApi: ServerApiVersion.v1,
};

let client = new MongoClient(uri, options);
let clientPromise;

if (!uri) {
  throw new Error("Add Mongo URI to .env.development");
}

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
