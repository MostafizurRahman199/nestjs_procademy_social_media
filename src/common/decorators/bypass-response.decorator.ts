import { SetMetadata } from '@nestjs/common';

export const BYPASS_RESPONSE_KEY = 'bypass_response';
export const BypassResponse = () => SetMetadata(BYPASS_RESPONSE_KEY, true);
