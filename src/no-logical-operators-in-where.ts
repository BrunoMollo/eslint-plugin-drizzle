import type { TSESLint } from "@typescript-eslint/utils";

type MessageIds = "noLogicalOperatorsInWhere";

const logicalOperatorsRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that the caller use functions provided by Drizzle (eg: `and`, `or`) instead of logical operators (eg: `&&`, `||`, `>`, `==`)",
      url: "https://orm.drizzle.team/docs/operators",
    },
    fixable: "code",
    messages: {
      noLogicalOperatorsInWhere:
        "Avoid using plain logical operators in `where` clause, please see https://orm.drizzle.team/docs/operators",
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
