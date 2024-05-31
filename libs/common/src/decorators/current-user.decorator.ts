import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersDocument } from '@app/common/models';
const getCurrentUserByContext = (context: ExecutionContext): UsersDocument => {
  if (context.getType() === 'http')
    return context.switchToHttp().getRequest().user;
  const user = context.getArgs()[2]?.req.headers?.user;
  if (user) {
    return JSON.parse(user);
  }
};
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
