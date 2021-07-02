const errors = require('restify-errors');
const Beneficiaries = require('../models/Beneficiaries');
const yup = require('yup');

module.exports = server => {
  server.get('/beneficiaries', async (req, res, next) => {
    try {
      const beneficiaries = await Beneficiaries.find({})
      res.send(beneficiaries);
      next();
    } catch (error) {
      return next(new errors.InvalidContentError(error))
    }
  });

  server.get('/beneficiaries/:id', async (req, res, next) => {
    try {
      const beneficiarie = await Beneficiaries.findById(req.params.id)
      res.send(beneficiarie);
      next();
    } catch (error) {
      return next(new errors.ResourceNotFound(`Hi, there seems to be no beneficiarie with ID of: ${req.params.id}`))
    }
  });

  server.post('/beneficiaries', async (req, res, next) => {
    const { name, cpf, rg, birthday, plan, dependents } = req.body;

    let schema = yup.object().shape({
      name: yup.string().required(),
      cpf: yup.string().required(),
      rg: yup.string().required(),
      birthday: yup.date().required(),
      plan: yup.string().required(),
      dependents: yup.number().nullable()
    });

    if (!(await schema.isValid(req.body))) {
      res.send(400);
      next();
    }

    const beneficiarie = new Beneficiaries({
      name,
      cpf,
      rg,
      birthday,
      plan,
      dependents
    });

    try {
      await beneficiarie.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  server.put('/beneficiaries/:id', async (req, res, next) => {
    const { name, cpf, rg, birthday, plan, dependents } = req.body;
    const { id } = req.params;

    let schema = yup.object().shape({
      name: yup.string().nullable(),
      cpf: yup.string().nullable(),
      rg: yup.string().nullable(),
      birthday: yup.date().nullable(),
      plan: yup.string().nullable(),
      dependents: yup.number().nullable()
    });

    if (!(await schema.isValid(req.body))) {
      return res.send(400);
    }

    try {
      await Beneficiaries.findOneAndUpdate({_id: id}, { name, cpf, rg, birthday, plan, dependents });
      res.send(200)
      next();
    } catch (error) {
      return next(new errors.ResourceNotFound(`Hi, there seems to be no beneficiarie with ID of: ${req.params.id}`)) // this is called when a debtor with the ID does not exist
    }
  })

  server.del('/beneficiaries/:id', async (req, res, next) => { 
    try {
      await Beneficiaries.findOneAndRemove({ _id: req.params.id });
      res.send(204);
      next();
    } catch (error) {
      return next(new errors.ResourceNotFound(`Hi, there seems to be no beneficiarie with ID of: ${req.params.id}`));
    }
  })
}