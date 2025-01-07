import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`navbarMenu_menu_link_group_group_links\` RENAME TO \`navbarLinks\`;`)
  await db.run(sql`ALTER TABLE \`FooterMenu_menu_link_group_group_links\` RENAME TO \`footerLinks\`;`)
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
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`navbarLinks\` RENAME TO \`navbarMenu_menu_link_group_group_links\`;`)
  await db.run(sql`ALTER TABLE \`footerLinks\` RENAME TO \`FooterMenu_menu_link_group_group_links\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_navbarMenu_menu_link_group_group_links\` (
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
  await db.run(sql`INSERT INTO \`__new_navbarMenu_menu_link_group_group_links\`("_order", "_parent_id", "id", "type", "new_tab", "label", "url") SELECT "_order", "_parent_id", "id", "type", "new_tab", "label", "url" FROM \`navbarMenu_menu_link_group_group_links\`;`)
  await db.run(sql`DROP TABLE \`navbarMenu_menu_link_group_group_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_navbarMenu_menu_link_group_group_links\` RENAME TO \`navbarMenu_menu_link_group_group_links\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`navbarMenu_menu_link_group_group_links_order_idx\` ON \`navbarMenu_menu_link_group_group_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbarMenu_menu_link_group_group_links_parent_id_idx\` ON \`navbarMenu_menu_link_group_group_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_FooterMenu_menu_link_group_group_links\` (
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
  await db.run(sql`INSERT INTO \`__new_FooterMenu_menu_link_group_group_links\`("_order", "_parent_id", "id", "type", "new_tab", "label", "url") SELECT "_order", "_parent_id", "id", "type", "new_tab", "label", "url" FROM \`FooterMenu_menu_link_group_group_links\`;`)
  await db.run(sql`DROP TABLE \`FooterMenu_menu_link_group_group_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_FooterMenu_menu_link_group_group_links\` RENAME TO \`FooterMenu_menu_link_group_group_links\`;`)
  await db.run(sql`CREATE INDEX \`FooterMenu_menu_link_group_group_links_order_idx\` ON \`FooterMenu_menu_link_group_group_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`FooterMenu_menu_link_group_group_links_parent_id_idx\` ON \`FooterMenu_menu_link_group_group_links\` (\`_parent_id\`);`)
}
