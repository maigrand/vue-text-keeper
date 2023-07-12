import { ApiException } from '@/types/commonTypes';

export type Profile = {
    email: string,
}

export type ProfileState = {
    data: Profile | null,
    error: ApiException | null,
}
