import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosResponse } from 'axios';
import { userArrayMock, schoolDaysMock, absenceArrayMock } from '../app/absence/mockData';

export interface SchoolDays {
  school_days: {
    is_mon_available: boolean;
    is_tue_available: boolean;
    is_wed_available: boolean;
    is_thu_available: boolean;
    is_fri_available: boolean;
  };
  exemptions: Date[];
}

export interface TaskData {
  name: string;
  description: string;
  required_personnel: number;
  rhythm: string;
  weekday: number;
}

export interface User {
  user_id: number;
  email: string;
}

export function useUser () {
  const { user,  isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    // @TODO: Fetch and cache user profile
  }, [user, isAuthenticated]);

  return {
    profile: user,
    logout
    // @TODO: add additional user properties
  };
}

// Hook for create a new task
export function useCreateTask () {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const apiUrl = 'http://192.168.1.200:8081/task';

  const createTask = (taskData: TaskData): Promise<AxiosResponse> => {
    if (!isAuthenticated) {
      return Promise.reject('User not authenticated');
    }

    return getAccessTokenSilently()
      .then(accessToken => {
        return axios.post<TaskData>(apiUrl, taskData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .catch(error => {
        console.error('Error creating task:', error.response?.data || 'An error occurred');
        return Promise.reject(error);
      });
  };

  return createTask;
}

export function useUsers () {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(userArrayMock);
    // axios.get('api/user')
    //   .then(({ data }: AxiosResponse<User[]>)  => {
    //     setUsers(data);
    //   })
    //   .catch(error => {
    //     console.error('Error retrieving user email suggestions:', error);
    //   });
  }, []);

  return users;
}


export function useSchoolDays (userId: number | undefined) {
  const [schoolDays, setSchoolDays] = useState<SchoolDays>();

  useEffect(() => {
    if (userId !== undefined) {
      setSchoolDays(schoolDaysMock[userId]);

      // axios.get(`api/school-day/${userId}`)
      //   .then(({ data }: AxiosResponse<SchoolDays>) => {
      //     setSchoolDays(data);
      //   })
      //   .catch(error => {
      //     console.error('Error retrieving school day data:', error);
      //   });
    }
  }, [userId]);

  return schoolDays;
}

export function useSaveUserAbsences () {
  const handleSaveChanges = (selectedPerson: number, selectedDates: Date[]) => {
    return new Promise<void>(resolve => resolve())
    // return axios.put('api/user-absences', { user_id: selectedPerson, absences: selectedDates });
  };

  return { handleSaveChanges };
}

export function useAbsences (userId: number | undefined) {
  const [absences, setAbsences] = useState<Date[]>([]);

  useEffect(() => {
    if (userId !== undefined) {
      setAbsences(absenceArrayMock);
      // axios.get(`api/absence/${userId}`)
      //   .then(({ data }: AxiosResponse<Date[]>) => {
      //     setAbsences(data);
      //   })
      //   .catch(error => {
      //     console.error('Error receiving absences', error);
      //   });
    }
  }, [userId]);

  return absences;
}
