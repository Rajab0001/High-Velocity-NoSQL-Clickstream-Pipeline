/**
 * FILE: 01_database_seed_and_schema.js
 * DESCRIPTION: Initializes the ECommerce_Analytics database context
 * and seeds structural JSON data simulating high-velocity user sessions.
 */

// Establish database context
db = db.getSiblingDB('ECommerce_Analytics');

// Clear existing collections to guarantee idempotent execution states
db.clickstream_events.drop();

print('Seeding high-velocity clickstream event documents...');

db.clickstream_events.insertMany([
  {
    "session_id": "SESS-101",
    "user_id": "USR-00412",
    "event_type": "cart_add",
    "device": "Mobile",
    "timestamp": ISODate("2026-05-26T10:00:00Z")
  },
  {
    "session_id": "SESS-101",
    "user_id": "USR-00412",
    "event_type": "purchase",
    "device": "Mobile",
    "timestamp": ISODate("2026-05-26T10:05:00Z")
  },
  {
    "session_id": "SESS-102",
    "user_id": "USR-00981",
    "event_type": "cart_add",
    "device": "Desktop",
    "timestamp": ISODate("2026-05-26T10:12:00Z")
  },
  {
    "session_id": "SESS-103",
    "user_id": "USR-00234",
    "event_type": "cart_add",
    "device": "Mobile",
    "timestamp": ISODate("2026-05-26T10:15:00Z")
  },
  {
    "session_id": "SESS-104",
    "user_id": "USR-00711",
    "event_type": "cart_add",
    "device": "Desktop",
    "timestamp": ISODate("2026-05-26T10:20:00Z")
  },
  {
    "session_id": "SESS-104",
    "user_id": "USR-00711",
    "event_type": "purchase",
    "device": "Desktop",
    "timestamp": ISODate("2026-05-26T10:22:00Z")
  },
  {
    "session_id": "SESS-105",
    "user_id": "USR-00502",
    "event_type": "cart_add",
    "device": "Mobile",
    "timestamp": ISODate("2026-05-26T10:30:00Z")
  },
  {
    "session_id": "SESS-201",
    "user_id": "USR-00844",
    "event_type": "purchase",
    "device": "Desktop",
    "timestamp": ISODate("2026-05-26T11:00:00Z"),
    "cart_items": [
      { "product_id": "PROD-A", "category": "Electronics", "price": 120.00, "quantity": 4 },
      { "product_id": "PROD-B", "category": "Accessories", "price": 25.00, "quantity": 8 }
    ]
  }
]);

print('Database initialized and collections seeded successfully.');
