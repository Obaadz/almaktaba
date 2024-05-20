import { AdminJSOptions } from "adminjs";
import { Order } from "../../entities/order.entity.js";

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
          edit: false,
          filter: true,
          list: true,
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
      bulkDelete: {
        isVisible: false,
      },
    },
  },
}

export default orderResource;