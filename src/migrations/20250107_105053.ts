import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`navbarLinks\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`navbarLinks_icon_idx\` ON \`navbarLinks\` (\`icon_id\`);`)
  await db.run(sql`ALTER TABLE \`navbarMenu\` ADD \`menu_link_icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`navbarMenu_menu_link_menu_link_icon_idx\` ON \`navbarMenu\` (\`menu_link_icon_id\`);`)
  await db.run(sql`ALTER TABLE \`footerLinks\` ADD \`icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`footerLinks_icon_idx\` ON \`footerLinks\` (\`icon_id\`);`)
  await db.run(sql`ALTER TABLE \`FooterMenu\` ADD \`menu_link_icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`FooterMenu_menu_link_menu_link_icon_idx\` ON \`FooterMenu\` (\`menu_link_icon_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_navbarLinks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'reference',
  	\`new_tab\` integer,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbarMenu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_navbarLinks\`("_order", "_parent_id", "id", "type", "new_tab", "label", "url") SELECT "_order", "_parent_id", "id", "type", "new_tab", "label", "url" FROM \`navbarLinks\`;`)
  await db.run(sql`DROP TABLE \`navbarLinks\`;`)
  await db.run(sql`ALTER TABLE \`__new_navbarLinks\` RENAME TO \`navbarLinks\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`navbarLinks_order_idx\` ON \`navbarLinks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbarLinks_parent_id_idx\` ON \`navbarLinks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_navbarMenu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` integer DEFAULT false,
  	\`menu_link_type\` text DEFAULT 'reference',
  	\`menu_link_new_tab\` integer,
  	\`menu_link_label\` text,
  	\`menu_link_url\` text,
  	\`menu_link_group_group_title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_navbarMenu\`("_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title") SELECT "_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title" FROM \`navbarMenu\`;`)
  await db.run(sql`DROP TABLE \`navbarMenu\`;`)
  await db.run(sql`ALTER TABLE \`__new_navbarMenu\` RENAME TO \`navbarMenu\`;`)
  await db.run(sql`CREATE INDEX \`navbarMenu_order_idx\` ON \`navbarMenu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbarMenu_parent_id_idx\` ON \`navbarMenu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footerLinks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'reference',
  	\`new_tab\` integer,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`FooterMenu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footerLinks\`("_order", "_parent_id", "id", "type", "new_tab", "label", "url") SELECT "_order", "_parent_id", "id", "type", "new_tab", "label", "url" FROM \`footerLinks\`;`)
  await db.run(sql`DROP TABLE \`footerLinks\`;`)
  await db.run(sql`ALTER TABLE \`__new_footerLinks\` RENAME TO \`footerLinks\`;`)
  await db.run(sql`CREATE INDEX \`footerLinks_order_idx\` ON \`footerLinks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footerLinks_parent_id_idx\` ON \`footerLinks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_FooterMenu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` integer DEFAULT false,
  	\`menu_link_type\` text DEFAULT 'reference',
  	\`menu_link_new_tab\` integer,
  	\`menu_link_label\` text,
  	\`menu_link_url\` text,
  	\`menu_link_group_group_title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_FooterMenu\`("_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title") SELECT "_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title" FROM \`FooterMenu\`;`)
  await db.run(sql`DROP TABLE \`FooterMenu\`;`)
  await db.run(sql`ALTER TABLE \`__new_FooterMenu\` RENAME TO \`FooterMenu\`;`)
  await db.run(sql`CREATE INDEX \`FooterMenu_order_idx\` ON \`FooterMenu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`FooterMenu_parent_id_idx\` ON \`FooterMenu\` (\`_parent_id\`);`)
}
