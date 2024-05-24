import { AdminJSOptions } from "adminjs";
import { Order } from "../../entities/order.entity.js";
import { components } from "../component-loader.js";
import { beforeEditOrder } from "../actions/before-edit-order.js";
import { afterEditOrder } from "../actions/after-edit-order.js";

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
      rate: {
        isVisible: {
          show: true,
          edit: false,
          filter: false,
          list: false,
        },
      },
      delivery: {
        isVisible: {
          show: true,
          edit: true,
          filter: true,
          list: false,
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
        layout: ["note", "code", "delivery", "hasBeenCompleted"],
        before: [beforeEditOrder],
        after: [afterEditOrder]
      },
    },
  },
}

export default orderResource;