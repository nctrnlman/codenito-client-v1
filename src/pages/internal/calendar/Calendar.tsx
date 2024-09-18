import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import InternalLayout from "../InternalLayout";
import {
  fetchMeetings,
  addMeeting,
  deleteMeeting,
} from "../../../services/meetingService";
import { Meeting, NewMeeting } from "../../../types/meetingTypes";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [newMeeting, setNewMeeting] = useState<NewMeeting>({
    title: "",
    date: "",
    link: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchMeetingsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const meetingsData = await fetchMeetings(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1
      );
      setMeetings(meetingsData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      toast.error(
        "Failed to fetch meetings. The calendar will be shown without meetings."
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchMeetingsData();
  }, [fetchMeetingsData]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const offset = -date.getTimezoneOffset();
    const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(
      2,
      "0"
    );
    const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, "0");
    const offsetSign = offset >= 0 ? "+" : "-";
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000${offsetSign}${offsetHours}:${offsetMinutes}`;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleDeleteMeeting = async (meetingId: string) => {
    try {
      await deleteMeeting(meetingId);
      setMeetings((prevMeetings) =>
        prevMeetings.filter((meeting) => meeting.id !== meetingId)
      );
      toast.success("Meeting deleted successfully");
    } catch (error) {
      console.error("Failed to delete meeting:", error);
      toast.error("Failed to delete meeting");
    }
  };

  const handleAddMeeting = async () => {
    if (!selectedDate) return;
    try {
      const newMeetingData: NewMeeting = {
        title: newMeeting.title,
        date: formatDate(selectedDate),
        link: newMeeting.link,
      };
      const addedMeeting = await addMeeting(newMeetingData);
      setMeetings((prevMeetings) => [...prevMeetings, addedMeeting]);
      setNewMeeting({ title: "", date: "", link: "" });
      setIsPopupOpen(false);
      toast.success("Meeting added successfully");
      fetchMeetingsData();
    } catch (error) {
      console.error("Failed to add meeting:", error);
      toast.error("Failed to add meeting");
    }
  };

  const prevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayMeetings = meetings.filter((meeting) =>
        isSameDay(new Date(meeting.date), date)
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
          {dayMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="text-xs md:text-sm bg-blue-100 p-1 mb-1 rounded truncate"
            >
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
          <button
            onClick={prevMonth}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
          <h2 className="text-xl">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={nextMonth}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="font-bold text-center">
                  {day}
                </div>
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
                {selectedDate ? selectedDate.toDateString() : "Select a date"}
              </h2>
              {selectedDate && (
                <>
                  <div className="mb-4">
                    <h3 className="font-bold mb-2">Meetings on this day:</h3>
                    {meetings
                      .filter((meeting) =>
                        isSameDay(new Date(meeting.date), selectedDate)
                      )
                      .map((meeting) => (
                        <div
                          key={meeting.id}
                          className="bg-blue-100 p-2 mb-2 rounded flex justify-between items-center"
                        >
                          <div>
                            <div>{meeting.title}</div>
                            {meeting.link && (
                              <a
                                href={meeting.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Meeting Link
                              </a>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteMeeting(meeting.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    {meetings.filter((meeting) =>
                      isSameDay(new Date(meeting.date), selectedDate)
                    ).length === 0 && (
                      <div className="text-gray-500">
                        No meetings scheduled for this day.
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Add New Meeting</h3>
                    <input
                      type="text"
                      placeholder="Meeting Title"
                      className="w-full p-2 mb-2 border rounded"
                      value={newMeeting.title}
                      onChange={(e) =>
                        setNewMeeting({ ...newMeeting, title: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Meeting Link (optional)"
                      className="w-full p-2 mb-2 border rounded"
                      value={newMeeting.link}
                      onChange={(e) =>
                        setNewMeeting({ ...newMeeting, link: e.target.value })
                      }
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
                  onClick={handleAddMeeting}
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
