import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  GqlArgumentsHost,
  GqlContextType,
  GqlExceptionFilter,
} from '@nestjs/graphql';
import { Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';

@Catch()
export class HttpErrorFilter implements ExceptionFilter, GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException && exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      status !== HttpStatus.INTERNAL_SERVER_ERROR
        ? exception.message || null
        : 'Internal server error';

    const err = {
      statusCode: status,
      timestamp: new Date().toDateString(),
      name: exception.name,
      message,
    };

    // if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    //   console.error(exception);
    // }

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();

      const response = ctx.getResponse<Response>();
      const { error } = JSON.parse(JSON.stringify(exception.getResponse()));
      const errorResponse = {
        ...err,
        error,
        path: request.url,
        method: request.method,
      };

      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse, null, 4),
        `ExceptionFilter`,
        false,
      );
      response.status(status).json(error);
    } else if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const info = gqlHost.getInfo<GraphQLResolveInfo>();
      const { error } = JSON.parse(JSON.stringify(exception));
      const errorResponse = {
        ...err,
        error,
        message: error ? error.message : message,
        type: info.parentType,
        field: info.fieldName,
      };

      Logger.error(
        `${info.parentType} ${info.fieldName}`,
        JSON.stringify(errorResponse, null, 4),
        `ExceptionFilter`,
        false,
      );

      return exception;
    }
  }
}
