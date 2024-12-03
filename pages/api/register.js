import loadDatabase from '../../db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, dateOfBirth, email, password } = req.body;

    if (!firstName || !lastName || !dateOfBirth || !email || !password) {
      return res.status(400).json({ error: 'All the fields required' });
    }

    try {
      const db = await loadDatabase();
      await db.run(
        'INSERT INTO users (firstName, lastName, dateOfBirth, email, password) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, dateOfBirth, email, password]
      );
      res.status(200).json({ message: 'User registeration successful!' });
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ error: 'Email is already registered' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
