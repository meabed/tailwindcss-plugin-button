export const spacedItems = function spacedItems({ values, children = ["*"] } = {}, variants = ["responsive"]) {
  return function tailwindSpacedItems({ addUtilities, config }) {
    let css = {};
    if (!values) {
      values = config("margin");
      delete values["auto"];
    }

    const getSelector = (variant, name, last) =>
      children
        .map(ch => `.spd-${variant}-${name} > ${ch}${last ? ":last-child" : ""}`)
        .join(", ");

    Object.keys(values).forEach(name => {
      let str = name;
      let val = values[name];

      css[getSelector("x", str)] = { "margin-right": `${val}` };
      css[getSelector("x", str, true)] = { "margin-right": "0" };

      css[getSelector("y", str)] = { "margin-bottom": `${val}` };
      css[getSelector("y", str, true)] = { "margin-bottom": "0" };

      css[getSelector("xy", str)] = {
        "margin-right": `${val}`,
        "margin-bottom": `${val}`
      };
      css[getSelector("xy", str, true)] = {
        "margin-right": "0",
        "margin-bottom": "0"
      };

    });

    addUtilities(css, variants);
  };
};
