export default function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      `token=; Path=/; Max-Age=0; HttpOnly`,
      `userId=; Path=/; Max-Age=0; HttpOnly`,
    ]);

    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
