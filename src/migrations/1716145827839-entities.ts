import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716145827839 implements MigrationInterface {
    name = 'Entities1716145827839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`OTP\` varchar(255) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`libraries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lat\` varchar(255) NOT NULL, \`lng\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`bucket\` varchar(255) NOT NULL, \`mime\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`price\` varchar(255) NOT NULL, \`sellerId\` int NULL, \`libraryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cartItems\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`bookId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sellerLibraryId\` int NULL, \`ownerId\` int NOT NULL, \`sellerUserId\` int NULL, UNIQUE INDEX \`REL_0890d012cf3314c403e6b70fd8\` (\`sellerLibraryId\`), UNIQUE INDEX \`REL_b359a87688ab6a2dc25c6f9cd8\` (\`ownerId\`), UNIQUE INDEX \`REL_5bd9cae574ceb8b776943d3b41\` (\`sellerUserId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_21d427d1a0d2aacdb6c995ead70\` FOREIGN KEY (\`sellerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_9ef60a562494fcb60926052ec50\` FOREIGN KEY (\`libraryId\`) REFERENCES \`libraries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cartItems\` ADD CONSTRAINT \`FK_0f75457a82b8b65754f1ac75ab7\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_0890d012cf3314c403e6b70fd8c\` FOREIGN KEY (\`sellerLibraryId\`) REFERENCES \`libraries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_b359a87688ab6a2dc25c6f9cd8a\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_5bd9cae574ceb8b776943d3b41d\` FOREIGN KEY (\`sellerUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_5bd9cae574ceb8b776943d3b41d\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_b359a87688ab6a2dc25c6f9cd8a\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_0890d012cf3314c403e6b70fd8c\``);
        await queryRunner.query(`ALTER TABLE \`cartItems\` DROP FOREIGN KEY \`FK_0f75457a82b8b65754f1ac75ab7\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_9ef60a562494fcb60926052ec50\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_21d427d1a0d2aacdb6c995ead70\``);
        await queryRunner.query(`DROP INDEX \`REL_5bd9cae574ceb8b776943d3b41\` ON \`carts\``);
        await queryRunner.query(`DROP INDEX \`REL_b359a87688ab6a2dc25c6f9cd8\` ON \`carts\``);
        await queryRunner.query(`DROP INDEX \`REL_0890d012cf3314c403e6b70fd8\` ON \`carts\``);
        await queryRunner.query(`DROP TABLE \`carts\``);
        await queryRunner.query(`DROP TABLE \`cartItems\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP TABLE \`libraries\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
