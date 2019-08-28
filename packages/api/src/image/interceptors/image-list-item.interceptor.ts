
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageListItemResponse, ImageListItemDto } from '../dtos';

/**
 * Represents the inteceptor, which sets the URL attributes of the _links
 * object of the ImageListItemDtos
 */
@Injectable()
export class ImageListItemInterceptor
    implements NestInterceptor<ImageListItemResponse, ImageListItemResponse> {
    /**
     * Intercepts the response of, by updating the _links object with
     * the appropiate urls.
     * @param req The express request object
     * @param call$ The response stream
     */
    intercept(
        context: ExecutionContext,
        next: CallHandler)
        : Observable<ImageListItemResponse> {
        const req = context.switchToHttp().getRequest();
        // Get url e.g. http://localhost:3000/api/v1/image
        // without any GET-Parameters (?remoteId=1)
        const url = `${req.protocol}://${req.get('host')}${req._parsedUrl.pathname}`;

        // Returns the response stream and maps the data
        return next.handle().pipe(
            map(response => {
                // Updates each image _links object
                response.results.forEach((image: ImageListItemDto) =>
                    image._links = {
                        // Set the detail url
                        detail: `${url}/${image.fingerprint}`
                    });
                return response;
            })
        );
    }
}
