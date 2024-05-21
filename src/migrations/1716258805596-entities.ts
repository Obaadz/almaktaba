import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716258805596 implements MigrationInterface {
    name = 'Entities1716258805596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`hasBeenCompleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`hasBeenRated\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`hasBeenRated\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`hasBeenCompleted\``);
    }

}
