import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716260066058 implements MigrationInterface {
    name = 'Entities1716260066058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`rateCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`totalRate\` varchar(255) NULL DEFAULT '5'`);
        await queryRunner.query(`ALTER TABLE \`libraries\` ADD \`rateCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`libraries\` ADD \`totalRate\` varchar(255) NULL DEFAULT '5'`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`rate\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`rate\``);
        await queryRunner.query(`ALTER TABLE \`libraries\` DROP COLUMN \`totalRate\``);
        await queryRunner.query(`ALTER TABLE \`libraries\` DROP COLUMN \`rateCount\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`totalRate\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`rateCount\``);
    }

}
