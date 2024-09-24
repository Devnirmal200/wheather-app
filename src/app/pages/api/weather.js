import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_MONGODB_URI;
const client = new MongoClient(uri);

async function handler(req, res) {
    try {
       
        await client.connect();
        const db = client.db('weatherDB');
        const collection = db.collection('weatherData');
        
       
    

        if (req.method === 'POST') {
            const weather = req.body;
            await collection.updateOne(
                { city: weather.name },
                { $set: weather },
                { upsert: true }
            );
            res.status(201).json({ message: 'Weather data saved successfully!' });
        } else if (req.method === 'GET') {
            const data = await collection.find({}).toArray();
            res.status(200).json(data);
        } else if (req.method === 'DELETE') {
            const { city } = req.body;
            await collection.deleteOne({ city });
            res.status(204).end();
        } else {
            res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
       
        console.error("MongoDB connection error:", error.message);
        console.error("Full error stack:", error.stack);

       
        res.status(500).json({ 
            message: "Database connection failed", 
            error: error.message 
        });
    } finally {
       
        await client.close();
    }
}

export default handler;
