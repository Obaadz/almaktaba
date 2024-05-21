import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716250412310 implements MigrationInterface {
    name = 'Entities1716250412310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`code\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`code\``);
    }

}
