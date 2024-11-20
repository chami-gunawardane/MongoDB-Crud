import StudentForm from "../../component/StudentForm";
import StudentTable from "../../component/StudentTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center">
      <StudentForm />
      <StudentTable />
    </div>
  );
};

export default Index;
