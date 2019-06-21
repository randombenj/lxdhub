import { Test } from '@nestjs/testing';

import { RemoteService } from '.';
import { RemoteDto } from './dtos';
import { RemoteFactory } from './factories';
import { RemoteController } from './remote.controller';
import { ResponseDto } from '../common';

const result: RemoteDto[] = [
  {
    serverUrl: 'https://images.efiks.ovh:8443',
    readonly: true,
    public: true,
    id: 1,
    protocol: 'lxd',
    name: 'images'
  }
];
const response = new ResponseDto(result);

const remoteServiceMock = {
  findAll: jest.fn().mockImplementation(() => Promise.resolve(response))
};

/**
 * Test cases for the remote controller
 */
describe('RemoteController', () => {
  let remoteController: RemoteController;

  beforeEach(async () => {
    // Mock Image Module
    const module = await Test.createTestingModule({
      controllers: [RemoteController],
      providers: [
        {
          provide: RemoteService,
          useValue: remoteServiceMock
        },
        RemoteFactory
      ]
    }).compile();

    // Get the remoteController and remoteService in the Testing Module Context
    remoteController = module.get<RemoteController>(RemoteController);
  });

  describe('findAll', () => {
    it('should return RemoteDtos', async () => {
      expect(await remoteController.findAll()).toBe(response);
    });
  });
});
