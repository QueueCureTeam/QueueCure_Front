import Header from "../../components/common/Header";
import CurrentQueue from "../../components/user/queue/CurrentQueue_link";
import AllQueue from "../../components/user/queue/AllQueue_Link";
import PatientQueue from "../../components/user/queue/PatientQueue_Link";

export default function TestQueue() {
  return (
    <>
      <Header />
      <div className="px-8 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-8 space-y-4">
          <div className="md:col-span-2 lg:col-span-1">
            <CurrentQueue />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <AllQueue />
          </div>
        </div>
      </div>
      <PatientQueue />
    </>
  );
}