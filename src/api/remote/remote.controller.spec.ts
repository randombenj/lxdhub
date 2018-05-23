import { RemoteDto } from '@lxdhub/common';
import { Test } from '@nestjs/testing';

import { RemoteFactory } from './factories';
import { RemoteController } from './remote.controller';
import { RemoteRepository } from './remote.repository';
import { RemoteService } from './remote.service';

/**
 * Test cases for the remote controller
 */
describe('RemoteController', () => {
    let remoteController: RemoteController;
    let remoteService: RemoteService;

    beforeEach(async () => {
        // Mock Image Module
        const module = await Test.createTestingModule({
            controllers: [RemoteController],
            components: [
                RemoteService,
                {
                    provide: 'RemoteRepository',
                    useClass: RemoteRepository
                },
                RemoteFactory
            ]
        }).compile();

        // Get the remoteController and remoteService in the Testing Module Context
        remoteController = module.get<RemoteController>(RemoteController);
        remoteService = module.get<RemoteService>(RemoteService);
    });

    describe('findAll', () => {
        it('should return RemoteDtos', async () => {
            const result: RemoteDto[] = [{
                serverUrl: 'https://images.efiks.ovh:8443',
                readonly: true,
                public: true,
                id: 1,
                protocol: 'lxd',
                name: 'images'
            }];
            jest.spyOn(remoteService, 'findAll').mockImplementation(() => result);

            expect(await remoteController.findAll()).toBe(result);
        });
    });
});
