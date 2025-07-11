
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import CourseModal from '../components/CourseModal';
import { Plus, Search, Edit, Trash2, Eye, BookOpen } from 'lucide-react';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // API HERE: Fetch Courses
  const dummyCourses = [
    {
      id: "c1",
      title: "Basics of Social Work",
      description: "Introduction to fundamental principles of social work including ethics, communication, and intervention strategies.",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      lessons: [
        {
          id: "l1",
          title: "Lesson 1: Ethics in Social Work",
          topics: [
            {
              id: "t1",
              title: "Introduction to Ethics",
              ppt_file: "ethics_intro.ppt"
            },
            {
              id: "t2", 
              title: "Professional Boundaries",
              ppt_file: "professional_boundaries.ppt"
            }
          ]
        },
        {
          id: "l2",
          title: "Lesson 2: Communication Skills",
          topics: [
            {
              id: "t3",
              title: "Active Listening",
              ppt_file: "active_listening.ppt"
            }
          ]
        }
      ]
    },
    {
      id: "c2",
      title: "Mental Health First Aid",
      description: "Comprehensive training on providing initial mental health support and recognizing mental health crises.",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      lessons: [
        {
          id: "l3",
          title: "Lesson 1: Understanding Mental Health",
          topics: [
            {
              id: "t4",
              title: "Mental Health Basics",
              ppt_file: "mental_health_basics.ppt"
            }
          ]
        }
      ]
    }
  ];

  const handleRowClick = (course: any) => {
    setSelectedCourse(course);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleEdit = (course: any) => {
    setSelectedCourse(course);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = (courseId: string) => {
    // API HERE: Delete Course
    console.log('Delete course:', courseId);
  };

  const filteredCourses = dummyCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Courses</h1>
          <button
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Course
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lessons</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover mr-4"
                          src={course.thumbnail}
                          alt={course.title}
                        />
                        <div className="text-sm font-medium text-white">{course.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white max-w-md truncate block">{course.description}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-300">
                        <BookOpen size={16} className="mr-1" />
                        <span className="text-sm">{course.lessons.length} lessons</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRowClick(course)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
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
          <CourseModal
            course={selectedCourse}
            isOpen={isModalOpen}
            isViewMode={isViewMode}
            onClose={() => setIsModalOpen(false)}
            onSave={(courseData) => {
              // API HERE: Save/Update Course
              console.log('Save course:', courseData);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Courses;
