CREATE TABLE `users` (
	`id` integer,
	`updatedId` integer,
	`first_name` text,
	`first_name22` text,
	`email` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);