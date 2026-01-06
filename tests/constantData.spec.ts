import { test, expect } from '@playwright/test'
import testData from '../data/testData.json';

test.describe('Constant Data Tests', () => {

    test('should validate constant data from JSON file', async () => {
        console.log(`>> print static data ${JSON.stringify(testData.STATUSCODES)}`);

    })
});
