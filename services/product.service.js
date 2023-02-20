// const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize')

class ProductsService {

  constructor() {
    // this.generate();
  }

  // generate() {
  //   const limit = 100;

  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //     });
  //   }
  // }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      attributes: { exclude: ['categoryId'] },
    }

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }

    const { price } = query;
    if (price) {
      options.where = {
        price: {
          [Op.eq]: parseInt(price)
        }
      };
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where = {
        price: {
          [Op.between]: [parseInt(price_min), parseInt(price_max)]
        }
      }
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;
