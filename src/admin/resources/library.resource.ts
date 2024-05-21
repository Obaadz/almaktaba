import { AdminJSOptions } from "adminjs";
import { Library } from '../../entities/library.entity.js';

const libraryResource: AdminJSOptions['resources'][number] = {
  resource: Library,
  options: {
    properties: {
      rateCount: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
      totalRate: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
    },
  },
}

export default libraryResource;