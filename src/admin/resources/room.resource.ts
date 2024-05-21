import { AdminJSOptions } from "adminjs";
import { Room } from "../../entities/room.entity.js";

const roomResource: AdminJSOptions['resources'][number] = {
  resource: Room,
  options: {
    properties: {
      name: {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: true,
        },
      },
      owner: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
      users: {
        isVisible: {
          show: true,
          edit: false,
          filter: false,
          list: false,
        },
      },
      messages: {
        isVisible: {
          show: true,
          edit: false,
          filter: false,
          list: false,
        },
      },
    },
  },
}

export default roomResource;