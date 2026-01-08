import {test as base} from '@playwright/test';

export type EnvConfig = {
    apiUrl: string;
   
};  

export const test = base.extend<EnvConfig>({
apiUrl: ["provideUrl~

}