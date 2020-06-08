/*Table BOARD*/
CREATE TABLE IF NOT EXISTS board
 (
    id SERIAL PRIMARY KEY,
    board_name VARCHAR(100) NOT NULL
);

INSERT INTO board (board_name) values ('Board One');

/*Table LISTS */
CREATE TABLE IF NOT EXISTS lists
 (
    id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES board(id) ON DELETE RESTRICT,
    list_name VARCHAR(100) NOT NULL,
    position  FLOAT SERIAL
);

INSERT INTO lists (board_id,list_name) values (1,'Thing To Do');
INSERT INTO lists (board_id,list_name) values (1,'Doing');
INSERT INTO lists (board_id,list_name) values (1,'Done');

/*Table CARDS */
CREATE TABLE IF NOT EXISTS cards
 (
    id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES board(id) ON DELETE RESTRICT,
    list_id INTEGER REFERENCES lists(id) ON DELETE RESTRICT,
    card_desc text NOT NULL,
    due_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_archive  BOOLEAN NOT NULL,
    position FLOAT SERIAL
);

INSERT INTO cards (board_id,list_id,card_desc,is_archive,position) 
values (1,1,'Card One-List One',false,1 );


INSERT INTO cards (board_id,list_id,card_desc,is_archive,position) 
values (1,1,'Card Two-List One',false,2 );


INSERT INTO cards (board_id,list_id,card_desc,is_archive,position) 
values (1,2,'Card One-List Two',false,1 );

INSERT INTO cards (board_id,list_id,card_desc,is_archive,position) 
values (1,2,'Card Two-List Two',false,2 );

alter table cards alter column position type FLOAT;

-- https://www.postgresql.org/docs/9.3/sql-altertable.html

CREATE SEQUENCE my_serial AS integer START 1 OWNED BY address.new_id;

ALTER TABLE address ALTER COLUMN new_id SET DEFAULT nextval('my_serial');

-- Create -- To make a colum serail
CREATE SEQUENCE card_position_seq;
CREATE TABLE cards (
    position FLOAT NOT NULL DEFAULT nextval('card_position_seq')
);
ALTER SEQUENCE card_position_seq OWNED BY cards.position;
-- Exisiting --> To alter
CREATE SEQUENCE card_position_seq AS FLOAT START 1 OWNED BY cards.position;

ALTER TABLE cards ALTER COLUMN position SET DEFAULT nextval('card_position_seq');

CREATE SEQUENCE list_position_seq AS FLOAT START 1 OWNED BY lists.position;

ALTER TABLE lists ALTER COLUMN position SET DEFAULT nextval('lists_position_seq');

-- Create -- To make a colum serail
CREATE SEQUENCE list_position_seq;
CREATE TABLE lists (
    position FLOAT NOT NULL DEFAULT nextval('list_position_seq')
);