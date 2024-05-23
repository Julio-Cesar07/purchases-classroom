import { ArgumentsHost, Catch } from '@nestjs/common';
import { ContextType } from '@nestjs/common/interfaces';
import { GraphQLError } from 'graphql';
import { ErrorGlobalHttp } from './error-global';

type hostType = ContextType | 'graphql';

@Catch(ErrorGlobalHttp)
export class ErrorHandler {
  catch(exception: ErrorGlobalHttp, host: ArgumentsHost) {
    const isGraphql = (host.getType() as hostType) === 'graphql' ? true : false;
    if (isGraphql)
      throw new GraphQLError(exception.message, {
        extensions: {
          code: exception.statusCode,
        },
      });
    else {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      this.handleRest(exception, request, response);
    }
  }

  handleRest(exception: ErrorGlobalHttp, request: any, response: any) {
    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
