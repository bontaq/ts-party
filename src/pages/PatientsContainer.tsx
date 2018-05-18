import * as React from 'react';
import { connect } from 'react-redux';
import { State as GlobalState } from '../reducer';
import { Patient } from '../models';
import Table from '../components/Table';

type Props = {
  fetchPatients: () => null
  patients: Array<Patient>
  // weird quirk
  history: { push: (a: string) => void }
}

const patientEl = (patient: Patient) => (
  <li>{patient.name}</li>
)

class PatientsContainer extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.fetchPatients()
  }

  handleClick = (data: [string, string, string]) => {
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

const mapStateToProps = (state: GlobalState) => ({
  patients: state.patients
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchPatients: () => {
    dispatch({ type: 'FETCH_PATIENTS' })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientsContainer);
