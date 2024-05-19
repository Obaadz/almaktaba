import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716146415022 implements MigrationInterface {
    name = 'Entities1716146415022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cartItems\` DROP FOREIGN KEY \`FK_7fac278e61eddd24a215e8bdf7c\``);
        await queryRunner.query(`ALTER TABLE \`cartItems\` CHANGE \`cartId\` \`cartId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cartItems\` ADD CONSTRAINT \`FK_7fac278e61eddd24a215e8bdf7c\` FOREIGN KEY (\`cartId\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cartItems\` DROP FOREIGN KEY \`FK_7fac278e61eddd24a215e8bdf7c\``);
        await queryRunner.query(`ALTER TABLE \`cartItems\` CHANGE \`cartId\` \`cartId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cartItems\` ADD CONSTRAINT \`FK_7fac278e61eddd24a215e8bdf7c\` FOREIGN KEY (\`cartId\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
