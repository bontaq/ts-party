import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../reducer';
import { Appointment } from '../models';
import { formatDate } from '../util';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { type } from 'os';


interface IAppointmentContainerProps {
  fetchAppointments: () => null
  appointments: Array<Appointment & { patient_name: string }>
}

type appointmentRow = [string, string, string]

interface IAppointmentContainerState {
  modalOpen: boolean
  selected?: Appointment & { patient_name: string }
}

class AppointmentsContainer extends React.Component<IAppointmentContainerProps, IAppointmentContainerState> {
  state: IAppointmentContainerState = {
    modalOpen: false,
  }

  componentDidMount() {
    this.props.fetchAppointments()
  }

  handleClick = (d: Array<any>) => {
    const selected = this.props.appointments.filter(a => {
      return a.id == d[0]
    })
    console.info('selected', selected);
    this.setState({
      modalOpen: true,
      selected: selected[0]
    });
    console.info(this.state);
  }

  render() {
    const appointments = this.props.appointments.map(
      ({ id, patient_name, datetime }) => [id, patient_name, formatDate(datetime)]
    )
    const modal = this.state.modalOpen
      ? <Modal
        handleClose={() => this.setState({
          modalOpen: false,
          selected: null
        })}
        header={this.state.selected.patient_name}>
        <p>Note: {this.state.selected.note}</p>
      </Modal>
      : null;
    return (
      <div>
        {modal}
        <Table
          columnNames={["Id", "Patient Name", "Appointment Time"]}
          data={appointments}
          onClick={(d) => this.handleClick(d)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    appointments: state.appointments
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAppointments: () => dispatch({ type: 'FETCH_APPOINTMENTS' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsContainer);
