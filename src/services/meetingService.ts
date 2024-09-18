import axios from 'axios';
import { Meeting, NewMeeting } from '../types/meetingTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMeetings = async (year: number, month: number): Promise<Meeting[]> => {
  try {
    const response = await axios.get(`${API_URL}/events`, {
      params: { year, month }
    });
    if (Array.isArray(response.data)) {
      return response.data.map((event: any) => ({
        id: event._id,
        title: event.title,
        date: new Date(event.date),
        link: event.link,
        user: event.user
      }));
    } else {
      throw new Error('Invalid response format: expected an array of events');
    }
  } catch (error) {
    console.error('Failed to fetch meetings:', error);
    throw error;
  }
};

export const addMeeting = async (newMeeting: NewMeeting): Promise<Meeting> => {
  try {
    const response = await axios.post(`${API_URL}/events`, newMeeting);
    return {
      id: response.data._id,
      title: response.data.title,
      date: new Date(response.data.date),
      link: response.data.link,
      user: response.data.user
    };
  } catch (error) {
    console.error('Failed to add meeting:', error);
    throw error;
  }
};
export const deleteMeeting = async (meetingId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/events/${meetingId}`);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw error;
  }
};