import { Test } from '@nestjs/testing';
import { Request } from 'express';
import { of } from 'rxjs/observable/of';

import { ImageListItemDto, PaginationResponseDto } from '../..';
import { ImageListItemInterceptor } from './image-list-item.interceptor';
import { Observable } from 'rxjs/Observable';

describe('ImageController', () => {
    let stream$: Observable<PaginationResponseDto<ImageListItemDto[]>>;
    let req: Request;

    beforeEach(async () => {
        const results: ImageListItemDto[] = [{
            fingerprint: 'fingerprint1',
            description: 'desc1',
            uploadedAt: new Date(),
            id: 1
        } as ImageListItemDto, {
            fingerprint: 'fingerprint2',
            description: 'desc2',
            uploadedAt: new Date(),
            id: 2
        } as ImageListItemDto];

        req = {
            baseUrl: '/api/v1/image',
            protocol: 'http',
            get: param => param === 'host' ? 'localhost:3000' : 'not-valid'
        } as Request;

        const pagination = { results } as PaginationResponseDto<ImageListItemDto[]>;
        stream$ = of<PaginationResponseDto<ImageListItemDto[]>>(pagination);
    });

    describe('intercept', () => {
        it('should generate the correct detail url', async done => {
            const streamOutput$ = new ImageListItemInterceptor().intercept(req, null, stream$);
            streamOutput$.subscribe(response => {
                expect(response.results[0]._links.detail).toBe('http://localhost:3000/api/v1/image/1');
                expect(response.results[1]._links.detail).toBe('http://localhost:3000/api/v1/image/2');
                done();
            });
        });
    });

});
