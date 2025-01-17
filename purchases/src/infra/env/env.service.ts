import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

@Injectable()
export class EnvService {
  constructor(private env: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.env.get(key, { infer: true });
  }
}
