import { create } from 'domain';
import { SalesmanDAO } from '../DAO/salesmanDAO.js';
import { error } from 'console';
import { SalesmanDocument } from '../models/salesmanModel.js';

export const SalesmanService = {
  create: async (payload: any) => {
    console.log('data inside service', payload);
    payload.sales = Array.from(
      { length: 12 },
      () => Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000
    );

    return await SalesmanDAO.create(payload);
  },

  getSalesman: async () => {
    console.log('checking inside service');
    const results = await SalesmanDAO.getSalesman();

    return results.map((salesman: any) => ({
      id: salesman.id,
      name: salesman.name,
      lastMonthSale: salesman.sales[salesman.sales.length - 1],
    }));
  },

  deleteSalesman: async (id: string) => {
    console.log('checking inside service');
    const results = await SalesmanDAO.deleteSalesman(id);

    return results;
  },

  updateSalesman: async (id: string, name: string) => {
    console.log('checking inside service', id, name);
    const results = await SalesmanDAO.updateSalesman(id, name);

    return results;
  },

  getSalesmanById: async (id: string) => {
    const salesman = await SalesmanDAO.getSalesmanById(id);
    if (!salesman) throw new Error('Salesman not found');

    const sales = salesman.sales;
    const total = sales.reduce((sum: number, num: number) => sum + num, 0);
    const average = Math.round(total / sales.length);

    return {
      id: salesman.id,
      name: salesman.name,
      sales,
      total,
      average,
    };
  },
};
