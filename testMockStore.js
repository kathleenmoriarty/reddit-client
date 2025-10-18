import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

console.log(typeof mockStore); // should print 'function'