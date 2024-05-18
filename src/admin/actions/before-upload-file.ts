export const beforeUploadFile = (req, ctx) => {
  if (req.method === "post") {
    const file = ctx['adminjs-upload']?.file[0] as {
      name: string,
      type: string
    }

    req.payload = {
      ...req.payload,
      key: file.name,
      mime: file.type,
      bucket: 'public/files'
    }
  }

  return req
}
