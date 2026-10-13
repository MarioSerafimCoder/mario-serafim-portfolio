PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS leads (
 id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS lead_submissions (
 id TEXT PRIMARY KEY, lead_id TEXT NOT NULL REFERENCES leads(id), kind TEXT NOT NULL,
 segment TEXT NOT NULL, stage TEXT NOT NULL, message TEXT NOT NULL,
 answers_json TEXT NOT NULL, campaign_json TEXT NOT NULL,
 service_consent INTEGER NOT NULL, marketing_consent INTEGER NOT NULL,
 consent_version TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS submissions_lead ON lead_submissions(lead_id, created_at);
CREATE TABLE IF NOT EXISTS lead_rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
