import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res, next) => {

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    try {        
        if (height && weight) {

            const data = {
                'height': height,
                'weight': weight,
                'bmi': calculateBmi(height, weight)
            };
            res.send(data);
        }
        else {
            return res.status(401).json({ error: 'error: malformatted parameters' });
        }
    }
    catch (exception) {
        return next(exception);
    }
});

app.post('/exercises', (req, res, next) => {    
    const body = req.body;
  
    try {               
        if (!body.target || !body.daily_exercises || body.daily_exercises.length === 0) {
            return res.status(401).json({ error: 'parameters missing' });
        }

        if (!isNaN(Number(body.target)) &&  body.daily_exercises) {
            const result = calculateExercises(body.target, body.daily_exercises);
            res.send(result);
        }    
        else {
            return res.status(401).json({ error: 'error: malformatted parameters' });
            }
        }
    catch (exception) {
        return next(exception);
    }
  });  

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});