import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1 className="text-lg text-slate-800">Dhiraj Arun</h1>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>dhrjarun</title>;

// mdx rule in eslint
// deploying on gh-pages
// layout for blog
