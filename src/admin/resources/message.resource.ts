import { AdminJSOptions } from "adminjs";
import { Message } from "../../entities/message.entity.js";

const messageResource: AdminJSOptions['resources'][number] = {
  resource: Message,
  options: { navigation: false },
}

export default messageResource;