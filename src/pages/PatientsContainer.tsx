import * as React from 'react';
import { connect } from 'react-redux';
import { Patient } from '../models';
import Table from '../components/Table';

interface IPatientsContainerProps {
  fetchPatients: () => null
  patients: Array<Patient>
  // weird quirk
  history: { push: (a: string) => void }
}

const patientEl = (patient: Patient) => (
  <li>{patient.name}</li>
)

class PatientsContainer extends React.Component<IPatientsContainerProps, any> {
  componentDidMount() {
    console.info('hey?')
    this.props.fetchPatients()
  }

  handleClick = (data: any) => {
    this.props.history.push(`/patient/${data[0]}`)
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
          onClick={(data) => this.handleClick(data)}
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
