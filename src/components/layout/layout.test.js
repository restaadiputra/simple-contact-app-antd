import React from 'react';
import { render } from '@testing-library/react';
import Layout from './layout';

test('should render without error', () => {
  const { container } = render(
    <Layout>
      <p>testing children</p>
    </Layout>
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <main
        class="ant-layout-content"
        style="min-height: 100vh;"
      >
        <div
          style="max-width: 800px; margin: 0px auto;"
        >
          <p>
            testing children
          </p>
        </div>
      </main>
    </div>
  `);
});
