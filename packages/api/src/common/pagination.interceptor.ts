import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Type
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PaginationResponseDto,
  PaginationResponseData
} from './pagination-response.dto';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { stringify } from 'querystring';
import { PaginationOptionsDto } from './pagination-options.dto';
import { Mutable } from '@lxdhub/common';

@Injectable()
export class PaginationInterceptor<Entity, Dto>
  implements
    NestInterceptor<
      PaginationResponseData<Entity[]>,
      PaginationResponseDto<Dto[]>
    > {
  constructor(private readonly classType: Type<Dto>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<PaginationResponseData<Entity[]>>
  ): Observable<PaginationResponseDto<Dto[]>> {
    const req = context.switchToHttp().getRequest<Request>();
    const url = `${req.protocol}://${req.get('host')}${req.path}`;
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 20;

    return next.handle().pipe(
      map(data => {
        const response: Partial<PaginationResponseDto<Dto[]>> = {};
        return { response, data };
      }),
      map(({ response, data }) => {
        response.results = data[0].map(item =>
          plainToClass<Dto, Entity>(this.classType, item)
        );

        return { response, data };
      }),
      map(({ response, data }) => {
        response.results = response.results.map((item: any) => {
          if (item.id) item._links = { detail: `${url}/${item.id}` };
          return item;
        });
        return { response, data };
      }),
      map(({ response, data }) => {
        response.offset = parseInt(req.query.offset, 10);
        response.limit = limit;
        response.total = data[1];

        return { response, data };
      }),
      map(({ response, data }) => {
        const query = req.query as Mutable<PaginationOptionsDto>;
        const newOffset = offset + limit;
        if (newOffset < data[1]) {
          query.offset = newOffset;
          response.next = `${url}?${stringify(query)}`;
        }

        return { response, data };
      }),
      map(({ response, data }) => {
        const query = req.query as Mutable<PaginationOptionsDto>;
        const newOffset = offset - limit;
        if (newOffset >= 0) {
          query.offset = newOffset;
          response.previous = `${url}?${stringify(query)}`;
        }

        return { response, data };
      }),
      map(({ response }) => response as PaginationResponseDto<Dto[]>)
    );
  }
}
