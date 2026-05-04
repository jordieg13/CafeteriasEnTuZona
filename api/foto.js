export default async function handler(req, res) {
    const { ref } = req.query;
    
    if (!ref) return res.status(400).json({ error: 'Missing photo reference' });
  
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.API_KEY}`;
  
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // cachea 24h para no gastar requests
      res.send(Buffer.from(buffer));
    } catch (e) {
      res.status(500).json({ error: 'Error fetching photo' });
    }
  }