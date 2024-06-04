import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1717464537864 implements MigrationInterface {
    name = 'Entities1717464537864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requestBooks\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`requestBooks\` CHANGE \`bucket\` \`bucket\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`requestBooks\` CHANGE \`mime\` \`mime\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requestBooks\` CHANGE \`mime\` \`mime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`requestBooks\` CHANGE \`bucket\` \`bucket\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`requestBooks\` DROP COLUMN \`createdAt\``);
    }

}
