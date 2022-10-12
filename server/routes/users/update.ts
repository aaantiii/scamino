import Controller from '../../database/controller'
import Scamino from '../../lib/models'

export function updateUser(req: any, res: any) {
  const { userInfo }: { userInfo: Scamino.User } = req.body

  if (!userInfo)
    return res.send({ success: false })

  Controller.updateOne('users', 'id', ['firstName', 'lastName', 'phone', 'street', 'country', 'city', 'zip'], userInfo)
  .then(() => res.send({ success: true }))
  .catch(() => res.send({ success: false }))
}
