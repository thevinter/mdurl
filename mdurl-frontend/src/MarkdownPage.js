import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import style from "./md-styles.module.css";

const MarkdownPage = () => {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const { fileId } = useParams(); // Fetching the fileId from the URL

  useEffect(() => {
    // Function to fetch markdown content
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(
          `http://65.109.13.255:5000/markdown/${fileId}.md`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const text = await response.text();
        setMarkdown(text);
      } catch (error) {
        console.error("Fetch error:", error);
        setMarkdown("Error loading markdown content.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [fileId]); // Dependency array ensures useEffect runs when fileId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Markdown
        className={style.markdown}
        remarkPlugins={[remarkGfm]}
        children={markdown}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={docco}
                language={match[1]}
                PreTag="div"
                {...rest}
              />
            ) : (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default MarkdownPage;
