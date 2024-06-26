import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1717370818154 implements MigrationInterface {
    name = 'Entities1717370818154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`description\``);
    }

}
