import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716261826277 implements MigrationInterface {
    name = 'Entities1716261826277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`libraries\` CHANGE \`totalRate\` \`totalRate\` varchar(255) NULL DEFAULT '5.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`libraries\` CHANGE \`totalRate\` \`totalRate\` varchar(255) NULL DEFAULT '5'`);
    }

}
