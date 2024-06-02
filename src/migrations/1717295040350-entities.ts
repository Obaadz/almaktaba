import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1717295040350 implements MigrationInterface {
    name = 'Entities1717295040350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`author\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`author\``);
    }

}
