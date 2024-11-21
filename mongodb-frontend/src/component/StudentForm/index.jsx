import React, { useState, useEffect } from "react";
import Button from "../../component/Button";
import studentService from "../../service/studentService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentForm = ({ editingStudent, onEditComplete }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    dob: "",
    image: null,
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstName: editingStudent.firstName || "",
        lastName: editingStudent.lastName || "",
        contactNo: editingStudent.contactNo || "",
        dob: editingStudent.dob || "",
        image: null, // You can handle editing the image separately
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const { image, ...studentData } = formData;

      if (editingStudent) {
        // Update the existing student
        await studentService.updateStudent(editingStudent._id, studentData);
        toast.success("Student updated successfully!", {
          position: "top-center",
        });
        onEditComplete(); // Reset editing mode
      } else {
        // Add a new student
        const response = await studentService.addStudent(studentData);
        if (response?._id) {
          toast.success("Student added successfully!", {
            position: "top-center",
          });
        } else {
          throw new Error("Failed to add student");
        }
      }

      setFormData({
        firstName: "",
        lastName: "",
        contactNo: "",
        dob: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the student", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="bg-white md:p-8 rounded-md shadow-md w-full md:max-w-4xl flex flex-col items-center mt-10 mb-10">
      <h1 className="text-center text-xl md:text-2xl font-bold mb-6">
        {editingStudent ? "Edit Student" : "Add Student"}
      </h1>

      {/* Form Fields */}
      <div className="w-full grid grid-cols-2 gap-x-10">
        <div>
          <label className="block text-sm font-medium text-gray-600 text-left mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            className="w-full p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 text-left mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            className="w-full p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 text-left mb-2">
            Contact No
          </label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="Enter Contact No"
            className="w-full p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 text-left mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 text-left mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        text={editingStudent ? "Edit Student" : "Add Student"}
        onClick={handleSubmit}
        customClass={`mt-6 w-full text-white rounded-md py-2 md:py-3 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none 
    ${
      editingStudent
        ? "bg-yellow-500 hover:bg-yellow-600"
        : "bg-blue-500 hover:bg-blue-600"
    }`}
      />
    </div>
  );
};

export default StudentForm;
