import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contato } from './contato.entity';

@Injectable()
export class ContatoService {
  constructor(
    @InjectRepository(Contato)
    private readonly contatoRepo: Repository<Contato>,
  ) {}

  /**
   * Retorna todos os contatos, ordenando pelos mais recentes.
   */
  async findAll(): Promise<Contato[]> {
    return this.contatoRepo.find({
      order: { criadoEm: 'DESC' },
    });
  }

  /**
   * Busca um contato pelo ID.
   * Lança NotFoundException se não existir.
   */
  async findOne(id: number): Promise<Contato> {
    const contato = await this.contatoRepo.findOne({ where: { id } });
    if (!contato) {
      throw new NotFoundException(`Contato com id ${id} não encontrado`);
    }
    return contato;
  }

  /**
   * Cria um novo contato.
   * Recebe um objeto Partial<Contato> contendo pelo menos nome e email.
   */
  async create(data: Partial<Contato>): Promise<Contato> {
    const novoContato = this.contatoRepo.create(data);
    return this.contatoRepo.save(novoContato);
  }

  /**
   * Atualiza um contato existente.
   * Faz merge dos campos enviados e salva.
   * Lança NotFoundException se o contato não existir.
   */
  async update(id: number, data: Partial<Contato>): Promise<Contato> {
    const contato = await this.findOne(id);
    Object.assign(contato, data);
    return this.contatoRepo.save(contato);
  }

  /**
   * Remove um contato pelo ID.
   * Lança NotFoundException se o contato não existir.
   */
  async remove(id: number): Promise<void> {
    const contato = await this.findOne(id);
    await this.contatoRepo.remove(contato);
  }
}
