import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1717465599423 implements MigrationInterface {
    name = 'Entities1717465599423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requestBooks\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requestBooks\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
