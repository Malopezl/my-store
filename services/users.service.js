const { faker } = require('@faker-js/faker');

class UsersService {

  constructor() {
    this.users = [];
  }

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find((item) => item.id === id);
  }

  update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User NOT FOUND');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User NOT FOUND');
    }
    this.users.splice(index, 1);
    return { id };
  }

}

module.exports = UsersService;
