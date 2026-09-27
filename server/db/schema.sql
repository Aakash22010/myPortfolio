-- Portfolio schema for Neon (PostgreSQL). Apply with: npm run db:setup

CREATE TABLE IF NOT EXISTS admin_users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username      text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text NOT NULL,
  tech        text[] NOT NULL DEFAULT '{}',
  github      text DEFAULT '#',
  live        text DEFAULT '#',
  featured    boolean NOT NULL DEFAULT false,
  image_url   text,
  visible     boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  category    text NOT NULL,
  level       text,
  details     text,
  visible     boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experience (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role        text NOT NULL,
  company     text NOT NULL,
  duration    text NOT NULL,
  type        text NOT NULL,
  points      text[] NOT NULL DEFAULT '{}',
  visible     boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS freelance_services (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag         text NOT NULL,
  title       text NOT NULL,
  description text NOT NULL,
  visible     boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_views (
  id    integer PRIMARY KEY,
  count integer NOT NULL DEFAULT 0
);

INSERT INTO page_views (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;
