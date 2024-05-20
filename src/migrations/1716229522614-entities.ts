import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716229522614 implements MigrationInterface {
    name = 'Entities1716229522614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ownerId\` int NOT NULL, \`sellerUserId\` int NULL, \`sellerLibraryId\` int NULL, UNIQUE INDEX \`REL_f79a8d61cafb2ad5f27e014ae1\` (\`ownerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cartItems\` ADD \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_f79a8d61cafb2ad5f27e014ae17\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_7dd6292d36eb1a3d73318c5a840\` FOREIGN KEY (\`sellerUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_5a2de0b423f9a97c3067cc49dd8\` FOREIGN KEY (\`sellerLibraryId\`) REFERENCES \`libraries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cartItems\` ADD CONSTRAINT \`FK_948d4cea2c1632d05cd74046439\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cartItems\` DROP FOREIGN KEY \`FK_948d4cea2c1632d05cd74046439\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_5a2de0b423f9a97c3067cc49dd8\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_7dd6292d36eb1a3d73318c5a840\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_f79a8d61cafb2ad5f27e014ae17\``);
        await queryRunner.query(`ALTER TABLE \`cartItems\` DROP COLUMN \`orderId\``);
        await queryRunner.query(`DROP INDEX \`REL_f79a8d61cafb2ad5f27e014ae1\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
