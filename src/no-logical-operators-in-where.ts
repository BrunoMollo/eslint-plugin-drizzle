import type { TSESLint } from "@typescript-eslint/utils";

type MessageIds = "noLogicalOperatorsInWhere";

const logicalOperatorsRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "problem",
    docs: {
      description: "TODO",
      url: "https://github.com/drizzle-team/eslint-plugin-drizzle",
    },
    fixable: "code",
    messages: {
      noLogicalOperatorsInWhere: "TODO",
    },
    schema: [],
  },
  create(context) {
    function error(node: any) {
      context.report({
        node,
        messageId: "noLogicalOperatorsInWhere",
      });
    }
    return {
      CallExpression: (node) => {
        if (node.callee.type === "MemberExpression") {
          if (node.callee.property.type === "Identifier") {
            if (node.callee.property.name === "where") {
              if (node.arguments[0]?.type === "LogicalExpression") {
                error(node);
              }
              if (node.arguments[0]?.type === "BinaryExpression") {
                error(node);
              }
            }
          }
        }
      },
    };
  },
};

export default logicalOperatorsRule;
