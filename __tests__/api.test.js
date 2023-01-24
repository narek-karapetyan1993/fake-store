import axios from 'axios';
import getProducts from '../src/js/components/api';

jest.mock('axios');

describe('getProducts', () => {
  let response;
  beforeEach(() => {
    response = {
      data: [
        {
          id: 1,
          title: '...',
          price: '...',
          category: '...',
          description: '...',
          image: '...',
        },
        {
          id: 2,
          title: '...',
          price: '...',
          category: '...',
          description: '...',
          image: '...',
        },
      ],
    };
  });
  test('correct response', () => {
    axios.get.mockReturnValue(response);
    return getProducts().then((data) => expect(data).toEqual(response.data));
  });
});
