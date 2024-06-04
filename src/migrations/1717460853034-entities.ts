import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1717460853034 implements MigrationInterface {
    name = 'Entities1717460853034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`requestBooks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`bucket\` varchar(255) NOT NULL, \`mime\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NULL, \`description\` varchar(255) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`requestBooks\` ADD CONSTRAINT \`FK_c01d507e8e4cec15c08388283ed\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requestBooks\` DROP FOREIGN KEY \`FK_c01d507e8e4cec15c08388283ed\``);
        await queryRunner.query(`DROP TABLE \`requestBooks\``);
    }

}
