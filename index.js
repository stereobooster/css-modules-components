import React from "react";

export default styles => {
  const get = (_, defaultAs, __) => defaultClass => {
    if (
      process.env.NODE_ENV === "development" &&
      styles[defaultClass] === undefined
    ) {
      console.warn(`Class name is missing ${defaultClass}`);
    }

    const proceedProps = (className, props, ref) => {
      const classes = [styles[className]];
      const rest = { ref, className };
      Object.keys(props).forEach(key => {
        if (styles[key]) {
          if (props[key] === true) {
            classes.push(styles[key]);
          } else if (
            process.env.NODE_ENV === "development" &&
            props[key] !== false
          ) {
            console.warn(
              `Modifier ${key} expected to be boolean value, but instead got ${
                props[key]
              }`
            );
          }
        } else {
          rest[key] = props[key];
        }
      });
      rest.className = classes.join(" ");
      return rest;
    };

    const component = React.memo(
      React.forwardRef(({ children, as = defaultAs, ...props }, ref) =>
        React.createElement(
          as,
          proceedProps(defaultClass, props, ref),
          children
        )
      )
    );
    component.displayName = `${defaultClass}💅`;
    return component;
  };

  // browser support https://caniuse.com/#search=proxy
  return new Proxy({}, { get });
};
