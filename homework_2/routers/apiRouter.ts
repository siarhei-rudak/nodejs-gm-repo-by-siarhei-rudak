import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { userCreateValidationSchema, userSearchValidationSchema } from '../schemas/userValidationSchema';
import { createValidator } from 'express-joi-validation';
import TUser from '../types/User';
import predefinedUsers from '../db/predefinedUsers';

const validator = createValidator();
const apiRouter = express.Router();
const users: TUser[] = predefinedUsers;

apiRouter.param('id', (req: Request, res: Response, next: NextFunction, id: string) => {
    if (!id && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')) {
        return res.json({ msg: 'User id is missing' });
    }
    next();
});

apiRouter.route('/api/users/search')
    .get(validator.query(userSearchValidationSchema), (req: Request, res: Response) => {
        const pattern = new RegExp(`${req.query.q}`, 'i');
        const usersFound = users.filter(u => pattern.test(u.login));
        if (usersFound.length === 0) return res.json({ msg: 'No users found' });
        const usersFoundSorted = usersFound.sort(compare);
        res.json(usersFoundSorted);
    });

apiRouter.route('/api/users/')
    .get((req: Request, res: Response) => {
        res.json(users);
    })

    .put(validator.body(userCreateValidationSchema), (req: Request, res: Response) => {
        const { login, password, age } = req.body;
        users.push({
            id: uuidv4(),
            login,
            password,
            age,
            isDeleted: false
        });
        res.json(users);
    });


apiRouter.route('/api/users/:id')
    .get((req: Request, res: Response) => {
        const user = users.find(u => u.id === req.params.id);
        if (!user) return res.json({ msg: 'User not found' });
        res.json({ msg: 'success', user });
    })

    .post(validator.body(userCreateValidationSchema), (req: Request, res: Response) => {
        const idx = users.findIndex(u => u.id === req.params.id);
        if (idx < 0) return res.json({ msg: 'User not found' });
        users[idx] = { ...users[idx], ...req.body };
        res.json({ user: users[idx] });
    })

    .delete((req: Request, res: Response) => {
        const user = users.find(u => u.id === req.params.id);
        if (!user) return res.json({ msg: 'User not found' });
        user.isDeleted = true;
        res.json({ msg: 'User deleted' });
    });

export default apiRouter;

function compare(a: any, b: any) {
    if (a.login < b.login) {
        return -1;
    }
    if (a.login > b.login) {
        return 1;
    }
    return 0;
}
