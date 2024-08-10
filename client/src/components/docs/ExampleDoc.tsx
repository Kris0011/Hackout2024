import React from "react";
import DocTitle from "./DocTitle";
import DocSection from "./DocSection";
import CodeBlock from "./CodeBlock";
import Note from "./Note";
import Sidebar from "./Sidebar/Sidebar";

const sidebarItems = [
  {
    title: "Introduction",
    path: "/docs/introduction",
  },
  {
    title: "Getting Started",
    path: "/docs/getting-started",
  },
  {
    title: "Components",
    path: "/docs/components",
  },
  // Add more items here
];

const ExampleDoc: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }} className="app">
      <Sidebar items={sidebarItems} />

      <div className="content">
        <DocTitle title="Getting Started with Our API" />

        <DocSection title="Introduction">
          <p>
            Welcome to the documentation for our API. Here you'll find
            information on how to get started...
          </p>
        </DocSection>

        <DocSection title="Basic Example">
          <p>Below is a basic example of how to use the API:</p>
          <CodeBlock
            code={`fetch('/api/v1/resource').then(response => response.json());`}
            language="javascript"
          />
        </DocSection>

        <DocSection title="Notes">
          <Note type="info">
            Make sure to replace <code>/api/v1/resource</code> with the actual
            endpoint.
          </Note>
        </DocSection>
      </div>
    </div>
  );
};

export default ExampleDoc;
