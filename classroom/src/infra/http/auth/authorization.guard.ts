import { UnauthorizedError } from '@/core/errors/unauthorized-error';
import { EnvService } from '@/infra/env/env.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { auth } from 'express-oauth2-jwt-bearer';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private env: EnvService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req: request, res: response } =
      GqlExecutionContext.create(context).getContext();

    const checkJWT = promisify(
      auth({
        audience: this.env.get('AUTH0_AUDIENCE'),
        issuerBaseURL: this.env.get('AUTH0_DOMAIN'),
        tokenSigningAlg: 'RS256',
      }),
    );

    try {
      await checkJWT(request, response);
      return true;
    } catch (error) {
      throw new UnauthorizedError();
    }
  }
}
