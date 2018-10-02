import { ImageListItemDto } from '@lxdhub/interfaces';
import { ImageListItemInterceptor } from './image-list-item.interceptor';
import { Observable, of } from 'rxjs';
import { ImageListItemResponse } from '@lxdhub/api/src/image/dtos';

describe('ImageController', () => {
    let stream$: Observable<ImageListItemResponse>;
    let req;
    let contextMock;

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
            _parsedUrl: {
                pathname: '/api/v1/image'
            },
            protocol: 'http',
            get: param => param === 'host' ? 'localhost:3000' : 'not-valid'
        };

        contextMock = {
            switchToHttp() {
                return {
                    getRequest() {
                        return req;
                    }
                };
            }
        };

        const pagination = { results } as ImageListItemResponse;
        stream$ = of<ImageListItemResponse>(pagination);
    });

    describe('intercept', () => {
        it('should generate the correct detail url', async done => {
            const streamOutput$ = new ImageListItemInterceptor().intercept(contextMock, stream$);
            streamOutput$.subscribe(response => {
                expect(response.results[0]._links.detail).toBe('http://localhost:3000/api/v1/image/1');
                expect(response.results[1]._links.detail).toBe('http://localhost:3000/api/v1/image/2');
                done();
            });
        });
    });

});
