import Controller from '../../database/controller'
import Scamino from '../../lib/models'

export function getOrCreateUser(req: any, res: any) {
  const { email, firebaseId }: {
    email: string,
    firebaseId: string
  } = req.body

  if (!email || !firebaseId) return

  Controller.selectOne<Scamino.User>('users', 'firebaseId', firebaseId)
  .then(user => {
    if (user)
      return res.send(user)

    const newUser: Scamino.User = {
      email,
      firebaseId
    }

    Controller.insertOne<Scamino.User>('users', ['email', 'firebaseId'], newUser)
    .then(() => {
      Controller.selectOne('users', 'firebaseId', firebaseId)
      .then(user => res.send(user))
      .catch(() => res.send({}))
    })
    .catch(() => res.send({}))
  })
  .catch(() => res.send({}))
}
