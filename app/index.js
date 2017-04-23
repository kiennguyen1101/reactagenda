const React = require("react");
const ReactDOM = require('react-dom');
const ReactRedux = require('react-redux');
const Redux = require('redux');
const DatePicker = require('react-datepicker');
const log = require('loglevel');
import moment from 'moment';
import  'jquery';
import 'bootstrap';
import { reducer as formReducer } from 'redux-form';
import {List, Map} from 'immutable';
import EditModal  from './EditModal';
import * as actions from './actions';
import {scheduleReducer, modalReducer} from './reducers';
log.setDefaultLevel('info');

let mapStateToProps = state => ({
    scheduler: state.scheduleReducer,
    modal: state.modalReducer
    // duration: state.scheduleReducer.get('duration'),
    // events: state.scheduleReducer.get('events'),
    // isOpen: state.modalReducer.get('isOpen'),
})

const mapDispatchToProps = dispatch => Redux.bindActionCreators({
    delete_event: actions.delete_event,
    edit_event: actions.edit_event,
    prev_range: actions.prev_range,
    next_range: actions.next_range,
    today: actions.today,
    openModal: actions.openModal,
    choose_date: actions.choose_date
}, dispatch);

class DateToday extends React.Component {
    today(e) {
        this.props.today();
    }
    render() {
        return (
            <li className="header-a today">
                <a onClick={this.props.today} role="button" href="#today" className="k-link">Today</a>
            </li>
        )
    }
}

class DateSelectPrev extends React.Component {
    render() {
        return (<li className="header-a prev">
            <a onClick={e => this.props.prev_range(e)} role="button" href="#" className="k-link"><span className="k-icon k-i-arrow-w"></span></a>
        </li> )
    }
}

class DateSelectNext extends React.Component {
    constructor(props) {
        super(props);
    }
//    handleClick(e) {
//        e.preventDefault();
//        this.props.dispatch(nextRange());
//    }
    render() {
        return (<li className="header-a next">
            <a onClick={e => this.props.next_range(e)} role="button" href="#" className="k-link"><span className="k-icon k-i-arrow-e"></span></a>
        </li> )
    }
}

class DateRange extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange(date) {
	    // log.info(date.format('DD/MM/YYYY'));
        this.props.choose_date(date);
    }
    openDatePicker() {
        $('#datepicker').click();
    }
    render() {
        let startDate = this.props.duration[0];
        let endDate = this.props.duration[1];
        return (
            <li className="header-a current">
                <span onClick={this.openDatePicker.bind(this)} className="k-icon k-i-calendar"> </span>
                <DatePicker id="datepicker" className="hidden" selected={moment(startDate, 'DD/MM/YYYY')} onChange={this.handleChange.bind(this)} />
                {/*<span className="k-sm-date-format">4/25/2016 - 5/2/2016</span>*/}
                <span class="k-lg-date-format">{startDate} - {endDate}</span>
            </li>
        )
    }
}

class DateRangeSelect extends React.Component {
    render() {
        return (
            <ul id="schedule-views">
                <li className="k-state-default k-view-week">< a role="button" href="#weekview"
                                                                className="k-link">Week</a></li>
                <li className="k-state-default k-view-month">< a role="button" href="#monthview"
                                                                 className="k-link">Month</a></li>
            </ul>
        )
    }
}

class ScheduleToolBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        log.debug('scheduletoolbar', this.props);
        return (
            <div id="schedule-toolbar">
                <ul id="schedule-navigation">
                    <DateToday today={this.props.today}/>
                    <DateSelectPrev prev_range={this.props.prev_range}/>
                    <DateSelectNext next_range={this.props.next_range}/>
                    <DateRange duration={this.props.duration} choose_date={this.props.choose_date} />
                </ul>
                <DateRangeSelect />
            </div>
        )
    }
}

class EventTableRow extends React.Component {
    componentDidMount() {
        // Injected by react-redux:
//    let { dispatch } = this.props

        // Note: this won’t work:
        // TodoActionCreators.addTodo('Use Redux')

        // You’re just calling a function that creates an action.
        // You must dispatch the action, too!

        // This will work:
//    console.log(dispatch);
    }
    delete_event(e, id) {
        e.preventDefault();
        this.props.delete_event(id);
    }
    edit_event(e, id) {
        e.preventDefault();
        this.props.openModal(id)
    }

