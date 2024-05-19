import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716122740057 implements MigrationInterface {
    name = 'Entities1716122740057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`OTP\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`OTP\``);
    }

}
