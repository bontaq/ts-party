import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../reducer';
import { Appointment } from '../models';
import { formatDate } from '../util';
import Table from '../components/Table';


interface IAppointmentContainerProps {
  fetchAppointments: () => null
  appointments: Array<Appointment & { patient_name: string }>
}

class AppointmentsContainer extends React.Component<IAppointmentContainerProps, {}> {
  componentDidMount() {
    this.props.fetchAppointments()
  }

  render() {
    const appointments = this.props.appointments.map(
      ({ id, patient_name, datetime }) => [id, patient_name, formatDate(datetime)]
    )
    return (
      <div>
        <Table
          columnNames={["Id", "Patient Name", "Appointment Time"]}
          data={appointments}
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
