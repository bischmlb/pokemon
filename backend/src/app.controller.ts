import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { PokemonService } from "./pokemon.service";
import { User as UserModel, CustomPokemon as CustomPokemonModel } from "@prisma/client";
import fetch from 'node-fetch'

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService
  ) {}



  @Post("user")
  async signupUser(
    @Body() userData: { email: string; password: string }
  ): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      this.userService.createUser(userData).then((user) => {
        resolve(user)
      }).catch(() => reject("Could not create user at this time."));
    })
  }

    /* Validate user*/
    @Post("user/validate")
    async validateUser(
      @Body() input: { email: string, password: string }
    ): Promise<UserModel> {
      return new Promise((resolve, reject) => {
        this.userService.user({ email: input.email}).then((user) => {
          /* If the inserted credentials matches the user we have found, retrieve user. */
          if(input.email == user.email && input.password == user.password) {
            resolve(user)
          }
          reject('The inserted credentials did not match.')
        }).catch(() => reject('The user was not found.'))
      })
    }

  /* Get user */
  @Get("user/:email")
  async getUser(
    @Param('email') email: string,
  ): Promise<UserModel> {
    return this.userService.user({email: email})
  }


  /* Update user state. Could be used to update credentials too on further basis .. */
  @Put("user/:email")
  async updateUser(
    @Param('email') email: string,
    @Body() userData: { signedIn: boolean }
  ): Promise<UserModel> {
    return this.userService.updateUser({where: {email: email}, data: { signedIn: userData.signedIn}})
  }



  /* Get list of pokemons in DB*/
   @Get("pokemons/:pageResults")
   async getPokemons(
     @Param('pageResults') pageResults: string,
     ): Promise<CustomPokemonModel[][]> {
       const nPageResults = Number(pageResults)
       return this.pokemonService.pokemons({where: {}}).then((pokemons) => {
        const pagination = []
        for (let i = 0; i < pokemons.length; i += nPageResults) {
          pagination.push(pokemons.slice(i, i + Number(nPageResults)))
        }
        return pagination
      })
  }

  @Post("pokemon")
  async createPokemon(
    @Body() pokemonData: { name: string; height: number, weight: number, creatorEmail: string;  }
  ): Promise<CustomPokemonModel> {
    /* Create a custom pokemon with params, and create relation by linking new entry withn unique prop email */
    return this.pokemonService.createCustomPokemon({name: pokemonData.name, height: Number(pokemonData.height), weight: Number(pokemonData.weight), createdBy: { connect: { email: pokemonData.creatorEmail } } });
  }


  @Put("pokemon/:id")
  async updatePokemon(
    @Param('id') id: string,
    @Body() pokemonData: { name: string; height: number, weight: number }
  ): Promise<CustomPokemonModel> {
    /* Update every set entity in entry */
    return this.pokemonService.updateCustomPokemon({ where: { id: Number(id) }, data: {name: pokemonData.name, height: Number(pokemonData.height), weight: Number(pokemonData.weight)}})
  }


  @Delete('pokemon/:id')
  async deletePokemon(@Param('id') id: string): Promise<CustomPokemonModel> {
    return this.pokemonService.deleteCustomPokemon({ id: Number(id) });
  }


    /* SYNC DB WITH POKEMONS.*/
    @Get("SYNC")
    async test(
    ): Promise<any> {
      return new Promise((resolve, reject) => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then((allpokemon) => {
          const list = allpokemon.results.map((result) => {
            return result.url
          })
          return list
        })
        .then(async (pokemonList) => {
          const promises = pokemonList.map(async (url) => {
            const result = await fetch(url).then((res) => res.json());
            return result;
        });

        /* Use for await instead of promise.all so we dont have hanging connections */
        for await ( const promise of promises ){
          const pokemon = await promise
          const custompokemon = {name: pokemon.name, height: pokemon.height, weight: pokemon.weight, creatorId: null, imgUrl: pokemon.sprites.other['official-artwork'].front_default, abilities: pokemon.abilities.map((ability) => ability.ability.name)}
          await this.pokemonService.createCustomPokemon({...custompokemon})
        }
        resolve('synced')
      })
    }
  )}



}
