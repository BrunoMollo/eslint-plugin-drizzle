// @ts-ignore
import { RuleTester } from "@typescript-eslint/rule-tester";

import myRule from "../src/avoid-logical-operators-in-where";

const parserResolver = require.resolve("@typescript-eslint/parser");

const ruleTester = new RuleTester({
  parser: parserResolver,
});

ruleTester.run("my-rule", myRule, {
  valid: [
    "const a = db.delete({}).where({});",
    "delete db.something",
    `dataSource
      .delete()
      .where()`,
    "someFunction(a && b)",
    "object.method(c || d)",
    "where.do(x | b)",
    "foo(where && other)",
  ],
  invalid: [
    {
      code: "db.delete.where({} && {})",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
    {
      code: "db.delete.where({} || {})",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
    {
      code: "db.delete.where({} & {})",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
    {
      code: "db.delete.where({} | {})",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },

    {
      code: "db.select().from(t_somehting).where({} && {})",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
    {
      code: "db.select().from(t_other_thing).where({} || {})",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
    {
      code: "db.select().from(t_other_thing).where({} & {})",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
    {
      code: "db.select().from(t_stored_stuff).where({} | {})",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
    {
      code: "ctx.select().from(t_foo).where(eq(t_foo.id, id) && eq(t_foo.date, date))",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
    {
      code: "ctx.select().from(t_foo).innerJoin(t_bar, eq(t_foo.id, t_bar.foo_id)).where(eq(t_foo.id, id) && eq(t_foo.date, date))",
      errors: [{ messageId: "avoidLogicalOperatorsInWhere" }],
    },
  ],
});
