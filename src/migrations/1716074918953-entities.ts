import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716074918953 implements MigrationInterface {
    name = 'Entities1716074918953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`libraries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lat\` varchar(255) NOT NULL, \`lng\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`libraries\``);
    }

}
