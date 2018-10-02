import { Image } from '@lxdhub/db';
import { Connection, EntityRepository, Repository } from 'typeorm';

/**
 * The Image repository represents the
 * interface between the appliaction Image entity
 * and the database.
 */
@EntityRepository(Image)
export class ImageRepository extends Repository<Image> { }
