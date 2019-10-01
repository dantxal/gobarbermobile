import React, { useState } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { DatePickerIOS } from 'react-native';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput() {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date],
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)} />
      <DateText>{dateFormatted}</DateText>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}
