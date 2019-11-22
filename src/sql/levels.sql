USE railer-db;
CREATE TABLE `levels` (
    `id` int(6) PRIMARY KEY AUTO_INCREMENT,
    `user_id` varchar(100) NOT NULL,
    `xp` int(6) DEFAULT 0 NOT NULL,
    `last_text_only_sent` varchar(100) NOT NULL,
    `last_attachment_sent` varchar(100) NOT NULL
    `timestamp` TIMESTAMP NOT NULL
);
