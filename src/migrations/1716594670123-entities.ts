import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716594670123 implements MigrationInterface {
    name = 'Entities1716594670123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`delivery\` tinyint NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`delivery\``);
    }

}
