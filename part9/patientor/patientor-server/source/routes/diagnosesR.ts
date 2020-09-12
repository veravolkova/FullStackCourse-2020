import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.get('/:code', (req, res) => {
  const diagnose = diagnoseService.findByCode(req.params.code);

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  res.send('Not implemented yet!');
});

export default router;
