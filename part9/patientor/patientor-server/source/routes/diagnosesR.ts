import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.get('/:id', (req, res) => {
  const diagnose = diagnoseService.findById(Number(req.params.id));

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;
