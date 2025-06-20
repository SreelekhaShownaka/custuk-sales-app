import express, { Request, Response } from 'express';
import { SalesmanService } from '../services/salesmanService.js';

const router = express.Router();

router.post('/addSalesman', async (req: Request, res: Response) => {
  const bodyData = req.body;
  console.log('Data inside controller', bodyData);

  const result = await SalesmanService.create(bodyData)
    .then((result: any) => {
      res.send({ data: 'Salesman created successfully', salesman: result });
    })
    .catch((error: any) => {
      res.send({ data: error });
    });
});

router.get('/getSalesman', async (req: Request, res: Response) => {
  console.log('Data inside controller');

  SalesmanService.getSalesman()
    .then((result: any) => {
      res.send({ data: result });
    })
    .catch((error: any) => {
      res.send({ data: error });
    });
});

router.delete('/deleteSalesman/:id', async (req: Request, res: Response) => {
  let id = req.params.id;
  console.log('Data inside controller', id);

  SalesmanService.deleteSalesman(id)
    .then((result: any) => {
      res.send({ data: result, message: 'deleted successfully' });
    })
    .catch((error: any) => {
      res.send({ data: error });
    });
});

router.put('/updateSalesman/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  console.log('Data inside controller', id, name);

  SalesmanService.updateSalesman(id, name)
    .then((result: any) => {
      res.send({ data: result });
    })
    .catch((error: any) => {
      res.send({ data: error });
    });
});

router.get(
  '/getSalesmanById/:id/summary',
  async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log('Data inside controller');

    SalesmanService.getSalesmanById(id)
      .then((result: any) => {
        res.send({ data: result });
      })
      .catch((error: any) => {
        res.send({ data: error });
      });
  }
);

export default router;
