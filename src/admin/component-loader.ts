import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const components = {
  CartItemsPreview: componentLoader.add("CartItemsPreview", "./components/cart-items-preview"),
}

export default componentLoader;
export { components }