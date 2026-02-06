const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();
const { getDb } = require('../db');

/**
 * GET /api/feedback
 * List all feedback ordered by created_at desc.
 */
function getAll(req, res) {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM feedback ORDER BY created_at DESC').all();
    return res.json({ feedback: rows });
  } catch (err) {
    console.error('Error fetching feedback:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * POST /api/feedback
 * Submit new feedback.
 */
function create(req, res) {
  try {
    const { name, email, rating, experience_type, message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (rating !== undefined && rating !== null && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const db = getDb();
    const id = uuidv4();

    const stmt = db.prepare(`
      INSERT INTO feedback (id, name, email, rating, experience_type, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, name || null, email || null, rating || null, experience_type || null, message.trim());

    const created = db.prepare('SELECT * FROM feedback WHERE id = ?').get(id);

    return res.status(201).json({ feedback: created });
  } catch (err) {
    console.error('Error creating feedback:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = {
  getAll,
  create,
};
