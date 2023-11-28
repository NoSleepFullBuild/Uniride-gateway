import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SERVICE_AUTH",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 4000,
        },
      },
      {
        name: "SERVICE_USER",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3500,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
