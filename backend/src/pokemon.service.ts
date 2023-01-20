import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CustomPokemon, Prisma } from "@prisma/client";

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async pokemon(
    CustomPokemonWhereUniqueInput: Prisma.CustomPokemonWhereUniqueInput
  ): Promise<CustomPokemon | null> {
    return this.prisma.customPokemon.findUnique({
      where: CustomPokemonWhereUniqueInput,
    });
  }

  /* Find many pokemon entries */
  async pokemons(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomPokemonWhereUniqueInput;
    where?: Prisma.CustomPokemonWhereInput;
    orderBy?: Prisma.CustomPokemonOrderByWithRelationInput;
  }): Promise<CustomPokemon[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customPokemon.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /* Create a new CustomPokemon entry in DB */
  async createCustomPokemon(
    data: Prisma.CustomPokemonCreateInput
  ): Promise<CustomPokemon> {
    return this.prisma.customPokemon.create({
      data,
    });
  }

  /* Update a CustomPokemon entry */
  async updateCustomPokemon(params: {
    where: Prisma.CustomPokemonWhereUniqueInput;
    data: Prisma.CustomPokemonUpdateInput;
  }): Promise<CustomPokemon> {
    const { where, data } = params;
    return this.prisma.customPokemon.update({
      data,
      where,
    });
  }

  /* Delete a CustomPokemon entry */
  async deleteCustomPokemon(
    where: Prisma.CustomPokemonWhereUniqueInput
  ): Promise<CustomPokemon> {
    return this.prisma.customPokemon.delete({
      where,
    });
  }
}
