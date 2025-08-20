import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import * as requestIp from 'request-ip'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger()
  constructor(
    private readonly httpAdapterHost:HttpAdapterHost
  ){}
  catch(exception:any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    
    const ctx = host.switchToHttp();
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    const httpStatus = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
    
    const msg = exception['response'] || 'Internal Server Error';

    // 加入更多的处理逻辑


    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      error:msg
    }

    this.logger.error('[cp-error]', responseBody)
    
    httpAdapter.reply(response,responseBody,httpStatus)

  }
}
