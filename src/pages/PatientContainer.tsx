import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { PatientPage, Appointment } from '../models';
import { formatDate } from '../util';

const StyledApptTime = styled.p`
  font-size: 0.7em;
  margin-top: 0px;
`

const SmallNote = styled.span`
  color: grey;
  font-style: italic;
  margin-right: 8px;
`

const MessageP = styled.p`
  width: 80%;
`

const ApptEl: React.StatelessComponent<{ appt: Appointment }> = ({ appt }) => {
  const scheduledFor = formatDate(appt.datetime);
  const createdAt = formatDate(appt.created_at);
  return (
    <div key={`appt-${appt.id}`}>
      <MessageP>{appt.note}</MessageP>
      <StyledApptTime>
        <SmallNote>Scheduled Time</SmallNote>
        {scheduledFor ? scheduledFor : 'Unknown date format'}
      </StyledApptTime>
    </div>
  )
}

const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
`

const Column = styled.div`
  width: 48%;
`

const StyledPatientContainer = styled.div`
  margin: 40px;
`

const PatientEl: React.StatelessComponent<{ patient: PatientPage }> = ({ patient }) => (
  <StyledPatientContainer>
    <h2>{patient.name}</h2>
    <p>{patient.company}</p>
    <ColumnContainer>
      <Column>
        <h3>Appointments</h3>
        <ul>{patient.appointments.map(a => <ApptEl appt={a} />)}</ul>
      </Column>
      <Column>
        <h3>User Engagement</h3>
        <ul><div>Messages: {patient.userActions.length}</div></ul>
      </Column>
    </ColumnContainer>
  </StyledPatientContainer>
)

interface IPatientContainerProps {
  match: {
    params: {
      id: number
    }
  }
  patient: PatientPage | undefined
  fetchPatient: (id: number) => null
  clearPatient: () => null
}

class PatientContainer extends React.Component<IPatientContainerProps, any> {
  componentDidMount() {
    this.props.fetchPatient(this.props.match.params.id)
  }

  componentWillUnmount() {
    // necessary to avoid a flash of the last patient
    this.props.clearPatient()
  }

  render() {
    const patient = this.props.patient;
    const patientEl = patient
      ? (
        <PatientEl patient={patient} />
      ) : (
        <h3>Loading</h3>
      );

    return (
      <div>
        {patientEl}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    patient: state.patient
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPatient: (id: number) => {
      dispatch({ type: 'FETCH_PATIENT', id })
    },
    clearPatient: () => {
      dispatch({ type: 'CLEAR_PATIENT' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer);
