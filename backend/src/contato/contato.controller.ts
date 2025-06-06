import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ContatoService } from './contato.service';
import { Contato } from './contato.entity';

@Controller('contatos')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  /**
   * GET /contatos
   * Retorna uma lista de todos os contatos.
   */
  @Get()
  async findAll(): Promise<Contato[]> {
    return this.contatoService.findAll();
  }

  /**
   * GET /contatos/:id
   * Retorna um único contato pelo ID.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contato> {
    return this.contatoService.findOne(id);
  }

  /**
   * POST /contatos
   * Cria um novo contato a partir do corpo da requisição JSON.
   */
  @Post()
  async create(@Body() data: Partial<Contato>): Promise<Contato> {
    return this.contatoService.create(data);
  }

  /**
   * PUT /contatos/:id
   * Atualiza os campos informados de um contato existente.
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Contato>,
  ): Promise<Contato> {
    return this.contatoService.update(id, data);
  }

  /**
   * DELETE /contatos/:id
   * Remove um contato existente. Retorna 204 (No Content).
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.contatoService.remove(id);
  }
}
