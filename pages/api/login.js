import jwt from 'jsonwebtoken';
import { useDatabase } from '../../db.js';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const user = await useDatabase(async (db) => {
        return db.get('SELECT * FROM users WHERE email = ?', [email]);
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );

      res.setHeader('Set-Cookie', [
        `token=${token}; Path=/; Max-Age=3600; HttpOnly`,
        `userId=${user.id}; Path=/; Max-Age=3600; HttpOnly`,
      ]);

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
