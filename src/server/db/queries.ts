import "server-only";

import { db } from "~/server/db";
import {
    files_table as filesSchema,
    folders_table as foldersSchema,
} from "~/server/db/schema";
import { and, desc, eq, isNull } from "drizzle-orm";

export const DB_QUERIES = {
    getAllParentsForFolder: async function (folderId: number) {
        const parents = [];
        let currentId: number | null = folderId;
        while (currentId !== null) {
            const folder = await db
                .selectDistinct()
                .from(foldersSchema)
                .where(eq(foldersSchema.id, currentId));

            if (!folder[0]) {
                throw new Error("Parent folder not found!");
            }
            parents.unshift(folder[0]);
            currentId = folder[0]?.parent;
        }
        return parents;
    },
    getFolders: function (folderId: number) {
        return db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, folderId))
            .orderBy(desc(foldersSchema.id));
    },
    getFiles: function (folderId: number) {
        return db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, folderId))
            .orderBy(desc(filesSchema.id));
    },
    getFolderById: async function (folderId: number) {
        const folder = await db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.id, folderId));
        return folder[0];
    },
    getRootFolderForUser: async function (userId: string) {
        const folder = await db
            .select()
            .from(foldersSchema)
            .where(
                and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)),
            );
        return folder[0];
    },
    getOwnerIdForFolder: async function (folderId: number) {
        const result = await db
            .select({ ownerId: foldersSchema.ownerId })
            .from(foldersSchema)
            .where(eq(foldersSchema.id, folderId))
            .limit(1);
            return result[0]?.ownerId ?? null;
    },
};

export const DB_MUTATIONS = {
    createFile: async function (input: {
        file: {
            name: string;
            size: number;
            url: string;
            parent: number;
        };
        userId: string;
    }) {
        return await db.insert(filesSchema).values({
            ...input.file,
            ownerId: input.userId,
        });
    },
    onboardUser: async function (userId: string) {
        const rootFolder = await db
            .insert(foldersSchema)
            .values({
                name: "Root",
                parent: null,
                ownerId: userId,
            })
            .$returningId();
        const rootFolderId = rootFolder[0]!.id;
        await db.insert(foldersSchema).values([
            {
                name: "Documents",
                parent: rootFolderId,
                ownerId: userId,
            },
            {
                name: "Photos",
                parent: rootFolderId,
                ownerId: userId,
            },
            {
                name: "Videos",
                parent: rootFolderId,
                ownerId: userId,
            },
        ]);
        return rootFolderId;
    },
};
