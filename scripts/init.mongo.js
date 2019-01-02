db = new Mongo().getDB('diabetesSelfManagement');

db.activities.remove({});

// db.activities.insert([
//     {
//         date: new Date('2018-12-30'),
//         activity_type: 'Fasting BGL',
//         value: '100'
//     },
//     {
//         date: new Date('2018-12-31'),
//         activity_type: 'BGL After Lunch',
//         value: '120'
//     },
//     {
//         date: new Date(2019, 0, 1, 11, 11, 11),
//         activity_type: 'Jogging',
//         value: '30 minutes'
//     },
//     {
//         date: new Date(),
//         activity_type: 'Usual Dinner',
//         value: 'Ramen'
//     }
// ]);