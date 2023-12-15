/*const jwt = require('jsonwebtoken');

const jwtController = {
  issueToken(req, res) {
    const { username, password } = req.body;

    // Mock user validation (replace with real database check in production)
    const mockUser = { username: 'keijo', password: 'keijo' };

    if (username === mockUser.username && password === mockUser.password) {
      const payload = { username }; // Payload should come from your validated user data
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
};

module.exports = jwtController;*/