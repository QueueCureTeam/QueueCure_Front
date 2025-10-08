"use client";
import { useState } from "react";

import CurrentQueue from "../components/user/CurrentQueue.jsx";
import QueueTable from "../components/user/QueueTable.jsx";

export default function Home() {
  const [user] = useState(true);
  return (
    <>
      <CurrentQueue/>
      <QueueTable />
      {user && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-blue-900">คิวรับยาของท่าน</h2>
          </div>
          <QueueTable />
        </>
      )}
    </>
  );
}
