import { Test } from '@nestjs/testing';

import { RemoteService } from '.';
import { RemoteFactory } from './factories';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Remote } from '@lxdhub/db';
import { RemoteDto } from './dtos';

const results = [
  {
    name: 'images',
    serverUrl: 'https://images.efiks.ovh:8443'
  }
];

const remoteRepositoryMock = {
  createQueryBuilder() {
    return {
      getManyAndCount: jest
        .fn()
        .mockImplementation(() => Promise.resolve([results, results.length]))
    };
  },
  findOne() {
    return jest.fn().mockImplementation(() => Promise.resolve(results[0]));
  }
};

const remoteFactoryMock = {
  entitiesToDto() {
    return results as RemoteDto[];
  }
};

/**
 * Test cases for the remote service
 */
describe('RemoteService', () => {
  let remoteService: RemoteService;

  beforeEach(async done => {
    // Mock Remote Module
    const module = await Test.createTestingModule({
      providers: [
        RemoteService,
        {
          provide: getRepositoryToken(Remote),
          useValue: remoteRepositoryMock
        },
        {
          provide: RemoteFactory,
          useValue: remoteFactoryMock,
        }
      ]
    }).compile();

    // Get the remoteService in the Testing Module Context
    remoteService = module.get<RemoteService>(RemoteService);
    done();
  });

  describe('findAll', () => {
    /**
     * Shoul return a list of remote dtos
     */
    it('should return RemoteDtos', async () => {
      expect(await remoteService.findAll()).toEqual({
        results
      });
    });
  });
});
