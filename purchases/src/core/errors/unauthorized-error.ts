import { ErrorGlobalHttp } from './error-global';

export class UnauthorizedError extends ErrorGlobalHttp {
  constructor() {
    super({
      message: 'Invalid credential.',
      statusCode: 401,
    });
  }
}
