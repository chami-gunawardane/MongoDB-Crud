import React, { useEffect, useState } from "react";
import Button from "../../component/Button";
import studentService from "../../service/studentService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await studentService.getStudents();
        console.log("API Response:", response); 
        if (response && Array.isArray(response)) {
          setStudents(response);
        } else {
          setStudents([]);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch student records.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await studentService.deleteStudent(id);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
      toast.success("Student record deleted successfully!");  // Success toast
    } catch (err) {
      console.error("Error deleting student:", err);
      setError("Failed to delete student.");
      toast.error("Failed to delete student.");  // Error toast
    }
  };

  if (loading) {
    return <p>Loading student records...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <h2 className="text-lg md:text-xl font-bold mb-4">Student Records</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-center">Image</th>
              <th className="p-4 text-center">First Name</th>
              <th className="p-4 text-center">Last Name</th>
              <th className="p-4 text-center">Contact No</th>
              <th className="p-4 text-center">DOB</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={
                    student._id ||
                    student.id ||
                    student.firstName + student.lastName
                  }
                  className="odd:bg-gray-50 border border-t-black border-b-black"
                >
                  <td className="p-4">
                    <img
                      src={student.image || "default-image.jpg"}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-4">{student.firstName}</td>
                  <td className="p-4">{student.lastName}</td>
                  <td className="p-4">{student.contactNo}</td>
                  <td className="p-4">
                    {new Date(student.dob).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        text="Edit"
                        customClass="px-0.5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      />
                      <Button
                        text="Delete"
                        customClass="px-0.5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(student._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
