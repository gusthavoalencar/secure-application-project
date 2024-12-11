import { useDatabase } from '../../../db.js';
import cookie from 'cookie';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const userId = cookies.userId;

    const todo = await useDatabase(async (db) => {
      return db.get('SELECT * FROM todos WHERE id = ? AND userId = ?', [
        id,
        userId,
      ]);
    });

    if (!todo) {
      return res.status(404).json({ error: 'To-do not found' });
    }

    if (method === 'PATCH') {
      const { completed } = req.body;

      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid completed status' });
      }

      await useDatabase(async (db) => {
        await db.run('UPDATE todos SET completed = ? WHERE id = ?', [
          completed,
          id,
        ]);
      });

      return res.status(200).json({ message: 'To-do updated successfully' });
    } else if (method === 'PUT') {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      await useDatabase(async (db) => {
        await db.run('UPDATE todos SET content = ? WHERE id = ?', [
          content,
          id,
        ]);
      });

      return res.status(200).json({ message: 'To-do updated successfully' });
    } else if (method === 'DELETE') {
      await useDatabase(async (db) => {
        await db.run('DELETE FROM todos WHERE id = ?', [id]);
      });

      return res.status(200).json({ message: 'To-do deleted successfully' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    if (err.message.includes('Authentication')) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}
