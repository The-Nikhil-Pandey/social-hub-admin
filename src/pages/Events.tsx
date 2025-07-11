
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import EventModal from '../components/EventModal';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // API HERE: Fetch Events
  const dummyEvents = [
    {
      id: "e1",
      title: "Wellness Workshop",
      description: "A 2-day workshop on mental health for caregivers. Join us for interactive sessions, expert talks, and networking opportunities.",
      date: "2025-07-15",
      time: "10:00 AM",
      location: "Delhi Community Hall",
      location_url: "https://goo.gl/maps/xyz",
      event_link: "https://events.cusp.com/wellness",
      event_tags: ["Mental Health"],
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop"
    },
    {
      id: "e2",
      title: "Childcare Training Program",
      description: "Comprehensive training program for childcare workers focusing on modern techniques and child psychology.",
      date: "2025-08-20",
      time: "09:00 AM",
      location: "Mumbai Training Center",
      location_url: "https://goo.gl/maps/abc",
      event_link: "https://events.cusp.com/childcare",
      event_tags: ["Childcare", "Training"],
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop"
    }
  ];

  const handleRowClick = (event: any) => {
    setSelectedEvent(event);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedEvent(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = (eventId: string) => {
    // API HERE: Delete Event
    console.log('Delete event:', eventId);
  };

  const filteredEvents = dummyEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <button
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover mr-4"
                          src={event.image}
                          alt={event.title}
                        />
                        <div>
                          <div className="text-sm font-medium text-white">{event.title}</div>
                          <div className="text-sm text-gray-400 max-w-xs truncate">{event.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{event.date}</div>
                      <div className="text-sm text-gray-400">{event.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{event.location}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRowClick(event)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <EventModal
            event={selectedEvent}
            isOpen={isModalOpen}
            isViewMode={isViewMode}
            onClose={() => setIsModalOpen(false)}
            onSave={(eventData) => {
              // API HERE: Save/Update Event
              console.log('Save event:', eventData);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Events;
