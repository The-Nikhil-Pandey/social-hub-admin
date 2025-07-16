import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import EventModal from "../components/EventModal";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";
import { toast } from "../hooks/use-toast";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../api/events";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setEvents([]);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleRowClick = async (event: any) => {
    setLoading(true);
    try {
      const data = await getEventById(event.id);
      setSelectedEvent(data);
      setIsViewMode(true);
      setIsModalOpen(true);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch event details",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleEdit = async (event: any) => {
    setLoading(true);
    try {
      const data = await getEventById(event.id);
      setSelectedEvent(data);
      setIsViewMode(false);
      setIsModalOpen(true);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch event details",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleAdd = () => {
    setSelectedEvent(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = (event: any) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteEvent = async () => {
    if (!eventToDelete) return;
    setLoading(true);
    try {
      await deleteEvent(eventToDelete.id);
      toast({
        title: "Event deleted",
        description: `Event '${eventToDelete.title}' deleted successfully!`,
      });
      setEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
    setDeleteDialogOpen(false);
    setEventToDelete(null);
    setLoading(false);
  };

  const filteredEvents = events.filter((event) =>
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
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
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
                          src={(function fixUrl(url) {
                            if (!url) return "";
                            let fixed = url;
                            if (
                              fixed.startsWith("http://localhost") ||
                              fixed.startsWith("https://localhost")
                            ) {
                              fixed = fixed.replace(
                                "localhost",
                                "31.97.56.234"
                              );
                            }
                            if (!/^https?:\/\//.test(fixed)) {
                              fixed = `${import.meta.env.VITE_API_BASE_IMAGE_URL?.replace(
                                /\/api$/,
                                ""
                              )}${fixed.startsWith("/") ? "" : "/"}${fixed}`;
                            }
                            return fixed;
                          })(event.event_image)}
                          alt={event.title}
                        />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-400 max-w-xs truncate">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{event.date}</div>
                      <div className="text-sm text-gray-400">{event.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">
                        {event.location}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRowClick(event)}
                          className="text-blue-400 hover:text-blue-300"
                          disabled={loading}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-orange-400 hover:text-orange-300"
                          disabled={loading}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(event)}
                          className="text-red-400 hover:text-red-300"
                          disabled={loading}
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
            onSave={async (eventData) => {
              setLoading(true);
              try {
                if (selectedEvent) {
                  await updateEvent(selectedEvent.id, eventData);
                  toast({
                    title: "Event updated",
                    description: "Event updated successfully!",
                  });
                } else {
                  await createEvent(eventData);
                  toast({
                    title: "Event created",
                    description: "Event created successfully!",
                  });
                }
                setIsModalOpen(false);
                fetchEvents();
              } catch (err) {
                toast({
                  title: "Error",
                  description: "Failed to save event",
                  variant: "destructive",
                });
              }
              setLoading(false);
            }}
          />
        )}
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Event</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete event{" "}
                <b>{eventToDelete?.title}</b>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={confirmDeleteEvent}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default Events;
