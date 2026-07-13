-- KFBS EVC — Cloudflare D1 (SQLite) schema + seed.
-- Apply locally:  npx wrangler d1 migrations apply kfbsevc --local
-- Apply to prod:  npx wrangler d1 migrations apply kfbsevc --remote
--
-- Note: D1 has no row-level security. Access control is enforced in code —
-- public pages read only status='approved', writes go through Server Actions,
-- and /admin is protected by Cloudflare Access. `industries` is stored as a
-- JSON array string (SQLite has no array type).

CREATE TABLE IF NOT EXISTS ventures (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  description   TEXT,
  industries    TEXT NOT NULL DEFAULT '[]',
  founder       TEXT,
  year          INTEGER,
  contact_email TEXT,
  website       TEXT,
  logo_url      TEXT,
  status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved')),
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS people (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  relation    TEXT NOT NULL DEFAULT 'Current Student',
  title       TEXT,
  company     TEXT,
  grad_year   INTEGER,
  email       TEXT,
  linkedin    TEXT,
  bio         TEXT,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved')),
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ventures_status ON ventures (status);
CREATE INDEX IF NOT EXISTS idx_people_status ON people (status);

-- Seed the four current ventures (approved). Fixed ids so re-running is a no-op.
INSERT OR IGNORE INTO ventures
  (id, name, description, industries, founder, year, contact_email, website, status)
VALUES
  ('seed-aimpoint',
   'Aim Point Media',
   'A golf industry revenue platform connecting courses with advertising opportunities.',
   '["Media","Consulting"]', 'Seamus O''Connell', 2026,
   'general@aimpoint-media.com', 'https://aimpointmedia.io', 'approved'),
  ('seed-allsquare',
   'All Square',
   'Golf outing planning platform with registration, payments, scoring, and management tools.',
   '["Event Management"]', 'Ramya Meenakshisundaram', 2026,
   'ramya_meenakshisundaram@kenan-flagler.unc.edu', NULL, 'approved'),
  ('seed-smithequine',
   'Smith Equine',
   'Equine sports medicine focused on diagnostics, treatment, and performance optimization.',
   '["Equine Health"]', 'Justin Smith', 2026, NULL, NULL, 'approved'),
  ('seed-unifounders',
   'UniFounders',
   'An AI-powered matchmaking tool for university innovators and their supporting network.',
   '["EdTech","Research Commercialization"]', 'Will Butler', 2023,
   'unifounders@gmail.com', 'https://uni-founders.com', 'approved');
