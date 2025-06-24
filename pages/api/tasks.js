// pages/api/tasks.js
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Prevent creating multiple MongoClient instances in development
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    const { task } = req.body;

    if (!task || typeof task !== 'string') {
      return res.status(400).json({ message: 'Task is required and must be a string' });
    }

    const newTask = {
      task,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await db.collection('todos').insertOne(newTask);
      res.status(201).json({ ...newTask, _id: result.insertedId });
    } catch (err) {
      console.error('Error inserting task:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  else if (req.method === 'GET') {
    try {
      const tasks = await db.collection('todos').find().sort({ createdAt: -1 }).toArray();
      res.status(200).json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Valid id is required' });
    }

    try {
      await db.collection('todos').deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: 'Deleted' });
    } catch (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
