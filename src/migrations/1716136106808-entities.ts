import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716136106808 implements MigrationInterface {
    name = 'Entities1716136106808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`libraryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_21d427d1a0d2aacdb6c995ead70\``);
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`sellerId\` \`sellerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_21d427d1a0d2aacdb6c995ead70\` FOREIGN KEY (\`sellerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_9ef60a562494fcb60926052ec50\` FOREIGN KEY (\`libraryId\`) REFERENCES \`libraries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_9ef60a562494fcb60926052ec50\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_21d427d1a0d2aacdb6c995ead70\``);
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`sellerId\` \`sellerId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_21d427d1a0d2aacdb6c995ead70\` FOREIGN KEY (\`sellerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`libraryId\``);
    }

}
