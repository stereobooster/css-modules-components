<img src="https://github.com/stereobooster/css-modules-components/blob/master/css-modules-components.png?raw=true" width="150" height="150" />

# styled-components for CSS Modules

## Why?

The main benefit of `styled-components` (IMO) is semantics they add to the code. We can have a similar experience with CSS modules. Compare

```js
import styles from "./AccordionSection.module.css";

export const AccordionSection = ({
  children,
  title,
  index,
  onToggle,
  id,
  expanded
}) => {
  const sectionId = `${id}-${index}-section`;
  const labelId = `${id}-${index}-label`;
  return (
    <>
      <div
        role="button"
        aria-expanded={expanded}
        aria-controls={sectionId}
        id={labelId}
        className={styles.Label}
        onClick={() => onToggle && onToggle(index)}
      >
        {title}
        <span aria-hidden={true}>{expanded ? "▲" : "▼"}</span>
      </div>
      <div
        role="region"
        aria-labelledby={labelId}
        id={sectionId}
        hidden={!expanded}
        className={styles.Panel}
      >
        {expanded && (isFunction(children) ? children() : children)}
      </div>
    </>
  );
};
```

vs

```js
import styles from "./AccordionSection.module.css";
import cssModulesComponents from "css-modules-components";
const styled = cssModulesComponents(styles);

const Label = styled.div("Label");
Label.defaultProps = { role: "button" };

const Panel = styled.div("Panel");
Panel.defaultProps = { role: "region" };

export const AccordionSection = ({
  children,
  title,
  index,
  onToggle,
  id,
  expanded
}) => {
  const sectionId = `${id}-${index}-section`;
  const labelId = `${id}-${index}-label`;
  return (
    <>
      <Label
        aria-expanded={expanded}
        aria-controls={sectionId}
        id={labelId}
        onClick={() => onToggle && onToggle(index)}
      >
        {title}
        <span aria-hidden={true}>{expanded ? "▲" : "▼"}</span>
      </Label>
      <Panel aria-labelledby={labelId} id={sectionId} hidden={!expanded}>
        {expanded && (isFunction(children) ? children() : children)}
      </Panel>
    </>
  );
};
```

## Modifiers

Every class in CSS Module can be used as the "source" for the component and as a modifier.

```css
// class for component
.Button {
  background: #fff;
  color: red;
  border: 2px solid red;
}
// class for modifier
.primary {
  background: red;
  color: white;
}
```

```js
const styled = styledModules(styles);
const Button = styled.button("Button");

export const App = () => (
  <>
    {/* className="Button" */}
    <Button>Normal Button</Button>
    {/* className="Button primary" */}
    <Button primary>Primary Button</Button>
  </>
);
```

## Inspiration

- https://github.com/akameco/styled-style
- https://github.com/JedWatson/classnames
