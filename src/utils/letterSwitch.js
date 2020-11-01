export default (node, { duration = 300 }) => {
  const valid =
    node.childNodes.length === 1 &&
    node.childNodes[0].nodeType === Node.TEXT_NODE;

  if (!valid) {
    throw new Error(
      `This transition only works on elements with a single text node child`
    );
  }

  const text = node.textContent;

  return {
    duration,
    tick: (t) => {
      const i = ~~(text.length * t);
      node.textContent = text.slice(0, i);
    },
  };
};
