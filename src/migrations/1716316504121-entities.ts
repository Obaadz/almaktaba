import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716316504121 implements MigrationInterface {
    name = 'Entities1716316504121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rooms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ownerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`senderId\` int NOT NULL, \`roomId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`totalRate\` \`totalRate\` varchar(255) NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD CONSTRAINT \`FK_383ac461c63dd52c22ba73a6624\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_aaa8a6effc7bd20a1172d3a3bc8\` FOREIGN KEY (\`roomId\`) REFERENCES \`rooms\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_aaa8a6effc7bd20a1172d3a3bc8\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_383ac461c63dd52c22ba73a6624\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`totalRate\` \`totalRate\` varchar(255) NULL DEFAULT '5'`);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP TABLE \`rooms\``);
    }

}
