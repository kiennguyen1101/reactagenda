var React = require("react");
var ReactRedux = require('react-redux');
const Modal = require('react-modal');
var log = require('loglevel');
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import {reduxForm} from 'redux-form';
import {openModal, closeModal} from './actions';
import {modalReducer} from './reducers';

const mapStateToProps = state => ({
    id: state.modalReducer.get('id'),
    isOpen: state.modalReducer.get('isOpen')
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openModal, closeModal
}, dispatch);

class EditForm extends React.Component {
    handleSubmit(data) {
        this.props.editEvent(data);
        this.props.closeModal();
        
    }
    handleModalCloseRequest(event) {
        this.props.closeModal()
    }
    render() {
        log.debug('editform', this.props);
        const {fields: {id, date, time, text}, handleSubmit} = this.props;
        return (
            <form id="editform" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleModalCloseRequest.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">Edit Event</h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="control-label" for="date">Date:</label>
                            <input type="text" className="form-control" id="date" name="date" required {...date} />
                        </div>
                        <div className="form-group">
                            <label className="control-label" for="time">Time:</label>
                            <input type="text" className="form-control" id="time" name="time" required {...time} />
                        </div>
                        <div className="form-group">
                            <label className="control-label" for="text">Text:</label>
                            <input type="text" className="form-control" id="text" name="text" required {...text}/>
                        </div>
                        <input type="hidden" name="id" {...id} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest.bind(this)}>Close</button>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </form>
        )
    }
}

EditForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'edit',                           // a unique name for this form
    fields: ['id', 'date', 'time', 'text'] // all the fields in your form
})(EditForm);

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isOpen: props.isOpen
        // }
    }
    componentDidUpdate () {
    }
    closeModal() {
        // this.props.isOpen = false;
        this.props.closeModal();
    }

    handleModalCloseRequest() {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        // this.props.isOpen = false;
        this.props.closeModal();
    }

    handleSaveClicked(e) {
        alert('Save button was clicked');
    }
    render() {
        let {id} = this.props;
        log.debug('EditModal', this.props);
        let event = this.props.events.find(function(obj) {
            return obj.id == id
        });
        if (event == null || typeof event != 'object') {
            event = {
                id: 0,
                date: moment(),
                time: '08:00',
                text: ''
            }
        }
        const fields = {
            id: id,
            date: event.date.format('DD/MM/YYYY'),
            time: event.time,
            text: event.text
        };

        return (
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.props.isOpen}
                // isOpen={this.props.isOpen}
                onRequestClose={this.handleModalCloseRequest.bind(this)}
            >
                <EditForm initialValues={fields} closeModal={this.props.closeModal} editEvent={this.props.editEvent} />
            </Modal>
        );
    }
}

EditModal = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(EditModal);
export default EditModal
// export {EditModal};