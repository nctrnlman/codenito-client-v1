import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import InternalLayout from "../InternalLayout";

interface Meeting {
  id: string;
  title: string;
  date: Date;
  link?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [newMeeting, setNewMeeting] = useState({ title: '', date: new Date(), link: '' });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/meetings', {
        params: {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1 // Note: JavaScript months are 0-indexed, but we'll assume the API expects 1-indexed months
        }
      });
      console.log('Full server response:', response);
      
      let meetingsData = response.data;
      
      // Check if the data is nested under a 'meetings' property
      if (response.data && response.data.meetings) {
        meetingsData = response.data.meetings;
      }
      
      // Ensure meetingsData is an array
      if (!Array.isArray(meetingsData)) {
        throw new Error('Invalid response format: expected an array of meetings');
      }
      
      // Map the meetings data, ensuring each meeting has a valid date
      const formattedMeetings = meetingsData.map(meeting => ({
        ...meeting,
        date: new Date(meeting.date),
        id: meeting._id || meeting.id // Ensure we have an id property
      }));
      
      setMeetings(formattedMeetings);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      toast.error('Failed to fetch meetings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const addMeeting = async () => {
    if (!selectedDate) return;
    try {
      const response = await axios.post('/api/meetings', {
        title: newMeeting.title,
        date: selectedDate.toISOString(),
        link: newMeeting.link
      });
      setMeetings(prevMeetings => [...prevMeetings, {
        ...response.data,
        date: new Date(response.data.date)
      }]);
      setNewMeeting({ title: '', date: new Date(), link: '' });
      setSelectedDate(null);
      toast.success('Meeting added successfully');
    } catch (error) {
      console.error('Failed to add meeting:', error);
      toast.error('Failed to add meeting');
    }
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayMeetings = meetings.filter(meeting => 
        new Date(meeting.date).toDateString() === date.toDateString()
      );
      days.push(
        <div 
          key={day} 
          className="border p-2 h-24 overflow-y-auto cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedDate(date)}
        >
          <div className="font-bold">{day}</div>
          {dayMeetings.map(meeting => (
            <div key={meeting._id} className="text-sm bg-blue-100 p-1 mb-1 rounded">
             {meeting.title}
            </div>
            ))}
        </div>
      );
    }
    return days;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <InternalLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Calendar</h1>
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="bg-blue-500 text-white px-4 py-2 rounded">
            Previous
          </button>
          <h2 className="text-xl">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={nextMonth} className="bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-bold text-center">{day}</div>
          ))}
          {renderCalendarDays()}
        </div>
        {selectedDate && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Add Meeting for {selectedDate.toDateString()}</h3>
            <input
              type="text"
              placeholder="Meeting Title"
              className="w-full p-2 mb-2 border rounded"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
            />
            <input
              type="text"
              placeholder="Meeting Link (optional)"
              className="w-full p-2 mb-2 border rounded"
              value={newMeeting.link}
              onChange={(e) => setNewMeeting({...newMeeting, link: e.target.value})}
            />
            <button 
              onClick={addMeeting}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Meeting
            </button>
          </div>
        )}
      </div>
    </InternalLayout>
  );
};

export default Calendar;