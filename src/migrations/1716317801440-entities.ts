import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716317801440 implements MigrationInterface {
    name = 'Entities1716317801440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rooms_users_users\` (\`roomsId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_cbe951142bc45a33a744256516\` (\`roomsId\`), INDEX \`IDX_6b3c5f4bbfb29a84a57e442af5\` (\`usersId\`), PRIMARY KEY (\`roomsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`rooms_users_users\` ADD CONSTRAINT \`FK_cbe951142bc45a33a744256516d\` FOREIGN KEY (\`roomsId\`) REFERENCES \`rooms\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rooms_users_users\` ADD CONSTRAINT \`FK_6b3c5f4bbfb29a84a57e442af54\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rooms_users_users\` DROP FOREIGN KEY \`FK_6b3c5f4bbfb29a84a57e442af54\``);
        await queryRunner.query(`ALTER TABLE \`rooms_users_users\` DROP FOREIGN KEY \`FK_cbe951142bc45a33a744256516d\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b3c5f4bbfb29a84a57e442af5\` ON \`rooms_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_cbe951142bc45a33a744256516\` ON \`rooms_users_users\``);
        await queryRunner.query(`DROP TABLE \`rooms_users_users\``);
    }

}
