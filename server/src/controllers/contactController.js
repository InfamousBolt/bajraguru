const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();
const { getDb } = require('../db');

/**
 * GET /api/contact
 * List all contact messages (admin only), ordered by created_at desc.
 */
function getAll(req, res) {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
    return res.json({ messages: rows });
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * POST /api/contact
 * Submit a new contact message.
 */
function create(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const db = getDb();
    const id = uuidv4();

    const stmt = db.prepare(`
      INSERT INTO contact_messages (id, name, email, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(id, name.trim(), email.trim(), subject ? subject.trim() : null, message.trim());

    const created = db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(id);

    return res.status(201).json({ message: created });
  } catch (err) {
    console.error('Error creating contact message:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = {
  getAll,
  create,
};
