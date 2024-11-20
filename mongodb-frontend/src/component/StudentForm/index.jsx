import React, { useState } from "react";
import Button from "../../component/Button";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    dob: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = () => {
    alert("Submitted data: " + JSON.stringify(formData));
  };

  return (
    <div className="bg-white md:p-8 rounded-md shadow-md w-full md:max-w-4xl flex flex-col items-center mt-10 mb-10">
  <h1 className="text-center text-xl md:text-2xl font-bold mb-6">Student Form</h1>

  {/* Form Fields */}
  <div className="w-full grid grid-cols-2 gap-x-10">
    <div>
      <label className="block text-sm font-medium text-gray-600 text-left mb-2">First Name</label>
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
      <label className="block text-sm font-medium text-gray-600 text-left mb-2">Last Name</label>
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
      <label className="block text-sm font-medium text-gray-600 text-left mb-2">Contact No</label>
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
      <label className="block text-sm font-medium text-gray-600 text-left mb-2">Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-600 text-left mb-2">Upload Image</label>
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
    text="Add Student"
    onClick={handleSubmit}
    customClass="mt-6 w-full bg-blue-500 text-white rounded-md py-2 md:py-3 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
  />
</div>

  );
};

export default StudentForm;
