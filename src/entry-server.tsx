import { QueryClientProvider, dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import fs from 'node:fs';
import path from 'node:path';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import type { StaticHandlerContext } from 'react-router';

import createRoutes from '@/createRoutes.tsx';
import { HTML_DIVIDER } from '@/constants';

const outDir = 'dist';

const routesForSSG = [
  {
    routePath: '/',
    fileName: '/index.html'
  },
  ...[1,2,3,4,5].map(id => ({
    routePath: `/products/${id}`,
    fileName: `/products/${id}/index.html`
  }))
];

function render() {
  const template = fs.readFileSync('dist/index.html', 'utf-8');

  routesForSSG.forEach(async ({ routePath, fileName }) => {
    console.info(`♻️ generating ${fileName}`);

    const t0 = performance.now();

    const request = new Request(`https://whatever.com${routePath}`);
    const queryClient = new QueryClient();
    const routes = createRoutes(queryClient);
    const { query, dataRoutes } = createStaticHandler(routes);
    const context = (await query(request)) as StaticHandlerContext;
    const router = createStaticRouter(dataRoutes, context);
    const rqs = dehydrate(queryClient);

    const htmlString = renderToString(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={rqs}>
            <StaticRouterProvider router={router} context={context} />
            <ReactQueryDevtools />
          </HydrationBoundary>
        </QueryClientProvider>
      </StrictMode>
    );

    const [head, body] = htmlString.split(HTML_DIVIDER);

    const html = template
      .replace('<!--head-outlet-->', head)
      .replace('<!--ssg-outlet-->', body)
      .replace('<!--rqs-outlet-->', `window.__REACT_QUERY_STATE__ = ${serialize(rqs)};`);

    const folder = path.resolve(`${outDir}${fileName.replace('index.html', '')}`);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    fs.writeFileSync(path.resolve(`${outDir}${fileName}`), html);

    const t1 = performance.now();

    console.info(`✅ ${fileName} processed in ${Math.round(t1 - t0)}ms`);
  });
}

render();
