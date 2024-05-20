import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716232341756 implements MigrationInterface {
    name = 'Entities1716232341756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`note\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`note\``);
    }

}
