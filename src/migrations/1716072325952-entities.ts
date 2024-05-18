import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716072325952 implements MigrationInterface {
    name = 'Entities1716072325952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`s3key\` varchar(255) NOT NULL, \`bucket\` varchar(255) NOT NULL, \`mime\` varchar(255) NOT NULL, \`comment\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`files\``);
    }

}
