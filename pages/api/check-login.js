import jwt from 'jsonwebtoken';
import { useDatabase } from '../../db.js';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log(`Login attempt: email=${email}, password=${password}`);
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized', token }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await useDatabase(async (db) => {
      return db.get('SELECT * FROM users WHERE id = ?', [decoded.id]);
    });

    if (!user) {
      return res.status(401).json({ loggedIn: false, error: 'User not found' });
    }

    return res.status(200).json({ loggedIn: true, user });
  } catch (err) {
    return res.status(401).json({ loggedIn: false, error: err.message });
  }
}
