START TRANSACTION;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `boards`;
CREATE TABLE IF NOT EXISTS `boards` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB; 

INSERT INTO boards VALUES (NULL, 'My Board');

DROP TABLE IF EXISTS `columns`;
CREATE TABLE IF NOT EXISTS `columns` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `board_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_board_id`
  FOREIGN KEY (`board_id`) REFERENCES boards(`id`)

) ENGINE=INNODB; 

INSERT INTO columns VALUES (NULL, 'To Dos', 1);

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(200) NOT NULL,
  `column_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_column_id
  FOREIGN KEY (`column_id`) REFERENCES columns(`id`)
) ENGINE=INNODB;

INSERT INTO items VALUES (NULL, 'Take out the trash', 1);
INSERT INTO items VALUES (NULL, 'Wash Dishes', 1);
INSERT INTO items VALUES (NULL, 'Weight Training', 1);
INSERT INTO items VALUES (NULL, 'Grab groceries', 1);
INSERT INTO items VALUES (NULL, 'Howl at the moon', 1);


SET FOREIGN_KEY_CHECKS = 1;

COMMIT;
