

Use freshmetrics;

ALTER TABLE `users` ADD `resetPasswordToken` VARCHAR( 500 ) NOT NULL AFTER `password`;

ALTER TABLE `users` ADD `resetPasswordExpires` DATETIME NOT NULL AFTER `resetPasswordToken`;

