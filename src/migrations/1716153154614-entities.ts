import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716153154614 implements MigrationInterface {
    name = 'Entities1716153154614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`category\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`category\``);
    }

}
