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
    position  SERIAL
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
    position SERIAL
);

INSERT INTO cards (board_id,list_id,card_desc,is_archive) 
values (1,1,'Card One-List One',false,1 );


INSERT INTO cards (board_id,list_id,card_desc,is_archive) 
values (1,1,'Card Two-List One',false,2 );


INSERT INTO cards (board_id,list_id,card_desc,is_archive) 
values (1,2,'Card One-List Two',false,1 );

INSERT INTO cards (board_id,list_id,card_desc,is_archive) 
values (1,2,'Card Two-List Two',false,2 );