import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCreateTask } from '../../common';
import SaveButton from '../components/saveButton';
import ExitButton from '../components/exitButton';
import Dropdown from '../components/dropdown';
import InputField from '../components/inputField';
import getCurrentWeekday from './getCurrentWeekday';
import { AppHeader } from '../header';
import { Size } from './sizeEnum';

interface InputFieldsState {
  taskName: string;
  requiredPersonnel: string;
  rhythm: string;
  weekday: string;
  description: string;
}

const CreateNewTaskView = () => {
  const initialInputFieldsState: InputFieldsState = {
    taskName: '',
    requiredPersonnel: '1',
    rhythm: '* * * * *',
    weekday: getCurrentWeekday(),
    description: ''
  };
  const [inputFields, setInputFields] = useState<InputFieldsState>(initialInputFieldsState);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const createTask = useCreateTask();

  const handleSubmit = () => {
    const taskData = {
      name: inputFields.taskName,
      description: inputFields.description,
      required_personnel: parseInt(inputFields.requiredPersonnel),
      rhythm: inputFields.rhythm,
      weekday: parseInt(inputFields.weekday)
    };

    createTask(taskData)
      .then(_ => {
        setSubmitMessage('Ämtli wurde hinzugefügt. ');
        setInputFields(initialInputFieldsState);
      })
      .catch(error => {
        console.error('Error adding task:', error);
        setSubmitMessage('Fehler beim Hinzufügen des Ämtlis. ');
      });
  };

  useEffect(() => {
    const { taskName, requiredPersonnel, weekday, rhythm } = inputFields;
    const isComplete = taskName.trim() !== '' && requiredPersonnel.trim() !== '' &&
      weekday.trim() !== '' && rhythm.trim() !== '';

    setIsFormComplete(isComplete);
  }, [inputFields]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));
  };

  return (
    <div className="bg-theme-50 h-screen">
      <AppHeader />
      <div className="flex">
        <div className="container mx-auto">
          <div className="mx-64">
            <div className="bg-center bg-clip-border p-6 bg-theme-300 rounded-[2.2rem] h-96 relative">
              <div className="absolute top-2 right-8">
                <ExitButton />
              </div>
              <div className="grid grid-cols-4 gap-4 my-6 mx-24">
                <InputField
                  type="text"
                  label="Name des Ämtlis"
                  placeholder="Name hinzufügen..."
                  size={Size.OneLine}
                  onChange={handleInputChange}
                  value={inputFields.taskName}
                  name="taskName" />
                <Dropdown
                  label="Rhythmus"
                  id="rhythm"
                  name="rhythm"
                  options={[
                    { value: '* * * * *', label: 'jeden Tag' },
                    { value: '* * * * 3', label: 'jede Woche' },
                    { value: '* * * * 5', label: 'alle 2 Wochen' }
                  ]}
                  onChange={handleInputChange}
                  value={inputFields.rhythm} />
                <Dropdown
                  label="Anzahl Personen"
                  id="requiredPersonnel"
                  name="requiredPersonnel"
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' }
                  ]}
                  onChange={handleInputChange}
                  value={inputFields.requiredPersonnel} />
                <Dropdown
                  label="Wochentag"
                  id="weekday"
                  name="weekday"
                  options={[
                    { value: '1', label: 'Montag' },
                    { value: '2', label: 'Dienstag' },
                    { value: '3', label: 'Mittwoch' },
                    { value: '4', label: 'Donnerstag' },
                    { value: '5', label: 'Freitag' }
                  ]}
                  onChange={handleInputChange}
                  value={inputFields.weekday} />
              </div>
              <div className="grid grid-cols-2 gap-4 my-6 mx-24 pr-4">
                <InputField
                  type="textarea"
                  label="Beschreibung"
                  placeholder="Beschreibung hinzufügen..."
                  size={Size.MultipleLines}
                  onChange={handleInputChange}
                  value={inputFields.description}
                  name="description" />
                {isFormComplete && <SaveButton onClick={handleSubmit} />}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 place-content-center">
            {submitMessage && (
              <div className="mt-24 mx-96 font-secondary text-stone-400 text-center">
                {submitMessage}
                <button className="text-theme-300 font-bold">
                  Rückgängig machen.
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTaskView;
