import { AdminJSOptions } from "adminjs";
import { CartItem } from "../../entities/cart-item.entity.js";

const cartItemResource: AdminJSOptions['resources'][number] = {
  resource: CartItem,
}

export default cartItemResource;