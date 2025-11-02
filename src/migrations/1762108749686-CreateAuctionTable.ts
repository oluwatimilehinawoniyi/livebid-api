import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuctionTable1762108749686 implements MigrationInterface {
    name = 'CreateAuctionTable1762108749686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."auctions_status_enum" AS ENUM('draft', 'upcoming', 'live', 'ended', 'paid')`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sellerId" uuid NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "startPrice" numeric(10,2) NOT NULL, "currentPrice" numeric(10,2) NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "status" "public"."auctions_status_enum" NOT NULL DEFAULT 'draft', "winnerId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_87d2b34d4829f0519a5c5570368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_7562985483a1d83d0790b19d186" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_cc190079f877df0ca02c99f1be4" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_cc190079f877df0ca02c99f1be4"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_7562985483a1d83d0790b19d186"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`DROP TYPE "public"."auctions_status_enum"`);
    }

}
