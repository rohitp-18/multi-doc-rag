import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ ...props }) => (
          <p className="text-base leading-relaxed mb-2 last:mb-0" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul
            className="list-disc list-outside ml-4 mb-2 space-y-1"
            {...props}
          />
        ),
        ol: ({ ...props }) => (
          <ol
            className="list-decimal list-outside ml-4 mb-2 space-y-1"
            {...props}
          />
        ),
        li: ({ ...props }) => <li className="text-base" {...props} />,
        code: ({ ...props }) => (
          <code
            className="block bg-gray-900 dark:bg-black text-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto mb-2"
            {...props}
          />
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-3 border-gray-400 dark:border-neutral-500 pl-3 italic text-base mb-2 opacity-75"
            {...props}
          />
        ),
        h1: ({ ...props }) => (
          <h1 className="text-base font-bold mb-2 mt-3" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-base font-bold mb-2 mt-2" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-sm font-bold mb-1 mt-1" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default Markdown;
