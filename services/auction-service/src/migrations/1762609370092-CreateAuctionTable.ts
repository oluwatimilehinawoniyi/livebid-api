import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuctionTable1762609370092 implements MigrationInterface {
    name = 'CreateAuctionTable1762609370092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."auctions_status_enum" AS ENUM('draft', 'upcoming', 'live', 'ended', 'paid')`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seller_id" character varying NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "startPrice" numeric(10,2) NOT NULL, "currentPrice" numeric(10,2) NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "status" "public"."auctions_status_enum" NOT NULL DEFAULT 'draft', "winner_id" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_87d2b34d4829f0519a5c5570368" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`DROP TYPE "public"."auctions_status_enum"`);
    }

}
