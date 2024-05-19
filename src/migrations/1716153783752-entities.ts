import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716153783752 implements MigrationInterface {
    name = 'Entities1716153783752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`category\` \`category\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`category\` \`category\` int NOT NULL`);
    }

}
