USE railer-db;
CREATE TABLE `cosmetic` (
	`user_id` VARCHAR(18) NOT NULL,
	`metadata` TEXT NOT NULL DEFAULT '{}' COMMENT 'Used to store miscellaneous things on a user'
);
