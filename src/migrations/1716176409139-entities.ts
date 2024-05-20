import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716176409139 implements MigrationInterface {
    name = 'Entities1716176409139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cartItems\` ADD \`bookPrice\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cartItems\` DROP COLUMN \`bookPrice\``);
    }

}
