import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716301597727 implements MigrationInterface {
    name = 'Entities1716301597727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`libraries\` CHANGE \`totalRate\` \`totalRate\` varchar(255) NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`libraries\` CHANGE \`totalRate\` \`totalRate\` varchar(255) NULL DEFAULT '5.00'`);
    }

}
