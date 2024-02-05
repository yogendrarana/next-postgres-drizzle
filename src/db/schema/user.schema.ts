import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm'
import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// import schemas

// role
export const roleEnum = pgEnum('role', ['user', 'admin']);

// schema definition
export const userSchema = pgTable(
    'user',

    {
        id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
        name: varchar('name', { length: 50 }),
        email: varchar('email', { length: 255 }).notNull().unique(),
        password: text('password').notNull(),
        role: roleEnum('role').notNull().default('user'),
        isEmailVerified: boolean('is_email_verified').notNull().default(false),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow(),
    }
);

// relations
export const userRelations = relations(userSchema, ({ many }) => ({
}));


// type
export type SelectUser = InferSelectModel<typeof userSchema>;
export type InsertUser = InferInsertModel<typeof userSchema>;