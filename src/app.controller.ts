import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { zip } from "rxjs";
import { map } from "rxjs/operators";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/healthcheck/auth-service")
  pingServiceA() {
    return this.appService.pingServiceAuth();
  }

  @Get("/healthcheck/user-service")
  pingServiceB() {
    return this.appService.pingServiceUser();
  }

  @Get("/ping-all")
  pingAll() {
    return zip(
      this.appService.pingServiceAuth(),
      this.appService.pingServiceUser()
    ).pipe(
      map(([pingServiceAuth, pingServiceUser]) => ({
        pingServiceAuth,
        pingServiceUser
      }))
    );
  }
}