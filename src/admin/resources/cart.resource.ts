import { AdminJSOptions } from "adminjs";
import { Cart } from "../../entities/cart.entity.js";

const cartResource: AdminJSOptions['resources'][number] = {
  resource: Cart,
}

export default cartResource;