import React, { useState } from "react";
import Button from "../../component/Button";

const Index = () => {
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
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-4 md:p-8">
      {/* Form Section */}
      <div className="font-semibold text-[20px] mt-10 mb-10">
        Student Management Application with Mongo DB
      </div>
      <div className="bg-white p-3 md:p-8 rounded-md shadow-md w-full md:max-w-4xl">
        <h1 className="text-center text-xl md:text-2xl font-bold mb-6">
          Student Form
        </h1>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-x-10">
          <div>
            <label className="block text-sm font-medium text-gray-600 text-left mt-5 mb-2">
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
            <label className="block text-sm font-medium text-gray-600 text-left mt-5 mb-2">
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
            <label className="block text-sm font-medium text-gray-600 text-left mt-5 mb-2">
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
            <label className="block text-sm font-medium text-gray-600 text-left mt-5 mb-2">
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
            <label className="block text-sm font-medium text-gray-600 text-left mt-5 mb-2">
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
          text="Add Student"
          onClick={handleSubmit}
          customClass="mt-6 w-full bg-blue-500 text-white rounded-md py-2 md:py-3 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white mt-10 p-6 md:p-8 rounded-md shadow-md w-full max-w-4xl">
        <h2 className="text-lg md:text-xl font-bold mb-4">Student Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 md:p-4 border border-gray-200 text-left">
                  Image
                </th>
                <th className="p-2 md:p-4 border border-gray-200 text-left">
                  First Name
                </th>
                <th className="p-2 md:p-4 border border-gray-200 text-left">
                  Last Name
                </th>
                <th className="p-2 md:p-4 border border-gray-200 text-left">
                  Contact No
                </th>
                <th className="p-2 md:p-4 border border-gray-200 text-left">
                  DOB
                </th>
                <th className="p-2 md:p-4 border border-gray-200 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Sample Row */}
              <tr className="odd:bg-gray-50">
                <td className="p-2 md:p-4 border border-gray-200">[Image]</td>
                <td className="p-2 md:p-4 border border-gray-200">John</td>
                <td className="p-2 md:p-4 border border-gray-200">Doe</td>
                <td className="p-2 md:p-4 border border-gray-200">
                  1234567890
                </td>
                <td className="p-2 md:p-4 border border-gray-200">
                  2000-01-01
                </td>
                <td className="p-2 md:p-4 border border-gray-200 flex flex-wrap gap-2">
                  <Button
                    text="Edit"
                    customClass="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  />

                  <Button
                    text="Delete"
                    customClass="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-60"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
