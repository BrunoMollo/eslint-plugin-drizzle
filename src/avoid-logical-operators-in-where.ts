import type { TSESLint } from "@typescript-eslint/utils";

type MessageIds = "avoidLogicalOperatorsInWhere";

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
      avoidLogicalOperatorsInWhere: "TODO",
    },
    schema: [],
  },
  create(context) {
    function fail(node: any) {
      context.report({
        node,
        messageId: "avoidLogicalOperatorsInWhere",
      });
    }
    return {
      CallExpression: (node) => {
        if (node.callee.type === "MemberExpression") {
          if (node.callee.property.type === "Identifier") {
            if (node.callee.property.name === "where") {
              if (node.arguments[0]?.type === "LogicalExpression") {
                fail(node);
              }
              if (node.arguments[0]?.type === "BinaryExpression") {
                fail(node);
              }
            }
          }
        }
      },
    };
  },
};

export default logicalOperatorsRule;
