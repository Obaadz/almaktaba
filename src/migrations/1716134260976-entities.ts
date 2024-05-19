import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716134260976 implements MigrationInterface {
    name = 'Entities1716134260976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_54f49efe2dd4d2850e736e9ab86\``);
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`authorId\` \`sellerId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_21d427d1a0d2aacdb6c995ead70\` FOREIGN KEY (\`sellerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_21d427d1a0d2aacdb6c995ead70\``);
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`sellerId\` \`authorId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_54f49efe2dd4d2850e736e9ab86\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
