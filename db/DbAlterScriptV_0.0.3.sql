Use freshmetrics;

ALTER TABLE `users` ADD `created_at` INT( 13 ) NOT NULL AFTER `resetPasswordExpires`;

ALTER TABLE `users` ADD `updated_at` INT( 13 ) NOT NULL AFTER `created_at`;

ALTER TABLE  `users` ADD  `profile_pic` VARCHAR( 300 ) NOT NULL AFTER  `updated_at`;
