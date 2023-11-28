INSERT INTO
  league (event_id, group_id, name, age, cup)
VALUES
  (
    28795,
    222330,
    'JPL U12 Warrior - Blue',
    'U12',
    FALSE
  ),
  (
    28796,
    222333,
    'JPL U13 Warrior - Blue',
    'U13',
    FALSE
  ),
  (
    28798,
    222634,
    'JPL U15 Warrior - Red',
    'U15',
    FALSE
  ),
  (
    28799,
    222641,
    'JPL U16 Warrior - Green',
    'U16',
    FALSE
  );

INSERT INTO
  team (id, name, age, isownteam, crest, team_photo, bio)
VALUES
  (
    1778356,
    'Inspire Girls Academy',
    'U12',
    true,
    'iga_logo.webp',
    'u12-team.jpg',
    'tbd'
  ),
  (
    1776464,
    'Inspire Girls Academy',
    'U13',
    true,
    'iga_logo.webp',
    'u13-team.jpg',
    'tbd'
  ),
  (
    1782574,
    'Inspire Girls Academy',
    'U15',
    true,
    'iga_logo.webp',
    'u15-team.jpg',
    'tbd'
  ),
  (
    1782692,
    'Inspire Girls Academy',
    'U16',
    true,
    'iga_logo.webp',
    'u16-team.jpg',
    'tbd'
  );

INSERT INTO
  league_team (group_id, team_id)
VALUES
  (222330, 1778356),
  (222333, 1776464),
  (222634, 1782574),
  (222641, 1782692);
