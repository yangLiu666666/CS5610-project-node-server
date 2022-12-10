import usersModel from './user-model.js';
export const findUsers = () => usersModel.find();
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (uid) => usersModel.deleteOne({_id: uid});
// export const updateUser = (uid, tuit) => usersModel.updateOne({_id: uid}, {$set: tuit})
