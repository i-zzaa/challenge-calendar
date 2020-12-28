import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')


import uuid from 'uuid';
jest.spyOn(uuid, 'v4').mockReturnValue('hjhj87878');

import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

