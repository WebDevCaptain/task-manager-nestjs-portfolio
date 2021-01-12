import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'abcde12345',
	database: 'nestjs_learn',
	entities: [__dirname + '/../**/*.entity.{ts,js}'],
	synchronize: true,
};
