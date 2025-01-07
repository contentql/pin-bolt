import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`general_currency\` text DEFAULT 'usd' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_light_mode_primary\` text DEFAULT '#C084FC' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_light_mode_background\` text DEFAULT '#F8FAFC' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_light_mode_text\` text DEFAULT '#0F0F0F' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_light_mode_foreground\` text DEFAULT '#E2E8F0' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_light_mode_popover\` text DEFAULT '#000000' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_light_mode_border\` text DEFAULT '#000000' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_dark_mode_primary\` text DEFAULT '#60A5FA' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_dark_mode_background\` text DEFAULT '#0F172A' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_dark_mode_text\` text DEFAULT '#FFFAFA' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_dark_mode_foreground\` text DEFAULT '#1E293B' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_dark_mode_popover\` text DEFAULT '#000000' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_dark_mode_border\` text DEFAULT '#000000' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_fonts_display_type\` text DEFAULT 'googleFont' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_fonts_display_custom_font_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_fonts_display_remote_font\` text DEFAULT 'https://fonts.googleapis.com/css2?family=Chewy&display=swap';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_fonts_display_font_name\` text DEFAULT 'Chewy';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_fonts_body_type\` text DEFAULT 'googleFont' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_fonts_body_custom_font_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_fonts_body_remote_font\` text DEFAULT 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_fonts_body_font_name\` text DEFAULT 'Roboto';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`theme_settings_radius\` text DEFAULT 'none' NOT NULL;`)
  await db.run(sql`CREATE INDEX \`site_settings_theme_settings_fonts_display_theme_settings_fonts_display_custom_font_idx\` ON \`site_settings\` (\`theme_settings_fonts_display_custom_font_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_theme_settings_fonts_body_theme_settings_fonts_body_custom_font_idx\` ON \`site_settings\` (\`theme_settings_fonts_body_custom_font_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`stripe_connect_country\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`stripe_connect_currency\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`stripe_connect_stripe_user_id\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`stripe_connect_stripe_admin_dashboard\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`general_title\` text NOT NULL,
  	\`general_description\` text NOT NULL,
  	\`general_favicon_url_id\` integer NOT NULL,
  	\`general_og_image_url_id\` integer NOT NULL,
  	\`navbar_logo_image_url_id\` integer NOT NULL,
  	\`navbar_logo_height\` numeric,
  	\`navbar_logo_width\` numeric,
  	\`footer_logo_image_url_id\` integer NOT NULL,
  	\`footer_logo_height\` numeric,
  	\`footer_logo_width\` numeric,
  	\`footer_logo_description\` text,
  	\`footer_copyright\` text,
  	\`monetization_ad_sense_id\` text,
  	\`monetization_measurement_id\` text,
  	\`stripe_connect_country\` text,
  	\`stripe_connect_currency\` text,
  	\`stripe_connect_stripe_user_id\` text,
  	\`stripe_connect_stripe_admin_dashboard\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`general_favicon_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`general_og_image_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`navbar_logo_image_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`footer_logo_image_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "general_title", "general_description", "general_favicon_url_id", "general_og_image_url_id", "navbar_logo_image_url_id", "navbar_logo_height", "navbar_logo_width", "footer_logo_image_url_id", "footer_logo_height", "footer_logo_width", "footer_logo_description", "footer_copyright", "monetization_ad_sense_id", "monetization_measurement_id", "stripe_connect_country", "stripe_connect_currency", "stripe_connect_stripe_user_id", "stripe_connect_stripe_admin_dashboard", "updated_at", "created_at") SELECT "id", "general_title", "general_description", "general_favicon_url_id", "general_og_image_url_id", "navbar_logo_image_url_id", "navbar_logo_height", "navbar_logo_width", "footer_logo_image_url_id", "footer_logo_height", "footer_logo_width", "footer_logo_description", "footer_copyright", "monetization_ad_sense_id", "monetization_measurement_id", "stripe_connect_country", "stripe_connect_currency", "stripe_connect_stripe_user_id", "stripe_connect_stripe_admin_dashboard", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_general_general_favicon_url_idx\` ON \`site_settings\` (\`general_favicon_url_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_general_general_og_image_url_idx\` ON \`site_settings\` (\`general_og_image_url_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navbar_logo_navbar_logo_image_url_idx\` ON \`site_settings\` (\`navbar_logo_image_url_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_logo_footer_logo_image_url_idx\` ON \`site_settings\` (\`footer_logo_image_url_id\`);`)
}
