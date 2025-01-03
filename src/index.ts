import type { TSESLint } from "@typescript-eslint/utils";
import deleteRule from "./enforce-delete-with-where";
import updateRule from "./enforce-update-with-where";
import logicalOperatorsRule from "./no-logical-operators-in-where";
import { name, version } from "../package.json";
import all from "./configs/all";
import recommended from "./configs/recommended";

export const rules = {
  "enforce-delete-with-where": deleteRule,
  "enforce-update-with-where": updateRule,
  "no-logical-operators-in-where": logicalOperatorsRule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;

export const configs = { all, recommended };

export const meta = { name, version };
