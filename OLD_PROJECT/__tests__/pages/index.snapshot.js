import { render } from '@testing-library/react';
import Home from '../../pages/index';

it('renders homepage unchanged', () => {
    const sampleSearchArray = [];
    const { container } = render(<Home searchArray={sampleSearchArray} />);

  expect(container).toMatchSnapshot()
})