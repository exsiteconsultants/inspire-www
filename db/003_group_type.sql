ALTER TABLE IF EXISTS "group"
    ADD COLUMN group_type varchar(20) NOT NULL  DEFAULT 'jpl_league';
