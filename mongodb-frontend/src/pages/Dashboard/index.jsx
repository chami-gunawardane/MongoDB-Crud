import { useState } from "react";
import StudentForm from "../../component/StudentForm";
import StudentTable from "../../component/StudentTable";

const Index = () => {
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleEditComplete = () => {
    setEditingStudent(null); // Reset editing mode
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center">
      <StudentForm 
        editingStudent={editingStudent}
        onEditComplete={handleEditComplete}
      />
      {/* Pass handleEdit function to StudentTable */}
      <StudentTable onEdit={handleEdit} />
    </div>
  );
};

export default Index;

