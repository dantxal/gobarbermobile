import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import api from '~/services/api';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments');

    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) loadAppointments();
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`appointments/${id}`);

      setAppointments(
        appointments.filter(appointment => appointment.id !== id),
      );
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
