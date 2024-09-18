import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import InternalLayout from "../InternalLayout";

interface Meeting {
  id: string;
  _id?: string;
  title: string;
  date: Date;
  link?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [newMeeting, setNewMeeting] = useState({ title: '', link: '' });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchMeetings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/meetings', {
        params: {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1
        }
      });
      
      let meetingsData = response.data && response.data.meetings ? response.data.meetings : response.data;
      
      if (!Array.isArray(meetingsData)) {
        throw new Error('Invalid response format: expected an array of meetings');
      }
      
      const formattedMeetings = meetingsData.map(meeting => ({
        ...meeting,
        id: meeting._id || meeting.id,
        date: new Date(meeting.date)
      }));
      
      setMeetings(formattedMeetings);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      toast.error('Failed to fetch meetings. The calendar will be shown without meetings.');
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
      setNewMeeting({ title: '', link: '' });
      setIsPopupOpen(false);
      toast.success('Meeting added successfully');
    } catch (error) {
      console.error('Failed to add meeting:', error);
      toast.error('Failed to add meeting');
    }
  };

  const prevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayMeetings = meetings.filter(meeting => 
        new Date(meeting.date).toDateString() === date.toDateString()
      );
      days.push(
        <div 
          key={day} 
          className="border p-2 h-24 md:h-32 overflow-y-auto cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setSelectedDate(date);
            setIsPopupOpen(true);
          }}
        >
          <div className="font-bold">{day}</div>
          {dayMeetings.map(meeting => (
            <div key={meeting.id} className="text-xs md:text-sm bg-blue-100 p-1 mb-1 rounded truncate">
              {meeting.title}
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  return (
    <InternalLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Calendar</h1>
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
          <h2 className="text-xl">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={nextMonth} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="font-bold text-center">{day}</div>
              ))}
              {renderCalendarDays()}
            </div>
            {error && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
                Error: {error}. The calendar is shown without meetings.
              </div>
            )}
          </>
        )}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {selectedDate ? selectedDate.toDateString() : 'Select a date'}
              </h2>
              {selectedDate && (
                <>
                  <div className="mb-4">
                    <h3 className="font-bold mb-2">Meetings on this day:</h3>
                    {meetings.filter(meeting => 
                      new Date(meeting.date).toDateString() === selectedDate.toDateString()
                    ).map(meeting => (
                      <div key={meeting.id} className="bg-blue-100 p-2 mb-2 rounded">
                        <div>{meeting.title}</div>
                        {meeting.link && (
                          <a href={meeting.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Meeting Link
                          </a>
                        )}
                      </div>
                    ))}
                    {meetings.filter(meeting => 
                      new Date(meeting.date).toDateString() === selectedDate.toDateString()
                    ).length === 0 && (
                      <div className="text-gray-500">No meetings scheduled for this day.</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Add New Meeting</h3>
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
                  </div>
                </>
              )}
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                >
                  Close
                </button>
                <button 
                  onClick={addMeeting}
                  disabled={!selectedDate || !newMeeting.title}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Add Meeting
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InternalLayout>
  );
};

export default Calendar;