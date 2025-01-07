import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Storing the navbar & footer group-links in variables
  const { rows: navbarMenuLinksBackup } = await db.run(
    sql`SELECT * FROM site_settings_navbar_menu_links_menu_link_group_group_links;`,
  )

  const { rows: footerMenuLinksBackup } = await db.run(
    sql`SELECT * FROM site_settings_footer_footer_links_menu_link_group_group_links;`,
  )

  console.dir(
    { navbarMenuLinksBackup, footerMenuLinksBackup },
    { depth: Infinity },
  )

  await db.run(
    sql`ALTER TABLE \`site_settings_navbar_menu_links_menu_link_group_group_links\` RENAME TO \`navbarMenu_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings_navbar_menu_links\` RENAME TO \`navbarMenu\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings_footer_footer_links_menu_link_group_group_links\` RENAME TO \`FooterMenu_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings_footer_footer_links\` RENAME TO \`FooterMenu\`;`,
  )
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
  await db.run(
    sql`INSERT INTO \`__new_navbarMenu_menu_link_group_group_links\`("_order", "_parent_id", "id", "type", "new_tab", "label", "url") SELECT "_order", "_parent_id", "id", "type", "new_tab", "label", "url" FROM \`navbarMenu_menu_link_group_group_links\`;`,
  )
  await db.run(sql`DROP TABLE \`navbarMenu_menu_link_group_group_links\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_navbarMenu_menu_link_group_group_links\` RENAME TO \`navbarMenu_menu_link_group_group_links\`;`,
  )
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(
    sql`CREATE INDEX \`navbarMenu_menu_link_group_group_links_order_idx\` ON \`navbarMenu_menu_link_group_group_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`navbarMenu_menu_link_group_group_links_parent_id_idx\` ON \`navbarMenu_menu_link_group_group_links\` (\`_parent_id\`);`,
  )
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
  await db.run(
    sql`INSERT INTO \`__new_navbarMenu\`("_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title") SELECT "_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title" FROM \`navbarMenu\`;`,
  )
  await db.run(sql`DROP TABLE \`navbarMenu\`;`)
  await db.run(sql`ALTER TABLE \`__new_navbarMenu\` RENAME TO \`navbarMenu\`;`)
  await db.run(
    sql`CREATE INDEX \`navbarMenu_order_idx\` ON \`navbarMenu\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`navbarMenu_parent_id_idx\` ON \`navbarMenu\` (\`_parent_id\`);`,
  )
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
  await db.run(
    sql`INSERT INTO \`__new_FooterMenu_menu_link_group_group_links\`("_order", "_parent_id", "id", "type", "new_tab", "label", "url") SELECT "_order", "_parent_id", "id", "type", "new_tab", "label", "url" FROM \`FooterMenu_menu_link_group_group_links\`;`,
  )
  await db.run(sql`DROP TABLE \`FooterMenu_menu_link_group_group_links\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_FooterMenu_menu_link_group_group_links\` RENAME TO \`FooterMenu_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`FooterMenu_menu_link_group_group_links_order_idx\` ON \`FooterMenu_menu_link_group_group_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`FooterMenu_menu_link_group_group_links_parent_id_idx\` ON \`FooterMenu_menu_link_group_group_links\` (\`_parent_id\`);`,
  )
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
  await db.run(
    sql`INSERT INTO \`__new_FooterMenu\`("_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title") SELECT "_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title" FROM \`FooterMenu\`;`,
  )
  await db.run(sql`DROP TABLE \`FooterMenu\`;`)
  await db.run(sql`ALTER TABLE \`__new_FooterMenu\` RENAME TO \`FooterMenu\`;`)
  await db.run(
    sql`CREATE INDEX \`FooterMenu_order_idx\` ON \`FooterMenu\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`FooterMenu_parent_id_idx\` ON \`FooterMenu\` (\`_parent_id\`);`,
  )

  // inserting into newly created tables
  if (navbarMenuLinksBackup.length) {
    for (const row of navbarMenuLinksBackup) {
      await db.run(
        sql`
    INSERT INTO navbarMenu_menu_link_group_group_links (_order, _parent_id, id, type, new_tab, label, url)
    VALUES (${row._order}, ${row._parent_id}, ${row.id}, ${row.type}, ${row.new_tab}, ${row.label}, ${row.url});
  `,
      )
    }
  }

  // inserting into newly created footer table
  if (footerMenuLinksBackup.length) {
    for (const row of footerMenuLinksBackup) {
      await db.run(
        sql`
    INSERT INTO FooterMenu_menu_link_group_group_links (_order, _parent_id, id, type, new_tab, label, url)
    VALUES (${row._order}, ${row._parent_id}, ${row.id}, ${row.type}, ${row.new_tab}, ${row.label}, ${row.url});
  `,
      )
    }
  }

  await db.run(sql`CREATE TABLE \`__new_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`forms_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "forms_id") SELECT "id", "order", "parent_id", "path", "forms_id" FROM \`pages_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_rels\` RENAME TO \`pages_rels\`;`)
  await db.run(
    sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_rels_forms_id_idx\` ON \`pages_rels\` (\`forms_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new__pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`forms_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "forms_id") SELECT "id", "order", "parent_id", "path", "forms_id" FROM \`_pages_v_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new__pages_v_rels\` RENAME TO \`_pages_v_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_forms_id_idx\` ON \`_pages_v_rels\` (\`forms_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_blogs_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_blogs_rels\`("id", "order", "parent_id", "path", "tags_id", "users_id") SELECT "id", "order", "parent_id", "path", "tags_id", "users_id" FROM \`blogs_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`blogs_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_blogs_rels\` RENAME TO \`blogs_rels\`;`)
  await db.run(
    sql`CREATE INDEX \`blogs_rels_order_idx\` ON \`blogs_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blogs_rels_parent_idx\` ON \`blogs_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blogs_rels_path_idx\` ON \`blogs_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blogs_rels_tags_id_idx\` ON \`blogs_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blogs_rels_users_id_idx\` ON \`blogs_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new__blogs_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_blogs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new__blogs_v_rels\`("id", "order", "parent_id", "path", "tags_id", "users_id") SELECT "id", "order", "parent_id", "path", "tags_id", "users_id" FROM \`_blogs_v_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`_blogs_v_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new__blogs_v_rels\` RENAME TO \`_blogs_v_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_order_idx\` ON \`_blogs_v_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_parent_idx\` ON \`_blogs_v_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_path_idx\` ON \`_blogs_v_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_tags_id_idx\` ON \`_blogs_v_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_users_id_idx\` ON \`_blogs_v_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`blogs_id\` integer,
  	\`tags_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blogs_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_search_rels\`("id", "order", "parent_id", "path", "blogs_id", "tags_id", "users_id") SELECT "id", "order", "parent_id", "path", "blogs_id", "tags_id", "users_id" FROM \`search_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_search_rels\` RENAME TO \`search_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_blogs_id_idx\` ON \`search_rels\` (\`blogs_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_tags_id_idx\` ON \`search_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_users_id_idx\` ON \`search_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`blogs_id\` integer,
  	\`tags_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blogs_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "blogs_id", "tags_id", "media_id", "users_id", "forms_id", "form_submissions_id", "search_id") SELECT "id", "order", "parent_id", "path", "pages_id", "blogs_id", "tags_id", "media_id", "users_id", "forms_id", "form_submissions_id", "search_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_blogs_id_idx\` ON \`payload_locked_documents_rels\` (\`blogs_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_preferences_rels\`("id", "order", "parent_id", "path", "users_id") SELECT "id", "order", "parent_id", "path", "users_id" FROM \`payload_preferences_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_preferences_rels\` RENAME TO \`payload_preferences_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_site_settings_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_site_settings_texts\`("id", "order", "parent_id", "path", "text") SELECT "id", "order", "parent_id", "path", "text" FROM \`site_settings_texts\`;`,
  )
  await db.run(sql`DROP TABLE \`site_settings_texts\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_site_settings_texts\` RENAME TO \`site_settings_texts\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_texts_order_parent_idx\` ON \`site_settings_texts\` (\`order\`,\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_site_settings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_site_settings_rels\`("id", "order", "parent_id", "path", "pages_id") SELECT "id", "order", "parent_id", "path", "pages_id" FROM \`site_settings_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`site_settings_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_site_settings_rels\` RENAME TO \`site_settings_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_rels_order_idx\` ON \`site_settings_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_rels_parent_idx\` ON \`site_settings_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_rels_path_idx\` ON \`site_settings_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_rels_pages_id_idx\` ON \`site_settings_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`stripe_connect_country\` text;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`stripe_connect_currency\` text;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`stripe_connect_stripe_user_id\` text;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`stripe_connect_stripe_admin_dashboard\` text;`,
  )
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`navbarMenu_menu_link_group_group_links\` RENAME TO \`site_settings_navbar_menu_links_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`navbarMenu\` RENAME TO \`site_settings_navbar_menu_links\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`FooterMenu_menu_link_group_group_links\` RENAME TO \`site_settings_footer_footer_links_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`FooterMenu\` RENAME TO \`site_settings_footer_footer_links\`;`,
  )
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_navbar_menu_links_menu_link_group_group_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'reference',
  	\`new_tab\` integer,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_navbar_menu_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_site_settings_navbar_menu_links_menu_link_group_group_links\`("_order", "_parent_id", "id", "type", "new_tab", "label", "url") SELECT "_order", "_parent_id", "id", "type", "new_tab", "label", "url" FROM \`site_settings_navbar_menu_links_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`DROP TABLE \`site_settings_navbar_menu_links_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`__new_site_settings_navbar_menu_links_menu_link_group_group_links\` RENAME TO \`site_settings_navbar_menu_links_menu_link_group_group_links\`;`,
  )
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(
    sql`CREATE INDEX \`site_settings_navbar_menu_links_menu_link_group_group_links_order_idx\` ON \`site_settings_navbar_menu_links_menu_link_group_group_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_navbar_menu_links_menu_link_group_group_links_parent_id_idx\` ON \`site_settings_navbar_menu_links_menu_link_group_group_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_site_settings_navbar_menu_links\` (
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
  await db.run(
    sql`INSERT INTO \`__new_site_settings_navbar_menu_links\`("_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title") SELECT "_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title" FROM \`site_settings_navbar_menu_links\`;`,
  )
  await db.run(sql`DROP TABLE \`site_settings_navbar_menu_links\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_site_settings_navbar_menu_links\` RENAME TO \`site_settings_navbar_menu_links\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_navbar_menu_links_order_idx\` ON \`site_settings_navbar_menu_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_navbar_menu_links_parent_id_idx\` ON \`site_settings_navbar_menu_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_site_settings_footer_footer_links_menu_link_group_group_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'reference',
  	\`new_tab\` integer,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_footer_footer_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_site_settings_footer_footer_links_menu_link_group_group_links\`("_order", "_parent_id", "id", "type", "new_tab", "label", "url") SELECT "_order", "_parent_id", "id", "type", "new_tab", "label", "url" FROM \`site_settings_footer_footer_links_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`DROP TABLE \`site_settings_footer_footer_links_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`__new_site_settings_footer_footer_links_menu_link_group_group_links\` RENAME TO \`site_settings_footer_footer_links_menu_link_group_group_links\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_footer_footer_links_menu_link_group_group_links_order_idx\` ON \`site_settings_footer_footer_links_menu_link_group_group_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_footer_footer_links_menu_link_group_group_links_parent_id_idx\` ON \`site_settings_footer_footer_links_menu_link_group_group_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_site_settings_footer_footer_links\` (
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
  await db.run(
    sql`INSERT INTO \`__new_site_settings_footer_footer_links\`("_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title") SELECT "_order", "_parent_id", "id", "group", "menu_link_type", "menu_link_new_tab", "menu_link_label", "menu_link_url", "menu_link_group_group_title" FROM \`site_settings_footer_footer_links\`;`,
  )
  await db.run(sql`DROP TABLE \`site_settings_footer_footer_links\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_site_settings_footer_footer_links\` RENAME TO \`site_settings_footer_footer_links\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_footer_footer_links_order_idx\` ON \`site_settings_footer_footer_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_footer_footer_links_parent_id_idx\` ON \`site_settings_footer_footer_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_pages_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`forms_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "forms_id") SELECT "id", "order", "parent_id", "path", "forms_id" FROM \`pages_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_rels\` RENAME TO \`pages_rels\`;`)
  await db.run(
    sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_rels_forms_id_idx\` ON \`pages_rels\` (\`forms_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new__pages_v_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`forms_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "forms_id") SELECT "id", "order", "parent_id", "path", "forms_id" FROM \`_pages_v_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new__pages_v_rels\` RENAME TO \`_pages_v_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_forms_id_idx\` ON \`_pages_v_rels\` (\`forms_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_blogs_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_blogs_rels\`("id", "order", "parent_id", "path", "tags_id", "users_id") SELECT "id", "order", "parent_id", "path", "tags_id", "users_id" FROM \`blogs_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`blogs_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_blogs_rels\` RENAME TO \`blogs_rels\`;`)
  await db.run(
    sql`CREATE INDEX \`blogs_rels_order_idx\` ON \`blogs_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blogs_rels_parent_idx\` ON \`blogs_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blogs_rels_path_idx\` ON \`blogs_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blogs_rels_tags_id_idx\` ON \`blogs_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`blogs_rels_users_id_idx\` ON \`blogs_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new__blogs_v_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_blogs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new__blogs_v_rels\`("id", "order", "parent_id", "path", "tags_id", "users_id") SELECT "id", "order", "parent_id", "path", "tags_id", "users_id" FROM \`_blogs_v_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`_blogs_v_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new__blogs_v_rels\` RENAME TO \`_blogs_v_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_order_idx\` ON \`_blogs_v_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_parent_idx\` ON \`_blogs_v_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_path_idx\` ON \`_blogs_v_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_tags_id_idx\` ON \`_blogs_v_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_blogs_v_rels_users_id_idx\` ON \`_blogs_v_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_search_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`blogs_id\` integer,
  	\`tags_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blogs_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_search_rels\`("id", "order", "parent_id", "path", "blogs_id", "tags_id", "users_id") SELECT "id", "order", "parent_id", "path", "blogs_id", "tags_id", "users_id" FROM \`search_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_search_rels\` RENAME TO \`search_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_blogs_id_idx\` ON \`search_rels\` (\`blogs_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_tags_id_idx\` ON \`search_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`search_rels_users_id_idx\` ON \`search_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`blogs_id\` integer,
  	\`tags_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blogs_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "blogs_id", "tags_id", "media_id", "users_id", "forms_id", "form_submissions_id", "search_id") SELECT "id", "order", "parent_id", "path", "pages_id", "blogs_id", "tags_id", "media_id", "users_id", "forms_id", "form_submissions_id", "search_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_blogs_id_idx\` ON \`payload_locked_documents_rels\` (\`blogs_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_preferences_rels\`("id", "order", "parent_id", "path", "users_id") SELECT "id", "order", "parent_id", "path", "users_id" FROM \`payload_preferences_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_preferences_rels\` RENAME TO \`payload_preferences_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_site_settings_texts\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_site_settings_texts\`("id", "order", "parent_id", "path", "text") SELECT "id", "order", "parent_id", "path", "text" FROM \`site_settings_texts\`;`,
  )
  await db.run(sql`DROP TABLE \`site_settings_texts\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_site_settings_texts\` RENAME TO \`site_settings_texts\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_texts_order_parent_idx\` ON \`site_settings_texts\` (\`order\`,\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_site_settings_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_site_settings_rels\`("id", "order", "parent_id", "path", "pages_id") SELECT "id", "order", "parent_id", "path", "pages_id" FROM \`site_settings_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`site_settings_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_site_settings_rels\` RENAME TO \`site_settings_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_rels_order_idx\` ON \`site_settings_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_rels_parent_idx\` ON \`site_settings_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_rels_path_idx\` ON \`site_settings_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_rels_pages_id_idx\` ON \`site_settings_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` DROP COLUMN \`stripe_connect_country\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` DROP COLUMN \`stripe_connect_currency\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` DROP COLUMN \`stripe_connect_stripe_user_id\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` DROP COLUMN \`stripe_connect_stripe_admin_dashboard\`;`,
  )
}
