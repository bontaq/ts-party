import * as React from 'react';
import { connect } from 'react-redux';
import { Patient } from './models';
import Table from './components/Table';

interface IPatientsContainerProps {
  fetchPatients: () => null
  patients: Array<Patient>
}

const patientEl = (patient: Patient) => (
  <li>{patient.name}</li>
)

class PatientsContainer extends React.Component<IPatientsContainerProps, any> {
  componentDidMount() {
    this.props.fetchPatients()
  }

  render() {
    const patients = this.props.patients.map(
      ({ name, company, id }) => [id, name, company]
    )
    return (
      <div>
        <Table
          columnNames={["Id", "Name", "Company"]}
          data={patients}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    patients: state.patients
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPatients: () => {
      dispatch({ type: 'FETCH_PATIENTS' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsContainer);
