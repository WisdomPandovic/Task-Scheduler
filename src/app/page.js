import Image from "next/image";
import CurrentDateTime from "../components/CurrentDateTime/CurrentDateTime";
import CalendarAndButtons from "../components/CalendarAndButtons/CalendarAndButtons";
import '../utils/scheduler';

export default function Home() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-md-3">
          <CurrentDateTime />
        </div>
        <div className="col-md-9">
          <CalendarAndButtons />
        </div>
      </div>
    </div>
  );
}
