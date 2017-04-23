import {List, Map} from 'immutable';
import moment from 'moment';

const duration = [
    '02/11/2016',
    '08/11/2016'
]

const events = [
    {id: 1, date: '5/11/2016', time: '9:00', text: 'HR Lecture'},
    {id: 11, date: '6/11/2016', time: '8:20', text: 'Management Meeting'},
    {id: 13, date: '7/11/2016', time: '9:30', text: 'Appointment with patient 3'},
    {id: 14, date: '7/11/2016', time: '13:00', text: 'Appointment with patient 3'},
    {id: 15, date: '7/11/2016', time: '14:00', text: 'Appointment with patient 4'},
    {id: 17, date: '7/11/2016', time: '15:00', text: 'Appointment with patient 5'},
    {id: 16, date: '14/11/2016', time: '16:00', text: 'test'}
];

const INITIAL_STATE = Map({
    duration: duration,
    events: events
});
export const scheduleReducer = (state = INITIAL_STATE, action) => {
    let e = action.event;

    if (action.type == 'DELETE_EVENT') {
        // e.preventDefault();
        let id = action.id;
        let events = state.get('events');
        let newEvents = events.filter(e => {
            return e.id != id;
        })
        return state.set('events', newEvents);
    } else if (action.type == 'EDIT_EVENT') {
        // e.preventDefault();
        let isChanged = false;
        let data = action.data;
        let events = state.get('events');
        let newEvents = events.map(function (event, index) {
            if (event.id == data.id &&  JSON.stringify(event) !== JSON.stringify(data)) {
                event = data;
                isChanged = true;
            }
            return event;
        })
        if (isChanged)
            return state.set('events', newEvents);

    } else if (action.type == 'NEXT_RANGE') {
        let duration = state.get('duration');
        duration = [
            moment(duration[0], 'DD/MM/YYYY').add(7, 'days').format('DD/MM/YYYY'),
            moment(duration[1], 'DD/MM/YYYY').add(7, 'days').format('DD/MM/YYYY')
        ];
        return state.set('duration', duration);
    } else if (action.type == 'PREV_RANGE') {
        let duration = state.get('duration');
        duration = [
            moment(duration[0], 'DD/MM/YYYY').add(-7, 'days').format('DD/MM/YYYY'),
            moment(duration[1], 'DD/MM/YYYY').add(-7, 'days').format('DD/MM/YYYY')
        ];
        return state.set('duration', duration);
    } else if (action.type == 'TODAY') {
        // e.preventDefault();
        let duration = state.get('duration');
        duration = [
            moment().startOf('isoWeek').format('DD/MM/YYYY'),
            moment().endOf('isoWeek').format('DD/MM/YYYY'),
        ]
        return state.set('duration', duration);
    } else if (action.type == 'CHOOSE_DATE') {
        let duration = [
            moment(action.data).startOf('isoWeek').format('DD/MM/YYYY'),
            moment(action.data).endOf('isoWeek').format('DD/MM/YYYY'),
        ]
        return state.set('duration', duration);
    }
    /*else if (action.type == 'CLOSE_MODAL') {
     console.log('1234');
     return state.set('isOpen', false)
     }*/

    /* switch (action.type) {
     case 'DELETE':

     case 'NEXT_RANGE':

     case 'PREV_RANGE':

     default:
     return state;
     }*/

    return state;
}

const MODAL_INITIAL = Map({
    id: 1,
    isOpen: false
});

export const modalReducer = (state=MODAL_INITIAL, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return state.merge(Map({id: action.id, isOpen: true}));
        // return state.set('isOpen', true);
        case 'CLOSE_MODAL':
            return state.set('isOpen', false);

        default:
            break;
    }
    return state;
};