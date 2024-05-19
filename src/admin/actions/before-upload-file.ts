export const beforeUploadFile = (req, ctx) => {
  if (req.method === "post" && ctx['adminjs-upload']?.file && ctx['adminjs-upload']?.file[0]?.name && ctx['adminjs-upload']?.file[0]?.type) {
    const file = ctx['adminjs-upload']?.file[0] as {
      name: string,
      type: string
    }

    console.log(file.name)

    req.payload = {
      ...req.payload,
      key: file.name,
      mime: file.type,
      bucket: 'public/files'
    }
  }

  return req
}
