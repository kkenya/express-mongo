const get = (context) => {
  const name = context.params.query.name
  return { message: `Hello ${name}` }
}

module.exports = {
  'greets#get': get
}
