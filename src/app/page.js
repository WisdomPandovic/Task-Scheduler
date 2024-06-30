import Image from "next/image";
import CurrentDateTime from "../components/CurrentDateTime/CurrentDateTime";
import CalendarAndButtons from "../components/CalendarAndButtons/CalendarAndButtons";
import '../utils/scheduler';

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <CurrentDateTime />
        </div>
        <div className="col-md-7">
          <CalendarAndButtons />
        </div>
      </div>
    </div>
  );
}
