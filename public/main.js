
const updateSize = () => {
  const target = document.getElementById('markmap');
  target.setAttribute('width', window.innerWidth);
  target.setAttribute('height', window.innerHeight);
};

// get text
window.onload = async () => {
  updateSize();

  const res = await fetch('content/index.md');
  const text = await res.text();

  const { markmap: { Markmap, Transformer, loadCSS, loadJS } } = window;
  const transformer = new Transformer();
  const { root, features } = transformer.transform(text);
  const { styles, scripts } = transformer.getAssets();

  // 1. load assets
  if (styles) {
    loadCSS(styles);
  }

  if (scripts) {
    loadJS(scripts, { getMarkmap: () => markmap });
  }

  // 2. create markmap
  Markmap.create('#markmap', {}, root);
};