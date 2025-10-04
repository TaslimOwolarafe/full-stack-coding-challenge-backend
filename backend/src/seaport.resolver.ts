import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver('Seaport')
export class SeaportResolver {
  constructor(private readonly appService: AppService) {}

  @Query()
  getSeaport(@Args({ name: 'id', type: () => Int }) id: number) {
    const seaport = this.appService.findSeaportById(id);
    if (!seaport) {
      return null;
    }
    return seaport;
  }

  @ResolveField()
  location(@Parent() seaport: { id: number }) {
    const location = this.appService.findLocationForPort(seaport.id);
    if (!location) {
      return { "city": "Unknown", "countryAlpha2": "??"};
    }
    return location;
  }
}
