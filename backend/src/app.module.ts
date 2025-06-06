import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContatoModule } from './contato/contato.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,                          // Ex: "db" (nome do serviço no docker-compose)
      port: parseInt(process.env.DB_PORT || '5433', 10),  // Ex: 5432
      username: process.env.DB_USER,                      // Ex: "seu_usuario"
      password: process.env.DB_PASSWORD,                  // Ex: "sua_senha"
      database: process.env.DB_NAME,                      // Ex: "sua_base_de_dados"
      entities: [__dirname + '/**/*.entity{.ts,.js}'],    // Padrão para encontrar todas as Entities
      migrations: [__dirname + '/migrations/*{.ts,.js}'], // Caso queira adicionar migrações depois
      synchronize: true,                                 // Nunca usar true em produção
    }),
    ContatoModule, // registra o módulo de “Contato”
  ],
})
export class AppModule {}
