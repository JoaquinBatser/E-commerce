const isAllowed = (permissions) => (req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  // No debe estar logeado
  if (permissions.includes('guest') && req.isAuthenticated()) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized', redirectUrl: '/home' })
  }

  // Debe estar logeado (incluye user, premium y admin)
  if (permissions.includes('user') && !req.isAuthenticated()) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized', redirectUrl: '/error' })
  }

  // Solo roles especificos
  if (
    (permissions.includes('premium') || permissions.includes('admin')) &&
    !permissions.includes(req.user.user.role)
  ) {
    return res
      .status(403)
      .json({ success: false, message: 'Forbidden', redirectUrl: '/error' })
  }

  next()
  // Comment: verify if it works
}
export default isAllowed
