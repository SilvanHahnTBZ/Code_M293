import React, { useState, useEffect, useCallback } from 'react';
import { DayPicker } from 'react-day-picker';
import { de } from 'date-fns/locale';
import ExitButton from '../components/exitButton';
import SaveButton from '../components/saveButton';
import UserSearch from '../components/userSearch';
import { useUsers, useSchoolDays, useSaveUserAbsences, useAbsences, User } from '../../common';
import 'react-day-picker/dist/style.css';

export default function Absence () {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { handleSaveChanges } = useSaveUserAbsences();
  const users = useUsers();
  const schoolDays = useSchoolDays(selectedUser?.user_id);
  const absences = useAbsences(selectedUser?.user_id);

  const getIsAbsence = useCallback((date: Date) => {
    const isSameDay = (date1: Date, date2: Date) => {
      const dateWithoutTime1 = new Date(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
      );
      const dateWithoutTime2 = new Date(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate()
      );
      return dateWithoutTime1.getTime() === dateWithoutTime2.getTime();
    };

    if (absences.some(value => isSameDay(value, date))) {
      return true;
    }

    if (!schoolDays) {
      return false;
    }

    const dayIndex = date.getDay();
    const isExemptionDay = schoolDays.exemptions.some(exemption =>
      isSameDay(exemption, date));
    if (isExemptionDay || dayIndex < 1 || 5 < dayIndex) {
      return false;
    } else {
      type DayLabel = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
      const daysOfWeek: DayLabel[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
      const currentDayString = daysOfWeek[dayIndex - 1];
      return !schoolDays.school_days[`is_${currentDayString}_available`];
    }
  },  [absences, schoolDays]);

  useEffect(() => {
    const tempSelectedDates: Date[] = [];
    for (let i = 0; i < 3; i++) {
      const nextMonth = new Date(selectedMonth);
      nextMonth.setMonth(nextMonth.getMonth() + i);

      const daysInMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
        if (getIsAbsence(date)){
          tempSelectedDates.push(date);
        }
      }
    }
    setSelectedDates(tempSelectedDates);
  }, [selectedMonth, getIsAbsence])

  const handleDayClick = (selected: Date[] | undefined) => {
    if (selected) {
      setSelectedDates([...selected]);
      setUnsavedChanges(true);
    }
  };

  const handlePersonSelect = (user: User | undefined) => {
    setSelectedUser(user);
    setUnsavedChanges(false);
  };

  const handleSaveButtonClick = () => {
    if (selectedUser !== undefined) {
      handleSaveChanges(selectedUser.user_id, selectedDates)
        .then(() => {
          setUnsavedChanges(false);
          setSubmitMessage('Änderungen erfolgreich gespeichert!');
          setTimeout(() => {
            setSubmitMessage('');
          }, 5000);
        })
        .catch(error => {
          console.error('Error saving data to the backend:', error);
          setSubmitMessage('Fehler beim Speichern. Änderungen wurden nicht gespeichert.');
          setTimeout(() => {
            setSubmitMessage('');
          }, 5000);
        });
    }
  };
  
  const selectedDatesModifier = {
    backgroundColor: '#38533D',
    borderRadius: '50%'
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="relative p-12 text-white rounded-3xl bg-theme-300">
        <div className="mb-4 text-2xl font-bold">Abwesenheit hinzufügen für...</div>
        <div className="absolute top-6 right-6">
          <ExitButton />
        </div>
        <UserSearch
          options={users}
          onSelect={handlePersonSelect}
        />
        <DayPicker
          mode="multiple"
          selected={selectedDates}
          onSelect={handleDayClick}
          onMonthChange={setSelectedMonth}
          numberOfMonths={3}
          disableNavigation={unsavedChanges}
          locale={de}
          modifiersStyles={{ selected: selectedDatesModifier }}
          className="inline-block"
          style={{ position: 'static' }}
        />
        {unsavedChanges && (
          <SaveButton onClick={handleSaveButtonClick} />
        )}
        {submitMessage && (
          <div className="fixed w-full text-center transform -translate-x-1/2 bottom-4 left-1/2">
            <div className="mx-auto my-4 font-secondary text-stone-400">
              {submitMessage}{' '}
              <button className="bg-transparent" style={{ color: '#38533d' }}>Rückgängig machen</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
