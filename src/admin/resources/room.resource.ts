import { AdminJSOptions } from "adminjs";
import { Room } from "../../entities/room.entity.js";
import { beforeEditRoom } from "../actions/before-edit-room.js";
import { afterEditRoom } from "../actions/after-edit-room.js";

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
      users: {
        isVisible: {
          show: false,
          edit: false,
          filter: false,
          list: false,
        },
      },
      messages: {
        isVisible: {
          show: false,
          edit: false,
          filter: false,
          list: false,
        },
      },
    },
    actions: {
      new: {
        isVisible: false,
      },
      edit: {
        before: [beforeEditRoom],
        after: [afterEditRoom]
      },
    },
  },
}

export default roomResource;