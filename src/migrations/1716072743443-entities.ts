import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716072743443 implements MigrationInterface {
    name = 'Entities1716072743443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`s3key\` \`key\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`key\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`key\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`key\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`key\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`files\` CHANGE \`key\` \`s3key\` varchar(255) NOT NULL`);
    }

}