    render() {
        let events = this.props.events;
        let edit_event = this.props.edit_event;
        let date = this.props.date;
        let timestd = events.map(event => {
            return (<div key={event.date.format('DD/MM/YYYY HH:mm')}>< p > {event.date.format('HH:mm')} </p></div >)
        })

        let eventstd = events.map(event => {
            return (
                <div className="k-task" title={event.text} key={event.id}>
                    <p>
                        <span className="k-scheduler-mark"></span>
                        {event.text}
                        <a onClick={(e) => this.delete_event(e, event.id)} href="#" className="k-link k-event">
                            <span data-toggle="tooltip" data-placement="top" title="Delete" className="k-icon k-si-close"></span>
                        </a>
                        <a onClick={(e) => this.edit_event(e, event.id)} href="#" className="k-link k-event">
                            <span data-toggle="tooltip" data-placement="top" title="Edit" className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </a>
                    </p>

                </div>
            )
        })

        return (
            <tr>
                <td className="k-scheduler-datecolumn k-first" rowspan="1">
                    <strong className="k-scheduler-agendaday"> {date.date()} </strong>
                    <em className="k-scheduler-agendaweek"> {date.format('dddd')} </em>
                    <span className="k-scheduler-agendadate"> {date.format('MMMM, YYYY')} </span>
                </td>
                <td className="k-scheduler-timecolumn">
                    {timestd}
                </td>
                <td>
                    {eventstd}
                </td>
            </tr>
        )
    }
}

class EventTable extends React.Component {
    constructor(props) {
        super(props);
    }

    getDaysInRange() {
        let dates = [];
        let scheduler = this.props.scheduler;
        let startDate = moment(scheduler.get('duration')[0], 'DD/MM/YYYY');
        let endDate = moment(scheduler.get('duration')[1], 'DD/MM/YYYY');
        var currDate = startDate.clone().startOf('day');
        var lastDate = endDate.clone().startOf('day');
        dates.push(currDate.clone());
        while (currDate.add(1, 'days').diff(lastDate) <= 0) {
            dates.push(currDate.clone());
        }
        return dates;
    }

    getEvents() {
        return this.props.scheduler.get('events');
    }

    getEventsInDate(date) {
        let events = this.getEvents();
        let foundEvent = [];
        events.forEach(obj => {
//            console.log(obj.date.format('DD/MM/YYYY'));
            if (obj.date.isSame(date, 'day')
            )
                foundEvent.push(obj);
        })

        return foundEvent;
    }

    render() {
        log.debug('EventTable: ', this.props)
        let rows = [];
        this.getDaysInRange().forEach(date => {
            let events = this.getEventsInDate(date);
            rows.push(<EventTableRow date={date} events={events} key={date} delete_event={this.props.delete_event} openModal={this.props.openModal} today={this.props.today}  />);
        })
        ;
        return (
            <table id="schedule-agenda">
                <thead>
                <tr className="schedule-header">
                    <th colspan="1" className="k-scheduler-datecolumn">Date</th>
                    <th colspan="1" className="k-scheduler-timecolumn">Time</th>
                    <th colspan="1" className="">Event</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }
}

class Scheduler extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }
    render() {
        log.debug('Scheduler', this.props);
        let duration = this.props.scheduler.get('duration');
        let convertedEvents = this.props.scheduler.get('events').map(event => {
            if (
                !moment.isMoment(event.date)
            )
                event.date = moment(event.date + ' ' + event.time, 'DD/MM/YYYY HH:mm');
            return event;
        })

//        events.map(event => {
//            return (
//              <div key={event.date.format('DD/MM/YYYY HH:mm')}><p>{event.date.format('HH:mm')}</p></div>
//            )
//        })
        return (
            <div id="schedule">
                <ScheduleToolBar duration={duration} today={this.props.today} next_range={this.props.next_range}
                                 prev_range={this.props.prev_range} choose_date={this.props.choose_date}/>
                <EventTable {...this.props} />
                <EditModal isOpen={this.props.modal.isOpen} id={this.props.modal.id} events={convertedEvents} editEvent={this.props.edit_event} />
            </div>
        )
    }
}

const reducer = Redux.combineReducers(Object.assign({}, {
        scheduleReducer,
        modalReducer,
    }, /*{
     routing: routeReducer
     }, */{
        form: formReducer
    })
)

const store = Redux.createStore(reducer);

const ConnectedRootComponent = ReactRedux.connect(
    mapStateToProps, mapDispatchToProps
)(Scheduler)

var appElement = document.getElementById('example');

// Modal.setAppElement(appElement);

// ReactDOM.render(<EditModal isOpen={false}/>, appElement);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <ConnectedRootComponent />
    </ReactRedux.Provider>,
    document.getElementById('main')
);