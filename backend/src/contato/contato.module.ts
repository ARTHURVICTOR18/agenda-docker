import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contato } from './contato.entity';
import { ContatoService } from './contato.service';
import { ContatoController } from './contato.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contato]), // disponibiliza o Repositório<Contato>
  ],
  providers: [ContatoService],
  controllers: [ContatoController],
})
export class ContatoModule {}
