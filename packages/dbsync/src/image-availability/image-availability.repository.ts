import { ImageAvailability } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(ImageAvailability)
export class ImageAvailabilityRepository extends Repository<ImageAvailability> { }
