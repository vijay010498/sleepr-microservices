import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('local') {} // name used inside strategies; by default, it is local we can override there
