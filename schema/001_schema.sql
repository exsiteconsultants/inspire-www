CREATE TABLE IF NOT EXISTS league (
  id SERIAL PRIMARY KEY,
  event_id integer UNIQUE NOT NULL,
  group_id integer UNIQUE NOT NULL,
  name varchar(255) NOT NULL,
  age varchar(3) NOT NULL,
  cup boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS team (
  id integer NOT NULL,
  name varchar(255) NOT NULL,
  age varchar(3) NOT NULL,
  isOwnTeam boolean NOT NULL DEFAULT FALSE,
  crest varchar(255),
  team_photo varchar(255),
  bio text,
  CONSTRAINT team_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS game (
  id SERIAL PRIMARY KEY,
  game_number integer NOT NULL,
  group_id integer NOT NULL,
  home_team_id integer NOT NULL,
  away_team_id integer NOT NULL,
  home_team_score int,
  away_team_score int,
  date timestamp NOT NULL,
  location varchar(255),
  CONSTRAINT game_group_id_fkey FOREIGN KEY (group_id) REFERENCES league (group_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT game_home_team_id_fkey FOREIGN KEY (home_team_id) REFERENCES team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT game_away_team_id_fkey FOREIGN KEY (away_team_id) REFERENCES team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  image VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS league_table (
  id SERIAL PRIMARY KEY,
  group_id integer NOT NULL,
  team_id integer NOT NULL,
  position integer NOT NULL,
  played integer NOT NULL DEFAULT 0,
  won integer NOT NULL DEFAULT 0,
  drawn integer NOT NULL DEFAULT 0,
  lost integer NOT NULL DEFAULT 0,
  goals_for integer NOT NULL DEFAULT 0,
  goals_against integer NOT NULL DEFAULT 0,
  goal_difference integer NOT NULL DEFAULT 0,
  points integer NOT NULL DEFAULT 0,
  CONSTRAINT league_table_group_id_fkey FOREIGN KEY (group_id) REFERENCES league (group_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT league_table_team_id_fkey FOREIGN KEY (team_id) REFERENCES team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE IF NOT EXISTS league_team (
  id SERIAL PRIMARY KEY,
  group_id integer NOT NULL,
  team_id integer NOT NULL,
  CONSTRAINT league_team_group_id_fkey FOREIGN KEY (group_id) REFERENCES league (group_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT league_team_team_id_fkey FOREIGN KEY (team_id) REFERENCES team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE IF NOT EXISTS team_staff (
  id SERIAL PRIMARY KEY,
  team_id integer NOT NULL,
  staff_id integer NOT NULL,
  role VARCHAR(255) NOT NULL,
  CONSTRAINT team_staff_team_id_fkey FOREIGN KEY (team_id) REFERENCES team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT team_staff_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES staff (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED
)
