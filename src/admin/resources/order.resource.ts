import { AdminJSOptions } from "adminjs";
import { Order } from "../../entities/order.entity.js";
import { components } from "../component-loader.js";

const orderResource: AdminJSOptions['resources'][number] = {
  resource: Order,
  options: {
    sort: {
      direction: "desc",
      sortBy: "createdAt",
    },
    properties: {
      code: {
        isVisible: {
          show: true,
          edit: true,
          filter: true,
          list: true,
        },
      },
      cartItems: {
        isVisible: {
          list: false,
          edit: false,
          filter: false,
          show: true,
        },
        components: {
          show: components.CartItemsPreview
        },
      },
      total: {
        isVisible: {
          list: true,
          edit: false,
          new: false,
          filter: false,
          show: true,
        },
      },
      createdAt: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
    },
    actions: {
      new: {
        isVisible: false,
      },
      edit: {
        layout: ["note", "code"],
      },
      bulkDelete: {
        isVisible: false,
      },
    },
  },
}

export default orderResource;