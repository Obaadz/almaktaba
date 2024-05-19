import { AdminJSOptions } from "adminjs";
import { Library } from '../../entities/library.entity.js';

const libraryResource: AdminJSOptions['resources'][number] = {
  resource: Library,
}

export default libraryResource;