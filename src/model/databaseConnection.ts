import { PrismaClient } from "@prisma/client"

export default class DatabaseConnection {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient()
    }
};
