import { MongoClient, ServerApiVersion } from 'mongodb';

const options = {
  serverApi: { version: ServerApiVersion.v1, strict: false, deprecationErrors: true },
};

/* eslint-disable no-var */
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URI;

if (!uri) {
  // During build / static collection if MONGODB_URI is not yet configured,
  // do not throw at import time so Webpack and Next.js can compile pages.
  clientPromise = Promise.reject(new Error('Missing env var: MONGODB_URI'));
  clientPromise.catch(() => {});
} else if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
