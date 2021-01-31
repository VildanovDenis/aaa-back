import express from 'express';

import { IUser, User } from '../schema/user';

export class UserController {
  /*
   * Поиск пользователя по идентификатору
   */
  findUser(req: express.Request, res: express.Response) {
    const id: string = req.params.id;

    User.findById(
      id,
      (err: any, user: any) => {
        if (err) {
          return res.status(404).json({ message: 'Not found' });
        }

        return res.json(user);
      }
    );
  }

  /*
   * Информация о себе
   */
  getMyself() {
  }

  /*
   * Удаление пользователя по идентификатору
   */
  async deleteUser(req: express.Request, res: express.Response) {
    const id: string = req.params.id;

    User.findOneAndRemove(
      { _id: id },
      req.body,
      (err, doc) => {
        if (err) {
          res.json(err);
          return;
        }

        if (!doc) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        res.json({ message: `User ${doc.name} deleted` });
      }
    );
  }

  /*
   * Создание(регистрация) пользователя
   */
  async create(req: express.Request, res: express.Response) {
    const { email, name, surname = '', avatar = '', password } = req.body;
    const postData = {
      email,
      name,
      surname,
      avatar,
      password,
    };

    const newUser = new User(postData);
    try {
      const result = await newUser.save();
      res.json(result);
    } catch (e) {
      res.json(e);
    }
  }
}