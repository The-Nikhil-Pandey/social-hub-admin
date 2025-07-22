import { useState, useEffect } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";

interface CourseModalProps {
  course: any;
  isOpen: boolean;
  isViewMode: boolean;
  onClose: () => void;
  onSave: (courseData: any) => void;
  lessons?: any[];
  topics?: any[];
  onAddLesson?: (courseId: any) => void;
  onEditLesson?: (lesson: any) => void;
  onDeleteLesson?: (id: any) => void;
  onAddTopic?: (lessonId: any) => void;
  onEditTopic?: (topic: any) => void;
  onDeleteTopic?: (id: any) => void;
}

const CourseModal = ({
  course,
  isOpen,
  isViewMode,
  onClose,
  onSave,
}: CourseModalProps) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    image: string | File;
    lessons: any[];
  }>({
    title: "",
    description: "",
    image: "",
    lessons: [],
  });
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

  useEffect(() => {
    if (course) {
      const safeLessons = Array.isArray(course.lessons) ? course.lessons : [];
      setFormData({
        ...course,
        image: course.image || "",
        lessons: safeLessons.map((lesson: any) => ({
          ...lesson,
          topics: Array.isArray(lesson.topics) ? lesson.topics : [],
        })),
      });
      setExpandedLessons(safeLessons.map((l: any) => l.id));
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        lessons: [],
      });
    }
  }, [course]);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const addLesson = () => {
    const newLesson = {
      id: `l${Date.now()}`,
      title: "New Lesson",
      topics: [],
    };
    setFormData({
      ...formData,
      lessons: [...formData.lessons, newLesson],
    });
  };

  const addTopic = (lessonId: string) => {
    const newTopic = {
      id: `t${Date.now()}`,
      title: "New Topic",
      ppt_file: "",
    };
    setFormData({
      ...formData,
      lessons: formData.lessons.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, topics: [...lesson.topics, newTopic] }
          : lesson
      ),
    });
  };

  const deleteLesson = (lessonId: string) => {
    setFormData({
      ...formData,
      lessons: formData.lessons.filter((lesson) => lesson.id !== lessonId),
    });
  };

  const deleteTopic = (lessonId: string, topicId: string) => {
    setFormData({
      ...formData,
      lessons: formData.lessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              topics: lesson.topics.filter(
                (topic: any) => topic.id !== topicId
              ),
            }
          : lesson
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  if (isViewMode && course) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Course Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-300 mb-4">{course.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Lessons & Topics
              </h4>
              <div className="space-y-4">
                {(Array.isArray(course.lessons) ? course.lessons : []).map(
                  (lesson: any) => (
                    <div key={lesson.id} className="bg-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleLesson(lesson.id)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-600 transition-colors rounded-lg"
                      >
                        <span className="text-white font-medium">
                          {lesson.title}
                        </span>
                        {expandedLessons.includes(lesson.id) ? (
                          <ChevronDown size={20} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={20} className="text-gray-400" />
                        )}
                      </button>

                      {expandedLessons.includes(lesson.id) && (
                        <div className="px-4 pb-4">
                          <div className="space-y-2">
                            {(Array.isArray(lesson.topics)
                              ? lesson.topics
                              : []
                            ).map((topic: any) => (
                              <div
                                key={topic.id}
                                className="flex items-center justify-between bg-gray-600 p-3 rounded"
                              >
                                <div className="flex items-center gap-2">
                                  <FileText
                                    size={16}
                                    className="text-orange-400"
                                  />
                                  <span className="text-white">
                                    {topic.title}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-400">
                                  {topic.ppt_file}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {course ? "Edit Course" : "Add New Course"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Removed Thumbnail URL field, replaced with image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFormData({ ...formData, image: file });
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
            {formData.image && (
              <img
                src={
                  typeof formData.image === "string"
                    ? formData.image
                    : URL.createObjectURL(formData.image)
                }
                alt="Course Preview"
                className="w-full h-32 object-cover rounded mt-2"
              />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Lessons</h3>
              <button
                type="button"
                onClick={addLesson}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
              >
                <Plus size={16} />
                Add Lesson
              </button>
            </div>

            <div className="space-y-4">
              {formData.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={lesson.title}
                      onChange={(e) => {
                        const updatedLessons = [...formData.lessons];
                        updatedLessons[lessonIndex].title = e.target.value;
                        setFormData({ ...formData, lessons: updatedLessons });
                      }}
                      className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-orange-500"
                      placeholder="Lesson title"
                    />
                    <button
                      type="button"
                      onClick={() => deleteLesson(lesson.id)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() => addTopic(lesson.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Topic
                    </button>
                  </div>

                  <div className="space-y-2">
                    {lesson.topics.map((topic: any, topicIndex: number) => (
                      <div
                        key={topic.id}
                        className="flex items-center gap-2 bg-gray-600 p-2 rounded"
                      >
                        <input
                          type="text"
                          value={topic.title}
                          onChange={(e) => {
                            const updatedLessons = [...formData.lessons];
                            updatedLessons[lessonIndex].topics[
                              topicIndex
                            ].title = e.target.value;
                            setFormData({
                              ...formData,
                              lessons: updatedLessons,
                            });
                          }}
                          className="flex-1 px-2 py-1 bg-gray-500 border border-gray-400 rounded text-white text-sm focus:outline-none focus:border-orange-500"
                          placeholder="Topic title"
                        />
                        <input
                          type="file"
                          accept=".ppt,.pptx"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            const updatedLessons = [...formData.lessons];
                            updatedLessons[lessonIndex].topics[
                              topicIndex
                            ].ppt_file = file;
                            setFormData({
                              ...formData,
                              lessons: updatedLessons,
                            });
                          }}
                          className="flex-1 px-2 py-1 bg-gray-500 border border-gray-400 rounded text-white text-sm focus:outline-none focus:border-orange-500"
                        />
                        <button
                          type="button"
                          onClick={() => deleteTopic(lesson.id, topic.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              {course ? "Update" : "Create"} Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
