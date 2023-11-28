import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";
@Injectable()
export class AppService {
  constructor(
    @Inject("SERVICE_AUTH") private readonly clientServiceA: ClientProxy,
    @Inject("SERVICE_USER") private readonly clientServiceB: ClientProxy
  ) {}

  pingServiceAuth() {
    const startTs = Date.now();
    const pattern = { cmd: "ping" };
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }

    pingServiceUser() {
        const startTs = Date.now();
        const pattern = { cmd: "ping" };
        const payload = {};
        return this.clientServiceB
        .send<string>(pattern, payload)
        .pipe(
            map((message: string) => ({ message, duration: Date.now() - startTs }))
        );
    }
    
}
