import { useDatabase } from '../../db.js';
import cookie from 'cookie';

export default async function handler(req, res) {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const userId = cookies.userId;

    if (req.method === 'GET') {
      const todos = await useDatabase(async (db) => {
        return db.all('SELECT * FROM todos WHERE userId = ?', userId);
      });

      return res.status(200).json({ todos });
    } else if (req.method === 'POST') {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      await useDatabase(async (db) => {
        await db.run(
          'INSERT INTO todos (userId, content, completed) VALUES (?, ?, ?)',
          [userId, content, false]
        );
      });

      return res.status(201).json({ message: 'To-do created successfully' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}
