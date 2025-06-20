import { create } from 'domain';
import { SalesmanModel } from '../models/salesmanModel.js';

export const SalesmanDAO = {
  create: async (payload: any) => {
    console.log('data inside DAO', payload);

    return await new SalesmanModel({
      id: payload.id,
      name: payload.name,
      sales: payload.sales,
    }).save();
  },

  getSalesman: () => {
    return SalesmanModel.find({}, { _id: 0, id: 1, name: 1, sales: 1 });
  },

  deleteSalesman: (id: string) => {
    console.log('condition for delete', id);
    return SalesmanModel.findOneAndDelete({ id: id });
  },

  updateSalesman: (id: string, name: string) => {
    console.log('condition for delete', id, name);
    return SalesmanModel.findOneAndUpdate(
      { id: id },
      { name: name },
      { new: true }
    );
  },
  getSalesmanById: (id: string) => {
    return SalesmanModel.findOne({ id: id });
  },
};
