/* interface ExerciseArgs {
    value1: number;
    value2: Array<number>;
} */

interface ExerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


/* const parseArguments = (args: Array<string>): ExerciseArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const helper = [];

    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            helper.push(Number(args[i]));
        }
    }

    if (!isNaN(Number(args[2])) && helper.length === args.length - 3) {
        return {
            value1: Number(args[2]),
            value2: helper
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};   */

const calculateExercises = (a: number, b: Array<number>): ExerciseValues => {      
    
    const targetDay = a;

    const daysTotal = b.filter(n => n > 0).length;
    const hoursTotal = b.reduce((accu, val) => val + accu, 0);
    const hoursPeriod = hoursTotal / b.length;
    const targetReached = hoursPeriod >= targetDay ? true : false;
    const myRating = hoursPeriod > targetDay ? 3 : hoursPeriod === targetDay ? 2 : 1;
    const descr = myRating === 3 ? 'Great! You\'ve done that' :
        myRating === 2 ? 'Not bad' : 'Could be better';

    return {
        periodLength: b.length,
        trainingDays: daysTotal,
        success: targetReached,
        rating: myRating,
        ratingDescription: descr,
        target: targetDay,
        average: hoursPeriod    
        };   
};

/* try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateExercises(value1, value2));

} catch (e) {
    console.log('Something went wrong, error message: ', e.message);
} */

export { calculateExercises };