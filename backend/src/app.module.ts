import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PokemonService } from "./pokemon.service";
import { PrismaService } from "./prisma.service";
import { UserService } from "./user.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, PokemonService],
})
export class AppModule {}
