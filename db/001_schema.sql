CREATE TABLE IF NOT EXISTS jpl_league (
  id bigint NOT NULL,
  name varchar(255) NOT NULL,
  age varchar(3) NOT NULL,
  cup boolean NOT NULL DEFAULT FALSE,
  CONSTRAINT jpl_league_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS jpl_team (
  id bigint NOT NULL,
  name varchar(255) NOT NULL,
  age varchar(3) NOT NULL,
  isOwnTeam boolean NOT NULL DEFAULT FALSE,
  crest varchar(100),
  team_photo varchar(100),
  bio text,
  CONSTRAINT jpl_team_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS jpl_game (
  id SERIAL PRIMARY KEY,
  game_number int NOT NULL,
  league_id bigint NOT NULL,
  home_team_id bigint NOT NULL,
  away_team_id bigint NOT NULL,
  home_team_score int,
  away_team_score int,
  date timestamp NOT NULL,
  location varchar(255),
  CONSTRAINT jpl_game_league_id_fkey FOREIGN KEY (league_id) REFERENCES jpl_league (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT jpl_game_home_team_id_fkey FOREIGN KEY (home_team_id) REFERENCES jpl_team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT jpl_game_away_team_id_fkey FOREIGN KEY (away_team_id) REFERENCES jpl_team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  image VARCHAR(100),
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS jpl_league_table (
  id SERIAL PRIMARY KEY,
  jpl_league_id bigint NOT NULL,
  jpl_team_id bigint NOT NULL,
  position INT NOT NULL,
  played INT NOT NULL DEFAULT 0,
  won INT NOT NULL DEFAULT 0,
  drawn INT NOT NULL DEFAULT 0,
  lost INT NOT NULL DEFAULT 0,
  goals_for INT NOT NULL DEFAULT 0,
  goals_against INT NOT NULL DEFAULT 0,
  goal_difference INT NOT NULL DEFAULT 0,
  points INT NOT NULL DEFAULT 0,
  CONSTRAINT jpl_league_table_jpl_league_id_fkey FOREIGN KEY (jpl_league_id) REFERENCES jpl_league (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT jpl_league_table_jpl_team_id_fkey FOREIGN KEY (jpl_team_id) REFERENCES jpl_team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE IF NOT EXISTS jpl_league_team (
  id SERIAL PRIMARY KEY,
  jpl_league_id bigint NOT NULL,
  jpl_team_id bigint NOT NULL,
  CONSTRAINT jpl_leage_team_jpl_league_id_fkey FOREIGN KEY (jpl_league_id) REFERENCES jpl_league (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT jpl_leage_team_jpl_team_id_fkey FOREIGN KEY (jpl_team_id) REFERENCES jpl_team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE IF NOT EXISTS jpl_team_staff (
  id SERIAL PRIMARY KEY,
  jpl_team_id bigint NOT NULL,
  staff_id bigint NOT NULL,
  role VARCHAR(255) NOT NULL,
  CONSTRAINT jpl_team_staff_jpl_team_id_fkey FOREIGN KEY (jpl_team_id) REFERENCES jpl_team (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT jpl_team_staff_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES staff (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED
)