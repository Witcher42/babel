export default function ({ types: t }) {
  let aVisitor = {
    ObjectProperty: {
      exit({node}) {
        let key = node.key;
        if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
          // default: "bar" -> "default": "bar"
          node.key = t.stringLiteral(key.name);
        }
      }
    },

    MemberExpression: {
      exit({ node }) {
        let prop = node.property;
        if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
          // foo.default -> foo["default"]
          node.property = t.stringLiteral(prop.name);
          node.computed = true;
        }
      }
    }
  };

  return {
    visitor: {
      Program: {
        exit({ node }) {
          node.traverse(aVisitor);
        }
      }
    }
  };
}
