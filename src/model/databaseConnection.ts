import { PrismaClient } from "@prisma/client"

export default class DatabaseConnection {
    prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient()
    }
};
