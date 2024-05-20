export default function auth(req, res, next) {
  if (req.session && req.user.user.role === 'admin') return next()
  else return res.sendStatus(401)
}
