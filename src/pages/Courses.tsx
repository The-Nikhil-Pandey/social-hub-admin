import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/AdminLayout";
import CourseModal from "@/components/CourseModal";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/api/course";
// Update the path below to the correct location of your lessons API file
import {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from "@/api/lessons";
import { getTopics, createTopic, updateTopic, deleteTopic } from "@/api/topics";
import { getToken } from "@/api/token";

const Courses = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [confirmMessage, setConfirmMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [topics, setTopics] = useState([]);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [viewLesson, setViewLesson] = useState(null);
  const [topicModalOpen, setTopicModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [viewTopic, setViewTopic] = useState(null);

  // Fetch all courses, lessons, topics
  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const coursesRes = await getCourses(token);
      setCourses(coursesRes.data);
      const lessonsRes = await getLessons(token);
      setLessons(lessonsRes.data);
      const topicsRes = await getTopics(token);
      setTopics(topicsRes.data);
    } catch (err) {
      setCourses([]);
      setLessons([]);
      setTopics([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Course CRUD
  const handleAddCourse = () => {
    setEditingCourse(null);
    setModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setModalOpen(true);
  };

  const handleViewCourse = (course) => {
    setViewCourse(course);
  };

  const handleDeleteCourse = async (id) => {
    setConfirmMessage("Are you sure you want to delete this course?");
    setConfirmAction(() => async () => {
      setLoading(true);
      try {
        const token = getToken();
        await deleteCourse(id, token);
        fetchAll();
      } catch (err) {}
      setLoading(false);
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleSaveCourse = async (data) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("name", data.title || data.name);
    formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);
    try {
      let courseId;
      if (editingCourse) {
        const res = await updateCourse(editingCourse.id, formData, token);
        courseId = editingCourse.id;
        toast({ title: "Course updated successfully", variant: "default" });
      } else {
        const res = await createCourse(formData, token);
        courseId = res.data?.courseId || res.data?.id;
        toast({ title: "Course created successfully", variant: "default" });
      }
      // Create lessons and topics if provided
      if (data.lessons && Array.isArray(data.lessons)) {
        for (const lesson of data.lessons) {
          const lessonPayload = {
            name: lesson.title || lesson.name,
            description: lesson.description || "",
            course_id: courseId,
          };
          let lessonRes;
          try {
            lessonRes = await createLesson(lessonPayload, token);
            toast({
              title: `Lesson '${lessonPayload.name}' created`,
              variant: "default",
            });
          } catch (err) {
            toast({
              title: `Lesson '${lessonPayload.name}' failed`,
              variant: "destructive",
            });
            continue;
          }
          const lessonId = lessonRes.data?.lessonId || lessonRes.data?.id;
          // Create topics for this lesson
          if (lesson.topics && Array.isArray(lesson.topics)) {
            for (const topic of lesson.topics) {
              const topicForm = new FormData();
              topicForm.append("lesson_id", lessonId);
              topicForm.append("title", topic.title);
              if (topic.ppt_file instanceof File) {
                topicForm.append("ppt", topic.ppt_file);
              } else if (topic.ppt_file) {
                // If ppt_file is a string, skip or handle as needed
              }
              try {
                await createTopic(topicForm, token);
                toast({
                  title: `Topic '${topic.title}' created`,
                  variant: "default",
                });
              } catch (err) {
                toast({
                  title: `Topic '${topic.title}' failed`,
                  variant: "destructive",
                });
              }
            }
          }
        }
      }
      setModalOpen(false);
      fetchAll();
    } catch (err) {
      toast({ title: "Course creation failed", variant: "destructive" });
    }
  };

  // Lesson CRUD
  const handleAddLesson = (courseId) => {
    setEditingLesson({ course_id: courseId });
    setLessonModalOpen(true);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setLessonModalOpen(true);
  };

  const handleViewLesson = (lesson) => {
    setViewLesson(lesson);
  };

  const handleDeleteLesson = async (id) => {
    setConfirmMessage("Are you sure you want to delete this lesson?");
    setConfirmAction(() => async () => {
      setLoading(true);
      try {
        const token = getToken();
        await deleteLesson(id, token);
        fetchAll();
      } catch (err) {}
      setLoading(false);
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleSaveLesson = async (data) => {
    const token = getToken();
    try {
      if (editingLesson && editingLesson.id) {
        await updateLesson(editingLesson.id, data, token);
      } else {
        await createLesson(data, token);
      }
      setLessonModalOpen(false);
      fetchAll();
    } catch (err) {}
  };

  // Topic CRUD
  const handleAddTopic = (lessonId) => {
    setEditingTopic({ lesson_id: lessonId });
    setTopicModalOpen(true);
  };

  const handleEditTopic = (topic) => {
    setEditingTopic(topic);
    setTopicModalOpen(true);
  };

  const handleViewTopic = (topic) => {
    setViewTopic(topic);
  };

  const handleDeleteTopic = async (id) => {
    setConfirmMessage("Are you sure you want to delete this topic?");
    setConfirmAction(() => async () => {
      setLoading(true);
      try {
        const token = getToken();
        await deleteTopic(id, token);
        fetchAll();
      } catch (err) {}
      setLoading(false);
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleSaveTopic = async (data) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("lesson_id", data.lesson_id);
    formData.append("title", data.title);
    if (data.ppt) formData.append("ppt", data.ppt);
    try {
      if (editingTopic && editingTopic.id) {
        await updateTopic(editingTopic.id, formData, token);
      } else {
        await createTopic(formData, token);
      }
      setTopicModalOpen(false);
      fetchAll();
    } catch (err) {}
  };

  // Helper: get lessons/topics for a course/lesson
  const getLessonsForCourse = (courseId) =>
    lessons.filter((l) => l.course_id === courseId);
  const getTopicsForLesson = (lessonId) =>
    topics.filter((t) => t.lesson_id == lessonId);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Confirmation Modal */}
        {confirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-sm p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-300 mb-6">{confirmMessage}</p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={confirmAction}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded"
            onClick={handleAddCourse}
          >
            + Add Course
          </button>
        </div>

        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-800 p-4 rounded shadow text-white"
              >
                <img
                  src={
                    course.image
                      ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}/uploads/${
                          course.image
                        }`
                      : "/no-image.png"
                  }
                  alt="Course"
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <div className="font-bold text-lg mb-1">{course.name}</div>
                <div className="mb-2 text-sm text-gray-300">
                  {course.description}
                </div>
                <div className="flex gap-2 mb-2">
                  {/* <button
                    className="bg-blue-600 px-2 py-1 rounded text-xs"
                    onClick={() => handleViewCourse(course)}
                  >
                    View
                  </button> */}
                  <button
                    className="bg-green-600 px-2 py-1 rounded text-xs"
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-2 py-1 rounded text-xs"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Lessons</span>
                    <button
                      className="bg-orange-500 px-2 py-1 rounded text-xs"
                      onClick={() => handleAddLesson(course.id)}
                    >
                      + Add Lesson
                    </button>
                  </div>
                  <div className="space-y-2">
                    {getLessonsForCourse(course.id).map((lesson) => (
                      <div key={lesson.id} className="bg-gray-700 p-2 rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{lesson.name}</span>
                          <div className="flex gap-1">
                            <button
                              className="bg-blue-500 px-2 py-1 rounded text-xs"
                              onClick={() => handleViewLesson(lesson)}
                            >
                              View
                            </button>
                            <button
                              className="bg-green-500 px-2 py-1 rounded text-xs"
                              onClick={() => handleEditLesson(lesson)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 px-2 py-1 rounded text-xs"
                              onClick={() => handleDeleteLesson(lesson.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="ml-4 mt-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold">
                              Topics
                            </span>
                            <button
                              className="bg-orange-400 px-2 py-1 rounded text-xs"
                              onClick={() => handleAddTopic(lesson.id)}
                            >
                              + Add Topic
                            </button>
                          </div>
                          <div className="space-y-1">
                            {getTopicsForLesson(lesson.id).map((topic) => (
                              <div
                                key={topic.id}
                                className="bg-gray-600 p-1 rounded flex justify-between items-center"
                              >
                                <span className="text-xs">{topic.title}</span>
                                <div className="flex gap-1">
                                  <button
                                    className="bg-blue-400 px-2 py-1 rounded text-xs"
                                    onClick={() => handleViewTopic(topic)}
                                  >
                                    View
                                  </button>
                                  <button
                                    className="bg-green-400 px-2 py-1 rounded text-xs"
                                    onClick={() => handleEditTopic(topic)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="bg-red-400 px-2 py-1 rounded text-xs"
                                    onClick={() => handleDeleteTopic(topic.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Course Modal */}
        {modalOpen && (
          <CourseModal
            course={editingCourse}
            isOpen={modalOpen}
            isViewMode={false}
            onClose={() => setModalOpen(false)}
            onSave={handleSaveCourse}
            lessons={getLessonsForCourse(editingCourse?.id || null)}
            topics={
              lessons.length > 0
                ? lessons.flatMap((l) => getTopicsForLesson(l.id))
                : []
            }
            onAddLesson={handleAddLesson}
            onEditLesson={handleEditLesson}
            onDeleteLesson={handleDeleteLesson}
            onAddTopic={handleAddTopic}
            onEditTopic={handleEditTopic}
            onDeleteTopic={handleDeleteTopic}
          />
        )}
        {/* Lesson Modal */}
        {lessonModalOpen && (
          <LessonModal
            lesson={editingLesson}
            isOpen={lessonModalOpen}
            isViewMode={false}
            onClose={() => setLessonModalOpen(false)}
            onSave={handleSaveLesson}
          />
        )}
        {/* Topic Modal */}
        {topicModalOpen && (
          <TopicModal
            topic={editingTopic}
            isOpen={topicModalOpen}
            isViewMode={false}
            onClose={() => setTopicModalOpen(false)}
            onSave={handleSaveTopic}
          />
        )}
        {/* View Course Modal */}
        {viewCourse && (
          <CourseModal
            course={viewCourse}
            isOpen={!!viewCourse}
            isViewMode={true}
            onClose={() => setViewCourse(null)}
            onSave={() => {}}
          />
        )}
        {/* View Lesson Modal */}
        {viewLesson && (
          <LessonModal
            lesson={viewLesson}
            isOpen={!!viewLesson}
            isViewMode={true}
            onClose={() => setViewLesson(null)}
            onSave={() => {}}
          />
        )}
        {/* View Topic Modal */}
        {viewTopic && (
          <TopicModal
            topic={viewTopic}
            isOpen={!!viewTopic}
            isViewMode={true}
            onClose={() => setViewTopic(null)}
            onSave={() => {}}
          />
        )}
      </div>
    </AdminLayout>
  );
};

// Dummy LessonModal and TopicModal for now, you should implement these in components folder
const LessonModal = ({ lesson, isOpen, isViewMode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: lesson?.name || "",
    description: lesson?.description || "",
    course_id: lesson?.course_id || "",
  });
  useEffect(() => {
    if (lesson) {
      setFormData({
        name: lesson.name || "",
        description: lesson.description || "",
        course_id: lesson.course_id || "",
      });
    }
  }, [lesson]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  if (!isOpen) return null;
  if (isViewMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-white mb-4">Lesson Details</h2>
          <div className="mb-2 text-white">Name: {formData.name}</div>
          <div className="mb-2 text-white">
            Description: {formData.description}
          </div>
          <button
            className="mt-4 bg-gray-700 px-4 py-2 rounded text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {lesson?.id ? "Edit Lesson" : "Add Lesson"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Lesson Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Lesson Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-orange-600 px-4 py-2 rounded text-white"
          >
            Save
          </button>
          <button
            type="button"
            className="ml-2 bg-gray-700 px-4 py-2 rounded text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const TopicModal = ({ topic, isOpen, isViewMode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: topic?.title || "",
    ppt: null,
    lesson_id: topic?.lesson_id || "",
  });
  useEffect(() => {
    if (topic) {
      setFormData({
        title: topic.title || "",
        ppt: null,
        lesson_id: topic.lesson_id || "",
      });
    }
  }, [topic]);
  const handleFileChange = (e) => {
    setFormData({ ...formData, ppt: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass ppt as ppt_file for consistency with CourseModal
    onSave({ ...formData, ppt_file: formData.ppt });
  };
  if (!isOpen) return null;
  if (isViewMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-white mb-4">Topic Details</h2>
          <div className="mb-2 text-white">Title: {formData.title}</div>
          {topic?.ppt && (
            <a
              href={topic.ppt}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Download PPT
            </a>
          )}
          <button
            className="mt-4 bg-gray-700 px-4 py-2 rounded text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {topic?.id ? "Edit Topic" : "Add Topic"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Topic Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <input
            type="file"
            accept=".ppt,.pptx"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="bg-orange-600 px-4 py-2 rounded text-white"
          >
            Save
          </button>
          <button
            type="button"
            className="ml-2 bg-gray-700 px-4 py-2 rounded text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Courses;
